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
        프론트엔드(inops-cms/inops-das)와 API(inops-api-svr)를 2022.05~2024.05 약 2년간
        담당하며 판독보고서·AOI 관리·촬영계획·변화탐지 등 분석관이 매일 쓰는 기능을
        end-to-end로 구현했습니다.
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
            등록</Highlight>해야 했습니다. 촬영 주문 데이터에는 이미 좌표·반경이 들어있는데도
            AOI 관리 화면에서 같은 값을 처음부터 다시 입력하는 이중 작업이었습니다.
          </p>
          <p>
            주문에 긴급(PS+우선순위) 플래그가 있으면, 저장 시점에 <Highlight>AOI 등록 API</Highlight>를
            호출해 레코드를 자동 생성하도록 만들었습니다. 주문 입력 방식이 두 가지였기 때문에,
            어떤 방식으로 들어오든 바운딩 박스를 동적으로 계산해 같은 API로 보내도록
            분기 처리했습니다.
          </p>
          <CompareTable
            headers={["촬영 주문 입력 방식", "바운딩 박스 계산"]}
            rows={[
              { cells: ["점(중심좌표) + 반경", "중심점 기준 반경 → 사각 박스로 환산"] },
              { cells: ["사각 영역(minX/maxX/minY/maxY)", "좌표값 그대로 사용"] },
            ]}
          />
        </AccordionSection>

        {/* 2. 좌표 DD/DMS */}
        <AccordionSection
          title="좌표 표시 — DD/DMS 듀얼 포맷"
          hint="위경도/경위도 토글"
          module="inops-das"
        >
          <p>
            좌표 표기 방식(위경도 우선 vs 경위도 우선)이 고정돼 있어, 협업하는 분석관마다 익숙한
            표기가 달라 매번 헷갈리는 문제가 있었습니다.
          </p>
          <p>
            라디오 버튼으로 <Highlight>isFirstLongitude</Highlight> 불리언 값을 전환할 수 있게
            하고, 이 값을 CesiumJS 좌표 계산 로직인 <code>location()</code>·<code>multiLocation()</code>
            함수 양쪽에 그대로 전달했습니다. DD(십진도)·DMS(도분초) 두 포맷터 모두 이 플래그를
            기준으로 좌표 순서와 라벨 텍스트를 다시 계산하도록 해, 토글 즉시 화면 전체가
            일관되게 갱신되도록 했습니다.
          </p>
          <CompareTable
            headers={["isFirstLongitude", "표시 순서", "적용 대상"]}
            rows={[
              { cells: ["true", "경도, 위도 순 (경위도)", "DD·DMS 포맷 공통"] },
              { cells: ["false", "위도, 경도 순 (위경도)", "DD·DMS 포맷 공통"] },
            ]}
          />
        </AccordionSection>

        {/* 3. AOI 조회 필터 */}
        <AccordionSection
          title="AOI 조회 성능 개선"
          hint="등록일 기준 당일 데이터만 필터링 — 조회량 90%+ 감소"
          module="inops-api-svr"
        >
          <p>
            AOI 관리 화면이 과거 데이터까지 전부 표출해 그리드가 무거워지고 있었습니다.
            분석관이 실제로 확인해야 하는 건 그날 들어온 긴급/일반 AOI뿐인데, 매번 전체
            이력을 다 조회하고 있었습니다.
          </p>
          <p>
            도메인 객체(<code>MiExtnColctAoi</code>)에 <Highlight>regDt</Highlight> 필드를
            추가하고, MyBatis 쿼리에 당일 날짜 조건을 걸어 등록일 기준으로 필터링했습니다.
          </p>
          <CodeBlock>{`<!-- MiExtnColctAoiMapper.xml -->
<where>
  MECA.REG_DT &gt; #{regDt}::DATE  <!-- 당일(YYYYMMDD) 이후 등록분만 조회 -->
</where>`}</CodeBlock>
          <CompareTable
            headers={["조회 범위", "전", "후"]}
            rows={[
              { cells: ["AOI 관리 그리드", "전체 이력", "당일 등록분만"], highlight: true },
              { cells: ["조회 데이터량", "누적 전체", "90%+ 감소"], highlight: true },
            ]}
          />
        </AccordionSection>

        {/* 4. 변화탐지 우선순위 */}
        <AccordionSection
          title="변화탐지 매칭 범위 확대"
          hint="위성 소스 우선순위 재설계 + 신규 위성 추가"
          module="inops-api-svr"
        >
          <p>
            시계열 변화탐지 분석에서 비교할 위성 영상을 고를 때, ±31일 시간창 제약이 지나치게
            좁고 우선순위 로직에 신규 위성(PNEO)이 반영돼 있지 않아 비교 대상이 누락되는
            경우가 있었습니다.
          </p>
          <p>
            전후 31일 시간창 체크를 제거해 매칭 범위를 넓히고, 위성 유형 판별 CASE 문에
            <code>{"prod_tp_cd like 'PNEO_%'"}</code> 조건을 3순위로 추가했습니다.
          </p>
          <CompareTable
            headers={["우선순위", "1", "2", "3", "4", "5"]}
            rows={[
              { cells: ["변경 전", "WV3", "WV2", "K3A", "K3", "—"] },
              { cells: ["변경 후", "WV3", "WV2", "PNEO", "K3A", "K3"], highlight: true },
            ]}
          />
        </AccordionSection>

        {/* 5. 판독보고서 정합성 */}
        <AccordionSection
          title="판독보고서 데이터 정합성 버그"
          hint="MyBatis 매퍼 컬럼 순서 불일치"
          module="inops-api-svr"
        >
          <p>
            분석관이 판독보고서 작성 시 해외지역 여부를 &ldquo;예&rdquo;로 체크했는데, 저장 후
            다시 조회하면 &ldquo;아니오&rdquo;로 표시되는 버그가 보고됐습니다.
          </p>
          <p>
            원인은 <code>GrRptMapper.xml</code>의 INSERT 파라미터 바인딩 순서가 실제 테이블
            컬럼 순서와 어긋나 있던 것이었습니다. <Highlight>{"#{imptncScinfoYn}"}</Highlight>과
            <Highlight>{"#{frncntryAreaYn}"}</Highlight> 두 파라미터의 위치가 테이블 컬럼
            순서와 반대로 매핑돼, 값이 서로 뒤바뀌어 저장되고 있었습니다. 매퍼의 파라미터
            순서를 테이블 스키마에 맞게 정정해 지정학적으로 중요한 메타데이터가 정확히
            저장되도록 했습니다.
          </p>
          <CompareTable
            headers={["바인딩 순서", "1번째 파라미터", "2번째 파라미터", "결과"]}
            rows={[
              { cells: ["수정 전", "frncntryAreaYn", "imptncScinfoYn", "값 뒤바뀜 저장"] },
              { cells: ["수정 후", "imptncScinfoYn", "frncntryAreaYn", "정상 저장"], highlight: true },
            ]}
          />
        </AccordionSection>

      </div>
    </div>
  );
}
