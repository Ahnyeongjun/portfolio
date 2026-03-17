import { Lightbulb, Server, Layout, Shield, Bot, BookOpen } from "lucide-react";

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

export function MomentierRetrospective() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">프로젝트 회고</h2>
      <div className="space-y-5">
        <Section icon={Layout} title="Next.js 환경 구성과 데이터 흐름 개선">
          <p>
            Next.js를 처음 사용하면서 클라이언트 환경 변수(<Highlight>NEXT_PUBLIC_</Highlight>)와
            서버 환경 변수가 분리되어 있다는 점을 뒤늦게 알게 되었습니다.
            배포 시 클라이언트 환경 변수를 별도로 주입해야 한다는 것을 인지하지 못해 시행착오를 겪었고,
            Dockerfile과 GitHub Actions에서 각각 환경 변수를 주입하는 방식으로 해결했습니다.
          </p>
          <p>
            데이터 흐름도 초기에는 페이지나 컴포넌트 내부에서 직접 가공하는 구조였지만,
            점차 <Highlight>Store에서 데이터를 가공</Highlight>하도록 리팩토링하여 책임 분리를 명확히 했습니다.
            API 호출 역시 별도 lib으로 분리하면서 응집도 있는 구조로 개선할 수 있었습니다.
          </p>
          <p>
            외부 이미지 연동에서는 Next.js의 Route Handler를 활용한 프록시 방식을 적용했습니다.
            보안과 이미지 최적화, 접근 제어 측면에서 유의미한 선택이었습니다.
          </p>
        </Section>

        <Section icon={Lightbulb} title="Zustand Store 설계와 Storybook 도입">
          <p>
            Zustand를 처음 사용하면서 7개의 Store를 설계했습니다.
            인증, 사용자 입력, 추천 결과, 일정 상세 등 도메인별로 분리하고,
            대부분의 Store에 <Highlight>persist</Highlight> 미들웨어를 적용하여
            새로고침이나 페이지 이동 시에도 상태가 유지되도록 구성했습니다.
          </p>
          <p>
            특히 일정 상세 Store에서 장소 간 경로·시간 계산 로직을 Store 내부에 배치한 것이
            컴포넌트의 복잡도를 크게 줄여주었습니다. Redux와 달리 보일러플레이트가 적어
            빠르게 기능을 구현할 수 있었지만, Store가 많아질수록 의존 관계 파악이 어려워지는 점도 느꼈습니다.
          </p>
          <p>
            Storybook은 Button, Card, Chip, Modal 등 공통 컴포넌트를 문서화하고,
            커스텀 뷰포트(XS 375px ~ XL 1600px)를 설정하여 반응형 디자인을 검증하는 체계를 구축했습니다.
            페이지 단위 스토리에서는 로그인/로딩/에러 등 상태별 시나리오를 작성하여
            실제 서비스 흐름을 시각적으로 확인할 수 있었습니다.
          </p>
        </Section>

        <Section icon={Server} title="MCP 백엔드 아키텍처 설계">
          <p>
            이 프로젝트의 핵심 학습 목표 중 하나는 <Highlight>MCP(Model Context Protocol)</Highlight>를
            직접 구축해보는 것이었습니다. OpenAI Agent가 Tour API를 도구(Tool)로 호출하여
            여행지를 추천하고 일정을 생성하는 구조를 설계했습니다.
          </p>

          <CodeBlock>{`[FastAPI Client :8000]
  ├── /api/create    → MCP Server :8070 (일정 생성)
  ├── /api/triplet   → MCP Server :8071 (여행지 추천)
  └── /api/suggest   → OpenAI Agent (입력 제안, MCP 미사용)

[MCP Server :8070]  ←SSE→  OpenAI Agent (gpt-4.1)
  └── Tools: list_attractions_by_region, find_nearby_attractions

[MCP Server :8071]  ←SSE→  OpenAI Agent (gpt-4.1-mini)
  └── Tools: list_attractions_by_region, search_attractions_by_keyword

[Tour API] ← HTTP ← MCP Server Tools
  └── 공공데이터포털 한국관광공사 API`}</CodeBlock>

          <p>
            MCP Server 2대를 SSE 전송 방식으로 운영하면서, 일정 생성(gpt-4.1)과
            여행지 추천(gpt-4.1-mini)에 각각 다른 모델을 적용했습니다.
            입력 제안처럼 외부 도구가 필요 없는 기능에는 MCP 없이 gpt-4.1-nano를 사용하여
            비용과 응답 속도를 최적화했습니다.
          </p>
          <p>
            Pydantic 구조화 출력을 활용하여 Agent 응답을 프론트엔드 스키마에 맞게 변환한 부분도
            중요한 경험이었습니다. 비정형 AI 응답을 정형화하는 과정에서
            프롬프트 설계와 출력 스키마 설계가 서로 밀접하게 연결된다는 것을 배웠습니다.
          </p>
        </Section>

        <Section icon={Shield} title="OAuth 인증 연동">
          <p>
            기존에는 직접 쿠키/세션 기반 인증이나 JWT 인증 서버를 구현해왔기에,
            OAuth는 처음이라 구조를 이해하는 데 시간이 걸렸습니다.
            특히 백엔드에서 OAuth 토큰을 받아올 때 <Highlight>redirect_url</Highlight> 파라미터가
            인가 코드(code)를 수신할 페이지를 의미한다는 것을 인지하는 것이 늦었습니다.
          </p>

          <CodeBlock>{`[메인 창] 로그인 버튼 클릭
  ↓
[팝업 창] OAuth 로그인 → redirect_uri로 리디렉션
  → code 수신 → postMessage로 code 전달
  ↓
[메인 창] code 수신 → 백엔드에 요청
  ↓
[백엔드] access token 발급 → 유저 정보 조회 → JWT 발급
  ↓
[메인 창] 로그인 완료 처리`}</CodeBlock>

          <p>
            팝업 창에서 인가 코드를 수신한 뒤 <Highlight>postMessage</Highlight>로
            메인 창에 전달하는 패턴을 적용했습니다. 백엔드에서 JWT를 발급받은 후
            Zustand Auth Store에 저장하고, persist로 유지하는 흐름을 구현했습니다.
          </p>
        </Section>

        <Section icon={Bot} title="AI 도구 활용의 한계">
          <p>
            UI 생성과 설계 초기에 GPT와 Figma MCP를 많이 활용했지만,
            디자인을 코드로 변환하는 과정에서는 아직 완벽하지 않다는 것을 느꼈습니다.
            특히 컴포넌트 간 간격, 반응형 레이아웃 등 세밀한 부분은
            결국 직접 조정해야 했습니다.
          </p>
          <p>
            또한 스켈레톤 UI 처리 방식에 대해 많은 고민이 있었습니다.
            컴포넌트를 분리할지, 조건부 렌더링으로 한 페이지에 처리할지,
            상태별로 다른 컴포넌트를 만들지 등 정답이 있는 문제는 아니었습니다.
            유지보수성, 재사용성, 협업 난이도를 기준으로 나만의 규칙을 세워보는 것이 중요하다는 결론을 내렸습니다.
          </p>
        </Section>

        <Section icon={BookOpen} title="성장과 배움">
          <p>
            오랜만에 프레임워크 기반 프론트엔드를 작업하면서 부족함도 느꼈지만,
            JSP와 Thymeleaf에서 축적한 서버 사이드 렌더링 경험이
            Next.js의 App Router 구조를 이해하는 데 도움이 되었습니다.
          </p>
          <div>
            <p className="font-medium text-foreground mb-3">이 프로젝트를 통해 얻은 것:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Next.js App Router + Zustand persist 패턴의 전역 상태 설계 경험</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Storybook 기반 컴포넌트 문서화 체계 구축과 반응형 검증 프로세스</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>MCP 아키텍처를 직접 설계하고 OpenAI Agent + Tour API를 연동한 AI 백엔드 구축 경험</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>비정형 AI 응답을 Pydantic 구조화 출력으로 정형화하는 프롬프트 + 스키마 설계</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>OAuth 인증 흐름의 이해와 팝업 기반 인가 코드 수신 패턴</span>
              </li>
            </ul>
          </div>
        </Section>
      </div>
    </section>
  );
}
