import { Database, Layers, GitBranch, BookOpen, Package } from "lucide-react";

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

export function BooksightRetrospective() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">프로젝트 회고</h2>
      <div className="space-y-5">

        <Section icon={Database} title="초기 데이터 적재 - 기술 선택의 여정">
          <p>
            서비스 오픈 전에 문화데이터 CSV(25개 파일, 약 12만 건)를 DB에 밀어 넣어야 했습니다.
            단순해 보였지만, 세 가지 방법을 시도하고 모두 벽에 부딪혔습니다.
          </p>
          <p>
            <Highlight>코루틴 시도</Highlight> - Book 저장과 BookAuthor 저장을 하나의 트랜잭션으로 묶어야 했는데,
            코루틴 스코프에서는 Spring의 트랜잭션 컨텍스트가 전파되지 않았습니다.
            서로 다른 코루틴에서 동일 트랜잭션을 공유할 수 없어 원자성 보장이 불가능했고, 결국 포기했습니다.
          </p>
          <p>
            <Highlight>JPA saveAll 시도</Highlight> - 편리해 보였지만, 멀티 프로세스 환경에서
            엔티티 충돌이 발생했고 대량 INSERT 성능도 기대 이하였습니다.
            JPA의 더티 체킹과 1차 캐시가 대량 적재 시나리오에서는 오히려 부담이 됐습니다.
          </p>
          <p>
            최종 채택한 <Highlight>JdbcTemplate.batchUpdate()</Highlight>는 단순하지만 강력했습니다.
            PreparedStatement를 직접 제어하고, 100건씩 배치로 묶어 INSERT하니
            안정적이고 예측 가능한 성능을 얻을 수 있었습니다.
            "편한 것"보다 "제어 가능한 것"이 더 나은 선택일 때가 있다는 것을 배웠습니다.
          </p>
          <CodeBlock>{`// 코루틴 (실패) → JPA saveAll (실패) → JdbcTemplate 채택
jdbcTemplate.batchUpdate(sql, object : BatchPreparedStatementSetter {
    override fun setValues(ps: PreparedStatement, i: Int) {
        ps.setString(1, books[i].isbn)
        ps.setString(2, books[i].title)
        // ...직접 제어
    }
    override fun getBatchSize() = books.size
})`}</CodeBlock>
          <p>
            이후에 알게 된 사실인데, 조합만 맞으면 JPA로도 동일한 제어가 가능합니다.
            SEQUENCE 전략이면 INSERT 전에 ID를 미리 확보해 배치로 묶을 수 있고,
            MySQL이라면 JDBC URL에 <Highlight>rewriteBatchedStatements=true</Highlight>를 추가하는 것만으로
            드라이버 레벨에서 재작성이 됩니다.
            <Highlight>hibernate.jdbc.batch_size</Highlight>로 묶음 크기를 정하고
            <Highlight>flush() + clear()</Highlight>로 1차 캐시를 주기적으로 비워주면
            JdbcTemplate과 거의 차이가 없습니다.
            당시에 이 조합을 몰랐을 뿐, JPA가 불가능한 것은 아니었습니다.
          </p>
          <CodeBlock>{`// JPA로 배치 INSERT 하는 방법 (나중에 알게 된 것)
// 1. SEQUENCE 전략 or rewriteBatchedStatements=true (JDBC URL)
// 2. hibernate.jdbc.batch_size=100
// 3. 직접 flush + clear로 1차 캐시 제어

books.chunked(100).forEach { chunk ->
    chunk.forEach { em.persist(it) }
    em.flush()   // executeBatch() 호출
    em.clear()   // 1차 캐시 비우기
}`}</CodeBlock>
        </Section>

        <Section icon={Package} title="external 패키지 - CSV → 카카오 API → DB 파이프라인">
          <p>
            외부 연동 코드를 <Highlight>external 패키지</Highlight>로 분리해서 관리한 것이 이번 프로젝트의 구조적 시도였습니다.
            카카오 API 클라이언트, 국립중앙도서관 클라이언트, CSV 적재 로더를 모두 external 아래에 두니
            비즈니스 로직과 외부 의존성의 경계가 명확해졌습니다.
          </p>
          <p>
            <Highlight>CulturalDatasetLoader</Highlight>는 <code>CommandLineRunner</code>를 구현해
            앱 기동 시 조건부로 실행됩니다. CSV를 파싱해 BookCreateRequest로 변환한 뒤,
            카카오 API로 썸네일·요약·가격 등 부족한 정보를 보강하는 파이프라인입니다.
          </p>
          <CodeBlock>{`CSV 파일 (25개)
  ↓ Jackson CSV 파싱
CulturalBookDto → BookCreateRequest 변환
  ↓ ISBN / 제목으로 카카오 API 검색
정보 보강 (썸네일·가격·요약·저자)
  ↓ JSONL 청크 파일로 중간 저장 (5000건 단위)
  ↓ JdbcTemplate 배치 INSERT (100건 단위)`}</CodeBlock>
          <p>
            처리 도중 중단되어도 이어서 실행할 수 있도록 <Highlight>progress.txt</Highlight>에
            파일 인덱스와 라인 번호를 저장했습니다. JSONL 중간 저장 덕분에
            API 호출 단계와 DB 저장 단계를 분리해서 재시도할 수 있었습니다.
          </p>
        </Section>

        <Section icon={GitBranch} title="Spring Batch + 이벤트 기반 스케줄링">
          <p>
            매일 신간 도서를 자동 수집하는 배치를 <Highlight>Reader → Processor → Writer</Highlight> 패턴으로 구성했습니다.
            국립중앙도서관 API에서 전날 출판 도서를 페이징으로 읽고(Reader),
            ISBN으로 카카오 API에서 상세 정보를 보강하고(Processor),
            중복 체크 후 DB에 저장(Writer)하는 흐름입니다.
          </p>
          <p>
            <Highlight>JobExplorer</Highlight>로 같은 날짜의 배치가 이미 완료됐는지 확인한 뒤
            중복 실행을 방지하는 로직도 직접 구현했습니다.
            각 Step에 <Highlight>StepExecutionListener</Highlight>를 붙여 읽기/처리/쓰기 건수를
            ExecutionContext에 기록하고, 배치 결과를 API로 조회할 수 있게 했습니다.
          </p>
          <p>
            검색 로그 기반 2차 배치도 있었습니다. 도서 검색 시 <Highlight>AOP</Highlight>로 키워드를 이벤트로 발행하고,
            리스너가 비동기로 로그를 저장합니다. 이 로그를 다음날 배치에서 읽어
            자주 검색됐지만 DB에 없는 도서를 카카오 API로 추가 수집하는 구조입니다.
          </p>
          <CodeBlock>{`[매일 자정 @Scheduled]
  ↓
BatchJobService.runDailyAddNewPublishedBookJob(어제 날짜)
  ↓ JobExplorer로 중복 실행 방지
Spring Batch Job 실행
  ├── Reader:     국립중앙도서관 API (100건 페이징)
  ├── Processor:  카카오 API ISBN 검색 → 정보 보강
  └── Writer:     중복 ISBN 체크 후 DB 저장

[검색 로그 기반 2차 배치]
@LogBookSearch AOP → BookSearchEvent 발행
  → 리스너 비동기 저장
  → 다음날 배치에서 읽어 미수집 도서 추가`}</CodeBlock>
        </Section>

        <Section icon={Layers} title="QueryDSL 첫 도입">
          <p>
            이 프로젝트에서 처음으로 <Highlight>QueryDSL</Highlight>을 제대로 써봤습니다.
            kapt로 Q클래스를 자동 생성하고, <Highlight>JPAQueryFactory</Highlight>로 타입 안전한 쿼리를 작성하는 방식이
            처음에는 낯설었지만, 컴파일 타임에 오류를 잡을 수 있다는 점이 큰 장점이었습니다.
          </p>
          <p>
            제목·저자·출판사를 동시에 검색하는 조건을 <Highlight>BooleanBuilder</Highlight>로 조합했는데,
            Q클래스 필드를 직접 참조하기 때문에 오타가 나면 컴파일 단계에서 바로 잡을 수 있었습니다.
            JPQL 문자열로 썼다면 런타임에야 발견했을 실수들이었습니다.
            Pageable의 정렬 정보는 <Highlight>PathBuilder</Highlight>로 OrderSpecifier로 변환했는데,
            이쪽은 프론트에서 넘어오는 문자열을 그대로 쓰기 때문에 컴파일 검증은 안 됩니다.
            동적 정렬을 QueryDSL 형식으로 연결해주는 역할이었습니다.
          </p>
          <CodeBlock>{`// 동적 검색 조건 조합
val whereClause = BooleanBuilder()
whereClause.and(book.deletedAt.isNull)

if (!keyword.isNullOrEmpty()) {
    whereClause.and(
        book.title.containsIgnoreCase(keyword)
            .or(book.bookAuthorList.any().author().name.containsIgnoreCase(keyword))
            .or(book.publisher().name.containsIgnoreCase(keyword))
    )
}

// Pageable 동적 정렬
val entityPath = PathBuilder(Book::class.java, "book")
val orderSpecifier = OrderSpecifier(
    if (order.isAscending) Order.ASC else Order.DESC,
    entityPath[order.property] as Expression<Comparable<*>>
)`}</CodeBlock>
        </Section>

        <Section icon={BookOpen} title="성장과 배움">
          <p>
            오랜만에 다시 쓴 Kotlin이었습니다. 코루틴·JPA 삽질을 겪으면서 오히려
            Spring 트랜잭션 컨텍스트가 어떻게 전파되는지, 어디서 끊기는지를
            깊이 이해하게 되었습니다. 편의 기능 뒤에 어떤 원리가 있는지를 알게 된 경험이었습니다.
          </p>
          <div>
            <p className="font-medium text-foreground mb-3">이 프로젝트를 통해 얻은 것:</p>
            <ul className="space-y-2 ml-1">
              {[
                "대량 적재 기술 비교 (코루틴 → JPA → JdbcTemplate) 끝에 상황에 맞는 도구 선택의 중요성",
                "Spring Batch Reader-Processor-Writer 패턴과 실무적인 중복 실행 방지 전략",
                "external 패키지로 외부 연동 책임 분리 - 파이프라인을 패키지 단위로 관리한 첫 경험",
                "QueryDSL 도입 - 타입 안전한 동적 쿼리와 런타임 정렬 패턴 체득",
                "AOP + 이벤트 기반으로 검색 로그를 비침투적으로 수집하고 배치에 활용하는 구조 설계",
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
