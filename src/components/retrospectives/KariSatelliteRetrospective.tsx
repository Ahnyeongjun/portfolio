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

export function KariSatelliteRetrospective({ description }: { description?: string }) {
  return (
    <div className="space-y-10 text-muted-foreground leading-relaxed">

      <div className="space-y-4">
        {description && <p>{description}</p>}
        <p>
          합류 당시 플랫폼은 단일 서버였습니다.
          배포 한 번이 전체 서비스 다운으로 이어졌고,
          위성 소스마다 별도 코드가 존재해 신규 소스 추가마다 파이프라인 전체를 손봐야 했습니다.
          이 프로젝트에서 Outbox 라이브러리 구현, GPU 공유 인프라, 위성 워크플로우 추상화를
          순차적으로 진행했습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Outbox 패턴 라이브러리 — Debezium replication slot 파손 문제 해결</h3>
        <p>
          외부망과 폐쇄망 사이 DB 양방향 동기화를 Debezium CDC로 구성하고 있었는데,
          <Highlight>replication slot이 반복적으로 파손</Highlight>됐습니다.
          파손될 때마다 전체 스냅샷을 다시 찍어야 해서 운영 부담이 컸습니다.
          Debezium 인프라를 걷어내고 애플리케이션 레벨에서 이벤트를 직접 관리하기로 했습니다.
        </p>
        <CodeBlock>{`// MyBatis Executor 인터셉터 — 비즈니스 코드 수정 없이 자동 캡처
@Intercepts({
  @Signature(type = Executor.class, method = "update", args = {...})
})
public class OutboxInterceptor implements Interceptor {
    public Object intercept(Invocation invocation) throws Throwable {
        Object result = invocation.proceed();
        if (OutboxContext.isReplay()) return result; // 무한 루프 방지
        captureOutboxEvent(invocation);
        return result;
    }
}

// beforeCommit() — 비즈니스 커밋과 Outbox 저장을 같은 트랜잭션으로
@Override
public void beforeCommit(boolean readOnly) {
    outboxRepository.saveAll(OutboxContext.flush());
}`}</CodeBlock>
        <p>
          핵심은 두 가지입니다.
          첫째, <Highlight>beforeCommit()</Highlight>으로 비즈니스 트랜잭션과 Outbox 저장을 묶어
          커밋 전 유실 가능성을 차단했습니다.
          둘째, 폐쇄망에서 받은 데이터를 적용할 때 이벤트가 재발행되면 무한 루프가 생깁니다.
          <Highlight>ThreadLocal OutboxContext</Highlight>로 재발행 여부를 추적해 차단했습니다.
        </p>
        <p>
          Spring Boot 자동 설정으로 패키징해 기존 서비스에 의존성만 추가하면 즉시 적용되도록 했습니다.
          이후 replication slot 파손으로 인한 스냅샷 재수행은 0건입니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">GPU 1장에서 70파드 — Aliyun GPUShare 메모리 분할</h3>
        <p>
          추론 모델 하나가 GPU 메모리를 1~2GiB밖에 쓰지 않는데도
          K8s 기본 할당 방식은 파드 하나가 GPU 한 장 전체를 독점하는 구조입니다.
          자원의 90% 이상이 놀고 있었습니다.
        </p>
        <CodeBlock>{`# 기존 — GPU 카운트 단위, 파드 1개 = GPU 1장 점유
resources:
  limits:
    nvidia.com/gpu: 1

# Aliyun GPUShare — 메모리 단위 분할
resources:
  limits:
    aliyun.com/gpu-mem: 1  # 1GiB 단위 할당

# 결과: 물리 GPU 1장에서
# gprocessor 30파드 × 1GiB + inferencer 40파드 × 1GiB = 70파드 동시 운영`}</CodeBlock>
        <p>
          Aliyun GPUShare 스케줄러 익스텐더를 직접 구성해
          <Highlight>aliyun.com/gpu-mem</Highlight> 단위로 파드별 GPU 메모리를 할당했습니다.
          GPU 노드에 node selector를 분리해 추론 워크로드와 일반 워크로드도 격리했습니다.
        </p>
        <p>
          자원을 추가 구매하지 않고 스케줄러 확장만으로 70배 더 많은 파드를 운영한 결과,
          인프라 설계에서 "얼마나 살 것인가"보다 "있는 것을 얼마나 쓸 것인가"가 먼저라는 걸 다시 확인했습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">janus 워크플로우 — 파이프라인이 위성 소스를 모른다</h3>
        <p>
          다루는 위성 소스가 다누리·창천위성·Sentinel·Landsat·Planet·MODIS 등 10개가 넘었고,
          각각 API·인증·수집 방식이 달랐습니다.
          소스마다 별도 코드를 짜다 보니 신규 위성 추가 때마다 파이프라인 전체를 손봐야 했습니다.
        </p>
        <p>
          설계 목표는 하나였습니다.
          <Highlight>watchHarvest.py가 소스 종류를 모르게</Highlight> 만드는 것.
          수집 스케줄러가 어떤 위성을 처리하는지 알게 되는 순간,
          신규 소스 추가가 파이프라인 수정으로 번지기 때문입니다.
        </p>
        <CodeBlock>{`# watchHarvest.py — 어떤 위성 소스든 같은 순서로 호출
m = commonUtil.loadModule('harvest.' + modnm, 'harvest')
harvester = m.Harvester(db, mod, slog)

harvester.set_config()     # 수집 설정 로드
harvester.set_param()      # 검색 조건 구성
harvester.search()         # 목록 조회
harvester.download()       # 파일 수집
harvester.move_to_input()  # inbox 이동 → 표준화 트리거

# H_API_SENTINEL.py — Sentinel은 set_param만 다르다
class Harvester(HarvesterBase):
    def set_param(self):
        filters.append("Collection/Name eq 'SENTINEL-2'")
        filters.append(f"ContentDate/Start gt {starttime}")
    # set_config·search·download·move_to_input은 HarvesterBase 그대로`}</CodeBlock>
        <p>
          표준화 단계도 같은 구조입니다.
          <Highlight>StandardBase</Highlight>가 메타데이터 변환·표준 영상 생성·inbox 이동 순서를 고정하고,
          소스별 <Highlight>Standardizer</Highlight>는 원본 포맷 파싱 로직만 담습니다.
          geocode(리버스 지오코딩)와 카탈로그 파이프라인은 소스 추가 시 건드리지 않아도 됩니다.
        </p>
        <p>
          추론 단계에서는 객체 크기에 따라 OBB/HBB 모델을 자동 라우팅했습니다.
          소형 클래스(차량·소형 선박)는 방향 정보가 오히려 노이즈가 됐기 때문에
          클래스 ID 기준으로 HBB 모델로 분기하도록 했습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">OBB/HBB 자동 라우팅 — 객체 크기 기반 모델 선택</h3>
        <p>
          위성 영상 객체탐지에서 OBB(Oriented Bounding Box)는 방향이 있는 객체를 정밀하게 검출하지만,
          소형 객체에서는 오히려 노이즈가 됐습니다.
        </p>
        <CodeBlock>{`# 클래스별 크기 특성에 따라 모델 자동 라우팅
SMALL_CLASSES = {4, 5, 6, 7, 17}  # 소형 객체 클래스 (차량·소형선박 등)

def route_inference(image, class_ids):
    if any(c in SMALL_CLASSES for c in class_ids):
        return hbb_model.infer(image)   # 소형 → HBB
    return obb_model.infer(image)       # 일반 → OBB`}</CodeBlock>
        <p>
          클래스 ID 기준으로 <Highlight>OBB/HBB를 자동 라우팅</Highlight>하도록 설계했습니다.
          두 모델을 독립 파드로 배포해 각각 독립적으로 스케일링할 수 있게 했습니다.
          <Highlight>좌표계(EPSG)</Highlight>, <Highlight>COG 포맷</Highlight>, 다시기 영상 간 방사 차이 같은 도메인 특성을 모르면
          모델 서빙을 아무리 잘 짜도 전처리에서 결과가 틀어집니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Redis 역인덱스 — 권한 변경 시 세션 풀스캔 제거</h3>
        <p>
          어드민이 역할 단위로 권한을 일괄 변경하면 해당 역할의 모든 유저 세션을 즉시 무효화해야 합니다.
          기존 구조는 전체 세션을 풀스캔한 뒤 userId를 비교하는 방식이었습니다.
        </p>
        <CodeBlock>{`// 기존 — 전체 세션 풀스캔 O(N)
Set<String> allSessionIds = redisTemplate.keys("SESSION:*");
for (String sessionId : allSessionIds) {
    if (affectedUserIds.contains(getSession(sessionId).getUserId()))
        invalidate(sessionId);
}

// 역인덱스 — userId로 세션 목록 즉시 조회 O(1)
// 로그인 시: SADD USER_SESSIONS:{userId} {sessionId}
Set<String> sessionIds = redisTemplate.opsForSet()
    .members("USER_SESSIONS:" + userId);
sessionIds.forEach(this::invalidate);`}</CodeBlock>
        <p>
          로그인 시 <Highlight>userId → sessionId Set</Highlight> 역인덱스를 함께 저장합니다.
          <Highlight>O(N) → O(1)</Highlight>로 전환됐고, 세션 수가 늘어도 응답 시간이 변하지 않습니다.
        </p>
      </div>

    </div>
  );
}
