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
      "3D 분해/조립 시뮬레이션과 SSE 스트리밍 AI 어시스턴트를 결합한 기계공학 학습 웹 서비스",
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
      "2D 교재만으로는 기계 구조 이해가 어렵다는 교육 한계를 3D 인터랙티브 시뮬레이션으로 해결 — 드론·V4 엔진 등 7가지 기계 장치 분해·조립 학습 콘텐츠 구현",
      "부품이 같은 방향으로 분해되어 겹치는 시각적 충돌 문제를 피보나치 스피어 알고리즘으로 해결 — 모든 부품이 균일하게 퍼지는 자연스러운 분해 애니메이션 구현",
      "AI 응답 대기 중 학습 흐름이 끊기는 문제를 SSE 스트리밍으로 해결 — 응답이 생성되는 즉시 표시해 실시간 학습 몰입감 유지",
      "분산된 학습 도구 간 맥락 전환이 빈번한 문제를 단일 화면 통합 플로우로 해결 — Undo/Redo·퀴즈·메모·워크플로우·PDF 내보내기를 하나의 학습 흐름으로 통합",
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
    id: "pillcare",
    title: "PillCare",
    description: "복약·건강 기록을 한 흐름에 담고, AI가 오늘의 건강 위험을 분석해주는 모바일 헬스케어 앱",
    tags: ["Next.js", "TypeScript", "Tailwind CSS v4", "Zustand", "FastAPI", "PostgreSQL", "Redis", "OpenAI API"],
    imageUrl: "/pillcare_thum.png",
    link: "https://vercel.com/ahnyeongjuns-projects/mfds-2026-frontend-pill-ver",
    status: "live",
    type: "team",
    category: ["fullstack", "ai"],
    period: "2026.05",
    role: "프론트엔드 개발 · UI/UX 디자인 · 백엔드 일부",
    longDescription: "2026 식약처(MFDS) 공모전 출품작입니다. 복약·건강 기록을 하나의 흐름으로 묶고, AI가 복약 순응도·질환 추이·환경 데이터를 종합해 오늘의 건강 위험 지수를 산출해주는 모바일 헬스케어 앱입니다. 2인 팀으로 진행했으며, 프론트엔드 전담 및 UI/UX 디자인, 백엔드 일부를 담당했습니다.",
    details: [],
    roleDetails: [
      {
        role: "프론트엔드 (Next.js + Zustand)",
        items: [
          "Next.js 16 App Router 기반 전체 UI 설계 및 구현 — 랜딩·온보딩·홈 대시보드·건강 일지·분석·병원 예약·알림 10개 페이지",
          "Zustand 5개 스토어(medications, journals, appointments, health, user)로 전역 상태 관리 — persist 미들웨어로 세션 유지",
          "카카오·구글 OAuth 연동 및 JWT 토큰 관리",
          "Recharts 기반 건강 지수 추이·복약 달성률·증상 패턴 시각화 차트 구현",
        ],
      },
      {
        role: "UI/UX 디자인",
        items: [
          "헬스케어 도메인 특성에 맞춘 정보 계층 설계 — AI 건강 브리핑·오늘 복약·건강 습관 3단 구조의 홈 대시보드",
          "건강 위험 지수(0~100) 시각화 — 수치·색상·아이콘으로 위험도를 직관적으로 전달하는 UI 설계",
          "Tailwind CSS v4 기반 컴포넌트 디자인 시스템 구성",
        ],
      },
      {
        role: "백엔드 일부 (FastAPI)",
        items: [
          "건강 위험 지수 산출 로직 설계 및 구현 — 복약 순응도(25pts)·질환 추이(25pts)·DUR 안전성(20pts)·증상 추이(15pts)·환경지수(15pts) 5개 도메인 가중합",
          "기상청·에어코리아·식약처 DUR 외부 API 연동 — 실시간 환경 데이터를 건강 알림 트리거에 결합",
        ],
      },
    ],
    achievements: [
      "복약·증상·환경이 분산되어 건강 위험을 한눈에 파악하기 어렵던 문제를 5개 도메인 가중합 건강 위험 지수(Health Index)로 해결 — 복약 순응도·질환 추이·DUR 안전성·증상 추이·환경지수를 0~100 단일 점수로 통합",
      "기상청·에어코리아·식약처 DUR 3종 외부 API를 스케줄러로 주기 수집, 건강 알림 트리거에 환경 데이터 결합 — 고혈압 환자 + 기온 급변 등 컨텍스트 기반 알림 구현",
      "AI Hub ResNet 알약 이미지 분류 모델 추론 파이프라인 구성 — 사진 촬영으로 약품 코드 추론 후 식약처 DUR API 연동해 병용 금기까지 등록 시점에 표시, 낮은 신뢰도 시 직접 검색 유도 폴백 설계",
      "UI/UX 디자인부터 구현까지 전담 — 헬스케어 도메인에 맞는 3단 정보 계층 구조 설계 및 건강 위험도 직관적 시각화",
    ],
    resources: [
      { label: "배포", url: "https://vercel.com/ahnyeongjuns-projects/mfds-2026-frontend-pill-ver", type: "link" },
    ],
  },
  {
    id: "mapin",
    title: "Mapin",
    description: "URL 입력 시 AI가 콘텐츠 관점을 분석하고 반대 관점 콘텐츠를 자동 추천하는 개인 콘텐츠 관리 서비스",
    tags: ["Spring Boot 4.0", "Java 21", "PostgreSQL", "OpenAI", "YouTube API", "Virtual Threads", "CompletableFuture"],
    imageUrl: "/swyp-app4_thum.png",
    link: "https://dashboard-phi-one-35.vercel.app/login",
    status: "live",
    backendActive: true,
    type: "personal",
    category: ["backend", "ai"],
    period: "2026.03 ~ 2026.04",
    role: "백엔드 개발 (단독)",
    longDescription: "스위프(SWYP) 앱개발 4기에서 진행한 프로젝트입니다. 유튜브·뉴스를 소비할 때 비슷한 관점의 콘텐츠만 반복 노출되는 필터버블 문제를 해결하고자 기획했습니다. URL을 저장하면 AI가 콘텐츠 관점을 자동 분석하고 반대 시각의 콘텐츠를 추천해주는 개인 콘텐츠 관리 서비스입니다. iOS 앱과 웹 대시보드로 동시 배포되었으며, 백엔드를 단독으로 설계·개발했습니다.",
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
      "동일 콘텐츠 재분석마다 GPT API 비용이 반복 발생하는 문제를 3단계 캐싱 전략(L1 결과 캐시·L2 분석 이력·L3 키워드 풀)으로 해결 — 재요청 시 API 호출 0회 달성",
      "반대관점 후보 N개를 개별 스코어링하는 방식의 토큰 낭비를 배치 스코어링으로 개선 — GPT 1회 호출로 전체 후보 처리",
      "URL당 Virtual Thread 할당 + CompletableFuture 병렬 처리로 YouTube·Naver 검색 동시 실행, 30초 글로벌 타임아웃으로 파이프라인 보호 — Spring Boot 4.0 (Spring Framework 7) 기반 구현",
      "E2E 포함 13개 테스트 파일 작성 — UserJourneyE2ETest로 핵심 분석 파이프라인 전 흐름 검증",
      "iOS App Store + 웹 대시보드 동시 배포 — 앱 심사 통과로 양 플랫폼 실사용자 확보",
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
    tags: ["Spring Boot", "Java 21", "MySQL", "JPA", "QueryDSL", "JWT", "OAuth", "Spring Event", "JUnit5", "Mockito"],
    imageUrl: "/deadline-mate_thum.png",
    link: "https://completionisland.vercel.app/main",
    status: "live",
    backendActive: true,
    type: "team",
    category: ["backend"],
    period: "2026.03 ~ 2026.04",
    role: "백엔드 개발",
    longDescription: "FESI 13기에서 진행한 팀 프로젝트입니다. 스터디나 프로젝트 모임을 개설하고 팀원들과 주간 Todo를 공유하며 달성률을 함께 관리하는 서비스입니다. 11개 도메인을 설계했으며, 모임 검색·신청·알림·평판까지 전체 백엔드 흐름을 담당했습니다.",
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
      {
        role: "테스트 & CI",
        items: [
          "51개 테스트 파일 — Controller(단위)·Service(Mockito BDD)·Repository(@DataJpaTest/H2)·E2E(@SpringBootTest) 3-layer 피라미드 구조로 전 도메인 커버",
          "@Nested + @DisplayName 한글 계층 구조로 테스트 의도 명확화, ArgumentCaptor·BDDMockito.given/then 패턴으로 이벤트 발행·상태 변이 검증",
          "GitHub Actions CI — PR → main/dev 머지 전 자동 테스트 실행, H2 테스트 프로파일 분리로 외부 DB 의존성 없는 빌드 환경 구성",
        ],
      },
    ],
    achievements: [
      "전 도메인 51개 테스트 파일 작성 — 단위·통합·E2E 3-layer 구조 + GitHub Actions CI로 PR마다 자동 검증",
      "모임 목록 조회 시 태그·이미지·리더를 건별 조회해 N+1이 발생하던 문제를 IN 쿼리 일괄 처리로 해결 — 4개 테이블 각 1회 쿼리로 최적화",
      "알림 실패가 모임 데이터에 영향을 주는 강결합 구조를 @TransactionalEventListener 이벤트 분리로 해결 — 평가 서비스 장애 시에도 모임 데이터 유실 없는 fault tolerance 확보",
      "동시 신청 시 maxMembers 초과 가능성을 PESSIMISTIC_WRITE + Batch UPDATE로 해결 — 경쟁 조건 없는 원자적 증감 처리",
    ],
    resources: [
      { label: "서비스", url: "https://completionisland.vercel.app/main", type: "link" },
      { label: "GitHub", url: "https://github.com/FESI13-3/FESI13-backend", type: "link" },
    ],
  },
  {
    id: "concert-reservation",
    title: "동시성 제어 · 이벤트 드리븐 콘서트 예약 시스템 개발",
    description: "항해99 백엔드코스 — 동시성·이벤트 드리븐·부하 테스트까지 백엔드 핵심 문제를 단계적으로 해결한 프로젝트",
    tags: ["Spring Boot", "Java", "MySQL", "Redis", "Kafka", "k6", "InfluxDB", "Grafana", "JUnit5"],
    status: "deployed",
    type: "personal",
    category: ["backend"],
    period: "2025.07 ~ 2025.09",
    role: "백엔드 개발 (항해99 9기)",
    longDescription: "항해99 백엔드코스 9기에서 진행한 콘서트 예약 시스템입니다. 설계부터 시작해 동시성 제어, 캐싱, 이벤트 드리븐 아키텍처, Kafka 마이그레이션, 부하 테스트까지 10주에 걸쳐 단계적으로 완성했습니다. 상위 10% 수료.",
    details: [],
    roleDetails: [
      {
        role: "동시성 제어",
        items: [
          "좌석 중복 예약 방지를 위해 DB 비관적 락 → Redis 분산락(simple·spin·pub-sub) → 낙관적 락 순으로 전환하며 각 방식의 트레이드오프 직접 검증",
          "k6 + InfluxDB + Grafana로 부하 테스트 수행 — 분산락 재시도 로직이 처리 지연의 주 원인임을 병목으로 특정, 낙관적 락으로 전환해 해결",
        ],
      },
      {
        role: "이벤트 드리븐 & Kafka",
        items: [
          "@TransactionalEventListener(AFTER_COMMIT)으로 예약·결제 이벤트 트랜잭션 경계 밖에서 발행 — 코어 트랜잭션 실패 시 외부 호출 방지",
          "Redis 대기열을 Kafka 토픽으로 전환 — 예약·결제 이벤트를 별도 토픽으로 분리, Redis는 활성 토큰 관리에만 한정",
          "Choreography Saga 패턴 + Redis DLQ로 분산 트랜잭션 실패 시 보상 이벤트 처리",
        ],
      },
      {
        role: "성능 최적화",
        items: [
          "EXPLAIN 기반 슬로우 쿼리 분석 — 카디널리티·사용 패턴 고려한 인덱스 전략 수립으로 쿼리 성능 개선",
          "Redis Sorted Set 기반 실시간 콘서트 랭킹 — 최근 1시간 예약 건수를 스케줄러로 집계, 조회 시 O(log N) 처리",
        ],
      },
    ],
    achievements: [
      "항해99 백엔드코스 9기 상위 10% 수료 — TDD, 이벤트 드리븐 설계, k6 부하 테스트를 실전 프로젝트로 검증",
      "분산락 재시도 로직이 응답 지연의 원인임을 k6+Grafana 부하 테스트로 특정 — 낙관적 락 전환으로 병목 제거",
      "Redis 대기열을 Kafka로 마이그레이션하고 Choreography Saga + DLQ 패턴으로 분산 트랜잭션 일관성 확보",
      "EXPLAIN 기반 인덱스 설계, Redis 캐싱, 비관적·낙관적·분산락 비교 검증까지 백엔드 핵심 문제를 단계적으로 직접 해결",
    ],
    resources: [
      { label: "GitHub", url: "https://github.com/hanghae99-backend/2-SERVICE", type: "link" },
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
    longDescription: "매일 수많은 책들이 세상에 태어나고, 그중엔 잊혀지기엔 너무나 특별한 이야기들이 담겨 있습니다. 오늘 처음 세상에 나온 책들을 생일처럼 축하하고, 그 특별한 순간을 함께 나누는 서비스입니다. 6명(프론트엔드 2, 백엔드 2, 디자이너, PM)이 함께 진행했습니다. 국립중앙도서관 API 기반 자동 수집 파이프라인과 12만 건 초기 데이터 안정 적재가 핵심 구현 과제였습니다.",
    details: [],
    roleDetails: [
      {
        role: "백엔드",
        items: [
          "QueryDSL 기반 동적 검색 쿼리 구현 — 제목·저자·출판사 통합 검색, 동적 정렬",
          "Spring Batch — 국립중앙도서관 API Reader → 카카오 API Processor → DB Writer 파이프라인",
          "external 패키지: CSV → 카카오 API 보강 → JdbcTemplate 배치 적재 파이프라인 (12만 건 초기 데이터 적재)",
          "AOP + Spring Event 기반 검색 로그 수집 및 2차 배치 연동",
          "MySQL + Oracle 듀얼 DB 구성 — 신간 수집·검색 이력 저장에 MySQL, 외부 데이터 소스 연동에 Oracle",
        ],
      },
    ],
    achievements: [
      "12만 건 초기 데이터 적재 시 코루틴·JPA 방식이 OOM으로 실패하는 문제를 JdbcTemplate 배치 INSERT로 전환하여 해결 — 전체 데이터 안정 적재 완료",
      "매일 신간 수집이 중복 실행될 경우 데이터 정합성이 깨지는 문제를 Spring Batch + JobExplorer 중복 실행 방지로 해결 — 국립중앙도서관 API 자동 수집 파이프라인 구축",
      "검색 로그 수집 로직이 비즈니스 코드에 침투해 가독성을 해치는 문제를 AOP + Spring Event로 해결 — 미수집 도서 자동 보강 2차 배치와 비침투 연동",
      "외부 API·CSV 파이프라인이 비즈니스 로직과 혼재되어 유지보수가 어렵던 문제를 external 패키지 분리로 해결 — 외부 연동 변경 시 비즈니스 코드 무영향",
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
        role: "프론트엔드 (Next.js 15 + Zustand + Storybook)",
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
      "처음 접하는 Next.js·Zustand·Storybook으로 프론트엔드를 독립 설계 — 기술 학습과 실서비스 출시를 동시에 달성",
      "Tour API와 AI를 직접 연결하면 외부 API 오류가 AI 응답에 영향을 미치는 결합 문제를 MCP 아키텍처로 해결 — OpenAI Agent가 Tour API를 도구로 호출하는 구조로 책임 분리",
      "컴포넌트를 매번 페이지에서 직접 검증해야 하는 비효율을 Storybook으로 해결 — 컴포넌트·페이지 스토리 기반 독립 검증 체계 구축",
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
          "Spring Batch로 Tour API 축제 데이터 정기 수집 파이프라인 구성 — 수 시간 주기 자동 갱신",
          "QueryDSL BooleanBuilder로 지역·테마·날짜·좌표 조건 동적 필터링 — 목록·달력·지도 뷰 API 단일 쿼리 로직으로 통일",
          "달력 뷰 일별 집계, 지도 뷰 좌표 기반 조회 API 각각 구현",
          "JWT + 카카오 OAuth 인증, 북마크·활동 로그 도메인 설계",
        ],
      },
    ],
    achievements: [
      "축제 정보를 수동 입력하면 최신성 유지가 어려운 문제를 Spring Batch 자동 수집 파이프라인으로 해결 — Tour API에서 수천 건 축제 데이터 수 시간 주기 자동 갱신",
      "지역·테마·날짜·좌표 조건이 복합 적용될 때 쿼리를 동적으로 구성하기 어렵던 문제를 QueryDSL BooleanBuilder로 해결 — 목록·달력·지도 뷰별 API를 단일 동적 쿼리 로직으로 처리",
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
      "기획부터 배포까지 6주의 짧은 일정에서 PM·프론트엔드·AI 추천·서버 관리를 동시에 담당해 MVP 출시 달성",
      "체형·스타일 조합 540가지마다 GPT-4 API가 반복 호출되는 비용 문제를 SHA256 해시 키 MySQL 캐싱으로 해결 — 동일 조합 재요청 시 API 호출 0회",
      "프론트엔드에서 백엔드 직접 호출 시 CORS와 인증 헤더 중복 관리 문제가 발생하던 구조를 Next.js API Route 프록시로 해결 — 인증 헤더 중앙화 및 보안 강화",
      "조건이 까다로울수록 웨딩홀 추천 결과가 0건이 되는 문제를 조건 완화 폴백 전략으로 해결 — 항상 결과를 반환하는 추천 경험 구현",
    ],
    resources: [
      { label: "GitHub", url: "https://github.com/swyp11", type: "link" },
      { label: "IA 설계", url: "/with-ing_ia.html", type: "html" },
      { label: "디자인 & 와이어프레임", url: "/with-ing_design.png", type: "image" },
    ],
  },
  {
    id: "nipa-satellite",
    title: "NIPA RabbitMQ 기반 변화탐지 AI 처리 플랫폼",
    description: "두 시점의 위성 영상을 비교해 지표 변화를 AI로 탐지하는 변화탐지 플랫폼. NIPA(정보통신산업진흥원) 지원 사업.",
    tags: ["RabbitMQ", "Next.js", "TypeScript", "CesiumJS", "PyTorch", "FastAPI", "Kubernetes"],
    imageUrl: "/gis-platform_thum.png",
    status: "deployed",
    type: "company",
    category: ["backend", "ai"],
    company: "한컴인스페이스",
    period: "2025.07 ~ 진행중",
    role: "백엔드 엔지니어",
    longDescription: "두 시점의 위성 영상을 비교해 지표 변화를 AI로 탐지하는 플랫폼. NIPA(정보통신산업진흥원) 지원 사업. 9개 MSA + FastAPI 기반으로 재설계했으며, RabbitMQ 비동기 파이프라인과 Next.js 15 FSD 프론트엔드를 처음 도입했습니다.",
    details: [],
    roleDetails: [],
    achievements: [
      "[작업 유실] Salt 폴링 ack/nack 없어 노드 재시작 시 작업 RUNNING 고착 → RabbitMQ ack/nack + DLQ 비동기 파이프라인 전환 — 작업 유실 0건",
      "[배포 효율] 모놀리식으로 기능 하나 배포 시 전체 재시작 → 9개 MSA 분리, 전 서비스 FastAPI 전환, Nginx 라우팅 — 재배포 월 10건→1건, 배포 속도 4분→30초",
      "[폐쇄망 분산 ID] 분리망 환경에서 외부 코디네이터 접근 불가, UUID로는 발생 서버 추적 불가 → Snowflake 알고리즘 직접 구현, worker ID에 망 정보 인코딩",
      "[프론트 유지보수] Thymeleaf 레거시에 기능 경계 없어 수정 영향 범위 예측 불가 → Next.js 15 + FSD 전면 마이그레이션, CesiumJS 커스텀 ImageryProvider — MVT·MBTiles·ImageLayer 이종 레이어 단일 인터페이스 추상화",
    ],
    resources: [],
  },
  {
    id: "team-mcp-agent",
    title: "Git · 캘린더 · HRWeb 통합 MCP 에이전트 개발",
    description: "FastMCP 기반 Gmail·캘린더·Git·HRWeb 통합 자동화 에이전트 — 팀 10명 실사용 중",
    tags: ["Python", "FastMCP", "MCP", "Playwright", "Gmail API", "Google Calendar API"],
    status: "deployed",
    type: "company",
    company: "한컴인스페이스",
    category: ["backend", "ai"],
    period: "2026.03 ~ 2026.04",
    role: "설계 및 개발",
    longDescription: "주간보고 작성, 일정 관리, 사내 HRWeb 입력 등 반복 업무를 자동화하기 위해 개인적으로 개발하여 팀 전체(10명)에 공유한 MCP 기반 에이전트입니다. FastMCP로 8개 도구를 구현하고 Cursor·Claude Desktop에서 바로 호출할 수 있도록 연동했습니다.",
    details: [],
    roleDetails: [
      {
        role: "MCP 에이전트 설계 및 개발",
        items: [
          "FastMCP 기반 8개 도구 구현 — list_commits·get_trips·create_calendar_event·generate_report·send_report·upload_hrweb 등, Cursor·Claude Desktop에서 호출 가능",
          "Git subprocess로 리포별 커밋 로그 수집 → 폴더 단위 그룹핑, Google Calendar OAuth로 출장 일정 조회 → 두 소스를 병합해 주간보고 초안 자동 생성 후 Gmail SMTP로 발송",
          "엑셀 템플릿을 ZIP 내 XML 레벨로 직접 조작 — 서식·수식 100% 보존하면서 C열 카테고리 자동 감지 후 D/H 셀에 내용 주입",
          "사내 HRWeb(아마란스) Playwright 자동화 — 로그인 → 월 선택 → 날짜·프로젝트·공수 입력까지 전 흐름 브라우저 자동화, Git 커밋이 없는 날은 주변 커밋 패턴으로 description 추론",
        ],
      },
    ],
    achievements: [
      "반복 수작업으로 30분~1시간이 소요되던 주간보고 작성과 HRWeb 공수 입력 업무를 FastMCP 에이전트로 전 과정 자동화 — Git 커밋+캘린더 병합 → 엑셀 생성 → Gmail 발송까지 단일 명령으로 처리",
      "개인 도구에 그치지 않고 Claude Desktop·Cursor에서 바로 호출 가능하도록 배포해 팀 10명 전원이 실사용하는 도구로 공유",
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
    id: "satellite-data",
    hidden: true,
    title: "위성 영상 AI 모델 개발 및 수집 파이프라인 구축",
    description: "ML 모델 학습·추론 서비스 배포, 10+ 위성 소스 수집 파이프라인 통합, GPU 1장에서 70파드 병렬 운영",
    tags: ["PyTorch", "ONNX Runtime", "FastAPI", "CUDA", "YOLOv26", "Python", "Salt-Stack", "GDAL", "SFTP", "Kubernetes", "Aliyun GPUShare"],
    status: "deployed",
    type: "company",
    category: ["backend", "ai"],
    company: "한컴인스페이스",
    period: "2024.10 ~ 진행중",
    role: "ML 모델 개발 · 인프라 구축 및 ETL 작성",
    longDescription: "",
    details: [],
    roleDetails: [
      {
        role: "모델 학습 및 서비스 개발",
        items: [
          "ConvNeXt+UPerNet 기반 6클래스 토지피복 세그멘테이션 — ImageNet-22k pretrained 전이학습, 위성 도메인 fine-tuning, mIoU ~70%",
          "YOLOv26 기반 객체탐지(20클래스), RINO·ChangeStar 변화탐지 모델 구성",
          "J_ECD(형태학적 변화탐지): 3×3 kernel 필터링 + 그림자 제거 → Shapefile 출력, COG 변환 + gdalwarp 멀티스레드 + EPSG:5179 재투영",
          "J_MCD(딥러닝 변화탐지): MambaCD 파인튜닝 — MINIMA 특징 정합 + ECDF 히스토그램 매칭으로 다시기 영상 간 방사 보정",
        ],
      },
      {
        role: "ML 추론 서비스 3종 개발",
        items: [
          "object-detection: YOLOv26 OBB/HBB 듀얼모델 — 20클래스(선박·항공기·차량·교량 등), SMALL_CLASSES(4~7, 17)는 HBB, 나머지는 OBB로 객체 크기 기반 자동 라우팅, letterbox 1024px 전처리, mAP ~70%",
          "segmentation: UPerNet+ConvNeXt 백본 — 6클래스 토지피복(산림/수계/건물/도로/초지/나지), ONNX Runtime CUDAExecutionProvider 직접 세션 구성",
          "inferencer: Super-Resolution 모델 — rasterio로 GeoTIFF 직접 처리, 512×512 패딩, 픽셀값 [0,1] 정규화 후 (C,H,W) transpose",
          "FastAPI 엔드포인트 설계 — POST /inference(자동 라우팅), /inference/obb, /inference/hbb, /inference/path(K8s 공유볼륨 경로 기반), CLASS_ALIAS 매핑 응답 표준화",
        ],
      },
      {
        role: "GPU 메모리 분할 운영",
        items: [
          "Aliyun GPUShare 스케줄러 익스텐더 직접 구성 — `aliyun.com/gpu-mem` 리소스 단위로 파드별 GPU 메모리 할당",
          "gprocessor 30파드 × 1GiB + inferencer 40파드 × 1GiB 동시 운영 — 물리 GPU 1장에서 70파드 병렬 점유",
          "GPU 노드 node selector 분리로 추론 워크로드와 일반 워크로드 격리",
        ],
      },
      {
        role: "janus 수집 워크플로우 엔진",
        items: [
          "Salt-Stack 기반 분산 워크플로우 엔진(janus) 구축 — H_BASE(수집 기반)/S_BASE(소스 기반) 추상 클래스로 수집기 인터페이스 표준화",
          "다누리(KPLO)·창천위성·Sentinel·Landsat·Planet·MODIS 등 10+ 소스를 동일 파이프라인 구조로 통합 — geocode(Nominatim 리버스 지오코딩), inharv(다중 소스 수확 스케줄러) 포함",
          "신규 위성 소스 추가 시 H_BASE/S_BASE 상속 클래스 1개만 구현 — 기존 파이프라인 코드 수정 없이 자동 통합",
        ],
      },
      {
        role: "망연계 relay 및 알림",
        items: [
          "SFTP 기반 망연계 relay 직접 구현 — 외부망↔폐쇄망 간 파일 기반 데이터 중계, 네트워크 분리 환경에서 단방향 파일 전달",
          "이메일 알림 5종 직접 구현(분석완료·시스템에러·보안다운로드 등) — 보안다운로드는 서약서 PDF + 이력 CSV ZIP 첨부, KARI 납품 환경 대응",
        ],
      },
    ],
    achievements: [
      "K8s GPU 카운트 단위 할당으로 1파드=1GPU가 강제되던 구조를 Aliyun GPUShare 메모리 단위 분할로 해결 — 물리 GPU 1장에서 70파드 병렬 추론 운영",
      "단일 모델 고정으로 동시 추론이 불가하던 구조를 FastAPI + ONNX Runtime 추론 서비스 3종 독립 배포로 전환 — object-detection·segmentation·inferencer 각각 독립 스케일링",
      "소스별 하드코딩으로 신규 위성 추가 시 파이프라인 전체 수정이 필요하던 구조를 H_BASE/S_BASE 추상 클래스 표준화로 해결 — 신규 소스 추가 시 클래스 1개만 구현, 기존 코드 수정 0건",
      "외부망↔폐쇄망 단절 환경에서 SFTP 기반 relay 직접 구현 — 파일 기반 단방향 중계로 망간 데이터 동기화",
    ],
  },
  {
    id: "platform-optimization",
    hidden: true,
    title: "인증 시스템 최적화 · Go 영상 타일링 API",
    description: "Redis 역인덱스 O(N)→O(1), WMS→WMTS 전환으로 영상 API 응답 4초→0.5초 미만 달성",
    tags: ["Java", "Spring Boot", "Go", "Redis", "GDAL", "Spring Cloud Gateway", "PostgreSQL", "Nginx", "K8s"],
    status: "deployed",
    type: "company",
    category: ["backend"],
    company: "한컴인스페이스",
    period: "2024.04 ~ 2025.03",
    role: "인증 시스템·영상 API 성능 개선",
    longDescription: "어드민 인증 시스템과 영상 타일링 API 두 영역의 성능 병목을 해결했습니다. Redis 전체 세션 풀스캔 구조와 재귀 트리 권한 N+1 쿼리로 인증 응답이 저하되는 문제, WMS 방식의 바운더리 합성으로 영상 수가 늘수록 API 응답이 선형 증가하는 문제를 각각 근본 원인부터 해결했습니다.",
    details: [],
    roleDetails: [
      {
        role: "어드민 인증 시스템 최적화",
        items: [
          "Redis 역인덱스 구축으로 풀스캔 제거 — userId → sessionId 목록 구조로 저장하여 권한 변경 시 해당 유저의 세션만 즉시 조회 및 갱신",
          "Spring Cloud Gateway 도입으로 인증·라우팅·로깅 공통 처리 일원화",
        ],
      },
      {
        role: "영상 타일링 API 성능 개선 (Go + GDAL)",
        items: [
          "WMS는 요청마다 해당 바운더리의 영상을 동적으로 겹쳐 합성하므로 영상 수가 늘수록 응답 시간이 선형 증가 — WMTS로 전환해 z/x/y 좌표를 캐시 키로 고정, 합성 결과를 Redis에 저장하여 동일 타일 재요청 시 합성 연산 완전 스킵",
          "Go 고루틴으로 타일 생성 단계를 병렬화 — 요청된 좌표 범위의 타일들을 동시에 생성 후 Redis에 적재, 이후 요청은 Redis hit 즉시 반환",
          "Nginx Ingress upstream keepalive로 Pod 커넥션 풀 관리 — 매 요청마다 TCP 핸드셰이크가 반복되던 오버헤드 제거",
          "GDAL 기반 GeoTIFF → PNG/Vector Tile 변환 파이프라인, MBTiles 벡터 타일링으로 줌 레벨·타일 좌표 기반 폴리곤 선별 렌더링",
        ],
      },
    ],
    achievements: [
      "어드민 역할 단위 권한 일괄 변경 시 멀티 디바이스 일반 유저 전체 세션을 풀스캔하던 구조를 userId→sessionId Set 역인덱스로 전환 — 대상 유저 세션만 즉시 조회·무효화, O(N)→O(1)",
      "영상 수가 늘수록 WMS 방식의 바운더리 합성 응답 시간이 선형 증가하던 문제를 WMTS + Redis 타일 캐싱으로 해결 — API 응답 4초→0.5초 미만 달성",
      "서비스별로 분산 관리되던 인증·라우팅·로깅 코드를 Spring Cloud Gateway로 일원화 — 각 서비스별 세션 관리 불필요",
    ],
  },
  {
    id: "kari-satellite",
    title: "항공우주연구원 위성영상 AI 처리 플랫폼 구축",
    description: "10개 이상 위성 소스를 수집·처리해 AI 추론 결과를 CesiumJS로 가시화하는 위성영상 AI 처리 플랫폼. 한국항공우주연구원 납품.",
    tags: ["Spring Boot", "Go", "PyTorch", "FastAPI", "ONNX Runtime", "Kubernetes", "Aliyun GPUShare", "MyBatis", "Redis", "Salt-Stack"],
    imageUrl: "/kari_intro.png",
    status: "deployed",
    type: "company",
    category: ["backend", "ai"],
    company: "한컴인스페이스",
    period: "2023.10 ~ 2025.07",
    role: "백엔드 엔지니어",
    longDescription: "다누리·Sentinel·Landsat 등 10개 이상 위성 소스를 수집·처리해 객체탐지·세그멘테이션·초해상도 AI 추론 결과를 CesiumJS 뷰어로 가시화하는 플랫폼. 한국항공우주연구원 납품. Outbox 패턴 라이브러리, Aliyun GPUShare, janus 워크플로우 엔진을 이 프로젝트에서 설계·구현했습니다.",
    details: [],
    roleDetails: [],
    achievements: [
      "[이벤트 유실] Debezium replication slot 반복 파손으로 전체 스냅샷 재수행 → AOP + MyBatis Outbox 라이브러리 직접 개발 — CDC 인프라 의존 제거, 이벤트 유실 0건",
      "[GPU 활용] 1파드=1GPU 강제로 자원 90% 유휴 → Aliyun GPUShare aliyun.com/gpu-mem 단위 분할 — GPU 1장에서 70파드 병렬 추론",
      "[추론 파이프라인] 모델 1개 고정으로 동시 추론 불가 → FastAPI + ONNX Runtime 추론 서비스 3종 독립 배포, 객체 크기 기반 OBB/HBB 자동 라우팅",
      "[위성 소스 통합] 소스별 하드코딩으로 신규 위성 추가 시 파이프라인 전체 수정 → janus H_BASE/S_BASE 추상화, 10+ 소스 단일 파이프라인 — 신규 소스 추가 코드 수정 0건",
      "[세션 풀스캔] 권한 변경 시 Redis 전체 세션 풀스캔 → userId→sessionId 역인덱스 구축 — O(N)→O(1)",
    ],
    resources: [
      { label: "서비스 소개", url: "https://www.inspace.co.kr/instation-platform", type: "link" },
      { label: "Outbox GitHub", url: "https://github.com/Ahnyeongjun/outbox_module", type: "link" },
      { label: "웹 화면", url: "/kari_web.png", type: "image" },
      { label: "플랫폼 소개", url: "/kari_intro.png", type: "image" },
    ],
  },
  {
    id: "test-cluster",
    hidden: true,
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
          "운영 클러스터와 테스트 클러스터를 물리적으로 분리 — ETL 로직·AI 모델·DB를 테스트 클러스터에 동일하게 구성하여 운영과 완전히 격리된 검증 환경 구축",
          "클러스터 분리로 테스트 워크로드가 운영 서비스에 영향을 주지 않으며, K8s Pod 배치로 서버 자원을 필요한 곳에만 할당하여 기존 서버 5대 → 2대로 효율화",
        ],
      },
    ],
    achievements: [
      "로컬과 운영 환경 차이로 테스트를 통과해도 운영 배포 후 장애가 반복되던 문제를 운영과 동일한 K8s 테스트 클러스터 구축으로 해결 — 환경 차이로 인한 배포 후 장애 대폭 감소",
      "서버 1대에 서비스 1개씩 운영하던 비효율을 K8s Pod 배치로 해결 — 서버 5대→2대로 자원 효율화",
    ],
  },
  {
    id: "satellite-platform",
    hidden: true,
    title: "위성 영상 플랫폼 아키텍처 전환 및 풀스택 개발",
    description: "MSA & 이벤트 드리븐 전환으로 재배포 월 10건 → 1건, 배포 속도 4분 → 30초 달성",
    tags: ["Spring Boot", "Go", "Redis", "K8s", "RabbitMQ", "Next.js", "TypeScript", "CesiumJS", "Spring AOP", "MyBatis"],
    imageUrl: "/gis-platform_thum.png",
    status: "deployed",
    type: "company",
    category: ["fullstack"],
    company: "한컴인스페이스",
    period: "2022.12 ~ 진행중",
    role: "아키텍처 재설계 및 풀스택 개발",
    longDescription: "",
    details: [],
    roleDetails: [
      {
        role: "MSA & 이벤트 드리븐 아키텍처 전환",
        items: [
          "모놀리식 서비스를 도메인 경계 기준 9개 MSA로 분리, Spring Cloud Gateway로 인증·로깅·라우팅 일원화 — 재배포 월 10건→1건, 배포 속도 4분→30초",
          "외부망·폐쇄망 간 DB 양방향 동기화 구현 — Debezium replication slot 반복 파손 문제를 직접 개발한 Outbox 패턴 라이브러리로 대체 (상세 내용: Outbox 패턴 라이브러리 섹션)",
          "기능별 플로우 차트 정리 및 테스트 로직 추가, 커밋 시 자동 테스트되도록 CI/CD 작성",
          "분산 ID 생성기 직접 구현 (Snowflake 알고리즘) — 폐쇄망·공개망이 분리된 환경에서 외부 코디네이터(ZooKeeper 등) 접근이 불가하여 기성 라이브러리 사용 불가, worker ID를 망별로 사전 할당하여 양쪽에서 충돌 없는 고유 ID 생성 및 파일 기반으로 전달된 로그에서 발생 서버 즉시 추적 가능",
        ],
      },
      {
        role: "프론트엔드 마이그레이션 & 아키텍처 설계",
        items: [
          "Thymeleaf 기반 레거시 프론트엔드를 Next.js 15 + FSD 아키텍처로 전면 재설계 — features 37개·entities 26개로 기능별 의존성 방향 명확화",
          "CesiumJS 커스텀 ImageryProvider 구현 — MVT·MBTiles·ImageLayer 등 이종 레이어 타입 단일 인터페이스 추상화, .tif 등 다양한 위성 영상 포맷 입력 지원",
        ],
      },
      {
        role: "CesiumJS 레이어 관리 라이브러리",
        items: [
          "MVT·MBTiles·ImageLayer·BaseMap 이종 레이어 타입을 단일 인터페이스로 추상화 — TypeScript 타입 정의로 레이어 조작 타입 안전성 보장, 신규 레이어 타입 추가 시 기존 코드 수정 0건",
          "CesiumJS ImageryLayer 런타임 재정렬 API 부재 문제 — 인덱스 기반 재정렬 로직 직접 구현, UI 드래그로 위성 영상·벡터 타일·베이스맵 레이어 순서 자유롭게 변경",
          "레이어 토글 시 삭제 대신 hide/show 가시성 플래그 전환 — CesiumJS 레이어 삭제 시 WebGL 텍스처·타일 캐시 전체 해제되는 문제를 캐시 보존으로 해결, 재표시 응답 속도 개선",
        ],
      },
      {
        role: "Outbox 패턴 이벤트 동기화 라이브러리",
        items: [
          "MyBatis Executor 인터셉터로 INSERT/UPDATE/DELETE 자동 감지 — 비즈니스 코드 변경 없이 투명하게 이벤트 캡처, Spring Boot 자동설정으로 기존 서비스 즉시 적용",
          "TransactionSynchronization.beforeCommit()으로 비즈니스 트랜잭션과 Outbox 저장을 같은 트랜잭션에서 처리 — 커밋 전 유실 가능성 원천 차단",
          "FOR UPDATE SKIP LOCKED로 다중 인스턴스 중복 처리 방지, ThreadLocal OutboxContext로 폐쇄망 수신 데이터 적용 시 Outbox 재발행 차단 — 양방향 동기화 무한 루프 방지",
          "@OutboxDomain / @OutboxEvent 애노테이션으로 도메인·메서드 단위 캡처 여부 제어, 민감 필드 자동 제외 후 Jackson 직렬화",
        ],
      },
      {
        role: "K8s 인프라 운영",
        items: [
          "HPA 동적 스케일링 — 영상 분석 처리 특성상 동시 요청 시 스레드 풀 고갈 발생, 레플리카를 여러 노드에 자동 분산하여 동시 처리량 확보",
          "OpenSearch + Fluent-bit 중앙 로깅 — 9개 서비스 로그를 단일 파이프라인으로 수집, 장애 시 서비스별 분산 로그 탐색 없이 통합 검색",
          "운영·테스트 클러스터 분리 — 동일 K8s 구성으로 온프레미스 테스트 환경 구축, 환경 차이로 인한 배포 후 장애 차단",
        ],
      },
      {
        role: "인증 시스템 최적화",
        items: [
          "Redis 역인덱스 구축으로 세션 풀스캔 제거 — 어드민이 역할 단위로 권한 일괄 변경 시 해당 역할의 일반 유저 전체 세션을 즉시 무효화해야 하는데, 멀티 디바이스 로그인으로 유저당 세션이 여러 개라 전체 세션 풀스캔 후 userId 비교가 필요했음. userId → sessionId Set 역인덱스로 대상 유저 세션만 즉시 조회·무효화, O(N)→O(1)",
        ],
      },
      {
        role: "Go 기반 위성 영상 타일링 API",
        items: [
          "WMS→WMTS 전환 — z/x/y 좌표를 캐시 키로 고정, 합성 결과를 Redis에 저장하여 동일 타일 재요청 시 합성 연산 완전 스킵, 응답 4초→0.5초 미만",
          "Go 고루틴으로 타일 생성 단계 병렬화, Nginx Ingress upstream keepalive로 Pod 커넥션 풀 관리",
          "GDAL 기반 GeoTIFF → PNG/Vector Tile 변환 파이프라인, MBTiles 벡터 타일링으로 줌 레벨·타일 좌표 기반 폴리곤 선별 렌더링",
          "inias API — Go + GDAL, sync.Pool 기반 동시 요청 처리, bbox/EPSG 변환 지원, image-api LayerInfo TTL 1분 캐시로 메타 반복 조회 제거 (캐시 히트 ~20ms)",
        ],
      },
    ],
    achievements: [
      "K8s GPU 카운트 단위 할당으로 1파드=1GPU가 강제되던 구조를 Aliyun GPUShare 메모리 단위 분할로 해결 — 물리 GPU 1장에서 70파드 병렬 추론 운영",
      "단일 모델 고정으로 동시 추론이 불가하던 구조를 FastAPI + ONNX Runtime 추론 서비스 3종 독립 배포로 전환 — object-detection·segmentation·inferencer 각각 독립 스케일링",
      "소스별 하드코딩으로 신규 위성 추가 시 파이프라인 전체 수정이 필요하던 구조를 janus H_BASE/S_BASE 추상 클래스 표준화로 해결 — 신규 소스 추가 시 클래스 1개만 구현, 기존 코드 수정 0건",
      "Debezium replication slot 반복 파손 → 전체 스냅샷 재수행이 필요하던 구조를 AOP + MyBatis 인터셉터 Outbox 패턴으로 대체 — CDC 인프라 의존성 제거, 이벤트 유실 0건",
      "어드민 역할 단위 권한 일괄 변경 시 멀티 디바이스 일반 유저 전체 세션을 풀스캔하던 구조를 userId→sessionId Set 역인덱스로 전환 — 대상 유저 세션만 즉시 조회·무효화, O(N)→O(1)",
    ],
    resources: [
      { label: "서비스 소개", url: "https://www.inspace.co.kr/instation-platform", type: "link" },
      { label: "Outbox GitHub", url: "https://github.com/Ahnyeongjun/outbox_module", type: "link" },
    ],
  },
  {
    id: "pipeline",
    hidden: true,
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
      "Salt 폴링 구조의 격리성 미비로 정상 데이터가 실패 데이터에 영향받던 문제를 RabbitMQ 이벤트 드리븐으로 전환하여 해결 — 실제 문제가 있는 데이터만 격리, 정상 데이터 실패율 0건 달성",
      "파이프라인 중간 장애 발생 시 원인 파악에 하루가 소요되던 문제를 Saga 패턴 보상 트랜잭션 + DLQ 격리로 해결 — 장애 시점 명확화, 파악 시간 하루→2시간 이내",
      "수동 처리가 필요하던 위성 영상 전처리를 이벤트 드리븐 파이프라인으로 전환 — 처리량에 탄력적으로 확장 가능한 구조 구축",
    ],
  },
  {
    id: "security-satellite",
    title: "국가보안기관 위성영상 AI 처리 플랫폼 운영 및 기능 개선",
    description: "폐쇄망 환경에 납품된 위성영상 AI 분석 플랫폼. 레거시 운영 및 기능 개선 담당. 회사 첫 K8s 도입 프로젝트.",
    tags: ["Spring Boot", "Go", "CesiumJS", "Kubernetes", "Redis", "PostgreSQL", "MyBatis"],
    status: "deployed",
    type: "company",
    category: ["backend"],
    company: "한컴인스페이스",
    period: "2021.10 ~ 2023.12",
    role: "백엔드 엔지니어",
    longDescription: "외부 인터넷 차단 폐쇄망 환경에 납품된 위성영상 AI 분석 플랫폼. 입사 후 첫 프로젝트이자 회사 내 K8s를 처음 도입한 프로젝트. 레거시 운영 및 멀티모듈 분리, WMS→WMTS 전환, 분리망 망연계 설계를 담당했습니다.",
    details: [],
    roleDetails: [],
    achievements: [
      "[인프라 구축] K8s 없이 배포·운영 자동화 불가, 운영/로컬 환경 차이로 배포 후 장애 반복 → 회사 내 K8s 최초 도입, 운영·테스트 클러스터 분리, OpenSearch + Fluent-bit 중앙 로깅",
      "[배포 효율] 모놀리식으로 변경 모듈 하나 배포 시 전체 재배포 → 서비스 경계 단위 멀티모듈 분리 — 배포 4분→30초, 변경 모듈만 재배포",
      "[영상 API 성능] WMS 동적 합성으로 영상 수 증가 시 응답 선형 증가 → WMS→WMTS 전환 + Go 고루틴 병렬 생성 + Redis 타일 캐싱 — API 응답 4초→0.5초 미만",
      "[분리망 운영] 외부 인터넷 완전 차단 폐쇄망 환경에서 외부망 데이터 반입 불가 → 단방향 파일 흐름(zst + hash) 기반 망연계 설계",
    ],
    resources: [],
  },
  {
    id: "drone-detection",
    hidden: true,
    title: "드론 탑재 재난탐지 · 3D 좌표 측위 시스템 개발",
    description: "YOLOv5·Faster R-CNN 기반 실시간 탐지, RealSense D435 depth로 2D BBox → 3D 절대좌표 변환 후 GCS 자동 보고",
    tags: ["ROS", "YOLOv5", "Faster R-CNN", "PyTorch", "RealSense D435", "C++", "OpenCV", "FFmpeg", "RTSP", "UDP"],
    imageUrl: "/drone-detection_thum.png",
    status: "deployed",
    type: "company",
    category: ["ai"],
    company: "한컴인스페이스",
    period: "2021.07 ~ 2021.12",
    role: "객체 탐지 모델 학습 및 스트리밍 시스템 개발",
    longDescription: "드론 탑재 환경에서 실시간 객체 탐지 시스템을 개발하고 고도화했습니다. 초기에는 YOLOv5 + LibTorch C++ 기반 스트리밍 시스템을 구축했고, 이후 재난탐지 요건에 맞게 ROS Noetic + Faster R-CNN + RealSense D435 depth 카메라 기반으로 확장해 탐지 대상의 3D 절대좌표를 실시간 산출하고 GCS로 전송하는 시스템을 완성했습니다.",
    details: [],
    roleDetails: [
      {
        role: "ROS 기반 재난탐지 · 3D 좌표 산출",
        items: [
          "ROS Noetic + Faster R-CNN ResNet50-FPN — 7클래스(폭발물·화재·부상자·탈출구·석유·사람) 실시간 추론, ~2~3fps",
          "ApproximateTimeSynchronizer로 RGB·Depth 비동기 스트림 동기화(slop=0.5s) — 타임스탬프 불일치로 잘못된 depth가 사용되는 문제 해결",
          "핀홀 카메라 모델 역투영으로 2D BBox 중심점 → 3D 카메라 좌표 변환, 카메라→드론 좌표계 변환 행렬 적용 후 절대 3D 좌표 산출",
          "커스텀 ROS 메시지(MultiTarget/TargetData) 직접 설계, UDP로 GCS 실시간 전송, systemd 서비스로 드론 부팅 시 자동 기동",
        ],
      },
      {
        role: "YOLOv5 탑재 드론 스트리밍",
        items: [
          "소켓으로 프레임 전달 시 수신 속도 > 추론 속도로 큐 누적 → 메모리 고갈 문제 발생 — 소켓 통신 제거 후 LibTorch로 C++에서 모델 직접 로드하여 해결",
        ],
      },
    ],
    achievements: [
      "2D 영상만으로 거리 추정이 불가하던 한계를 RealSense D435 depth + 핀홀 모델 역투영으로 해결 — 탐지 대상의 3D 절대좌표를 실시간 산출해 GCS 자동 보고",
      "RGB·Depth 스트림 타임스탬프 불일치로 depth 오매핑이 발생하던 문제를 ApproximateTimeSynchronizer(slop=0.5s)로 해결 — 동기화된 프레임 쌍만 추론에 사용",
      "소켓으로 프레임을 전달할 때 수신 속도가 추론 속도를 초과하여 큐가 누적되고 메모리가 고갈되던 문제를 LibTorch C++ 직접 모델 로드로 해결 — 드론 탑재 환경 실시간 추론 안정화",
    ],
    resources: [
      { label: "서비스 소개", url: "https://www.inspace.co.kr/dronesat", type: "link" },
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
