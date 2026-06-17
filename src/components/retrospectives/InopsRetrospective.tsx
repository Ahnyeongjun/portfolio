function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-sm font-medium">
      {children}
    </span>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left font-semibold text-foreground whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-2.5 text-muted-foreground">
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

function FlowNode({ children, highlight, sub, warn }: { children: React.ReactNode; highlight?: boolean; sub?: string; warn?: boolean }) {
  return (
    <div className={`px-3 py-1.5 rounded-md border text-xs font-medium text-center shrink-0 ${
      highlight
        ? "bg-primary/10 border-primary/30 text-primary"
        : warn
        ? "bg-red-500/10 border-red-500/30 text-red-600"
        : "bg-background border-border text-foreground"
    }`}>
      {children}
      {sub && <div className="font-normal text-muted-foreground mt-0.5">{sub}</div>}
    </div>
  );
}

export function InopsRetrospective() {
  return (
    <div className="space-y-10 text-muted-foreground leading-relaxed">

      {/* System Flow */}
      <div className="p-5 rounded-xl border border-border bg-muted/20">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">API 요청 흐름 (개선 후)</p>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <FlowNode>클라이언트</FlowNode>
            <span className="text-muted-foreground text-xs">→</span>
            <FlowNode sub="Spring Boot + MyBatis">REST API 서버</FlowNode>
            <span className="text-muted-foreground text-xs">→</span>
            <FlowNode highlight sub="TTL 30m~24h · DB 1">Redis 캐시</FlowNode>
            <span className="text-muted-foreground text-xs">캐시 히트 →</span>
            <FlowNode sub="~20ms">즉시 응답</FlowNode>
          </div>
          <div className="flex items-center gap-2 pl-36">
            <span className="text-muted-foreground text-xs">↓ 캐시 미스</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 pl-8">
            <FlowNode sub="페이징 · 조건부 공간 연산">MyBatis 쿼리</FlowNode>
            <span className="text-muted-foreground text-xs">→</span>
            <FlowNode sub="PostgreSQL / PostGIS">DB 조회</FlowNode>
            <span className="text-muted-foreground text-xs">→</span>
            <FlowNode highlight sub="캐시 저장 후 반환">응답</FlowNode>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <FlowNode warn sub="13,018건 전수 조회">개선 전: 페이징 없음</FlowNode>
            <FlowNode warn sub="모든 행 ST_INTERSECTION">개선 전: 무조건 공간 연산</FlowNode>
            <FlowNode warn sub="수십 MB × 목록 쿼리">개선 전: 이진 컬럼 포함</FlowNode>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p>
          공공기관에 납품된 위성 정보 관리 플랫폼에서 특정 API들이 수십 초씩 지연되거나 타임아웃이
          발생하는 문제가 보고됐습니다. 로그 설정이 전체 비활성화된 내부망 환경이라
          직접 디버거를 붙이거나 로그를 볼 수 없었고, 응답 데이터 분석과 바이트코드 디컴파일로
          원인을 추적했습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">단일 요청 응답시간 — 수정 전후 비교</h3>
        <Table
          headers={["API", "수정 전", "수정 후", "개선율", "원인"]}
          rows={[
            ["목록 조회 API", "38,018ms", <span key="a" className="text-green-600 font-semibold">159ms</span>, "239배", "페이징 미적용 → 전수 조회 + 공간 연산 전체 실행"],
            ["날짜별 집계 API", "46,307ms", <span key="b" className="text-green-600 font-semibold">122ms</span>, "379배", "CTE 카티션 곱 + 풀스캔 2회"],
            ["풋프린트 집계 API", "TIMEOUT (>60s)", <span key="c" className="text-green-600 font-semibold">1,743ms</span>, "정상화", "집계 대상 행 수 미제한"],
            ["알림 목록 API", "~25,000ms", <span key="d" className="text-green-600 font-semibold">60ms</span>, "417배", "목록 쿼리에 수십 MB 이진 컬럼 포함"],
          ]}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">원인 1 — 페이징 미적용과 공간 연산 무조건 실행</h3>
        <p>
          목록 조회 API는 컨트롤러에서 페이지 번호·크기 기본값을 설정하지 않아
          PageHelper가 동작하지 않았습니다. 결과적으로 <Highlight>13,018건 전수 조회</Highlight> 후
          메모리에 적재해 반환하고 있었습니다.
        </p>
        <p>
          더 큰 문제는 파라미터 유무와 무관하게 모든 행에 대해
          <Highlight>PostGIS 교집합 연산(ST_INTERSECTION + ST_AREA)</Highlight>을 실행하는 구조였습니다.
          13,018건 × 폴리곤 교집합 계산은 CPU 시간이 선형으로 누적됩니다.
          파라미터가 없을 때 연산을 건너뛰는 조건 분기로 해결했습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">원인 2 — 대용량 이진 컬럼을 목록 쿼리에 포함</h3>
        <p>
          알림 목록 API는 건별로 수십 MB에 달하는 base64 인코딩 PNG 이미지를
          담는 컬럼이 <Highlight>목록 쿼리의 SELECT 절에 포함</Highlight>되어 있었습니다.
          단 한 건 조회 시에도 매번 DB에서 전체 바이너리를 읽어오는 구조입니다.
        </p>
        <p>
          목록 쿼리용 컬럼 정의를 별도로 만들어 이진 컬럼을 제외하고,
          상세 조회(다운로드)에서만 해당 컬럼을 반환하도록 분리했습니다.
          25초 → 60ms로 단축됐습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">k6 동시 부하 테스트 — 장애 패턴 재현과 해소</h3>
        <p>
          수정 전, 알림 API가 25초씩 응답하면서 동시 사용자 30명 수준에서
          <Highlight>HikariCP 커넥션 30개를 모두 점유</Highlight>했습니다.
          그 결과 7ms짜리 메뉴 API, 13ms짜리 인증 API도 커넥션 대기로 10초 이상 지연되는
          연쇄 장애가 발생했습니다. 사용자가 20명만 넘어도 서버 전체가 응답 불능 상태에 빠졌습니다.
        </p>
        <Table
          headers={["지표", "수정 전", "수정 후"]}
          rows={[
            ["총 처리 요청 (50 VU, 105초)", "392건", <span key="a" className="text-green-600 font-semibold">1,177건 (+200%)</span>],
            ["평균 응답시간", "5,031ms", <span key="b" className="text-green-600 font-semibold">1,883ms</span>],
            ["p(90)", "34,999ms (timeout)", <span key="c" className="text-green-600 font-semibold">7,378ms</span>],
            ["p(95)", "35,000ms (timeout)", <span key="d" className="text-green-600 font-semibold">9,801ms</span>],
            ["에러율", <span key="e" className="text-red-500 font-semibold">11.22%</span>, <span key="f" className="text-green-600 font-semibold">0.00% ✓</span>],
            ["timeout 발생", "메뉴·인증 등 빠른 API까지 연쇄", <span key="g" className="text-green-600 font-semibold">없음</span>],
          ]}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Redis 캐싱 후 전체 개선 현황</h3>
        <p>
          쿼리 최적화 이후 Redis 캐싱을 추가로 적용했습니다.
          세션(DB 0)과 분리된 캐시 전용 커넥션(DB 1)을 사용하고,
          데이터 특성에 맞춰 TTL을 개별 설정했습니다.
        </p>
        <Table
          headers={["API", "수정 전", "쿼리 최적화 후", "캐시 적용 후", "누적 개선율"]}
          rows={[
            ["목록 조회 API", "38,018ms", "159ms", "~20ms", "1,901배"],
            ["날짜별 집계 API", "46,307ms", "181ms", "~20ms", "2,315배"],
            ["알림 목록 API", "~25,000ms", "104ms", "~20ms", "1,250배"],
            ["공통코드 전체 API", "998ms", "582ms", "~20ms", "50배"],
          ]}
        />
        <p className="text-sm text-muted-foreground/70">
          ※ 캐시 적용 후 수치는 캐시 히트 기준. TTL: 공통코드 24h / 집계성 1~2h / 목록성 30m
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">제약 환경 배포 — WAR 직접 패치</h3>
        <p>
          내부망 환경이라 Maven Nexus에 접근할 수 없어 일반적인 빌드·배포 파이프라인을
          사용할 수 없었습니다. .NET의 ZipArchive API를 활용해
          실행 중인 WAR 파일 내부의 <Highlight>.class / .xml 파일만 교체</Highlight>하는 방식으로
          서버 재시작 없이 패치를 적용했습니다.
        </p>
      </div>

    </div>
  );
}
