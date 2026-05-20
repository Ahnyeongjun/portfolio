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

export function NipaSatelliteRetrospective() {
  return (
    <div className="space-y-10 text-muted-foreground leading-relaxed">

      <div className="space-y-4">
        <p>
          NIPA(정보통신산업진흥원) 지원으로 구축된 다시기 위성영상 변화탐지 AI 처리 플랫폼입니다.
          두 시점의 위성영상을 비교해 지표 변화를 AI로 탐지하고 결과를 가시화합니다.
          이전까지 회사의 모든 파이프라인은 DB 폴링 방식이었는데,
          이 프로젝트에서 처음으로 RabbitMQ 비동기 큐를 도입했고
          Next.js 기반 뷰어도 최초로 적용했습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">RabbitMQ 비동기 파이프라인 — Salt 폴링에서 배운 것</h3>
        <p>
          이전 프로젝트(항우연)의 janus 파이프라인은 Salt 스케줄러로 작업을 디스패치했습니다.
          <Highlight>manageJob.sls</Highlight>가 주기적으로 DB를 폴링해 작업을 꺼내고,
          <Highlight>cmd_async</Highlight>로 분석 노드에 던지는 구조였는데 —
          노드가 재시작되면 완료 콜백(<Highlight>reactJob.py</Highlight>)이 호출되지 않아
          작업이 RUNNING 상태로 고착됐습니다.
          타임아웃으로 복구되기까지 후속 작업이 쌓이고, 수동 DB 수정이 반복됐습니다.
        </p>
        <p>
          변화탐지 작업은 수 분에서 수십 분이 소요됩니다.
          Salt 폴링 방식으로는 이 규모의 작업을 안전하게 처리할 수 없었고,
          처음부터 <Highlight>ack/nack</Highlight> 기반 큐로 설계했습니다.
        </p>
        <CodeBlock>{`# messaging.py — DLX 설정 + 재시도 3회 초과 시 DLQ 격리
channel.exchange_declare(exchange='gprocessor.dlx', exchange_type='direct', durable=True)
channel.queue_declare(queue='gprocessor.dlq', durable=True)
channel.queue_declare(
    queue='gprocessor', durable=True,
    arguments={'x-dead-letter-exchange': 'gprocessor.dlx'}
)

def default_callback(ch, method, properties, body):
    death_count = len((properties.headers or {}).get('x-death', []))
    try:
        process(message)
        ch.basic_ack(...)               # 성공: 큐에서 제거
    except Exception:
        if death_count >= 3:
            ch.basic_nack(..., requeue=False)  # 3회 초과: DLQ 격리
        else:
            ch.basic_nack(..., requeue=True)   # 재시도`}</CodeBlock>
        <p>
          worker는 처리를 완전히 마친 뒤에만 <Highlight>ack</Highlight>를 보냅니다.
          처리 중 노드가 죽으면 ack 없이 연결이 끊기므로 RabbitMQ가 자동으로 재투입합니다.
          일시적 오류는 재큐로 복구하고, 3회 초과 시 <Highlight>DLQ</Highlight>로 격리해
          운영자가 원인을 파악한 뒤 수동으로 republish합니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">CesiumJS 레이어 관리 라이브러리 — 기능 부재를 직접 구현으로</h3>
        <p>
          CesiumJS는 레이어를 추가·삭제할 수 있지만
          <Highlight>레이어 재정렬을 지원하지 않습니다.</Highlight>
          사용자가 드래그로 위성 영상 레이어 순서를 바꾸려면 직접 구현이 필요했습니다.
        </p>
        <p>
          또 다른 문제는 레이어 토글이었습니다.
          CesiumJS에서 레이어를 삭제하면 WebGL 텍스처와 타일 캐시가 전부 해제됩니다.
          영상 레이어를 껐다 켤 때마다 전체를 다시 로드해야 했습니다.
        </p>
        <CodeBlock>{`// 인덱스 기반 재정렬 — CesiumJS 내부 imageryLayers 직접 조작
function reorderLayer(viewer, fromIndex, toIndex) {
  const layers = viewer.imageryLayers;
  const layer = layers.get(fromIndex);
  layers.remove(layer, false);      // destroy=false, 리소스 유지
  layers.add(layer, toIndex);
}

// hide/show — 삭제 대신 가시성 플래그 전환
layer.show = false;  // WebGL 리소스 유지, 재표시 즉시 반환`}</CodeBlock>
        <p>
          MVT·MBTiles·ImageLayer·BaseMap 등 이종 레이어 타입을 단일 인터페이스로 추상화해
          TypeScript 타입 안전성을 보장했습니다.
          신규 레이어 타입을 추가할 때 기존 코드를 수정할 필요가 없어졌습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">FSD 마이그레이션 — 레거시 프론트엔드 단계적 전환</h3>
        <p>
          이전 플랫폼의 레거시 프론트엔드는 페이지와 컴포넌트 경계가 불명확했습니다.
          어디를 수정하면 어디가 영향받는지 예측하기 어려웠고,
          타입 안전성이 없어 런타임에서야 오류를 발견하는 경우가 잦았습니다.
        </p>
        <p>
          이 프로젝트에서 Next.js를 처음 도입하면서 FSD(Feature-Sliced Design) 아키텍처를 함께 적용했습니다.
          한 번에 전환하는 대신 기존 코드의 의존 방향을 먼저 분석하고,
          레이어 단위로 순차 전환했습니다.
          기존 코드는 src_backup으로 보존해 롤백 경로를 유지했습니다.
        </p>
      </div>

    </div>
  );
}
