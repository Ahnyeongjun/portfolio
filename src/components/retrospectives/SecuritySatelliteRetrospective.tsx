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

function FlowNode({ children, highlight, sub }: { children: React.ReactNode; highlight?: boolean; sub?: string }) {
  return (
    <div className={`px-3 py-1.5 rounded-md border text-xs font-medium text-center flex-1 ${
      highlight
        ? "bg-primary/10 border-primary/30 text-primary"
        : "bg-background border-border text-foreground"
    }`}>
      {children}
      {sub && <div className="font-normal text-muted-foreground mt-0.5">{sub}</div>}
    </div>
  );
}

export function SecuritySatelliteRetrospective({ description }: { description?: string }) {
  return (
    <div className="space-y-10 text-muted-foreground leading-relaxed">

      {/* 아키텍처 */}
      <div className="p-5 rounded-xl border border-border bg-muted/20 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">아키텍처</p>
        <div className="flex justify-center">
          <FlowNode sub="사용자 · 어드민 (Thymeleaf)">웹 프론트엔드</FlowNode>
        </div>
        <div className="flex justify-center text-muted-foreground text-xs">↓</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Spring Boot</p>
            <div className="flex gap-2">
              <FlowNode highlight sub="CRUD · 인증 · 파일">API 서버</FlowNode>
            </div>
          </div>
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Go</p>
            <div className="flex gap-2">
              <FlowNode highlight sub="WMS · WMTS · 다운로드">이미지 / 파일 서버</FlowNode>
            </div>
          </div>
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Salt — Python</p>
            <div className="flex items-center gap-2">
              <FlowNode highlight sub="수집 · 디스패치">작업 관리</FlowNode>
              <span className="text-muted-foreground text-xs shrink-0">→</span>
              <FlowNode sub="변환 · DB 등록">ETL 처리</FlowNode>
            </div>
          </div>
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">ONNX Runtime — Python</p>
            <div className="flex gap-2">
              <FlowNode sub="OBB / HBB">관심정보 탐지</FlowNode>
              <FlowNode sub="픽셀 단위 분류">변화탐지</FlowNode>
            </div>
          </div>
        </div>
      </div>

      {/* 핵심 기술 #1 */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">WMS 대신 WMTS + Go</h3>
        <p>
          영상 수가 늘수록 WMS 응답이 선형으로 증가했습니다. 요청마다 바운더리 전체를 동적 합성해
          <Highlight>4초 이상</Highlight> 소요됐고, Java Spring으로 타일링을 처리하면 GDAL JNI 오버헤드가
          CGO보다 크고 JVM GC 타이밍 예측이 어려워 캐시 효과를 깎아먹었습니다.
        </p>
        <p>
          Go + GDAL CGO 바인딩 + Redis 타일 캐시로 전환했습니다.
          <Highlight>z/x/y 좌표를 캐시 키로 고정</Highlight>해 동일 타일 재요청 시 합성 연산을 완전히 스킵하고,
          고루틴으로 타일 생성을 병렬화했습니다. Go/Java 두 언어 혼재와 초기 CGO 바인딩 설정 비용은 감수했습니다.
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
      </div>

      {/* 핵심 기술 #2 */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">완전 MSA 대신 멀티모듈</h3>
        <p>
          STS + jQuery 모놀리식 구조에서 배포 한 번에 전체 서비스가 다운됐고 <Highlight>4분</Highlight>이 소요됐습니다.
          월 10건 이상 재배포가 발생하는 상황이었지만, 회사 첫 K8s 도입 프로젝트였기 때문에
          바로 완전 MSA로 전환하면 서비스 간 네트워크·분산 트랜잭션 복잡성을 감당하기 어려웠습니다.
        </p>
        <p>
          <Highlight>"배포 단위가 달라야 하는가"</Highlight>를 분리 기준으로 삼아
          auth·image·notify·file 모듈을 독립 배포 단위로 분리했습니다.
          단일 프로세스 내 모듈 분리로 리스크를 최소화했고,
          이 구조가 이후 NIPA 프로젝트에서 9개 MSA로 전환하는 발판이 됐습니다.
        </p>
        <CodeBlock>{`# 개편 전 — 어디 하나 수정해도 전체 재배포
monolith: auth + image + notify + file + ...
배포 시간: 4분 / 월 10건 이상 재배포

# 개편 후 — 멀티모듈 구조
auth-module / image-module / notify-module / file-module
배포 시간: 30초 / 변경된 모듈만 재배포`}</CodeBlock>
      </div>

      {/* 핵심 기술 #3 */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">DB 동기화 대신 파일 기반 단방향 흐름</h3>
        <p>
          외부망↔폐쇄망이 완전히 차단된 환경에서 위성 영상 데이터 반입 통로를 설계해야 했습니다.
          DB CDC(Debezium) 양방향 동기화를 검토했지만 양방향 통로가 생겨 망분리 보안 요건을 위반하고,
          replication slot 파손 시 전체 스냅샷을 재수행해야 하는 문제가 있었습니다.
        </p>
        <p>
          파일 단위 단방향 흐름으로 설계했습니다.
          <Highlight>zst 압축 + hash 무결성 검증</Highlight>으로 변조를 탐지하고,
          역방향 채널을 구조적으로 없앴습니다.
          실시간 동기화는 불가능하지만 위성 영상 분석 특성상 실시간성 요건이 없어 감수 가능했습니다.
        </p>
      </div>

      {/* 결과 */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">결과</h3>
        <div className="space-y-2.5">
          {[
            ["영상 타일링 API 응답", "4초", "0.5초 미만"],
            ["배포 소요 시간", "4분 (전체)", "30초 (변경 모듈만)"],
            ["K8s 도입", "회사 미도입", "최초 도입 → KARI · NIPA로 확산"],
          ].map(([label, before, after], i) => (
            <div key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-sm">
              <span className="text-primary shrink-0">✦</span>
              <span className="text-foreground font-medium">{label}</span>
              <span className="text-muted-foreground line-through text-xs">{before}</span>
              <span className="text-muted-foreground text-xs">→</span>
              <span className="text-foreground">{after}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
