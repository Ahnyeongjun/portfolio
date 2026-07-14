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
  module: moduleName,
  children,
  defaultOpen,
}: {
  title: string;
  hint?: string;
  module?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group border border-border rounded-xl overflow-hidden" open={defaultOpen}>
      <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none bg-muted/20 hover:bg-muted/30 transition-colors [list-style:none] [&::-webkit-details-marker]:hidden">
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-foreground text-sm">{title}</span>
          {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
        </div>
        {moduleName && (
          <span className="shrink-0 px-1.5 py-0.5 text-[10px] font-medium rounded bg-primary/10 text-primary">
            {moduleName}
          </span>
        )}
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
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">아키텍처 - MSA</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-primary/20 border border-primary/40" />
              단독 설계·구현
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-background border border-border" />
              일부 기여·고도화
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <FlowNode highlight sub="사용자 · 어드민 (Next.js 15 + FSD)">웹 뷰어</FlowNode>
        </div>
        <div className="flex justify-center text-muted-foreground text-xs">↓</div>
        <div className="flex justify-center">
          <FlowNode sub="OIDC 인증 · 경로 라우팅 · TLS (Keycloak)">Envoy Gateway</FlowNode>
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
            <FlowNode highlight sub="ECT · MambaCD · MINIMA - 모델 선정 진행 중">변화탐지 AI</FlowNode>
          </div>
        </div>
        {/* 변화탐지 AI 호출 흐름 */}
        <div className="pt-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">변화탐지 AI 호출 흐름</p>
          <ol className="flex flex-wrap items-center gap-x-1 gap-y-2">
            {([
              ["웹 뷰어", "전·후 영상 선택 · 분석 신청"],
              ["API 서버", "작업 생성 · 큐 발행"],
              ["RabbitMQ", "ack/nack · DLQ"],
              ["변화탐지 AI", "ONNX 추론 (consumer)"],
              ["후처리", "결과 저장 · 타일화"],
              ["웹 뷰어", "지도 위 변화 가시화"],
            ] as [string, string][]).map(([name, desc], i, arr) => (
              <li key={i} className="flex items-center gap-1">
                <span className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-border bg-background text-xs">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/15 text-primary text-[10px] font-semibold shrink-0">{i + 1}</span>
                  <span className="font-medium text-foreground">{name}</span>
                  <span className="text-muted-foreground font-normal">{desc}</span>
                </span>
                {i < arr.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex-1 border-t border-dashed border-border" />
          <span className="shrink-0 px-2">RabbitMQ · PostgreSQL · Kubernetes</span>
          <div className="flex-1 border-t border-dashed border-border" />
        </div>
      </div>

      {/* 도입부 */}
      <p>
        NIPA(정보통신산업진흥원) 지원으로 구축한, 두 시점의 위성 영상을 비교해 지표 변화를 AI로 탐지하는 변화탐지 플랫폼입니다.
      </p>
      <p>
        기능 하나를 수정해도 전체를 재배포해야 했던 모놀리식 구조를 MSA로 분리했습니다.
        백엔드는 서비스별 독립 배포가 가능해졌지만, 프론트엔드는 굳이 서비스를 나눌 필요가 없었습니다.
        대신 동일한 이미지를 환경변수(<code>MAP_TYPE: EARTH | MOON</code>)만 바꿔
        지구 변화탐지 / 달지도 모드로 분기하는 구조를 택했습니다.
        RabbitMQ 비동기 파이프라인과 Next.js 15 FSD도 처음 도입해
        지역별 변화 통계·달지도(아폴로 탐사 경로·크레이터) 등 도메인 특화 뷰어 기능을 구현했습니다.
      </p>



      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">백엔드</h2>

        {/* 1. Keycloak OIDC */}
        <AccordionSection
          title="Envoy Gateway + Keycloak OIDC - 게이트웨이 레벨 인증"
          hint="각 서비스 인증 코드 제거 · SecurityPolicy로 HTTPRoute 단위 적용"
          module="백엔드 공통"
        >
          <p>
            초기에는 각 FastAPI 서비스가 JWT 검증 로직을 직접 처리했습니다.
            서비스가 늘어날수록 인증 코드가 중복되고, 인증 정책 변경 시 전 서비스를 동시에 수정해야 했습니다.
          </p>
          <p>
            <Highlight>Keycloak</Highlight>을 OIDC Provider로 도입하고
            <Highlight>Envoy Gateway SecurityPolicy</Highlight>를 HTTPRoute 단위로 적용해
            인증을 게이트웨이 레벨로 끌어올렸습니다.
            인증된 요청에만 <code>forwardAccessToken: true</code>로 Access Token을 헤더에 실어 백엔드로 전달하고,
            백엔드 서비스는 토큰 검증 코드 없이 헤더의 사용자 정보만 사용합니다.
          </p>
          <CompareTable
            headers={["구분", "이전 (서비스 내 JWT)", "이후 (게이트웨이 OIDC)"]}
            rows={[
              { cells: ["인증 위치", "각 FastAPI 서비스", "Envoy Gateway SecurityPolicy"], highlight: true },
              { cells: ["정책 변경", "전 서비스 동시 수정", "SecurityPolicy 1개만 수정"], highlight: true },
              { cells: ["신규 서비스", "JWT 미들웨어 직접 추가", "HTTPRoute에 Policy 연결만"], highlight: true },
              { cells: ["SSO", "직접 구현 불가", "Keycloak 세션 공유 기본 제공"] },
            ]}
          />
          <p>
            Keycloak 클라이언트를 서비스별로 분리해 권한 범위를 세밀하게 제어하고,
            SealedSecret으로 클라이언트 시크릿을 암호화해 Git에 커밋할 수 있게 했습니다.
          </p>
        </AccordionSection>

        {/* 3. RabbitMQ */}
        <AccordionSection
          title="RabbitMQ ack/nack · DLQ 비동기 파이프라인"
          hint="Salt 폴링 작업 고착 → 작업 유실 0건"
          module="백엔드 공통"
        >
          <p>
            메시지 큐 도입을 앞두고 <Highlight>Kafka</Highlight>와 <Highlight>RabbitMQ</Highlight> 중 하나를
            선택해야 했습니다. Kafka는 처리량이 높지만 운영 오버헤드가 큽니다.
            위성 처리 작업은 단위가 명확하고 ack/nack 기반의 확실한 전달 보장이 더 중요해
            RabbitMQ를 선택했습니다.
          </p>
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
          <CodeBlock>{`# DLX 설정 - 재시도 3회 초과 시 DLQ 격리
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

        {/* 4. MSA */}
        <AccordionSection
          title="모놀리식 → MSA · FastAPI 전환"
          hint="재배포 월 10건 → 1건 · 배포 속도 4분 → 30초"
          module="전체 시스템"
        >
          <p>
            기존 구조는 기능 하나를 배포하려면 전체 서비스를 재시작해야 했습니다.
            영상 처리 로직 수정이 인증 서비스 다운타임으로 이어졌습니다.
            전 서비스를 <Highlight>독립 서비스</Highlight>로 분리하고
            <Highlight>Envoy Gateway</Highlight>를 게이트웨이로 두어 경로별 라우팅과 OIDC 인증을 처리했습니다.
          </p>
          <p>
            ETL·AI 추론 워커들은 Python 스크립트·셸로 운영되던 것을 전부 <Highlight>FastAPI</Highlight>로 전환했습니다.
            표준화된 인터페이스 덕분에 Envoy Gateway 라우팅에 그대로 편입할 수 있었고,
            헬스체크·메트릭 엔드포인트도 일관되게 붙일 수 있었습니다.
          </p>
          <CompareTable
            headers={["역할", "기술", "담당", "API"]}
            rows={[
              { cells: ["API 서버", "FastAPI", "CRUD · 인증 · 작업 관리 · Snowflake ID", "28개"], highlight: true },
              { cells: ["영상 서빙", "Go", "위성 영상 서빙 · WMS/WMTS · 타일 캐싱", "8개"], highlight: true },
              { cells: ["수집", "Python", "위성 영상 수집 · 스케줄링", "4개"], highlight: true },
              { cells: ["카탈로깅", "Python", "전처리 · DB 카탈로깅", "3개"], highlight: true },
              { cells: ["AI 추론", "Python + ONNX", "변화탐지 AI 추론 (RabbitMQ consumer)", "3개"], highlight: true },
              { cells: ["후처리", "Python", "변화탐지 후처리 · 결과 저장", "3개"], highlight: true },
              { cells: ["메시지 큐", "RabbitMQ", "비동기 메시지 큐 StatefulSet", "-"] },
              { cells: ["데이터베이스", "PostgreSQL + PostGIS", "공간 데이터 저장소", "-"] },
              { cells: ["게이트웨이", "Envoy Gateway · Keycloak", "OIDC 인증 · 경로 라우팅 · TLS · 업로드 제한", "-"] },
              { cells: ["웹 뷰어", "Next.js 15", "CesiumJS 웹 UI · 달지도 · 지역 통계", "-"] },
            ]}
          />
          <p>
            서비스 분리로 배포 속도 <Highlight>4분 → 30초</Highlight>,
            월 재배포 횟수 <Highlight>10건 → 1건</Highlight>으로 줄었습니다.
          </p>
        </AccordionSection>

        {/* AI 탐지 품질 개선 */}
        <AccordionSection
          title="AI 탐지 품질 개선"
          hint="조명·색상 차이와 그림자가 변화로 오탐 → 전처리 색상 정규화 · 후처리 필터링"
          module="변화탐지 AI"
        >
          <p>
            완성된 AI 모듈을 그대로 연동하던 기존 방식에서는, 전후 영상의{" "}
            <Highlight>조명·색상 차이와 그림자</Highlight>가 변화로 오탐되는 문제가
            누적됐습니다. 모델 출력을 후처리 없이 그대로 사용해 노이즈가 결과에
            그대로 반영됐습니다.
          </p>
          <p>
            모델 출력을 직접 분석해 <Highlight>전처리</Highlight>에 그림자 제거와 색상
            정규화를 추가하고, <Highlight>후처리</Highlight>에 면적 기반 필터링과 모폴로지
            연산을 적용해 픽셀 단위 노이즈를 제거했습니다.
          </p>
          <CompareTable
            headers={["단계", "적용 기법", "목적"]}
            rows={[
              { cells: ["전처리", "그림자 제거 · 색상 정규화", "조명·색상 차이로 인한 오탐 방지"], highlight: true },
              { cells: ["후처리", "면적 기반 필터링", "작은 노이즈 폴리곤 제거"], highlight: true },
              { cells: ["후처리", "모폴로지 연산", "변화 폴리곤 경계 정제"], highlight: true },
            ]}
          />
        </AccordionSection>
      </div>

      <div className="border-t border-border" />

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">인프라</h2>

        {/* 단계별 큐 분리 · 워커 수평 확장 */}
        <AccordionSection
          title="단계별 큐 분리와 워커 수평 확장"
          hint="단일 큐로는 병목 단계만 골라 확장 불가 → 처리 워커 1개 → 15개 수평 확장"
          module="처리 파이프라인"
        >
          <p>
            큐를 하나만 두고 워커를 늘리는 방법도 있었지만, 파이프라인 단계마다 부하 특성이
            달랐습니다. AI 추론은 무겁고 후처리는 가벼운데, 단일 큐로는 <Highlight>병목 구간만
            골라 확장</Highlight>할 수 없었습니다.
          </p>
          <p>
            그래서 <Highlight>수집 → 전처리 → 추론 → 후처리</Highlight> 단계별로 큐를 분리했습니다.
            각 단계 워커는 자기 큐에서 메시지를 consume하고, 끝나면 결과를 다음 큐에 publish합니다.
            단계 간 직접 통신 없이 큐로만 데이터를 넘기는 구조라, 한 단계가 일시적으로 느려져도
            큐가 버퍼 역할을 해서 앞뒤 단계가 영향을 받지 않습니다.
          </p>
          <CompareTable
            headers={["", "단일 큐", "단계별 큐 분리"]}
            rows={[
              { cells: ["확장 단위", "전체 워커 일괄 확장", "병목 단계 워커만 선택 확장"], highlight: true },
              { cells: ["결합도", "한 단계 지연이 전체 파이프라인에 전파", "큐가 버퍼 역할 - 앞뒤 단계 영향 차단"], highlight: true },
              { cells: ["DB 의존", "작업 상태 조회를 위해 DB 폴링 필요", "작업 상태가 큐에 있어 폴링 불필요"] },
            ]}
          />
          <p>
            추론 단계가 병목이면 추론 워커만 늘리고, 후처리가 가벼우면 워커를 줄이는 식으로
            단계마다 자원을 따로 조절할 수 있게 되면서, 처리 워커 컨테이너를
            <Highlight>1개에서 15개로 수평 확장</Highlight>했습니다. 요청을 큐로 받아 워커에
            분산하는 이 패턴은 더 큰 트래픽의 AI 추론 인프라에도 그대로 적용됩니다.
          </p>
        </AccordionSection>
      </div>

      <div className="border-t border-border" />

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">프론트엔드</h2>

        {/* 4. FSD + YAML 조합 뷰어 */}
        <AccordionSection
          title="Next.js 15 FSD · 멀티 배포 뷰어 · 달지도 · 지역 통계"
          hint="Thymeleaf → FSD 마이그레이션 · 동일 이미지를 K8s env로 지구/달 모드 분리 배포"
          module="웹 뷰어"
        >
          <p>
            기존 Thymeleaf 기반 SSR은 페이지·컴포넌트 경계가 불명확해
            수정 범위 예측이 어렵고 타입 안전성이 없었습니다.
            Next.js 15를 처음 도입하면서 <Highlight>FSD(Feature-Sliced Design)</Highlight>를 함께 적용해
            지구 변화탐지·지역통계·달지도를 독립 feature slice로 분리했습니다.
          </p>
          <p>
            피처를 분리해두면 <Highlight>동일한 Docker 이미지</Highlight>를
            K8s pod의 환경변수만 바꿔 여러 배포판으로 나눌 수 있습니다.
            <code>MAP_TYPE: EARTH|MOON</code> 하나로 뷰어 모드가 결정되고,
            백엔드 URL은 <code>BACKEND_API_URL</code>로만 주입돼 클라이언트에 노출되지 않습니다.
            <Highlight>dynamic import</Highlight>로 달지도 청크는 MOON 모드 진입 시점에만 로드됩니다.
          </p>
          <CodeBlock>{`# viewer-nipa.pod.yaml (지구 변화탐지)   /   viewer-moon.pod.yaml (달지도)
# 동일 이미지, env만 다름
env:
  - name: MAP_TYPE
    value: "EARTH"          # ← MOON으로 바꾸면 달지도 모드
  - name: VIEWER_TITLE
    value: "국토 변화 정보 서비스"
  - name: BACKEND_API_URL   # 서버사이드 프록시 - 클라이언트에 백엔드 URL 미노출
    value: "http://[내부IP]:16103"
  - name: UI_MAP_INDEX_VISIBLE
    value: "true"           # MOON 배포에서는 false - 변화 인덱스 위젯 숨김`}</CodeBlock>
          <CodeBlock>{`// Client - MAP_TYPE env에 따라 피처 청크를 필요 시점에 동적 로드
const EarthViewer = dynamic(() => import("@/features/earth-viewer"));
const MoonViewer  = dynamic(() => import("@/features/moon-viewer"));

export function ViewerWidget({ mapType }: { mapType: string }) {
  return mapType === "MOON"
    ? <MoonViewer />    // 달지도 청크 - MOON 배포에서만 로드
    : <EarthViewer />;  // 지구 변화탐지 청크
}`}</CodeBlock>
          <p className="font-medium text-foreground">지구 모드 - PostGIS 지역별 변화 통계</p>
          <p>
            변화 폴리곤과 행정구역을 공간 조인해
            시·도 / 시·군·구 / 사용자 AOI 단위 변화 면적·변화율을 집계합니다.
            지역 클릭 시 시계열 차트, 임계값 초과 지역은 히트맵으로 강조됩니다.
          </p>
          <p className="font-medium text-foreground">달 모드 - 아폴로 경로 · 크레이터</p>
          <CompareTable
            headers={["레이어", "데이터 출처", "표현 방식"]}
            rows={[
              { cells: ["달 기본 지형", "JAXA SELENE / NASA LRO 타일", "CesiumJS ImageryLayer"], highlight: true },
              { cells: ["아폴로 탐사 경로", "NASA 아폴로 11 ~ 17호 EVA 좌표", "Polyline (임무별 색상)"], highlight: true },
              { cells: ["크레이터", "IAU 크레이터 카탈로그 GeoJSON", "Point · 직경 비례 크기 스케일"] },
              { cells: ["착륙 지점", "아폴로 착륙 좌표", "Billboard (임무 아이콘)"] },
            ]}
          />
          <p>
            CesiumJS는 레이어 재정렬을 지원하지 않아 내부 <Highlight>imageryLayers</Highlight>를 직접 조작했고,
            토글 시 삭제 대신 <code>layer.show = false</code>로 WebGL 텍스처를 보존했습니다.
            MVT·MBTiles·ImageLayer·달지도 등 이종 레이어를 <Highlight>단일 인터페이스</Highlight>로 추상화해
            신규 레이어 타입 추가 시 기존 코드 수정 없이 확장 가능했습니다.
          </p>
        </AccordionSection>
      </div>
    </div>
  );
}
