import Image from "next/image";

/* ─── Data ─────────────────────────────────────────── */

const profile = {
  name: "안영준",
  title: "Full-Stack Developer",
  email: "ahn479512@gmail.com",
  github: "github.com/Ahnyeongjun",
  githubUrl: "https://github.com/Ahnyeongjun",
  site: "ahnyoungjun.site",
  location: "서울",
  career: "5년차 (2021.07~)",
  company: "한컴인스페이스",
};

const summary = [
  "위성 영상 기반 지도 플랫폼을 처음부터 설계·구현하고, 모놀리식에서 MSA로 전환하며 구조적 문제를 주도적으로 개선해온 백엔드 중심 풀스택 개발자입니다.",
  "하루 수천 건의 위성 영상 처리 파이프라인 설계, 폐쇄망 LDAP 인증, Go 기반 고성능 타일링 API, PyTorch AI 모델 서빙 등 특수 환경에서의 폭넓은 경험을 보유하고 있습니다.",
  "구현에서 끝내지 않고 서비스 구조와 팀 개발 생산성까지 함께 고민합니다.",
];

const techStack = [
  { label: "Backend",  items: ["Spring Boot", "Kotlin", "Java", "FastAPI", "Python", "Go"] },
  { label: "Frontend", items: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Storybook"] },
  { label: "Database", items: ["PostgreSQL", "MySQL", "Oracle", "Redis", "RabbitMQ"] },
  { label: "DevOps",   items: ["Kubernetes", "Docker", "Jenkins", "GitHub Actions", "Kafka", "Nginx"] },
  { label: "AI / ML",  items: ["PyTorch", "YOLOv5", "OpenAI API", "MCP", "SSE Streaming"] },
];

const companyProjects = [
  {
    id: "satellite-platform",
    name: "위성 영상 분석 플랫폼 MSA 전환",
    period: "2022.12 ~ 현재",
    image: "/gis-platform_thum.png",
    tags: ["Spring Boot", "FastAPI", "K8s", "RabbitMQ", "PyTorch", "Next.js", "Storybook"],
    desc: "노후화된 모놀리식 위성 영상 분석 플랫폼을 MSA·이벤트 드리븐 구조로 전환하고, AI 모델 서빙과 프론트엔드 리팩토링까지 주도한 핵심 프로젝트.",
    sections: [
      {
        title: "MSA & 이벤트 드리븐 아키텍처 전환",
        points: [
          "모놀리식 구조에서 도메인별 9개 MSA 서비스로 분리. 초기에는 서비스 경계를 어디서 나눌지 기준이 없었고, 도메인 간 의존성을 정리하는 데만 수개월이 걸림. 결과적으로 각 서비스가 독립 배포 가능해져 재배포 건수가 월 10건 → 1건으로 감소.",
          "동시 요청 환경에서 UUID 방식은 ID 중복과 발생 서버 역추적이 불가능하다는 문제를 발견. Snowflake 알고리즘을 직접 구현해 Timestamp + MachineID + Sequence 조합으로 분산 환경에서의 고유성과 추적 가능성을 동시에 확보.",
          "배포 후 어느 서비스에서 문제가 발생했는지 파악하는 데 평균 3일 이상 소요됐던 구조를 개선. 기능별 플로우 차트 문서화, 테스트 코드 추가, GitHub Actions CI/CD 연동으로 커밋 시점부터 오류를 감지하는 체계를 구축. 고객 오류 대응 속도가 1주 → 당일로 단축.",
          "Spring Cloud Gateway를 통해 인증·로깅·서비스 조합을 중앙화. 각 서비스가 개별적으로 처리하던 인증 로직을 Gateway 한 곳에서 일원화함으로써 각 서비스의 역할 단순화 및 보안 정책 일관성 확보.",
        ],
      },
      {
        title: "AI 모델 서빙 & 프론트엔드",
        points: [
          "SwinTransformer·ConvNeXt(분류), YOLOv26(탐지), UPerNet(영역분할), ChangeStar(변화탐지) 등 4종의 PyTorch 모델을 FastAPI 기반으로 서빙. 모델별 입출력 포맷이 달라 공통 추론 인터페이스를 설계하는 것이 핵심 과제였으며, 어댑터 패턴으로 각 모델을 래핑해 해결.",
          "기존 레거시 Next.js 코드는 페이지 단위로 모든 로직이 섞여 있어 유지보수가 불가능한 상태였음. FSD(Feature-Sliced Design) 아키텍처로 전면 리팩토링하고, Storybook 기반 공통 컴포넌트 라이브러리를 구축해 팀 전체의 UI 일관성 확보 및 공통 모듈 배포 속도를 4분 → 30초로 단축.",
        ],
      },
    ],
    achievements: [
      "재배포 건수 월 10건 → 1건",
      "배포 속도 4분 → 30초",
      "고객 오류 대응 1주 → 당일",
    ],
  },
  {
    id: "image-api",
    name: "영상 타일링 API 서버 고성능화",
    period: "2024.04 ~ 2025.03",
    image: null,
    tags: ["Go", "GDAL", "Redis", "GeoTIFF", "MBTiles", "Nginx", "K8s"],
    desc: "위성 영상 수가 수백 장으로 늘어나면서 WMS 방식의 동적 렌더링이 한계에 도달해 API 응답이 4초 이상 걸리는 문제 발생. WMS→WMTS 전환과 Go 고루틴 병렬 처리로 0.5초 미만까지 단축.",
    sections: [
      {
        title: "WMS → WMTS 전환 및 성능 최적화",
        points: [
          "기존 WMS는 요청마다 영상 전체를 렌더링해 응답 속도가 영상 수에 비례해 악화됐음. 단일 영상 조회는 WMS를 유지하되, 다수 영상 표출은 WMTS 방식으로 전환해 타입별 타일을 사전 생성·캐싱. 동일 타일 요청 시 Redis에서 즉시 반환하는 구조로 변경.",
          "Go 고루틴으로 타일 생성 작업을 병렬화해 처리 속도를 추가 개선. GDAL 기반 GeoTIFF → PNG 변환 파이프라인과 MBTiles 벡터 타일링(줌 레벨·좌표 기반 폴리곤 선별 렌더링)을 구현해 다양한 영상 포맷을 지원.",
          "K8s 환경에서 여러 Replica 간 세션이 충돌하는 문제를 발견. Nginx Ingress의 ip-hash 기반 로드밸런싱으로 세션 유지를 구성하고, 내부적으로 락이 필요 없는 Stateless 구조를 설계해 Replica 확장 시 안정성 확보.",
        ],
      },
    ],
    achievements: [
      "API 응답 4초 → 0.5초 미만",
      "Replica 무중단 수평 확장 확보",
    ],
  },
  {
    id: "admin-page",
    name: "어드민 페이지 인증·권한 시스템 고도화",
    period: "2024.04 ~ 2024.12",
    image: null,
    tags: ["Spring Boot", "Spring Cloud Gateway", "Redis", "PostgreSQL", "JWT"],
    desc: "세션 수가 늘어나면서 권한 변경 시 Redis 전체 세션을 순회해 느려지고, 변경이 일부 서비스에 즉시 반영되지 않는 이중 문제를 Redis 역인덱스 구조 도입으로 해결.",
    sections: [
      {
        title: "세션 관리 최적화 & 보안 강화",
        points: [
          "기존에는 권한 변경 시 Redis에 저장된 전체 세션을 순회(O(n))해 해당 유저의 세션을 찾았음. userId → [sessionId] 역인덱스를 별도 키로 유지하는 구조로 변경해 O(1)로 해당 유저 세션만 즉시 조회·갱신 가능하게 됨. Redis DB를 세션/방문자통계/로그인실패 3개로 분리해 역할별 관리.",
          "IP + userId 단위로 로그인 실패 횟수를 Redis에 카운팅해 4회 초과 시 10분간 인증을 차단하는 브루트포스 방어 로직 구현. TTL을 활용해 일정 시간 후 자동 해제되도록 설계.",
          "재귀 트리 구조 메뉴를 JPA로 조회하면 뎁스가 깊을수록 N+1이 기하급수적으로 증가했음. PostgreSQL WITH RECURSIVE CTE로 단일 쿼리 전환해 DB 왕복 횟수를 1회로 고정.",
          "Spring Cloud Gateway 도입으로 각 서비스에 분산돼 있던 인증·라우팅·로깅을 Gateway 한 곳으로 통합. 각 서비스가 세션을 개별 관리할 필요가 없어지고, 보안 정책 변경 시 Gateway만 수정하면 전체에 반영되는 구조 확립.",
        ],
      },
    ],
    achievements: [
      "세션 조회 O(n) → O(1)",
      "권한 변경 실시간 반영 보장",
    ],
  },
  {
    id: "drone-detection",
    name: "비전 AI 모델 서빙 시스템",
    period: "2021.12 ~ 2023.12",
    image: "/drone-detection_thum.png",
    tags: ["ROS", "YOLOv5", "Faster R-CNN", "PyTorch", "C++", "OpenCV"],
    desc: "드론 탑재 환경이라는 제약 조건(제한된 메모리, 실시간 스트리밍 요구)에서 두 종류의 객체 탐지 AI 모델을 서빙하는 시스템을 개발. Python PyTorch → C++ 전환으로 메모리 문제 해결.",
    sections: [
      {
        title: "Faster R-CNN (ROS 연동)",
        points: [
          "ResNet-FPN 백본 기반 Faster R-CNN으로 6종 객체를 분류·추론. RGB 카메라와 Depth 카메라 데이터를 동기화해 ROS 토픽으로 실시간 스트리밍. UDP 소켓 기반 전송으로 지연 최소화.",
        ],
      },
      {
        title: "YOLOv5 (RTMP 송출)",
        points: [
          "커스텀 데이터셋으로 YOLOv5 모델을 직접 학습하고 가중치를 추출. 초기에는 Python PyTorch로 서빙했으나 드론의 제한된 메모리에서 OOM이 반복 발생. PyTorch C++ API(LibTorch)로 모델을 직접 포팅해 메모리 점유를 대폭 줄이고 안정적인 실시간 추론 달성.",
          "TCP 소켓 + OpenCV로 추론 결과를 RTMP 스트림으로 송출. 지연 허용 범위 내에서 프레임 손실 없이 전송하기 위해 전송 버퍼 크기와 인코딩 품질을 튜닝.",
        ],
      },
    ],
    achievements: [
      "드론 환경 실시간 탐지 스트리밍 구현",
      "C++ 포팅으로 OOM 문제 해결",
    ],
  },
  {
    id: "pipeline",
    name: "영상 전처리 파이프라인 자동화",
    period: "2022.03 ~ 2022.12",
    image: null,
    tags: ["RabbitMQ", "Python", "Saga Pattern", "Docker"],
    desc: "위성 영상 수집 → 보정 → 저장 전처리 과정을 폴더 감시 방식에서 이벤트 드리븐 파이프라인으로 전환. 수동 모니터링이 필요했던 구조를 자동 재처리·장애 추적 체계로 개선.",
    sections: [
      {
        title: "이벤트 드리븐 전환 & 장애 복구",
        points: [
          "기존에는 각 단계가 폴더를 주기적으로 감시하다 파일이 생기면 처리하는 방식이어서 평균 수 분의 대기 시간이 발생했음. RabbitMQ 기반 이벤트 드리븐으로 전환해 각 단계가 완료되는 즉시 다음 큐가 실행되도록 구성. ack/nack 메커니즘으로 메시지 유실 방지.",
          "Saga(Choreography) 패턴을 적용해 각 단계가 성공·실패 이벤트를 발행하도록 설계. 실패 시 보상 트랜잭션이 자동 실행되고 작업 상태가 추적되어, 기존에 하루 이상 걸리던 장애 파악이 2시간 이내로 단축됨. 또한 정상 데이터 처리 실패가 사라지고 실제 문제 데이터만 분리되어 처리.",
        ],
      },
    ],
    achievements: [
      "정상 데이터 실패율 0건",
      "장애 파악 하루 → 2시간 이내",
    ],
  },
  {
    id: "test-cluster",
    name: "K8s 기반 테스트 환경 분리",
    period: "2023.01 ~ 2023.06",
    image: null,
    tags: ["Kubernetes", "Docker", "On-premise"],
    desc: "별도 테스트 환경이 없어 운영 서버에 직접 배포 후 검증하던 구조에서 K8s 클러스터를 논리 분리해 격리된 테스트 환경을 구축. 운영 장애를 대폭 감소시키고 서버 자원도 효율화.",
    sections: [
      {
        title: "테스트 환경 구축",
        points: [
          "온프레미스 서버 5대 중 일부를 K8s 네임스페이스로 논리 분리해 운영과 동일한 테스트 환경을 구성. 네임스페이스 단위 자원 쿼터를 설정해 여러 프로젝트가 동시에 테스트 환경을 사용해도 서로 간섭하지 않는 구조 확립.",
          "테스트 환경 분리 이후 운영 배포 후 장애가 대폭 줄었으며, K8s 클러스터 통합 관리로 서버 5대에서 2대로 줄이는 자원 효율화를 달성. 이 경험을 통해 인프라 설계가 팀 생산성에 직접적인 영향을 미친다는 것을 체감.",
        ],
      },
    ],
    achievements: [
      "운영 장애 대폭 감소",
      "서버 5대 → 2대 자원 효율화",
    ],
  },
];

const sideProjects = [
  {
    name: "모먼티어",
    subtitle: "감정 기반 AI 여행 큐레이팅 서비스",
    period: "2025.04 ~ 2025.05",
    type: "팀 (SWYP 9기) · 7인",
    role: "리드 개발자 — 프론트엔드 + AI 백엔드",
    image: "/momentier_thum.png",
    tags: ["Next.js", "Zustand", "Storybook", "FastAPI", "MCP", "OpenAI", "Tour API"],
    desc: "감정·분위기·취향 기반 AI 여행지 추천 및 일정 자동 생성 서비스. 팀 내 유일한 AI 백엔드 담당자로 MCP 아키텍처를 처음 설계·구현했으며, 프론트엔드도 Next.js·Zustand·Storybook을 처음 도입해 독립 설계.",
    sections: [
      {
        title: "AI 백엔드 (MCP + OpenAI)",
        points: [
          "기존 AI 챗봇은 모든 로직을 하나의 프롬프트에 밀어 넣는 방식이라 기능 추가 시 프롬프트가 비대해지는 문제가 있었음. MCP(Model Context Protocol) 아키텍처를 선택해 OpenAI Agent가 Tour API를 독립된 도구(Tool)로 호출하는 구조로 설계. 여행지 추천·일정 생성 서버를 분리해 각 기능이 독립적으로 확장 가능.",
          "gpt-4.1-mini(여행지 3곳 추천), gpt-4.1(다일정 자동 생성), gpt-4.1-nano(입력 제안)로 작업 복잡도에 따라 모델을 분리 적용해 API 비용을 최적화. FastAPI + SSE 스트리밍으로 AI 응답을 실시간 청크 전송해 체감 응답 속도 개선.",
        ],
      },
      {
        title: "프론트엔드 (Next.js 15 + Zustand)",
        points: [
          "기존 경험이 없는 Next.js·Zustand·Storybook을 이번 프로젝트에서 처음 도입. App Router 기반 5개 주요 페이지와 Zustand persist로 7개 전역 스토어를 설계. 상태 관리를 도메인별로 분리해 컴포넌트 간 불필요한 리렌더링을 방지.",
          "Storybook 8로 Button·Card·Modal 등 공통 컴포넌트를 문서화하고 페이지 단위 시나리오 스토리를 작성. 팀원이 UI 스펙을 개발 환경 없이 확인할 수 있어 디자이너·기획자와의 소통 비용이 크게 줄었음.",
          "카카오 OAuth2 인증, Leaflet 지도·경로 안내, jsPDF 일정 PDF 저장 기능을 직접 구현. 특히 Leaflet과 SSR 환경의 충돌(window is not defined) 문제를 dynamic import로 해결하는 과정에서 Next.js 클라이언트/서버 렌더링 경계에 대한 이해를 심화.",
        ],
      },
    ],
    achievements: ["MCP 기반 AI 백엔드 구조 설계·구현", "Next.js·Zustand·Storybook 첫 도입 아키텍처 설계"],
  },
  {
    name: "Booksight",
    subtitle: "오늘 출간된 책들을 생일처럼 축하하는 서비스",
    period: "2025.04 ~ 2025.07",
    type: "팀 · 6인",
    role: "서브 백엔드",
    image: "/booksight_thum.png",
    tags: ["Kotlin", "Spring Boot 3", "Spring Batch", "QueryDSL", "Redis", "MySQL", "Oracle"],
    desc: "매일 신간 도서를 자동 수집해 제공하는 서비스. Kotlin과 QueryDSL을 처음 도입하면서 Java와의 차이를 체감했고, 대량 초기 데이터 적재 방식을 직접 비교·최적화한 경험이 가장 인상적.",
    sections: [
      {
        title: "배치 파이프라인 & 쿼리 최적화",
        points: [
          "Spring Batch Reader-Processor-Writer 구조로 국립중앙도서관 API → 카카오 API → DB 파이프라인을 구성. 초기 데이터 수십만 건 적재 시 JPA는 영속성 컨텍스트 메모리 문제로, 코루틴 병렬화는 예외 처리 복잡도 증가로 적합하지 않다고 판단. JdbcTemplate batchUpdate로 최종 전환해 안정적인 벌크 적재 달성.",
          "QueryDSL로 제목·저자·출판사를 통합 검색하는 동적 쿼리를 구현. 검색어가 없으면 조건을 아예 제외하는 BooleanBuilder 패턴과, 정렬 기준을 런타임에 동적으로 결정하는 OrderSpecifier 패턴을 처음 체득. 타입 안전성이 보장되어 오타로 인한 런타임 오류가 사라짐.",
          "AOP + Spring Event로 검색 로그를 비동기 수집하고 2차 배치와 연동. external 패키지를 별도로 만들어 국립중앙도서관·카카오 등 외부 연동 책임을 도메인 코드와 완전히 분리한 것이 코드 가독성과 테스트 용이성을 크게 높였음.",
        ],
      },
    ],
    achievements: ["QueryDSL 동적 쿼리 패턴 체득", "external 패키지로 외부 연동 책임 분리"],
  },
  {
    name: "위딩 (With-ing)",
    subtitle: "예비부부를 위한 웨딩 플래너 및 AI 드레스 추천",
    period: "2025.10 ~ 2025.11",
    type: "팀 (SWYP 11기) · 7인",
    role: "PM · 프론트엔드 · AI 추천 · 서버 관리",
    image: "/with-ing_thum.webp",
    tags: ["Next.js", "React Query", "FastAPI", "GPT-4", "DALL-E 2", "Spring Boot", "Docker", "K8s"],
    desc: "웨딩홀·스튜디오·드레스샵 정보 통합 제공 및 GPT-4 드레스 추천·DALL-E 착용 이미지 생성 서비스. PM을 맡으며 기획부터 AI 백엔드·인프라까지 전담. 6주 안에 MVP를 배포해야 하는 빠듯한 일정에서 역할을 분산 수용한 경험.",
    sections: [
      {
        title: "AI 추천 & 비용 최적화",
        points: [
          "체형(6종) × 스타일(90가지)의 540가지 조합에 대해 GPT-4가 매번 호출되면 비용이 감당 불가능한 수준임을 사전에 파악. 조합을 SHA256으로 해시해 MySQL 캐시 키로 사용, 동일 조합 두 번째 요청부터는 DB에서 즉시 반환. 캐시 히트율이 높아질수록 GPT-4 호출 비용이 지속 감소하는 구조.",
          "웨딩홀 추천에서 모든 조건을 AND로 걸면 결과가 0건이 되는 경우가 빈번했음. 조건 우선순위를 정해 주요 조건부터 순차적으로 완화하는 폴백 전략을 구현해 항상 1건 이상 결과를 보장.",
          "DALL-E 2 API로 드레스 착용 이미지를 생성하고, Paramiko SSH로 서버에 직접 업로드하는 파이프라인 구현. SSH 연결 타임아웃·재시도 로직을 추가해 네트워크 불안정 상황에서도 업로드가 완료되도록 처리.",
        ],
      },
      {
        title: "프론트엔드 · 인프라",
        points: [
          "Spring Boot API 서버가 CORS 헤더를 일관되게 반환하지 않는 문제가 있었음. Next.js API Route를 프록시로 활용해 모든 외부 API 호출을 서버 사이드에서 처리하고, Authorization 헤더를 중앙에서 주입하는 구조로 해결.",
          "Claude Code + Figma MCP를 활용해 디자이너의 Figma 파일에서 31개 컴포넌트를 직접 퍼블리싱. 반복 작업을 자동화해 프론트엔드 구현 시간을 대폭 단축.",
          "Docker Compose로 로컬 개발 환경을 통일하고 GitHub Actions로 CI/CD를 구성. 이후 K8s 기반 MSA로 전환해 서비스별 독립 배포 환경을 확립. 6주라는 짧은 기간 안에 MVP 기획부터 배포까지 완료.",
        ],
      },
    ],
    achievements: ["6주 내 MVP 기획→배포", "SHA256 캐싱으로 GPT-4 반복 비용 절감"],
  },
  {
    name: "축지법",
    subtitle: "전국 축제 정보를 지도·달력으로 한눈에",
    period: "2025.07 ~ 2025.08",
    type: "팀 (SWYP 10기) · 6인",
    role: "백엔드",
    image: "/chukjibeob_thum.webp",
    tags: ["Spring Boot 3", "JPA", "QueryDSL", "Spring Batch", "MySQL", "JWT", "OAuth"],
    desc: "전국 축제 정보를 지도·달력 위에서 필터링·탐색하는 서비스. 공공데이터 자동 수집 파이프라인과 지도/달력 두 뷰를 위한 서로 다른 API를 설계하며 같은 데이터를 다양한 관점으로 표현하는 방식을 고민.",
    sections: [
      {
        title: "백엔드",
        points: [
          "Spring Batch로 공공데이터(Tour API) 축제 정보를 자동 수집하는 파이프라인 구성. API 응답 페이지네이션 처리, 중복 축제 데이터 감지·갱신 로직을 포함해 매일 최신 상태를 유지.",
          "지도 뷰는 현재 화면의 경위도 범위(bbox) 기반으로 축제를 조회하고, 달력 뷰는 특정 날짜의 진행 중인 축제를 집계하는 두 가지 API를 설계. 하나의 테이블에서 전혀 다른 쿼리 패턴이 필요해 인덱스 전략을 각각 최적화.",
          "QueryDSL로 지역·테마·일정 복합 필터링을 구현. Spring Security + JWT + 카카오 OAuth2 인증 체계를 구성해 로그인 없이도 기본 탐색이 가능하고, 로그인 시 즐겨찾기 등 개인화 기능을 제공.",
        ],
      },
    ],
    achievements: [],
  },
  {
    name: "SIMVEX",
    subtitle: "3D 분해·조립 시뮬레이션 + AI 어시스턴트 학습 서비스",
    period: "2026.01",
    type: "팀 (블레이버스 해커톤) · 4인",
    role: "프론트엔드",
    image: "/simvex_thum.png",
    tags: ["Next.js", "React Three Fiber", "Three.js", "Zustand", "MSW", "jsPDF"],
    desc: "7가지 기계 장치를 3D로 분해·조립하고 AI 어시스턴트·퀴즈·메모·워크플로우를 통합한 학습 서비스. 해커톤 24시간 내에 React Three Fiber로 3D 인터랙션을 처음 구현한 프로젝트.",
    sections: [
      {
        title: "3D 인터랙션 & 상태 관리",
        points: [
          "React Three Fiber + drei로 3D 뷰어를 구현. OrbitControls로 자유 시점 전환, Bloom·N8AO 후처리로 시각적 품질을 향상. 피보나치 구 분포 알고리즘으로 부품이 사방으로 고르게 퍼지는 분해 애니메이션을 구현해 시각적 임팩트 극대화.",
          "4개 독립 Zustand 스토어(분해레벨·조명·히스토리·타임라인)를 설계. 특히 히스토리 스토어는 Undo/Redo 50단계를 지원하며, Zustand subscribe를 통해 상태 변경 시 3D 오브젝트가 자동으로 동기화되도록 구성해 React와 Three.js 간의 상태 동기화 문제를 해결.",
          "SSE 스트리밍으로 AI 응답을 청크 단위로 수신하고 30ms 간격 타이핑 애니메이션으로 렌더링. jsPDF + html2canvas로 3D 캡처·메모·AI 대화 내용을 PDF 한 장에 내보내는 기능을 구현. MSW로 AI 백엔드 없이도 프론트엔드를 독립 개발할 수 있는 환경 구성.",
        ],
      },
    ],
    achievements: ["피보나치 스피어 분해 애니메이션", "퀴즈·메모·PDF 통합 학습 흐름 설계"],
  },
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
  {
    name: "FESI 13기 백엔드 멘토링",
    period: "2026.03 ~ 04",
    link: "https://github.com/FESI13-3/FESI13-backend",
    linkLabel: "github.com/FESI13-3/FESI13-backend",
    desc: "프론트엔드 개발자 양성 부트캠프(FESI)에서 백엔드 멘토로 참여. 수강생들의 백엔드 질의응답, 코드 리뷰, API 설계 가이드를 담당. Spring Boot 기반 REST API 구현, JPA 연관관계, JWT 인증 등을 실습 기반으로 지도.",
  },
  {
    name: "스위프 (SWYP) 웹 9~11기, 앱 4기",
    period: "2025.01 ~ 2026.04",
    link: null,
    linkLabel: null,
    desc: "프론트엔드·백엔드·기획·디자이너로 구성된 팀 사이드 프로젝트 커뮤니티. 9기(모먼티어), 10기(축지법), 11기(위딩), 앱 4기(Booksight) 총 4개 프로젝트 참여. 각기 다른 역할(리드 개발자·백엔드·PM)로 참여해 도메인 폭을 넓힘. 하단 프로젝트에 상세 내용 기재.",
  },
  {
    name: "항해99 백엔드코스 9기",
    period: "2025.07 ~ 09",
    link: "https://github.com/hanghae99-backend",
    linkLabel: "github.com/hanghae99-backend",
    desc: "Kotlin + Spring Boot 기반 99일 집중 백엔드 과정. TDD(테스트 주도 개발), 동시성 제어(낙관락·비관락·Redis 분산락), Kafka 기반 이벤트 드리븐 아키텍처를 실습. 동시 주문·재고 처리 등 실제 트래픽 시나리오를 코드로 구현하며 동시성 이슈 해결 역량 강화.",
  },
  {
    name: "AI 커리어스쿨",
    period: "2024.06 ~ 09",
    link: null,
    linkLabel: null,
    desc: "Python 기반 데이터 분석·시각화 과정. Pandas·NumPy를 활용한 데이터 정제, Matplotlib·Seaborn을 활용한 시각화, 기초 머신러닝(scikit-learn) 실습.",
  },
];

/* ─── Sub-components ────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 pb-1 border-b border-slate-200">
      {children}
    </h2>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="text-[9px] px-1.5 py-[2px] bg-slate-100 text-slate-500 rounded font-mono">
      {label}
    </span>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <li className="flex gap-2 text-[10.5px] text-slate-600 leading-relaxed">
      <span className="mt-[5px] shrink-0 w-[4px] h-[4px] rounded-full bg-slate-300" />
      {text}
    </li>
  );
}

function A4Page({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`w-[210mm] mx-auto bg-white shadow-xl print:shadow-none print:w-full print:mx-0 ${className}`}
      style={{ minHeight: "297mm", pageBreakAfter: "always", breakAfter: "page" }}
    >
      <div className="h-1.5" style={{ background: "linear-gradient(90deg, #38bdf8, #818cf8, #34d399)" }} />
      <div className="px-10 py-8 h-full">
        {children}
      </div>
    </section>
  );
}

function PageDivider() {
  return <div className="border-t-2 border-dashed border-slate-200 my-4 print:hidden" />;
}

function ProjectBlock({
  name, period, tags, sections, achievements, image, desc, imageSize = "md",
}: {
  name: string; period: string; tags: string[]; desc: string;
  sections: { title: string; points: string[] }[];
  achievements: string[];
  image: string | null;
  imageSize?: "sm" | "md";
}) {
  const w = imageSize === "sm" ? 96 : 112;
  const h = imageSize === "sm" ? 60 : 70;
  return (
    <div>
      <div className="flex gap-4 mb-2">
        {image && (
          <div className="rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-50" style={{ width: w, height: h }}>
            <Image src={image} alt={name} width={w} height={h} className="object-cover w-full h-full" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-[11.5px] font-bold text-slate-800 leading-snug">{name}</p>
            <span className="text-[9.5px] text-slate-400 shrink-0">{period}</span>
          </div>
          <p className="text-[10px] text-slate-500 mb-1.5 leading-snug">{desc}</p>
          <div className="flex flex-wrap gap-1">
            {tags.map((t) => <Tag key={t} label={t} />)}
          </div>
        </div>
      </div>
      <div className={`grid gap-x-5 ${sections.length > 1 ? "grid-cols-2" : "grid-cols-1"} mb-2`}>
        {sections.map((sec) => (
          <div key={sec.title}>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">{sec.title}</p>
            <ul className="space-y-1">
              {sec.points.map((pt, i) => <Bullet key={i} text={pt} />)}
            </ul>
          </div>
        ))}
      </div>
      {achievements.length > 0 && (
        <div className="pl-3 border-l-2 border-blue-200 space-y-0.5">
          {achievements.map((a, i) => (
            <p key={i} className="text-[10px] text-blue-600 font-medium">✦ {a}</p>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Document ──────────────────────────────────────── */

export function PortfolioDocument() {
  return (
    <div className="space-y-6 print:space-y-0">

      {/* ══ Page 1: Profile ══ */}
      <A4Page>
        {/* Header */}
        <header className="flex gap-6 pb-6 border-b border-slate-200 mb-6">
          <div className="w-[72px] h-[72px] rounded-xl overflow-hidden shrink-0 border border-slate-200">
            <Image src="/profile.jpg" alt="안영준" width={72} height={72} className="object-cover w-full h-full" />
          </div>
          <div className="flex-1">
            <div className="flex items-end gap-3">
              <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-none">{profile.name}</h1>
              <p className="text-[12px] text-slate-400 font-medium pb-0.5">{profile.title}</p>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">{profile.career} · {profile.company}</p>
            <div className="flex gap-3 mt-1.5 text-[10px] text-slate-400">
              <span>{profile.email}</span>
              <span>·</span>
              <a href={profile.githubUrl} className="text-sky-500">{profile.github}</a>
              <span>·</span>
              <span>{profile.site}</span>
            </div>
          </div>
        </header>

        {/* Summary */}
        <div className="mb-6">
          <SectionTitle>소개</SectionTitle>
          <div className="space-y-1">
            {summary.map((s, i) => (
              <p key={i} className="text-[10.5px] text-slate-600 leading-relaxed">{s}</p>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <SectionTitle>기술 스택</SectionTitle>
          <div className="space-y-2.5">
            {techStack.map((cat) => (
              <div key={cat.label} className="flex gap-3 items-center">
                <span className="text-[10px] font-semibold text-slate-500 w-20 shrink-0">{cat.label}</span>
                <div className="flex flex-wrap gap-1">
                  {cat.items.map((item) => <Tag key={item} label={item} />)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education + Certs + Activities */}
        <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-6">
          <div>
            <SectionTitle>학력</SectionTitle>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.school}>
                  <p className="text-[10.5px] font-semibold text-slate-700">{edu.school}</p>
                  <p className="text-[9.5px] text-slate-500">{edu.major}</p>
                  <p className="text-[9.5px] text-slate-400">{edu.period} · {edu.note}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle>자격증</SectionTitle>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.name} className="flex gap-2 items-baseline">
                  <span className="text-[9.5px] text-slate-400 w-8 shrink-0">{cert.year}</span>
                  <span className="text-[10.5px] text-slate-700">{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2">
            <SectionTitle>활동 / 교육</SectionTitle>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {activities.map((act) => (
                <div key={act.name}>
                  <div className="flex items-baseline justify-between gap-2 mb-0.5">
                    <p className="text-[10px] font-semibold text-slate-700 leading-snug">{act.name}</p>
                    <span className="text-[9px] text-slate-400 shrink-0">{act.period}</span>
                  </div>
                  {act.link && (
                    <a href={act.link} className="text-[9px] text-sky-500 block mb-0.5">{act.linkLabel}</a>
                  )}
                  <p className="text-[9.5px] text-slate-500 leading-snug">{act.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </A4Page>

      <PageDivider />

      {/* ══ Page 2: Company Projects 1~3 ══ */}
      <A4Page>
        <SectionTitle>경력 — 한컴인스페이스 · 연구원 (2021.07 ~ 현재, 5년차)</SectionTitle>
        <div className="space-y-6">
          {companyProjects.slice(0, 3).map((proj, idx) => (
            <div key={proj.id} className={idx < 2 ? "border-b border-slate-100 pb-5" : ""}>
              <ProjectBlock {...proj} />
            </div>
          ))}
        </div>
      </A4Page>

      <PageDivider />

      {/* ══ Page 3: Company Projects 4~6 ══ */}
      <A4Page>
        <SectionTitle>경력 — 한컴인스페이스 (계속)</SectionTitle>
        <div className="space-y-6">
          {companyProjects.slice(3).map((proj, idx) => (
            <div key={proj.id} className={idx < companyProjects.slice(3).length - 1 ? "border-b border-slate-100 pb-5" : ""}>
              <ProjectBlock {...proj} imageSize="sm" />
            </div>
          ))}
        </div>
      </A4Page>

      <PageDivider />

      {/* ══ Page 4: Side Projects 1~2 ══ */}
      <A4Page>
        <SectionTitle>프로젝트</SectionTitle>
        <div className="space-y-6">
          {sideProjects.slice(0, 2).map((proj, idx) => (
            <div key={proj.name} className={idx < 1 ? "border-b border-slate-100 pb-5" : ""}>
              <div className="flex gap-4 mb-2">
                <div className="w-[112px] rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-50" style={{ height: 70 }}>
                  <Image src={proj.image} alt={proj.name} width={112} height={70} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <div>
                      <p className="text-[12px] font-bold text-slate-800 leading-none">{proj.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">{proj.subtitle}</p>
                    </div>
                    <span className="text-[9.5px] text-slate-400 shrink-0">{proj.period}</span>
                  </div>
                  <p className="text-[9px] text-slate-400 mb-1.5">{proj.type} · {proj.role}</p>
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.map((t) => <Tag key={t} label={t} />)}
                  </div>
                </div>
              </div>
              <p className="text-[10.5px] text-slate-600 mb-2.5 leading-relaxed">{proj.desc}</p>
              <div className={`grid gap-x-5 ${proj.sections.length > 1 ? "grid-cols-2" : "grid-cols-1"} mb-2`}>
                {proj.sections.map((sec) => (
                  <div key={sec.title}>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">{sec.title}</p>
                    <ul className="space-y-1">
                      {sec.points.map((pt, i) => <Bullet key={i} text={pt} />)}
                    </ul>
                  </div>
                ))}
              </div>
              {proj.achievements.length > 0 && (
                <div className="pl-3 border-l-2 border-blue-200 space-y-0.5">
                  {proj.achievements.map((a, i) => (
                    <p key={i} className="text-[10px] text-blue-600 font-medium">✦ {a}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </A4Page>

      <PageDivider />

      {/* ══ Page 5: Side Projects 3~5 ══ */}
      <A4Page>
        <SectionTitle>프로젝트 (계속)</SectionTitle>
        <div className="space-y-6">
          {sideProjects.slice(2).map((proj, idx) => (
            <div key={proj.name} className={idx < sideProjects.slice(2).length - 1 ? "border-b border-slate-100 pb-5" : ""}>
              <div className="flex gap-4 mb-2">
                <div className="w-[96px] rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-50" style={{ height: 60 }}>
                  <Image src={proj.image} alt={proj.name} width={96} height={60} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <div>
                      <p className="text-[11.5px] font-bold text-slate-800 leading-none">{proj.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">{proj.subtitle}</p>
                    </div>
                    <span className="text-[9.5px] text-slate-400 shrink-0">{proj.period}</span>
                  </div>
                  <p className="text-[9px] text-slate-400 mb-1.5">{proj.type} · {proj.role}</p>
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.map((t) => <Tag key={t} label={t} />)}
                  </div>
                </div>
              </div>
              <p className="text-[10.5px] text-slate-600 mb-2.5 leading-relaxed">{proj.desc}</p>
              <div className={`grid gap-x-5 ${proj.sections.length > 1 ? "grid-cols-2" : "grid-cols-1"} mb-2`}>
                {proj.sections.map((sec) => (
                  <div key={sec.title}>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">{sec.title}</p>
                    <ul className="space-y-1">
                      {sec.points.map((pt, i) => <Bullet key={i} text={pt} />)}
                    </ul>
                  </div>
                ))}
              </div>
              {proj.achievements.length > 0 && (
                <div className="pl-3 border-l-2 border-blue-200 space-y-0.5">
                  {proj.achievements.map((a, i) => (
                    <p key={i} className="text-[10px] text-blue-600 font-medium">✦ {a}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </A4Page>

    </div>
  );
}
