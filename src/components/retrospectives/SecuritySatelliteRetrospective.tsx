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

function DecisionRow({ label, primary, children }: { label: string; primary?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm">
      <span className={`text-xs font-semibold w-8 shrink-0 pt-0.5 uppercase tracking-wider ${primary ? "text-primary" : "text-muted-foreground"}`}>
        {label}
      </span>
      <span className="text-muted-foreground leading-relaxed">{children}</span>
    </div>
  );
}

export function SecuritySatelliteRetrospective({ description }: { description?: string }) {
  return (
    <div className="space-y-12 text-muted-foreground leading-relaxed">

      {/* 아키텍처 */}
      <div>
        <h3 className="text-base font-bold text-foreground mb-4">아키텍처</h3>
        <div className="p-5 rounded-xl border border-border bg-muted/20 space-y-3">
          <div className="flex justify-center">
            <FlowNode sub="사용자 · 어드민 (Thymeleaf)">웹 프론트엔드</FlowNode>
          </div>
          <div className="flex justify-center text-muted-foreground text-xs">↓</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Spring Boot</p>
              <FlowNode highlight sub="CRUD · 인증 · 파일">API 서버</FlowNode>
            </div>
            <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Go</p>
              <FlowNode highlight sub="WMS · WMTS · 다운로드">이미지 / 파일 서버</FlowNode>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Salt — Python</p>
              <div className="flex items-center gap-2">
                <FlowNode highlight sub="수집 · Salt 디스패치">작업 관리</FlowNode>
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
      </div>

      {/* 핵심 기술 */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-foreground">핵심 기술</h3>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">WMS 대신 WMTS + Go</h4>
          <div className="p-5 rounded-xl border border-border bg-muted/20 space-y-4">
          <div className="space-y-3">
            <DecisionRow label="상황">
              영상 수가 늘수록 WMS 응답이 선형으로 증가 — 요청마다 바운더리 전체를 동적 합성해 <Highlight>4초 이상</Highlight> 소요
            </DecisionRow>
            <DecisionRow label="대안">
              Java Spring으로 타일링 처리 → GDAL JNI 오버헤드가 CGO보다 크고, JVM GC 타이밍 예측이 어려워 타일 캐시 효과를 깎아먹음
            </DecisionRow>
            <DecisionRow label="선택" primary>
              Go + GDAL CGO 바인딩 + Redis 타일 캐시 — <Highlight>z/x/y 좌표를 캐시 키로 고정</Highlight>해 동일 타일 재요청 시 합성 연산 완전 스킵, 고루틴으로 타일 생성 병렬화
            </DecisionRow>
            <DecisionRow label="단점">
              Go/Java 두 언어 혼재, 초기 GDAL CGO 바인딩 설정 비용
            </DecisionRow>
          </div>
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
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">완전 MSA 대신 멀티모듈</h4>
          <div className="p-5 rounded-xl border border-border bg-muted/20 space-y-4">
          <div className="space-y-3">
            <DecisionRow label="상황">
              STS + jQuery 모놀리식 — 배포 한 번에 전체 서비스 다운, <Highlight>4분 소요</Highlight>, 월 10건 이상 재배포 발생
            </DecisionRow>
            <DecisionRow label="대안">
              바로 완전 MSA로 전환 → 회사 첫 K8s 도입 프로젝트라 서비스 간 네트워크·분산 트랜잭션 복잡성 감당이 현실적으로 어려움
            </DecisionRow>
            <DecisionRow label="선택" primary>
              <Highlight>"배포 단위가 달라야 하는가"</Highlight> 를 분리 기준으로 삼아 auth·image·notify·file 모듈 독립 배포 — 단일 프로세스 내 모듈 분리로 리스크 최소화
            </DecisionRow>
            <DecisionRow label="단점">
              완전한 독립 스케일링 불가 — 이 구조가 이후 NIPA 프로젝트에서 9개 MSA로 전환하는 발판이 됨
            </DecisionRow>
          </div>
          <CodeBlock>{`# 개편 전 — 어디 하나 수정해도 전체 재배포
monolith: auth + image + notify + file + ...
배포 시간: 4분 / 월 10건 이상 재배포

# 개편 후 — 멀티모듈 구조
auth-module / image-module / notify-module / file-module
배포 시간: 30초 / 변경된 모듈만 재배포`}</CodeBlock>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">DB 동기화 대신 파일 기반 단방향 흐름</h4>
          <div className="p-5 rounded-xl border border-border bg-muted/20 space-y-4">
          <div className="space-y-3">
            <DecisionRow label="상황">
              외부망↔폐쇄망 완전 차단 — 위성 영상 데이터 반입 통로 설계 필요
            </DecisionRow>
            <DecisionRow label="대안">
              DB CDC(Debezium) 양방향 동기화 → 양방향 통로가 생겨 망분리 보안 요건 위반, replication slot 파손 시 전체 스냅샷 재수행 필요 (항우연 프로젝트에서 이미 경험)
            </DecisionRow>
            <DecisionRow label="선택" primary>
              파일 단위 단방향 흐름 — <Highlight>zst 압축 + hash 무결성 검증</Highlight> 으로 변조 탐지, 역방향 채널 구조적으로 없음
            </DecisionRow>
            <DecisionRow label="단점">
              실시간 동기화 불가, 배치 단위 반입만 가능 — 위성 영상 분석 특성상 실시간성 요건이 없어 감수 가능
            </DecisionRow>
          </div>
          </div>
        </div>
      </div>

      {/* 결과 */}
      <div>
        <h3 className="text-base font-bold text-foreground mb-4">결과</h3>
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
