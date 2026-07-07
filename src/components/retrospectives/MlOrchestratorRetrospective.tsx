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

export function MlOrchestratorRetrospective() {
  return (
    <div className="space-y-8 text-muted-foreground leading-relaxed">

      {/* 아키텍처 - 자율 루프 */}
      <div className="p-5 rounded-xl border border-border bg-muted/20 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">아키텍처 - 자율 실험 루프</p>

        <div className="flex justify-center">
          <FlowNode highlight sub="cronjob (@reboot · */5) - 주기 실행">Claude Code Skill</FlowNode>
        </div>
        <div className="flex justify-center text-muted-foreground text-xs">↓ work_history 읽고 다음 실험 판단</div>
        <div className="flex justify-center">
          <FlowNode sub="Hook + sh - 학습 프로세스 자동 실행">학습 실행</FlowNode>
        </div>
        <div className="flex justify-center text-muted-foreground text-xs">↓</div>
        <div className="flex justify-center">
          <FlowNode sub="install_monitor.sh - seg mIoU · YOLO mAP50 감지">모니터 데몬 / cron</FlowNode>
        </div>
        <div className="flex justify-center text-muted-foreground text-xs">↓ best_update · finished · error · stopped</div>
        <div className="flex justify-center">
          <FlowNode highlight sub="work_history/*.md 자동 기록">기록</FlowNode>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-primary">
          <div className="flex-1 border-t border-dashed border-primary/40" />
          <span className="shrink-0 px-2">↺ 다음 판단 인풋으로 재투입 - 무인 연속 실험</span>
          <div className="flex-1 border-t border-dashed border-primary/40" />
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex-1 border-t border-dashed border-border" />
          <span className="shrink-0 px-2">Stop 훅 기록 강제 · Slack WebHook 실시간 알림</span>
          <div className="flex-1 border-t border-dashed border-border" />
        </div>
      </div>

      {/* 도입부 */}
      <p>
        ML 실험 루프는 <Highlight>초기화 → 학습 → 검증 → 기록 → 다음 실험 결정</Highlight>으로 순환합니다.
        각 단계가 끝날 때마다 사람이 결과를 보고 다음 실험을 정해야 해서, 자리를 비우면 실험이 멈추고
        재개할 때 맥락을 다시 파악해야 했습니다. 이 반복 엔지니어링 자체를 Claude Code에 위임해,
        cronjob·Skill·Hook·work_history를 조합한 자율 루프로 엔지니어 개입 없는 연속 실험을 가능하게 한
        사내 개인 프로젝트입니다.
      </p>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">핵심 기능</h2>

        {/* 1. 자율 루프 */}
        <AccordionSection
          title="판단 → 실행 → 기록 → 재판단 자율 루프"
          hint="cronjob으로 Claude Code Skill 주기 실행 → work_history 재투입"
          module="자율 루프"
        >
          <p>
            핵심은 <Highlight>work_history</Highlight>를 상태 저장소이자 다음 판단의 입력으로 함께 쓴다는
            점입니다. cronjob이 <Highlight>Claude Code Skill</Highlight>을 주기적으로 깨우면, Skill은
            work_history의 지난 실험 기록을 읽어 다음 실험을 판단하고, <code>Hook + sh</code>로 학습
            프로세스를 자동 실행합니다. 학습이 끝나면 결과가 다시 work_history에 기록되고, 그 기록이
            다음 cron 틱의 판단 인풋으로 재투입됩니다.
          </p>
          <p>
            그 결과 AI를 단순 코드 보조가 아니라 <Highlight>반복 엔지니어링 자체를 위임하는 에이전트</Highlight>로
            운영하게 됐고, 엔지니어가 자리를 비워도 실험이 스스로 다음 사이클로 넘어갑니다.
          </p>
        </AccordionSection>

        {/* 2. 학습 모니터링 */}
        <AccordionSection
          title="seg · YOLO 학습 자동 감지 모니터"
          hint="install_monitor.sh - mIoU · mAP50 이벤트를 work_history에 기록"
          module="모니터링"
        >
          <p>
            실험 진행·완료·에러를 사람이 로그를 직접 봐야 파악할 수 있었습니다. 서버별로 한 번만
            실행하는 <Highlight>install_monitor.sh</Highlight>가 모니터 데몬과 <code>@reboot</code> cron을
            설치해, 실험 디렉토리와 컨테이너 상태를 주기적으로 스캔합니다. seg는 <code>log.txt</code>·
            체크포인트 파일명에서 <Highlight>mIoU</Highlight>를, YOLO는 <code>results.csv</code>에서
            <Highlight>mAP50</Highlight>을 읽는데, HBB/OBB로 컬럼 위치가 달라도 헤더명을 동적 탐색해
            둘 다 지원합니다.
          </p>
          <CompareTable
            headers={["", "type=seg", "type=yolo"]}
            rows={[
              { cells: ["진행 소스", "log.txt", "results.csv"] },
              { cells: ["지표", "mIoU", "mAP50 (헤더명 동적 탐색)"] },
              { cells: ["완료 판정", '"Training finished" 로그', "마지막 epoch ≥ args.yaml epochs"] },
              { cells: ["컨테이너 의존", "필요 (training_XX)", "불필요 (csv만으로 판정)"] },
            ]}
          />
          <p>
            <Highlight>best_update · finished · error(CUDA OOM 등) · stopped</Highlight> 이벤트를 감지해
            일별 <code>YYYY-MM-DD_auto_monitor.md</code>에 자동 기록합니다. 예를 들어 한 세그멘테이션
            학습은 <Highlight>mIoU 0.39 → 0.70</Highlight>까지 오르는 88 epoch 전 과정이 사람 개입 없이
            기록됐습니다. 실험별 상태 파일로 이벤트 중복 기록을 막아, cron 매 틱이 멱등이 되도록 했습니다.
          </p>
        </AccordionSection>

        {/* 3. 기록 강제 (Stop 훅) */}
        <AccordionSection
          title="Stop 훅으로 작업 기록 강제"
          hint="턴당 1회 block - 무한루프 없이 기록 누락 방지"
          module="Hook"
        >
          <p>
            작업 기록이 사람 의지에 의존하면 누락되기 쉽습니다. Claude Code <Highlight>Stop 훅</Highlight>으로
            매 턴이 끝날 때 &quot;작업했으면 work_history에 기록하라&quot;는 리마인드를 강제 주입했습니다.
            권한 규칙이 있는 <code>settings.local.json</code>을 직접 건드리면 auto-mode classifier가 권한
            확대로 거부하므로, 훅만 담은 별도 <code>settings.json</code>에 분리해 넣었습니다.
          </p>
          <p>
            훅이 매번 block하면 무한루프에 빠지므로, 세션별 sentinel 파일(<code>/tmp/claude-...-$session_id</code>)로
            <Highlight>턴당 1회만</Highlight> block하고 두 번째 stop은 통과시켰습니다.
          </p>
          <CodeBlock>{`# 파이프 테스트 결과
1차 stop = block   # "기록하라" 리마인드 주입
2차 stop = allow   # 통과 (무한루프 방지)
3차 stop = block   # 다음 턴 다시 강제`}</CodeBlock>
        </AccordionSection>

      </div>
    </div>
  );
}
