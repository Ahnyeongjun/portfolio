import React from 'react';

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

function CompareTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: { cells: (string | React.ReactNode)[]; highlight?: boolean; muted?: boolean }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-muted/40 border-b border-border">
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 text-left text-xs font-medium text-muted-foreground/70 tracking-wide whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr
              key={i}
              className={
                row.highlight
                  ? "bg-primary/5"
                  : row.muted
                  ? "opacity-50"
                  : "hover:bg-muted/20 transition-colors"
              }
            >
              {row.cells.map((cell, j) => (
                <td key={j} className={`px-3 py-2 ${row.highlight ? "text-foreground" : "text-muted-foreground"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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

function AccordionSection({
  title,
  hint,
  module: moduleName,
  children,
  defaultOpen,
}: {
  title: string;
  hint?: string;
  module?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group border border-border rounded-xl overflow-hidden" open={defaultOpen}>
      <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none bg-muted/20 hover:bg-muted/30 transition-colors [list-style:none] [&::-webkit-details-marker]:hidden">
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-foreground text-sm">{title}</span>
          {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
        </div>
        {moduleName && (
          <span className="shrink-0 px-1.5 py-0.5 text-[10px] font-medium rounded bg-primary/10 text-primary">
            {moduleName}
          </span>
        )}
        <svg
          className="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="px-5 pt-5 pb-4 space-y-4 text-muted-foreground border-t border-border">
        {children}
      </div>
    </details>
  );
}

export function KariSatelliteRetrospective({ description }: { description?: string }) {
  return (
    <div className="space-y-8 text-muted-foreground leading-relaxed">

      {/* 아키텍처 */}
      <div className="p-5 rounded-xl border border-border bg-muted/20 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">아키텍처 - 6개 모듈</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-primary/20 border border-primary/40" />
              단독 설계·구현
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-background border border-border" />
              일부 기여·고도화
            </span>
          </div>
        </div>

        {/* 프론트엔드 3개 */}
        <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">프론트엔드 (Thymeleaf · Spring MVC)</p>
          <div className="grid grid-cols-3 gap-2">
            <FlowNode highlight sub="AI 분석 신청 · 지구본 가시화">사용자 페이지</FlowNode>
            <FlowNode highlight sub="수집·분석 현황 어드민">관리자 페이지</FlowNode>
            <FlowNode highlight sub="서비스 소개">인트로 페이지</FlowNode>
          </div>
        </div>

        <div className="flex justify-center text-muted-foreground text-xs">↓</div>

        {/* 백엔드 3개 */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Spring Boot</p>
            <FlowNode highlight sub="API 200여 개 · 테이블 35개 · Outbox">API 서버</FlowNode>
          </div>
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Spring Boot</p>
            <FlowNode highlight sub="세션 · 권한 · SSO">Auth 서버</FlowNode>
          </div>
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Go</p>
            <FlowNode highlight sub="WMS · WMTS · MVT · 파일 다운로드">타일 / 파일 서버</FlowNode>
          </div>
        </div>

        {/* ETL + AI */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Salt-Stack · Python</p>
            <FlowNode sub="10+ 소스 · GDAL COG">수집 · ETL</FlowNode>
          </div>
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">FastAPI + ONNX Runtime</p>
            <FlowNode highlight sub="OD · SEG · SR · 200→3,000건/일">AI 추론</FlowNode>
            <p className="text-xs text-muted-foreground/70">Aliyun GPUShare - GPU당 10파드 자동 분할</p>
          </div>
        </div>

        {/* 변화탐지 AI 호출 흐름 */}
        <div className="pt-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">변화탐지 AI 호출 흐름</p>
          <ol className="flex flex-wrap items-center gap-x-1 gap-y-2">
            {([
              ["사용자 페이지", "분석 영역 · 시점 선택 · 신청"],
              ["API 서버", "작업 등록 · Outbox 이벤트"],
              ["망연계", "외부망 → 폐쇄망 전달"],
              ["AI 추론", "변화탐지 ONNX 추론"],
              ["타일 / 파일 서버", "결과 타일화 · 서빙"],
              ["사용자 페이지", "지구본 위 변화 가시화"],
            ] as [string, string][]).map(([name, desc], i, arr) => (
              <li key={i} className="flex items-center gap-1">
                <span className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-border bg-background text-xs">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/15 text-primary text-[10px] font-semibold shrink-0">{i + 1}</span>
                  <span className="font-medium text-foreground">{name}</span>
                  <span className="text-muted-foreground font-normal">{desc}</span>
                </span>
                {i < arr.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex-1 border-t border-dashed border-border" />
          <span className="shrink-0 px-2">망연계 (외부망 ↔ 폐쇄망) · Kubernetes · PostgreSQL</span>
          <div className="flex-1 border-t border-dashed border-border" />
        </div>
      </div>

      {/* 도입부 */}
      <p>
        항공우주연구원이 발사한 초소형위성 20기의 데이터를 수집·처리·가시화하는{" "}
        <Highlight>API 200여 개·테이블 35개</Highlight> 규모의 플랫폼을, ETL
        파이프라인을 제외한 6개 서비스 모듈(API 서버·Auth 서버·타일/파일 서버·
        프론트엔드·AI 추론) 전체를 <Highlight>혼자 설계하고 구현</Highlight>했습니다.
      </p>
      <p>
        사용자는 이 위에서 객체탐지·변화탐지·영상분할 등 AI 분석을 신청하고 CesiumJS
        지구본 위에서 시계열 비교와 분할화면으로 결과를 확인하며, 어드민 페이지에서는
        위성별 수집 현황과 분석 진행 상황을 모니터링합니다.
      </p>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">백엔드</h2>

        {/* 1. 성능·보안 */}
        <AccordionSection
          title="부하 테스트 기반 성능·보안 개선"
          hint="보안 체크리스트 선행 · JUnit 통합 테스트 · k6 50VU 에러율 11.22% → 0%"
          module="API 서버"
        >
          <p>
            국가기관 납품 특성상 보안 요구사항이 엄격했습니다.
            납품 전 보안 체크리스트를 직접 작성해 개발 단계마다 선제 반영했고,
            JUnit으로 비즈니스 로직과 API 통합 테스트를 작성했습니다.
          </p>
          <p>
            부하 테스트는 실제 위성 데이터가 있어야 유효해 운영과 동일한 구성의 격리 클러스터를 별도 구축했습니다.
            k6 50VU로 테스트하자 에러율 11.22%가 나왔고, 병목 원인은 네 가지였습니다.
          </p>
          <ul className="space-y-2 list-none">
            <li className="flex gap-2">
              <span className="shrink-0 text-primary font-medium text-sm mt-0.5">①</span>
              <span><Highlight>위성 메타 목록</Highlight> - 페이지네이션 없이 전체 행 반환, 파라미터가 없어도 매 요청마다 <Highlight>PostGIS ST_INTERSECTION</Highlight> 실행</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-primary font-medium text-sm mt-0.5">②</span>
              <span><Highlight>수집 현황 집계</Highlight> - CTE에 명시적 JOIN 조건 없어 카테시안 곱 발생 → 타임아웃</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-primary font-medium text-sm mt-0.5">③</span>
              <span><Highlight>알람 팝업 목록</Highlight> - base64 PNG BLOB을 목록 쿼리에 포함, HikariCP 커넥션 30개 독점 → 전체 요청 연쇄 타임아웃</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-primary font-medium text-sm mt-0.5">④</span>
              <span><Highlight>반복적 트랜잭션 생성</Highlight> - 하나의 조회 API 안에서 여러 테이블을 조회할 때마다 개별 트랜잭션이 열려 HikariCP 커넥션을 추가로 점유, 동시 요청이 몰릴수록 커넥션 풀이 먼저 고갈</span>
            </li>
          </ul>
          <p>
            조건부 PostGIS 실행, 기본 페이지네이션, BLOB 컬럼 목록·상세 분리, Redis 캐싱으로 수정했습니다.
            알람 팝업 목록은 조회 조건(일련번호·등록일시)에 인덱스(<code>idx_alam_log_sno</code>,{" "}
            <code>idx_reg_dt</code>)도 추가해 캐시가 없는 최초 조회도 함께 빨라지도록 했습니다.
            반복적으로 열리던 트랜잭션은 하나의 조회 API 안의 여러 테이블 조회를{" "}
            <Highlight>단일 트랜잭션</Highlight>으로 묶어, 요청당 필요한 커넥션·트랜잭션 수
            자체를 줄였습니다. 이 과정에서 32개 MyBatis 매퍼의 ORDER BY 파라미터가 쿼리에
            직접 삽입되는 <Highlight>SQL injection</Highlight> 취약점도 발견해 화이트리스트
            검증으로 교체했습니다.
          </p>
          <CompareTable
            headers={["", "전", "후"]}
            rows={[
              { cells: ["위성 메타 목록", "38초", "159ms (239배)"], highlight: true },
              { cells: ["수집 현황 집계", "46초 (타임아웃)", "181ms (256배)"], highlight: true },
              { cells: ["알람 팝업 목록", "25초", "104ms → 20ms (캐시)"], highlight: true },
              { cells: ["50VU 에러율", "11.22%", "0%"], highlight: true },
              { cells: ["처리량", "392 req/s", "1,177 req/s"] },
            ]}
          />
        </AccordionSection>

        {/* 외래키 없는 스키마 설계 */}
        <AccordionSection
          title="외래키 없는 스키마 설계 - 샤딩을 염두에 둔 선제적 트레이드오프"
          hint="위성 메타·추론 결과 테이블 로우 증가 → 향후 샤딩 여지를 위해 FK 제약 자체를 두지 않음"
          module="API 서버"
        >
          <p>
            위성 메타·추론 결과처럼 계속 쌓이는 테이블의 로우 수가 늘어나면서, 나중에{" "}
            <Highlight>샤딩·파티셔닝</Highlight>이 필요해질 가능성을 염두에 뒀습니다.
            외래키 제약은 참조 대상 테이블이 다른 샤드로 옮겨가는 순간 걸림돌이 되기
            때문에, 처음부터 <Highlight>외래키를 아예 두지 않는</Highlight> 방향으로
            스키마를 설계했습니다.
          </p>
          <p>
            이 판단이 가능했던 이유는 대상 데이터의 성격 때문이었습니다. 관측·추론
            결과성 데이터라 일부 레코드의 참조가 깨지더라도 시스템 전체에 치명적인
            영향을 주지 않는 데이터였고, 그래서 DB 레벨의 엄격한 정합성 보장보다{" "}
            <Highlight>스키마 유연성</Highlight>을 우선하는 쪽을 선택했습니다. 모든
            테이블에 일괄 적용한 규칙이 아니라, 데이터 성격을 보고 정합성 요구 수준이
            낮은 테이블에 한해 적용한 판단입니다.
          </p>
          <p className="font-medium text-foreground">실제 사례 - 유저 생성 시 정합성이 깨진 버그</p>
          <p>
            외래키가 없다 보니 정합성을 트랜잭션 경계로 대신 지켜야 하는데, 유저 생성
            경로에서 이 경계가 잘못 잡혀 있었습니다. 유저 레코드 insert와 권한 레코드
            insert가 <Highlight>각각 별도의 트랜잭션</Highlight>으로 실행되고 있어서,
            둘 중 하나만 실패해도 <Highlight>유저는 있는데 권한이 없거나, 권한만 있고
            유저가 없는</Highlight> 정합성 깨짐이 발생할 수 있었습니다. 외래키가
            없으니 DB가 이 불일치를 막아주지도 못했습니다.
          </p>
          <p>
            유저·권한 insert를 <Highlight>하나의 트랜잭션</Highlight>으로 묶어 둘 다
            성공하거나 둘 다 롤백되도록 고쳤습니다. 스키마 레벨에서 포기한 정합성
            보장을, 정말 필요한 경로(유저 생성)에서는 트랜잭션 경계로 다시 확보한
            사례입니다.
          </p>
        </AccordionSection>

        {/* Snowflake ID - 폐쇄망 분산 ID */}
        <AccordionSection
          title="Snowflake ID 도입 - 폐쇄망 분산 ID 직접 구현"
          hint="ZooKeeper·etcd 등 외부 코디네이터 없이 단조 증가·전역 유일성·망 추적을 동시에 확보"
          module="API 서버 · 망연계"
        >
          <p>
            국가기관 납품 환경으로 외부망↔폐쇄망이 물리 분리돼, 이 경계를 넘나드는
            데이터에 안전하게 ID를 부여할 방법이 필요했습니다.
          </p>
          <p>
            외부망↔폐쇄망 물리 분리 환경에서는 ZooKeeper·etcd 같은 외부 코디네이터에 접근할 수 없습니다.
            UUID v4는 완전 랜덤이라 ID만으로 어느 망·서버에서 생성됐는지 역추적이 불가능했습니다.
            <Highlight>Snowflake 알고리즘</Highlight>을 직접 구현해 worker ID 비트 영역에 <Highlight>망 정보를 인코딩</Highlight>하고,
            외부 코디네이터 없이 단조 증가 · 전역 유일성 · 망 추적을 동시에 확보했습니다.
          </p>
          <CodeBlock>{`# 구조: [timestamp 41bit][datacenter 5bit][worker 5bit][sequence 12bit]
# datacenter_id: 망 식별 (0=외부망, 1=내부망, 2=분리망)
def generate(self) -> int:
    with self._lock:
        ts = int(time.time() * 1000) - EPOCH
        if ts == self.last_timestamp:
            self.sequence = (self.sequence + 1) & ((1 << SEQUENCE_BITS) - 1)
            if self.sequence == 0:
                while ts <= self.last_timestamp:
                    ts = int(time.time() * 1000) - EPOCH
        else:
            self.sequence = 0
        self.last_timestamp = ts
        return (ts << (DATACENTER_BITS + WORKER_BITS + SEQUENCE_BITS)
                | self.datacenter_id << (WORKER_BITS + SEQUENCE_BITS)
                | self.worker_id << SEQUENCE_BITS
                | self.sequence)`}</CodeBlock>
        </AccordionSection>

        {/* CDC 안정화: Debezium 자가치유 → Outbox 전환 → 멱등키 설계 → BLOB 정합성 */}
        <AccordionSection
          title="CDC 안정화 - 자가치유 스크립트 · Outbox 전환 · 멱등키 설계"
          hint="replication slot 반복 파손 → 자가치유 스크립트 응급 대응 → Outbox로 근본 해결 · 이벤트 재전달 중복 반영은 멱등키 설계로 해결"
          module="API 서버 · 망연계"
        >
          <p>
            위성 메타·추론 결과(외부→폐쇄)와 사용자 요청·처리 상태(폐쇄→외부)를
            물리적으로 분리된 두 망 사이에서 동기화해야 했습니다.
          </p>
          <p className="font-medium text-foreground">1. Debezium CDC 에러 → 자가치유 스크립트 → Outbox로 근본 해결</p>
          <p>
            앱 코드 수정 없이 DB 변경 로그를 읽는 <Highlight>Debezium CDC</Highlight>를 초기 도입했습니다.
            그러나 운영 중 logical replication slot이 <Highlight>WAL 유실·비활성 상태</Highlight>로
            반복 파손되며 CDC가 정지하는 장애가 계속됐습니다. 원인은 상태 판정 우선순위
            오류로, WAL이 완전히 유실된 상황도 단순 "비활성"으로 오판해 필요한 slot
            재생성을 건너뛰고 있었습니다.
          </p>
          <div className="space-y-2">
            <p className="text-[11px] font-medium text-muted-foreground/70 tracking-wide">이전 - Debezium CDC (logical replication slot 기반)</p>
            <ol className="flex flex-wrap items-center gap-x-1 gap-y-2">
              {([
                ["DB WAL", "PostgreSQL 변경 로그"],
                ["replication slot", "WAL 유실·비활성 시 정지 지점"],
                ["Debezium Server", "HTTP Sink"],
                ["웹훅 → 파일 릴레이", "JSON 파일로 전달"],
                ["처리 워커", "폐쇄망 반영"],
              ] as [string, string][]).map(([name, desc], i, arr) => (
                <li key={i} className="flex items-center gap-1">
                  <span className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-border bg-background text-xs">
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-muted-foreground/20 text-muted-foreground text-[10px] font-semibold shrink-0">{i + 1}</span>
                    <span className="font-medium text-foreground">{name}</span>
                    <span className="text-muted-foreground font-normal">{desc}</span>
                  </span>
                  {i < arr.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
                </li>
              ))}
            </ol>
            <p className="text-[11px] font-medium text-muted-foreground/70 tracking-wide pt-1">이후 - Outbox (트랜잭션 커밋 이벤트 직접 캡처)</p>
            <ol className="flex flex-wrap items-center gap-x-1 gap-y-2">
              {([
                ["비즈니스 트랜잭션", "MyBatis Executor.update()"],
                ["OutboxInterceptor", "SQL 실행을 가로채 이벤트 캡처"],
                ["beforeCommit()", "같은 트랜잭션에 원자적 저장"],
                ["Outbox 테이블", "커밋된 이벤트만 존재"],
                ["배치 발행", "폐쇄망 반영, 재유입 무한루프 방지"],
              ] as [string, string][]).map(([name, desc], i, arr) => (
                <li key={i} className="flex items-center gap-1">
                  <span className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-primary/30 bg-primary/10 text-xs">
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/15 text-primary text-[10px] font-semibold shrink-0">{i + 1}</span>
                    <span className="font-medium text-primary">{name}</span>
                    <span className="text-muted-foreground font-normal">{desc}</span>
                  </span>
                  {i < arr.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
                </li>
              ))}
            </ol>
          </div>
          <p>
            Debezium 방식은 <Highlight>DB 바깥의 별도 프로세스</Highlight>(replication slot)가
            변경분을 감시하다 보니 그 프로세스 자체가 죽거나 slot이 깨지면 감시가 통째로
            멈췄습니다. Outbox는 감시를 아예 없애고, <Highlight>같은 트랜잭션 안에서
            이벤트를 직접 캡처</Highlight>하는 방식이라 별도 프로세스의 상태에 의존하지
            않습니다.
          </p>
          <p>
            우선 상태 판정 순서를 <code>NOT_FOUND → WAL lost → inactive → healthy</code>로
            재정렬하고, 강제종료→slot 삭제→재생성→검증까지 이어지는 4단계 복구 함수를
            자동화한 <Highlight>자가치유 스크립트</Highlight>로 장애가 나도 자동 복구되도록
            응급 대응했습니다. 연속 3회 실패했을 때만 복구를 트리거하도록 해 일시적인
            지연까지 복구로 오인해 재시도가 폭주하는 것도 막았습니다.
          </p>
          <p>
            다만 이는 근본 원인인 slot 파손 자체를 없애지는 못했기 때문에, CDC 의존을
            완전히 제거하고 MyBatis Executor 인터셉터 기반 <Highlight>Outbox 라이브러리를
            직접 구현</Highlight>했습니다. <Highlight>beforeCommit()</Highlight>으로 비즈니스
            트랜잭션과 Outbox 저장을 원자적으로 묶고, <Highlight>ThreadLocal
            OutboxContext</Highlight>로 폐쇄망 수신 데이터 재발행 시 무한 루프를 방지해
            이벤트 유실 없이 안정적으로 운영할 수 있었습니다.
          </p>
          <CodeBlock>{`@Intercepts({ @Signature(type = Executor.class, method = "update", ...) })
public class OutboxInterceptor implements Interceptor {
    public Object intercept(Invocation inv) throws Throwable {
        Object result = inv.proceed();
        if (OutboxContext.isReplay()) return result; // 무한루프 방지
        captureOutboxEvent(inv);
        return result;
    }
}

@Override
public void beforeCommit(boolean readOnly) {
    outboxRepository.saveAll(OutboxContext.flush()); // 같은 트랜잭션, 원자적 저장
}`}</CodeBlock>
          <p className="font-medium text-foreground">2. CDC 이벤트 중복 처리 버그 수정 - 멱등키(idempotent key) 설계</p>
          <p>
            Kafka 없이 Debezium Server(HTTP Sink) → 웹훅 → 파일 릴레이 → 워커로 이어지는
            구조에서, 동일 CDC 이벤트가 재전달·재시도될 때 <Highlight>중복 INSERT/UPDATE</Highlight>가
            발생하는 문제를 발견했습니다. payload를 정렬·직렬화해 자연키로 쓰는 멱등키
            설계 자체에 결함이 있었습니다 - 타임스탬프 컬럼까지 서명에 포함되어 있어 완전히
            같은 이벤트도 재전달마다 다른 서명이 만들어졌고, 원본 payload를 얕은 참조로
            들고 있다 보니 처리 도중 원본이 오염되는 문제도 함께 있었습니다.
          </p>
          <p>
            <code>dt</code>/<code>date</code>/<code>time</code> 등 휘발성 컬럼을 제외하고
            정렬해 정규화하는 서명 로직을 확정하고, 원본 payload는 <Highlight>deepcopy</Highlight>로
            전환해 참조를 분리했습니다. 같은 정규화 로직을 수신 계층과 처리 계층
            양쪽에 독립 구현하고, <Highlight>complete_yn</Highlight> 상태값으로 "처리 중인
            재시도만 차단하고 완료 후 재유입은 정상 처리한다"는 범위를 명확히 했습니다.
          </p>
          <CompareTable
            headers={["멱등키 설계", "문제"]}
            rows={[
              { cells: ["타임스탬프 포함 전체 payload 서명", "재전달마다 다른 서명 → dedup 무력화"], muted: true },
              { cells: ["휘발성 컬럼 제외 + 정렬 payload 서명 + deepcopy", "동일 이벤트는 항상 동일 서명, 원본 오염 없음"], highlight: true },
            ]}
          />
          <p>
            이 단일 dedup 로직을 <Highlight>23개 테이블</Highlight>의 CDC 반영이 공유하도록
            정리해, 재처리 안전성을 한 곳에서 보장하는 구조로 만들었습니다. 같은
            파이프라인에서 첨부파일 BLOB 컬럼의 타입 선언·인코딩 방식이 어긋나
            이미지가 깨지던 문제도 함께 바로잡았습니다.
          </p>
        </AccordionSection>

        {/* 3. 영상 서빙 */}
        <AccordionSection
          title="영상 서빙 속도 개선"
          hint="WMTS 타일 캐싱 2.4s → 0.4s · MVT 신규 구현"
          module="타일 / 파일 서버"
        >
          <p>
            수십~수백 MB GeoTIFF 원본을 그대로 내려주면 뷰어가 렌더링하지 못합니다.
            Go로 영상 서빙 서버를 구현하고, 조회 목적에 따라 세 가지 프로토콜을 지원했습니다.
          </p>
          <CompareTable
            headers={["프로토콜", "방식", "용도"]}
            rows={[
              { cells: ["WMS", "임의 BBOX 단일 이미지 렌더링", "고정 단일 영역 조회 - BBOX가 매번 달라 캐시 히트율 0%에 수렴, 인터랙티브 탐색 불적합"] },
              { cells: ["WMTS", "256×256 고정 격자 타일 사전 생성 · 디스크 캐싱", "베이스맵 전체 영역 · 줌 레벨별 점진적 로드 (2.4s → 0.4s) - tile URL 고정으로 캐시 히트율 높음"], highlight: true },
              { cells: ["MVT", "ETL 사전 생성 · 줌 레벨별 자동 단순화", "객체탐지 결과 오버레이 (~5분 → 1초 이내)"], highlight: true },
            ]}
          />
          <p className="font-medium text-foreground">GeoJSON → MVT 전환</p>
          <p>
            기존에는 객체탐지 결과를 <Highlight>GeoJSON으로 요청마다 동적 생성</Highlight>해 내려줬습니다.
            영역 기반 조회 특성상 캐시 히트율이 낮아 캐싱 효과도 없었고,
            GeoJSON은 줌 레벨과 무관하게 항상 풀 디테일로 직렬화되기 때문에
            멀리서 볼 때도 수십만 개 좌표를 전부 전송했습니다.
          </p>
          <p>
            ETL 파이프라인에서 탐지 결과를 <Highlight>MVT(Mapbox Vector Tile)로 사전 생성</Highlight>하도록 바꿨습니다.
            MVT는 줌 레벨별로 형상을 자동 단순화해 멀리서는 적은 데이터만, 확대할수록 정밀한 형상을 전송합니다.
            요청 시 생성 없이 미리 만들어진 타일을 바로 서빙하므로 체감 속도가 완전히 달라졌습니다.
          </p>
          <CompareTable
            headers={["구분", "GeoJSON 동적 생성", "MVT 사전 생성"]}
            rows={[
              { cells: ["응답 시간", "~5분 (탐지 결과 규모에 따라)", "1초 이내"], highlight: true },
              { cells: ["클라이언트 사양", "i5 이상 필요", "펜티엄급에서도 동작"], highlight: true },
              { cells: ["줌 대응", "풀 디테일 고정", "줌 레벨별 자동 단순화 - 확대해도 보이는 영역만"], highlight: true },
              { cells: ["캐시 효율", "영역 기반 - 히트율 낮음", "타일 단위 - 재사용 가능"] },
              { cells: ["생성 시점", "요청마다 실시간", "ETL 완료 시 자동"] },
            ]}
          />
          <p>
            MVT는 확대할수록 디테일이 올라가지만 <Highlight>가시 영역 자체가 좁아지기 때문에</Highlight>
            전송·렌더링해야 할 데이터량은 오히려 일정하게 유지됩니다.
            GeoJSON처럼 전체 탐지 결과를 한 번에 내려주지 않아 클라이언트 메모리 부담이 크게 줄었고,
            사양 제약이 있는 현장 운용 환경에서도 원활하게 동작하게 됐습니다.
          </p>
          <p className="font-medium text-foreground">Nginx Ingress keepalive 튜닝</p>
          <p>
            타일 요청이 트래픽 대부분을 차지하는데, 매 요청마다 <Highlight>TCP 핸드셰이크가
            반복</Highlight>되는 오버헤드가 있었습니다. Nginx Ingress의{" "}
            <code>upstream keepalive</code> 설정으로 커넥션을 재사용하도록 바꿔 핸드셰이크
            오버헤드를 제거했고, 동시에 K8s 레플리카를 늘려도 그대로 스케일되는 구조를
            확보했습니다.
          </p>
        </AccordionSection>

        {/* 6. 대용량 다운로드 재설계 */}
        <AccordionSection
          title="대용량 산출물 다운로드 재설계 - 채널 경쟁조건 제거"
          hint="goroutine+channel의 close/send 경쟁 panic 위험을 원자적 캐싱 + HTTP Range로 해결"
          module="타일 / 파일 서버"
        >
          <p>
            산출물 압축 다운로드를 goroutine과 channel로 구현했는데, 타임아웃이
            발생하면 채널을 <code>close</code>하는 쪽과 압축 결과를 <code>send</code>하는
            쪽이 경쟁해 이미 닫힌 채널에 값을 보내려다 <Highlight>panic</Highlight>이
            날 수 있는 구조였습니다. 압축 결과를 메모리로 한 번에 스트리밍하다 보니
            Range 기반 재개 다운로드도 지원하지 못했습니다.
          </p>
          <p>
            채널 기반 동시성 코드를 걷어내고, 압축 결과를 임시파일로 만든 뒤{" "}
            <Highlight>원자적 rename</Highlight>으로 캐싱(TTL 1시간)하는 방식으로
            재작성했습니다. 파일 기반으로 바뀌면서 <Highlight>HTTP Range 요청</Highlight>도
            자연스럽게 지원하게 돼, 대용량 파일 다운로드 중 끊겨도 처음부터 다시 받을
            필요가 없어졌습니다.
          </p>
        </AccordionSection>

        {/* OD/SEG */}
        <AccordionSection
          title="관심정보 객체탐지 · 변화탐지 세그멘테이션 성능 향상"
          hint="객체탐지 mAP50 0.644 · 세그멘테이션 mIoU 0.7205"
          module="AI 추론"
        >
          <p>
            <strong className="text-foreground">객체탐지</strong>는 20클래스를 OBB·HBB로 이원화했습니다.
            회전 방향이 식별에 중요한 함선·항공기 등 대형 15cls는 OBB(YOLOv11m-obb),
            위치만 중요한 차량·트럭 소형 5cls는 HBB(YOLOv11m)로 분리했습니다.
            위성은 나디르(직하방) 고정 촬영이라 객체 방향이 이미 정렬되어 있어
            45° 회전 augmentation 적용 시 mAP50이 오히려 하락했습니다.
          </p>
          <CompareTable
            headers={["모델", "타입", "augmentation", "mAP50"]}
            rows={[
              { cells: ["YOLOv11m", "HBB", "mosaic + mixup + copy_paste", "0.644"], highlight: true },
              { cells: ["YOLOv11m", "HBB", "+ degrees=45 회전", "0.577 ↓"], muted: true },
              { cells: ["YOLOv11m-obb", "OBB", "mosaic only (ProBIoU OOM 방지)", "0.604"], highlight: true },
            ]}
          />
          <p>
            <strong className="text-foreground">세그멘테이션</strong>은 땅(나지)과 도로가 색상이 유사해 픽셀 분류 자체가 까다로웠습니다.
            DINOv2 ViT-B/14를 적용했으나 목표 mIoU 0.72에 미달해 조기 종료했습니다.
            ImageNet-22k ConvNeXt-Base에 도로 중심선 보조 학습(Skeleton Head)을 추가해
            최종 <Highlight>mIoU 0.7205</Highlight>를 달성했습니다.
          </p>
          <CompareTable
            headers={["backbone", "decoder", "mIoU", "비고"]}
            rows={[
              { cells: ["ConvNeXt-Base (ImageNet-22k)", "UPerNet + Skeleton Head", "0.7205", "✓ 최종 채택"], highlight: true },
              { cells: ["HRNet-W48 (ImageNet-1k)", "UPerNet", "0.6857", ""] },
              { cells: ["DINOv2 ViT-B/14", "UPerNet", "0.6656", "조기 종료"], muted: true },
            ]}
          />
          <p>
            추론 서빙 쪽에서는 gunicorn worker를 5개에서 <Highlight>1개로 축소</Highlight>해
            GPU VRAM 경합을 없애고, 타일 경계에 걸친 대형 객체의 중복 검출은 overlap을
            128px→384px로 넓히고 <Highlight>cross-tile NMS</Highlight>를 추가해 제거했습니다.
          </p>
        </AccordionSection>
      </div>

      <div className="border-t border-border" />

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">인프라</h2>

        {/* Kubernetes 도입 배경 */}
        <AccordionSection
          title="Kubernetes 도입 - kubeadm 베어메탈 클러스터 부트스트랩"
          hint="Docker Compose · 스크립트 관리 · K8s 세 가지 대안 비교 후 kubeadm으로 직접 부트스트랩"
          module="인프라"
        >
          <p>
            위성영상을 받아 AI 추론까지 흘려보내는 플랫폼을 만들어야 했는데, 처음엔
            Docker 컨테이너 몇 개로 묶는 구조를 먼저 생각했습니다. 컨테이너 하나가
            죽으면 작업이 그냥 사라지는 구조로는 운영이 불가능했습니다.
          </p>
          <p>
            대안은 세 가지였습니다 - <Highlight>Docker Compose</Highlight>로 묶는 방식,
            직접 스크립트로 프로세스를 관리하는 방식, <Highlight>K8s</Highlight>. 앞의 두
            방식은 노드가 늘어날수록 관리 포인트가 선형으로 늘고, 노드 장애 시 수동
            개입이 필요했습니다.
          </p>
          <CompareTable
            headers={["대안", "검토 결과"]}
            rows={[
              { cells: ["Docker Compose", "노드가 늘수록 관리 포인트 선형 증가, 장애 시 수동 개입"], muted: true },
              { cells: ["스크립트 기반 프로세스 관리", "노드 자동 복구 불가, 노드 확장 시 관리 부담 증가"], muted: true },
              { cells: ["Kubernetes", "여러 노드에 걸친 워크로드 자동 복구 - 채택"], highlight: true },
            ]}
          />
          <p>
            워크로드가 여러 노드에 걸쳐 돌아야 하고 자동 복구가 필요한 상황이라
            K8s를 택했습니다. 관리형 K8s가 없는 온프레미스 환경이라{" "}
            <Highlight>kubeadm으로 클러스터를 직접 부트스트랩</Highlight>했고, 이 아키텍처가
            이후 모든 K8s 기반 AI 처리 플랫폼의 출발점이 됐습니다.
          </p>
        </AccordionSection>

        {/* SaltStack 기반 K8s 운영 안정화: 자원 인지형 스케줄링 + CrashLoopBackOff 진단 */}
        <AccordionSection
          title="SaltStack 기반 K8s 운영 안정화 - 자원 인지형 스케줄링 & CrashLoopBackOff 진단"
          hint="K8s 기본 스케줄러가 메모리 사용률을 못 봐서 OOM 발생 → SaltStack 배치 제어 / SaltStack master 파드 자체의 CrashLoopBackOff는 무거운 livenessProbe가 원인"
          module="Salt-Stack"
        >
          <p className="font-medium text-foreground">1. 노드 자원 인지형 스케줄링</p>
          <p>
            K8s 기본 스케줄러는 파드에 선언된 리소스 요청·한도 값만 보고 배치를 결정할 뿐,
            노드의 <Highlight>실제 메모리 사용률</Highlight>은 반영하지 않습니다.
            그 결과 특정 노드에 무거운 AI 작업이 몰리면 <Highlight>OOM</Highlight>이 발생했습니다.
          </p>
          <p>
            SaltStack Minion으로 각 노드의 연결 상태와 메모리 사용률을 실시간으로 점검하고,
            메모리 <Highlight>50% 미만</Highlight> 노드에만 AI 워크로드를 자동 할당하는
            자원 인지형 배치 구조를 만들었습니다. 관리형 K8s가 없는 온프레미스 환경이라
            노드 상태 점검·배치 판단을 직접 구현해야 했습니다.
          </p>
          <CompareTable
            headers={["", "K8s 기본 스케줄러", "SaltStack 자원 인지형 배치"]}
            rows={[
              { cells: ["배치 기준", "리소스 요청·한도 값", "노드별 실시간 메모리 사용률"], highlight: true },
              { cells: ["과부하 노드 회피", "불가 - 값만 보고 배치", "메모리 50% 미만 노드에만 할당"], highlight: true },
              { cells: ["결과", "특정 노드 OOM 반복", "노드 과부하·OOM 사전 차단"], highlight: true },
            ]}
          />
          <p className="font-medium text-foreground">2. K8s CrashLoopBackOff 근본원인 진단 (SaltStack master 파드)</p>
          <p>
            정작 배치를 담당하는 SaltStack master 파드 자체가 반복적으로{" "}
            <Highlight>CrashLoopBackOff</Highlight>에 빠졌습니다. livenessProbe가 전체
            minion 목록을 조회하고 각 minion에 <code>kubectl exec</code>까지 수행하는
            무거운 스크립트였는데, 이 실행 시간이 probe timeout(1초)에 가까워 정상 동작
            중에도 타임아웃이 잦았습니다.
          </p>
          <p>
            헬스체크를 <Highlight>프로세스 생존 여부(pgrep)</Highlight>만 확인하는 경량
            체크로 축소하고, <code>timeoutSeconds</code>·<code>periodSeconds</code>를
            재조정해 기존 minion 자동 재시작 로직을 probe에서 분리했습니다. 불필요한
            재시작을 유발하던 무거운 체크 로직을 걷어내 파드 안정성을 확보했습니다.
          </p>
        </AccordionSection>

        {/* GPU 자원 공유 */}
        <AccordionSection
          title="GPU 자원 공유 - Aliyun GPUShare (Fractional GPU)"
          hint="1파드=1GPU라 자원 90% 유휴 → GPU 메모리 fraction 단위 분할로 GPU 4장에서 70파드 병렬 추론"
          module="AI 추론"
        >
          <p>
            노드당 GPU 하나를 컨테이너 하나가 점유하는 방식이라, 여러 모델을 동시에 띄워야 하는
            요건과 맞지 않았고 대부분의 시간 동안 GPU가 유휴 상태였습니다.
          </p>
          <p>
            하드웨어 파티셔닝(<Highlight>NVIDIA MIG</Highlight>)도 검토했지만, 당시 GPU 모델이
            MIG를 지원하지 않아 소프트웨어 레벨 공유로 방향을 잡았습니다. <Highlight>Aliyun GPUShare</Highlight>를
            도입해 여러 컨테이너가 하나의 GPU를 fraction 단위로 나눠 쓰는 구조를 구성했습니다.
          </p>
          <CompareTable
            headers={["방식", "검토 결과"]}
            rows={[
              { cells: ["1파드 = 1GPU (기존)", "GPU 자원 대부분 유휴, 동시 모델 서빙 불가"] },
              { cells: ["NVIDIA MIG (하드웨어 파티셔닝)", "당시 GPU 모델 미지원으로 제외"], muted: true },
              { cells: ["Aliyun GPUShare (소프트웨어 공유)", "GPU 메모리 fraction 단위 분할 - 채택"], highlight: true },
            ]}
          />
          <p>
            한정된 GPU로 더 많은 워크로드를 돌릴 수 있게 되면서 <Highlight>GPU 4장에서 70파드 병렬 추론</Highlight>,
            일 처리량은 200건에서 3,000건으로 늘었습니다.
          </p>
        </AccordionSection>

        {/* HTTPS 리버스 프록시 · TLS 인증서 */}
        <AccordionSection
          title="HTTPS 리버스 프록시·TLS 인증서 구성"
          hint="Tomcat 앞단 Nginx로 HTTPS 종단 - 와일드카드 인증서·보안 헤더·쿠키 속성 통합 관리"
          module="Nginx"
        >
          <p>
            레거시 Tomcat 기반 프론트엔드를 외부에 HTTPS로 노출해야 했는데, Tomcat이 직접
            내려주는 보안 헤더가 서비스마다 제각각이었고, 와일드카드 인증서와 체인을
            Tomcat 단독으로 관리하기도 번거로웠습니다.
          </p>
          <p>
            <Highlight>Nginx를 Tomcat 앞단 HTTPS 리버스 프록시</Highlight>로 구성해 와일드카드
            TLS 인증서(전체 체인 포함)를 적용하고, TLSv1.2/1.3·세션 캐시를 설정했습니다.
            Tomcat이 내려주는 중복 보안 헤더는 제거하고 <Highlight>CSP·X-Frame-Options·
            Referrer-Policy</Highlight> 등을 Nginx 한 곳에서 통합 관리했습니다.
          </p>
          <CompareTable
            headers={["항목", "Tomcat 단독", "Nginx 리버스 프록시"]}
            rows={[
              { cells: ["TLS 인증서 관리", "서비스마다 개별 적용", "Nginx 한 곳에서 와일드카드 인증서 통합 관리"], highlight: true },
              { cells: ["보안 헤더", "서비스마다 제각각", "CSP·X-Frame-Options 등 한 곳에서 일원화"], highlight: true },
              { cells: ["외부 지도 타일 API 호출", "프론트엔드에서 직접 - CSP·보안 정책 저촉", "path 기반으로 Nginx가 대신 프록시"], highlight: true },
            ]}
          />
          <p>
            path 기반 라우팅으로 내부 분석 서비스·지도 서버와 외부 지도 타일 API를 함께
            프록시하고, 쿠키 보안 속성(<code>secure</code>·<code>httponly</code>·<code>samesite</code>)까지
            일괄 적용했습니다. 대용량 위성영상 전송을 위한 타임아웃·바디 크기(최대 5GB)도
            함께 튜닝했습니다.
          </p>
        </AccordionSection>
      </div>
    </div>
  );
}
