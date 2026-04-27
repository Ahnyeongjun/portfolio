import { Zap, Layers, Brain, BookOpen } from "lucide-react";

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

export function MapinRetrospective() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">프로젝트 회고</h2>
      <div className="space-y-5">

        <Section icon={Zap} title="Virtual Threads — 스레드 풀 한도를 없애다">
          <p>
            분석 파이프라인은 URL 하나당 외부 API를 여러 번 호출합니다.
            처음에는 고정 크기 스레드 풀을 사용했는데, 동시 요청이 늘어나면
            풀이 고갈되어 대기가 발생했습니다.
          </p>
          <CodeBlock>{`// 기존 — 고정 풀, 동시 요청 많으면 대기 발생
@Bean
ExecutorService pipelineExecutor() {
    return Executors.newFixedThreadPool(20);
}

// Java 21 Virtual Threads — URL당 가상 스레드 할당, 한도 없음
@Bean
ExecutorService pipelineExecutor() {
    return Executors.newVirtualThreadPerTaskExecutor();
}`}</CodeBlock>
          <p>
            Virtual Threads는 OS 스레드에 1:1 매핑되지 않아 수천 개를 동시에 띄워도
            메모리 부담이 작습니다. I/O 대기가 긴 GPT 호출·외부 검색 API에 딱 맞는 구조였고,
            스레드 풀 크기를 튜닝하는 고민 자체가 사라졌습니다.
          </p>
          <p>
            단, <Highlight>synchronized</Highlight> 블록 안에서 I/O를 하면 Virtual Thread가
            OS 스레드를 고정(pinning)해 이점이 사라집니다. 이 프로젝트에서는
            synchronized를 피하고 <Highlight>ReentrantLock</Highlight>을 쓰도록 주의했습니다.
          </p>
        </Section>

        <Section icon={Layers} title="3단계 캐싱 — GPT 호출을 0회로 줄이는 방법">
          <p>
            동일한 URL이 재요청될 때마다 GPT를 호출하면 비용이 선형으로 늘어납니다.
            어디서 스킵할 수 있는지 분석해보니 세 단계로 나뉘었습니다.
          </p>
          <CodeBlock>{`// L1: opposition_json 존재 → 분석 결과 전부 캐시됨
//     GPT 호출 0회, 외부 검색 0회
if (content.getOppositionJson() != null) {
    return deserialize(content.getOppositionJson());
}

// L2: is_analyzed = true → 소스 분석은 완료, 추천만 재생성
//     GPT 호출 0회, 외부 검색만 수행
if (content.isAnalyzed()) {
    return searchOpposition(content.getKeywords());
}

// L3: content_keywords 풀 → 유사 콘텐츠 키워드 재활용
//     GPT 호출 1회 (스코어링만), 외부 검색 수행
List<Content> pool = keywordRepository.findSimilar(keywords);
if (!pool.isEmpty()) {
    return scoreAndFilter(pool);
}`}</CodeBlock>
          <p>
            L1에서 히트하면 파이프라인 전 단계를 스킵합니다.
            캐시 키를 URL 해시가 아니라 <Highlight>콘텐츠 ID</Highlight>로 잡은 덕분에
            같은 영상을 다른 사람이 저장해도 캐시가 공유됩니다.
          </p>
          <p>
            처음엔 단순히 "중복 호출을 막자"는 생각이었는데,
            실제로 설계하다 보니 "어느 단계부터 캐시 가능한가"를 먼저 따지게 되었고
            파이프라인 구조 자체가 더 명확해졌습니다.
          </p>
        </Section>

        <Section icon={Brain} title="배치 스코어링 — N개를 GPT 1회 호출로">
          <p>
            반대 관점 후보를 검색하면 10~20개가 나옵니다.
            처음 설계는 후보마다 GPT를 1회씩 호출해 관점 점수를 매기는 방식이었는데,
            20개면 20번의 API 호출이 발생합니다.
          </p>
          <CodeBlock>{`// 개별 호출 — 후보 N개면 GPT N번
for (Content candidate : candidates) {
    double score = gpt.scoreViewpoint(candidate); // N회
}

// 배치 스코어링 — 후보 전체를 JSON 배열로 묶어 1회 호출
String prompt = buildBatchPrompt(candidates); // 전체 후보 직렬화
List<ScoredContent> results = gpt.scoreBatch(prompt); // 1회`}</CodeBlock>
          <p>
            GPT에게 JSON 배열로 후보 전체를 넘기고 각 항목의 점수를 배열로 돌려받도록
            프롬프트를 설계했습니다. 입력 토큰은 늘어나지만 API 호출 횟수가 1회로 고정되어
            레이턴시가 크게 줄었습니다.
          </p>
          <p>
            응답 파싱 실패 시 개별 호출로 폴백하는 로직도 함께 넣었는데,
            실제로 GPT가 간헐적으로 JSON 형식을 지키지 않을 때 이 폴백이 동작하는 걸 확인했습니다.
          </p>
        </Section>

        <Section icon={BookOpen} title="성장과 배움">
          <div>
            <p className="font-medium text-foreground mb-3">이 프로젝트를 통해 얻은 것:</p>
            <ul className="space-y-2 ml-1">
              {[
                "Java 21 Virtual Threads — I/O 집약적 파이프라인에서 스레드 풀 한도 없이 동시성 확보",
                "3단계 캐싱 설계 — 파이프라인 어느 단계부터 재사용 가능한지 분석해 GPT 호출 최소화",
                "배치 스코어링 — N개 후보를 GPT 1회 호출로 처리해 레이턴시와 비용 동시 절감",
                "synchronized pinning 이슈 — Virtual Threads 환경에서 피해야 할 패턴 체득",
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
