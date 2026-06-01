function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto text-sm leading-relaxed font-mono text-foreground">
      {children}
    </pre>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-sm font-medium">
      {children}
    </span>
  );
}

export function SecuritySatelliteRetrospective({ description }: { description?: string }) {
  return (
    <div className="space-y-10 text-muted-foreground leading-relaxed">

      <div className="space-y-4">
        {description && <p>{description}</p>}
        <p>
          외부 인터넷과 완전히 차단된 폐쇄망이라는 운영 환경이 모든 설계 결정에 제약으로 작용했습니다.
          외부 서비스 없이 인증 체계를 세우고, 클라우드 없이 K8s 클러스터를 운영하는 것이 이 프로젝트의 핵심이었습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">멀티모듈 구조 개편 — 배포가 두려운 행위에서 일상으로</h3>
        <p>
          STS + jQuery 모놀리식에서 서비스 경계 단위로 모듈을 분리했습니다.
          분리 기준은 하나였습니다. <Highlight>"배포 단위가 달라야 하는가."</Highlight>
          자주 바뀌는 영역과 안정적인 영역을 같은 묶음에 두면 결국 전체 재배포로 돌아왔기 때문입니다.
        </p>
        <CodeBlock>{`# 개편 전 — 어디 하나 수정해도 전체 재배포
monolith: auth + image + notify + file + ...
배포 시간: 4분 / 월 10건 이상 재배포

# 개편 후 — 멀티모듈 구조
auth-module
image-module
notify-module
file-module
배포 시간: 30초 / 변경된 모듈만 재배포`}</CodeBlock>
        <p>
          배포가 "조심해야 하는 행위"에서 "그냥 하는 것"이 됐습니다.
          이 구조는 이후 NIPA 프로젝트에서 <Highlight>완전한 MSA로 전환하는 발판</Highlight>이 됐습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">WMS → WMTS — 위성 영상 타일링 응답 4초에서 0.5초로</h3>
        <p>
          위성 영상 지도를 표시할 때 WMS 방식을 쓰고 있었습니다.
          WMS는 요청마다 해당 바운더리의 영상을 동적으로 합성하기 때문에,
          영상 수가 늘수록 응답 시간이 선형으로 증가했습니다.
        </p>
        <CodeBlock>{`// WMTS — z/x/y 좌표를 캐시 키로 고정, 합성 결과를 Redis에 저장
func tileHandler(w http.ResponseWriter, r *http.Request) {
    z, x, y := parseTileCoords(r)
    key := fmt.Sprintf("tile:%d:%d:%d", z, x, y)

    if cached, err := redisClient.Get(ctx, key).Bytes(); err == nil {
        w.Write(cached) // 캐시 히트 — 합성 연산 없이 즉시 반환
        return
    }

    tile := composeTileParallel(z, x, y) // 고루틴 병렬화
    redisClient.Set(ctx, key, tile, 24*time.Hour)
    w.Write(tile)
}`}</CodeBlock>
        <p>
          WMTS로 전환하면 <Highlight>z/x/y 좌표</Highlight>가 고정되어 같은 타일을 캐시 키로 재사용할 수 있습니다.
          <Highlight>Go 고루틴</Highlight>으로 타일 생성 단계를 병렬화하고, 합성 결과를 <Highlight>Redis</Highlight>에 저장했습니다.
          Go를 선택한 이유는 GeoTIFF 처리에 쓰는 GDAL 라이브러리와의 <Highlight>CGO 바인딩</Highlight>이
          JVM 위 JNI보다 오버헤드가 적었기 때문입니다.
          결과적으로 응답이 <Highlight>4초 → 0.5초 미만</Highlight>으로 줄었습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">분리망 환경 초기 구축 — 외부 의존 없이 자립하는 플랫폼</h3>
        <p>
          인증 서버를 별도 서비스로 분리해 <Highlight>JWT 기반 독립 인증</Highlight>을 구현했습니다.
          파일 전송은 보안 솔루션(<Highlight>INNORIX</Highlight>)과 연동해 내부망 안에서 암호화 전송이 가능하도록 했습니다.
          외부망에서 내부망으로 들어오는 데이터는 파일 단위 <Highlight>단방향 흐름</Highlight>으로만 허용했습니다.
        </p>
        <CodeBlock>{`# 분리망 데이터 흐름
외부망 수집 서버
  → 영상 파일 압축 (zst + hash)
  → 단방향 파일 전달 (SFTP relay)
내부망 처리 서버
  → 압축 해제 + 무결성 검증 (hash)
  → 카탈로깅 → 분석 파이프라인`}</CodeBlock>
        <p>
          제약이 많은 환경일수록 설계 결정이 명확해졌습니다.
          "어떻게 연결할 것인가"보다 "어디서 끊어야 하는가"를 먼저 정하는 것이
          분리망 아키텍처의 핵심이었습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">K8s 운영 — HPA·nginx ingress·레플리카로 서비스 안정성 확보</h3>
        <p>
          분리망 환경이라도 K8s 운영 방식 자체는 일반 클러스터와 다르지 않습니다.
          핵심 과제는 위성영상 분석 요청이 배치성이라는 점이었습니다.
          낮에는 부하가 집중되고 야간에는 거의 없는데,
          추론 파드를 항상 최대로 띄우면 자원 낭비고 줄이면 대기 시간이 길어졌습니다.
        </p>
        <CodeBlock>{`# HPA — CPU 사용률 기반 추론 파드 자동 스케일링
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
spec:
  scaleTargetRef:
    name: gprocessor
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        averageUtilization: 60

# nginx ingress — path 기반 서비스 라우팅
rules:
- http:
    paths:
    - path: /api
      backend: { service: { name: api-service } }
    - path: /tiles
      backend: { service: { name: tile-service } }
    - path: /
      backend: { service: { name: viewer-service } }`}</CodeBlock>
        <p>
          <Highlight>HPA</Highlight>로 CPU 60% 기준에서 추론 파드를 2~10개 사이로 자동 조절했습니다.
          분석 요청이 몰리는 시간대에는 파드가 늘어나고, 야간에는 최소 레플리카만 유지합니다.
        </p>
        <p>
          <Highlight>nginx ingress</Highlight>로 뷰어(Next.js)·API 서버·타일 서버로의 요청을
          path 기준으로 분기했습니다.
          upstream 주소를 ingress 레이어에서 통합 관리하니
          개별 서비스 변경 시 ingress 수정 없이 Service만 교체하면 됐습니다.
        </p>
        <p>
          각 서비스는 <Highlight>minReplicas: 2</Highlight>를 고정해 노드 장애 시에도 서비스가 끊기지 않도록 했고,
          <Highlight>롤링 업데이트</Highlight>로 배포 중 다운타임도 제거했습니다.
        </p>
      </div>

    </div>
  );
}
