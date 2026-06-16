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
    id: "kari-satellite",
    title: "항공우주연구원 위성영상 AI 처리 플랫폼 구축",
    description: "10개 이상 위성 소스를 수집·처리해 AI 추론 결과를 CesiumJS로 가시화하는 위성영상 AI 처리 플랫폼. 한국항공우주연구원 납품.",
    tags: ["Spring Boot", "Go", "PyTorch", "FastAPI", "ONNX Runtime", "Kubernetes", "Aliyun GPUShare", "MyBatis", "Redis", "Salt-Stack"],
    imageUrl: "/kari_logo.svg",
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

  // ── Side projects ──────────────────────────────────────────────────────────
  {
    id: "momentier",
    title: "Momentier",
    description: "여행 중 찍은 사진과 감정을 타임라인으로 기록·공유하는 여행 플래닝 서비스. SWYP 9기 팀 프로젝트.",
    tags: ["Spring Boot", "JWT", "AWS S3", "RDS", "GitHub Actions"],
    status: "deployed",
    type: "team",
    category: ["backend"],
    period: "2025.01 ~ 2025.03",
    role: "백엔드",
    longDescription: "여행 중 찍은 사진과 감정을 타임라인으로 기록하고 공유하는 여행 플래닝 서비스. SWYP(스위프) 9기 팀 프로젝트로 백엔드 API 설계 및 개발을 담당했습니다.",
    details: [],
    achievements: ["SWYP 9기 팀 프로젝트 완성 및 배포"],
  },
  {
    id: "chugjibup",
    title: "축지법",
    description: "임장 일정 등록, 매물 비교, 체크리스트 메모까지 한 앱에서. 부동산 임장을 체계적으로 관리하는 서비스. SWYP 10기.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React Query"],
    status: "deployed",
    type: "team",
    category: ["frontend"],
    period: "2025.04 ~ 2025.06",
    role: "프론트엔드",
    longDescription: "부동산 임장 일정 등록, 매물 비교, 체크리스트 메모를 한 앱에서 관리하는 서비스. SWYP(스위프) 10기 팀 프로젝트로 프론트엔드 개발을 담당했습니다.",
    details: [],
    achievements: ["SWYP 10기 팀 프로젝트 완성"],
  },
  {
    id: "wedding",
    title: "위딩",
    description: "결혼 준비 전 과정을 체크리스트·타임라인으로 관리하는 웨딩 플래닝 앱. SWYP 11기 팀 프로젝트.",
    tags: ["React Native", "TypeScript", "Expo"],
    status: "deployed",
    type: "team",
    category: ["frontend"],
    period: "2025.07 ~ 2025.10",
    role: "PM · 프론트엔드",
    longDescription: "결혼 준비 전 과정을 체크리스트와 타임라인으로 관리하는 웨딩 플래닝 앱. SWYP(스위프) 11기 팀 프로젝트로 PM 및 프론트엔드 개발을 담당했습니다.",
    details: [],
    achievements: ["SWYP 11기 팀 프로젝트 PM · 프론트 주도"],
  },
  {
    id: "mapin",
    title: "Mapin",
    description: "위치 기반으로 주변 취향 맞춤 장소를 추천하고 친구와 공유하는 지도 앱. SWYP 앱 4기 팀 프로젝트.",
    tags: ["Spring Boot", "PostGIS", "Redis", "AWS", "GitHub Actions"],
    status: "development",
    type: "team",
    category: ["backend"],
    period: "2026.01 ~ 진행중",
    role: "백엔드",
    longDescription: "위치 기반으로 주변 취향 맞춤 장소를 추천하고 친구와 공유하는 지도 앱. SWYP(스위프) 앱 4기 팀 프로젝트로 백엔드 API 및 PostGIS 지리 데이터 처리를 담당했습니다.",
    details: [],
    achievements: ["SWYP 앱 4기 팀 프로젝트 백엔드 주도"],
  },
  {
    id: "simvex",
    title: "SIMVEX",
    description: "기계 부품을 3D로 분해·조립하며 학습하는 플랫폼. @react-three/fiber 기반 3D 시뮬레이션 + SSE AI 어시스턴트. 블레이버스 해커톤 출품작.",
    tags: ["React", "TypeScript", "@react-three/fiber", "Three.js", "FastAPI", "SSE"],
    status: "deployed",
    type: "personal",
    category: ["fullstack", "ai"],
    period: "2026.01",
    role: "풀스택",
    longDescription: "기계공학 3D 학습 플랫폼 SIMVEX. @react-three/fiber 기반 3D 분해·조립 시뮬레이션과 SSE 스트리밍 AI 어시스턴트를 구현. 제4회 블레이버스 MVP 개발 해커톤 출품작.",
    details: [],
    achievements: ["제4회 블레이버스 MVP 개발 해커톤 출품", "3D 분해·조립 시뮬레이션 + SSE AI 어시스턴트 구현"],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
