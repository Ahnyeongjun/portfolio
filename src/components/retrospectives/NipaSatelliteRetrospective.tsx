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
    <div className={`px-3 py-1.5 rounded-md border text-xs font-medium text-center flex-1 ${
      highlight
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
  children,
  defaultOpen,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group border border-border rounded-xl overflow-hidden" open={defaultOpen}>
      <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none bg-muted/20 hover:bg-muted/30 transition-colors [list-style:none] [&::-webkit-details-marker]:hidden">
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-foreground text-sm">{title}</span>
          {hint && <span className="ml-2.5 text-xs text-muted-foreground">{hint}</span>}
        </div>
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

export function NipaSatelliteRetrospective({ description }: { description?: string }) {
  return (
    <div className="space-y-8 text-muted-foreground leading-relaxed">

      {/* 아키텍처 */}
      <div className="p-5 rounded-xl border border-border bg-muted/20 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">아키텍처</p>
        <div className="flex justify-center">
          <FlowNode sub="사용자 · 어드민 (Next.js 15 + FSD)">웹 뷰어</FlowNode>
        </div>
        <div className="flex justify-center text-muted-foreground text-xs">↓</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">FastAPI</p>
            <FlowNode highlight sub="CRUD · 인증 · 작업 관리 · Snowflake ID">API 서버</FlowNode>
          </div>
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Go</p>
            <FlowNode highlight sub="WMS · WMTS · 타일 캐싱">영상 서빙 서버</FlowNode>
          </div>
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Python</p>
            <div className="flex items-center gap-2">
              <FlowNode highlight sub="위성 영상 수집">수집</FlowNode>
              <span className="text-muted-foreground text-xs shrink-0">→</span>
              <FlowNode sub="전처리 · DB 등록">카탈로깅</FlowNode>
            </div>
          </div>
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Python + ONNX</p>
            <FlowNode highlight sub="ECT · MambaCD · MINIMA · ack/nack · DLQ">변화탐지 AI</FlowNode>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex-1 border-t border-dashed border-border" />
          <span className="shrink-0 px-2">RabbitMQ · PostgreSQL · Kubernetes</span>
          <div className="flex-1 border-t border-dashed border-border" />
        </div>
      </div>

      {/* 도입부 */}
      <p>
        두 시점의 위성 영상을 비교해 지표 변화를 AI로 탐지하는 플랫폼.
        NIPA(정보통신산업진흥원) 지원 사업. 기존 모놀리식 구조를 9개 MSA로 분리하고
        RabbitMQ 비동기 파이프라인과 Next.js 15 FSD를 처음 도입했습니다.
      </p>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">핵심 기능</h2>

        {/* 1. RabbitMQ */}
        <AccordionSection
          title="RabbitMQ ack/nack · DLQ 비동기 파이프라인"
          hint="Salt 폴링 작업 고착 → 작업 유실 0건"
        >
          <p>
            이전 프로젝트에서 Salt 스케줄러로 작업을 디스패치했을 때 노드가 재시작되면
            완료 콜백이 호출되지 않아 <Highlight>작업이 RUNNING 상태로 고착</Highlight>됐습니다.
            타임아웃 복구 전까지 후속 작업이 쌓이고 수동 DB 수정이 반복됐습니다.
          </p>
          <p>
            변화탐지 작업은 수 분~수십 분이 소요됩니다.
            처음부터 <Highlight>ack/nack</Highlight> 기반 큐로 설계해 이 문제를 원천 차단했습니다.
            worker는 처리를 완전히 마친 뒤에만 ack를 보내고, 처리 중 노드가 죽으면
            RabbitMQ가 자동으로 메시지를 재투입합니다.
            3회 초과 실패 시 <Highlight>DLQ</Highlight>로 격리해 운영자가 원인을 파악한 뒤 수동 republish합니다.
          </p>
          <CodeBlock>{`# DLX 설정 — 재시도 3회 초과 시 DLQ 격리
channel.exchange_declare(exchange='gprocessor.dlx', exchange_type='direct', durable=True)
channel.queue_declare(queue='gprocessor.dlq', durable=True)
channel.queue_declare(
    queue='gprocessor', durable=True,
    arguments={'x-dead-letter-exchange': 'gprocessor.dlx'}
)

def callback(ch, method, properties, body):
    death_count = len((properties.headers or {}).get('x-death', []))
    try:
        process(body)
        ch.basic_ack(delivery_tag=method.delivery_tag)       # 성공: 큐에서 제거
    except Exception:
        if death_count >= 3:
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)  # DLQ 격리
        else:
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)   # 재시도`}</CodeBlock>
        </AccordionSection>

        {/* 2. MSA */}
        <AccordionSection
          title="모놀리식 → 9개 MSA · FastAPI 전환"
          hint="재배포 월 10건 → 1건 · 배포 속도 4분 → 30초"
        >
          <p>
            기존 구조는 기능 하나를 배포하려면 전체 서비스를 재시작해야 했습니다.
            영상 처리 로직 수정이 인증 서비스 다운타임으로 이어졌습니다.
            전 서비스를 <Highlight>독립 FastAPI 서비스</Highlight>로 분리하고
            Nginx 리버스 프록시로 라우팅했습니다.
          </p>
          <CompareTable
            headers={["서비스", "역할"]}
            rows={[
              { cells: ["db-api", "CRUD · 인증 · 작업 관리"] },
              { cells: ["image-api (Go)", "위성 영상 서빙 · 타일 캐싱"] },
              { cells: ["gprocessor", "변화탐지 AI 추론 (RabbitMQ consumer)"] },
              { cells: ["collector", "위성 영상 수집"] },
              { cells: ["cataloger", "전처리 · DB 카탈로깅"] },
              { cells: ["cprocessor", "변화탐지 후처리 · 결과 저장"] },
              { cells: ["viewer", "Next.js 15 + CesiumJS 웹 UI"] },
              { cells: ["broker", "RabbitMQ StatefulSet"] },
              { cells: ["database", "PostgreSQL"] },
            ]}
          />
          <p>
            서비스 분리로 배포 속도 <Highlight>4분 → 30초</Highlight>,
            월 재배포 횟수 <Highlight>10건 → 1건</Highlight>으로 줄었습니다.
          </p>
        </AccordionSection>

        {/* 3. Snowflake ID */}
        <AccordionSection
          title="폐쇄망 분산 ID — Snowflake 직접 구현"
          hint="외부 코디네이터 접근 불가 · worker ID에 망 정보 인코딩"
        >
          <p>
            폐쇄망 환경에서는 외부 ID 생성 서비스에 접근할 수 없었습니다.
            UUID는 발급 서버를 추적할 수 없어 장애 발생 시 원인 서버 특정이 불가했습니다.
            <Highlight>Snowflake 알고리즘</Highlight>을 직접 구현해 두 문제를 동시에 해결했습니다.
          </p>
          <CodeBlock>{`# Snowflake ID 구조 — 64비트
# [timestamp 41bit] [datacenter_id 5bit] [worker_id 5bit] [sequence 12bit]
#
# worker_id에 망 정보 인코딩
# → ID만으로 발급 서버(외부망/폐쇄망, 서비스 번호) 추적 가능

class SnowflakeIDGenerator:
    def __init__(self, datacenter_id: int, worker_id: int):
        self.datacenter_id = datacenter_id  # 망 구분
        self.worker_id = worker_id          # 서비스 구분
        self.sequence = 0
        self.last_timestamp = -1

    def generate(self) -> int:
        timestamp = self._current_ms()
        if timestamp == self.last_timestamp:
            self.sequence = (self.sequence + 1) & MAX_SEQUENCE
        else:
            self.sequence = 0
        self.last_timestamp = timestamp
        return (timestamp << 22) | (self.datacenter_id << 17) | \
               (self.worker_id << 12) | self.sequence`}</CodeBlock>
        </AccordionSection>

        {/* 4. 프론트엔드 */}
        <AccordionSection
          title="Next.js 15 FSD · CesiumJS 레이어 추상화"
          hint="Thymeleaf 레거시 → FSD 마이그레이션 · 이종 레이어 단일 인터페이스"
        >
          <p>
            기존 Thymeleaf 기반 SSR은 페이지·컴포넌트 경계가 불명확했습니다.
            수정 범위 예측이 어렵고 타입 안전성이 없어 런타임에서야 오류가 발견됐습니다.
            이 프로젝트에서 Next.js 15를 처음 도입하면서 <Highlight>FSD(Feature-Sliced Design)</Highlight>를 함께 적용했습니다.
            기존 코드 의존 방향을 분석한 뒤 레이어 단위로 순차 전환했습니다.
          </p>
          <p>
            CesiumJS는 레이어 재정렬을 지원하지 않습니다.
            드래그로 레이어 순서를 바꾸려면 내부 <Highlight>imageryLayers</Highlight>를 직접 조작해야 했습니다.
            또한 레이어 토글 시 삭제 방식을 쓰면 WebGL 텍스처가 전부 해제되어 재로드 비용이 발생했습니다.
          </p>
          <CodeBlock>{`// 레이어 재정렬 — imageryLayers 직접 조작
function reorderLayer(viewer, fromIndex, toIndex) {
  const layers = viewer.imageryLayers;
  const layer = layers.get(fromIndex);
  layers.remove(layer, false);   // destroy=false, 리소스 유지
  layers.add(layer, toIndex);
}

// 토글 — 삭제 대신 가시성 플래그 전환 (WebGL 리소스 보존)
layer.show = false;`}</CodeBlock>
          <p>
            MVT·MBTiles·ImageLayer·BaseMap 등 이종 레이어 타입을
            <Highlight>단일 인터페이스</Highlight>로 추상화해 신규 레이어 타입 추가 시 기존 코드 수정 없이 확장 가능했습니다.
          </p>
        </AccordionSection>

      </div>
    </div>
  );
}
