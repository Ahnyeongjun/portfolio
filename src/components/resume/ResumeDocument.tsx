import Image from "next/image";

const contact = {
  name: "안영준",
  title: "Full-Stack Developer",
  email: "ahn479512@gmail.com",
  github: "github.com/Ahnyeongjun",
  githubUrl: "https://github.com/Ahnyeongjun",
  location: "서울",
};

const summary =
  "위성 영상 기반 지도 플랫폼을 처음부터 설계·구현하고, 모놀리식에서 MSA로 전환하며 구조적 문제를 주도적으로 개선해온 백엔드 중심 풀스택 개발자입니다. 하루 수천 건의 위성 영상을 처리하는 대용량 파이프라인 설계, 폐쇄망 환경 문제 해결 등 특수 환경에서의 경험을 쌓았으며, 구현에서 끝내지 않고 서비스 구조와 팀 개발 생산성까지 함께 고민합니다.";

const experience = {
  company: "한컴인스페이스",
  position: "연구원",
  period: "2021.07 ~ 현재",
  duration: "5년차",
  projects: [
    {
      name: "위성 영상 분석 플랫폼 MSA 전환 · 고도화",
      period: "2022.12 ~ 현재",
      tags: ["Spring Boot", "FastAPI", "K8s", "RabbitMQ", "PyTorch", "Next.js", "Storybook"],
      points: [
        "모놀리식 → MSA·이벤트 드리븐 아키텍처 전환 주도 — 9개 서비스 분리, 레플리카 10개 이상 운영",
        "Snowflake 알고리즘 기반 분산 ID 생성기 직접 구현 — 동시 요청 시 ID 중복 방지 및 발생 서버 추적",
        "기능별 플로우 차트·테스트 로직 추가, CI/CD 자동화로 커밋 시 자동 검증 체계 구축",
        "PyTorch 기반 AI 모델 서빙 — SwinTransformer·ConvNeXt 분류, YOLO 탐지, UPerNet 분할, ChangeStar 변화탐지",
        "Next.js FSD 아키텍처 리팩토링 및 Storybook 사내 공통 컴포넌트 라이브러리 운영",
      ],
      achievements: [
        "재배포 건수 월 10건 → 1건, 공통 모듈 배포 속도 4분 → 30초",
        "고객 오류 문의 대응 속도 1주 → 당일 내",
      ],
    },
    {
      name: "영상 타일링 API 서버 고성능화",
      period: "2024.04 ~ 2025.03",
      tags: ["Go", "GDAL", "Redis", "GeoTIFF", "MBTiles", "Nginx", "K8s"],
      points: [
        "WMS → WMTS 전환 — 단일 영상은 WMS 유지, 다량 표출은 타입별 사전 캐싱·조합 방식으로 전환",
        "Go 기반 고루틴 병렬 처리 + Redis 캐싱으로 타일 생성 속도 개선, GDAL GeoTIFF → PNG 변환 파이프라인 구성",
        "Nginx Ingress 로드밸런싱 + 세션 유지로 K8s Replica 확장성 확보, 서비스 간 락 없는 안정 구조 설계",
      ],
      achievements: ["API 응답 속도 4초 → 0.5초 미만"],
    },
    {
      name: "어드민 페이지 인증·권한 시스템 고도화",
      period: "2024.04 ~ 2024.12",
      tags: ["Spring Boot", "Spring Cloud Gateway", "Redis", "PostgreSQL", "JWT"],
      points: [
        "Redis 역인덱스 구축 — userId → sessionId 매핑으로 권한 변경 시 해당 유저 세션만 즉시 조회·갱신 (풀스캔 제거)",
        "IP + userId 단위 실패 카운트, 4회 초과 시 10분 인증 차단으로 브루트포스 방지",
        "재귀 트리 메뉴 N+1 → WITH RECURSIVE CTE 단일 쿼리 전환, Spring Cloud Gateway로 인증·라우팅 일원화",
      ],
      achievements: ["세션 조회 응답 속도 개선 및 권한 변경 실시간 반영 보장"],
    },
    {
      name: "비전 AI 모델 서빙 시스템",
      period: "2021.12 ~ 2023.12",
      tags: ["ROS", "YOLOv5", "Faster R-CNN", "PyTorch", "C++", "OpenCV"],
      points: [
        "Faster R-CNN(ResNet-FPN) 기반 6종 객체 분류 추론 및 RGB-Depth 동기화 실시간 스트리밍 (ROS 연동)",
        "YOLOv5 커스텀 데이터셋 학습 후 PyTorch 모델 → C++ 직접 적용, TCP 소켓·OpenCV 기반 실시간 RTMP 송출",
      ],
      achievements: ["드론 탑재 환경 실시간 객체 탐지 스트리밍 구현, C++ 적용으로 메모리 최적화"],
    },
    {
      name: "영상 전처리 파이프라인 자동화",
      period: "2022.03 ~ 2022.12",
      tags: ["RabbitMQ", "Python", "Saga Pattern", "Docker"],
      points: [
        "폴더 감시 → 이벤트 드리븐 전환 — 단계 완료 즉시 다음 큐 실행, ack/nack 기반 메시지 유실 방지",
        "Saga(Choreography) 패턴 적용 — 실패 시 자동 재처리 및 작업 상태 추적으로 장애 시점 명확화",
      ],
      achievements: ["정상 데이터 실패율 0건, 장애 파악 시간 하루 → 2시간 이내"],
    },
    {
      name: "K8s 기반 테스트 환경 분리 · 인증 시스템 구축",
      period: "2021.07 ~ 2023.06",
      tags: ["Kubernetes", "Docker", "Spring Boot", "LDAP", "Active Directory", "Spring Security"],
      points: [
        "K8s 클러스터 논리 분리로 온프레미스 서버에 운영 동일 테스트 환경 구축, 네임스페이스 분리로 자원 선택적 할당",
        "폐쇄망 환경 LDAP / Active Directory 기반 SSO 인증 체계 설계, Spring Security 인증·인가 레이어 구성",
      ],
      achievements: ["운영 배포 후 장애 대폭 감소, 서버 5대 → 2대로 자원 효율화"],
    },
  ],
};

const sideProjects = [
  {
    name: "모먼티어",
    period: "2025.04 ~ 2025.05",
    type: "팀 프로젝트 (SWYP 9기)",
    role: "리드 개발자 — 프론트엔드 + AI 백엔드",
    tags: ["Next.js", "Zustand", "Storybook", "FastAPI", "MCP", "OpenAI"],
    link: "https://momentier.vercel.app",
    points: [
      "MCP(Model Context Protocol) 아키텍처 설계 — OpenAI Agent가 Tour API를 도구로 호출하는 AI 백엔드 구축",
      "FastAPI + MCP Server 2대 (일정 생성·여행지 추천) SSE 스트리밍 통신 구현",
      "Next.js 15 App Router + Zustand persist 기반 프론트엔드 독립 설계 (7개 전역 스토어)",
      "Storybook 8 기반 컴포넌트 문서화 체계 구축, 카카오 OAuth2·Leaflet 지도·PDF 저장 구현",
    ],
    achievements: [
      "MCP 기반 AI 백엔드 구축 — Tour API + OpenAI를 Agent 도구로 연동하는 구조 설계",
      "Next.js·Zustand·Storybook 첫 도입으로 프론트엔드 아키텍처 독립 설계",
    ],
  },
  {
    name: "Booksight",
    period: "2025.04 ~ 2025.07",
    type: "팀 프로젝트 (SWYP 9기 연계)",
    role: "서브 백엔드",
    tags: ["Kotlin", "Spring Boot 3", "Spring Batch", "QueryDSL", "Redis", "MySQL", "Oracle"],
    link: "https://book-web-frontend-one.vercel.app/",
    points: [
      "Spring Batch Reader-Processor-Writer 파이프라인 — 국립중앙도서관 API → 카카오 API → DB 자동 적재",
      "JdbcTemplate 배치 적재로 대량 초기 데이터 처리 방식 최적화 (코루틴 → JPA → JdbcTemplate 비교)",
      "QueryDSL 기반 동적 검색 쿼리 — 제목·저자·출판사 통합 검색 및 런타임 동적 정렬",
      "AOP + Spring Event 기반 검색 로그 수집 및 2차 배치 연동, MySQL + Oracle 듀얼 DB 연동",
    ],
    achievements: [
      "QueryDSL 첫 도입 — 타입 안전한 동적 쿼리와 런타임 정렬 패턴 체득",
    ],
  },
  {
    name: "위딩 (With-ing)",
    period: "2025.10 ~ 2025.11",
    type: "팀 프로젝트 (SWYP 11기)",
    role: "PM · 프론트엔드 · AI 추천 · 서버 관리",
    tags: ["Next.js", "React Query", "FastAPI", "GPT-4", "DALL-E 2", "Spring Boot", "Docker", "K8s"],
    link: "https://with-ing.vercel.app/main",
    points: [
      "540가지 체형·스타일 조합을 SHA256 해시 키로 MySQL 캐싱 — GPT-4 API 반복 호출 비용 절감",
      "SQL 동적 쿼리 빌더 + 조건 완화 폴백 전략으로 웨딩홀 추천 결과 0건 방지",
      "DALL-E 2 드레스 착용 이미지 생성 + Paramiko SSH 업로드 파이프라인 구현",
      "Docker Compose + GitHub Actions CI/CD 구축, K8s 기반 MSA 전환",
    ],
    achievements: [
      "6주 내 MVP 기획 → 배포 완료",
      "SHA256 해시 캐싱으로 GPT-4 API 비용 절감 및 응답 속도 개선",
    ],
  },
  {
    name: "축지법",
    period: "2025.07 ~ 2025.08",
    type: "팀 프로젝트 (SWYP 10기)",
    role: "백엔드",
    tags: ["Spring Boot 3", "JPA", "QueryDSL", "Spring Batch", "MySQL", "JWT", "OAuth"],
    link: "https://chukjibub-msw.vercel.app/",
    points: [
      "Spring Batch로 공공데이터(Tour API) 축제 정보 자동 수집 파이프라인 구축",
      "QueryDSL 동적 쿼리로 지역/테마/일정별 복합 필터링 조건 처리",
      "지도 뷰 좌표 기반 조회, 달력 뷰 일별 축제 통계 API 설계",
    ],
    achievements: [],
  },
  {
    name: "SIMVEX",
    period: "2026.01",
    type: "팀 프로젝트 (블레이버스 해커톤)",
    role: "프론트엔드",
    tags: ["Next.js", "React Three Fiber", "Zustand", "Three.js", "MSW"],
    link: "https://runtime-simvex.vercel.app/",
    points: [
      "@react-three/fiber + drei 기반 3D 뷰어 구현 — OrbitControls, Bloom·N8AO 후처리",
      "4개 독립 Zustand 스토어 설계 — 분해 레벨·조명·히스토리·타임라인 상태 관리",
      "Undo/Redo 히스토리 50개, Zustand subscribe로 3D 오브젝트 자동 동기화",
      "SSE 스트리밍 AI 응답 파싱 + 30ms 타이핑 애니메이션, jsPDF PDF 내보내기",
    ],
    achievements: [
      "7가지 기계 장치 3D 분해·조립 + AI 어시스턴트 + PDF 내보내기 통합 학습 흐름 설계",
    ],
  },
];

const techStack = [
  { label: "Backend",  items: ["Spring Boot", "Kotlin", "Java", "FastAPI", "Python", "Go"] },
  { label: "Frontend", items: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Storybook"] },
  { label: "Database", items: ["PostgreSQL", "MySQL", "Oracle", "Redis", "RabbitMQ"] },
  { label: "DevOps",   items: ["Kubernetes", "Docker", "Jenkins", "GitHub Actions", "Kafka"] },
];

const education = [
  { school: "한밭대학교", major: "융합기술학과", period: "2022.03 ~ 2026.03", note: "졸업 · 야간" },
  { school: "대덕소프트웨어마이스터고", major: "소프트웨어개발과", period: "2020.03 ~ 2022.03", note: "졸업" },
];

const certifications = [
  { year: "2025", name: "SQL개발자 (SQLD)" },
  { year: "2025", name: "정보처리기사" },
  { year: "2021", name: "정보기기운용기능사" },
  { year: "2020", name: "정보처리기능사" },
];

const activities = [
  { name: "FESI 13기 백엔드 멘토링", period: "2026.03 ~ 04", desc: "프론트엔드 부트캠프에서 백엔드 엔지니어로 참여" },
  { name: "스위프 (SWYP) 웹 9~11기, 앱 4기", period: "2025.01 ~ 2026.04", desc: "프론트엔드·백엔드·PM 역할로 사이드 프로젝트 참여" },
  { name: "항해99 백엔드코스 9기", period: "2025.07 ~ 09", desc: "Spring Boot (Kotlin), TDD, 동시성 처리, Kafka" },
  { name: "AI 커리어스쿨", period: "2024.06 ~ 09", desc: "데이터 분석, Python 기반 데이터 시각화" },
];

/* ── Sub-components ── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 pb-1 border-b border-slate-200">
      {children}
    </h2>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <li className="flex gap-2 text-[10.5px] text-slate-600 leading-snug">
      <span className="mt-[4px] shrink-0 w-[5px] h-[5px] rounded-full bg-slate-300" />
      {text}
    </li>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="text-[9px] px-1.5 py-[2px] bg-slate-100 text-slate-500 rounded font-mono">
      {label}
    </span>
  );
}

/* ── Main Document ── */

export function ResumeDocument() {
  return (
    <article
      className="w-[210mm] mx-auto bg-white shadow-xl print:shadow-none print:w-full print:mx-0"
    >
      {/* Top accent bar */}
      <div className="h-1.5" style={{ background: "linear-gradient(90deg, #38bdf8, #818cf8, #34d399)" }} />

      {/* ── Header ── */}
      <header className="flex items-center gap-6 px-10 pt-8 pb-6 border-b border-slate-200">
        <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-slate-200">
          <Image src="/profile.jpg" alt="안영준" width={64} height={64} className="object-cover w-full h-full" />
        </div>
        <div className="flex-1">
          <div className="flex items-end gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-none">{contact.name}</h1>
            <p className="text-sm text-slate-400 font-medium pb-0.5">{contact.title}</p>
          </div>
          <p className="text-[10.5px] text-slate-400 mt-2 leading-relaxed max-w-lg">{summary}</p>
        </div>
        <div className="text-right text-[10.5px] text-slate-500 space-y-1 shrink-0">
          <p>{contact.email}</p>
          <a href={contact.githubUrl} className="block text-sky-500">{contact.github}</a>
          <p>{contact.location}</p>
        </div>
      </header>

      {/* ── Page 1 Body: Sidebar + Experience ── */}
      <div className="flex items-start">
        {/* Sidebar */}
        <aside className="w-[56mm] shrink-0 border-r border-slate-100 px-5 py-6 space-y-6">
          <section>
            <SectionTitle>기술 스택</SectionTitle>
            <div className="space-y-3">
              {techStack.map((cat) => (
                <div key={cat.label}>
                  <p className="text-[10px] font-semibold text-slate-500 mb-1">{cat.label}</p>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((item) => <Tag key={item} label={item} />)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>학력</SectionTitle>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.school}>
                  <p className="text-[10.5px] font-semibold text-slate-700">{edu.school}</p>
                  <p className="text-[10px] text-slate-500">{edu.major}</p>
                  <p className="text-[9.5px] text-slate-400">{edu.period} · {edu.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>자격증</SectionTitle>
            <div className="space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.name} className="flex items-baseline gap-2">
                  <span className="text-[9.5px] text-slate-400 shrink-0 w-7">{cert.year}</span>
                  <span className="text-[10px] text-slate-700">{cert.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>활동 / 교육</SectionTitle>
            <div className="space-y-2.5">
              {activities.map((act) => (
                <div key={act.name}>
                  <p className="text-[10px] font-semibold text-slate-700 leading-snug">{act.name}</p>
                  <p className="text-[9.5px] text-slate-400">{act.period}</p>
                  <p className="text-[9.5px] text-slate-500 mt-0.5 leading-snug">{act.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Main: Experience only */}
        <main className="flex-1 px-7 py-6">
          <SectionTitle>경력</SectionTitle>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-[13px] font-bold text-slate-800">{experience.company}</span>
            <span className="text-[10px] text-slate-400">{experience.period} · {experience.duration}</span>
          </div>
          <p className="text-[10px] text-slate-500 mb-4">{experience.position}</p>

          <div className="space-y-5">
            {experience.projects.map((proj) => (
              <div key={proj.name}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <p className="text-[11px] font-semibold text-slate-700">{proj.name}</p>
                  <span className="text-[9.5px] text-slate-400 shrink-0 ml-2">{proj.period}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {proj.tags.map((t) => <Tag key={t} label={t} />)}
                </div>
                <ul className="space-y-1">
                  {proj.points.map((pt, i) => <Bullet key={i} text={pt} />)}
                </ul>
                {proj.achievements.length > 0 && (
                  <div className="mt-2 pl-3 border-l-2 border-blue-200 space-y-0.5">
                    {proj.achievements.map((a, i) => (
                      <p key={i} className="text-[10px] text-blue-600 font-medium">✦ {a}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* ── Page 2: Projects (full width) ── */}
      <div
        className="border-t border-slate-100 px-10 py-8"
        style={{ pageBreakBefore: "always", breakBefore: "page" }}
      >
        <SectionTitle>프로젝트</SectionTitle>
        <div className="space-y-6">
          {sideProjects.map((proj) => (
            <div key={proj.name}>
              <div className="flex items-baseline justify-between mb-0.5">
                <span className="text-[11px] font-semibold text-slate-700">{proj.name}</span>
                <span className="text-[9.5px] text-slate-400 shrink-0 ml-2">{proj.period}</span>
              </div>
              <p className="text-[9.5px] text-slate-500 mb-1.5">{proj.type} · {proj.role}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {proj.tags.map((t) => <Tag key={t} label={t} />)}
              </div>
              <ul className="space-y-1">
                {proj.points.map((pt, i) => <Bullet key={i} text={pt} />)}
              </ul>
              {proj.achievements.length > 0 && (
                <div className="mt-2 pl-3 border-l-2 border-blue-200 space-y-0.5">
                  {proj.achievements.map((a, i) => (
                    <p key={i} className="text-[10px] text-blue-600 font-medium">✦ {a}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
