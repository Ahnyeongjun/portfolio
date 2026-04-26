export interface ProjectResource {
  label: string;
  url: string;
  type: "image" | "pdf" | "html" | "link";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  link?: string;
  status: "live" | "beta" | "development" | "deployed";
  type: "company" | "team" | "personal";
  category: ("fullstack" | "backend" | "frontend" | "ai")[];
  company?: string;
  period: string;
  role: string;
  longDescription?: string;
  details: string[];
  roleDetails?: { role: string; items: string[] }[];
  achievements: string[];
  resources?: ProjectResource[];
  hidden?: boolean;
  backendActive?: boolean;
}

export const projects: Project[] = [
  {
    id: "simvex",
    title: "SIMVEX",
    description:
      "3D 분해/조립 시뮬레이션과 RAG AI 어시스턴트를 결합한 기계공학 학습 웹 서비스",
    tags: ["Next.js", "Three.js", "React Three Fiber", "Zustand", "React Query", "Styled Components", "MSW"],
    imageUrl: "/simvex_thum.png",
    link: "https://runtime-simvex.vercel.app/",
    status: "live",
    type: "team",
    category: ["frontend"],
    period: "2026.01",
    role: "프론트엔드 개발",
    longDescription:
      "제4회 블레이버스 MVP 개발 해커톤에서 진행한 프로젝트입니다. 기계공학 교육에서 2D 교재만으로는 이해하기 어려운 기계 구조를, 3D 인터랙티브 분해·조립 시뮬레이션과 SSE 스트리밍 기반 AI 어시스턴트로 직관적으로 학습할 수 있는 서비스입니다. 7가지 기계 장치(드론, V4 엔진, 로봇팔, 로봇 그리퍼, 판스프링, 만력기, 서스펜션)를 3D로 분해하고 학습할 수 있으며, 부품별 AI 설명·퀴즈·메모·워크플로우·PDF 내보내기까지 학습 흐름 전체를 한 곳에서 관리합니다.",
    details: [],
    roleDetails: [
      {
        role: "프론트엔드",
        items: [
          "@react-three/fiber + drei 기반 3D 뷰어 구현 — OrbitControls, Bounds 자동 프레이밍, EffectComposer(Bloom·N8AO·ToneMapping) 후처리",
          "부품 변형(Transform) 충돌 방지를 위한 Outer/Inner 이중 그룹 구조 설계",
          "4개 독립 Zustand 스토어 설계 — ModelStore(분해 레벨·숨김), RenderStore(조명·재질·카메라), EditStore(도구·히스토리), SimulatorStore(재생 타임라인)",
          "Undo/Redo 히스토리 구현 (최대 50개) — Zustand subscribe로 3D 오브젝트 자동 동기화",
          "시뮬레이터 타임라인과 분해 애니메이션 동기화 — useFrame에서 currentTime/duration 비율로 explodeLevel 제어",
          "SSE(Server-Sent Events) 기반 스트리밍 AI 응답 파싱 — ReadableStream + 30ms 인터벌 타이핑 애니메이션 구현",
          "퀴즈 시스템 — 사전 정의 질문 + 부품명 기반 자동 생성으로 문제 풀(Pool) 구성, 매회 5문제 랜덤 출제",
          "jsPDF + html2canvas로 3D 캡처·메모·AI 대화를 하나의 PDF로 내보내기",
          "@xyflow/react 기반 학습 워크플로우 노드 편집",
        ],
      },
    ],
    achievements: [
      "7가지 기계 장치(드론, V4 엔진, 로봇팔, 로봇 그리퍼, 판스프링, 만력기, 서스펜션) 3D 분해·조립 학습 콘텐츠 구현",
      "피보나치 스피어 알고리즘 기반 자연스러운 부품 분해 애니메이션 구현",
      "SSE 스트리밍 AI 응답 + 타이핑 애니메이션으로 실시간 학습 보조 경험 제공",
      "Undo/Redo·워크플로우·퀴즈·메모·PDF 내보내기를 통합한 완결된 학습 흐름 설계",
    ],
    resources: [
      {
        label: "GitHub",
        url: "https://github.com/team-blaybus-runtime/team-blaybus-runtime_front",
        type: "link",
      },
      {
        label: "프로젝트 설명",
        url: "https://github.com/team-blaybus-runtime/team-blaybus-runtime_front/blob/main/README.md",
        type: "link",
      },
    ],
  },
  {
    id: "mapin",
    title: "Mapin",
    description: "URL 입력 시 AI가 콘텐츠 관점을 분석하고 반대 관점 콘텐츠를 자동 추천하는 개인 콘텐츠 관리 서비스",
    tags: ["Spring Boot", "Java 21", "PostgreSQL", "OpenAI", "YouTube API", "Virtual Threads", "CompletableFuture"],
    imageUrl: "/swyp-app4_thum.png",
    link: "https://dashboard-phi-one-35.vercel.app/login",
    status: "live",
    backendActive: true,
    type: "personal",
    category: ["backend", "ai"],
    period: "2026.03 ~ 2026.04",
    role: "백엔드 개발 (단독)",
    longDescription: "유튜브·뉴스 URL을 입력하면 GPT-4.1-mini가 콘텐츠 관점을 0.0(부정)~1.0(긍정)으로 점수화하고, YouTube·Naver를 병렬 검색해 반대 관점 콘텐츠를 추천하는 서비스입니다. 분석 파이프라인을 Java 21 Virtual Threads + CompletableFuture로 구성하고, 3단계 캐싱으로 동일 콘텐츠 재요청 시 GPT 호출을 0회로 줄였습니다.",
    details: [],
    roleDetails: [
      {
        role: "AI 분석 파이프라인",
        items: [
          "GPT-4.1-mini로 제목·설명·썸네일(detail:LOW) 분석 → viewpoint_score(0.0~1.0)·키워드·반대관점 검색어 JSON 출력, 후보 전체를 배치로 1회 스코어링해 토큰 비용 절감",
          "YouTube API + Naver 검색 API CompletableFuture 병렬 호출 — 반대관점 쿼리 2~3개를 동시 실행 후 MIN_OPPOSITION_DISTANCE(0.4) 기준으로 필터링, 부족 시 약한 반대관점으로 자동 채우는 fallback 로직 구현",
          "AsyncConfig에서 Executors.newVirtualThreadPerTaskExecutor()로 pipelineExecutor 구성 — 스레드 풀 한도 없이 URL당 Virtual Thread 할당, 30초 글로벌 타임아웃으로 파이프라인 보호",
        ],
      },
      {
        role: "3단계 캐싱",
        items: [
          "L1 opposition_json: 분석 결과를 JSON 직렬화해 DB 저장 — 재요청 시 GPT·검색 단계 전부 스킵",
          "L2 is_analyzed 플래그: 소스 콘텐츠 분석 이력 재활용 — GPT 분석 호출만 스킵, 검색은 수행",
          "L3 content_keywords 풀: 키워드 기반 후보 DB 조회 → 임베딩 활성화 시 평균 벡터로 50개 풀 조회 후 메모리에서 viewpointScore 필터링 (2-stage retrieval)",
        ],
      },
      {
        role: "추천 시스템",
        items: [
          "최근 분석 이력 20개에서 키워드 풀 구성 → 후보 최대 200개 수집, viewpointScore 차이 ≥0.4 조건으로 반대관점 콘텐츠 추천",
          "키워드 매칭 횟수 + 스코어 거리 복합 정렬, 메모리 스트림 처리로 N+1 쿼리 없이 추천 목록 생성",
        ],
      },
    ],
    achievements: [
      "3단계 캐싱으로 재분석 요청 시 GPT API 호출 0회 — L1 캐시 히트 시 파이프라인 전 단계 스킵",
      "배치 스코어링으로 후보 N개를 GPT 1회 호출로 처리 — 개별 호출 대비 토큰 비용 절감",
      "App Store + 웹 대시보드 동시 배포 (iOS 앱 심사 통과)",
    ],
    resources: [
      { label: "웹 대시보드", url: "https://dashboard-phi-one-35.vercel.app/login", type: "link" },
      { label: "App Store", url: "https://apps.apple.com/kr/app/mapin/id6761400852", type: "link" },
      { label: "GitHub (프론트)", url: "https://github.com/mapin-application/dashboard", type: "link" },
    ],
  },
  {
    id: "deadline-mate",
    title: "DeadlineMate",
    description: "스터디·프로젝트 모임을 개설하고 주간 Todo와 달성률로 팀 목표를 함께 관리하는 모임 플랫폼",
    tags: ["Spring Boot", "Java 21", "MySQL", "JPA", "QueryDSL", "JWT", "OAuth", "Spring Event"],
    imageUrl: "/deadline-mate_thum.png",
    link: "https://completionisland.vercel.app/main",
    status: "live",
    backendActive: true,
    type: "team",
    category: ["backend"],
    period: "2026.03 ~ 2026.04",
    role: "백엔드 개발",
    longDescription: "스터디·프로젝트 모임을 개설하고 주간 Todo와 달성률을 팀 단위로 관리하는 서비스입니다. FESI 13기 팀 프로젝트로 11개 도메인을 설계했습니다. @TransactionalEventListener 기반 이벤트 알림, QueryDSL Exists Subquery 동적 필터링, 목록 조회 N+1 제거, PESSIMISTIC_WRITE 동시성 제어 등을 직접 구현했습니다.",
    details: [],
    roleDetails: [
      {
        role: "모임 & 검색",
        items: [
          "QueryDSL BooleanBuilder + Exists Subquery로 다대다 관계(모임↔카테고리·태그) 동적 필터링 — IN 대신 EXISTS로 불필요한 조인 제거",
          "목록 조회 N+1 제거 — 모임 ID 배치 수집 후 태그·이미지·리더 정보를 IN 쿼리로 각 1회 조회, LinkedHashMap으로 순서 보장",
          "CQRS 분리 — GatheringService(생성·수정·삭제)·GatheringQueryService(목록·상세 조회) 책임 분리, 스케줄러로 일일 RECRUITING→IN_PROGRESS 상태 자동 전환 및 이벤트 발행",
          "PESSIMISTIC_WRITE 락으로 동시 신청 시 maxMembers 초과 방지, Batch UPDATE로 currentMembers 원자적 증감 처리",
        ],
      },
      {
        role: "이벤트 기반 알림",
        items: [
          "@TransactionalEventListener(AFTER_COMMIT)으로 모임 생성·시작·완료·찌르기·평가 5종 이벤트 발행 — 트랜잭션 커밋 후에만 외부 호출하여 데이터 일관성 보장",
          "평판 시스템 이벤트 분리 — 평가 데이터 저장과 userClient 평판 점수 업데이트를 이벤트로 분리해 외부 서비스 실패 시에도 평가 데이터 유실 없는 fault tolerance 확보",
        ],
      },
      {
        role: "인증",
        items: [
          "OAuthClientFactory 패턴으로 Kakao·Google 멀티 프로바이더 통합 — OAuthClient 인터페이스 구현체를 Map으로 관리해 새 제공자 추가 시 클래스 1개만 등록",
          "LoginAttemptService로 로그인 시도 횟수 추적, 임계치 초과 시 잠금 처리로 브루트포스 방어",
        ],
      },
    ],
    achievements: [
      "목록 조회 N+1 제거 — 모임·태그·이미지·리더 4개 테이블을 각 1회 IN 쿼리로 일괄 처리",
      "이벤트 기반 알림으로 모임 도메인과 알림 로직 완전 분리, 평가 실패 시에도 모임 데이터 보존",
      "PESSIMISTIC_WRITE + Batch UPDATE로 동시 신청 경쟁 조건 해소",
    ],
    resources: [
      { label: "서비스", url: "https://completionisland.vercel.app/main", type: "link" },
      { label: "GitHub", url: "https://github.com/FESI13-3/FESI13-backend", type: "link" },
    ],
  },
  {
    id: "booksight",
    title: "Booksight",
    description: "오늘 출간된 책들을 생일처럼 축하하는 서비스",
    tags: ["Kotlin", "Spring Boot", "Spring Batch", "QueryDSL", "Redis", "Oracle", "MySQL", "JdbcTemplate"],
    imageUrl: "/booksight_thum.png",
    link: "https://book-web-frontend-one.vercel.app/",
    status: "deployed",
    type: "team",
    category: ["backend"],
    period: "2025.04 ~ 2025.07",
    role: "서브 백엔드 개발",
    longDescription: "매일 수많은 책들이 세상에 태어나고, 그중엔 잊혀지기엔 너무나 특별한 이야기들이 담겨 있습니다. 오늘 처음 세상에 나온 책들을 생일처럼 축하하고, 그 특별한 순간을 함께 나누는 서비스입니다. 6명(프론트엔드 2, 백엔드 2, 디자이너, PM)이 함께 진행했습니다. Kotlin + QueryDSL을 처음 제대로 활용한 프로젝트이자, 대량 초기 데이터 적재 방법을 고민하며 많은 것을 배운 프로젝트입니다.",
    details: [],
    roleDetails: [
      {
        role: "백엔드",
        items: [
          "Kotlin + Spring Boot 3.4.4 프로젝트 셋업",
          "Book, Author, Publisher, Contents, Event 도메인 설계",
          "QueryDSL 기반 동적 검색 쿼리 구현 (제목·저자·출판사 통합 검색, 동적 정렬)",
          "Spring Batch — 국립중앙도서관 API Reader → 카카오 API Processor → DB Writer 파이프라인",
          "external 패키지: CSV → 카카오 API 보강 → JdbcTemplate 배치 적재 파이프라인",
          "AOP + Spring Event 기반 검색 로그 수집 및 2차 배치 연동",
          "MySQL + Oracle 듀얼 DB 연동",
        ],
      },
    ],
    achievements: [
      "QueryDSL 첫 도입 — 타입 안전한 동적 쿼리와 런타임 정렬 패턴 체득",
      "초기 데이터 적재 기술 비교 (코루틴 → JPA → JdbcTemplate) 끝에 최적 방식 선택",
      "Spring Batch Reader-Processor-Writer 패턴으로 국립중앙도서관 신간 수집 자동화",
      "external 패키지로 외부 연동(CSV 파이프라인, API 클라이언트) 책임 분리 관리 첫 경험",
      "오랜만에 다시 쓴 Kotlin — 코루틴/JPA 삽질 덕분에 Spring 트랜잭션 컨텍스트 깊게 이해",
    ],
    resources: [
      { label: "GitHub", url: "https://github.com/HBD-BookSight", type: "link" },
    ],
  },
  {
    id: "momentier",
    title: "모먼티어",
    description: "감정 기반 AI 여행 큐레이팅 서비스 (MCP + Tour API + OpenAI)",
    tags: ["Next.js", "Zustand", "Storybook", "FastAPI", "MCP", "OpenAI"],
    imageUrl: "/momentier_thum.png",
    link: "https://momentier.vercel.app",
    status: "live",
    type: "team",
    category: ["fullstack", "ai"],
    period: "2025.04 ~ 2025.05",
    role: "리드 개발자 (프론트엔드 + AI 백엔드)",
    longDescription: "스위프(SWYP) 9기에서 진행한 사이드 프로젝트입니다. '순간(Moment) + Engineer'라는 뜻으로, 사용자의 감정·분위기·활동 취향을 기반으로 AI가 여행지를 추천하고 일정을 자동 생성해주는 큐레이팅 서비스입니다. 처음으로 Next.js, Zustand, Storybook을 학습하며 프론트엔드를 설계했고, MCP(Model Context Protocol)를 통해 Tour API와 OpenAI를 연동하는 AI 백엔드를 직접 구축했습니다. 7명(프론트엔드 2, 백엔드 3, 디자이너, PM)이 함께 진행했습니다.",
    details: [],
    roleDetails: [
      {
        role: "프론트엔드 (Next.js 15 + Zustand + Storybook 학습)",
        items: [
          "Next.js App Router 기반 페이지 설계 (메인, 감정 입력, 추천, 일정 상세, 마이페이지)",
          "Zustand persist 패턴으로 인증·입력·추천·일정 전역 상태 관리 (7개 Store)",
          "카카오 OAuth2 인증 연동 및 useLogin, useAuthGuard Hook 구현",
          "Leaflet 기반 지도 표시·마커·경로 안내 및 PDF 일정 저장 기능",
          "Storybook 8 기반 컴포넌트 문서화 (Button, Card, Chip, Modal 등) 및 페이지별 시나리오 스토리 작성",
          "커스텀 뷰포트(XS~XL) 설정으로 반응형 디자인 검증 체계 구축",
        ],
      },
      {
        role: "AI 백엔드 (MCP + Tour API + OpenAI)",
        items: [
          "MCP(Model Context Protocol) 아키텍처 설계 — OpenAI Agent가 Tour API를 도구로 호출하는 구조",
          "FastAPI + MCP Server 2대 구축 (일정 생성용 8070, 여행지 추천용 8071, SSE 통신)",
          "공공데이터포털 Tour API 연동 (지역별 관광지 조회, 좌표 기반 주변 검색, 키워드 검색)",
          "OpenAI Agent 기반 여행지 3곳 추천(gpt-4.1-mini), 다일정 자동 생성(gpt-4.1), 입력 제안(gpt-4.1-nano)",
          "Pydantic 구조화 출력으로 Agent 응답을 프론트엔드 스키마에 맞게 변환",
        ],
      },
    ],
    achievements: [
      "Next.js·Zustand·Storybook 첫 학습 프로젝트로 프론트엔드 아키텍처 독립 설계",
      "MCP 기반 AI 백엔드 구축 — Tour API + OpenAI를 Agent 도구로 연동하는 구조 설계 및 구현",
      "Storybook 기반 컴포넌트 문서화 체계 구축 (컴포넌트 + 페이지 스토리)",
    ],
    resources: [
      { label: "GitHub (Frontend)", url: "https://github.com/SWYP-TRAVEL", type: "link" },
      { label: "GitHub (MCP Backend)", url: "https://github.com/SWYP-TRAVEL/MCP", type: "link" },
      { label: "Storybook", url: "https://momentier.github.io/SWYP_FRONT/?path=/docs/configure-your-project--docs", type: "link" },
    ],
  },
  {
    id: "chukjibeob",
    title: "축지법",
    description: "전국 축제 정보를 지도와 달력으로 한눈에 보여주는 서비스",
    tags: ["Spring Boot", "Spring Batch", "QueryDSL", "MySQL", "OpenFeign"],
    imageUrl: "/chukjibeob_thum.webp",
    link: "https://chukjibub-msw.vercel.app/",
    status: "live",
    type: "team",
    category: ["backend"],
    period: "2025.07 ~ 2025.08",
    role: "백엔드",
    longDescription: "스위프(SWYP) 10기에서 진행한 사이드 프로젝트입니다. 주말마다 어디서 무슨 축제가 열리는지 한눈에 알기 어려웠던 문제를 해결하고자 기획했습니다. 전국의 축제 정보를 지도와 달력 위에 펼쳐, 내 주변의 작은 마을 축제부터 대규모 행사까지 관심 있는 테마와 일정에 맞춰 필터링하고 발견할 수 있습니다.",
    details: [],
    roleDetails: [
      {
        role: "백엔드",
        items: [
          "Spring Boot 3 + JPA + QueryDSL 기반 REST API 설계 및 구현",
          "Spring Batch로 공공데이터(Tour API) 축제 정보 자동 수집",
          "지역/테마/일정별 축제 검색 및 필터링 API",
          "달력 뷰 일별 축제 수 통계 API",
          "지도 뷰 좌표 기반 축제 조회 API",
          "Spring Security + JWT + OAuth(카카오) 인증",
          "북마크 및 사용자 활동 로그 기능",
        ],
      },
    ],
    achievements: [
      "공공데이터 API 배치 처리로 축제 데이터 자동화",
      "QueryDSL 동적 쿼리로 복잡한 필터링 조건 처리",
    ],
    resources: [
      { label: "GitHub", url: "https://github.com/swyp10-9", type: "link" },
    ],
  },
  {
    id: "with-ing",
    title: "위딩 (With-ing)",
    description: "예비부부를 위한 웨딩 플래너 및 AI 드레스 추천 서비스",
    tags: ["Next.js", "React Query", "FastAPI", "OpenAI", "DALL-E", "Spring Boot", "MySQL", "Docker"],
    imageUrl: "/with-ing_thum.webp",
    link: "https://with-ing.vercel.app/main",
    status: "live",
    type: "team",
    category: ["fullstack", "ai"],
    period: "2025.10 ~ 2025.11",
    role: "PM, 프론트엔드, AI 추천 기능, 서버 관리",
    longDescription: "스위프(SWYP) 11기에서 진행한 사이드 프로젝트입니다. 예비부부들이 웨딩 준비 과정에서 겪는 정보 탐색의 어려움을 해결하고자 기획했습니다. 웨딩홀, 스튜디오, 드레스샵, 메이크업샵 정보를 한 곳에서 검색하고 비교할 수 있으며, AI가 체형을 분석하여 드레스를 추천하고 DALL-E로 착용 이미지를 생성해주는 기능을 제공합니다. GPT-4 기반 드레스 추천과 SQL 동적 쿼리 기반 웨딩홀 추천을 결합한 하이브리드 AI 구조가 이 프로젝트의 핵심입니다.",
    details: [],
    roleDetails: [
      {
        role: "PM",
        items: [
          "WBS 일정 관리 및 프로젝트 진행 총괄",
          "IA(정보 구조) 설계",
          "와이어프레임 및 디자인 작업",
        ],
      },
      {
        role: "프론트엔드",
        items: [
          "Claude Code + Figma MCP 활용 퍼블리싱 (31개 컴포넌트 구현)",
          "Next.js App Router + React Query(TanStack Query) 기반 서버 상태 관리",
          "Next.js API Route를 프록시로 활용 — CORS 우회 및 Authorization 헤더 중앙화",
          "MSW(Mock Service Worker)로 백엔드 독립적인 개발 환경 구성",
        ],
      },
      {
        role: "AI 추천 기능",
        items: [
          "FastAPI + GPT-4 기반 드레스 추천 서버 개발 (swyp-llm-main)",
          "체형·스타일 조합 540가지를 SHA256 해시 키로 MySQL 캐싱 — API 비용 절감 및 응답 속도 개선",
          "SQL 동적 쿼리 빌더로 웨딩홀 필터 조건 조합 → 조건 완화 폴백 전략으로 결과 0건 방지",
          "DALL-E 2 기반 드레스 착용 이미지 생성 및 Paramiko SSH 업로드 파이프라인 구현 (swyp-createImg-main)",
        ],
      },
      {
        role: "서버 관리",
        items: [
          "Docker Compose + GitHub Actions CI/CD 구축",
          "K8s + Jenkins 기반 MSA 구조로 전환 (도메인별 서비스 분리)",
        ],
      },
    ],
    achievements: [
      "6주 내 MVP 출시 (기획 → 배포)",
      "540가지 체형 조합 SHA256 해시 캐싱으로 GPT-4 API 반복 호출 비용 절감",
      "Next.js API Route 프록시 패턴으로 CORS 문제 해결 및 인증 헤더 중앙화",
      "조건 완화 폴백 전략으로 웨딩홀 추천 결과 0건 방지",
    ],
    resources: [
      { label: "GitHub", url: "https://github.com/swyp11", type: "link" },
      { label: "IA 설계", url: "/with-ing_ia.html", type: "html" },
      { label: "디자인 & 와이어프레임", url: "/with-ing_design.png", type: "image" },
    ],
  },
  {
    id: "msa-platform",
    hidden: true,
    title: "MSA 통합 플랫폼",
    description: "사이드 프로젝트들을 K8s 기반 마이크로서비스로 통합한 인프라",
    tags: ["Kubernetes", "Jenkins", "Kafka", "Tailscale", "Docker"],
    status: "development",
    type: "personal",
    category: ["backend"],
    period: "2024.12 ~ 진행중",
    role: "인프라 설계 및 구축",
    longDescription: "여러 사이드 프로젝트(위딩, 축지법, Booksight 등)를 하나의 K8s 클러스터에서 운영하기 위한 MSA 인프라입니다. 10개의 마이크로서비스를 통합하고, CI/CD 파이프라인과 VPN 기반 보안 접근을 구축했습니다.",
    details: [],
    roleDetails: [
      {
        role: "인프라",
        items: [
          "K8s 클러스터 구축 및 namespace/RBAC 설정",
          "Jenkins CI/CD 파이프라인 (K8s 위 배포)",
          "Nexus 프라이빗 Docker registry 운영",
          "Kafka 이벤트 기반 서비스 통신",
          "Tailscale VPN 기반 보안 접근",
          "Docker buildx 멀티아키텍처 빌드 (amd64/arm64)",
        ],
      },
      {
        role: "공통 모듈",
        items: [
          "common-lib 공유 라이브러리 설계",
          "Gradle 로컬 배포 자동화",
        ],
      },
    ],
    achievements: [
      "10개 마이크로서비스 단일 클러스터 통합 운영",
      "멀티아키텍처 빌드로 ARM/x86 환경 모두 지원",
    ],
    resources: [
      { label: "GitHub", url: "https://github.com/Ahnyeongjun?tab=repositories", type: "link" },
    ],
  },
  {
    id: "team-mcp-agent",
    title: "팀 업무 자동화 MCP 에이전트",
    description: "SuperMCP 기반 Slack·Gmail·캘린더·Git·사무실 예약 통합 자동화 에이전트 — 팀 10명 실사용 중",
    tags: ["Python", "SuperMCP", "MCP", "Slack API", "Gmail API", "Google Calendar API"],
    status: "deployed",
    type: "company",
    company: "한컴인스페이스",
    category: ["backend", "ai"],
    period: "2026.03 ~ 2026.04",
    role: "설계 및 개발",
    longDescription: "주간보고 작성, 일정 관리, 사무실 예약 등 반복 업무를 자동화하기 위해 개인적으로 개발하여 팀 전체(10명)에 공유한 MCP 기반 에이전트입니다. SuperMCP 프레임워크를 활용해 Slack, Gmail, Google Calendar, Git, 사내 아마란스 예약 사이트를 단일 에이전트로 통합했습니다.",
    details: [],
    roleDetails: [
      {
        role: "MCP 에이전트 설계 및 개발",
        items: [
          "SuperMCP 기반 멀티서비스 통합 에이전트 설계 — Slack, Gmail, Google Calendar, Git, 사내 아마란스 예약 시스템 연동",
          "Git 커밋 로그 + 캘린더 일정을 분석하여 주간보고 초안 자동 생성 및 엑셀 저장",
          "Google Calendar 연동으로 일정 자동 생성 및 팀원 공유",
          "아마란스 사내 예약 사이트 자동 접근으로 사무실 예약 자동화",
        ],
      },
    ],
    achievements: [
      "팀 10명 전원 실사용 중인 업무 자동화 도구로 정착",
      "주간보고 작성·사무실 예약 등 반복 업무 자동화로 팀 생산성 향상",
    ],
  },
  {
    id: "satellite-platform",
    title: "위성 영상 분석 플랫폼 고도화",
    description: "MSA & 이벤트 드리븐 전환으로 재배포 월 10건 → 1건, 배포 속도 4분 → 30초 달성",
    tags: ["Spring Boot", "FastAPI", "K8s", "RabbitMQ", "PyTorch", "Next.js", "Storybook"],
    imageUrl: "/gis-platform_thum.png",
    status: "deployed",
    type: "company",
    category: ["fullstack"],
    company: "한컴인스페이스",
    period: "2022.12 ~ 진행중",
    role: "아키텍처 재설계 및 풀스택 개발",
    longDescription: "자사 위성 영상 분석 플랫폼의 기능 개발 및 고도화 프로젝트입니다. 노후화된 기술 스택과 관리 미비 상태에서 고객 요구사항을 반영할수록 새로운 이슈가 발생하여 개발 속도가 지연되는 문제를 해결하기 위해, 기능별 플로우 정리와 테스트 코드 작성, MSA 및 이벤트 드리븐 아키텍처 도입을 주도했습니다.",
    details: [],
    roleDetails: [
      {
        role: "MSA & 이벤트 드리븐 아키텍처 전환",
        items: [
          "서비스 간 영향을 최소화하고 에러 지점을 명확히 파악하기 위해 MSA & 이벤트 드리븐 아키텍처 도입",
          "외부망·폐쇄망 간 DB 양방향 동기화 구현 — 네트워크 불안정으로 Debezium replication slot이 반복적으로 깨지는 문제를 직접 개발한 Outbox 패턴 라이브러리로 대체",
          "기능별 플로우 차트 정리 및 테스트 로직 추가, 커밋 시 자동 테스트되도록 CI/CD 작성",
          "분산 ID 생성기 직접 구현 (Snowflake 알고리즘) — 폐쇄망·공개망이 분리된 환경에서 외부 코디네이터(ZooKeeper 등) 접근이 불가하여 기성 라이브러리 사용 불가, worker ID를 망별로 사전 할당하여 양쪽에서 충돌 없는 고유 ID 생성 및 파일 기반으로 전달된 로그에서 발생 서버 즉시 추적 가능",
          "9개 MSA 서비스 분리 — 서비스 간 장애 격리와 독립 배포를 위한 아키텍처 전환으로, 한 서비스 장애가 전체 시스템으로 전파되던 문제 해소",
          "HPA 기반 동적 스케일링 — 영상 분석 요청 특성상 처리 시간이 길어 동시 요청 시 스레드 풀 고갈 문제 발생, 레플리카를 여러 노드에 자동 분산하여 동시 처리량 확보",
          "Gateway를 통한 인증·로깅·도메인별 서비스 조합 구조화",
        ],
      },
      {
        role: "AI 모델 서빙 시스템",
        items: [
          "ConvNeXt 백본 + UPerNet 디코더 기반 위성 영상 6클래스 시맨틱 세그멘테이션 구현 — ImageNet-22k pretrained ConvNeXt-Tiny 가중치로 전이학습, 위성 도메인에 fine-tuning",
          "UPerNet 디코더 구조: PPM(1×1·2×2·3×3·6×6 global pooling으로 전역 맥락 포착) → FPN(top-down 업샘플링으로 저수준·고수준 feature 융합) → 4스케일 concat → 픽셀 분류 (forest·water·ground·building·meadow·road)",
          "ConvNeXt 4단계 멀티스케일 feature(P1~P4, 96→192→384→768ch)가 UPerNet FPN과 자연스럽게 결합 — ViT 대비 메모리 효율 우위, DDP 분산학습 안정적",
          "관심정보탐지(POI): YOLO25 기반 객체탐지와 세그멘테이션 결합, RINO·ChangeStar 변화탐지 모델 고도화",
        ],
      },
      {
        role: "프론트엔드 개선",
        items: [
          "Next.js FSD 아키텍처 리팩토링",
          "Storybook 통합 테스트 및 사내 프론트엔드 공통 라이브러리 운영",
        ],
      },
      {
        role: "폐쇄망 패키지 저장소 통합",
        items: [
          "Pulp 도입으로 Maven(Java) 단독 운영에서 PyPI(Python)·npm(JavaScript) 포함 멀티 포맷 내부 미러로 전환 — 폐쇄망 환경에서 pip install·npm install 모두 내부 저장소에서 처리 가능하도록 구성",
        ],
      },
    ],
    achievements: [
      "오류 관련 고객 문의 대응 속도 1주 → 하루 내로 감소",
      "장애로 인한 재배포 건수 월 10건 → 1건 내외로 감소하여 운영 안정성 확보",
      "인증·로깅 등 백엔드 공통 모듈을 Spring Cloud Gateway로, 프론트엔드 공통 설정을 공통 라이브러리로 각각 일원화 — 기존에는 12개 서비스에 각각 내장되어 업데이트 시 전체 재배포 필요했으나, 각 공통 모듈 1개만 재배포하면 되도록 개선되어 배포 속도 4분 → 30초로 감소",
    ],
    resources: [
      { label: "서비스 소개", url: "https://www.inspace.co.kr/instation-platform", type: "link" },
    ],
  },
  {
    id: "outbox-module",
    title: "Outbox 패턴 기반 이벤트 캡처 모듈",
    description: "Debezium CDC slot 불안정 문제를 AOP + MyBatis 인터셉터 기반 아웃박스 패턴으로 대체, 폐쇄망 파일 동기화 구현",
    tags: ["Java", "Spring Boot", "Spring AOP", "MyBatis", "PostgreSQL", "Jackson"],
    status: "deployed",
    type: "company",
    category: ["backend"],
    company: "한컴인스페이스",
    period: "2026.02 ~ 2026.04",
    role: "라이브러리 설계 및 개발",
    longDescription: "외부망과 폐쇄망이 분리된 환경에서 두 망 간 유일한 통신 수단은 파일 기반 중계 서버입니다. 기존에는 Debezium CDC로 변경 이벤트를 캡처했으나, 서버·네트워크 불안정으로 Debezium replication slot이 반복적으로 깨지는 문제가 발생했습니다. PostgreSQL WAL은 무제한 저장되지 않으며 replication slot이 읽은 위치까지만 삭제를 지연하는데, slot이 깨져 재생성되면 이전 LSN 위치를 잃어버리고 그 사이 삭제된 WAL은 복구할 수 없어 전체 스냅샷부터 재수행해야 하는 구조적 취약점이 있었습니다. 이를 해결하기 위해 애플리케이션 레벨에서 AOP와 MyBatis 인터셉터로 이벤트를 캡처하는 Spring Boot 자동설정 라이브러리를 직접 개발하고 실무 프로젝트에 적용했습니다.",
    details: [],
    roleDetails: [
      {
        role: "이벤트 캡처",
        items: [
          "MyBatis Executor 인터셉터로 INSERT/UPDATE/DELETE 자동 감지 — 비즈니스 코드 변경 없이 투명하게 이벤트 캡처",
          "TransactionSynchronization.beforeCommit()으로 비즈니스 트랜잭션과 Outbox 저장을 같은 트랜잭션으로 처리해 이벤트 유실 방지",
          "@OutboxDomain / @OutboxEvent 애노테이션으로 도메인·메서드 단위 캡처 여부 제어",
          "DefaultOutboxConverter에서 password·token 등 민감 필드 자동 제외 후 Jackson 직렬화",
        ],
      },
      {
        role: "배치 & 파일 생성",
        items: [
          "시간(60초) + 건수(1000건) 이중 트리거 배치 스케줄러로 Outbox 테이블 폴링",
          "FOR UPDATE SKIP LOCKED로 다중 인스턴스 환경에서 중복 처리 방지",
          "seq_from ~ seq_to 범위를 JSON Gzip 파일(sync_{seqFrom}_{seqTo}_{timestamp}.json.gz)로 압축 생성 후 중계 서버 경로에 적재",
          "자정 배치로 7일 이상 된 SENT 레코드 자동 정리",
        ],
      },
      {
        role: "루프 방지",
        items: [
          "ThreadLocal 기반 OutboxContext로 suppress 상태 관리 — 폐쇄망에서 수신한 데이터를 적용할 때 Outbox 재발행 차단",
          "source 필드로 이벤트 출처 식별, 양방향 동기화 시 무한 루프 방지",
        ],
      },
    ],
    achievements: [
      "Debezium replication slot 반복 장애 해소 — 애플리케이션 레벨 이벤트 캡처로 인프라 의존성 제거",
      "비즈니스 코드 무침투 설계 — 애노테이션 추가만으로 기존 서비스에 즉시 적용 가능",
      "트랜잭션 원자성 보장으로 이벤트 유실 0건 달성",
    ],
    resources: [
      { label: "GitHub", url: "https://github.com/Ahnyeongjun/outbox_module", type: "link" },
    ],
  },
  {
    id: "admin-page",
    title: "어드민 페이지 고도화",
    description: "Redis 역인덱스 및 N+1 제거, Spring Cloud Gateway 도입으로 인증 시스템 일원화",
    tags: ["Spring Boot", "Spring Cloud Gateway", "Redis", "PostgreSQL", "JWT"],
    status: "deployed",
    type: "company",
    category: ["backend"],
    company: "한컴인스페이스",
    period: "2024.04 ~ 2024.12",
    role: "인증·권한 시스템 설계 및 개발",
    longDescription: "멀티모듈 WAR 구조에서 모듈별로 세션이 분산되어 있어 Redis로 세션을 단일화했습니다. 이후 사용자 로그인 정보 조회 시 응답 속도 저하와, 특정 사용자의 권한 수정이 일부 서비스에 반영되지 않는 문제가 발생했습니다. Redis에 저장된 전체 세션을 풀스캔해야 하는 구조와, 재귀적 트리 구조 메뉴에서 N+1 쿼리가 원인이었습니다.",
    details: [],
    roleDetails: [
      {
        role: "세션 관리 최적화",
        items: [
          "Redis 역인덱스 구축으로 풀스캔 제거 — userId → sessionId 목록 구조로 저장하여 권한 변경 시 해당 유저의 세션만 즉시 조회 및 갱신",
          "Redis DB 3개로 용도 분리 (세션 / 방문자 통계 / 로그인 실패 추적)",
          "IP + userId 단위 실패 횟수 카운트하여 4회 초과 시 10분간 인증 차단으로 브루트포스 방지",
        ],
      },
      {
        role: "권한 조회 N+1 제거",
        items: [
          "재귀적 트리 구조 메뉴에서 건별 조회 → WITH RECURSIVE CTE + 단일 쿼리 전환",
          "인증 필터에서 전체 권한 정보를 한 번에 로드 후 메모리에서 매핑하는 방식으로 변경",
        ],
      },
      {
        role: "Gateway 도입",
        items: [
          "Spring Cloud Gateway 도입으로 인증·라우팅·로깅 공통 처리 일원화",
          "각 서비스별 세션 유지 불필요해져 유지보수성 확보",
        ],
      },
    ],
    achievements: [
      "Redis O(N) 풀스캔 → O(1) 역인덱스 전환으로 세션 조회 속도 개선, 인증 필터에서 권한 정보를 메모리 매핑으로 전환하여 매 요청마다 발생하던 DB 쿼리 제거, 권한 변경 실시간 반영 보장",
      "Spring Cloud Gateway 도입으로 인증·라우팅·로깅 공통 처리 일원화, 각 서비스별 세션 유지 불필요",
    ],
  },
  {
    id: "image-api",
    title: "영상 타일링 API 서버",
    description: "WMS → WMTS 전환으로 API 응답 속도 4초 → 0.5초 미만 달성",
    tags: ["Go", "GDAL", "Redis", "GeoTIFF", "MBTiles", "Nginx", "K8s"],
    status: "deployed",
    type: "company",
    category: ["backend"],
    company: "한컴인스페이스",
    period: "2024.04 ~ 2025.03",
    role: "영상 타일링 API 설계 및 개발",
    longDescription: "자사 솔루션 내 영상 표출 API에서 영상 이미지가 증가함에 따라 응답 속도가 저하되는 문제를 해결했습니다. K8s Replica 설정이 Ingress를 타지 않고 매번 재연결되며 리소스가 누출되었고, WMS 특성상 바운더리 요청마다 영상을 겹쳐 쌓는 방식이라 캐싱이 비효율적이었습니다.",
    details: [],
    roleDetails: [
      {
        role: "WMS → WMTS 전환",
        items: [
          "개별 영상 표출 시 WMS를 사용하여 사용성 유지",
          "다량 영상 표출 시 WMTS 타입별로 특정 타일을 미리 캐싱하여 조합하는 방식으로 전환",
          "Go 기반 고루틴 병렬 처리 및 Redis 캐싱",
        ],
      },
      {
        role: "인프라 최적화",
        items: [
          "Nginx Ingress upstream keepalive 설정으로 각 Pod에 대한 커넥션 풀 관리 — 매 요청마다 TCP 핸드셰이크가 반복되던 오버헤드 제거",
          "지도 이동 시 타일 요청이 수십 개씩 동시에 발생하는 GIS 특성 상 단일 인스턴스 스레드 풀 고갈 문제 존재 — HPA로 부하에 따라 레플리카를 여러 노드에 자동 분산하여 동시 처리량 확보",
          "GDAL 기반 GeoTIFF → PNG/Vector Tile 변환 파이프라인",
          "MBTiles 벡터 타일링으로 줌 레벨/좌표 기반 폴리곤 선별 렌더링",
        ],
      },
    ],
    achievements: [
      "WMTS 도입과 이미지 캐싱으로 API 응답 속도 4초 → 0.5초 미만으로 감소",
      "서비스 간 세션 경쟁 제거로 안정성 확보 및 락 제거",
    ],
  },
  {
    id: "pipeline",
    title: "영상 전처리 파이프라인 자동화",
    description: "폴더 감시 → 이벤트 드리븐 전환으로 장애 파악 시간 하루 → 2시간 이내로 감소",
    tags: ["RabbitMQ", "Python", "Saga Pattern", "Docker"],
    status: "deployed",
    type: "company",
    category: ["backend"],
    company: "한컴인스페이스",
    period: "2022.03 ~ 2022.12",
    role: "전처리 파이프라인 설계 및 개발",
    longDescription: "위성 영상 수집부터 보정까지의 전처리 과정을 자동화하는 파이프라인을 구축했습니다. 영상별로 전처리가 달라 수동 처리가 필요했고, Salt 기반 폴링 구조에서 격리성이 보장되지 않아 정상 데이터도 실패하는 문제가 있었으며, 실행 중 장애 발생 시 복구 시스템이 미비했습니다.",
    details: [],
    roleDetails: [
      {
        role: "이벤트 드리븐 파이프라인 구축",
        items: [
          "폴더 감시 방식을 이벤트 드리븐 파이프라인으로 전환 — 완료 즉시 다음 큐 실행, 대기 시간 제거",
          "ack/nack 기반 메시지 유실 방지 (RabbitMQ)",
          "Saga(Choreography) 패턴 적용 — 실패 시 보상 트랜잭션 자동 실행 및 작업 상태 추적으로 장애 시점 명확화, 보상 재시도 초과 시 DLQ로 격리하여 무한 루프 방지 및 수동 처리 가능하도록 구성",
        ],
      },
    ],
    achievements: [
      "장애 없는 데이터 실패율 0건 달성 — 실제 문제가 있는 데이터만 쌓이도록 개선",
      "장애 파악 시간 하루 → 한두 시간 이내로 감소",
      "메시지 큐 기반으로 처리량에 탄력적으로 확장 가능한 구조 설계",
    ],
  },
  {
    id: "test-cluster",
    title: "팀 내 개발 안정화를 위한 테스트 클러스터 분리",
    description: "K8s 기반 테스트 환경 구축으로 운영 서버 장애 대폭 감소, 서버 5대 → 2대",
    tags: ["Kubernetes", "Docker", "On-premise"],
    status: "deployed",
    type: "company",
    category: ["backend"],
    company: "한컴인스페이스",
    period: "2023.01 ~ 2023.06",
    role: "테스트 인프라 구축",
    longDescription: "테스트 서버가 없어 로컬 환경에서 테스트 후 운영 서버로 바로 배포하면서, 엔지니어마다 로컬 환경의 차이와 운영 서버와의 차이로 인해 운영 서버에서 이슈가 발생하는 문제를 해결했습니다. 하나의 서버에 하나의 서비스만 올리는 비효율도 함께 개선했습니다.",
    details: [],
    roleDetails: [
      {
        role: "테스트 환경 구축",
        items: [
          "운영 클러스터와 테스트 클러스터를 물리적으로 분리 — 테스트 클러스터에 MSA 전체를 동일하게 올려 운영 환경과 완전히 격리된 검증 환경 구축",
          "클러스터 분리로 테스트 워크로드가 운영 서비스에 영향을 주지 않으며, 서버 자원을 필요한 곳에만 할당하여 기존 서버 5대 → 2대로 효율화",
        ],
      },
    ],
    achievements: [
      "모든 엔지니어가 같은 환경에서 테스트함으로써 운영 환경 배포 후 장애 발생 대폭 감소",
      "서버 자원 효율화 — 서버 5대 → 2대로 감소",
    ],
  },
  {
    id: "drone-detection",
    title: "비전 AI 모델 서빙 시스템 개발",
    description: "실시간 객체 탐지 및 위성 영상 세그멘테이션 스트리밍 서비스",
    tags: ["ROS", "YOLOv5", "Faster R-CNN", "PyTorch", "C++", "OpenCV"],
    imageUrl: "/drone-detection_thum.png",
    status: "deployed",
    type: "company",
    category: ["ai"],
    company: "한컴인스페이스",
    period: "2021.12 ~ 2023.12",
    role: "객체 탐지 모델 학습 및 스트리밍 시스템 개발",
    longDescription: "드론 탑재 환경에서 실시간 객체 탐지 및 위성 영상 세그멘테이션 스트리밍 시스템을 개발했습니다. YOLOv5 추론 시 소켓으로 프레임을 전달하는 구조에서 프레임 수신 속도가 추론 속도를 초과하며 큐가 누적되어 메모리가 고갈되는 문제가 있었습니다. 소켓 통신 레이어를 제거하고 LibTorch로 C++에서 모델을 직접 로드하여 해결했습니다.",
    details: [],
    roleDetails: [
      {
        role: "Faster R-CNN 기반 객체 탐지 (ROS 연동)",
        items: [
          "ResNet-FPN 기반 6종 객체 분류 추론",
          "RGB-Depth 동기화로 실시간 스트리밍 안정화",
          "UDP 소켓 기반 영상 스트리밍",
        ],
      },
      {
        role: "YOLOv5 기반 객체 탐지 (RTMP 송출)",
        items: [
          "커스텀 데이터셋 모델 학습 및 가중치 추출",
          "소켓으로 프레임 전달 시 수신 속도 > 추론 속도로 큐 누적 → 메모리 고갈 문제 발생 — 소켓 통신 제거 후 LibTorch로 C++에서 모델 직접 로드하여 해결",
          "TCP 소켓 + OpenCV 기반 실시간 추론 및 스트리밍",
        ],
      },
    ],
    achievements: [
      "드론 탑재 환경에서 실시간 객체 탐지 스트리밍 구현",
      "C++ 네이티브 적용으로 메모리 최적화 및 안정성 확보",
    ],
    resources: [
      { label: "서비스 소개", url: "https://www.inspace.co.kr/dronesat", type: "link" },
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
