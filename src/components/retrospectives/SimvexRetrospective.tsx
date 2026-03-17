import { GitBranch, Server, BookOpen } from "lucide-react";

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

export function SimvexRetrospective() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">프로젝트 회고</h2>
      <div className="space-y-5">

        <Section icon={GitBranch} title="Transform 충돌 방지 — 이중 그룹 구조">
          <p>
            3D 편집에서 문제가 하나 있었습니다.
            분해 애니메이션은 부품을 <Highlight>절대 위치</Highlight>로 이동시키고,
            사용자의 Transform 편집은 부품을 <Highlight>상대적으로 이동</Highlight>시킵니다.
            두 변환을 같은 오브젝트에 적용하면 서로 덮어씁니다.
          </p>
          <p>
            해결 방법은 <Highlight>두 계층으로 분리</Highlight>하는 것입니다.
            바깥 그룹(Outer Group)이 분해 애니메이션을 담당하고,
            안쪽 그룹(Inner Group)이 사용자의 Transform 편집을 담당합니다.
            두 변환은 독립적으로 적용되어 서로 간섭하지 않습니다.
          </p>
          <CodeBlock>{`<group ref={outerGroupRef}>     {/* 분해 애니메이션 담당 */}
  <group ref={innerGroupRef}>   {/* 사용자 Transform 담당 */}
    <primitive object={scene} />
  </group>
</group>

// useFrame에서 outerGroup에만 분해 위치 적용
outerGroupRef.current.position.lerp(explodeTarget, 0.1);

// TransformControls는 innerGroup에 연결
<TransformControls object={innerGroupRef.current} />`}</CodeBlock>
          <p>
            Undo/Redo도 이 구조 덕분에 깔끔하게 구현했습니다.
            히스토리에는 innerGroup의 position/rotation만 저장하고,
            <code>useEditStore.subscribe</code>로 히스토리 변화를 감지해
            innerGroup을 직접 복원합니다.
          </p>
        </Section>

        <Section icon={Server} title="SSE 스트리밍 AI 응답 — 타이핑 애니메이션">
          <p>
            AI 어시스턴트는 <Highlight>SSE(Server-Sent Events)</Highlight>로 응답을 스트리밍합니다.
            백엔드에서 <code>text/event-stream</code> 형식으로 청크를 보내고,
            프론트엔드는 <code>ReadableStream</code>을 파싱하여 실시간으로 화면에 표시합니다.
          </p>
          <CodeBlock>{`// SSE 스트림 파싱
const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  const lines = chunk.split("\\n").filter(l => l.startsWith("data:"));

  for (const line of lines) {
    const data = line.replace(/^data:\\s?/, "");
    try {
      const parsed = JSON.parse(data);
      appendToTypingQueue(parsed.answer);
    } catch {
      appendToTypingQueue(data); // JSON 파싱 실패 시 원문 그대로
    }
  }
}`}</CodeBlock>
          <p>
            스트리밍이 완료된 텍스트를 바로 표시하면 응답이 한꺼번에 나타나 어색합니다.
            큐(Queue)에 쌓아두고 <Highlight>30ms 인터벌로 2글자씩</Highlight> 화면에 추가해
            사람이 타이핑하는 것처럼 보이도록 했습니다.
            스트리밍 수신과 화면 렌더링을 분리한 덕분에 네트워크 속도와 무관하게
            일정한 타이핑 속도를 유지할 수 있습니다.
          </p>
        </Section>

        <Section icon={BookOpen} title="성장과 배움">
          <p>
            해커톤 특성상 짧은 시간에 많은 기능을 구현해야 했습니다.
            Three.js를 처음 제대로 써본 프로젝트였는데,
            3D 렌더링의 좌표계, 애니메이션 루프, 상태 동기화 방식이
            일반적인 React 패턴과 꽤 다르다는 것을 직접 부딪히며 배웠습니다.
          </p>
          <div>
            <p className="font-medium text-foreground mb-3">이 프로젝트를 통해 얻은 것:</p>
            <ul className="space-y-2 ml-1">
              {[
                "Outer/Inner 이중 그룹 구조 — 두 변환 시스템이 충돌하지 않도록 계층을 나누는 설계 패턴",
                "useFrame 기반 애니메이션 — React 렌더 사이클이 아닌 Three.js 렌더 루프에서 상태를 제어하는 방식",
                "SSE 스트리밍 파싱 + 타이핑 애니메이션 — 수신과 표시를 분리하여 자연스러운 AI 응답 UX 구현",
                "Zustand subscribe 패턴 — 상태 변화를 3D 씬에 직접 반영하는 브릿지 구조",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

      </div>
    </section>
  );
}
