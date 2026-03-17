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
  category: "fullstack" | "backend" | "frontend" | "ai";
  company?: string;
  period: string;
  role: string;
  longDescription?: string;
  details: string[];
  roleDetails?: { role: string; items: string[] }[];
  achievements: string[];
  resources?: ProjectResource[];
  hidden?: boolean;
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
    category: "frontend",
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
    id: "booksight",
    title: "Booksight",
    description: "오늘 출간된 책들을 생일처럼 축하하는 서비스",
    tags: ["Kotlin", "Spring Boot", "Spring Batch", "QueryDSL", "Redis", "Oracle", "MySQL", "JdbcTemplate"],
    imageUrl: "/booksight_thum.png",
    link: "https://book-web-frontend-one.vercel.app/",
    status: "deployed",
    type: "team",
    category: "backend",
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
    category: "fullstack",
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
    category: "backend",
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
    category: "fullstack",
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
    category: "backend",
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
    id: "satellite-platform",
    title: "위성 영상 분석 플랫폼 고도화",
    description: "MSA & 이벤트 드리븐 전환으로 재배포 월 10건 → 1건, 배포 속도 4분 → 30초 달성",
    tags: ["Spring Boot", "FastAPI", "K8s", "RabbitMQ", "PyTorch", "Next.js", "Storybook"],
    imageUrl: "/gis-platform_thum.png",
    status: "deployed",
    type: "company",
    category: "fullstack",
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
          "기능별 플로우 차트 정리 및 테스트 로직 추가, 커밋 시 자동 테스트되도록 CI/CD 작성",
          "분산 ID 생성기 직접 구현 (Snowflake 알고리즘) — 동시 요청 시 ID 중복 방지 및 발생 서버 추적",
          "9개 MSA 서비스 분리 및 서비스별 레플리카 10개 이상 운영",
          "Gateway를 통한 인증·로깅·도메인별 서비스 조합 구조화",
        ],
      },
      {
        role: "AI 모델 서빙 시스템",
        items: [
          "PyTorch 기반 모델 서빙 (SwinTransformer, ConvNeXt)",
          "객체탐지(RINO, YOLO26), 영역분할(UPerNet), 변화탐지(ChangeStar) 고도화",
        ],
      },
      {
        role: "프론트엔드 개선",
        items: [
          "Next.js FSD 아키텍처 리팩토링",
          "Storybook 통합 테스트 및 사내 프론트엔드 공통 라이브러리 운영",
        ],
      },
    ],
    achievements: [
      "오류 관련 고객 문의 대응 속도 1주 → 하루 내로 감소",
      "장애로 인한 재배포 건수 월 10건 → 1건 내외로 감소하여 운영 안정성 확보",
      "공통 모듈 업데이트 시 배포 대상 12개 → 1개, 배포 속도 4분 → 30초로 감소",
    ],
    resources: [
      { label: "서비스 소개", url: "https://www.inspace.co.kr/instation-platform", type: "link" },
    ],
  },
  {
    id: "admin-page",
    title: "어드민 페이지 고도화",
    description: "Redis 역인덱스 및 N+1 제거, Spring Cloud Gateway 도입으로 인증 시스템 일원화",
    tags: ["Spring Boot", "Spring Cloud Gateway", "Redis", "PostgreSQL", "JWT"],
    status: "deployed",
    type: "company",
    category: "backend",
    company: "한컴인스페이스",
    period: "2024.04 ~ 2024.12",
    role: "인증·권한 시스템 설계 및 개발",
    longDescription: "사용자 로그인 정보 조회 시 응답 속도 저하와, 특정 사용자의 권한 수정이 일부 서비스에 반영되지 않는 문제를 해결했습니다. Redis에 저장된 전체 세션을 풀스캔해야 하는 구조와, 재귀적 트리 구조 메뉴에서 N+1 쿼리가 원인이었습니다.",
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
      "역인덱스 기반 세션 조회 및 N+1 제거로 응답 속도 개선 및 권한 변경 실시간 반영 보장",
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
    category: "backend",
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
          "Nginx Ingress 설정으로 로드밸런싱 및 세션 유지 적용",
          "세션 연결이 유지된 채 애플리케이션 단에서 로드밸런싱 — Replica 수를 개발자가 신경 쓰지 않아도 되는 확장성 확보",
          "GDAL 기반 GeoTIFF → PNG/Vector Tile 변환 파이프라인",
          "MBTiles 벡터 타일링으로 줌 레벨/좌표 기반 폴리곤 선별 렌더링",
        ],
      },
    ],
    achievements: [
      "WMTS 도입과 이미지 캐싱으로 API 응답 속도 4초 → 0.5초 미만으로 감소",
      "서비스 간 세션 경쟁 제거로 안정성 확보 및 락 제거",
      "캐시 미스 시 응답 지연 방지를 위한 사전 생성 범위 선정이 운영상 핵심 요소임을 파악",
    ],
  },
  {
    id: "pipeline",
    title: "영상 전처리 파이프라인 자동화",
    description: "폴더 감시 → 이벤트 드리븐 전환으로 장애 파악 시간 하루 → 2시간 이내로 감소",
    tags: ["RabbitMQ", "Python", "Saga Pattern", "Docker"],
    status: "deployed",
    type: "company",
    category: "backend",
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
          "Saga(Choreography) 패턴 적용 — 실패 시 자동 재처리 및 작업 상태 추적으로 장애 시점 명확화",
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
    category: "backend",
    company: "한컴인스페이스",
    period: "2023.01 ~ 2023.06",
    role: "테스트 인프라 구축",
    longDescription: "테스트 서버가 없어 로컬 환경에서 테스트 후 운영 서버로 바로 배포하면서, 엔지니어마다 로컬 환경의 차이와 운영 서버와의 차이로 인해 운영 서버에서 이슈가 발생하는 문제를 해결했습니다. 하나의 서버에 하나의 서비스만 올리는 비효율도 함께 개선했습니다.",
    details: [],
    roleDetails: [
      {
        role: "테스트 환경 구축",
        items: [
          "쿠버네티스 클러스터를 활용하여 논리적으로 분리, 사내 온프레미스 서버에 운영과 동일한 테스트 환경 구축",
          "동시에 여러 프로젝트를 운영할 수 있도록 구축하여 서버 자원을 필요한 곳에만 할당",
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
    category: "ai",
    company: "한컴인스페이스",
    period: "2021.12 ~ 2023.12",
    role: "객체 탐지 모델 학습 및 스트리밍 시스템 개발",
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
          "PyTorch 모델 → C++ 직접 적용으로 메모리 이슈 해결",
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
