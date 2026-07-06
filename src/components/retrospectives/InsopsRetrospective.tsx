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

        {/* 2. 수집 이력/통계 화면 신규 구축 */}
        <AccordionSection
          title="수집 이력 · 수집 통계 화면 신규 구축"
          hint="컨트롤러·그리드·조회 UI까지 처음부터 개발"
          module="inops-cms"
        >
          <p>
            위성영상이 얼마나, 언제 수집되고 있는지 운영자가 한눈에 확인할 화면이 없어
            데이터 관리 담당자가 DB를 직접 조회해야 했습니다.
          </p>
          <p>
            <Highlight>수집 이력</Highlight> 조회 화면과 <Highlight>수집 통계</Highlight> 집계
            화면을 라우팅부터 그리드까지 처음부터 구축했습니다. 기간(당일/1일/3일/7일/1개월)
            단축 버튼과 시/분 단위 세부 시간 필터를 넣은 검색 폼을 만들고, 신규 컨트롤러
            엔드포인트 2개를 추가해 조회 결과를 그리드로 표출하도록 했습니다.
          </p>
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

        {/* 4. 영상 통합검색 팝업 신규 구축 */}
        <AccordionSection
          title="영상 통합검색 · 업로드 팝업 신규 구축"
          hint="검색 그리드 + 업로드 다이얼로그를 처음부터 개발"
          module="inops-das"
        >
          <p>
            여러 소스의 위성영상을 흩어진 화면에서 각각 찾아야 해서, 분석관이 필요한 영상을
            한 번에 검색할 방법이 없었습니다. 규격 외로 들어오는 기타 영상을 등록할 창구도
            따로 없었습니다.
          </p>
          <p>
            <Highlight>통합검색 팝업</Highlight>을 신규로 구축해 기간 조건 검색과 그리드 결과
            표출을 한 화면에서 처리하도록 했고, 팝업 안에 <Highlight>기타 영상 업로드</Highlight>
            다이얼로그를 붙여 규격 외 영상도 같은 화면에서 바로 등록할 수 있게 했습니다.
            검색 팝업과 업로드 다이얼로그 모두 컨트롤러 라우팅부터 새로 추가했습니다.
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

        {/* 6. 컴포넌트 매니저 */}
        <AccordionSection
          title="다중 팝업 · iframe 컴포넌트 통신 안정화"
          hint="공통 컴포넌트 매니저(ins-comp-mng) — 중복 요청 방지 로직 개선"
          module="inops-das"
        >
          <p>
            분석 화면의 각 패널·팝업·iframe은 <Highlight>ins-comp-mng</Highlight>라는 공통
            컴포넌트 매니저를 통해 부모창과 <code>postMessage</code>로 통신합니다. 아직 초기화되지
            않은 컴포넌트로 함수 호출이 몰리면 무한 재요청을 막기 위해 동일 컴포넌트로의 재호출을
            한 번 차단하는 가드가 있었는데, 이 가드가 카메라 이동·좌표 이동처럼 원래 반복 호출이
            정상인 함수까지 막아버리는 부작용이 있었습니다.
          </p>
          <p>
            차단 기준을 컴포넌트 단위에서 <code>{"컴포넌트ID + 함수명"}</code> 조합 단위로 세분화하고,
            반복 호출이 정상인 함수(<code>tsCameraFlyTo</code>, <code>setTsVectorLocation</code> 등)는
            <Highlight>allowedRepeatArray</Highlight>로 예외 처리했습니다. 컴포넌트를 다시 등록할 때
            이전 window 참조가 남아있던 문제도 <code>delete windws[compId]</code>로 정리해
            해결했습니다.
          </p>
        </AccordionSection>

      </div>
    </div>
  );
}
