import { GitBranch, Layers, Server, BookOpen } from "lucide-react";

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

export function ChukjibeobRetrospective() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">프로젝트 회고</h2>
      <div className="space-y-5">

        <Section icon={Server} title="Feign Client - RestTemplate을 대체하다">
          <p>
            이전 프로젝트(Booksight)에서는 외부 API 연동을 <Highlight>RestTemplate</Highlight>으로 직접 구현했습니다.
            URL 조합, 헤더 설정, 응답 파싱을 모두 직접 작성했는데,
            이 프로젝트 코드를 보면서 <Highlight>Feign Client</Highlight>를 처음 접했습니다.
          </p>
          <CodeBlock>{`// RestTemplate - 직접 구현
String url = UriComponentsBuilder.fromHttpUrl(baseUrl)
    .queryParam("serviceKey", key)
    .queryParam("pageNo", page)
    .build().toUriString();
restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

// Feign Client - 인터페이스 선언만으로 끝
@FeignClient(url = "http://apis.data.go.kr/...")
interface TourApiClient {
    @GetMapping("/searchFestival2")
    Map<String, Object> searchFestival2(
        @RequestParam("serviceKey") String key,
        @RequestParam("pageNo") int page
    );
}`}</CodeBlock>
          <p>
            Spring이 인터페이스를 보고 구현체를 자동으로 만들어줍니다.
            Retry, Timeout, ErrorDecoder 같은 설정도 별도 Config 클래스에 선언하면 자동으로 적용되어,
            RestTemplate으로 직접 구현하던 것들을 선언적으로 처리할 수 있었습니다.
            다음에 외부 API 연동이 필요하다면 Feign Client를 먼저 고려할 것입니다.
          </p>
        </Section>

        <Section icon={Layers} title="Tour API 파싱 - 응답 타입이 개수에 따라 달라진다">
          <p>
            Tour API에는 독특한 특성이 있습니다. 결과가 여러 개면 <Highlight>List</Highlight>로,
            1개면 <Highlight>Map</Highlight>으로 응답이 옵니다.
          </p>
          <CodeBlock>{`// 결과 여러 개 → List
"item": [
  { "contentid": "123", "title": "축제A" },
  { "contentid": "456", "title": "축제B" }
]

// 결과 1개 → Map (List가 아님!)
"item": { "contentid": "123", "title": "축제A" }`}</CodeBlock>
          <p>
            Jackson으로 특정 DTO에 바로 받으면 타입이 고정되어야 해서,
            1개일 때와 여러 개일 때를 동시에 처리할 수 없습니다.
            그래서 <Highlight>Map&lt;String, Object&gt;</Highlight>로 일단 받아두고
            <code>instanceof List</code> / <code>instanceof Map</code>으로 분기해서 직접 파싱했습니다.
          </p>
          <p>
            나중에 알게 된 사실인데, Jackson 설정 하나로 해결할 수 있었습니다.
          </p>
          <CodeBlock>{`// 이 설정을 추가하면 1개여도 List로 강제 변환
mapper.configure(
    DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true
);

// 이후엔 DTO로 바로 받을 수 있음
List<FestivalDto> searchFestival2(...);`}</CodeBlock>
          <p>
            공공 API를 사용할 때 응답 구조가 일관되지 않을 수 있다는 점,
            그리고 Jackson 설정으로 유연하게 대응할 수 있다는 것을 배웠습니다.
          </p>
        </Section>

        <Section icon={GitBranch} title="Chunk vs Tasklet - Spring Batch의 정석">
          <p>
            이 프로젝트 배치 코드에는 <Highlight>Tasklet</Highlight>과 <Highlight>Chunk</Highlight> 방식이
            함께 선언되어 있었습니다. 처음엔 Tasklet으로 구현했다가 Chunk로 전환한 흔적으로 보였는데,
            둘의 차이를 정리해봤습니다.
          </p>
          <CodeBlock>{`// Tasklet - 하나의 트랜잭션에서 전체 처리
// 중간에 실패하면 처음부터 다시
return (contribution, chunkContext) -> {
    processor.processFestivalBatch(startDate, endDate, pageSize);
    return RepeatStatus.FINISHED;
};

// Chunk - 10개씩 잘라서 트랜잭션
// 중간 실패 시 해당 청크만 롤백, 완료된 청크는 보존
StepBuilder.chunk(10, transactionManager)
    .reader(reader)
    .processor(processor)
    .writer(writer)
    .build();`}</CodeBlock>
          <p>
            대량 데이터를 다루는 배치라면 Chunk가 정석입니다.
            Tasklet은 파일 삭제, 플래그 업데이트처럼 단순하고 작은 작업에 적합하며,
            Spring Batch 자체가 Chunk 모델을 위해 설계된 프레임워크입니다.
          </p>
        </Section>

        <Section icon={BookOpen} title="성장과 배움">
          <p>
            직접 구현한 부분이 아니라 팀 코드를 분석하면서 알게 된 것들이지만,
            오히려 다른 사람의 코드를 읽으면서 "왜 이렇게 했을까"를 고민하는 과정에서
            더 깊이 이해하게 됐습니다.
          </p>
          <div>
            <p className="font-medium text-foreground mb-3">이 프로젝트를 통해 얻은 것:</p>
            <ul className="space-y-2 ml-1">
              {[
                "Feign Client - 인터페이스 선언만으로 외부 API 클라이언트를 만드는 선언적 방식",
                "공공 API의 비일관적인 응답 구조 대응 - ACCEPT_SINGLE_VALUE_AS_ARRAY 설정",
                "Chunk vs Tasklet - 대량 데이터 배치에서 Chunk가 정석인 이유",
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
