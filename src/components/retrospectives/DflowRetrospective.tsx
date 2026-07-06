import { FlaskConical, Bug, Database } from "lucide-react";

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
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
  rows: { cells: string[]; highlight?: boolean }[];
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
            <tr key={i} className={row.highlight ? "bg-primary/5" : "hover:bg-muted/20 transition-colors"}>
              {row.cells.map((cell, j) => (
                <td key={j} className={`px-3 py-2 ${row.highlight ? "text-foreground" : "text-muted-foreground"}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DflowRetrospective() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">프로젝트 회고</h2>
      <div className="space-y-5">

        <Section icon={FlaskConical} title="GPU 없이도 반복 가능한 부하테스트 환경 만들기">
          <p>
            DFLOW는 라벨링 후 학습·추론까지 이어지는 사내 MLOps 플랫폼입니다.
            ML 백엔드 API에 부하테스트를 붙이려 했는데, 기존 ML 서버는 <Highlight>torch</Highlight>에
            의존하고 있어 GPU가 없는 환경에서는 반복 실행 자체가 어려웠습니다.
          </p>
          <p>
            torch 없이 동작하는 <Highlight>Flask mock 서버</Highlight>를 직접 구현해
            health·training_status·predict·setup·train·webhook 등 실제 ML 서버가 노출하는
            엔드포인트를 그대로 흉내 냈습니다. k6 인증 테스트용 유저·토큰을 미리 생성하는 스크립트도
            함께 작성해, 매 테스트마다 로그인 절차를 반복하지 않도록 했습니다.
          </p>
        </Section>

        <Section icon={Bug} title="k6 스펙 불일치 디버깅 — 실패율 23.8% → 0.5%">
          <p>
            k6로 4개 시나리오 부하테스트를 처음 돌렸을 때 실패율이 <Highlight>23.8%</Highlight>에 달했습니다.
            원인은 성능 문제가 아니라 API 스펙 불일치였습니다 — 태스크 임포트 요청 바디가
            실제 API 스펙과 달랐고, Transfer Learning 엔드포인트 URL이 잘못돼 있었으며,
            k6의 예약어와 충돌하는 <code>http.delete()</code> 호출도 있었습니다.
          </p>
          <p>
            요청 스펙을 하나씩 실제 API와 대조해 맞추자 실패율이 <Highlight>0.5%</Highlight>까지 떨어졌고,
            그제서야 남은 실패가 진짜 성능 문제(api_load 시나리오의 응답 지연)라는 걸 확인할 수 있었습니다.
          </p>
        </Section>

        <Section icon={Database} title="진짜 병목 — SQLite 동시 쓰기 직렬화">
          <p>
            api_load 시나리오만 계속 실패하는 원인을 추적한 결과, ML 백엔드 상태를 확인할 때마다
            매번 DB를 조회하고 결과를 그대로 다시 저장하는 구조가 병목이었습니다.
            SQLite는 쓰기 작업을 직렬화하기 때문에, 동시 요청이 몰리면 쓰기 대기가 누적됩니다.
          </p>
          <p>
            ML 서버 상태 체크 결과를 <Highlight>LocMemCache</Highlight>(TTL 30초)에 저장해 캐시가
            살아있으면 ML 서버 호출 자체를 건너뛰게 하고, 값이 바뀌지 않았으면 DB 저장도 생략하도록
            했습니다. 태스크 생성 시 즉시 상태를 갱신하던 것도 첫 조회 시점으로 미뤘습니다.
            여기에 SQLite <Highlight>WAL 모드</Highlight>와 busy_timeout(20초)을 앱 시작 시점에
            적용해 쓰기 잠금 대기 자체도 줄였습니다.
          </p>
          <CompareTable
            headers={["지표", "전", "후"]}
            rows={[
              { cells: ["api_load p95", "4,239ms", "2,106ms (-50%)"], highlight: true },
              { cells: ["VU당 DB 쓰기 횟수", "5회", "2회 (-60%)"], highlight: true },
            ]}
          />
          <p>
            20 동시 VU 기준으로는 여전히 SQLite 쓰기 직렬화가 남은 병목이라, 트래픽이 더 늘면
            PostgreSQL 전환이 다음 단계로 필요하다는 것도 이 과정에서 함께 확인했습니다.
          </p>
        </Section>

      </div>
    </section>
  );
}
