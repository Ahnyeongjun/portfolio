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
        INSOPS는 국가보안기관이 위성영상을 수집·판독해 정식 보고서로 만들어내는 시스템입니다.
        분석관은 CesiumJS 3D globe 위에서 위성영상을 직접 보며 표적에 주석을 달아 판독보고서를
        작성하고, 완성된 보고서를 정부 표준 문서(HWP)로 내려받습니다.
      </p>
      <p>
        Spring Boot·MyBatis·PostGIS·CesiumJS 기반 9개 모듈의 멀티모듈(Multi-module) 구조이며,
        이 중 프론트엔드(inops-cms/inops-das)와 API(inops-api-svr)를 2022.05~2024.05 약
        2년간 담당하며 분석관이 매일 쓰는 화면을 end-to-end로 구현했습니다. 테이블 수가 많은
        프로젝트 특성상, DB 스키마를 읽어 MyBatis mapper·entity 코드를 자동 생성해주는 도구도
        팀 내부적으로 갖추고 있었습니다.
      </p>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">핵심 기능</h2>

        {/* 1. 수집 이력/통계 화면 신규 구축 */}
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
            화면을 신규 컨트롤러 엔드포인트부터 그리드까지 처음부터 구축했습니다.
          </p>
          <CompareTable
            headers={["화면", "목적", "주요 필터"]}
            rows={[
              { cells: ["수집 이력", "개별 수집 건 조회", "기간 단축 버튼(당일/1일/3일/5일)"], highlight: true },
              { cells: ["수집 통계", "기간별 집계", "기간 단축 버튼(당일/1일/7일/1개월) + 시·분 단위 세부 시간"], highlight: true },
            ]}
          />
          <p>
            두 화면 모두 날짜 범위 지정 후 시작·종료 시각까지 시/분 단위로 좁힐 수 있게
            타임피커를 넣었고, 세부 시간 지정을 켜고 끌 수 있는 체크박스로 평소엔 하루 단위,
            필요할 때만 분 단위로 좁혀 조회하도록 만들었습니다.
          </p>
        </AccordionSection>

        {/* 2. 다중 모드 공통 처리 */}
        <AccordionSection
          title="다중 모드 공존 화면의 공통 분기 처리"
          hint="ui-top.js/ui-bottom.js — 일반·스와이프·시계열분석·변화탐지(TCD) 등 여러 모드를 같은 코드베이스에서 분기"
          module="inops-das"
        >
          <p>
            화면은 일반 단일 뷰 외에도 스와이프 비교, 시계열분석, 변화탐지(TCD) 등 여러
            <Highlight>모드</Highlight>로 동작했습니다. 상단 툴바나 좌측 패널처럼 여러 모드에서
            공통으로 쓰이는 컴포넌트가 "지금 어떤 모드인지"를 스스로 판단할 수 있어야, 모드마다
            다르게 동작해야 하는 부분을 한 코드베이스 안에서 처리할 수 있었습니다.
          </p>
          <p>
            현재 모드는 <code>api.getMode()</code>로 어디서든 조회할 수 있게 해뒀습니다. 상단
            툴바는 이 값을 확인해, 스와이프·시계열분석처럼 화면이 여러 iframe으로 쪼개지는
            모드에서는 활성화된 iframe 각각에 같은 커맨드를 전달하고, 일반 모드에서는 메인 지도
            하나만 제어하도록 분기했습니다. 같은 이유로 시계열 패널 배치 로직도 변화탐지(TCD)
            모드 여부를 나타내는 <code>isTcdTsAnl</code> 플래그로 분기해, TCD 모드에서는
            선택한 영상의 이전 시점을 자동으로 매칭해 전/후로 배치하고 일반 모드에서는 촬영일
            순으로 배치했습니다.
          </p>
          <p>
            <code>getMode()</code> 하나로 전역 모드는 조회할 수 있었지만, 함수 호출 시점마다
            모드를 명시적으로 넘기지 않는 호출부도 있었습니다. 시계열분석 화면 전환 함수는 이런
            경우에 대비해 진입 시점의 모드를 <code>baseModeId</code>로 컴포넌트 안에 따로
            기억해두고, 호출부가 모드를 안 넘기면 그 값으로 폴백하도록 했습니다. 탭을 벗어나면
            이 값을 초기화해, 다음에 다시 들어왔을 때 이전 모드가 잘못 남아있지 않게 했습니다.
          </p>
          <p>
            스와이프·시계열분석처럼 화면을 여러 패널로 쪼개는 모드에서는 패널마다 독립된
            <code>iframe</code>을 띄웠는데, 같은 화면 안에 <Highlight>같은 URL을 가리키는
            iframe을 N개</Highlight> 만들고 <code>id</code>·<code>unitIdx</code> 속성만
            다르게 부여해 서로 구분했습니다. 각 iframe은 로드되면 자신의 <code>id</code>·
            <code>unitIdx</code>를 읽어 &ldquo;나는 몇 번째 패널인지&rdquo;를 파악하고, 부모
            창에 <code>getModeId</code>를 요청해 자신이 속한 모드와 세부 설정을 받아옵니다.
          </p>
          <CodeBlock>{`// ui-cesium.js — 스와이프 2분할 iframe 생성 (동일 src, id/unitIdx로만 구분)
tmplt += '<iframe id="iframeCesium0" unitIdx="0" src="' + ins.contextName + '/swipe/unitScrn.do" ...></iframe>';
tmplt += '<iframe id="iframeCesium1" unitIdx="1" src="' + ins.contextName + '/swipe/unitScrn.do" ...></iframe>';

// swipeUnitScrn.js — 각 iframe이 자기 자신의 속성을 읽어 식별
let unitPageId = window.frameElement.getAttribute('id');
let unitIdx = parseInt(window.frameElement.getAttribute('unitIdx'));
// 부모 컴포넌트에 자신의 모드 정보를 요청
ins.comp.execute('topComp', 'getModeId', {"pageId": unitPageId, "fnName": "setModeId"});`}</CodeBlock>
        </AccordionSection>

        {/* 3. 판독보고서 — CesiumJS 기반 보고서 저작 */}
        <AccordionSection
          title="판독보고서 — CesiumJS 3D globe 기반 보고서 저작 도구"
          hint="페이지별 화면 캡처가 그대로 HWP 배경이 되는 구조, Cesium 카메라·좌표·엔티티 API 전반 활용"
          module="inops-das"
        >
          <p>
            판독보고서는 분석관이 CesiumJS 3D globe 위에서 위성영상을 직접 보며 표적에 화살표·텍스트로
            주석을 다는 기능입니다. 여러 페이지에 걸쳐 의견을 작성해, 최종적으로
            <Highlight>HWP</Highlight>(정부 표준 문서 포맷) 파일로 내려받습니다.
          </p>
          <p>
            각 페이지는 그 시점의 3D globe 화면을 그대로 캡처해 <code>screenshot.background</code>로
            저장하고, 이 이미지가 HWP 문서의 페이지 배경으로 삽입됩니다.
          </p>
          <p>
            즉 카메라가 어디를 보고 있느냐가 곧 보고서에 박제되는 내용이라, 화면 상태를 정확히
            제어하는 것 자체가 기능의 핵심이었습니다.
          </p>
          <p>
            현재 카메라가 보는 영역을 위경도 사각 범위로 계산해 북마크(<code>flag</code>)해두고,
            원할 때 그 뷰로 그대로 복귀(<code>load</code>)할 수 있게 한 함수입니다.
            <code>computeViewRectangle</code>이 값을 못 돌려주는 경우(카메라가 지구본 바깥을
            향할 때 등)를 대비해 화면 좌상단·우하단 픽셀을 직접 타원체에 투영해 역산하는
            폴백을 넣었고, 날짜변경선을 넘는 뷰(서쪽 경도가 동쪽 경도보다 큰 경우)도 보정했습니다.
          </p>
          <CodeBlock>{`api.getRect = function(){
    var rect = viewer.camera.computeViewRectangle(viewer.scene.globe.ellipsoid, new Cesium.Rectangle());
    if(rect == undefined){
        // computeViewRectangle 실패 시: 화면 좌상단·우하단 픽셀을 타원체에 직접 투영
        var leftTop = viewer.scene.camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), viewer.scene.globe.ellipsoid);
        var rightDown = viewer.scene.camera.pickEllipsoid(
            new Cesium.Cartesian2(viewer.scene.canvas.width, viewer.scene.canvas.height),
            viewer.scene.globe.ellipsoid
        );
        leftTop = viewer.scene.globe.ellipsoid.cartesianToCartographic(leftTop);
        rightDown = viewer.scene.globe.ellipsoid.cartesianToCartographic(rightDown);
        rect = new Cesium.Rectangle(leftTop.longitude, rightDown.latitude, rightDown.longitude, leftTop.latitude);
    }
    var west = Number(Cesium.Math.toDegrees(rect.west).toFixed(5));
    var south = Number(Cesium.Math.toDegrees(rect.south).toFixed(5));
    var east = Number(Cesium.Math.toDegrees(rect.east).toFixed(5));
    var north = Number(Cesium.Math.toDegrees(rect.north).toFixed(5));

    if(west > east) east = 360 + east;  // 날짜변경선 통과 보정

    return {"west":west, "south":south, "east":east, "north":north};
};`}</CodeBlock>
          <p>
            이 위에 화살표·텍스트 주석은 Cesium 엔티티(Polyline·Label)로 렌더링해 선 두께를
            소수점 단위까지 조정할 수 있게 했고, 줌 레벨이 바뀌어도 텍스트 엔티티가 사라지지
            않도록 처리했습니다.
          </p>
        </AccordionSection>

        {/* 4. 컴포넌트 매니저 */}
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
