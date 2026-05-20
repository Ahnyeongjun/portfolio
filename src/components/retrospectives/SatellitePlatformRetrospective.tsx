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

export function SatellitePlatformRetrospective() {
  return (
    <div className="space-y-10 text-muted-foreground leading-relaxed">

      <div className="space-y-4">
        <p>
          회사의 위성영상 AI 처리 플랫폼입니다.
          배포 한 번에 12개 서비스가 통째로 내려가던 모놀리식에서 시작해,
          MSA 전환·DB 동기화 체계 구축·타일 서빙 성능 개선·세션 관리 최적화를 순차적으로 진행했습니다.
          각 개선이 나머지 서비스를 건드리지 않고 독립적으로 배포 가능해진 것이 핵심이었습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">MSA 전환 — 배포가 두려운 행위에서 일상적인 행위로</h3>
        <p>
          입사했을 때 플랫폼은 모놀리식 하나였습니다.
          인증·영상 처리·알림·파일 관리가 한 서버 안에 있었고,
          어디 하나 배포가 필요하면 12개 서비스 전체가 내려갔습니다. 4분 소요에 월 10건 이상이었습니다.
        </p>
        <p>
          도메인 경계를 <Highlight>9개 서비스</Highlight>로 분리했습니다.
          서비스 경계를 어디서 끊을지 결정할 때 "배포 단위가 달라야 하는가"를 기준으로 잡았습니다.
          자주 바뀌는 서비스와 안정적인 서비스를 같은 묶음에 두면 결국 전체 재배포로 돌아왔습니다.
          Spring Cloud Gateway로 인증·로깅·라우팅을 공통 처리로 올려
          각 서비스에 흩어져 있던 세션 관리 코드도 한 곳으로 모았습니다.
        </p>
        <p>
          전환 이후 재배포는 월 10건에서 1건으로, 배포 시간은 4분에서 30초로 줄었습니다.
          수치보다 더 크게 체감한 건 팀의 태도 변화였습니다.
          배포가 "조심해야 하는 행위"에서 "그냥 하는 것"이 됐습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Outbox 패턴 라이브러리 — Debezium replication slot 파손 문제 해결</h3>
        <p>
          외부망↔폐쇄망 간 DB 양방향 동기화를 위해 Debezium CDC를 쓰고 있었는데,
          <Highlight>replication slot이 반복적으로 파손</Highlight>되어
          파손될 때마다 전체 스냅샷을 다시 찍어야 했습니다.
          Debezium 인프라 자체를 걷어내고 애플리케이션 레벨에서 이벤트를 직접 관리하기로 했습니다.
        </p>
        <CodeBlock>{`// MyBatis Executor 인터셉터 — 비즈니스 코드 수정 없이 자동 캡처
@Intercepts({
  @Signature(type = Executor.class, method = "update", args = {MappedStatement.class, Object.class})
})
public class OutboxInterceptor implements Interceptor {
    public Object intercept(Invocation invocation) throws Throwable {
        Object result = invocation.proceed();
        // 현재 트랜잭션이 아웃박스 재발행이면 캡처 건너뜀 (무한루프 방지)
        if (OutboxContext.isReplay()) return result;
        captureOutboxEvent(invocation);
        return result;
    }
}

// TransactionSynchronization — 비즈니스 커밋 전에 같은 트랜잭션으로 Outbox 저장
@Override
public void beforeCommit(boolean readOnly) {
    outboxRepository.saveAll(OutboxContext.flush());
}`}</CodeBlock>
        <p>
          핵심은 두 가지입니다.
          첫째, <Highlight>beforeCommit()</Highlight>으로 비즈니스 트랜잭션과 Outbox 저장을 같은 트랜잭션 안에 묶어
          커밋 전 유실 가능성을 원천 차단했습니다.
          둘째, 폐쇄망에서 수신한 데이터를 적용할 때 이벤트가 다시 발행되면 무한 루프가 생깁니다.
          <Highlight>ThreadLocal OutboxContext</Highlight>로 재발행 여부를 추적해 차단했습니다.
        </p>
        <p>
          Spring Boot 자동 설정으로 기존 서비스에 의존성만 추가하면 즉시 적용되도록 패키징했습니다.
          이후 replication slot 파손으로 인한 스냅샷 재수행은 0건입니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">WMS → WMTS — 위성 영상 타일링 응답 4초에서 0.5초로</h3>
        <p>
          위성 영상 지도를 표시할 때 WMS 방식을 쓰고 있었습니다.
          WMS는 요청마다 해당 바운더리의 영상을 동적으로 겹쳐 합성하기 때문에,
          영상 수가 늘수록 응답 시간이 선형으로 증가했습니다.
        </p>
        <CodeBlock>{`// WMTS — z/x/y 좌표를 캐시 키로 고정, 합성 결과를 Redis에 저장
func tileHandler(w http.ResponseWriter, r *http.Request) {
    z, x, y := parseTileCoords(r)
    key := fmt.Sprintf("tile:%d:%d:%d", z, x, y)

    if cached, err := redisClient.Get(ctx, key).Bytes(); err == nil {
        w.Write(cached) // 캐시 히트 — 합성 연산 없이 즉시 반환
        return
    }

    // 고루틴으로 타일 생성 단계 병렬화
    tile := composeTileParallel(z, x, y)
    redisClient.Set(ctx, key, tile, 24*time.Hour)
    w.Write(tile)
}`}</CodeBlock>
        <p>
          WMTS로 전환하면 z/x/y 좌표가 고정되어 같은 타일을 캐시 키로 재사용할 수 있습니다.
          Go 고루틴으로 타일 생성 단계를 병렬화하고, 합성 결과를 Redis에 저장했습니다.
          동일 타일 재요청 시 합성 연산을 완전히 스킵합니다.
        </p>
        <p>
          Go API로 전환한 이유는 GDAL 라이브러리와의 바인딩 때문이었습니다.
          GeoTIFF → PNG/벡터 타일 변환에 GDAL을 쓰는데,
          Go의 CGO 바인딩이 JVM 위에서 JNI로 연동하는 것보다 오버헤드가 적었습니다.
          결과적으로 응답이 4초에서 0.5초 미만으로 줄었습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Redis 역인덱스 — 세션 풀스캔 제거</h3>
        <p>
          어드민이 역할 단위로 권한을 일괄 변경하면 해당 역할을 가진 모든 유저의 세션을 즉시 무효화해야 합니다.
          문제는 유저당 세션이 여러 개(멀티 디바이스)라는 것입니다.
          기존 구조는 전체 세션을 풀스캔한 뒤 userId를 비교하는 방식이었습니다.
        </p>
        <CodeBlock>{`// 기존 — 전체 세션 풀스캔 O(N)
Set<String> allSessionIds = redisTemplate.keys("SESSION:*");
for (String sessionId : allSessionIds) {
    String userId = getSession(sessionId).getUserId();
    if (affectedUserIds.contains(userId)) invalidate(sessionId);
}

// 역인덱스 — userId로 세션 목록 즉시 조회 O(1)
// 로그인 시: SADD USER_SESSIONS:{userId} {sessionId}
// 무효화 시:
Set<String> sessionIds = redisTemplate.opsForSet()
    .members("USER_SESSIONS:" + userId);
sessionIds.forEach(this::invalidate);`}</CodeBlock>
        <p>
          로그인 시 <Highlight>userId → sessionId Set</Highlight> 역인덱스를 함께 저장합니다.
          권한 변경 시 대상 userId로 세션 목록을 바로 조회해 무효화합니다.
          O(N) → O(1)로 전환됐고, 세션 수가 늘어도 응답 시간이 변하지 않습니다.
        </p>
      </div>

    </div>
  );
}
