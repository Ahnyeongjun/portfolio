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

export function TeamMcpAgentRetrospective({ description }: { description?: string }) {
  return (
    <div className="space-y-8 text-muted-foreground leading-relaxed">

      {/* 아키텍처 */}
      <div className="p-5 rounded-xl border border-border bg-muted/20 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">아키텍처</p>

        <div className="grid grid-cols-2 gap-3">
          <FlowNode highlight sub="Git 리포 로컬 클론">Git 커밋 로그</FlowNode>
          <FlowNode highlight sub="OAuth2 token.json">Google Calendar</FlowNode>
        </div>
        <div className="flex justify-center text-muted-foreground text-xs">↓ &nbsp; ↓</div>
        <div className="flex justify-center">
          <FlowNode highlight sub="8개 MCP 도구 · FastMCP">MCP 서버</FlowNode>
        </div>
        <div className="flex justify-center text-muted-foreground text-xs">↓</div>
        <div className="grid grid-cols-2 gap-3">
          <FlowNode highlight sub="Cursor · Claude Desktop">AI 클라이언트</FlowNode>
          <FlowNode highlight sub="엑셀 XML · HRWeb · 한컴">자동화 대상</FlowNode>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex-1 border-t border-dashed border-border" />
          <span className="shrink-0 px-2">Gmail SMTP · Playwright · zipfile + ElementTree</span>
          <div className="flex-1 border-t border-dashed border-border" />
        </div>
      </div>

      {/* 도입부 */}
      <p>
        주간보고 작성, HRWeb 공수 입력, 한컴 공수 등 반복 업무를 자동화하기 위해 개인적으로 개발 후
        팀 전체(10명)에 공유한 MCP 기반 에이전트입니다.
        FastMCP로 8개 도구를 구현하고 Cursor·Claude Desktop에서 바로 호출할 수 있도록 배포했습니다.
      </p>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">핵심 기능</h2>

        {/* 1. 엑셀 XML */}
        <AccordionSection
          title="엑셀 서식 100% 보존 — zipfile + XML 직접 조작"
          hint="openpyxl 서식 손실 → ElementTree로 셀 직접 주입"
        >
          <p>
            주간보고 템플릿에는 병합 셀, 조건부 서식, 드롭다운 유효성 검사가 들어 있었습니다.
            <Highlight>openpyxl</Highlight>로 저장하면 이 서식이 전부 사라졌습니다.
            openpyxl이 xlsx를 읽어 재직렬화할 때 자신이 지원하지 않는 XML 요소를 그냥 버리기 때문입니다.
          </p>
          <p>
            xlsx는 ZIP 아카이브입니다.
            <Highlight>zipfile</Highlight>로 압축을 풀고 <Highlight>xml.etree.ElementTree</Highlight>로
            내부 <code>xl/worksheets/sheet1.xml</code>을 직접 파싱해 타깃 셀의 값만 교체한 뒤 다시 압축했습니다.
            원본 ZIP의 나머지 파일은 전혀 건드리지 않아 서식·수식·드롭다운이 100% 보존됐습니다.
          </p>
          <CodeBlock>{`import zipfile, shutil, io
from lxml import etree

def inject_cells(template_path, out_path, cell_map: dict):
    """cell_map: {"D5": "내용", "H5": "내용"} 형태로 전달"""
    shutil.copy(template_path, out_path)

    with zipfile.ZipFile(out_path, "r") as zin:
        names = zin.namelist()
        files = {n: zin.read(n) for n in names}

    sheet_xml = files["xl/worksheets/sheet1.xml"]
    tree = etree.fromstring(sheet_xml)
    ns = {"x": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}

    for ref, value in cell_map.items():
        cell = tree.find(f'.//x:c[@r="{ref}"]', ns)
        if cell is not None:
            v = cell.find("x:v", ns)
            if v is None:
                v = etree.SubElement(cell, "{...}v")
            # 문자열 셀: 인라인 문자열(t="inlineStr") 방식으로 주입
            cell.set("t", "inlineStr")
            is_elem = etree.SubElement(cell, "{...}is")
            t_elem = etree.SubElement(is_elem, "{...}t")
            t_elem.text = value

    files["xl/worksheets/sheet1.xml"] = etree.tostring(tree, xml_declaration=True, encoding="UTF-8")

    with zipfile.ZipFile(out_path, "w", zipfile.ZIP_DEFLATED) as zout:
        for name, data in files.items():
            zout.writestr(name, data)`}</CodeBlock>
        </AccordionSection>

        {/* 2. HRWeb Playwright */}
        <AccordionSection
          title="Playwright로 Blazor Server 폼 자동화"
          hint="Blazor 비동기 렌더링 타이밍 · 부분 일치 셀렉터"
        >
          <p>
            사내 HRWeb(아마란스)은 <Highlight>Blazor Server</Highlight> 앱입니다.
            일반 웹과 달리 폼 값이 SignalR을 통해 서버에서 바인딩되므로
            Playwright가 클릭 직후 바로 다음 요소를 조작하면 아직 렌더링이 끝나지 않아 입력이 무시됐습니다.
          </p>
          <p>
            각 인터랙션 후 <Highlight>time.sleep</Highlight>으로 짧은 대기를 끼워
            Blazor 재렌더링이 완료되길 기다렸습니다.
            또한 날짜·프로젝트 셀렉터 옵션 텍스트가 매달 바뀌어
            <Highlight>부분 일치</Highlight>로 선택하도록 했습니다.
          </p>
          <CodeBlock>{`async def fill_hrweb(page, date: str, project_keyword: str, hours: float):
    # 월 선택 드롭다운 — 부분 일치
    await page.select_option("select#month", label=re.compile(date[:7]))
    await asyncio.sleep(0.8)  # Blazor 재렌더링 대기

    # 날짜 행 클릭
    row = page.locator(f'tr:has-text("{date}")')
    await row.click()
    await asyncio.sleep(0.5)

    # 프로젝트 셀렉터 — 키워드 부분 일치
    await page.select_option(
        "select#project",
        label=re.compile(project_keyword, re.IGNORECASE)
    )
    await asyncio.sleep(0.5)

    # 공수 입력
    hours_input = page.locator("input#workHours")
    await hours_input.fill(str(hours))
    await page.click("button#save")
    await asyncio.sleep(1.0)  # 저장 완료 대기`}</CodeBlock>
          <p>
            한컴 공수 시스템은 Google 계정으로 로그인하는 별도 서비스였습니다.
            로그인 후 <Highlight>sessionStorage</Highlight> 토큰을 추출해 이후 API 요청에 재사용하는 방식으로
            Playwright 세션 유지 비용을 줄였습니다.
          </p>
        </AccordionSection>

        {/* 3. Git + Calendar 병합 */}
        <AccordionSection
          title="Git · Calendar 병합으로 주간보고 자동 생성"
          hint="커밋 없는 날 패턴 추론 · 폴더 단위 그룹핑"
        >
          <p>
            주간보고에는 날짜별로 어떤 프로젝트에서 무슨 작업을 했는지 기록해야 합니다.
            Git 커밋 로그와 Google Calendar 출장 일정 두 소스를 병합해 초안을 만들었습니다.
          </p>
          <CompareTable
            headers={["소스", "수집 방법", "활용"]}
            rows={[
              { cells: ["Git 커밋", "subprocess git log --all --since --until", "날짜별 작업 내용"], highlight: true },
              { cells: ["Google Calendar", "OAuth2 Events API (token.json 캐시)", "출장·회의 일정"], highlight: true },
              { cells: ["패턴 추론", "주변 커밋 폴더명 + 평일 기본 템플릿", "커밋 없는 날 보완"], muted: true },
            ]}
          />
          <p>
            리포 경로의 <Highlight>폴더명</Highlight>을 프로젝트 이름으로 사용해 커밋을 그룹핑했습니다.
            커밋이 없는 평일은 해당 주 다른 날의 커밋에서 가장 많이 등장한 폴더명을 가져와
            &ldquo;유지보수&rdquo; 템플릿으로 채웠습니다.
            생성된 보고서는 <Highlight>Gmail SMTP</Highlight>로 즉시 발송하거나
            엑셀 파일로 저장 후 AI 클라이언트에 반환했습니다.
          </p>
          <CodeBlock>{`@mcp.tool()
def generate_report(start_date: str, end_date: str) -> str:
    """Git + Calendar 병합 주간보고 생성"""
    commits = _collect_commits(start_date, end_date)   # subprocess git log
    trips   = _get_calendar_events(start_date, end_date)  # Google Calendar API

    days = _merge_by_date(commits, trips)

    for day in days:
        if not day["commits"] and day["weekday"] < 5:   # 커밋 없는 평일
            day["inferred"] = _infer_from_context(days, day["date"])

    return _render_report(days)   # 엑셀 XML 주입 후 base64 반환`}</CodeBlock>
        </AccordionSection>

        {/* 4. FastMCP 8 tools */}
        <AccordionSection
          title="FastMCP 8개 도구 구성 · 팀 배포"
          hint="Cursor · Claude Desktop 바로 호출 · 팀 10명 실사용"
        >
          <p>
            FastMCP를 사용하면 Python 함수에 <Highlight>@mcp.tool()</Highlight> 데코레이터만 붙이면
            MCP 프로토콜 직렬화·스키마 생성이 자동으로 처리됩니다.
            총 8개 도구를 구현했습니다.
          </p>
          <CompareTable
            headers={["도구", "역할"]}
            rows={[
              { cells: ["list_commits", "기간별 Git 커밋 로그 수집 · 폴더 그룹핑"] },
              { cells: ["get_trips", "Google Calendar 출장·일정 조회"] },
              { cells: ["create_calendar_event", "Calendar 일정 생성"] },
              { cells: ["generate_report", "Git + Calendar → 주간보고 엑셀 생성"], highlight: true },
              { cells: ["generate_report_with_content", "AI가 내용 작성 → 엑셀 주입"], highlight: true },
              { cells: ["send_report", "생성된 보고서 Gmail SMTP 발송"] },
              { cells: ["preview_hrweb", "HRWeb 입력 전 미리보기 텍스트 반환"] },
              { cells: ["upload_hrweb", "Playwright로 HRWeb · 한컴 공수 자동 입력"], highlight: true },
            ]}
          />
          <p>
            팀원에게 배포할 때는 <code>mcp.json</code>에 서버 경로만 추가하면 됩니다.
            Git·캘린더 인증 정보는 각자 <code>token.json</code>과 <code>.env</code>를 두고
            공용 코드를 공유하는 방식으로 배포했습니다.
          </p>
        </AccordionSection>

      </div>
    </div>
  );
}
