import { Search, Bell, Lock, Layers, GitBranch, BookOpen } from "lucide-react";

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

export function DeadlineMateRetrospective() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">프로젝트 회고</h2>
      <div className="space-y-5">

        <Section icon={Search} title="EXISTS vs IN — 다대다 필터링의 성능 차이">
          <p>
            모임에는 여러 카테고리와 태그가 붙고, 사용자는 복수 조건으로 필터링합니다.
            처음엔 <Highlight>IN</Highlight>으로 구현했는데 카테고리·태그 수만큼
            조인 결과가 중복 행으로 폭증했습니다.
          </p>
          <CodeBlock>{`// IN — 다대다 조인 시 중복 행 발생, DISTINCT 필요
queryFactory.select(gathering)
    .from(gathering)
    .join(gathering.categories, category)
    .where(category.id.in(categoryIds)) // 중복 행 발생
    .distinct()
    .fetch();

// EXISTS — 조인 없이 존재 여부만 확인, 중복 없음
BooleanExpression categoryFilter = JPAExpressions
    .selectOne()
    .from(gatheringCategory)
    .where(
        gatheringCategory.gathering.eq(gathering),
        gatheringCategory.category.id.in(categoryIds)
    )
    .exists();`}</CodeBlock>
          <p>
            EXISTS는 조건을 만족하는 행이 하나라도 있으면 즉시 true를 반환합니다.
            전체를 스캔하지 않아도 되고, 조인으로 인한 중복 행도 없습니다.
            카테고리·태그·모임 상태 조건을 <Highlight>BooleanBuilder</Highlight>로 조합해도
            쿼리가 단순하게 유지됐습니다.
          </p>
        </Section>

        <Section icon={Bell} title="@TransactionalEventListener(AFTER_COMMIT) — 커밋 후에만 알림을">
          <p>
            모임 생성 직후 알림을 발송하는 로직을 처음엔 서비스 메서드 안에 직접 호출했습니다.
            문제는 알림 발송이 실패하면 모임 생성 트랜잭션 전체가 롤백된다는 점이었습니다.
          </p>
          <CodeBlock>{`// 문제: 알림 실패 시 모임 생성까지 롤백
@Transactional
public void createGathering(...) {
    gatheringRepository.save(gathering);
    notificationClient.send(...); // 실패 시 전체 롤백
}

// 개선: 커밋 확정 후에만 알림 발송
@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
public void onGatheringCreated(GatheringCreatedEvent event) {
    notificationClient.send(event.getGatheringId());
    // 여기서 실패해도 모임 데이터는 이미 커밋됨
}`}</CodeBlock>
          <p>
            <Highlight>AFTER_COMMIT</Highlight>을 쓰면 트랜잭션이 성공적으로 커밋된 후에만
            이벤트 핸들러가 실행됩니다. 알림 발송이 실패해도 모임 데이터는 보존되고,
            모임 도메인과 알림 로직이 코드 레벨에서도 분리됩니다.
          </p>
          <p>
            평판 점수 업데이트도 같은 패턴을 적용했습니다. 외부 서비스 호출 실패가
            핵심 도메인 트랜잭션에 영향을 주지 않아야 한다는 원칙을 이 프로젝트에서 처음 직접 구현했습니다.
          </p>
        </Section>

        <Section icon={Lock} title="PESSIMISTIC_WRITE — 동시 신청 경쟁 조건 해소">
          <p>
            모임 신청 시 <code>currentMembers</code>를 읽고 <code>maxMembers</code>와 비교한 뒤
            증가시키는 흐름이 있습니다. 동시에 여러 요청이 들어오면 같은 값을 읽어
            정원을 초과할 수 있습니다.
          </p>
          <CodeBlock>{`// PESSIMISTIC_WRITE — 조회 시점에 배타 잠금 획득
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT g FROM Gathering g WHERE g.id = :id")
Optional<Gathering> findByIdWithLock(@Param("id") Long id);

// 서비스
Gathering gathering = gatheringRepository.findByIdWithLock(id)
    .orElseThrow();

if (gathering.getCurrentMembers() >= gathering.getMaxMembers()) {
    throw new GatheringFullException();
}

// Batch UPDATE로 원자적 증감
gatheringRepository.incrementMembers(id);`}</CodeBlock>
          <p>
            Optimistic Lock도 고려했지만, 모임 신청은 경쟁이 발생할 가능성이 높고
            재시도 로직을 클라이언트에 넘기기 애매한 상황이었습니다.
            DB 레벨에서 확실하게 직렬화하는 <Highlight>PESSIMISTIC_WRITE</Highlight>가
            이 케이스에는 더 적합하다고 판단했습니다.
          </p>
        </Section>

        <Section icon={Layers} title="Rich Domain Model — 비즈니스 로직은 엔티티가 가져야 한다">
          <p>
            처음에는 서비스 레이어에서 상태를 직접 바꾸는 방식으로 작성했습니다.
            서비스가 엔티티 필드를 열어서 값을 설정하는 전형적인
            <Highlight>Anemic Domain Model</Highlight> 패턴이었습니다.
          </p>
          <CodeBlock>{`// Anemic — 서비스가 검증과 상태 변경을 직접 수행
if (!gathering.getLeaderId().equals(requesterId)) {
    throw new BusinessException(ErrorCode.INVALID_GATHERING_LEADER);
}
gathering.setStatus(GatheringStatus.COMPLETED); // 외부에서 직접 수정

// Rich — 검증과 상태 변경이 엔티티 메서드로 캡슐화
gathering.validateLeader(requesterId); // 내부에서 예외 발생
gathering.complete(); // 상태 전이 조건을 엔티티가 직접 검증

// Gathering.complete()
public void complete() {
    if (this.status != GatheringStatus.IN_PROGRESS) {
        throw new BusinessException(ErrorCode.GATHERING_COMPLETE_NOT_ALLOWED);
    }
    this.status = GatheringStatus.COMPLETED;
}`}</CodeBlock>
          <p>
            Rich Domain Model로 바꾸면 서비스 코드가 얇아지고,
            동일한 규칙이 여러 곳에서 호출되더라도 검증 로직이 한 곳에만 존재합니다.
            <Highlight>Todo.updateContent()</Highlight>는 변경 여부를 boolean으로 반환하는데,
            "같은 값이면 업데이트로 치지 않는다"는 규칙도 엔티티가 판단합니다.
          </p>
        </Section>

        <Section icon={GitBranch} title="CQRS + Projection — 읽기 모델을 따로 만드는 이유">
          <p>
            모임 목록 조회는 여러 테이블을 조인하고, 페이지네이션에 정렬 조건까지 붙습니다.
            JPA 엔티티 그래프로 이걸 처리하면 지연 로딩·즉시 로딩 선택 문제와
            N+1이 반복적으로 따라옵니다.
          </p>
          <CodeBlock>{`// Command — 쓰기 전용, 트랜잭션 보장
@Service
@Transactional
public class GatheringService {
    public CreateGatheringResponse create(CreateGatheringCommand command) { ... }
    public void delete(Long gatheringId, Long requesterId) { ... }
}

// Query — 읽기 전용, @Transactional(readOnly = true)
@Service
@Transactional(readOnly = true)
public class GatheringQueryService {
    public GatheringListResponse getGatherings(GatheringSearchCondition condition, ...) { ... }
}

// Projection Read Model — 조회에 필요한 컬럼만 담은 불변 레코드
@Builder
public record GatheringListRow(
    Long id, Long leaderId, GatheringType type,
    String title, int maxMembers, int currentMembers,
    LocalDate startDate, LocalDate endDate, GatheringStatus status
) {}`}</CodeBlock>
          <p>
            <Highlight>GatheringListRow</Highlight>는 목록 조회에 필요한 컬럼만 담은 Projection입니다.
            엔티티 전체를 로드하지 않아 불필요한 필드를 가져오지 않고,
            QueryDSL에서 <code>Projections.constructor()</code>로 직접 매핑합니다.
          </p>
          <p>
            Command 객체도 불변 Record로 정의해, 서비스 메서드 시그니처가 파라미터 폭탄이 되는 걸
            막았습니다. 필드를 추가해도 호출부가 영향받지 않습니다.
          </p>
        </Section>

        <Section icon={BookOpen} title="성장과 배움">
          <div>
            <p className="font-medium text-foreground mb-3">이 프로젝트를 통해 얻은 것:</p>
            <ul className="space-y-2 ml-1">
              {[
                "Rich Domain Model — 비즈니스 규칙을 엔티티에 캡슐화해 서비스 코드가 얇아지고 로직 중복이 사라짐",
                "CQRS + Projection — Command/Query 서비스 분리, 읽기 모델(GatheringListRow)로 불필요한 컬럼 로드 제거",
                "EXISTS vs IN — 다대다 관계 필터링에서 EXISTS가 중복 행 없이 더 효율적인 이유",
                "@TransactionalEventListener(AFTER_COMMIT) — 외부 호출 실패가 핵심 트랜잭션에 영향을 주지 않는 설계",
                "PESSIMISTIC_WRITE vs Optimistic Lock — 경쟁 빈도와 재시도 가능 여부로 락 전략 선택",
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
