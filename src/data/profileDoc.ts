// Document content for the /resume (Rallit) and /portfolio-pdf (Wanted) pages.
// Content is organized from the live portfolio site (profile / projects / experience),
// reshaped into the 현상→원인→대응→성과 (STAR) structure the document designs use.
// Order mirrors the live site: company projects by latest start (MCP → NIPA → KARI),
// and items within each project follow the site's achievement order.
/* eslint-disable */

export interface DocBlock {
  label: string;
  situation: string;
  cause: string;
  actions: string[];
  result: string;
  oneliner?: string; // 이력서용 한 줄 요약: 문제 → 해결 → 결과
}
export interface DocProject {
  title: string;
  company: string;
  period: string;
  stack: string[];
  desc: string;
  blocks: DocBlock[];
}

export const PROFILE = {
  name: "안영준",
  role: "백엔드 개발자",
  email: "ahn479512@gmail.com",
  github: "github.com/Ahnyeongjun",
  githubUrl: "https://github.com/Ahnyeongjun",
  location: "서울, Korea",

  summary: [
    "한컴인스페이스에서 5년간 위성영상 AI 플랫폼의 백엔드를 맡아 온 개발자입니다. 한국항공우주연구원(KARI)에 납품한 처리 플랫폼과 정보통신산업진흥원(NIPA) 지원 변화탐지 플랫폼을 설계·운영하며, 국가기관이 실제 업무에 쓰는 시스템을 안정적으로 운영해 왔습니다.",
    "운영에서 부딪힌 병목은 임시방편으로 막지 않고 구조로 풀어왔습니다. 모놀리식 → MSA 전환으로 재배포를 월 10건에서 1건으로 줄였고, GPUShare로 GPU 4장에 70개 파드를 병렬 추론시켜 하루 처리량을 200건에서 3,000건까지 끌어올렸으며, 38초 걸리던 메타데이터 API를 159ms로 단축했습니다.",
    "CDC 인프라 의존을 걷어내려 Outbox 패턴을 직접 구현해 이벤트 유실을 없앴고, 외부 인터넷이 막힌 폐쇄망에서는 Snowflake 분산 ID를 직접 구현했습니다. 외부 도구를 기다리기보다 필요하면 직접 만드는 쪽을 택해왔습니다.",
    "결국 잘하는 일은 \"왜 느린가, 왜 터지는가\"를 끝까지 파고들어, 다시 터지지 않는 구조로 바꾸는 것입니다. 화면 뒤에서 시스템이 조용하고 안정적으로 돌아가게 만드는 일에 가장 큰 보람을 느낍니다.",
  ],

  highlights: [
    { v: "10건 → 1건", l: "재배포 / 월" },
    { v: "4분 → 30초", l: "배포 속도" },
    { v: "38초 → 159ms", l: "메타데이터 API" },
    { v: "GPU 4장 → 70파드", l: "GPUShare 병렬 추론" },
  ],

  career: {
    company: "한컴인스페이스",
    position: "연구원 · 소프트웨어플랫폼 · 재직 중",
    period: "2021.07. ~ 재직 중 (5년)",
    overview: "한국항공우주연구원(KARI)·국가보안기관·정보통신산업진흥원(NIPA) 등 국가기관을 대상으로 위성영상 AI 플랫폼을 설계·개발하고, Kubernetes 기반 서버 배포와 운영을 담당했습니다.",
    metrics: ["재배포 월 10건→1건", "배포 4분→30초", "메타데이터 API 38초→159ms", "GPU 4장 70파드 병렬 추론", "이벤트 유실 0건"],
    groups: [
      {
        title: "FastMCP 기반 사내 AI 에이전트",
        items: [
          "FastMCP 기반 8개 도구 구현 (Git·캘린더·HRWeb·Gmail 연동)",
          "Git 커밋 + 캘린더 병합으로 주간보고 자동 생성 후 Gmail 발송",
          "엑셀 템플릿을 ZIP/XML 레벨에서 직접 조작 — 서식·수식 보존하며 내용 주입",
          "사내 HRWeb(아마란스) Playwright 전 흐름 브라우저 자동화",
        ],
      },
      {
        title: "NIPA 위성 변화탐지 AI 플랫폼",
        items: [
          "Salt 폴링 → RabbitMQ ack/nack + DLQ 비동기 처리 파이프라인 재설계",
          "모놀리식 → MSA 전환, 전 서비스 FastAPI 통일 및 Nginx 라우팅",
          "폐쇄망 분산 ID를 위한 Snowflake 알고리즘 직접 구현 (worker ID에 망 정보 인코딩)",
          "Envoy Gateway · Keycloak OIDC 게이트웨이 레벨 인증 구현",
          "Next.js 15 + FSD 레거시 프론트엔드 전면 마이그레이션, CesiumJS 커스텀 ImageryProvider",
        ],
      },
      {
        title: "항공우주연구원(KARI) 위성영상 AI 처리 플랫폼",
        items: [
          "AOP + MyBatis 기반 Outbox 패턴 라이브러리 직접 개발 (CDC 인프라 의존 제거)",
          "Aliyun GPUShare로 GPU 자원 분할 — 4장에서 70개 파드 병렬 추론",
          "YOLOv11m 객체탐지 · UPerNet+ConvNeXt 세그멘테이션 AI 모델 서빙",
          "janus 워크플로우 추상화로 10개 이상 위성 소스를 단일 파이프라인으로 통합",
          "PostGIS 메타데이터 조회 API 성능 최적화 (38초 → 159ms)",
        ],
      },
    ],
  },

  projects: [
    {
      title: "FastMCP 기반 사내 AI 에이전트",
      company: "한컴인스페이스",
      period: "2026.03. ~ 2026.04.",
      stack: ["Python", "FastMCP", "Playwright", "Gmail API", "Google Calendar API"],
      desc: "Git·캘린더·HRWeb·Gmail을 MCP 도구로 연결해 주간보고 작성·공수 입력 등 반복 수작업을 자동화한 사내 AI 에이전트.",
      blocks: [
        {
          label: "반복 수작업 자동화",
          situation: "주간보고 작성과 HRWeb 공수 입력에 매주 30분~1시간이 소요됐습니다.",
          cause: "Git 커밋·Google Calendar·사내 HR 시스템이 분리되어 데이터 수집과 문서 작성을 모두 수동으로 처리했습니다.",
          actions: ["FastMCP 기반 8개 도구 구현 (list_commits·get_trips·generate_report·upload_hrweb 등)", "Git 커밋 + 캘린더 병합 → 주간보고 초안 자동 생성 후 Gmail 발송", "HRWeb Playwright 전 흐름 자동화"],
          result: "매주 30분~1시간 걸리던 작업을 단일 명령으로 자동화하고, Cursor·Claude Desktop에서 호출 가능하도록 공유했습니다.",
          oneliner: "주간보고·공수 입력 매주 30~60분 수작업 → FastMCP 8개 도구 구현 → 수작업 제거, 팀 전체 공유",
        },
      ],
    },
    {
      title: "NIPA 위성 변화탐지 AI 플랫폼 — MSA 설계",
      company: "한컴인스페이스",
      period: "2025.07. ~ 진행 중",
      stack: ["FastAPI", "RabbitMQ", "Next.js 15", "CesiumJS", "Go", "ONNX Runtime", "Kubernetes", "Nginx"],
      desc: "두 시점의 위성 영상을 비교해 지표 변화를 AI로 탐지하는 플랫폼. 정보통신산업진흥원(NIPA) 지원 사업으로, MSA + FastAPI 기반으로 재설계했습니다.",
      blocks: [
        {
          label: "비동기 처리 파이프라인 재설계",
          situation: "노드 재시작 시 변화탐지 작업이 RUNNING 상태로 고착되어 수동 DB 복구를 반복했습니다.",
          cause: "Salt 폴링 방식은 작업 완료를 콜백으로 확인해, 노드 재시작 시 콜백이 유실되면 상태 갱신이 불가능했습니다.",
          actions: ["RabbitMQ ack/nack + DLQ 비동기 파이프라인으로 전환", "처리 완료 전 연결이 끊기면 자동 재투입, 3회 초과 시 DLQ 격리"],
          result: "ack 기반 구조로 노드 장애가 작업 유실로 이어지지 않는 구조적 보장을 확보했습니다. (작업 유실 0건)",
          oneliner: "노드 재시작 시 작업 고착·수동 DB 복구 반복 → RabbitMQ ack/nack + DLQ 전환 → 작업 유실 0건",
        },
        {
          label: "서비스 MSA 전환",
          situation: "모놀리식으로 기능 하나를 배포해도 전체 서비스가 재시작되어 잦은 배포마다 서비스 중단이 발생했습니다.",
          cause: "모든 기능이 단일 프로세스로 묶여 도메인 경계 없이 결합된 구조였습니다.",
          actions: ["도메인 경계 기준으로 MSA 분리, 전 서비스 FastAPI 전환, Nginx 라우팅"],
          result: "서비스 간 경계가 명확해져 장애가 격리됐고, 재배포 월 10건→1건, 배포 속도 4분→30초로 개선했습니다.",
          oneliner: "기능 하나 배포에도 전체 서비스 재시작 → 도메인 기준 MSA 분리·FastAPI 전환 → 재배포 월 10건→1건, 배포 4분→30초",
        },
        {
          label: "레거시 프론트엔드 전면 재설계",
          situation: "Thymeleaf 레거시 프론트는 기능 경계가 없어 수정 영향 범위를 예측할 수 없었습니다.",
          cause: "SSR 템플릿 방식이라 컴포넌트 추상화가 없어 재사용이 불가능했습니다.",
          actions: ["Next.js 15 + FSD 전면 마이그레이션", "CesiumJS 커스텀 ImageryProvider — MVT·MBTiles·ImageLayer를 단일 인터페이스로 추상화"],
          result: "컴포넌트 재사용 구조를 확립해, 신규 레이어 타입 추가 시 기존 코드 수정 0건을 달성했습니다.",
          oneliner: "Thymeleaf 수정 영향 범위 예측 불가 → Next.js 15 + FSD 전면 재설계 → 신규 레이어 추가 시 기존 코드 수정 0건",
        },
      ],
    },
    {
      title: "항공우주연구원(KARI) 위성영상 AI 처리 플랫폼",
      company: "한컴인스페이스",
      period: "2023.10. ~ 2025.07.",
      stack: ["Spring Boot", "Go", "PyTorch", "FastAPI", "ONNX Runtime", "Aliyun GPUShare", "Kubernetes", "MyBatis", "Redis"],
      desc: "다누리·Sentinel·Landsat 등 10개 이상 위성 소스를 수집·처리해 객체탐지·세그멘테이션·초해상도 AI 추론 결과를 CesiumJS로 가시화하는 플랫폼. 한국항공우주연구원 납품.",
      blocks: [
        {
          label: "이벤트 유실 해결",
          situation: "Debezium replication slot이 반복 파손되어 전체 스냅샷을 재수행해야 했습니다.",
          cause: "CDC 방식은 DB 로그에 의존해 slot 파손 시 전체 재동기화가 필요했습니다.",
          actions: ["AOP + MyBatis 기반 Outbox 라이브러리 직접 개발", "비즈니스 코드 수정 없이 투명하게 적용"],
          result: "CDC 인프라 의존을 제거하고 애플리케이션 레벨에서 이벤트 보장을 달성했습니다. (이벤트 유실 0건)",
          oneliner: "Debezium slot 반복 파손·전체 재동기화 → Outbox 라이브러리 직접 개발 (CDC 인프라 의존 제거) → 이벤트 유실 0건",
        },
        {
          label: "GPU 자원 활용",
          situation: "AI 추론 처리량이 한계에 부딪혀 작업이 적체됐는데, 정작 GPU 자원의 90%는 유휴 상태였습니다.",
          cause: "스케줄러가 파드 하나에 GPU 한 장을 통째로 할당해, 모델 하나가 메모리 대부분을 비워둔 채 점유하고 있었습니다.",
          actions: ["Aliyun GPUShare로 gpu-mem 단위 분할·분배", "ONNX Runtime 추론 서비스 독립 배포로 모델별 스케일링"],
          result: "GPU 4장에서 70개 파드 병렬 추론으로 일 처리량을 200건에서 3,000건까지 끌어올렸습니다.",
          oneliner: "AI 분석 적체로 납품 일정 위협, GPU 90% 유휴 → GPUShare 분할 + ONNX 독립 배포 → GPU 4장 70파드, 일 200건→3,000건",
        },
        {
          label: "메타데이터 API 성능",
          situation: "위성 메타데이터 조회 API가 38초나 걸렸습니다.",
          cause: "PostGIS 전수 연산을 매 요청마다 수행하는 구조였습니다.",
          actions: ["조건부 실행 + 페이징 + Redis 캐싱 적용"],
          result: "API 응답을 38초에서 159ms로 239배 단축하고, 50VU 부하 테스트 에러율을 11.22%에서 0%로 잡았습니다.",
          oneliner: "위성 검색 API 38초로 실사용 불가 수준 → 조건부 실행·페이징·Redis 캐싱 → 159ms, 에러율 11.22%→0%",
        },
      ],
    },
  ] as DocProject[],

  activities: [
    {
      title: "FESI 13기 — 백엔드 멘토링",
      org: "codeit", year: "2026",
      desc: "프론트엔드 부트캠프 수강생 6명 대상 실무 방식 기반 멘토링 (PR 리뷰, REST API 설계, DDD·TDD 실습).",
      notes: [
        "[동시성] 동시 신청 시 maxMembers 초과 가능 → PESSIMISTIC_WRITE 락 + Batch UPDATE로 원자적 증감 처리",
        "[강결합] 알림 실패가 모임 데이터에 영향 → @TransactionalEventListener(AFTER_COMMIT)로 이벤트 분리, fault tolerance 확보",
        "[성과] 51개 테스트 파일(단위·통합·E2E 3-layer 피라미드) + GitHub Actions CI 구성",
      ],
    },
    {
      title: "스위프(SWYP) 웹 9기 ~ 11기, 앱 4기",
      org: "스위프", year: "2025 ~ 2026",
      desc: "4개 기수에 백엔드·프론트엔드·PM으로 참여하며 팀 프로젝트를 웹·앱으로 출시했습니다.",
      notes: [
        "9기 백엔드(모먼티어), 10기 프론트엔드(축지법), 11기 PM·프론트엔드(위딩), 앱 4기 백엔드(Mapin)",
        "[성과] SWYP 다수 기수 완주 및 배포",
      ],
    },
    {
      title: "항해99 백엔드코스 9기",
      org: "항해99", year: "2025",
      desc: "동시성 제어와 이벤트 드리븐 아키텍처를 실전으로 검증하는 학습 프로젝트.",
      notes: [
        "[좌석 중복 예약] 비관적 락 → Redis 분산락 → 낙관적 락 순으로 전환, k6 + Grafana 부하 테스트로 트레이드오프 검증 → 상위 10% 수료",
        "[분산 트랜잭션] Redis 대기열 → Kafka 전환, Choreography Saga + DLQ로 일관성 확보",
      ],
    },
  ],

  education: [
    { school: "한밭대학교", degree: "대학교(학사) · 융합기술학과", period: "2022.03. ~ 2026.03.", status: "졸업" },
    { school: "대덕소프트웨어마이스터고등학교", degree: "고등학교 · 소프트웨어개발과", period: "2020.03. ~ 2022.03.", status: "졸업" },
  ],

  skills: ["Spring Boot", "Java", "Kotlin", "Python", "Go", "FastAPI", "PostgreSQL", "MySQL", "Redis", "RabbitMQ", "Kafka", "Kubernetes", "Docker", "Next.js"],

  certs: [
    { name: "SQL개발자(SQLD)", issuer: "한국데이터산업진흥원", date: "2025.12.", status: "합격" },
    { name: "정보처리기사", issuer: "한국산업인력공단", date: "2025.06.", status: "합격" },
    { name: "정보기기운용기능사", issuer: "한국산업인력공단", date: "2021.12.", status: "합격" },
    { name: "정보처리기능사", issuer: "한국산업인력공단", date: "2020.12.", status: "합격" },
  ],
};
