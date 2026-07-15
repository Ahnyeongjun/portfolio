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
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">아키텍처 - 서버 분리</p>

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
          <FlowNode highlight sub="JWT 인증 · Redis 세션">ins-auth-svr</FlowNode>
          <FlowNode highlight sub="INNORIX 연동 · 다운로드 컨트롤러">ins-file-svr</FlowNode>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex-1 border-t border-dashed border-border" />
          <span className="shrink-0 px-2">CesiumJS 3D 뷰어 · Spring Boot · ins-core(공통)</span>
          <div className="flex-1 border-t border-dashed border-border" />
        </div>
      </div>

      {/* 도입부 */}
      <p>
        국가보안기관 위성영상 시스템을 <Highlight>4년째 책임지고</Highlight> 있습니다.
        Spring Boot·MyBatis·PostGIS·CesiumJS 기반 9개 모듈 중 프론트엔드(inops-cms/
        inops-das)·API(inops-api-svr)·인증 서버(ins-auth-svr)·다운로드
        컨트롤러(ins-file-svr) 4개를 2022.05~2024.05 약 2년간{" "}
        <Highlight>처음부터 끝까지</Highlight> 만들었고, 이후 에어갭 운영과 신규
        플랫폼 구축까지 이어서 맡았습니다.
      </p>
      <p>
        이 위에서 분석관은 CesiumJS 3D globe 위에서 위성영상을 직접 보며 표적에 주석을
        달아 판독보고서를 작성하고, 완성된 보고서를 정부 표준 문서(HWP)로 내려받습니다.
      </p>
      <p>
        이후 국가보안기관 대상 위성영상 AI 처리 플랫폼의 <Highlight>운영</Highlight>을 이어받아
        인터넷이 완전히 차단된 에어갭 환경에서 수십 대 서버 규모 클러스터를 무중단 운영했고
        (2024.07~), 별도의 다종위성 수집·처리 플랫폼을 물리 베어메탈 서버 설치부터
        전 과정 <Highlight>신규 구축</Highlight>했습니다(2025.06~2025.12).
      </p>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">백엔드</h2>

        {/* 보안 체계 설계 및 강화: 인증·인가 + Rate Limiting + CSP·SQLi 대응 */}
        <AccordionSection
          title="보안 체계 설계 및 강화 - 인증·인가 · Rate Limiting · CSP·SQL Injection 대응"
          hint="Spring Security 필터+AOP+Redis 세션 / 위험도별 Rate Limiting·로그인 방어 / 외부 보안 진단 10건 이상 해소"
          module="ins-auth-svr"
        >
          <p className="font-medium text-foreground">1. 인증·인가 체계 설계 - Spring Security 필터 + AOP + Redis 세션</p>
          <p>
            엔드포인트가 늘어날수록 컨트롤러마다 권한 체크 코드를 개별적으로 넣다 보니,
            신규 API를 추가할 때 권한 검증을 <Highlight>깜빡 빠뜨리거나</Highlight> 서로 다른
            방식으로 중복 구현하는 위험이 커졌습니다. 여기에 더해 사용자별 동시 로그인을
            통제하고 로그인 시도 공격을 막아야 했는데, 토큰을 단방향으로만 저장하면{" "}
            <Highlight>"이 사용자가 지금 몇 세션에 접속 중인가"</Highlight>를 답할 방법이
            없었습니다.
          </p>
          <p>
            인증은 <Highlight>Spring Security 필터 체인</Highlight>에서 일괄 처리하고, 인가는
            컨트롤러·서비스 코드와 분리해 <Highlight>커스텀 어노테이션 + AOP</Highlight>로
            선언적으로 처리했습니다. 신규 API는 어노테이션 하나만 붙이면 권한 검증이
            자동으로 적용되도록 만들어, 권한 로직이 비즈니스 코드에 섞이지 않게 했습니다.
          </p>
          <CompareTable
            headers={["방식", "권한 체크 위치", "신규 API 추가 시"]}
            rows={[
              { cells: ["기존 (컨트롤러 개별 구현)", "각 컨트롤러 메서드 내부", "매번 권한 체크 코드 직접 작성 - 누락 위험"] },
              { cells: ["어노테이션 + AOP", "AOP 어드바이스 한 곳", "어노테이션만 부착 - 로직 재작성 불필요"], highlight: true },
            ]}
          />
          <p>
            세션은 토큰 저장과 함께 <code>user → token</code> 역색인을 Redis에 함께 저장해
            사용자 기준으로 활성 세션을 즉시 조회·통제할 수 있게 했습니다. 로그인 실패는
            IP·계정 단위로 카운트해 <Highlight>5회 초과 시 차단</Highlight>하고, 차단 해제는
            별도 배치 없이 Redis TTL 만료로 자동 처리했습니다.
          </p>
          <CompareTable
            headers={["저장 방식", "질의 가능 여부", "운영 부담"]}
            rows={[
              { cells: ["토큰 단방향 저장", "토큰 → 사용자만 검증 가능", "활성 세션 수 조회 불가"] },
              { cells: ["user→token 역색인 + Redis", "사용자 → 활성 세션 목록 즉시 조회", "TTL 자동 만료 - 해제 배치 0"], highlight: true },
            ]}
          />
          <p>
            세션 상태를 앱 메모리가 아니라 Redis로 외부화했기 때문에, 서버를 증설해도
            세션 통제 로직은 그대로 동작합니다.
          </p>
          <p className="font-medium text-foreground">2. 계층형 Rate Limiting + 로그인 실패 방어</p>
          <p>
            업로드·삭제 같은 고위험 엔드포인트와 단순 조회 API가 동일하게 무제한 호출
            가능했고, 로그인 무차별 대입을 걸러낼 장치도 없었습니다. 다중 스레드 환경에서
            흔한 <Highlight>read-modify-write 카운팅</Highlight> 방식은 경쟁조건 위험이 있었습니다.
          </p>
          <p>
            필터(<code>ConcurrentHashMap&lt;RiskLevel, Map&lt;IP, AtomicInteger&gt;&gt;</code> +{" "}
            <code>incrementAndGet()</code>으로 락 없이 스레드 안전하게 카운팅)와 AOP(
            <code>@RateLimit</code> 어노테이션)를 2계층으로 분리하고, 엔드포인트 위험도를
            HIGH/MEDIUM/LOW로 나눠 분당 5~20회로 차등 제한했습니다. 로그인 실패 카운트는
            Redis <Highlight>INCR</Highlight>(원자적 증가)로 경쟁조건을 원천 차단했고, Redis
            장애 시에는 로그인을 막지 않는 <Highlight>fail-open</Highlight>을 명시적으로
            선택했습니다.
          </p>
          <CompareTable
            headers={["위험도", "제한", "예시"]}
            rows={[
              { cells: ["HIGH", "5회/분", "업로드·삭제 등 고위험 엔드포인트"], highlight: true },
              { cells: ["MEDIUM", "20회/분", "일반 쓰기 API"], highlight: true },
              { cells: ["로그인 실패", "4회 초과 시 10분 차단", "Redis INCR + TTL 자동 해제"], highlight: true },
            ]}
          />
          <p>
            인메모리 카운터라 다중 인스턴스로 확장하면 카운터가 공유되지 않는 한계는
            남아있지만, 로그인 실패 카운팅만큼은 Redis 기반이라 인스턴스 수와 무관하게
            정확합니다.
          </p>
          <p className="font-medium text-foreground">3. 외부 보안 진단 대응 - 동적 CSP 생성 · SQL Injection 제거</p>
          <p>
            외부 보안 진단에서 서버 정보 노출, CSP 미비(인라인/eval 허용), MyBatis{" "}
            <code>{"${}"}</code> 방식 SQL Injection 등 <Highlight>10건 이상</Highlight>을
            지적받았습니다. 문제는 지도 라이브러리(CesiumJS)가 <code>eval</code>과 인라인
            스타일에 의존해, CSP를 강하게 걸면 지도 화면 자체가 깨지는 제약이 있었다는
            점이었습니다.
          </p>
          <p>
            CSP를 API origin 기반으로 <Highlight>런타임 동적 생성</Highlight>하도록 바꾸고,
            CesiumJS 라이브러리의 <code>eval</code> 패턴을 소스 레벨에서 직접 패치해 CSP
            위반 없이 동작하도록 만들었습니다(서드파티 라이브러리 제약을 소스 패치로 우회).
            Nginx <code>proxy_hide_header</code>로 보안 헤더 관리를 한 곳으로 모으고,{" "}
            <Highlight>47개 매퍼</Highlight>의 SQL Injection을 해소했습니다 - 정적 쿼리
            13개는 <code>{"${}"}</code>를 <code>{"#{}"}</code>로 바꾸는 파라미터 바인딩으로,
            동적 정렬(<code>ORDER BY {"${sidx}"}</code>)에 쓰이는 나머지 34개는 컬럼명을
            허용된 목록과 대조하는 화이트리스트 검증으로 각각 전환했습니다.
          </p>
          <CompareTable
            headers={["항목", "이전", "이후"]}
            rows={[
              { cells: ["CSP", "인라인/eval 허용 - 사실상 무방비", "API origin 기반 런타임 동적 생성"], highlight: true },
              { cells: ["CesiumJS eval 의존", "CSP 강화 시 화면 깨짐", "라이브러리 eval 패턴 직접 패치"], highlight: true },
              { cells: ["정적 쿼리 매퍼", "13개 매퍼 ${} 파라미터 삽입", "#{} 바인딩으로 전환"], highlight: true },
              { cells: ["동적 정렬 컬럼 매퍼", "34개 매퍼 ${} 컬럼명 치환, 검증 없음", "화이트리스트 검증으로 전환"], highlight: true },
            ]}
          />
        </AccordionSection>

        {/* 3. 파일 다운로드 안정화: 엔드포인트 통합 + CORS + XHR 바이너리 + 스트리밍 UX */}
        <AccordionSection
          title="파일 다운로드 안정화 - 엔드포인트 통합 · CORS 재설계 · 스트리밍 UX 개선"
          hint="일반/INNORIX 대용량 전송을 엔드포인트 하나로 · 크로스오리진 CORS 재설계 · 청크 스트리밍 다운로더 및 서버 구현 갭 발견"
          module="ins-file-svr"
        >
          <p className="font-medium text-foreground">1. 다운로드 엔드포인트 통합 - 일반 다운로드와 INNORIX 대용량 전송을 하나로</p>
          <p>
            일반 다운로드와 위성영상처럼 큰 파일의 <Highlight>INNORIX</Highlight> 대용량 전송을
            엔드포인트를 따로 두지 않고 <code>/download.do</code> 하나로 처리했습니다. 분기 기준은
            파일 크기가 아니라 요청에 <code>_StartOffset</code>·<code>_EndOffset</code> 파라미터가
            있는지입니다 - INNORIX 클라이언트가 <code>downloadType: "stream"</code> 설정일 때만 이
            파라미터를 붙여 보냅니다.
          </p>
          <CompareTable
            headers={["요청", "판단 기준", "동작"]}
            rows={[
              { cells: ["일반 다운로드", "_StartOffset·_EndOffset 없음", "file.length() 전체를 한 번에 응답"] },
              { cells: ["INNORIX 대용량 전송", "_StartOffset·_EndOffset 있음", "input.skip()으로 해당 구간만 건너뛰어 그 바이트만 응답"], highlight: true },
            ]}
          />
          <p>
            이 과정에서 <Highlight>Fasoo DRM 암호화</Highlight> 대상 파일이 조각마다
            재암호화되면서 조각별로 바이트 구조가 달라져 파일이 깨지는 버그도 발견해,
            다운로드 요청을 <code>synchronized</code>로 직렬화하고 암호화된 파일이 이미
            있으면 재사용하도록 고쳤습니다.
          </p>
          <p className="font-medium text-foreground">2. 크로스 오리진 CORS 정책 재설계</p>
          <p>
            기존 CORS 설정은 전체 오리진을 허용(<code>allowedOrigins("*")</code>)해 자격증명
            포함 요청을 처리할 수 없었고, 브라우저가 <code>Content-Disposition</code> 커스텀
            헤더를 JS에서 읽지 못하게 막아 다른 오리진에서 파일을 받을 때{" "}
            <Highlight>파일명 자체를 추출하지 못하는</Highlight> 문제가 있었습니다.
          </p>
          <p>
            프로파일별 허용 도메인 화이트리스트를 외부 설정으로 분리하고{" "}
            <code>allowCredentials(true)</code>와 <code>exposedHeaders("Content-Disposition")</code>를
            추가했습니다. 와일드카드+자격증명 조합이 만드는 CORS 오류를 없애고, 배포 환경마다
            재빌드 없이 도메인을 교체할 수 있게 됐습니다.
          </p>
          <p className="font-medium text-foreground">3. 대용량 스트리밍 다운로드 UX 재설계 - 서버 구현 갭까지 직접 발견</p>
          <p>
            전체 파일을 한 번에 받는 구조라 네트워크가 끊기면 처음부터 다시 받아야 했고
            진행률 표시도 없었습니다. 업로드 확장자 검증도 컨트롤러마다 개별 구현되거나
            아예 없어 임의 확장자 업로드가 가능했습니다.
          </p>
          <p>
            <Highlight>File System Access API</Highlight>로 서버 응답을 64KB 청크 단위로 읽어
            디스크에 직접 기록하고, Range 지원 여부를 사전 탐지해 이어받기, 실패 시 최대 3회
            재시도를 구현했습니다. 업로드 확장자 검증은 <code>@FileUploadValidation</code>{" "}
            커스텀 애노테이션 + AOP로 횡단 관심사를 분리했습니다.
          </p>
          <p>
            다운로드 UX를 다 만든 뒤 서버 코드를 다시 들여다보니, <code>folderDownload()</code>가{" "}
            <code>Accept-Ranges: bytes</code>를 선언하면서도 실제 Range 헤더 파싱 코드가 없어{" "}
            <Highlight>클라이언트가 이어받기를 시도해도 서버는 매번 파일 전체를 재전송</Highlight>한다는
            구현 갭을 코드 리뷰로 직접 발견했습니다. 확장자 검증도 매직바이트 검증 없이
            문자열 비교뿐이라는 점을 함께 정리해 다음 개선 과제로 남겼습니다. 같은 시기에
            공통 Ajax 모듈이 바이너리 응답까지 <code>JSON.parse</code>하려던 버그도 함께
            고쳤습니다.
          </p>
        </AccordionSection>

        {/* 5. MyBatis mapper/entity 자동생성 도구 + base 모듈 */}
        <AccordionSection
          title="DB 스키마 기반 MyBatis mapper·entity 자동생성 도구 · 공통 base 모듈"
          hint="information_schema 조회 → 테이블 40여 개의 Entity·XML mapper를 자동 생성 / 제네릭 기반 CRUD base 모듈로 반복 계층 자체를 축소"
          module="inops-api-svr"
        >
          <p>
            DB 엔지니어가 설계해둔 스키마를 그대로 Entity·MyBatis XML mapper로 옮겨 적어야
            했는데, 테이블 수가 많아(<Highlight>40여 개</Highlight>) 신규 테이블마다 이 손
            작업을 반복하는 게 번거로웠습니다. 특히 MyBatis mapper는 컬럼 목록·CRUD·검색
            쿼리 조각이 테이블마다 거의 똑같이 반복되는 <Highlight>보일러플레이트</Highlight>가
            많아 자동화 효과가 컸습니다.
          </p>
          <p>
            DB <code>information_schema</code>를 조회해 컬럼명·PK·주석·numeric precision을
            읽고, 컬럼명 <Highlight>명명 규칙</Highlight>에 따라 타입·검증 애노테이션을 자동
            매핑해 Entity와 CRUD/검색 XML mapper를 생성했습니다. 테이블 전반에 컬럼 네이밍
            규칙이 이미 표준화돼 있었기 때문에 가능했던 방식입니다.
          </p>
          <CompareTable
            headers={["컬럼명 규칙", "매핑 결과"]}
            rows={[
              { cells: ["Code로 끝남", "공통코드 참조 (CmmCd.Entity)"], highlight: true },
              { cells: ["Yn으로 끝남", "Y/N 패턴 검증 (@Pattern)"], highlight: true },
              { cells: ["numeric precision·scale", "Integer / Long / Float 타입 추론"], highlight: true },
            ]}
          />
          <p>
            스키마가 바뀌면서 생성기도 두 세대(Es→Tobe)로 갈아탔습니다. 별도로, 한
            통계 API가 5개 집계 기준마다 동일 조인·필터를 <code>UNION ALL</code>로
            반복 실행하던 것도 <code>WITH</code> CTE로 한 번만 계산하도록 리팩터링해
            테이블 스캔 횟수를 5회에서 1회로 줄였습니다.
          </p>
          <p className="font-medium text-foreground">공통 base 모듈 - Controller·Service·Mapper·Entity 제네릭 추상화</p>
          <p>
            코드 생성기가 <Highlight>초기 코드를 빠르게 찍어내는</Highlight> 접근이라면, 반복
            코드 자체를 줄이는 접근도 병행했습니다. Controller·Service·Mapper·Entity 네 계층을
            제네릭 기반으로 추상화한 <Highlight>base 모듈</Highlight>을 구현해, 신규 테이블은
            이 모듈을 상속하는 것만으로 기본 CRUD 계층을 갖추도록 만들었습니다. 에러 로깅도
            서비스 로직마다 개별적으로 넣는 대신 <Highlight>AOP</Highlight>로 base 모듈에 공통
            적용해, 로깅 누락을 구조적으로 방지했습니다.
          </p>
        </AccordionSection>

        {/* 표적 데이터 관리: 즐겨찾기 재정렬 + 생명주기 감사로그 + 첨부파일 동시성 */}
        <AccordionSection
          title="표적(Target) 데이터 관리 - 즐겨찾기 재정렬 · 생명주기 감사로그"
          hint="부분 시프트 + 윈도우 함수 재정렬 / CUD마다 이력 기록 + 참조 무결성 · 계단식 정리"
          module="inops-api-svr"
        >
          <p className="font-medium text-foreground">1. 즐겨찾기·관심표적 우선순위 재정렬</p>
          <p>
            사용자별 드래그앤드롭 정렬에 정수 순번 컬럼을 쓰다 보니, 전체 재정렬 UPDATE
            비용과 삭제 시 <Highlight>순번 gap</Highlight>이 쌓이는 문제가 있었습니다.
          </p>
          <p>
            이동 구간만 범위 UPDATE하는 부분 시프트 로직과{" "}
            <code>ROW_NUMBER() OVER()</code> 윈도우 함수 기반 순번 재계산(defragmentation)을
            그룹·아이템 2단 계층에 재사용해, reorder 연산이 전체 행이 아니라{" "}
            <Highlight>이동 구간만</Highlight> UPDATE하도록 만들었습니다.
          </p>
          <p className="font-medium text-foreground">2. 표적 생명주기 감사로그 + 삭제 시 계단식 무결성 처리</p>
          <p>
            표적 데이터는 여러 사용자가 생성·수정·삭제·이관할 수 있는데 변경 이력이 없어
            원인 추적이 불가능했습니다. 보고서가 참조 중인 표적을 삭제하면 참조 무결성이
            깨지고, 삭제된 표적을 가리키는 즐겨찾기가 <Highlight>고아 레코드</Highlight>로
            남는 문제도 있었습니다.
          </p>
          <p>
            insert/update/delete마다 트랜잭션유형코드(C/U/D)를 포함한 이력 레코드를 같은
            서비스 메서드 안에서 기록하는 수동 감사로그 패턴을 도입했습니다. 삭제 시 보고서
            참조 카운트를 사전 검증해 참조 중인 표적의 삭제를 애플리케이션 레벨에서
            차단하고, 표적 삭제·이관 시 연관 즐겨찾기·관심표적을 함께 정리하고 순번을
            재정렬하도록(위 1번과 연동) 만들었습니다.
          </p>
          <p>
            여기에 더해, 첨부파일 일련번호를 <code>SELECT MAX(sno)+1</code>로 채번하다
            동시 업로드 시 경쟁조건이 발생하던 버그도 발견해 <code>@Synchronized</code>로
            해당 인스턴스 내 요청을 직렬화해 제거했습니다.
          </p>
        </AccordionSection>

      </div>

      <div className="border-t border-border" />

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">인프라·운영</h2>

        {/* Zabbix 사전 감지 */}
        <AccordionSection
          title="Zabbix 기반 장애 사전 감지 체계 구축"
          hint="에어갭 환경 - 외부 검색 없이 호스트·서비스 상태를 실시간 모니터링"
          module="에어갭 운영"
        >
          <p>
            외부 검색이나 라이브러리 반입이 불가능한 에어갭 환경이라, 장애가 발생해도
            사용자 신고 전까지는 인지가 늦는 구조였습니다. <Highlight>Zabbix</Highlight>로
            호스트·서비스 상태를 실시간 모니터링하는 커스텀 대시보드를 직접 구축해
            장애를 사전에 감지할 수 있는 체계를 확보했습니다.
          </p>
        </AccordionSection>

        {/* 클라우드 배포 프로파일 신설 - 반복 장애 대응 */}
        <AccordionSection
          title="클라우드 배포 프로파일 신설 - 리버스 프록시 경유 연동 반복 장애 대응"
          hint="배포 때마다 내부 API 연동이 끊기는 장애를 8회에 걸쳐 대응 → application-cloud.yml로 환경별 분리 정착"
          module="ins-auth-svr"
        >
          <p>
            발주 기관의 별도 클라우드 환경에 대응하는 Spring Profile이 없었고, Nginx
            리버스 프록시(TLS 종료) 뒤에 서비스가 위치하는 구조에서 내부 API 호출의
            스킴·포트·호스트 불일치가 <Highlight>배포 때마다 반복</Highlight> 발생했습니다.
          </p>
          <p>
            같은 설정 항목을 6일~2개월 간격으로 <Highlight>총 8회</Highlight> 수정한 끝에,{" "}
            <code>application-cloud.yml</code>을 신설해 context-path·로그 경로·외부 API
            host를 dev/prod와 분리 관리했습니다. cloud 환경에서는 내부 API 호출을{" "}
            <Highlight>localhost + 서비스별 path prefix</Highlight>로 우회하는 방식으로
            정착시켜, 이후 같은 환경을 추가할 때 반복 장애가 재발하지 않도록 만들었습니다.
          </p>
        </AccordionSection>

        {/* 9. 다종위성 플랫폼 신규 구축: DB 중앙화 + 베어메탈 인프라 + 타일 서버 동시성 */}
        <AccordionSection
          title="다종위성 플랫폼 신규 구축 - DB 접근 계층 중앙화 · 베어메탈 인프라 · 타일 서버 동시성"
          hint="물리 서버 설치부터 K8s 클러스터 구성, DB 접근 Go API 중앙화, 위성·항공·월면 타일 서버 동시성까지 신규 구축 전 과정"
          module="신규 구축"
        >
          <p className="font-medium text-foreground">1. DB 접근 계층 중앙화 · 베어메탈 인프라</p>
          <p>
            기존 프로젝트들은 각 서비스(Cataloger, Job Manager, 가시화 등)가 ORM으로
            DB에 직접 접근하는 구조였습니다. DB 접근 로직과 자격증명이 모든 서비스에
            흩어져 있어 스키마가 바뀌면 여러 서비스를 동시에 수정해야 했고, Python ORM과
            Go가 같은 DB를 다룰 때 패턴이 어긋나는 문제도 있었습니다.
          </p>
          <p>
            독립 스키마를 새로 짜야 하는 신규 구축 프로젝트의 기회를 활용해, DB 접근을{" "}
            <Highlight>Go 기반 API 한 곳으로 중앙화</Highlight>했습니다. 모든 서비스가
            HTTP로만 DB에 접근하도록 바꾸자 스키마 변경의 영향 범위가 API 레이어
            한 곳으로 좁혀졌고, 서비스는 사용 언어와 무관하게 동일한 방식으로 DB를
            다룰 수 있게 됐습니다.
          </p>
          <p>
            관리형 인프라가 없는 상태에서 물리 서버 설치, K8s 클러스터 구성부터
            다종 수집기 통합, DB 기반 중복 체크, zst/tar.gz 포맷 변환 자동화까지
            베어메탈에서 운영 가능한 시스템까지의 인프라 전 과정을 직접 결정했습니다.
          </p>
          <p className="font-medium text-foreground">2. Go 이미지 타일 서버 동시성 재설계 - 무제한 고루틴 실패 후 세마포어로 안정화</p>
          <p>
            위성·항공·월면(KPLO) 다중 레이어 위성영상을 GDAL로 워핑·합성해 응답하는 WMS
            엔드포인트가 순차 처리로 레이어가 늘수록 응답 지연이 커졌습니다. 처음에는{" "}
            <Highlight>무제한 goroutine 병렬화</Highlight>를 도입했지만 문제가 생겨 전체
            원복했고, 세마포어 기반 버전을 다시 넣었다가도 원복되는 등 두 차례 시행착오를
            거쳤습니다.
          </p>
          <p>
            최종적으로 레이어별 이미지 로딩을 고루틴으로 병렬화하되{" "}
            <Highlight>CPU 코어 수 기반 동적 세마포어</Highlight>(코어×3, 20~100 클램프)로
            동시 실행 수를 제한했습니다. 레이어 검증은 별도 세마포어(코어×2, 20~50)로
            분리하고, <code>context.WithTimeout(30초)</code>로 전체 요청 상한을 걸었습니다.
            <code>sync.Map</code> 기반 TTL 캐시(1분)로 재연산을 줄이고 5분 주기로 캐시를
            청소했으며, <code>sync.Pool</code>로 버퍼를 재사용하고 500레이어를 넘으면 수동
            GC를 트리거했습니다.
          </p>
          <CompareTable
            headers={["단계", "방식", "결과"]}
            rows={[
              { cells: ["1차", "무제한 goroutine 병렬화", "문제 발생 - 전체 원복"], muted: true },
              { cells: ["2차", "세마포어 기반 재도입", "다시 원복"], muted: true },
              { cells: ["최종", "CPU 코어 기반 동적 세마포어 + 타임아웃 + TTL 캐시", "동시성 제한된 안전한 병렬 처리로 정착"], highlight: true },
            ]}
          />
          <p>
            <code>WarpThenTranslate</code>는 SHA-512 캐시 키로 동일 워핑 연산의 GDAL
            재연산을 회피하도록 했습니다. 두 번의 원복 이력 자체가 "무제한 병렬화의
            위험성을 인지하고 세마포어 기반 제어로 전환했다"는 트레이드오프 판단
            과정입니다.
          </p>
          <p className="font-medium text-foreground">기타 기여</p>
          <ul className="space-y-2 list-none">
            <li className="flex gap-2">
              <span className="shrink-0 text-primary font-medium text-sm mt-0.5">·</span>
              <span><Highlight>히스토그램 스트레칭 자동화</Highlight>, <Highlight>COG 포맷</Highlight> 적용으로 가시화 성능 개선</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-primary font-medium text-sm mt-0.5">·</span>
              <span><Highlight>Cleaner 서비스</Highlight> - 등록일 기준 자동 삭제 워크플로우 구축</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-primary font-medium text-sm mt-0.5">·</span>
              <span>모놀리식 db-api를 <Highlight>models·services·api 3계층</Highlight>으로 리팩토링해 이후 표적 검색·페이지네이션 등 기능이 이 구조 위에서 확장되도록 정리</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-primary font-medium text-sm mt-0.5">·</span>
              <span>위성 메타 조회 API를 <Highlight>컬럼 프로젝션</Highlight>·중복 SRID 변환 제거로 최적화하고, ORM 모델 속성 존재 여부로 검증하는 화이트리스트 방식 동적 쿼리와 <Highlight>페이지네이션</Highlight>을 추가</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-primary font-medium text-sm mt-0.5">·</span>
              <span>항공·위성·월면탐사 등 23종 이기종 산출물을 처리하던 배치 파이프라인(Cataloger·Collector)의 동적 로딩 아키텍처 위에 <Highlight>24번째 제품 타입(다중분광카메라)</Highlight> 처리기를 추가 - 기존 23종 구현체를 건드리지 않고 파일 추가만으로 통합</span>
            </li>
          </ul>
        </AccordionSection>
      </div>

      <div className="border-t border-border" />

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">프론트엔드</h2>

        {/* 판독보고서 - CesiumJS 기반 보고서 저작 */}
        <AccordionSection
          title="판독보고서 - CesiumJS 3D globe 기반 보고서 저작 도구"
          hint="별도 도구 없이 분석·주석·보고서 작성을 한 화면에서 원스톱 처리 - 분석관 호평"
          module="inops-das"
        >
          <p>
            판독보고서는 분석관이 CesiumJS 3D globe 위에서 위성영상을 직접 보며 표적에
            화살표·도형·텍스트·이미지로 주석을 다는 기능입니다. 여러 페이지에 걸쳐 의견을 작성해,
            최종적으로 <Highlight>HWP</Highlight>(정부 표준 문서 포맷) 파일로 내려받습니다.
          </p>
          <p>
            <Highlight>영상 판독과 보고서 작성을 한 화면에서 이어서</Highlight> 끝낼 수 있게
            만든 것 자체가 이 기능의 핵심 가치였고, 분석부터 보고서 산출까지 도구를 옮겨다니지
            않아도 된다는 점에서 분석관들의 호평이 많았습니다.
          </p>
          <div className="space-y-1.5">
            <p className="text-[11px] font-medium text-muted-foreground/70 tracking-wide">이전 - PPT 등 별도 도구를 오가며 작성</p>
            <div className="flex items-stretch gap-1.5 overflow-x-auto pb-1">
              {[
                ["화면 캡처", "판독 화면에서"],
                ["도구 전환", "PPT로 이동"],
                ["붙여넣기·정리", "문서 편집"],
                ["표적마다 반복", "①~③ 되풀이"],
              ].map(([title, sub], i) => (
                <React.Fragment key={title}>
                  <div className="shrink-0 min-w-[108px] px-3 py-1.5 rounded-md border border-border bg-background text-center">
                    <div className="text-xs font-medium text-foreground">{title}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{sub}</div>
                  </div>
                  {i < 3 && <span className="self-center text-muted-foreground text-xs shrink-0">→</span>}
                </React.Fragment>
              ))}
            </div>
            <p className="text-[11px] font-medium text-muted-foreground/70 tracking-wide pt-1">판독보고서 - 한 화면에서 이어서</p>
            <div className="flex items-stretch gap-1.5 overflow-x-auto pb-1">
              {[
                ["표적 확인", "3D globe에서"],
                ["주석 작성", "화살표·도형·텍스트·이미지"],
                ["페이지 캡처", "화면·뷰 상태 저장"],
                ["다음 표적", "표적마다 반복"],
                ["HWP 내보내기", "정부 표준 문서"],
              ].map(([title, sub], i) => (
                <React.Fragment key={title}>
                  <div className="shrink-0 min-w-[108px] px-3 py-1.5 rounded-md border border-primary/30 bg-primary/10 text-center">
                    <div className="text-xs font-medium text-primary">{title}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{sub}</div>
                  </div>
                  {i < 4 && <span className="self-center text-muted-foreground text-xs shrink-0">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <p>
            각 페이지는 3D globe 화면을 그대로 캡처해 HWP 배경으로 삽입하는 구조라, 카메라가
            지구본 바깥을 보거나 날짜변경선을 넘는 경우까지 감안해 뷰 상태를 저장·복원했습니다.
          </p>
          <p>
            화살표·도형·텍스트는 Cesium 엔티티(Polyline·Label 등)로,
            이미지는 <code>ImageryLayer</code>로 영역에 지오레퍼런싱해 얹는 방식으로 렌더링했습니다.
          </p>
        </AccordionSection>

        {/* 컴포넌트 매니저 */}
        <AccordionSection
          title="공통 컴포넌트 매니저 - 팝업·iframe·인페이지 통신 통합"
          hint="팝업·iframe 등 서로 다른 window의 함수를 execute() 하나로 통일 - 창 경계를 넘는 이름+인자 기반 호출 추상화"
          module="inops-das"
        >
          <p>
            분석 화면은 같은 페이지 안의 패널, 별도 팝업 윈도우, iframe 등 컴포넌트가 실행되는
            위치가 제각각이었습니다. 화면을 만들 때마다 "이 컴포넌트가 팝업인지 iframe인지"를
            매번 구분해서 호출 방식을 다르게 짜야 한다면 화면이 늘어날수록 관리가 어려워집니다.
          </p>
          <p>
            <Highlight>ins-comp-mng</Highlight>는 컴포넌트가 어디서 실행되든 <code>ins.comp.execute(compId, fnName, args)</code> 하나로
            호출할 수 있게 추상화한 공통 매니저입니다. 내부적으로 컴포넌트 등록 정보를 보고 대상이 같은 페이지의
            객체면 함수를 직접 호출하고, 팝업이나 iframe이면 <code>postMessage</code>로 명령을
            전달해 그쪽에서 같은 이름의 함수를 실행시킵니다. 호출하는 쪽은 대상이 어디 있는지
            신경 쓸 필요가 없습니다.
          </p>
          <CompareTable
            headers={["대상", "매니저 없이", "execute(compId, fnName, args)로"]}
            rows={[
              { cells: ["같은 페이지 객체", "직접 호출", "동일하게 직접 호출"] },
              { cells: ["팝업 (window.open, 부모와 독립된 생명주기)", "핸들을 계속 들고 있다가 직접 호출 - 로딩 전이면 에러", "위치 신경 안 쓰고 동일하게 호출, 응답은 콜백 함수명(fnName)으로 다시 받음"], highlight: true },
              { cells: ["iframe (contentWindow, 부모 DOM에 종속)", "contentWindow 직접 접근 또는 postMessage·리스너를 매번 직접 구현", "위치 신경 안 쓰고 동일하게 호출, 응답은 팝업과 동일한 fnName 콜백 방식"], highlight: true },
              { cells: ["아직 등록 안 됨", "호출부가 대상 존재 여부까지 알아야 함", "부모창으로 재위임, 무한 재요청 방지"], muted: true },
            ]}
          />
          <p>
            같은 윈도우에서 DOM을 공유하는 모달과 달리 팝업·iframe은 window 경계가 분리돼
            직접 호출이 안 되는데, <code>execute()</code> 하나로 이 경계를 지워 이름(fnName)과
            인자(args)만으로 원격 실행을 요청할 수 있게 한 것이 핵심이었습니다. postMessage
            기반 전송 자체는 Penpal·Comlink 같은 라이브러리로도 가능했지만, 팝업·iframe·같은
            페이지 객체를 한 레지스트리로 묶어 대상을 자동 판단하는 디스패치 구조는 앱 구조에
            종속적이라 직접 구현했습니다.
          </p>
          <p>
            실제로는 미등록 컴포넌트 재요청을 막는 가드가 카메라 이동처럼 정상적인 반복
            호출까지 막던 부작용을, 차단 기준을 컴포넌트+함수명 단위로 세분화해 고쳤습니다.
          </p>
          <p>
            유지보수 중에는 창 참조를 점 표기법으로 동적 조회해 항상 <code>undefined</code>를
            반환하던 버그와, 닫힌 팝업을 살아있는 것으로 오인하던 null 체크 누락도
            함께 발견해 고쳤습니다.
          </p>
        </AccordionSection>
      </div>
    </div>
  );
}
