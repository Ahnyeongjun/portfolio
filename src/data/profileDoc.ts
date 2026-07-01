// Document content for the /resume (Rallit) and /portfolio-pdf (Wanted) pages.
// Single source of truth synced with lib/projects.ts achievements.
/* eslint-disable */

export interface DocBlock {
  label: string;
  situation: string;
  cause: string;
  actions: string[];
  result: string;
  oneliner?: string; // 이력서용 한 줄 요약 (단순한 항목)
  lines?: string[];  // 이력서용 다중 줄: [문제, 해결·선택근거, 결과]
  brief?: [string, string]; // 이력서용 2줄: [현상·원인, 해결·결과]
}
export interface DocProject {
  title: string;
  company: string;
  period: string;
  stack: string[];
  desc: string;
  blocks: DocBlock[];
  badge?: string; // 예: "사내 개인", "납품"
}

export const PROFILE = {
  name: "안영준",
  role: "백엔드 개발자",
  email: "ahn479512@gmail.com",
  github: "github.com/Ahnyeongjun",
  githubUrl: "https://github.com/Ahnyeongjun",
  location: "서울, Korea",

  tagline: "백엔드에서 시작해, 서비스 전체를 만드는 엔지니어",
  summary: [
    {
      head: "폐쇄망 배포, 에러를 사전에 잡다",
      body: "외부 기관의 폐쇄망에 납품·배포하는 환경에서는 한 번 터진 에러를 곧바로 손볼 수 없어, 배포 후가 아니라 배포 전에 문제를 잡는 데 집중했습니다. k6 부하테스트와 테스트 클러스터 통합 테스트를 도입해 50VU 동시 요청 기준 에러율을 11%에서 0%로 낮추고 잘못된 배포를 사전에 걸러냈습니다. 모놀리식 구조를 도메인 단위 9개 서비스로 분리한 MSA 전환으로는 전체 재배포를 월 10건에서 1건으로, 사내 에러 문의를 주 2~3회에서 월 1회로 줄였습니다.",
    },
    {
      head: "최적화는 백엔드 밖에도 있었다",
      body: "주 도메인은 백엔드이지만, 병목이 백엔드 안에서만 생기지는 않았습니다. jQuery·Thymeleaf 레거시를 Next.js 15·FSD 아키텍처로 전면 마이그레이션해 프론트 렌더링을 정리했고, CesiumJS 커스텀 ImageryProvider로 이종 레이어 통신 방식을 단일 인터페이스로 추상화했습니다. AI 모델을 직접 학습해 OBB/HBB 탐지(mAP50 0.644)와 세그멘테이션(mIoU 0.7205)을 서빙했고, GPUShare로 GPU 4장에 70파드를 동시 운영하며 일 처리량을 200건에서 3,000건으로 끌어올렸습니다.",
    },
    {
      head: "반복은, 자동화로",
      body: "프로젝트를 거듭하며 같은 종류의 수동 작업이 반복되는 것을 보고, 사람이 손대지 않아도 되는 부분부터 자동화로 옮겼습니다. FastMCP 기반 사내 에이전트를 만들어 Git 커밋 이력 정리, 캘린더 일정 동기화, HRWeb 근태 처리를 통합했고, ML 실험 기록·학습 파라미터·결과 비교를 자동 관리하는 실험 자율화 에이전트를 구축해 Slack 알림까지 연동했습니다. 이 자동화로 운영 부담이 줄면서 1인 담당 서비스는 1개에서 5개로, 재배포는 월 10건에서 1건으로, 사내 에러 문의는 주 2~3회에서 월 1회로 줄었습니다. 이 경험을 더 큰 트래픽과 더 복잡한 운영 환경에서 이어가고 싶습니다.",
    },
  ],

  highlights: [
    { v: "10건 → 1건", l: "재배포 / 월" },
    { v: "4분 → 30초", l: "배포 속도" },
    { v: "38초 → 159ms", l: "메타데이터 API" },
    { v: "GPU 4장 → 70파드", l: "GPUShare 병렬 추론" },
    { v: "1개 → 5개", l: "1인 담당 서비스" },
  ],

  career: {
    company: "한컴인스페이스",
    position: "연구원 · 소프트웨어플랫폼 · 재직 중",
    period: "2021.07. ~ 재직 중 (5년)",
    overview: "입사 후 약 2년간 개발환경을 구축하고 사내 서버를 관리했으며, 이후 한국항공우주연구원(KARI)·국가보안기관·정보통신산업진흥원(NIPA) 등 국가기관을 대상으로 위성영상 AI 플랫폼을 설계·개발하고 Kubernetes 기반 서버 배포와 운영을 담당했습니다.",
    metrics: ["재배포 월 10건→1건", "배포 4분→30초", "메타데이터 API 38초→159ms", "GPU 4장 70파드 병렬 추론", "이벤트 유실 0건"],
    groups: [
      {
        title: "AI 처리 플랫폼 풀스택 개발",
        items: [
          "위성영상 탐지·세그멘테이션·변화탐지 AI 파이프라인 설계·운영",
          "MSA 전환·배포 자동화 — 재배포 월 10건→1건, 배포 4분→30초",
          "k6 부하테스트 기반 API 최적화 — PostGIS 38초→159ms, 에러율 11%→0%",
          "AOP+MyBatis Outbox 라이브러리 직접 개발 — CDC 인프라 의존 제거, 이벤트 유실 0건",
        ],
      },
      {
        title: "AI 모델 학습·추론",
        items: [
          "객체탐지·세그멘테이션 모델 학습·서빙 — mAP50 0.644, mIoU 0.7205",
          "추론 가용성 확보 — GPU 4장 70파드 동시 운영, 처리량 200→3,000건/일",
          "janus 워크플로우 엔진 개발 — 10개 이상 위성 소스 단일 파이프라인, 신규 소스 추가 코드 수정 0건",
        ],
      },
      {
        title: "사내 자동화 에이전트 개발",
        items: [
          "FastMCP 에이전트 — Git·캘린더·HRWeb 통합, 문서 자동화",
          "ML 실험 자율화 에이전트 — cronjob으로 학습 루프 자동 실행·기록, Claude Skill·Hook 기반 실험기록 표 자동 생성, Slack 알림",
        ],
      },
    ],
  },

  projects: [
    {
      title: "NIPA 위성 변화탐지 AI 플랫폼 — MSA 설계",
      company: "한컴인스페이스",
      period: "2025.07. ~ 진행 중",
      stack: ["RabbitMQ", "Next.js 15", "TypeScript", "CesiumJS", "FastAPI", "Go", "ONNX Runtime", "Kubernetes"],
      desc: "두 시점의 위성영상을 비교해 지표 변화를 AI로 탐지하는 플랫폼입니다. NIPA(정보통신산업진흥원) 지원 사업으로, MSA + FastAPI 기반으로 재설계하며 RabbitMQ 비동기 파이프라인과 Next.js 15 FSD 프론트엔드를 처음 도입했습니다.",
      blocks: [
        {
          label: "비동기 처리 파이프라인",
          situation: "Salt 폴링 ack/nack 없어 노드 재시작 시 작업 RUNNING 고착",
          cause: "완료 콜백 구조로 노드 재시작 시 콜백이 유실되면 상태 갱신 불가",
          actions: [
            "RabbitMQ ack/nack + DLQ 비동기 파이프라인으로 전환",
            "처리 완료 전 연결 끊기면 자동 재투입, 3회 초과 시 DLQ 격리",
          ],
          result: "작업 유실 0건",
          brief: [
            "Salt 폴링이 ack/nack를 지원하지 않아, 완료 콜백 유실 시 작업이 RUNNING 상태로 고착되어 수동 DB 복구 필요",
            "RabbitMQ ack/nack + DLQ 비동기 파이프라인으로 전환, 연결 단절 시 자동 재투입·3회 초과 시 DLQ 격리",
          ],
          lines: [
            "Salt 폴링 ack/nack 없어 노드 재시작 시 작업 RUNNING 고착 — 수동 DB 복구 반복",
            "RabbitMQ ack/nack + DLQ 비동기 파이프라인으로 전환 — 처리 완료 전 연결 끊기면 자동 재투입, 3회 초과 시 DLQ 격리",
            "작업 유실 0건",
          ],
        },
        {
          label: "MSA 전환",
          situation: "모놀리식으로 기능 하나 배포 시 전체 서비스 재시작",
          cause: "모든 기능이 단일 프로세스로 결합, 도메인 경계 없음",
          actions: [
            "MSA 분리, 전 서비스 FastAPI 전환, Nginx 라우팅",
          ],
          result: "재배포 월 10건→1건, 배포 속도 4분→30초",
          brief: [
            "모든 기능이 단일 프로세스로 결합돼 도메인 경계 부재, 기능 하나 배포에도 전체 서비스 재시작으로 배포 시마다 운영 중단",
            "도메인 단위 9개 서비스로 분리, 전 서비스 FastAPI 통일·Nginx 라우팅",
          ],
          lines: [
            "모놀리식으로 기능 하나 배포 시 전체 재시작 — 잦은 배포마다 운영 중단 발생",
            "MSA 분리, 전 서비스 FastAPI 전환, Nginx 라우팅 — 서비스별 독립 배포·장애 격리 확보",
            "재배포 월 10건→1건, 배포 속도 4분→30초",
          ],
        },
        {
          label: "폐쇄망 분산 ID",
          situation: "분리망 환경에서 외부 코디네이터 접근 불가",
          cause: "UUID로는 장애 시 발생 서버 추적 불가",
          actions: [
            "Snowflake 알고리즘 직접 구현",
            "worker ID 비트에 망 정보(서브넷·서버) 인코딩해 ID만으로 발생 서버 특정",
          ],
          result: "worker ID만으로 발생 서버 특정 가능",
          brief: [
            "외부와 분리된 폐쇄망으로 ID 코디네이터 부재, UUID로는 장애 발생 서버 추적 불가",
            "Snowflake 알고리즘 직접 구현, worker ID 비트에 망 정보(서브넷·서버) 인코딩",
          ],
          lines: [
            "분리망 환경으로 외부 ID 코디네이터 접근 불가 — UUID로는 장애 시 발생 서버 추적 불가",
            "Snowflake 알고리즘 직접 구현 — worker ID 비트에 망 정보(서브넷·서버) 인코딩해 ID만으로 발생 서버 특정",
            "worker ID만으로 발생 서버 특정 가능",
          ],
        },
        {
          label: "레거시 프론트 재설계",
          situation: "Thymeleaf 레거시에 기능 경계 없어 수정 영향 범위 예측 불가",
          cause: "컴포넌트 추상화 없는 SSR 방식으로 재사용 불가",
          actions: [
            "Next.js 15 + FSD 전면 마이그레이션",
            "CesiumJS 커스텀 ImageryProvider — MVT·MBTiles·ImageLayer 이종 레이어 단일 인터페이스 추상화",
          ],
          result: "신규 레이어 추가 시 기존 코드 수정 0건",
          brief: [
            "jQuery에서 Thymeleaf로 이어진 레거시 프론트, 컴포넌트 추상화 없어 기능 경계 모호·작은 수정에도 영향 범위 예측 불가",
            "Next.js 15·FSD 전면 마이그레이션, CesiumJS 커스텀 ImageryProvider로 이종 레이어 단일 인터페이스 추상화",
          ],
          lines: [
            "Thymeleaf 레거시에 기능 경계 없어 수정 영향 범위 예측 불가 — 회귀 위험으로 작은 수정도 전체 수동 검증",
            "Next.js 15 + FSD 전면 마이그레이션, CesiumJS 커스텀 ImageryProvider — MVT·MBTiles·ImageLayer 이종 레이어 단일 인터페이스 추상화",
            "신규 레이어 추가 시 기존 코드 수정 0건",
          ],
        },
      ],
    },
    {
      title: "항공우주연구원(KARI) 위성영상 AI 처리 플랫폼 구축",
      company: "한컴인스페이스",
      period: "2023.10. ~ 2025.07.",
      stack: ["Spring Boot", "Go", "PyTorch", "FastAPI", "ONNX Runtime", "Kubernetes", "Aliyun GPUShare", "MyBatis", "Redis", "Salt-Stack"],
      desc: "다누리·Sentinel·Landsat 등 10개 이상 위성 소스를 수집·처리해 객체탐지·세그멘테이션·초해상도 AI 추론 결과를 CesiumJS 뷰어로 가시화하는 플랫폼입니다. 한국항공우주연구원(KARI)에 납품했으며, Outbox 패턴 라이브러리·Aliyun GPUShare·janus 워크플로우 엔진을 이 프로젝트에서 설계·구현했습니다.",
      blocks: [
        {
          label: "이벤트 유실 해결",
          situation: "Debezium replication slot 반복 파손으로 전체 스냅샷 재수행",
          cause: "CDC 방식은 DB 로그에 의존해 slot 파손 시 전체 재동기화 필요",
          actions: [
            "AOP + MyBatis Outbox 라이브러리 직접 개발",
            "비즈니스 코드 수정 없이 투명하게 적용",
          ],
          result: "CDC 인프라 의존 제거, 이벤트 유실 0건",
          brief: [
            "CDC가 DB 로그에 의존해 Debezium replication slot 파손 시마다 전체 스냅샷 재수행, 그때마다 수 시간 운영 중단",
            "AOP·MyBatis 기반 Outbox 라이브러리 직접 개발, 비즈니스 코드 수정 없이 투명하게 적용",
          ],
          lines: [
            "Debezium replication slot 반복 파손 — 전체 스냅샷 재수행마다 수 시간 운영 중단",
            "AOP + MyBatis Outbox 라이브러리 직접 개발 — CDC 인프라 의존 없이 애플리케이션 레벨 이벤트 보장, 비즈니스 코드 수정 없이 적용",
            "CDC 인프라 의존 제거, 이벤트 유실 0건",
          ],
        },
        {
          label: "GPU 자원 활용",
          situation: "1파드=1GPU 강제로 자원 90% 유휴",
          cause: "스케줄러가 GPU 한 장 통째로 할당, 모델이 VRAM 일부만 사용 중에도 독점",
          actions: [
            "Aliyun GPUShare aliyun.com/gpu-mem 단위 분할",
          ],
          result: "GPU 4장에서 70파드 병렬 추론, 일 처리량 200건→3,000건",
          brief: [
            "스케줄러가 GPU를 한 장씩 통째로 할당, 모델이 메모리 일부만 사용해도 GPU 독점으로 처리량 한계·자원 90% 유휴",
            "Aliyun GPUShare aliyun.com/gpu-mem 단위로 GPU 메모리 분할",
          ],
          lines: [
            "1파드=1GPU 강제로 자원 90% 유휴 — AI 처리량 한계인데 GPU 대부분이 유휴 상태",
            "Aliyun GPUShare aliyun.com/gpu-mem 단위 분할",
            "GPU 4장에서 70파드 병렬 추론, 일 처리량 200건→3,000건",
          ],
        },
        {
          label: "관심정보 객체탐지·세그멘테이션 성능 향상",
          situation: "위성영상 특성으로 범용 augmentation이 오히려 성능 저하",
          cause: "회전 augmentation 역효과, 다종 센서 색감 도메인 차이",
          actions: [
            "YOLOv11m OBB/HBB 이원 탐지 20클래스 서빙",
            "회전 augmentation 역효과 실험으로 확인·제거",
            "다종 센서 색감 차이를 도메인 매칭 전처리로 보정",
          ],
          result: "HBB mAP50 0.644 / OBB 0.604, UPerNet+ConvNeXt mIoU 0.7205",
          brief: [
            "위성영상 특성상 회전 증강 역효과, 센서별 색감 차이로 범용 augmentation 적용 시 정확도 저하",
            "YOLOv11m OBB/HBB 20클래스 서빙, 역효과 augmentation 실험 제거·센서별 도메인 매칭 전처리",
          ],
          lines: [
            "YOLOv11m OBB/HBB 이원 탐지 20클래스, UPerNet+ConvNeXt 세그멘테이션 서빙",
            "회전 augmentation 역효과 실험으로 확인·제거, 다종 센서 색감 차이를 도메인 매칭 전처리로 보정",
            "HBB mAP50 0.644 / OBB 0.604, mIoU 0.7205",
          ],
        },
        {
          label: "위성 소스 통합",
          situation: "소스별 하드코딩으로 신규 위성 추가 시 파이프라인 전체 수정",
          cause: "다누리·Sentinel·Landsat 등 소스마다 처리 로직이 개별 하드코딩되어 표준화되지 않음",
          actions: [
            "janus 워크플로우 엔진 직접 설계·구현",
            "H_BASE/S_BASE 추상화로 소스별 처리 로직을 표준 인터페이스로 통일",
          ],
          result: "10개 이상 위성 소스를 단일 파이프라인으로 통합, 신규 소스 추가 시 코드 수정 0건",
          brief: [
            "다누리·Sentinel·Landsat 등 위성 소스마다 처리 로직이 하드코딩돼 있어, 신규 위성이 추가될 때마다 파이프라인 전체를 수정해야 했습니다.",
            "janus 워크플로우 엔진을 설계해 H_BASE/S_BASE로 소스별 처리 로직을 추상화, 10개 이상 소스를 단일 파이프라인으로 통합했습니다.",
          ],
          lines: [
            "소스별 하드코딩으로 신규 위성 추가 시 파이프라인 전체 수정 필요",
            "janus 워크플로우 엔진 설계, H_BASE/S_BASE 추상화로 소스별 처리 로직 표준화 — 10개 이상 소스 단일 파이프라인 통합",
            "10개 이상 위성 소스를 단일 파이프라인으로 통합, 신규 소스 추가 시 코드 수정 0건",
          ],
        },
        {
          label: "부하테스트 기반 성능 개선",
          situation: "PostGIS 전수 연산으로 위성 메타 API 38초 소요",
          cause: "필터 없이 전체 레코드에 매 요청마다 공간연산 수행",
          actions: [
            "조건부 실행으로 연산 대상 축소",
            "커서 페이징으로 메모리 압력 해소",
            "Redis 캐싱으로 반복 연산 제거",
          ],
          result: "159ms (239배 단축), 50VU 에러율 11.22%→0%",
          brief: [
            "필터 없이 매 요청마다 전체 레코드에 PostGIS 공간연산 수행, API 응답 38초·50VU 부하 시 에러율 11% 초과",
            "조건부 실행으로 연산 대상 축소, 커서 페이징·Redis 캐싱 적용",
          ],
          lines: [
            "PostGIS 전수 연산으로 위성 메타 API 38초 소요 — 50VU 에러율 11.22%",
            "조건부 실행 + 커서 페이징 + Redis 캐싱 — 계층별로 효과 독립 검증",
            "159ms (239배 단축), 에러율 11.22%→0%",
          ],
        },
      ],
    },
    {
      title: "Git · 캘린더 · HRWeb 통합 MCP 에이전트 개발",
      company: "한컴인스페이스",
      period: "2026.03. ~ 2026.04.",
      badge: "사내 개인",
      stack: ["Python", "FastMCP", "MCP", "Playwright", "Gmail API", "Google Calendar API"],
      desc: "FastMCP 기반 Gmail·캘린더·Git·HRWeb 통합 자동화 에이전트입니다. 주간보고 작성·공수 입력 등 반복 수작업을 자동화해 팀 전체에 공유했습니다.",
      blocks: [
        {
          label: "반복 수작업 자동화",
          situation: "주간보고 작성·HRWeb 공수 입력에 매주 30~60분 소요",
          cause: "Git·캘린더·HR 시스템이 분리되어 수집·작성 모두 수동",
          actions: [
            "FastMCP 8개 도구 구현 — list_commits·get_trips·generate_report·upload_hrweb 등, Cursor·Claude Desktop에서 호출 가능",
            "Git 커밋+캘린더 병합 → 엑셀 생성 → Gmail 발송 단일 명령 자동화",
            "HRWeb(아마란스) Playwright 전 흐름 자동화",
          ],
          result: "수작업 전 과정 제거, Claude Desktop·Cursor에서 팀 전체 호출 가능",
          brief: [
            "Git·캘린더·HR 시스템이 분리돼 있어 주간보고 작성과 HRWeb 공수 입력을 매주 30~60분씩 수동으로 처리했습니다.",
            "FastMCP로 8개 도구를 구현해 Git 커밋과 캘린더를 병합·엑셀 생성·Gmail 발송까지 단일 명령으로 자동화하고, 팀 전체가 Claude Desktop·Cursor에서 호출할 수 있게 했습니다.",
          ],
          lines: [
            "주간보고 작성·HRWeb 공수 입력에 매주 30~60분 소요 — Git·캘린더·HR 시스템이 분리되어 수집·작성 모두 수동",
            "FastMCP 8개 도구 구현 — list_commits·get_trips·generate_report·upload_hrweb 등, Git 커밋+캘린더 병합 → 엑셀 생성 → Gmail 발송 단일 명령 자동화",
            "수작업 전 과정 제거, Claude Desktop·Cursor에서 팀 전체 호출 가능",
          ],
        },
      ],
    },
    {
      title: "ML 실험 자율 오케스트레이터 — Claude Code 에이전트 설계",
      company: "한컴인스페이스",
      period: "2026.05. ~ 2026.06.",
      badge: "사내 개인",
      stack: ["Claude Code", "Python", "Shell Script", "Slack API"],
      desc: "Claude Code를 ML 실험 루프 오케스트레이터로 설계해 반복 엔지니어링을 AI에 위임했습니다. cronjob·Skill·Hook·work_history를 조합해 실험 판단→실행→기록→재판단 사이클을 자율 운영합니다.",
      blocks: [
        {
          label: "ML 실험 자율 루프",
          situation: "ML 실험 루프(초기화→학습→검증→기록→다음 실험 결정)를 엔지니어가 수동으로 순환",
          cause: "각 단계 완료 후 사람이 결과를 보고 다음 실험을 결정해야 해 자리를 비우면 실험이 멈춤",
          actions: [
            "cronjob으로 Claude Code Skill을 주기적으로 실행, work_history를 읽고 다음 실험 판단",
            "Hook+sh로 학습 프로세스 자동 실행",
            "실험 결과를 work_history에 기록 → 다음 판단 인풋으로 재투입하는 자율 루프 구성",
            "Slack WebHook으로 완료·에러 실시간 알림",
          ],
          result: "엔지니어 개입 없는 연속 실험 가능 — AI를 코드 보조가 아닌 반복 엔지니어링 위임 에이전트로 운영",
          brief: [
            "ML 실험 루프의 각 단계마다 사람이 결과를 보고 다음 실험을 결정해야 해서, 자리를 비우면 실험이 멈추고 재개할 때 맥락을 다시 파악해야 했습니다.",
            "cronjob으로 Claude Code Skill을 주기적으로 실행해 work_history를 읽고 다음 실험을 판단하게 하고, Hook으로 학습을 자동 실행·기록·재투입하는 자율 루프를 구성해 엔지니어 개입 없는 연속 실험을 가능하게 했습니다.",
          ],
          lines: [
            "ML 실험 루프를 엔지니어가 수동 순환 — 자리 비우면 실험 멈추고 재개까지 맥락 재파악 필요",
            "cronjob으로 Claude Code Skill 주기 실행 → work_history 읽고 다음 실험 판단, Hook+sh 학습 자동 실행, 결과 재기록 → 재판단 자율 루프 — Slack 완료·에러 실시간 알림",
            "엔지니어 개입 없는 연속 실험 가능 — AI를 코드 보조가 아닌 반복 엔지니어링 자체를 위임하는 자율 에이전트로 운영",
          ],
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
      title: "제4회 블레이버스 MVP 개발 해커톤",
      org: "블레이버스", year: "2026",
      desc: "기계공학 3D 학습 플랫폼 SIMVEX 개발 — @react-three/fiber 기반 3D 분해·조립 시뮬레이션 및 SSE 스트리밍 AI 어시스턴트 구현.",
      notes: [
        "부품이 같은 방향으로 분해되어 겹치는 문제를 피보나치 스피어 알고리즘으로 해결 — 균일한 분해 애니메이션 구현",
        "SSE 스트리밍 AI 응답으로 학습 흐름 끊김 없이 실시간 표시",
      ],
    },
    {
      title: "스위프(SWYP) 웹 9기 ~ 11기, 앱 4기",
      org: "스위프", year: "2025 ~ 2026",
      desc: "4개 기수에 백엔드·프론트엔드·PM으로 참여하며 팀 프로젝트를 웹·앱으로 출시했습니다.",
      notes: [
        "9기 백엔드(모먼티어), 10기 프론트엔드(축지법), 11기 PM·프론트엔드(위딩), 앱 4기 백엔드(Mapin)",
        "SWYP 다수 기수 완주 및 배포",
      ],
    },
    {
      title: "항해99 백엔드코스 9기",
      org: "항해99", year: "2025",
      desc: "동시성 제어와 이벤트 드리븐 아키텍처를 실전으로 검증하는 학습 프로젝트. 상위 10% 수료.",
      notes: [
        "[좌석 중복 예약] 비관적 락 → Redis 분산락 → 낙관적 락 순으로 전환, k6 + Grafana 부하 테스트로 트레이드오프 검증",
        "[분산 트랜잭션] Redis 대기열 → Kafka 전환, Choreography Saga + DLQ로 일관성 확보",
      ],
    },
    {
      title: "AI 커리어스쿨",
      org: "멋쟁이사자처럼", year: "2024",
      desc: "Python 기반 데이터 분석 및 시각화 학습 — 위성 영상 데이터 파이프라인·AI 모델 서빙 업무의 데이터 처리 흐름 이해에 기반이 됨.",
      notes: [],
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
