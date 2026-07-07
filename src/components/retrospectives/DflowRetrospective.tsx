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
    <div className={`px-3 py-1.5 rounded-md border text-xs font-medium text-center flex-1 ${highlight
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

export function DflowRetrospective() {
  return (
    <div className="space-y-8 text-muted-foreground leading-relaxed">

      {/* 아키텍처 */}
      <div className="p-5 rounded-xl border border-border bg-muted/20 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">아키텍처</p>

        <div className="flex justify-center">
          <FlowNode highlight sub="라벨링 · train/predict 이벤트 트리거">Dflow UI (Django)</FlowNode>
        </div>
        <div className="flex justify-center text-muted-foreground text-xs">↓ REST API</div>
        <div className="flex justify-center">
          <FlowNode highlight sub="모델별 독립 Docker 컨테이너">Dflow ML (processors)</FlowNode>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex-1 border-t border-dashed border-border" />
          <span className="shrink-0 px-2">k6 · Locust 부하테스트 · SQLite</span>
          <div className="flex-1 border-t border-dashed border-border" />
        </div>
      </div>

      {/* 도입부 */}
      <p>
        DFLOW는 라벨링된 데이터셋으로 모델을 학습하고, 추론 결과에 추가 라벨링을 반복하는
        사내 MLOps 플랫폼입니다. UI에서 라벨링·학습·추론 이벤트가 발생하면 REST API로
        ML 프로세서(모델별 Docker 컨테이너)를 호출하는 구조입니다. 이 ML 백엔드 API에
        k6·Locust 부하테스트를 도입해 성능 병목을 진단하고 개선했습니다.
      </p>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">핵심 기능</h2>

        {/* 1. 테스트 인프라 */}
        <AccordionSection
          title="GPU 없이도 반복 가능한 부하테스트 환경"
          hint="torch 의존성 제거 → Flask mock 서버"
          module="테스트 인프라"
        >
          <p>
            ML 백엔드 API에 부하테스트를 붙이려 했는데, 기존 ML 서버가 <Highlight>torch</Highlight>에
            의존하고 있어 GPU 없는 환경에서는 반복 실행 자체가 어려웠습니다.
          </p>
          <p>
            torch 없이 동작하는 <Highlight>Flask mock 서버</Highlight>를 직접 구현해
            health·training_status·predict·setup·train·webhook 등 실제 ML 서버가 노출하는
            엔드포인트를 그대로 흉내 냈습니다. k6 인증 테스트용 유저·토큰을 미리 발급하는
            스크립트도 함께 작성해 매 테스트마다 로그인 절차를 반복하지 않도록 했습니다.
          </p>
        </AccordionSection>

        {/* 2. k6 스펙 디버깅 */}
        <AccordionSection
          title="k6 스펙 불일치 디버깅"
          hint="실패율 23.8% → 0.5%"
          module="API"
        >
          <p>
            k6로 4개 시나리오 부하테스트를 처음 돌렸을 때 실패율이 <Highlight>23.8%</Highlight>에
            달했습니다. 원인은 성능 문제가 아니라 API 스펙 불일치였습니다 - 태스크 임포트 요청
            바디가 실제 API 스펙과 달랐고, Transfer Learning 엔드포인트 URL이 잘못돼 있었으며,
            k6의 예약어와 충돌하는 <code>http.delete()</code> 호출도 있었습니다.
          </p>
          <p>
            요청 스펙을 실제 API와 하나씩 대조해 맞추자 실패율이 <Highlight>0.5%</Highlight>까지
            떨어졌고, 그제서야 남은 실패가 진짜 성능 문제(api_load 시나리오의 응답 지연)라는 걸
            확인할 수 있었습니다.
          </p>
          <CompareTable
            headers={["항목", "수정 전", "수정 후"]}
            rows={[
              { cells: ["태스크 임포트 바디", "[{image: ...}]", "[{data: {image: ...}}]"] },
              { cells: ["Transfer Learning URL", "/api/tasks/{id}/...", "/api/transferlearnings/{id}/..."] },
              { cells: ["삭제 요청", "http.delete()", "http.del()"] },
              { cells: ["k6 실패율", "23.8%", "0.5%"], highlight: true },
            ]}
          />
        </AccordionSection>

        {/* 3. SQLite 병목 */}
        <AccordionSection
          title="SQLite 동시 쓰기 병목 해결"
          hint="캐싱 + WAL 모드 → p95 4,239ms → 2,106ms"
          module="ML 백엔드"
        >
          <p>
            api_load 시나리오만 계속 실패하는 원인을 추적한 결과, ML 백엔드 상태를 확인할 때마다
            매번 DB를 조회하고 결과를 그대로 다시 저장하는 구조가 병목이었습니다. SQLite는 쓰기
            작업을 직렬화하기 때문에, 동시 요청이 몰리면 쓰기 대기가 누적됩니다.
          </p>
          <p>
            ML 서버 상태 체크 결과를 <Highlight>LocMemCache</Highlight>(TTL 30초)에 저장해 캐시가
            살아있으면 ML 서버 호출 자체를 건너뛰게 하고, 값이 바뀌지 않았으면 DB 저장도 생략하도록
            했습니다. 태스크 생성 시 즉시 상태를 갱신하던 로직도 첫 조회 시점으로 미뤘습니다.
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
        </AccordionSection>

      </div>
    </div>
  );
}
