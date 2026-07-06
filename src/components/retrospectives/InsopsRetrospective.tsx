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
            <Highlight>모드</Highlight>로 동작했고, 상단 툴바·좌측 패널 같은 공통 컴포넌트는
            어떤 모드에서 호출됐는지에 따라 동작을 다르게 처리해야 했습니다. 모드 정보가
            호출부마다 일관되게 전달되지 않아, 같은 함수라도 상황에 따라 다르게 동작하거나
            아예 정보가 유실되는 문제가 여러 곳에서 반복됐습니다.
          </p>
          <CompareTable
            headers={["위치", "문제", "처리 방식"]}
            rows={[
              { cells: ["시계열분석 전환 함수", "호출부에 따라 modeId를 안 넘기는 경우 존재", "진입 시점 모드를 baseModeId로 기억해두고 폴백, 탭 이탈 시 초기화"], highlight: true },
              { cells: ["시계열 패널 배치 로직", "변화탐지(TCD) 모드와 일반 다중비교 모드가 같은 배치 함수를 씀", "isTcdTsAnl 플래그로 분기해 TCD는 전/후 페어링, 일반은 날짜순 배치"], highlight: true },
              { cells: ["상단 툴바 버튼", "스와이프·시계열 분할 화면에서는 메인 지도 하나만 반응", "getMode()로 현재 모드 확인 후 해당 모드의 분할 화면에도 동일 커맨드 전달"], highlight: true },
            ]}
          />
          <p>
            각 사례는 다루는 화면도, 고쳐야 하는 파일도 달랐지만 근본적으로는 같은 문제였습니다
            — 여러 모드가 공존하는 화면에서 공통 코드가 &ldquo;지금 어떤 모드인지&rdquo;를
            안정적으로 알 수 있어야 한다는 것이었습니다.
          </p>
        </AccordionSection>

        {/* 3. 판독보고서 — CesiumJS 기반 보고서 저작 */}
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
          <CompareTable
            headers={["다룬 문제", "CesiumJS 구현"]}
            rows={[
              { cells: ["뷰 북마크·복귀", "computeViewRectangle로 위경도 사각 범위 계산 후 flag/load"], highlight: true },
              { cells: ["rect 계산 실패 대비", "화면 좌상단·우하단 픽셀을 pickEllipsoid로 직접 투영해 역산"] },
              { cells: ["날짜변경선 통과 뷰", "서쪽 경도 > 동쪽 경도일 때 동쪽에 360도 보정"] },
              { cells: ["표적 좌표 추출", "화면 좌표 → cartographic 변환 후 위경도로 저장"] },
              { cells: ["화살표·텍스트 주석", "Cesium 엔티티(Polyline/Label)로 렌더링, 선 두께 소수점 조정"] },
              { cells: ["줌 레벨 대응", "줌 변경 시에도 텍스트 엔티티가 사라지지 않도록 처리"] },
            ]}
          />
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
