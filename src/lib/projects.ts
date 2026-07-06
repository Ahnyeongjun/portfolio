export interface ProjectResource {
  label: string;
  url: string;
  type: "image" | "pdf" | "html" | "link";
}

export interface Project {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  tags: string[];
  imageUrl?: string;
  thumbLabel?: string;
  link?: string;
  status: "live" | "beta" | "development" | "deployed";
  type: "company" | "team" | "personal";
  category: ("fullstack" | "backend" | "frontend" | "ai")[];
  company?: string;
  period: string;
  role: string;
  roleEn?: string;
  longDescription?: string;
  longDescriptionEn?: string;
  details: string[];
  roleDetails?: { role: string; items: string[] }[];
  achievements: string[];
  achievementsEn?: string[];
  resources?: ProjectResource[];
  hidden?: boolean;
  backendActive?: boolean;
}

export const projects: Project[] = [
  {
    id: "nipa-satellite",
    title: "NIPA 위성 변화탐지 AI 플랫폼 — MSA 설계",
    titleEn: "NIPA Satellite Change Detection AI Platform — 9-Service MSA",
    description: "모놀리식 → MSA 전환으로 재배포 월 10건→1건. RabbitMQ 비동기 AI 파이프라인, Envoy Gateway · Keycloak OIDC 게이트웨이 인증을 구현한 위성 변화탐지 플랫폼.",
    descriptionEn: "Satellite change detection platform: monolith to 9-service MSA (monthly redeployments 10→1). RabbitMQ async AI pipeline, gateway-level auth via Envoy Gateway · Keycloak OIDC.",
    tags: ["RabbitMQ", "Next.js", "TypeScript", "CesiumJS", "FastAPI", "Go", "ONNX Runtime", "Kubernetes"],
    imageUrl: "/nipa_logo.svg",
    status: "deployed",
    type: "company",
    category: ["backend", "ai"],
    company: "한컴인스페이스",
    period: "2025.07 ~ 진행중",
    role: "백엔드 엔지니어",
    roleEn: "Backend Engineer",
    longDescription: "두 시점의 위성 영상을 비교해 지표 변화를 AI로 탐지하는 플랫폼. NIPA(정보통신산업진흥원) 지원 사업. MSA + FastAPI 기반으로 재설계했으며, RabbitMQ 비동기 파이프라인과 Next.js 15 FSD 프론트엔드를 처음 도입했습니다.",
    longDescriptionEn: "AI platform detecting surface changes by comparing satellite images from two time points. NIPA-funded. Redesigned with 9-service MSA + FastAPI, introducing RabbitMQ async pipeline and Next.js 15 FSD frontend for the first time.",
    details: [],
    roleDetails: [],
    achievements: [
      "[작업 유실] Salt 폴링 ack/nack 없어 노드 재시작 시 작업 RUNNING 고착 → RabbitMQ ack/nack + DLQ 비동기 파이프라인 전환 — 작업 유실 0건",
      "[배포 효율] 모놀리식으로 기능 하나 배포 시 전체 재시작 → MSA 분리, 전 서비스 FastAPI 전환, Nginx 라우팅 — 재배포 월 10건→1건, 배포 속도 4분→30초",
      "[폐쇄망 분산 ID] 분리망 환경에서 외부 코디네이터 접근 불가, UUID로는 발생 서버 추적 불가 → Snowflake 알고리즘 직접 구현, worker ID에 망 정보 인코딩",
      "[프론트 유지보수] Thymeleaf 레거시에 기능 경계 없어 수정 영향 범위 예측 불가 → Next.js 15 + FSD 전면 마이그레이션, CesiumJS 커스텀 ImageryProvider — MVT·MBTiles·ImageLayer 이종 레이어 단일 인터페이스 추상화",
    ],
    achievementsEn: [
      "[Job Loss] Salt polling with no ack/nack caused tasks stuck in RUNNING on node restart → Switched to RabbitMQ ack/nack + DLQ async pipeline — 0 job losses",
      "[Deploy Efficiency] Monolithic deployment required full restart per feature → Split into 9 MSA, migrated all services to FastAPI, routed via Nginx — deployments reduced from 10/month to 1, deploy time 4min→30s",
      "[Isolated-network Distributed ID] No external coordinator in air-gapped network, UUID couldn't identify originating server → Implemented Snowflake algorithm from scratch, encoded network info into worker ID",
      "[Frontend Maintainability] Thymeleaf legacy with no feature boundaries made change impact unpredictable → Full migration to Next.js 15 + FSD, CesiumJS custom ImageryProvider — MVT·MBTiles·ImageLayer abstracted into single interface",
    ],
    resources: [
      { label: "NIPA 로고", url: "/nipa_logo.svg", type: "image" },
      { label: "웹 화면", url: "/gis-platform_thum.png", type: "image" },
    ],
  },
  {
    id: "team-mcp-agent",
    title: "Git · 캘린더 · HRWeb 통합 MCP 에이전트 개발",
    titleEn: "Git · Calendar · HRWeb Integrated MCP Agent",
    description: "FastMCP 기반 Gmail·캘린더·Git·HRWeb 통합 자동화 에이전트",
    descriptionEn: "FastMCP-based Gmail · Calendar · Git · HRWeb automation agent — actively used by a 10-person team",
    tags: ["Python", "FastMCP", "MCP", "Playwright", "Gmail API", "Google Calendar API"],
    thumbLabel: "MCP",
    status: "deployed",
    type: "company",
    company: "한컴인스페이스",
    category: ["backend", "ai"],
    period: "2026.03 ~ 2026.04",
    role: "설계 및 개발",
    roleEn: "Design & Development",
    longDescription: "주간보고 작성, 일정 관리, 사내 HRWeb 입력 등 반복 업무를 자동화하기 위해 개인적으로 개발하여 공유한 MCP 기반 에이전트입니다. FastMCP로 8개 도구를 구현하고 Cursor·Claude Desktop에서 바로 호출할 수 있도록 연동했습니다.",
    longDescriptionEn: "MCP-based agent developed personally to automate repetitive tasks — weekly reports, schedule management, in-house HRWeb timesheet input — then shared with the entire 10-person team. Implemented 8 tools with FastMCP and integrated for direct invocation from Cursor and Claude Desktop.",
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
      "개인 도구에 그치지 않고 Claude Desktop·Cursor에서 바로 호출 가능하도록 공유",
    ],
    achievementsEn: [
      "Fully automated weekly report writing and HRWeb timesheet input that previously took 30min–1hr manually — single command handles Git commits + calendar merge → Excel generation → Gmail delivery",
      "Deployed beyond personal use to Cursor and Claude Desktop for direct invocation — adopted as an active tool by all 10 team members",
    ],
  },
  {
    id: "dflow-perf",
    title: "DFLOW MLOps 플랫폼 성능 개선 — 부하테스트 기반 병목 진단",
    titleEn: "DFLOW MLOps Platform Performance — Load-Test-Driven Bottleneck Fix",
    description: "사내 MLOps 라벨링 플랫폼(DFLOW)에 k6·Locust 부하테스트를 도입해 성능 병목을 진단하고, 캐싱과 SQLite WAL 모드로 API 응답 지연을 개선.",
    descriptionEn: "Introduced k6/Locust load testing to an in-house MLOps labeling platform (DFLOW), diagnosed the performance bottleneck, and reduced API latency via caching and SQLite WAL mode.",
    tags: ["Django", "k6", "Locust", "Flask", "SQLite"],
    status: "deployed",
    type: "company",
    category: ["backend"],
    company: "한컴인스페이스",
    period: "2026.06",
    role: "성능 개선",
    roleEn: "Performance Engineering",
    longDescription: "라벨링 후 학습·추론까지 이어지는 사내 MLOps 플랫폼 DFLOW의 ML 백엔드 API에 k6·Locust 부하테스트를 도입했습니다. torch 의존성 없는 Flask mock 서버로 GPU 없이도 반복 테스트가 가능한 환경을 만들고, 부하테스트로 드러난 SQLite 동시 쓰기 병목을 캐싱과 WAL 모드로 해결했습니다.",
    longDescriptionEn: "Introduced k6/Locust load testing to the ML backend API of DFLOW, an in-house MLOps platform spanning labeling through training and inference. Built a torch-free Flask mock server enabling repeatable load tests without GPU access, then resolved the SQLite concurrent-write bottleneck surfaced by testing via caching and WAL mode.",
    details: [],
    roleDetails: [],
    achievements: [
      "[테스트 인프라] GPU 필요한 torch 의존성 때문에 반복 부하테스트가 어려움 → torch 없이 동작하는 Flask ML mock 서버 직접 구현, k6 인증 테스트용 유저·토큰 생성 스크립트 작성",
      "[병목 진단] k6 4개 시나리오로 ML 백엔드 API 부하테스트 — 초기 실패율 23.8%를 API 스펙 오류로 특정해 0.5%까지 수정, 이후 SQLite 동시 쓰기 직렬화를 실제 병목으로 확정",
      "[성능 개선] ML 백엔드 상태를 매번 DB에서 조회·저장하던 구조 → LocMemCache(TTL 30s)로 캐싱하고 값 불변 시 저장 생략, SQLite WAL 모드 적용 — api_load p95 4,239ms→2,106ms(-50%), VU당 DB 쓰기 5회→2회(-60%)",
    ],
    achievementsEn: [
      "[Test Infrastructure] Repeated load testing was blocked by torch's GPU dependency → built a torch-free Flask ML mock server and scripts to provision test users/tokens for k6 auth",
      "[Bottleneck Diagnosis] Ran k6 across 4 scenarios against the ML backend API — traced an initial 23.8% failure rate to API spec mismatches and fixed it down to 0.5%, then confirmed SQLite concurrent-write serialization as the real bottleneck",
      "[Performance Fix] Replaced per-request DB reads/writes for ML backend state checks with LocMemCache (30s TTL) that skips saves when unchanged, plus SQLite WAL mode — api_load p95 4,239ms→2,106ms (-50%), DB writes per VU 5→2 (-60%)",
    ],
  },
  {
    id: "kari-satellite",
    title: "항공우주연구원 위성영상 AI 처리 플랫폼 구축",
    titleEn: "KARI Satellite Imagery AI Processing Platform",
    description: "10개 이상 위성 소스를 수집·처리해 AI 추론 결과를 CesiumJS로 가시화하는 위성영상 AI 처리 플랫폼. 한국항공우주연구원 납품.",
    descriptionEn: "AI processing platform collecting 10+ satellite sources and visualizing inference results (object detection, segmentation, super-resolution) via CesiumJS. Delivered to Korea Aerospace Research Institute (KARI).",
    tags: ["Spring Boot", "Go", "PyTorch", "FastAPI", "ONNX Runtime", "Kubernetes", "Aliyun GPUShare", "MyBatis", "Redis", "Salt-Stack"],
    imageUrl: "/kari_logo.svg",
    status: "deployed",
    type: "company",
    category: ["backend", "ai"],
    company: "한컴인스페이스",
    period: "2023.10 ~ 2025.07",
    role: "백엔드 엔지니어",
    roleEn: "Backend Engineer",
    longDescription: "다누리·Sentinel·Landsat 등 10개 이상 위성 소스를 수집·처리해 객체탐지·세그멘테이션·초해상도 AI 추론 결과를 CesiumJS 뷰어로 가시화하는 플랫폼. 한국항공우주연구원 납품. Outbox 패턴 라이브러리, Aliyun GPUShare, janus 워크플로우 엔진을 이 프로젝트에서 설계·구현했습니다.",
    longDescriptionEn: "Platform collecting and processing 10+ satellite sources (Danuri, Sentinel, Landsat, etc.) and visualizing object detection, segmentation, and super-resolution AI results via CesiumJS viewer. Delivered to KARI. Designed and implemented the Outbox pattern library, Aliyun GPUShare integration, and janus workflow engine in this project.",
    details: [],
    roleDetails: [],
    achievements: [
      "[이벤트 유실] Debezium replication slot 반복 파손으로 전체 스냅샷 재수행 → AOP + MyBatis Outbox 라이브러리 직접 개발 — CDC 인프라 의존 제거, 이벤트 유실 0건",
      "[GPU 활용] 1파드=1GPU 강제로 자원 90% 유휴 → Aliyun GPUShare aliyun.com/gpu-mem 단위 분할 — GPU 4장에서 70파드 병렬 추론, 일 처리량 200건→3,000건",
      "[AI 모델] YOLOv11m OBB/HBB 이원 탐지 20클래스 (HBB mAP50 0.644 / OBB 0.604), UPerNet+ConvNeXt 세그멘테이션 mIoU 0.7205 — 회전 augmentation 역효과 확인·제거, 색감 도메인 매칭 전처리 구현",
      "[위성 소스 통합] 소스별 하드코딩으로 신규 위성 추가 시 파이프라인 전체 수정 → janus H_BASE/S_BASE 추상화, 10+ 소스 단일 파이프라인 — 신규 소스 추가 코드 수정 0건",
      "[API 성능] PostGIS 전수 연산으로 위성 메타 API 38초 소요 → 조건부 실행 + 페이징 + Redis 캐싱 — 159ms (239배), 50VU 에러율 11.22%→0%",
    ],
    achievementsEn: [
      "[Event Loss] Repeated Debezium replication slot failures triggered full snapshots → Developed AOP + MyBatis Outbox library in-house — eliminated CDC infrastructure dependency, 0 event losses",
      "[GPU Utilization] 1-pod-per-GPU forced 90% resource idle → Aliyun GPUShare gpu-mem unit partitioning — 70 pods parallel inference on 4 GPUs, daily throughput 200→3,000 jobs",
      "[AI Model] YOLOv11m dual OBB/HBB detection 20 classes (HBB mAP50 0.644 / OBB 0.604), UPerNet+ConvNeXt segmentation mIoU 0.7205 — identified and removed rotation augmentation side effects, implemented color domain matching preprocessing",
      "[Satellite Source Integration] Per-source hardcoding required full pipeline rewrite for each new satellite → janus H_BASE/S_BASE abstraction, 10+ sources on single pipeline — 0 code changes needed for new source additions",
      "[API Performance] PostGIS full-scan satellite metadata API took 38s → Conditional execution + pagination + Redis caching — 159ms (239×), 50VU error rate 11.22%→0%",
    ],
    resources: [
      { label: "로고", url: "/kari_logo.svg", type: "image" },
      { label: "플랫폼 소개", url: "/kari_intro.png", type: "image" },
      { label: "웹 화면", url: "/kari_web.png", type: "image" },
      { label: "샘플 Outbox", url: "https://github.com/Ahnyeongjun/outbox_module", type: "link" },
    ],
  },
  {
    id: "insops-satellite",
    title: "국가보안기관 위성영상 판독 시스템(INSOPS) 고도화",
    titleEn: "National Security Agency Satellite Imagery Interpretation System (INSOPS)",
    description: "다종 위성영상을 판독·변화탐지하는 국가보안기관 대상 플랫폼의 프론트엔드와 API를 2년간 담당, 판독보고서·AOI 관리·좌표 표시 등 핵심 기능 개발.",
    descriptionEn: "Frontend and API development for a national security agency's multi-satellite imagery interpretation and change-detection platform over 2 years — interpretation reports, AOI management, coordinate display, and more.",
    tags: ["Spring Boot", "Java", "MyBatis", "PostGIS", "CesiumJS", "JSP", "JWT"],
    status: "deployed",
    type: "company",
    category: ["fullstack"],
    company: "한컴인스페이스",
    period: "2022.05 ~ 2024.05",
    role: "풀스택 개발 (프론트엔드 중심)",
    roleEn: "Full-Stack Development (Frontend-Focused)",
    longDescription: "다종 위성영상을 판독·변화탐지하는 국가보안기관 대상 플랫폼입니다. CesiumJS 기반 3D 뷰어, 판독보고서, AOI 관리, 촬영계획 등 프론트엔드 기능과 REST API를 2년간 담당하며 end-to-end로 기능을 구현했습니다.",
    longDescriptionEn: "A multi-satellite imagery interpretation and change-detection platform for a national security agency. Over 2 years, owned end-to-end features spanning the CesiumJS-based 3D viewer, interpretation reports, AOI management, and imaging schedules, along with the supporting REST APIs.",
    details: [],
    roleDetails: [],
    achievements: [
      "[촬영계획] 긴급 주문 시 AOI를 별도로 다시 등록해야 하는 수작업 반복 → 주문 데이터 기반 AOI 자동 생성 기능 구현 — 이중 입력 제거",
      "[좌표 표시] 위경도/경위도 표기 방식이 고정돼 있어 국제 협업 시 불편 → DD/DMS 듀얼 포맷 토글 기능 추가, CesiumJS 좌표 계산 로직에 반영",
      "[AOI 관리] 조회 시 과거 데이터까지 모두 표출돼 그리드가 무거워짐 → 등록일 기준 당일 데이터만 필터링하도록 개선 — 조회 데이터량 대폭 축소",
      "[변화탐지] 시계열 분석 시 위성 소스 우선순위·시간창 제약이 지나치게 좁아 비교 대상 누락 → PNEO 위성 추가, 우선순위 로직·시간창 재설계로 매칭 범위 확대",
      "[판독보고서] 해외지역 여부 플래그가 저장 후 반대로 조회되는 데이터 정합성 버그 → MyBatis 매퍼 컬럼 순서 불일치 확인 후 수정",
    ],
    achievementsEn: [
      "[Imaging Schedule] Urgent orders required manually re-registering a separate AOI record → built auto-generation of AOI from order data, eliminating duplicate entry",
      "[Coordinate Display] Fixed lat/long-first notation made international collaboration inconvenient → added a DD/DMS dual-format toggle, wired into CesiumJS coordinate calculations",
      "[AOI Management] Queries surfaced all historical records, making the grid heavy → filtered to same-day records by registration date, sharply reducing result size",
      "[Change Detection] Overly narrow satellite-source priority and time-window constraints caused missed comparison targets in time-series analysis → added PNEO satellite support and redesigned the priority logic/time window to widen matching",
      "[Interpretation Report] Data-integrity bug where the overseas-region flag was retrieved inverted after saving → traced to a MyBatis mapper column-order mismatch and fixed it",
    ],
  },

  // ── Side projects ──────────────────────────────────────────────────────────
  {
    id: "momentier",
    title: "Momentier",
    description: "여행 중 찍은 사진과 감정을 타임라인으로 기록·공유하는 여행 플래닝 서비스. SWYP 9기 팀 프로젝트.",
    descriptionEn: "Travel planning service for recording and sharing trip photos and emotions as a timeline. SWYP 9th cohort team project.",
    tags: ["Spring Boot", "JWT", "AWS S3", "RDS", "GitHub Actions"],
    imageUrl: "/momentier_thum.png",
    status: "deployed",
    type: "team",
    category: ["backend"],
    period: "2025.01 ~ 2025.03",
    role: "백엔드",
    roleEn: "Backend",
    longDescription: "여행 중 찍은 사진과 감정을 타임라인으로 기록하고 공유하는 여행 플래닝 서비스. SWYP(스위프) 9기 팀 프로젝트로 백엔드 API 설계 및 개발을 담당했습니다.",
    longDescriptionEn: "Travel planning service for recording and sharing trip photos and emotions as a timeline. Responsible for backend API design and development as part of SWYP 9th cohort team project.",
    details: [],
    achievements: ["SWYP 9기 팀 프로젝트 완성 및 배포"],
    achievementsEn: ["Completed and deployed as SWYP 9th cohort team project"],
  },
  {
    id: "chugjibup",
    title: "축지법",
    titleEn: "Chugjibup",
    description: "임장 일정 등록, 매물 비교, 체크리스트 메모까지 한 앱에서. 부동산 임장을 체계적으로 관리하는 서비스. SWYP 10기.",
    descriptionEn: "All-in-one app for scheduling property visits, comparing listings, and managing checklists. A systematic real estate site-visit management service. SWYP 10th cohort.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React Query"],
    imageUrl: "/chukjibeob_thum.webp",
    status: "deployed",
    type: "team",
    category: ["frontend"],
    period: "2025.04 ~ 2025.06",
    role: "프론트엔드",
    roleEn: "Frontend",
    longDescription: "부동산 임장 일정 등록, 매물 비교, 체크리스트 메모를 한 앱에서 관리하는 서비스. SWYP(스위프) 10기 팀 프로젝트로 프론트엔드 개발을 담당했습니다.",
    longDescriptionEn: "Service for managing property visit schedules, listing comparisons, and checklists all in one app. Responsible for frontend development as part of SWYP 10th cohort team project.",
    details: [],
    achievements: ["SWYP 10기 팀 프로젝트 완성"],
    achievementsEn: ["Completed as SWYP 10th cohort team project"],
  },
  {
    id: "wedding",
    title: "위딩",
    titleEn: "Widing",
    description: "결혼 준비 전 과정을 체크리스트·타임라인으로 관리하는 웨딩 플래닝 앱. SWYP 11기 팀 프로젝트.",
    descriptionEn: "Wedding planning app for managing the entire wedding preparation process with checklists and timelines. SWYP 11th cohort team project.",
    tags: ["React Native", "TypeScript", "Expo"],
    imageUrl: "/with-ing_thum.webp",
    status: "deployed",
    type: "team",
    category: ["frontend"],
    period: "2025.07 ~ 2025.10",
    role: "PM · 프론트엔드",
    roleEn: "PM · Frontend",
    longDescription: "결혼 준비 전 과정을 체크리스트와 타임라인으로 관리하는 웨딩 플래닝 앱. SWYP(스위프) 11기 팀 프로젝트로 PM 및 프론트엔드 개발을 담당했습니다.",
    longDescriptionEn: "Wedding planning app for managing the entire wedding preparation process with checklists and timelines. Led PM and frontend development as part of SWYP 11th cohort team project.",
    details: [],
    achievements: ["SWYP 11기 팀 프로젝트 PM · 프론트 주도"],
    achievementsEn: ["Led PM and frontend development for SWYP 11th cohort team project"],
  },
  {
    id: "mapin",
    title: "Mapin",
    description: "위치 기반으로 주변 취향 맞춤 장소를 추천하고 친구와 공유하는 지도 앱. SWYP 앱 4기 팀 프로젝트.",
    descriptionEn: "Location-based map app that recommends nearby places tailored to your taste and lets you share them with friends. SWYP App 4th cohort team project.",
    tags: ["Spring Boot", "PostGIS", "Redis", "AWS", "GitHub Actions"],
    imageUrl: "/swyp-app4_thum.png",
    status: "development",
    type: "team",
    category: ["backend"],
    period: "2026.01 ~ 2026.03",
    role: "백엔드",
    roleEn: "Backend",
    longDescription: "위치 기반으로 주변 취향 맞춤 장소를 추천하고 친구와 공유하는 지도 앱. SWYP(스위프) 앱 4기 팀 프로젝트로 백엔드 API 및 PostGIS 지리 데이터 처리를 담당했습니다.",
    longDescriptionEn: "Location-based map app recommending nearby places tailored to user taste and enabling friend sharing. Led backend API development and PostGIS geospatial data handling as part of SWYP App 4th cohort team project.",
    details: [],
    achievements: ["SWYP 앱 4기 팀 프로젝트 백엔드 주도"],
    achievementsEn: ["Led backend development for SWYP App 4th cohort team project"],
  },
  {
    id: "simvex",
    title: "SIMVEX",
    description: "3D 분해/조립 시뮬레이션과 SSE 스트리밍 AI 어시스턴트를 결합한 기계공학 학습 웹 서비스",
    descriptionEn: "Mechanical engineering learning web service combining 3D disassembly/assembly simulation with SSE streaming AI assistant",
    tags: ["Next.js", "Three.js", "React Three Fiber", "Zustand", "React Query", "Styled Components", "MSW"],
    imageUrl: "/simvex_thum.png",
    link: "https://runtime-simvex.vercel.app/",
    status: "live",
    type: "team",
    category: ["frontend"],
    period: "2026.01",
    role: "프론트엔드 개발",
    roleEn: "Frontend Development",
    longDescription: "제4회 블레이버스 MVP 개발 해커톤에서 진행한 프로젝트입니다. 기계공학 교육에서 2D 교재만으로는 이해하기 어려운 기계 구조를, 3D 인터랙티브 분해·조립 시뮬레이션과 SSE 스트리밍 기반 AI 어시스턴트로 직관적으로 학습할 수 있는 서비스입니다. 7가지 기계 장치(드론, V4 엔진, 로봇팔, 로봇 그리퍼, 판스프링, 만력기, 서스펜션)를 3D로 분해하고 학습할 수 있으며, 부품별 AI 설명·퀴즈·메모·워크플로우·PDF 내보내기까지 학습 흐름 전체를 한 곳에서 관리합니다.",
    longDescriptionEn: "Project from the 4th Blaybus MVP Development Hackathon. A web service that enables intuitive learning of mechanical structures — which are hard to understand from 2D textbooks alone — through 3D interactive disassembly/assembly simulation and SSE streaming AI assistant. Supports 7 mechanical devices (drone, V4 engine, robotic arm, gripper, leaf spring, clamp, suspension) with per-part AI explanations, quizzes, memos, workflow editor, and PDF export all in one place.",
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
    achievementsEn: [
      "Solved the educational barrier of understanding mechanical structures from 2D textbooks alone via 3D interactive simulation — built disassembly/assembly content for 7 devices including drone and V4 engine",
      "Solved visual collision where parts exploded in the same direction using Fibonacci sphere algorithm — natural disassembly animation with uniform part distribution",
      "Solved learning interruption during AI response wait using SSE streaming — real-time display as responses generate, maintaining learning immersion",
      "Solved frequent context switching between scattered learning tools by integrating into a single-screen unified flow — Undo/Redo, quiz, memo, workflow, and PDF export in one learning stream",
    ],
    resources: [
      { label: "GitHub", url: "https://github.com/team-blaybus-runtime/team-blaybus-runtime_front", type: "link" },
      { label: "프로젝트 설명", url: "https://github.com/team-blaybus-runtime/team-blaybus-runtime_front/blob/main/README.md", type: "link" },
    ],
  },
  {
    id: "pillcare",
    title: "PillCare",
    description: "복약·건강 기록을 한 흐름에 담고, AI가 오늘의 건강 위험을 분석해주는 모바일 헬스케어 앱",
    descriptionEn: "Mobile healthcare app combining medication and health records in one flow, with AI analyzing today's health risk score",
    tags: ["Next.js", "TypeScript", "Tailwind CSS v4", "Zustand", "FastAPI", "PostgreSQL", "Redis", "OpenAI API", "ResNet"],
    imageUrl: "/pillcare_thum.png",
    link: "https://vercel.com/ahnyeongjuns-projects/mfds-2026-frontend-pill-ver",
    status: "live",
    type: "team",
    category: ["fullstack", "ai"],
    period: "2026.05",
    role: "프론트엔드 개발 · UI/UX 디자인 · 백엔드 일부",
    roleEn: "Frontend Development · UI/UX Design · Backend (partial)",
    longDescription: "2026 식약처(MFDS) 공모전 출품작입니다. 복약·건강 기록을 하나의 흐름으로 묶고, AI가 복약 순응도·질환 추이·환경 데이터를 종합해 오늘의 건강 위험 지수를 산출해주는 모바일 헬스케어 앱입니다. 2인 팀으로 진행했으며, 프론트엔드 전담 및 UI/UX 디자인, 백엔드 일부를 담당했습니다.",
    longDescriptionEn: "Submission for the 2026 MFDS (Ministry of Food and Drug Safety) competition. Mobile healthcare app unifying medication and health records in one flow, where AI synthesizes medication adherence, disease trends, and environmental data to calculate a daily Health Risk Index. Built as a 2-person team; responsible for all frontend, UI/UX design, and partial backend.",
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
    achievementsEn: [
      "Solved fragmented health risk visibility across medication, symptoms, and environment using a 5-domain weighted Health Risk Index — medication adherence, disease trend, DUR safety, symptom trend, and environmental score unified into a 0–100 score",
      "Scheduled collection of 3 external APIs (KMA weather, AirKorea, MFDS DUR) and combined environmental data into health alert triggers — context-aware alerts for scenarios like hypertension + sudden temperature drop",
      "Built AI Hub ResNet pill image classification inference pipeline — photo-to-drug-code inference with MFDS DUR API for contraindication warnings at registration time, with low-confidence fallback to manual search",
      "Sole owner of UI/UX design through implementation — designed 3-tier information hierarchy for healthcare domain and intuitive health risk visualization",
    ],
    resources: [
      { label: "배포", url: "https://vercel.com/ahnyeongjuns-projects/mfds-2026-frontend-pill-ver", type: "link" },
    ],
  },
  {
    id: "deadline-mate",
    title: "DeadlineMate",
    description: "스터디·프로젝트 모임을 개설하고 주간 Todo와 달성률로 팀 목표를 함께 관리하는 모임 플랫폼",
    descriptionEn: "Group platform for creating study/project groups and managing team goals together with weekly todos and completion rates",
    tags: ["Spring Boot", "Java 21", "MySQL", "JPA", "QueryDSL", "JWT", "OAuth", "Spring Event", "JUnit5", "Mockito"],
    imageUrl: "/deadline-mate_thum.png",
    link: "https://completionisland.vercel.app/main",
    status: "live",
    backendActive: true,
    type: "team",
    category: ["backend"],
    period: "2026.03 ~ 2026.04",
    role: "백엔드 개발",
    roleEn: "Backend Development",
    longDescription: "FESI 13기에서 진행한 팀 프로젝트입니다. 스터디나 프로젝트 모임을 개설하고 팀원들과 주간 Todo를 공유하며 달성률을 함께 관리하는 서비스입니다. 11개 도메인을 설계했으며, 모임 검색·신청·알림·평판까지 전체 백엔드 흐름을 담당했습니다.",
    longDescriptionEn: "Team project from FESI 13th cohort. A service for creating study or project groups, sharing weekly todos with teammates, and managing completion rates together. Designed 11 domains and owned the entire backend flow covering group search, applications, notifications, and reputation.",
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
    achievementsEn: [
      "Wrote 51 test files across all domains — unit · integration · E2E 3-layer pyramid + GitHub Actions CI for automatic verification on every PR",
      "Solved N+1 on group list queries (per-row tag/image/leader fetches) using IN query batch processing — 4 tables each queried exactly once",
      "Solved tight coupling where notification failures affected group data using @TransactionalEventListener event separation — fault tolerance ensures 0 group data loss even when evaluation service is down",
      "Solved potential maxMembers overflow on concurrent applications with PESSIMISTIC_WRITE + Batch UPDATE — race-condition-free atomic increment/decrement",
    ],
    resources: [
      { label: "서비스", url: "https://completionisland.vercel.app/main", type: "link" },
      { label: "GitHub", url: "https://github.com/FESI13-3/FESI13-backend", type: "link" },
    ],
  },
  {
    id: "concert-reservation",
    title: "동시성 제어 · 이벤트 드리븐 콘서트 예약 시스템",
    titleEn: "Concurrency Control · Event-Driven Concert Reservation System",
    description: "항해99 백엔드코스 — 동시성·이벤트 드리븐·부하 테스트까지 백엔드 핵심 문제를 단계적으로 해결한 프로젝트",
    descriptionEn: "Hanghae99 Backend Course — project solving core backend challenges step by step: concurrency, event-driven architecture, and load testing",
    tags: ["Spring Boot", "Java", "MySQL", "Redis", "Kafka", "k6", "InfluxDB", "Grafana", "JUnit5"],
    status: "deployed",
    type: "personal",
    category: ["backend"],
    hidden: true,
    period: "2025.07 ~ 2025.09",
    role: "백엔드 개발 (항해99 9기)",
    roleEn: "Backend Development (Hanghae99 9th cohort)",
    longDescription: "항해99 백엔드코스 9기에서 진행한 콘서트 예약 시스템입니다. 설계부터 시작해 동시성 제어, 캐싱, 이벤트 드리븐 아키텍처, Kafka 마이그레이션, 부하 테스트까지 10주에 걸쳐 단계적으로 완성했습니다. 상위 10% 수료.",
    longDescriptionEn: "Concert reservation system built during Hanghae99 Backend Course 9th cohort. Progressed step by step over 10 weeks — from initial design through concurrency control, caching, event-driven architecture, Kafka migration, and load testing. Top 10% graduation.",
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
    achievementsEn: [
      "Top 10% graduation from Hanghae99 Backend Course 9th cohort — validated TDD, event-driven design, and k6 load testing in a real project",
      "Identified distributed lock retry logic as the root cause of response latency via k6+Grafana load testing — resolved bottleneck by switching to optimistic locking",
      "Migrated Redis queue to Kafka and ensured distributed transaction consistency using Choreography Saga + DLQ pattern",
      "Directly solved core backend challenges step by step — EXPLAIN-based index design, Redis caching, and hands-on comparison of pessimistic, optimistic, and distributed locks",
    ],
    resources: [
      { label: "GitHub", url: "https://github.com/hanghae99-backend/2-SERVICE", type: "link" },
    ],
  },
  {
    id: "booksight",
    title: "Booksight",
    description: "오늘 출간된 책들을 생일처럼 축하하는 서비스",
    descriptionEn: "A service that celebrates books published today as if it were their birthday",
    tags: ["Kotlin", "Spring Boot", "Spring Batch", "QueryDSL", "Redis", "Oracle", "MySQL", "JdbcTemplate"],
    imageUrl: "/booksight_thum.png",
    link: "https://book-web-frontend-one.vercel.app/",
    status: "deployed",
    type: "team",
    category: ["backend"],
    period: "2025.04 ~ 2025.07",
    role: "서브 백엔드 개발",
    roleEn: "Supporting Backend Development",
    longDescription: "매일 수많은 책들이 세상에 태어나고, 그중엔 잊혀지기엔 너무나 특별한 이야기들이 담겨 있습니다. 오늘 처음 세상에 나온 책들을 생일처럼 축하하고, 그 특별한 순간을 함께 나누는 서비스입니다. 6명(프론트엔드 2, 백엔드 2, 디자이너, PM)이 함께 진행했습니다. 국립중앙도서관 API 기반 자동 수집 파이프라인과 12만 건 초기 데이터 안정 적재가 핵심 구현 과제였습니다.",
    longDescriptionEn: "Every day countless books come into the world — some too special to be forgotten. A service that celebrates books making their debut today as if it were their birthday, sharing that special moment together. Team of 6 (2 frontend, 2 backend, 1 designer, 1 PM). Core challenges: automated pipeline via National Library API and stable ingestion of 120,000 initial records.",
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
    achievementsEn: [
      "Solved OOM failures with coroutine/JPA approach during 120,000-record initial ingestion by switching to JdbcTemplate batch INSERT — all data loaded stably",
      "Solved data integrity issues from duplicate daily new-book collection runs using Spring Batch + JobExplorer deduplication — automated National Library API collection pipeline established",
      "Solved search log collection logic polluting business code using AOP + Spring Event — non-invasive integration with secondary batch for auto-enrichment of uncollected books",
      "Solved unmaintainable mixing of external API/CSV pipeline with business logic by extracting external package — business code unaffected when external integrations change",
    ],
    resources: [
      { label: "GitHub", url: "https://github.com/HBD-BookSight", type: "link" },
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
