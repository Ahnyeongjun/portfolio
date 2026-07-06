import React from 'react';

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-sm font-medium">
      {children}
    </span>
  );
}

function FlowNode({ children, highlight, sub }: { children: React.ReactNode; highlight?: boolean; sub?: string }) {
  return (
    <div className={`px-3 py-1.5 rounded-md border text-xs font-medium text-center flex-1 ${highlight
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

export function InsopsRetrospective() {
  return (
    <div className="space-y-8 text-muted-foreground leading-relaxed">

      {/* 아키텍처 */}
      <div className="p-5 rounded-xl border border-border bg-muted/20 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">아키텍처 — 서버 분리</p>

        <div className="grid grid-cols-2 gap-3">
          <FlowNode highlight sub="콘텐츠 관리 FRONT-END">inops-cms</FlowNode>
          <FlowNode highlight sub="데이터 분석 FRONT-END">inops-das</FlowNode>
        </div>
        <div className="flex justify-center text-muted-foreground text-xs">↓</div>
        <div className="flex justify-center">
          <FlowNode highlight sub="REST API · MyBatis · PostGIS">inops-api-svr</FlowNode>
        </div>
        <div className="flex justify-center text-muted-foreground text-xs">↓ &nbsp; ↓</div>
        <div className="grid grid-cols-2 gap-3">
          <FlowNode sub="JWT 인증">ins-auth-svr</FlowNode>
          <FlowNode sub="INNORIX 연동">ins-file-svr</FlowNode>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex-1 border-t border-dashed border-border" />
          <span className="shrink-0 px-2">CesiumJS 3D 뷰어 · Spring Boot · ins-core(공통)</span>
          <div className="flex-1 border-t border-dashed border-border" />
        </div>
      </div>

      {/* 도입부 */}
      <p>
        다종 위성영상을 판독·변화탐지하는 국가보안기관 대상 플랫폼(INSOPS)입니다.
        Spring Boot·MyBatis·PostGIS·CesiumJS 기반 9개 모듈의 멀티모듈(Multi-module) 구조이며,
        프론트엔드(inops-cms/inops-das)와 API(inops-api-svr)를 2년간 담당하며 판독보고서·
        AOI 관리·촬영계획·변화탐지 등 분석관이 매일 쓰는 기능을 end-to-end로 구현했습니다.
      </p>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">핵심 기능</h2>

        {/* 1. 촬영계획 AOI 자동생성 */}
        <AccordionSection
          title="촬영계획 → AOI 자동 생성"
          hint="긴급 주문 이중 입력 제거"
          module="inops-das"
        >
          <p>
            긴급 촬영 주문이 들어오면 분석관이 동일한 좌표 정보를 <Highlight>AOI로 다시 수동
            등록</Highlight>해야 했습니다. 촬영 주문에 이미 있는 좌표·반경 데이터를 그대로 활용해
            긴급(PS+우선순위) 플래그가 있는 주문이 등록될 때 AOI 레코드를 자동으로 생성하도록
            만들어 이중 입력을 없앴습니다.
          </p>
        </AccordionSection>

        {/* 2. 좌표 DD/DMS */}
        <AccordionSection
          title="좌표 표시 — DD/DMS 듀얼 포맷"
          hint="위경도/경위도 토글"
          module="inops-das"
        >
          <p>
            좌표 표기 방식(위경도 우선 vs 경위도 우선)이 고정돼 있어, 협업하는 분석관마다 익숙한
            표기가 달라 매번 헷갈리는 문제가 있었습니다. 라디오 버튼으로 표기 순서를 전환할 수
            있게 하고, CesiumJS 좌표 계산 로직과 DD(십진도)·DMS(도분초) 포맷터 양쪽에 이 값을
            반영해 토글 즉시 화면이 갱신되도록 했습니다.
          </p>
        </AccordionSection>

        {/* 3. AOI 조회 필터 */}
        <AccordionSection
          title="AOI 조회 성능 개선"
          hint="등록일 기준 당일 데이터만 필터링"
          module="inops-api-svr"
        >
          <p>
            AOI 관리 화면이 과거 데이터까지 전부 표출해 그리드가 무거워지고 있었습니다.
            등록일 컬럼을 기준으로 <Highlight>당일 데이터만</Highlight> 조회하도록 MyBatis 쿼리
            조건을 추가했습니다. 분석관이 실제로 확인해야 하는 건 그날 들어온 긴급/일반 AOI뿐이라,
            조회 대상 자체를 줄이는 방향으로 접근했습니다.
          </p>
        </AccordionSection>

        {/* 4. 변화탐지 우선순위 */}
        <AccordionSection
          title="변화탐지 매칭 범위 확대"
          hint="위성 소스 우선순위 재설계"
          module="inops-api-svr"
        >
          <p>
            시계열 변화탐지 분석에서 비교할 위성 영상을 고를 때, 시간창 제약이 지나치게 좁고
            우선순위 로직에 신규 위성(PNEO)이 반영돼 있지 않아 비교 대상이 누락되는 경우가
            있었습니다. 시간창 제약을 완화하고, <Highlight>WV3 → WV2 → PNEO → K3A → K3</Highlight>
            순으로 우선순위를 다시 정렬해 더 넓은 범위에서 적절한 비교 영상을 찾을 수 있도록
            했습니다.
          </p>
        </AccordionSection>

        {/* 5. 판독보고서 정합성 */}
        <AccordionSection
          title="판독보고서 데이터 정합성 버그"
          hint="MyBatis 매퍼 컬럼 순서 불일치"
          module="inops-api-svr"
        >
          <p>
            분석관이 판독보고서 작성 시 해외지역 여부를 &ldquo;예&rdquo;로 체크했는데, 저장 후
            다시 조회하면 &ldquo;아니오&rdquo;로 표시되는 버그가 보고됐습니다. 원인은 MyBatis
            매퍼의 INSERT 파라미터 바인딩 순서가 실제 테이블 컬럼 순서와 어긋나 있던 것이었습니다.
            매퍼의 파라미터 순서를 테이블 스키마에 맞게 정정해 지정학적으로 중요한 메타데이터가
            정확히 저장되도록 했습니다.
          </p>
        </AccordionSection>

      </div>
    </div>
  );
}
