import React from 'react';

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

        {/* 3. 영상 통합검색 팝업 신규 구축 */}
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

        {/* 4. 판독보고서 — CesiumJS 기반 보고서 저작 */}
        <AccordionSection
          title="판독보고서 — CesiumJS 3D globe 기반 보고서 저작 도구"
          hint="페이지별 화면 캡처가 그대로 HWP 배경이 되는 구조, Cesium 카메라·좌표·엔티티 API 전반 활용"
          module="inops-das"
        >
          <p>
            판독보고서는 분석관이 CesiumJS 3D globe 위에서 위성영상을 직접 보며 표적에 화살표·텍스트로
            주석을 달고, 여러 페이지에 걸쳐 의견을 작성해 최종적으로 <Highlight>HWP</Highlight>
            (정부 표준 문서 포맷) 파일로 내려받는 기능입니다. 각 페이지는 그 시점의 3D globe 화면을
            그대로 캡처해 <code>screenshot.background</code>로 저장하고, 이 이미지가 HWP 문서의
            페이지 배경으로 삽입됩니다. 즉 카메라가 어디를 보고 있느냐가 곧 보고서에 박제되는
            내용이라, 화면 상태를 정확히 제어하는 것 자체가 기능의 핵심이었습니다.
          </p>
          <p>
            이 구조 위에서 여러 CesiumJS 기능을 직접 다뤘습니다. 카메라가 보는 영역을
            <Highlight>위경도 사각 범위</Highlight>로 계산해 뷰를 북마크·복귀시키는 기능을
            만들었고(<code>computeViewRectangle</code> 실패 시 화면 픽셀을 타원체에 직접 투영해
            좌표를 역산하는 폴백, 날짜변경선을 넘는 뷰 보정 포함), 표적 지정 시 화면 좌표를
            위경도로 환산해 저장했습니다. 화살표·텍스트 같은 주석은 Cesium 엔티티로 그려 선
            두께를 소수점 단위까지 조정할 수 있게 했고, 줌 레벨이 바뀌어도 텍스트 엔티티가
            사라지지 않도록 처리했습니다. 정북 방향 정렬, 카메라 회전 버그처럼 globe 조작 자체의
            안정성 문제도 여러 차례 수정했습니다.
          </p>
        </AccordionSection>

        {/* 5. 컴포넌트 매니저 */}
        <AccordionSection
          title="공통 컴포넌트 매니저 — 팝업·iframe·인페이지 통신 통합"
          hint="ins-comp-mng: 컴포넌트 위치와 무관하게 동일한 API로 호출"
          module="inops-das"
        >
          <p>
            분석 화면은 같은 페이지 안의 패널, 별도 팝업 윈도우, iframe 등 컴포넌트가 실행되는
            위치가 제각각이었습니다. 화면을 만들 때마다 "이 컴포넌트가 팝업인지 iframe인지"를
            매번 구분해서 호출 방식을 다르게 짜야 한다면 화면이 늘어날수록 관리가 어려워집니다.
          </p>
          <p>
            <Highlight>ins-comp-mng</Highlight>는 컴포넌트가 어디서 실행되든
            <code>ins.comp.execute(compId, fnName, args)</code> 하나로 호출할 수 있게
            추상화한 공통 매니저입니다. 내부적으로 컴포넌트 등록 정보를 보고 대상이 같은 페이지의
            객체면 함수를 직접 호출하고, 팝업이나 iframe이면 <code>postMessage</code>로 명령을
            전달해 그쪽에서 같은 이름의 함수를 실행시킵니다. 호출하는 쪽은 대상이 어디 있는지
            신경 쓸 필요가 없습니다.
          </p>
          <CompareTable
            headers={["컴포넌트 위치", "등록 정보", "execute() 호출 시 동작"]}
            rows={[
              { cells: ["같은 페이지 내 객체", "compObj", "함수 직접 호출"], highlight: true },
              { cells: ["팝업 윈도우", "winObj", "postMessage로 팝업에 전달"], highlight: true },
              { cells: ["iframe", "windws[winId] → contentWindow", "postMessage로 iframe에 전달"], highlight: true },
              { cells: ["아직 등록 안 됨", "compsNotExist 목록", "부모창으로 재위임, 무한 재요청 방지"], muted: true },
            ]}
          />
          <p>
            이 위에서 실제로 맡은 일은, 미등록 컴포넌트로의 재요청을 막는 가드가 카메라 이동처럼
            반복 호출이 정상인 함수까지 막아버리는 부작용을 고치는 것이었습니다. 차단 기준을
            컴포넌트 단위에서 <code>{"컴포넌트ID + 함수명"}</code> 조합 단위로 세분화하고,
            반복 호출이 정상인 함수는 <Highlight>allowedRepeatArray</Highlight>로 예외 처리해
            해결했습니다.
          </p>
        </AccordionSection>

      </div>
    </div>
  );
}
