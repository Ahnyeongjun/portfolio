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
  /** 포폴(/portfolio-pdf) 전용 - 이 블록이 다루는 처리를 요청 흐름 등 번호 시퀀스로 보여줄 때. */
  flow?: { step: string; desc: string }[];
  /** 포폴(/portfolio-pdf) 전용 - AS-IS 한 줄을 짧은 태그 체인으로 보여줄 때 (예: ["Debezium CDC", "slot 반복 파손"]). */
  asisTags?: string[];
  /** 포폴(/portfolio-pdf) 전용 - TO-BE 한 줄을 짧은 태그 체인으로 보여줄 때. */
  tobeTags?: string[];
  /** 포폴(/portfolio-pdf) 전용 - 이 블록의 구조/흐름 변경 전후를 보여주는 다이어그램(SVG 등) 경로. 앱 화면 캡처 금지, 박스+텍스트 다이어그램만. */
  image?: string;
  /** 포폴(/portfolio-pdf) 전용 - 글만으로는 이해가 어려운 극소수 블록에만 붙이는 박스형 전후 다이어그램(CSS로 직접 렌더, 이미지 파일 아님). */
  diagram?: "cdc-outbox" | "war-session" | "rabbitmq-queue" | "cluster-ha" | "nvme-trace" | "query-tuning" | "otel-observability" | "jenkins-argocd" | "gpu-share" | "k6-ci" | "docker-cache" | "ai-agent-mcp" | "ai-agent-mcp-playwright" | "rolling-update" | "claude-workflow-pipeline" | "db-api-centralize" | "provisioning-ansible" | "msa-boundary" | "wedding-cache" | "terraform-ansible-aws" | "health-index";
  /** 이력서(/resume) 전용 - true면 이 블록을 이력서 프로젝트 성과 목록에서 뺀다 (포폴엔 계속 전부 노출). 구현 디테일이 짙은 항목을 이력서에서만 솎아낼 때 사용. */
  resumeHide?: boolean;
}
/** 포트폴리오(/portfolio-pdf)는 경력 칸을 따로 두지 않고 이 키로 항목을 프로젝트별로 나눠 싣는다.
 *  이력서(/resume)는 기존처럼 경력 섹션에 그룹별로 렌더한다. 키가 없으면 프로젝트 무관(사내 공통). */
export type ProjKey = "insops" | "kari" | "nipa" | "drone";
export interface CareerItem {
  text: string;
  sub?: string[];
  proj?: ProjKey;
  /** 포폴(/portfolio-pdf)의 해당 프로젝트 blocks[]에서 이미 다루는 내용이라 담당 업무 목록에서 뺀다. 이력서(/resume)는 영향 없음. */
  coveredByBlock?: boolean;
}
export interface CareerGroup {
  title: string;
  period?: string;
  items: CareerItem[];
}
export interface DocProject {
  /** CareerItem.proj 와 짝을 이루는 키 (포폴에서 경력 항목을 이 프로젝트 밑으로 모을 때 사용) */
  pkey?: ProjKey;
  title: string;
  company: string;
  period: string;
  stack: string[];
  desc: string;
  blocks: DocBlock[];
  badge?: string; // 예: "사내 개인", "납품"
  logo?: string;
  screenshot?: string;
  archImage?: string;
  /** 포폴(/portfolio-pdf) 전용 - 개요 밑에 태그+화살표 체인으로 보여줄 전체 아키텍처/요청 흐름. archImage 대체용. */
  archFlow?: { step: string; desc: string }[];
}
export interface SkillGroup {
  category: string;
  items: string[];
}

export const PROFILE = {
  name: "안영준",
  role: "풀스택 개발자 (인프라 메인)",
  email: "ahn479512@gmail.com",
  github: "github.com/Ahnyeongjun",
  githubUrl: "https://github.com/Ahnyeongjun",
  portfolio: "ahnyoungjun.site",
  portfolioUrl: "https://www.ahnyoungjun.site",
  location: "서울, Korea",
  military: "면제",
  /** 헤더에 넣을 프로필 사진 경로 - 비워두면 자리 자체가 렌더링되지 않음. */
  photo: "/profile-suit.jpg" as string | undefined,

  tagline: "5년 차 인프라 중심 풀스택 개발자입니다. k6 부하테스트로 에러율 11.22%→0%·처리량 3배, MSA 전환으로 재배포 10건→1건, DB 튜닝으로 응답속도 239배 단축까지 국가기관 납품 환경에서 수치로 증명되는 성과를 냈습니다. 프레임워크가 못 푸는 문제는 직접 만들어 해결합니다.",
  summary: [
    {
      head: "대규모 요청에도 무너지지 않는 API를 만듭니다",
      body: "국가기관 납품 플랫폼들에서 k6 부하테스트 기반 성능 개선을 주도해 50VU 동시 요청 에러율을 11.22%에서 0%로, 처리량을 392에서 1,177 req/s로 끌어올렸습니다. 병목의 대부분은 DB에 있었고, 조건부 PostGIS 실행·페이지네이션·BLOB 분리·Redis 캐싱으로 위성 메타 목록 조회를 38초에서 159ms로 단축했습니다. 쿼리 한 줄이 서비스 전체의 안정성을 좌우한다는 것을 실무에서 체득했습니다.",
    },
    {
      head: "프레임워크가 못 해주는 것은 직접 만듭니다",
      body: "프레임워크가 감당하지 못하는 인증·이벤트·동시성 문제는 직접 설계해 풀었습니다. 물리 망분리 환경에서 Debezium CDC의 replication slot이 반복 파손되자, Spring AOP + MyBatis Executor 인터셉터로 Outbox 이벤트 아키텍처를 직접 구현해 CDC 인프라 의존을 제거하고 이벤트 유실 0건을 달성했습니다. 폐쇄망이라 분산 ID 코디네이터조차 둘 수 없어, Snowflake worker ID에 망 정보를 인코딩한 전역 유일 ID 발급 체계를 직접 설계했습니다. DRM 암호화 파일이 동시 다운로드 시 조각별로 깨지는 동시성 버그도 바이트 레벨에서 추적해 요청 직렬화로 해결했습니다.",
    },
    {
      head: "한 번 설계해 여러 곳에 재사용되는 구조를 만듭니다",
      body: "여러 기관에 커스텀 납품하지만 핵심 기능(AI 학습·추론·영상 가시화)은 항상 동일해, 매번 중복 구현되며 필요한 부분만 교체하기도, 유지보수하기도 어려웠습니다. 폐쇄망 환경에서는 한 번 터진 에러를 곧바로 손볼 수도 없었기에, 모놀리식을 도메인 단위 9개 서비스로 분리(MSA)하며 버전을 공유하는 구조로 재설계했습니다. 그 결과 기존 모듈 수정 횟수가 1/5로 줄었고, 재배포는 월 10건에서 1건으로 줄었습니다.",
    },
  ],
  summaryClose: "이 경험을 더 큰 트래픽의 컨슈머 서비스에서 이어가고 싶습니다.",

  highlights: [
    { v: "200여 개", l: "API 혼자 설계·구현" },
    { v: "10건 → 1건", l: "재배포 / 월" },
    { v: "6개월 → 1개월", l: "신규 구축 테스트·배포" },
    { v: "38초 → 159ms", l: "메타데이터 API" },
    { v: "GPU 4장 → 70파드", l: "GPUShare 병렬 추론" },
    { v: "1개 → 5개", l: "1인 담당 서비스" },
  ],

  career: {
    company: "한컴인스페이스",
    position: "연구원 · 소프트웨어플랫폼 · 재직 중",
    period: "2021.07. ~ 재직 중 (5년)",
    overview: "입사 후 약 2년간 개발환경을 구축하고 사내 서버를 관리했으며, 이후 한국항공우주연구원(KARI)·국가보안기관·정보통신산업진흥원(NIPA) 등 국가기관을 대상으로 위성영상 처리 플랫폼의 백엔드를 설계·개발하고 Kubernetes 기반 서버 배포와 운영을 담당했습니다.",
    metrics: ["재배포 월 10건→1건", "신규 구축 6개월→1개월", "메타데이터 API 38초→159ms", "GPU 4장 70파드 병렬 추론", "이벤트 유실 0건"],
    groups: [
      {
        title: "프로젝트 개요",
        items: [
          { text: "국가보안기관 위성영상 시스템 - 개발·운영·신규 구축 · 핵심적으로 참여(팀 6명)" },
          { text: "항공우주연구원(KARI) 위성영상 AI 플랫폼의 백엔드·데이터 처리 구축 · 주도(팀 3명)" },
          { text: "NIPA 위성 변화탐지 플랫폼 - MSA 설계 · 주도(팀 5명)" },
          { text: "드론 객체탐지 시스템 - ROS1→ROS2 마이그레이션 · 주도(팀 2명)" },
        ],
      },
      {
        title: "API·아키텍처 설계",
        items: [
          { text: "핵심 도메인 서비스 개발·운영 - 판독보고서(웹 PPT) 생성·어드민·위성 ETL(수집·전처리·적재)·AI 분석 연동 (국가보안기관)", proj: "insops" },
          { text: "레거시 모듈 점진적 전환 주도 - 인증·다운로드 안정화 → 장애 전파 최소화 (국가보안기관)", proj: "insops" },
          { text: "공통 base 모듈·자동화 도구 개발 - 반복 개발 작업 제거 → 신규 테이블 온보딩 효율화 (국가보안기관)", proj: "insops", coveredByBlock: true },
          { text: "Go 영상 서빙 서비스 신규 개발 - WMS·MVT(MBTiles 기반) 지원 (KARI)", proj: "kari" },
          { text: "Go 영상 서빙 서비스 확장 - WMTS 컴포지트·NDJSON 레이어 지원 → 지구/달지도 멀티 레이어 대응 (NIPA)", proj: "nipa" },
          { text: "MSA 마이그레이션 주도 - 모놀리식 9개 서비스 분리 → 재배포 월10건→1건 (NIPA)", proj: "nipa", coveredByBlock: true },
        ],
      },
      {
        title: "데이터·이벤트 파이프라인",
        items: [
          { text: "운영 유연성 중심 무외래키 스키마 설계(정합성은 애플리케이션 레벨 보장) - 입력·삭제·마이그레이션 단순화, 추후 샤딩 시 테이블 분리 저장 가능 (KARI)", proj: "kari" },
          { text: "에어갭 망연계 개선 - 자체 Outbox 모듈 전환 → 이벤트 유실 0건 (KARI)", proj: "kari", coveredByBlock: true },
          { text: "SaltStack 동기 방식에서 RabbitMQ 비동기 파이프라인·단계별 큐 분리 구조로 전환 (KARI)", proj: "kari", coveredByBlock: true },
        ],
      },
      {
        title: "보안·인증",
        items: [
          { text: "보안 취약점 진단·대응 - 브루트포스 차단 구현, 47개 매퍼 SQL Injection 전량 해소 (국가보안기관)", proj: "insops" },
          { text: "보안 게이트웨이·정보 노출 점검 - 서비스 7개 HTTPS 종단을 Nginx 게이트웨이 1곳으로 통합, 정보 노출 여부 점검 (KARI)", proj: "kari" },
          { text: "Envoy Gateway·Keycloak 게이트웨이 구축 - 인증 통합·인증서 자동화, 팀원과 함께 참여 (NIPA)", proj: "nipa" },
        ],
      },
      {
        title: "CI/CD·관측성",
        items: [
          { text: "테스트 문화 정착 주도 - k6·유닛테스트 도입 → 배포 후 에러율 11.22%→0% (KARI)", proj: "kari", coveredByBlock: true },
          { text: "에어갭 환경 장애 대응 체계 수립 - 오프라인 대응 판단 체계화 → 장애 사전 감지 (국가보안기관)", proj: "insops" },
          { text: "CI/CD·GitOps 전환 참여 - Jenkins 명령형 배포 → ArgoCD GitOps (NIPA)", proj: "nipa", coveredByBlock: true },
          { text: "관측성 통합 - Prometheus·OpenSearch·Tempo를 OTel로 수집, 가장 오래 걸리던 사례에서 장애 원인 분석을 4시간 → 20분으로 단축 (NIPA)", proj: "nipa", coveredByBlock: true },
        ],
      },
      {
        title: "인프라·클러스터 운영",
        items: [
          { text: "K8s 워크로드 관리 고도화 - Aliyun GPUShare로 GPU 4장 70파드 병렬 추론, Job→Deployment 전환으로 자동 복구 (KARI)", proj: "kari", coveredByBlock: true },
          { text: "클러스터 인프라 고도화 - Cilium(eBPF) CNI·kube-vip HA·OpenBao 시크릿 중앙화로 클러스터 안정성 확보 (NIPA)", proj: "nipa" },
        ],
      },
      {
        title: "AI·로보틱스",
        items: [
          { text: "AI 모델 직접 학습·서빙 - YOLOv11 객체탐지(HBB mAP50 0.644)·UPerNet 세그멘테이션(mIoU 0.72) (KARI)", proj: "kari" },
          { text: "ROS1(catkin/rospy) → ROS2(colcon/rclpy) 전체 패키지 마이그레이션 설계·구현 (드론)", proj: "drone" },
          { text: "ROS_DOMAIN_ID 기반 멀티 드론 격리 재설계 - 순수 로직 모듈화 + 단위 테스트 검증 (드론)", proj: "drone" },
          { text: "실장비 없는 회귀 검증 체계 구축 - pytest 단위·통합 테스트 17건 통과 (드론)", proj: "drone" },
        ],
      },
      {
        title: "프론트엔드",
        items: [
          { text: "프론트 레거시 마이그레이션 주도 - jQuery·Thymeleaf 정리 → Next.js 15 FSD 기반 웹 뷰어 개발(지구/달지도 멀티 배포) (NIPA)", proj: "nipa" },
        ],
      },
      {
        title: "업무 자동화·지식 전파",
        items: [
          { text: "40여 개 테이블 CRUD 계층 자동 생성 - 테이블당 30분~1시간 걸리던 보일러플레이트 작성을 수 분 내로 단축" },
          { text: "FastMCP 사내 에이전트 개발 - Git·캘린더·HRWeb 통합 → 주 30~60분 수작업 제거" },
          { text: "Claude 스킬·훅 기반 에이전트 개발 - 작업 계획·평가 자동화" },
          { text: "팀원과 함께 PR 리뷰 프로세스를 도입하고 Jira·Bitbucket 연동으로 브랜치 생성을 자동화 — 팀 단위 코드 리뷰 정착 (KARI)", proj: "kari" },
          { text: "CDC·Outbox 아키텍처 팀 내 설명 - 신규 도입 배경·개념 전파 (KARI)", proj: "kari" },
          { text: "WMTS·MSA·Next.js 등 신규 기술 사내 세미나 발표 - 우수성 입증해 팀 도입 설득 (NIPA)", proj: "nipa" },
        ],
      },
    ] as CareerGroup[],
  },

  projects: [
    {
      pkey: "insops",
      title: "국가보안기관 위성영상 시스템 - 개발·운영·신규 구축",
      company: "한컴인스페이스",
      period: "2022.07. ~ 진행 중",
      badge: "핵심적으로 참여(풀스택 4·DB 1·인프라 1)",
      stack: ["Spring Boot", "Java", "PostGIS", "Redis", "Go", "Kubernetes", "Zabbix"],
      desc: "위성영상을 수집·판독해 정부 표준 문서(HWP) 보고서로 산출하는 시스템입니다. API·프론트 개발부터 에어갭 환경 운영, 신규 플랫폼 구축까지 담당했습니다.",
      logo: "/hancominpsace_logo.png",
      archImage: "/insops-satellite_arch.svg",
      archFlow: [
        { step: "사용자·관리자 페이지", desc: "판독·다운로드 UI" },
        { step: "Nginx 게이트웨이", desc: "HTTPS 종단 통합" },
        { step: "API 서버", desc: "Spring Boot·Redis 세션" },
        { step: "인증·인가", desc: "Security 필터+AOP" },
        { step: "Outbox → 반대편 DB", desc: "망연계 이벤트 동기화" },
      ],
      blocks: [
        {
          diagram: "war-session",
          asisTags: ["WAR별 로컬 세션", "재로그인 필요"],
          tobeTags: ["Redis 세션 외부화", "SESSION 공유 쿠키", "session:user 인덱스"],
          label: "다중 WAR 세션 공유 - Spring Session + Redis 세션 외부화 → 서버 간 재로그인 제거",
          situation: "시스템이 멀티모듈로 나뉘며 하나의 Tomcat에 여러 WAR가 함께 올라가는 구조가 됐는데, 단일 애플리케이션을 가정한 세션·쿠키 인증은 WAR마다 세션이 분리돼 사용자가 다른 모듈로 넘어가면 로그인 상태가 공유되지 않았음",
          cause: "기존 세션은 서블릿 컨테이너 로컬 메모리에 저장돼 WAR 간 공유가 불가능했고, 그렇다고 완전히 무상태(stateless)인 JWT만 쓰면 이번엔 반대로 '이 사용자가 지금 몇 세션 접속 중인지'를 알 수 없고 강제 로그아웃·세션 즉시 무효화도 어려워지는 문제가 있었음",
          actions: [
            "세션 저장소를 Tomcat 로컬 메모리에서 Redis(@EnableRedisHttpSession, DB 0)로 외부화하고, JSESSIONID를 SESSION으로 rename한 공유 쿠키(HttpOnly·Secure·SameSite=Lax)로 여러 WAR가 같은 세션을 공유하도록 구성 - 토큰·JWT 없이 세션 쿠키만으로 해결",
            "프론트 서버는 SESSION 쿠키로 API의 /auth/session-check를 호출해 인증을 재구성 - 세션 검증 책임을 API 서버 한 곳으로 위임",
            "session:user 인덱스로 사용자별 활성 세션을 추적해 동시 로그인 통제·강제 무효화가 가능하도록 함(완전 stateless였다면 불가능), 모듈 단위로 점진적으로 전환해 장애 전파 최소화",
          ],
          result: "서버 간 재로그인 없는 세션 공유 확보, 세션 가시성·강제 무효화 확보, JWT 없이 세션 쿠키만으로 구현",
          brief: [
            "멀티모듈·다중 WAR로 나뉘며 WAR마다 세션이 갈려 서버 간 재로그인이 필요했고, 완전 무상태 토큰만으로는 활성 세션 추적·강제 무효화가 불가능",
            "Spring Session + Redis로 세션을 외부화하고 SESSION 공유 쿠키로 다중 WAR 세션 공유, session:user 인덱스로 세션 가시성 확보, 프론트는 /auth/session-check로 위임",
          ],
        },
        {
          asisTags: ["권한 체크 분산", "지적사항 10건+"],
          tobeTags: ["필터+AOP 분리", "SQLi 0건"],
          label: "인증·인가 필터+AOP 분리 - 권한 체크 일원화 → SQLi 47매퍼 해소",
          situation: "엔드포인트가 늘수록 컨트롤러마다 권한 체크 코드가 흩어져 누락·중복 위험이 커졌고, 동시 로그인 통제·로그인 시도 공격 방어도 필요했으나 세션 식별자만으로는 '이 사용자가 몇 세션 접속 중인가'를 답하기 어려웠음. 고위험 엔드포인트도 조회 API와 동일하게 무제한 호출이 가능했고, 외부 보안 진단에서 CSP 미비·SQL Injection 등 10건 이상을 지적받음",
          cause: "인증과 인가 로직이 분리되지 않고 각 컨트롤러에 개별 구현되어 있어 신규 API마다 권한 체크를 매번 새로 작성해야 했고, 세션 저장 구조만으로는 사용자 기준 역조회가 어려웠음. 지도 라이브러리(CesiumJS)가 eval·인라인 스타일에 의존해 CSP를 강하게 걸면 화면이 깨지는 제약도 있었음",
          actions: [
            "인증은 Spring Security 필터 체인에서 일괄 처리, 인가는 커스텀 어노테이션 + AOP로 선언적으로 분리 - 신규 API는 어노테이션만 붙이면 권한 검증 적용",
            "앞서 구축한 session:user 인덱스를 활용해 로그인 실패를 IP·계정 단위로 카운트, 5회 초과 시 차단 - 차단 해제는 TTL 자동 만료로 처리",
            "필터+AOP 2계층 위험도 기반 Rate Limiting(HIGH 5회/분~MEDIUM 20회/분) 도입, 로그인 실패 카운트는 Redis INCR로 락-프리 처리하고 Redis 장애 시 로그인은 막지 않는 fail-open 정책 채택",
            "CSP를 API origin 기반 런타임 동적 생성으로 전환, CesiumJS의 eval 패턴을 소스 레벨에서 직접 패치해 CSP 위반 없이 동작하도록 우회, 47개 매퍼의 SQL Injection 해소 - 정적 쿼리 13개는 파라미터 바인딩, 동적 정렬에 쓰이는 34개는 컬럼명 화이트리스트 검증으로 전환",
          ],
          result: "권한 적용 누락 구조적 방지, 로그인 무차별 대입 차단 실증, 보안 진단 지적사항 10건 이상 해소, 47개 매퍼 SQL Injection 전량 해소",
          brief: [
            "컨트롤러마다 권한 체크 코드가 분산돼 누락·중복 위험이 컸고, Burp 시뮬레이션에서 브루트포스가 그대로 통했으며, 외부 보안 진단에서 CSP 미비·SQL Injection 등 10건 이상 지적",
            "인증은 Spring Security 필터, 인가는 커스텀 어노테이션+AOP로 분리, 기존 session:user 인덱스를 활용한 IP·계정별 로그인 시도 횟수 제한(5회 초과 차단, TTL 자동 해제), CSP 런타임 동적 생성, 47개 매퍼 SQL Injection을 파라미터 바인딩·화이트리스트 검증으로 해소",
          ],
        },
        {
          label: "파일 다운로드 안정화 - 엔드포인트 분리·중단 시 재시작 → 단일 인터페이스·이어받기",
          asisTags: ["엔드포인트 분리", "이어받기 없음"],
          tobeTags: ["단일 인터페이스", "Range 이어받기"],
          situation: "일반 다운로드와 대용량(INNORIX) 다운로드 엔드포인트가 분리돼 있어 클라이언트가 경우마다 다르게 처리해야 했고, 다운로드가 중단되면 처음부터 다시 받아야 했으며, DRM 암호화 파일은 동시 다운로드 시 조각별 재암호화로 깨졌음",
          cause: "다운로드 경로가 파일 크기·종류에 따라 갈려 인터페이스가 일관되지 않았고, 이어받기 지원이 없어 중단 시 전량 재전송이 필요했으며, DRM 재암호화가 요청별로 병렬 수행되며 같은 파일 조각을 동시에 건드려 바이트가 깨지는 동시성 버그가 있었음",
          actions: [
            "일반/대용량 엔드포인트를 하나로 통합하고 스트리밍 기반 이어받기를 지원",
            "DRM 재암호화를 요청 직렬화로 처리해 조각별 재암호화 동시성 버그 해결",
          ],
          result: "일반/대용량 단일 인터페이스로 통합, 중단 지점부터 재개 가능, DRM 파일 깨짐 제거",
          brief: [
            "일반/대용량(INNORIX) 다운로드 엔드포인트가 분리돼 클라이언트가 경우마다 다르게 처리해야 했고, 중단 시 처음부터 다시 받아야 했으며, DRM 암호화 파일은 동시 다운로드 시 조각별 재암호화로 깨졌음",
            "엔드포인트를 통합하고 스트리밍 기반 이어받기를 지원, DRM 재암호화는 요청 직렬화로 동시성 버그를 해결",
          ],
        },
        {
          label: "제네릭 base 모듈·자동 생성 - CRUD 반복 제거 → 스키마 2세대 재사용",
          asisTags: ["테이블마다 CRUD 반복"],
          tobeTags: ["제네릭 base 모듈", "자동 생성 도구", "AOP 에러 로깅"],
          situation: "40여 개 테이블마다 Controller·Service·Mapper·Entity를 반복 작성하고 있었고, 장애 발생 시에도 서비스마다 에러 로그 형식이 달라 원인 파악에 시간이 걸림",
          cause: "테이블마다 컬럼 타입·제약조건에 맞춰 CRUD 계층 전체를 손으로 작성해야 하는 반복 작업이었고, 에러 로깅도 각 서비스 로직에 직접 끼워 넣는 방식이라 빠뜨리기 쉬웠음",
          actions: [
            "CRUD Controller·Service·Mapper·Entity를 제네릭 기반으로 추상화한 base 모듈을 구현해 상속만으로 반복 계층을 재사용하도록 구성",
            "information_schema에서 컬럼·PK·precision을 읽어 타입·검증 애노테이션을 자동 매핑하고, CRUD/검색 mapper를 자동 생성하는 도구를 직접 구현",
            "AOP 기반 에러 로깅을 base 모듈에 공통 적용해 서비스 로직과 무관하게 일관된 에러 기록 확보",
          ],
          result: "신규 테이블 온보딩 보일러플레이트 제거, 스키마 2세대 전환에도 재사용, 에러 로깅 누락 구조적 방지",
          brief: [
            "40여 개 테이블마다 CRUD 계층(Controller·Service·Mapper·Entity)을 반복 작성했고, 에러 로깅도 서비스마다 제각각이라 원인 파악이 느림",
            "제네릭 기반 base 모듈로 CRUD 계층 추상화(상속 구조), information_schema 기반 mapper·entity 자동 생성 도구 구현, AOP 기반 공통 에러 로깅 적용",
          ],
        },
      ],
    },
    {
      pkey: "kari",
      title: "항공우주연구원(KARI) 위성영상 AI 플랫폼의 백엔드·데이터 처리 구축",
      company: "한컴인스페이스",
      period: "2023.10. ~ 2025.07.",
      badge: "주도(풀스택 1·인프라 1·AI 1)",
      stack: ["Spring Boot", "Go", "PyTorch", "ONNX Runtime", "FastAPI", "Kubernetes", "Aliyun GPUShare", "RabbitMQ"],
      desc: "다누리·Sentinel·Landsat 등 10개 이상 위성 소스를 일 5,000건 이상(파생 작업 포함 약 6배) 규모로 수집·처리해 AI 추론 결과를 CesiumJS 뷰어로 가시화하는 플랫폼입니다. 한국항공우주연구원(KARI)에 납품했으며, 팀 내 유일한 백엔드 담당자로 API 200여 개를 설계·구현했습니다. 영상 ETL 작업 분배는 SaltStack 폴링 방식을 쓰다가, 처리 프로세스가 죽으면 job이 무한 고착되는 문제로 RabbitMQ 이벤트 발행-구독으로 대체했습니다.",
      logo: "/kari_logo.svg",
      screenshot: "/kari_web.png",
      archImage: "/kari-satellite_arch.svg",
      archFlow: [
        { step: "프론트엔드 3페이지", desc: "사용자·관리자·인트로" },
        { step: "Nginx 게이트웨이", desc: "HTTPS 종단·경로 라우팅" },
        { step: "API·Auth·타일 서버", desc: "Spring Boot·Go, API 200여 개" },
        { step: "수집·ETL", desc: "SaltStack, 위성 10+ 소스" },
        { step: "AI 추론", desc: "FastAPI+ONNX, GPUShare" },
        { step: "Jenkins → Nexus", desc: "빌드·k6·배포 파이프라인" },
      ],
      blocks: [
        {
          asisTags: ["사후적 sh 스크립트", "에러율 11.22%"],
          tobeTags: ["k6+유닛테스트 CI", "에러율 0%"],
          label: "k6·유닛테스트 도입 - 동시 부하 문제 사전 검출 → 에러율 11.22%→0%",
          situation: "부하테스트는 문제가 생길 때마다 사후적으로 추가되는 sh 스크립트뿐이라 미래 대비가 어려웠고, 유닛테스트 문화도 없었음",
          cause: "sh 스크립트는 이미 발생한 문제만 막을 뿐 동시 부하 상황에서만 드러나는 문제는 재현할 방법이 없었고, 유닛테스트 부재로 트랜잭션 경계·동기화 로직의 결함도 사전에 잡을 수 없었음",
          actions: [
            "가상 유저 플로우를 정의하고 k6로 부하테스트 진행",
            "API 200여 개 규모 시스템에 유닛테스트 도입",
          ],
          result: "에러율 11.22%→0%·처리량 392→1,177 req/s, 유저·권한 insert 트랜잭션 분리 버그·동기화 레이스 컨디션 등 트랜잭션 범위 문제 다수 발견·수정",
          brief: [
            "부하테스트가 사후적 sh 스크립트뿐이라 동시 부하 상황에서만 드러나는 문제를 재현할 방법이 없었고, 유닛테스트 부재로 트랜잭션 경계·동기화 로직 결함도 사전에 잡을 수 없었음",
            "가상 유저 플로우를 정의해 k6 부하테스트 도입, API 200여 개 규모 시스템에 유닛테스트 도입",
          ],
        },
        {
          diagram: "cdc-outbox",
          asisTags: ["Debezium CDC", "자가치유 시도", "여전히 유실"],
          tobeTags: ["CDC 의존 제거", "Outbox 패턴", "유실 0건"],
          label: "CDC → Outbox 전환 - CDC 인프라 의존 제거 → 이벤트 유실 0건",
          situation: "에어갭 환경이라 DB 동기화도 파일 전송으로만 가능했습니다. 초기엔 Debezium CDC로 변경분을 캡처해 Go로 파일에 저장→전송→반대편에서 적재하는 구조를 만들었고, 이 과정에서 분산 ID(Snowflake)·멱등키 설계와 bytea/EWKB 인코딩 처리도 함께 했습니다.",
          cause: "폐쇄망 네트워크가 자주 끊기며 replication slot이 반복 파손됐습니다. 자동 재생성하는 자가치유 로직을 붙였지만 재생성 도중 일부 데이터가 유실됐고, 복구를 위해 양쪽 DB를 통째로 비교하는 로직도 비용이 컸으며, 파일 처리도 병렬화돼 있지 않아 건별로 느리게 처리됐습니다.",
          actions: [
            "정합성 요구 낮은 테이블만 외래키 제외하는 스키마로 설계",
            "Debezium 파일 동기화 구조에 Snowflake 분산 ID·멱등키 재설계, bytea는 LargeBinary, EWKB는 전용 디코더로 정리",
            "slot 파손 자동 재생성 자가치유를 붙였지만 데이터 유실이 남고 파일 처리도 병렬화돼 있지 않아 비효율적이어서, CDC 기반 동기화 구조의 한계를 분석하고 Outbox 패턴으로 전환해 망연계 구간은 파일을 병렬로 저장·전송하는 전용 Python 서버를 새로 작성 - CRUD와 이벤트를 같은 트랜잭션에 적재해 애플리케이션 레벨에서 이벤트 일관성을 보장",
          ],
          result: "향후 데이터 규모 증가에 대응 가능한 구조 확보, CDC 인프라 의존·slot 파손 리스크 제거, 병렬 파일 처리로 효율 개선, 이벤트 유실 0건",
          brief: [
            "파일로만 통신 가능한 에어갭 환경이라 Debezium CDC를 파일 전송으로 우회했으나, 폐쇄망 네트워크 불안정으로 slot이 반복 파손되고 자가치유로도 재생성 중 데이터 유실·비싼 DB 비교 복구 비용이 남았으며, 파일 처리도 병렬화되지 않아 비효율적이었음",
            "CDC 기반 동기화 구조의 한계를 분석해 Outbox 패턴으로 전환하고 망연계 구간은 파일을 병렬로 저장·전송하는 전용 Python 서버를 직접 작성, CRUD와 이벤트를 같은 트랜잭션에 적재·배치 전송해 애플리케이션 레벨에서 이벤트 일관성을 보장",
          ],
        },
        {
          label: "폴링 → RabbitMQ 이벤트 전환 - job 고착 해소 → 워커 1→15개, 위성영상 300장 처리 30분→3분",
          diagram: "rabbitmq-queue",
          asisTags: ["SaltStack job 폴링", "무한 고착"],
          tobeTags: ["RabbitMQ 이벤트", "워커 1→15개", "처리 30분→3분"],
          situation: "영상 ETL 작업 기준 일 5,000건 이상에 파생 작업까지 더하면 약 6배 규모로 늘어, 부하의 대부분이 사용자 트래픽이 아닌 파이프라인 처리량에서 발생했습니다. SaltStack job 폴링(00 대기·01 진행·02 완료·03 실패) 구조라 처리 프로세스가 죽으면 job이 01(진행) 상태에 무한히 머물렀고, 고정 주기(1분) 폴링으로 대기 낭비도 있었습니다.",
          cause: "job 상태 전이를 처리 프로세스 자신이 책임지는 구조라, 프로세스가 죽으면 복구가 불가능했습니다. 타임아웃으로 땜질하기보다 폴링 구조 자체를 바꾸기로 판단했고, 병렬 처리도 job을 다건 등록하는 방식보다 이벤트 발행-구독 방식이 구조적으로 더 효율적이라고 봤습니다.",
          actions: [
            "RabbitMQ 기반 이벤트 발행-구독으로 전환하고, 수집·전처리·추론·후처리 단계별로 큐를 분리해 병목 단계만 워커를 확장할 수 있도록 구성했습니다.",
            "파드를 다중화·클러스터링해 처리 프로세스 장애가 나도 다른 파드가 이어받도록 격리했습니다.",
          ],
          result: "job이 무한 진행 상태에 머무는 문제를 근본적으로 해결하고 폴링 대기 낭비를 제거했습니다. 처리 워커를 1개에서 15개까지 확장 가능한 구조로 개선해 영상 ETL 작업(300장 기준) 처리 시간을 30분에서 3분으로 줄였습니다.",
          brief: [
            "SaltStack job 폴링 구조에서 처리 프로세스가 죽으면 작업이 진행 상태에 무한히 고착됐고, 고정 주기(1분) 폴링으로 대기 낭비도 있었습니다.",
            "RabbitMQ 이벤트 발행-구독으로 전환하고 단계별로 큐를 분리해 병목 단계만 워커를 1개에서 15개까지 확장 — 영상 ETL 작업(300장 기준) 처리 시간 30분→3분.",
          ],
        },
        {
          diagram: "query-tuning",
          asisTags: ["PostGIS 전수 연산", "38초"],
          tobeTags: ["조건부 실행", "인덱스 추가", "단일 트랜잭션", "Redis 캐싱", "159ms"],
          label: "위성 메타 API 쿼리 튜닝 - PostGIS 전수 연산 38초 → 조건부 실행·캐싱으로 159ms",
          situation: "위성 메타 목록 조회 API가 PostGIS 전수 연산으로 38초가 걸렸고, 조회 API가 여러 테이블을 매번 별도 트랜잭션으로 열어 HikariCP 커넥션을 추가로 점유하고 있었음",
          cause: "전체 데이터를 매번 공간 연산으로 훑는 구조라 데이터가 늘수록 응답 시간이 선형으로 늘었고, 테이블별로 트랜잭션을 나눠 여는 방식이 커넥션 풀 여유를 갉아먹고 있었음",
          actions: [
            "조건에 안 걸리는 요청은 PostGIS 공간 연산을 건너뛰도록 조건부 실행 적용",
            "페이지네이션 도입, 알람 로그 테이블에 idx_alam_log_sno·idx_reg_dt 인덱스 추가",
            "여러 테이블을 순회하며 열던 트랜잭션을 단일 트랜잭션으로 통합, 응답 결과는 Redis 캐싱",
          ],
          result: "위성 메타 목록 조회 38초 → 159ms(239배, k6 stress 50VU — 실사용 최대 동시접속 기준·페이지네이션 20건/page 조회 기준)",
          brief: [
            "PostGIS 전수 연산 방식이라 위성 메타 목록 조회가 38초 걸렸고, 테이블별 개별 트랜잭션이 HikariCP 커넥션을 추가로 점유",
            "조건부 실행·페이지네이션·인덱스 추가·단일 트랜잭션 통합·Redis 캐싱 적용 - 159ms(239배) 단축",
          ],
        },
        {
          label: "자체 학습 오케스트레이션 스케줄러 구축 - GPU 인식 큐·장애 격리·웹 대시보드 → 126개 실험 무인 순차 실행",
          situation: "GPU 4장 규모에서 세그멘테이션 모델 실험을 반복해야 했는데, 실험마다 사람이 직접 GPU 점유 상태를 확인하고 순서를 조율해야 했습니다. 수동 실행과 겹치면 같은 GPU를 두 프로세스가 동시에 점유해 학습이 깨졌습니다.",
          cause: "Kubeflow 같은 관리형 MLOps 오케스트레이션은 이 환경(업무망)에 그대로 들여오기 어려웠고, 클러스터에 K8s 노드가 있었지만 단발성 학습 잡을 그 위에 얹기엔 배보다 배꼽이 컸습니다. 실험 대기열·GPU 점유 여부·장애 복구를 전부 사람이 손으로 관리하는 구조가 병목이었습니다.",
          actions: [
            "GPU 점유 상태를 인식해 큐에서 config를 꺼내 torchrun으로 순차 실행하고, GPU가 이미 점유돼 있으면 대기하는 스케줄러를 직접 개발했습니다(queue_ui, 약 1,060줄).",
            "수동으로 실행된 학습 프로세스를 감지해 스케줄러와 충돌하지 않도록 회피 로직을 넣고, start_new_session 기반으로 러너가 죽어도 학습 프로세스는 살아남도록 장애를 격리했습니다.",
            "파일 락(QueueLock)으로 큐 상태 동시성을 보장하고, 재부팅 시에는 큐를 일시정지 상태로 복구해 오작동을 방지했습니다.",
            "REST API와 웹 대시보드를 붙여 GPU·로그를 실시간으로 확인하고 큐 순서를 조작할 수 있게 했고, 크론 기반 GitHub 자동 동기화에는 사내 IP·경로·과제명을 정규식으로 검사해 검출 시 푸시를 차단하는 보안 게이트를 넣었습니다.",
          ],
          result: "126개 실험을 무인으로 순차 실행할 수 있는 구조를 확보했고, 러너 크래시·재부팅 상황에서도 학습이 유실되거나 오작동하지 않도록 만들었습니다.",
          brief: [
            "GPU 4장 규모에서 실험마다 사람이 직접 점유 상태를 확인하고 순서를 조율해야 했고, 수동 실행과 겹치면 같은 GPU를 두 프로세스가 동시에 점유해 학습이 깨졌습니다.",
            "GPU 점유를 인식하는 큐 스케줄러·장애 격리(start_new_session)·파일 락 동시성 제어·REST API+웹 대시보드·보안 게이트(사내정보 유출 차단)를 직접 개발해 126개 실험을 무인 순차 실행했습니다.",
          ],
        },
        {
          label: "라벨 품질 검증 파이프라인 구축 - 지오레퍼런싱 전수 검증으로 라벨 노이즈 성능 천장 규명 → 데이터 품질 개선 전환",
          situation: "세그멘테이션 모델의 mIoU가 여러 구조·손실 함수를 바꿔봐도 특정 구간에서 더 이상 오르지 않았습니다. 원인이 모델링 쪽인지 데이터 쪽인지 불분명했습니다.",
          cause: "클래스별 오분류(FP)를 분석해보니 라벨 자체의 품질을 의심할 근거가 나왔지만, 라벨 1,204장을 사람이 전부 다시 보는 것은 비용이 컸고 라벨-영상 좌표가 실제로 어긋난 타일이 얼마나 되는지 정량화할 방법이 없었습니다.",
          actions: [
            "라벨 품질 검토 파이프라인을 구축해 1,204장 중 312장을 직접 수정하고, 변경된 픽셀 비율을 클래스별로 정량화했습니다(초지 −1.47%, 숲 +0.70%).",
            "md5 대조 기반 전수 무결성 검증으로 수정본과 원본의 차이를 타일 단위까지 확인해 검증(val) 세트 오염 여부를 확인했습니다.",
            "영상과 라벨의 지리좌표를 대조해 자동으로 어긋난 타일을 검출하는 스크립트를 작성했습니다 — 최대 3.93km 어긋난 불량 타일을 발견했고(어긋난 타일들의 중앙값 67.5m, 차상위 355m), 디스크를 추가로 쓰지 않도록 심볼릭 링크 기반으로 라벨만 다른 A/B 데이터셋을 구성해 검증했습니다.",
          ],
          result: "라벨 노이즈가 성능의 실질적 천장(0.71~0.73 구간에서 포화)이라는 것을 데이터로 규명했고, 이후 개선 방향을 모델 구조 탐색에서 데이터 품질로 전환했습니다.",
          brief: [
            "mIoU가 모델 구조·손실 함수를 바꿔도 특정 구간에서 더 오르지 않았는데, 원인이 모델링 쪽인지 데이터 쪽인지 불분명했습니다.",
            "라벨 품질 검토 파이프라인(1,204장 중 312장 수정)·md5 전수 무결성 검증·지오레퍼런싱 자동 대조로 라벨 노이즈가 성능 천장의 원인임을 규명하고, 개선 방향을 데이터 품질로 전환했습니다.",
          ],
        },
        {
          label: "위성 파운데이션 모델 파인튜닝·도메인 갭 분석 - DINOv3 기반 7클래스 세그멘테이션 mIoU 0.7137, ONNX 배포 13일 무중단",
          situation: "위성 소스가 여러 곳(KOMPSAT·NeonSat 등)이라 한 위성으로 학습한 모델이 다른 위성 영상에서는 성능이 크게 떨어지는 도메인 갭 문제가 있었습니다.",
          cause: "일반 ImageNet 사전학습 백본은 위성 영상 특유의 분광·해상도 특성을 충분히 반영하지 못했고, 어느 백본·디코더 조합이 이 도메인에 맞는지, 도메인 갭이 얼마나 되는지 정량 근거가 없었습니다.",
          actions: [
            "위성 특화 파운데이션 모델 DINOv3 ViT-L/16(sat493m)을 부분 동결(24블록)로 파인튜닝하고, DINOv2·DOFA·ConvNeXt·HRNet과 비교 실험 후 dual-backbone 융합 구조로 발전시켰습니다.",
            "UperNet 디코더에 boundary/skeleton 보조 헤드와 ConvNeXt DetailBranch를 추가하고 CE+Tversky+Lovász+Boundary 복합 손실을 구성, 4채널(RGB+NIR) 16bit TIF를 1024×1024로 처리하는 파이프라인을 만들었습니다.",
            "Sentinel 10m 임베딩(AlphaEarth)을 teacher로 하는 지식증류 프로토타입을 구성해 AE 단독 신호를 cosine 0.318 → logreg 0.376 → conv 헤드 0.430까지 끌어올렸고, 타일 기하 분석(1024px@0.7m → 64격자 ≈ 11.2m/px, AE 네이티브 10m에 근접)으로 캐시 해상도 설계를 검증했습니다.",
            "NeonSat 제로샷 평가로 도메인 갭을 −0.17 mIoU로 정량화하고 붕괴 지점을 ground 클래스 IoU 0.248(초지 과다예측)로 특정했으며, PyTorch DDP 3-GPU(torch 2.13+CUDA 13)로 학습한 모델을 ONNX로 export해 gunicorn+uvicorn 추론 API로 배포했습니다.",
          ],
          result: "7클래스 세그멘테이션 mIoU 0.7137을 달성했고(126개 실험), 위성 간 도메인 갭을 클래스 단위로 분해해 개선 우선순위를 도출했습니다. ONNX 배포 추론 서버는 13일 무중단 상주를 확인했습니다.",
          brief: [
            "위성 소스가 여러 곳이라 한 위성으로 학습한 모델이 다른 위성 영상에서는 성능이 크게 떨어졌고, 어느 백본·디코더 조합이 이 도메인에 맞는지 정량 근거가 없었습니다.",
            "DINOv3 위성 파운데이션 모델 파인튜닝·dual-backbone 융합·AlphaEarth 지식증류로 mIoU 0.7137을 달성하고 도메인 갭을 −0.17 mIoU로 정량화했으며, ONNX export 후 gunicorn+uvicorn으로 배포해 13일 무중단 상주를 확인했습니다.",
          ],
        },
      ],
    },
    {
      pkey: "nipa",
      title: "NIPA 위성 변화탐지 플랫폼 - MSA 설계",
      company: "한컴인스페이스",
      period: "2025.07. ~ 진행 중",
      badge: "주도(풀스택 2·인프라 2·AI 1)",
      stack: ["Next.js", "CesiumJS", "FastAPI", "RabbitMQ", "Kubernetes", "Envoy Gateway", "ArgoCD"],
      desc: "두 시점의 위성영상을 비교해 지표 변화를 AI로 탐지하는 플랫폼입니다. NIPA(정보통신산업진흥원) 지원 사업으로, MSA + FastAPI 기반으로 재설계했습니다.",
      logo: "/nipa_logo.svg",
      screenshot: "/gis-platform_thum.png",
      archImage: "/nipa-satellite_arch.svg",
      archFlow: [
        { step: "웹 뷰어", desc: "Next.js 15·CesiumJS" },
        { step: "Envoy Gateway", desc: "경로별 라우팅·인증" },
        { step: "MSA 9개 서비스", desc: "FastAPI 통일" },
        { step: "RabbitMQ", desc: "단계별 큐 분리" },
        { step: "AI 추론", desc: "ONNX 변화탐지" },
        { step: "OTel·OpenBao", desc: "관측 환경·시크릿 중앙화" },
      ],
      blocks: [
        {
          diagram: "msa-boundary",
          label: "모놀리식 → 9개 서비스 MSA 분리 - 중복 구현 제거 → 재배포 월10건→1건",
          asisTags: ["모놀리식", "재배포 월 10건"],
          tobeTags: ["도메인 단위 9개 분리", "FastAPI 통일", "Envoy 라우팅", "재배포 월 1건"],
          situation: "여러 기관에 커스텀 납품하지만 핵심 기능(AI 학습·추론·영상 가시화)은 항상 동일했고, 표적·파워포인트·로깅·인증 등 프로젝트마다 정도 차이는 있는 기능도 재사용되는 경우가 많았음",
          cause: "핵심 기능이 납품 건마다 중복 구현되고 있어, 필요한 부분만 교체하기 어려웠고 유지보수 부담도 컸음. 모놀리식이라 기능 하나 배포에도 전체 서비스 재시작 필요",
          actions: [
            "핵심 기능과 부가 기능(표적·파워포인트·로깅·인증 등)을 도메인 단위 9개 서비스로 분리해 버전 공유",
            "전 서비스 FastAPI 통일, Envoy Gateway로 경로별 라우팅·인증 처리",
          ],
          result: "기존 모듈 수정 횟수 1/5로 감소, 신규 구축 6개월 견적 → 1개월 이내 테스트·배포, 재배포 월10건→1건",
          brief: [
            "여러 기관 커스텀 납품이지만 핵심 기능(AI 학습·추론·영상 가시화)이 납품 건마다 중복 구현돼, 필요한 부분만 교체하기 어렵고 유지보수 부담이 컸음. 모놀리식이라 기능 하나 배포에도 전체 서비스 재시작 필요",
            "핵심·부가 기능(표적·파워포인트·로깅·인증 등)을 도메인 단위 9개 서비스로 분리해 버전 공유, 전 서비스 FastAPI 통일·Envoy Gateway 경로별 라우팅",
          ],
          lines: [
            "여러 기관 커스텀 납품, 핵심 기능(AI 학습·추론·영상 가시화)이 납품 건마다 중복 구현 - 필요한 부분만 교체하기 어렵고 유지보수 부담 큼",
            "핵심·부가 기능을 도메인 단위 9개 서비스로 분리, 버전 공유·전 서비스 FastAPI 통일·Envoy Gateway 라우팅",
            "모듈 수정 횟수 1/5로 감소, 신규 구축 6개월 견적 → 1개월 이내 테스트·배포, 재배포 월 10건→1건",
          ],
        },
        {
          diagram: "otel-observability",
          asisTags: ["9개 서비스 각자 로그", "원인 분석 4시간"],
          tobeTags: ["OTel 통합 관측", "20분 이내"],
          label: "관측성 통합 - 9개 서비스 분리로 추적 복잡 → 장애 분석 시간 단축",
          situation: "모놀리식을 9개 서비스로 분리하면서 로그·트레이스를 통합해서 볼 수 있는 관측 환경 자체가 없었고, 하나의 요청이 여러 서비스를 거치면서 어느 구간에서 문제가 났는지 추적이 복잡해졌음",
          cause: "MSA 특성상 요청이 여러 서비스에 걸쳐 흐르면 단일 서비스 로그만으로는 원인 구간을 특정하기 어려웠고, 통합 관측 환경은 아예 신규로 갖춰야 했음",
          actions: [
            "팀원과 함께 Prometheus·OpenSearch·Tempo·Grafana를 신규 도입해 OpenTelemetry 기반 관측 환경을 새로 구축",
            "Grafana 단일 대시보드에서 로그·트레이스를 함께 조회하고 서비스 간 요청 흐름을 추적하도록 구성",
          ],
          result: "가장 오래 걸리던 사례에서 장애 원인 분석을 4시간 → 20분으로 단축, 요청이 실패한 구간·지연 구간을 로그 수동 추적 없이 대시보드에서 특정",
          brief: [
            "모놀리식을 9개 서비스로 분리하며 통합 관측 환경 자체가 없어, 하나의 요청이 여러 서비스를 거칠 때 원인 구간을 추적하기가 어려웠음",
            "팀원과 함께 Prometheus·OpenSearch·Tempo·Grafana를 신규 도입해 OTel 기반 관측 환경을 새로 갖추고, Grafana 단일 대시보드에서 로그·트레이스 조회 및 서비스 간 요청 흐름 추적",
          ],
        },
        {
          label: "시크릿 중앙화 - 서비스별 분산 관리 → OpenBao+ESO 중앙 저장·자동 주입",
          asisTags: ["서비스별 분산 관리"],
          tobeTags: ["OpenBao 중앙 저장", "ESO 자동 주입"],
          situation: "모놀리식을 9개 서비스로 분리하면서 DB 접속 정보·인증서·API 키 같은 시크릿이 서비스마다 K8s Secret으로 개별 분산 관리됐습니다. 시크릿을 하나 바꾸면 관련 서비스마다 수동으로 반영해야 했고, 어디에 어떤 시크릿이 있는지 중앙에서 한눈에 관리·감사할 수 없었습니다.",
          cause: "각 서비스가 네임스페이스별로 Secret을 들고 있어 로테이션·접근 정책 일원화가 어려웠고, 변경·유출 시 영향 범위 파악도 힘들었습니다.",
          actions: [
            "OpenBao(Vault 호환 오픈소스)를 시크릿 중앙 저장소로 도입해 모든 서비스의 시크릿을 한 곳에서 관리",
            "External Secrets Operator로 OpenBao의 시크릿을 각 서비스의 K8s Secret으로 자동 동기화·주입 - 서비스 코드는 기존처럼 Secret만 참조하도록 유지해 마이그레이션 부담 최소화",
          ],
          result: "서비스별로 흩어진 시크릿을 중앙 저장소로 통합, ESO 자동 주입으로 수동 반영 부담 해소",
          brief: [
            "9개 서비스로 분리되며 DB 접속 정보·인증서·API 키 같은 시크릿이 서비스마다 개별 K8s Secret으로 분산돼, 변경 시 수동 반영이 필요하고 중앙에서 관리·감사할 수 없었음",
            "OpenBao를 시크릿 중앙 저장소로 두고 External Secrets Operator로 K8s Secret에 자동 주입·동기화해, 서비스 코드 변경 없이 시크릿을 중앙에서 일원 관리",
          ],
        },
        {
          diagram: "jenkins-argocd",
          label: "Jenkins → ArgoCD GitOps 전환 - 배포 이력 추적 확보, Pulp로 패키지 저장소 통합",
          asisTags: ["Jenkins 명령형 배포", "이력·롤백 추적 어려움"],
          tobeTags: ["ArgoCD GitOps", "Pulp 통합", "배포 상태 Git 선언·추적"],
          situation: "배포가 Jenkins 명령형 스크립트로 이뤄져 실행 결과가 코드나 상태로 남지 않아 배포 이력·롤백 추적이 어려웠습니다. 아티팩트 저장소도 포맷별로 흩어져 있어 에어갭 반입 패키지 동기화가 수작업이었습니다.",
          cause: "명령형 배포는 '지금 무엇이 실행됐는지'는 남아도 '선언된 상태와 실제 상태가 같은지'는 보장하지 못해, 배포 드리프트가 생겨도 추적이 안 됐습니다.",
          actions: [
            "Jenkins 기반 명령형 배포를 Argo Workflows·Argo Events 기반 CI와 ArgoCD GitOps 구조로 전환 - 배포 상태를 Git으로 선언·추적",
            "포맷별로 흩어진 아티팩트 저장소를 멀티 포맷·미러링에 특화된 Pulp로 통합해 에어갭 반입용 패키지 동기화 일원화",
          ],
          result: "배포 상태를 Git 선언으로 추적 가능해져 드리프트 확인·롤백이 쉬워졌고, 에어갭 반입 패키지 동기화가 Pulp 한 곳으로 통합됨",
          brief: [
            "Jenkins 명령형 배포라 배포 이력·롤백 추적이 어려웠고, 아티팩트 저장소도 포맷별로 흩어져 에어갭 반입 패키지 동기화가 수작업이었음",
            "Argo Workflows·Events 기반 CI + ArgoCD GitOps로 전환해 배포 상태를 Git으로 선언·추적, Pulp로 아티팩트 저장소 통합",
          ],
        },
      ],
    },
    {
      pkey: "drone",
      title: "드론 객체탐지 시스템 - ROS1 → ROS2 마이그레이션",
      company: "한컴인스페이스",
      period: "2026.07.",
      badge: "주도(팀 2명)",
      stack: ["ROS2", "rclpy", "Zenoh", "Python", "Docker", "PyTorch", "pytest"],
      desc: "드론 탑재 RealSense 카메라로 폭발물·화재·부상자를 탐지해 GCS로 전송하는 시스템을 ROS1 Noetic에서 ROS2 Humble로 마이그레이션했습니다. 시스템 아키텍처를 역분석·문서화하고, 격리 구조 재설계부터 회귀 테스트 구축까지 담당했습니다.",
      blocks: [
        {
          label: "멀티 드론 격리 재설계 - ROS_DOMAIN_ID 매핑 순수 로직화 → 기존 격리 아키텍처 재사용",
          situation: "ROS1에서는 프로세스당 ROS_MASTER_URI로 드론을 격리해 여러 드론을 동시 서빙했는데, ROS2에는 Master 개념 자체가 없어 이 격리 구조를 그대로 가져갈 수 없었습니다.",
          cause: "ROS2의 통신 모델(DDS)은 프로세스 단위가 아니라 ROS_DOMAIN_ID 단위로 네트워크를 분리하는 방식이라, 기존 마스터 기반 격리 개념과 직접 매핑되는 지점이 없었습니다.",
          actions: [
            "드론 IP를 ROS_DOMAIN_ID로 매핑하는 domain_map.py를 순수 로직 모듈로 설계 - 명시적 설정이 있으면 우선 사용, 없으면 IP 마지막 옥텟에서 결정론적으로 파생, 1~101 유효 범위로 클램프",
            "단위 테스트로 매핑 로직을 검증해 기존 프로세스당-격리 아키텍처를 그대로 재사용 가능하도록 함",
          ],
          result: "ROS1의 프로세스당 격리 개념을 ROS2 환경에 맞게 대체, 멀티 드론 동시 서빙 구조 유지",
          brief: [
            "ROS1은 프로세스당 마스터 URI로 드론을 격리했는데, ROS2엔 마스터 개념 자체가 없어 기존 격리 구조를 그대로 가져갈 수 없었습니다.",
            "드론 IP를 도메인 ID로 매핑하는 순수 로직 모듈을 설계하고 단위 테스트로 검증해, 기존 프로세스당-격리 아키텍처를 재사용했습니다.",
          ],
        },
        {
          resumeHide: true,
          label: "ROS1→ROS2 전체 패키지 이식 - catkin/rospy → colcon/rclpy 전환",
          situation: "탐지 시스템의 두 패키지(explore_msgs, detector)가 ROS1 표준인 catkin/package.xml format2/rospy 기반으로 작성돼 있어, ROS2로 그대로 실행할 수 없었습니다.",
          cause: "ROS2는 빌드 시스템(colcon)·패키지 포맷(format3)·클라이언트 라이브러리(rclpy)가 ROS1과 전부 달라, 메시지 생성부터 노드 실행 방식까지 전면 재작성이 필요했습니다.",
          actions: [
            "두 패키지를 colcon/format3/rclpy 기반으로 전환하고 메시지 생성을 rosidl로 재구성",
            "메인 로직을 rclpy.node.Node 인스턴스를 인자로 받는 구조로 재작성",
            "하드코딩된 /catkin_ws 절대경로를 DETECTOR_ROOT 환경변수 기반으로 파라미터화",
          ],
          result: "두 패키지 전체를 ROS2 표준 구조로 이식 완료, 환경에 종속적이던 경로 설정 제거",
          brief: [
            "탐지 시스템 두 패키지가 ROS1 표준(catkin/rospy)으로 작성돼 있어 ROS2에서 그대로 실행할 수 없었습니다.",
            "colcon/format3/rclpy로 전환하고 메시지 생성을 rosidl로 재구성했으며, 하드코딩된 경로를 환경변수로 파라미터화했습니다.",
          ],
        },
        {
          resumeHide: true,
          label: "Docker GPU 파이프라인 디버깅 - 런타임 오류 2건 해결",
          situation: "Ubuntu 22.04+ROS2 Humble 이미지로 전체 빌드 후 실제 GPU 결합 테스트를 돌리자 런타임 오류가 발생했습니다.",
          cause: "torch import 시 HPC-X UCX 심볼 로딩 순서 문제, opencv 4.7 typing 스텁의 cv2.dnn.DictValue 버그 등 이미지 빌드 환경 특유의 문제였습니다.",
          actions: [
            "LD_PRELOAD 재정렬로 torch import의 심볼 로딩 순서 문제 해결",
            "opencv typing 스텁 버그를 스텁 무력화로 우회",
          ],
          result: "GPU 결합 테스트 런타임 오류 2건 모두 해결, Docker 이미지 정상 동작 확인",
          brief: [
            "Ubuntu 22.04+ROS2 Humble 이미지로 빌드 후 GPU 결합 테스트에서 런타임 오류 2건이 발생했습니다.",
            "torch import 심볼 로딩 순서를 LD_PRELOAD로 재정렬하고, opencv 스텁 버그는 무력화로 우회해 두 오류를 모두 해결했습니다.",
          ],
        },
        {
          resumeHide: true,
          label: "안전한 종료 처리 - ExternalShutdownException·발행 경쟁 상태 제거",
          situation: "STOP 명령으로 프로세스를 종료하면 rclpy spin의 ExternalShutdownException이 처리되지 않아 트레이스백이 발생했고, 무거운 GPU 추론 도중 종료 신호가 오면 무효화된 컨텍스트에 publish를 시도해 프로세스가 죽는 경쟁 상태도 있었습니다.",
          cause: "정상 종료 경로와 예외 상황이 구분되지 않아 정상적인 STOP도 에러처럼 처리됐고, 무거운 GPU 추론 도중 발생하는 비동기 종료 신호를 publish 시점에 방어하는 로직이 없었습니다.",
          actions: [
            "ExternalShutdownException을 정상 종료 경로로 분류해 불필요한 트레이스백 제거",
            "publish 직전에 컨텍스트 유효성을 확인하는 가드(_safe_publish)를 추가해 종료 중 publish 경쟁 상태 방지",
          ],
          result: "정상 종료 시 트레이스백 제거, 추론 중 종료 신호로 인한 프로세스 크래시 제거",
          brief: [
            "STOP 종료 시 ExternalShutdownException이 처리되지 않아 트레이스백이 났고, GPU 추론 도중 종료 신호가 오면 무효 컨텍스트에 publish를 시도해 죽는 경쟁 상태가 있었습니다.",
            "정상 종료 경로로 예외를 분류하고 publish 직전 가드(_safe_publish)를 추가해 두 문제를 모두 제거했습니다.",
          ],
        },
        {
          label: "실장비 없는 회귀 검증 체계 구축 - pytest 17건 통과",
          situation: "ROS1→ROS2 API를 전면 교체하는 작업인데 저장소에 자동화 테스트가 전혀 없어, 회귀를 잡아낼 안전망이 없었습니다.",
          cause: "실제 드론 하드웨어 없이는 통합 동작을 검증할 방법이 마땅치 않았고, rospy에 강하게 결합된 코드 구조라 순수 로직만 따로 테스트하기도 어려웠습니다.",
          actions: [
            "좌표 변환·명령 파싱 로직을 rospy 비의존 순수 함수로 분리해 pytest 단위 테스트 작성",
            "synthetic 카메라 메시지로 UDP 명령 수신→spawn→GPU 추론→MultiTarget 퍼블리시→STOP 종료까지 전체 파이프라인을 재현하는 통합 테스트 추가",
          ],
          result: "실 하드웨어 없이 17건 테스트 통과 확인, ROS1→ROS2 전면 교체에 대한 회귀 안전망 확보",
          brief: [
            "ROS1→ROS2 API를 전면 교체하는데 저장소에 자동화 테스트가 전혀 없어 회귀를 잡을 안전망이 없었습니다.",
            "좌표 변환·명령 파싱을 순수 함수로 분리해 pytest 단위 테스트를 작성하고, synthetic 메시지로 전체 파이프라인을 재현하는 통합 테스트를 추가해 실 하드웨어 없이 17건 테스트 통과를 확인했습니다.",
          ],
        },
        {
          label: "실시간 영상 전송 대역폭 병목 해소 - 원본 프레임 전송 → 압축·병렬 인코딩·드롭 큐 → 전송 주기 1~2Hz에서 8Hz",
          situation: "드론에서 GCS로 color·depth 프레임을 원본 그대로 보내던 구조라 전송 주기가 1~2Hz에 머물렀고, 실시간 탐지에 필요한 8Hz에 미치지 못했습니다.",
          cause: "프레임당 페이로드가 color 640×480×3B와 depth 640×480×2B를 합쳐 약 1.5MB였고 링크가 50Mbps라, 원본 전송으로는 이론상 4Hz가 상한이었습니다. 코드를 더 최적화해도 8Hz는 대역폭이 허용하지 않는 구조라 페이로드 자체를 줄여야 했습니다.",
          actions: [
            "color는 sensor_msgs/CompressedImage(JPEG)로 전환하고, depth는 거리값이 손상되면 탐지 결과가 달라지므로 무손실 압축·복원 로직을 별도로 붙여 전송",
            "압축 도입으로 병목이 네트워크에서 인코딩 CPU로 옮겨가, 프레임 인코딩을 병렬화해 해소",
            "실시간 영상이라 밀린 프레임이 쌓이면 지연이 누적되므로, 전송 큐에 프레임 드롭을 두어 최신 프레임을 우선 전송",
            "기본 DDS의 UDP 전송이 무선 링크에서 유실이 컸던 점을 고려해 Zenoh 라우터(zenohd)를 도입",
            "실측 통신 속도를 확인하며 입력 레이트를 8Hz에 맞춰 고정",
          ],
          result: "전송 주기 1~2Hz → 8Hz",
          brief: [
            "color·depth 원본 프레임을 그대로 보내 프레임당 약 1.5MB였고, 50Mbps 링크에서는 이론상 4Hz가 상한이라 목표인 8Hz에 코드 최적화만으로는 도달할 수 없었습니다.",
            "color를 JPEG CompressedImage로 바꾸고 depth에는 무손실 압축·복원 로직을 붙여 페이로드를 줄인 뒤, 인코딩 병렬화·프레임 드롭 큐·Zenoh 라우터를 더해 실측 대역폭에 맞춰 입력 레이트를 8Hz로 고정했습니다.",
          ],
        },
      ],
    },
  ] as DocProject[],

  activities: [
    {
      title: "FESI 13기 - 백엔드 멘토링",
      org: "codeit", year: "2026",
      desc: "프론트엔드 부트캠프 수강생 6명을 대상으로 Java·Spring Boot 기반 백엔드 실무 관점의 멘토링을 진행했습니다 (PR 리뷰·REST API 설계·DDD·TDD 실습에 더해 동시성 제어·이벤트 아키텍처·테스트 전략까지 다뤘습니다).",
      notes: [
        "[IaC] Terraform으로 AWS EC2 프로비저닝, Ansible로 구성 관리 - 프로비저닝/구성 계층 분리",
        "[동시성] 동시 신청 시 maxMembers 초과 가능 → PESSIMISTIC_WRITE 락 + Batch UPDATE로 원자적 증감 처리",
        "[강결합] 알림 실패가 모임 데이터에 영향 → @TransactionalEventListener(AFTER_COMMIT)로 이벤트 분리, 장애 전파 방지 구조 확보",
        "[성과] 51개 테스트 파일(단위·통합·E2E 3-layer 피라미드) + GitHub Actions CI 구성",
      ],
    },
    {
      title: "항해99 백엔드코스 9기",
      org: "항해99", year: "2025",
      desc: "Kotlin 2.1 기반으로 동시성 제어와 이벤트 드리븐 아키텍처를 실전으로 검증하는 학습 프로젝트로, 상위 10%로 수료했습니다.",
      notes: [
        "[좌석 중복 예약] 비관적 락 → Redis 분산락 → 낙관적 락 순으로 전환, k6 + Grafana 부하 테스트로 트레이드오프 검증",
        "[분산 트랜잭션] Redis 대기열 → Kafka 전환, Choreography Saga + DLQ로 일관성 확보",
      ],
    },
    {
      title: "스위프(SWYP) 웹 9기 ~ 11기, 앱 4기",
      org: "스위프", year: "2025 ~ 2026",
      desc: "4개 기수에 백엔드·프론트엔드·PM으로 참여하며 Java·Spring Boot·FastAPI 기반 팀 프로젝트를 웹·앱으로 출시했습니다.",
      notes: [
        "9기 백엔드(모먼티어), 10기 프론트엔드(축지법), 11기 PM·프론트엔드(위딩), 앱 4기 백엔드(Mapin)",
        "[DB] 전 기수 MySQL 기반으로 스키마 설계·운영",
        "SWYP 다수 기수 완주 및 배포",
      ],
    },
  ],

  education: [
    { school: "한밭대학교", degree: "대학교(학사) · 융합기술학과", period: "2022.03. ~ 2026.03.", status: "졸업" },
    { school: "대덕소프트웨어마이스터고등학교", degree: "고등학교 · 소프트웨어개발과", period: "2020.03. ~ 2022.03.", status: "졸업" },
  ],

  skills: [
    { category: "언어", items: ["Python", "Java 17", "Kotlin 2.1", "Go"] },
    { category: "프레임워크", items: ["FastAPI 0.115", "Spring Boot 3.1", "MyBatis 3.0"] },
    { category: "데이터", items: ["PostgreSQL 18", "MySQL", "Redis", "RabbitMQ 3.13"] },
    { category: "인프라", items: ["Kubernetes 1.30", "Docker"] },
    { category: "관측성", items: ["Zabbix 6.4"] },
  ] as SkillGroup[],

  certs: [
    { name: "SQL개발자(SQLD)", issuer: "한국데이터산업진흥원", date: "2025.12.", status: "합격" },
    { name: "정보처리기사", issuer: "한국산업인력공단", date: "2025.06.", status: "합격" },
    { name: "정보기기운용기능사", issuer: "한국산업인력공단", date: "2021.12.", status: "합격" },
    { name: "프로그래밍기능사", issuer: "한국산업인력공단", date: "2020.12.", status: "합격" },
  ],
};

// Platform Engineer resume - fully independent from PROFILE. Only identity/
// education/cert facts are shared by reference (same person, same facts);
// tagline, summary, highlights, career, and every project/block below are
// written from scratch so this reads as its own document, not a relabeled
// copy of the backend resume. Source: temp/platform_engineer_resume.md.
export const PROFILE_PLATFORM = {
  name: PROFILE.name,
  role: "인프라 엔지니어",
  email: PROFILE.email,
  github: PROFILE.github,
  githubUrl: PROFILE.githubUrl,
  portfolio: PROFILE.portfolio,
  portfolioUrl: PROFILE.portfolioUrl,
  location: PROFILE.location,
  military: PROFILE.military,
  photo: PROFILE.photo,

  tagline: "단일 서버에서 운영되던 시스템을 Kubernetes 기반 온프레미스 클러스터 환경으로 확장하고, 완전한 에어갭 환경에서도 안정적인 운영 체계를 구축해온 인프라 엔지니어입니다.",
  summary: [
    {
      head: "서비스가 커지는 만큼 인프라도 함께 만들어온 경험",
      body: "수동 배포를 자동화하고 컨테이너로 표준화해 어디서든 동일하게 실행되도록 만들었습니다. 서버가 늘면서 수동 관리에 드는 시간과 자원이 불필요하게 늘어나 쿠버네티스를 도입했고, 손으로 반복하던 구축 절차는 셸 스크립트로, 다시 Ansible로 옮기며 버전 관리되는 코드로 만들었습니다. 덕분에 KARI·국가보안기관·NIPA처럼 제약이 다른 기관마다 처음부터 만드는 대신, 검증된 구조를 조정해 배포할 수 있었습니다. 서비스가 여러 개로 쪼개진 뒤에는 서비스 사이에서 유실되던 데이터를 큐로, 흩어진 시크릿을 중앙화로 정리했습니다.",
    },
    {
      head: "반복되는 작업은 자동화로 걷어냅니다",
      body: "CRUD 보일러플레이트를 자동 생성 도구로, 작업 이력 정리·업무 보고를 팀 전체가 쓰는 에이전트로 없앴고, ML 실험에서는 GPU 상태와 학습 결과를 시각화하고 데이터셋 정리를 LLM으로 자동화하는 도구를 만들었습니다. 최근에는 CLAUDE.md와 Jira·Bitbucket을 연동해 개발 워크플로우 전체를 자동화했습니다. 백엔드·프론트엔드·AI를 직접 개발해본 경험이, 각 자리에서 무엇이 반복되는지 알아보는 눈이 됐습니다.",
    },
    {
      head: "장애의 근본 원인을 끝까지 추적해 해결합니다",
      body: "에어갭 환경이라 장애가 사용자 신고 후에야 드러나던 구조에 Zabbix 관측을 직접 도입해 사전 감지 체계를 갖췄습니다. 디스크 부족 표면 에러를 컨테이너→마운트→디바이스→펌웨어까지 추적해 NVMe 펌웨어 이관 로직 누락을 찾아냈고, Debezium replication slot이 반복 파손되자 자가치유 복구 로직을 우선 붙여봤지만 에어갭 환경에 필요한 세밀한 안전을 담보하기엔 부족해 Outbox 아키텍처로 근본 전환했습니다. 표면 증상에서 멈추지 않고 원인을 끝까지 따라가는 편입니다.",
    },
  ],

  highlights: [
    { v: "1~2일 → 2~3시간", l: "클러스터 프로비저닝 자동화 · 사내 공통" },
    { v: "11.22% → 0%", l: "배포 후 에러율(50VU 기준) · KARI" },
    { v: "4시간 → 20분", l: "최난도 장애 원인분석 단축 · NIPA" },
    { v: "이벤트 유실 0건", l: "Outbox 라이브러리 직접 개발 · KARI" },
  ],

  career: {
    company: "한컴인스페이스",
    position: "연구원 · 인프라 엔지니어링 · 재직 중",
    period: "2021.07. ~ 재직 중 (5년)",
    overview: "국가기관 대상 위성영상 AI 처리 플랫폼의 인프라 설계·구축·운영을 전담해왔습니다. 관리형 K8s가 없는 온프레미스 환경에서 kubeadm 클러스터 부트스트랩부터 노드 자원 분배·GPU 공유·비동기 파이프라인·모니터링까지 인프라 전 영역을 직접 설계·구축·운영했고, 최근에는 MSA 전환에 맞춰 팀원과 함께 Cilium 기반 네트워킹·control-plane HA·ArgoCD GitOps로 인프라 영역을 계속 확장하고 있습니다.",
    metrics: ["kubeadm 베어메탈 클러스터 구축", "GPU 4장 70파드 병렬 추론", "control-plane HA로 SPOF 제거", "에어갭 환경 롤링 배포 운영", "이벤트 유실 0건"],
    groups: [
      {
        title: "클러스터 구축·운영",
        items: [
          { text: "클러스터 프로비저닝 셸 스크립트화(수동 구축 1~2일 → 2~3시간) 후 Ansible 플레이북으로 전환 - 신규 노드 추가 시 pod·서비스 세팅 자동화, 수동 설정 편차 제거", proj: "insops", coveredByBlock: true },
          { text: "인터넷이 차단된 에어갭 환경에서 5대 서버 규모 클러스터를 롤링 업데이트 방식으로 서비스 영향 없이 운영", proj: "insops" },
          { text: "K8s 인증서 만료 대응 자동화 - 연 1회 현장 방문 작업 제거" },
        ],
      },
      {
        title: "CI/CD·배포",
        items: [
          { text: "실제 운영 상태와 배포 스크립트 간 차이로 추적이 어려웠던 Jenkins 명령형 배포를 Argo Workflows/Events CI + ArgoCD GitOps로 분리 - 배포 드리프트 추적성 확보", proj: "nipa", coveredByBlock: true },
          { text: "배포 후에만 드러나던 부하·트랜잭션 결함을 k6 부하테스트·유닛테스트의 CI 편입으로 배포 전 검출 - 에러율 11.22% → 0%", proj: "kari", coveredByBlock: true },
        ],
      },
      {
        title: "관측성·장애 대응",
        items: [
          { text: "MSA 전환 이후 분산된 서비스의 로그·트레이스를 통합하기 위해 OTel 기반 관측 환경(Prometheus·Tempo·Grafana)을 신규 구축 - 가장 오래 걸리던 사례에서 장애 원인 분석 4시간 → 20분", proj: "nipa", coveredByBlock: true },
          { text: "에어갭이라 장애를 사용자 신고 후에야 인지하던 구조에 Zabbix 하드웨어·서비스 관측 도입 - 장애 사전 감지 체계 확보", proj: "insops" },
          { text: "표면 에러(디스크 부족)를 컨테이너→마운트→디바이스→펌웨어로 추적해 NVMe 펌웨어 이관 로직 누락을 발견·복구 - 원인 분석과 수정 작업을 하루 이상에서 수 시간 이내로 단축", proj: "insops", coveredByBlock: true },
        ],
      },
      {
        title: "네트워킹·보안",
        items: [
          { text: "서비스 증가로 드러난 처리 오버헤드·단일 장애점(SPOF)을 Cilium(eBPF)·kube-vip 전환으로 해결 - 팀원과 설계 방향 협의하며 참여", proj: "nipa", coveredByBlock: true },
          { text: "서비스마다 개별 관리돼 로테이션 부담이 늘던 시크릿을 OpenBao+ESO 중앙 저장·자동 주입으로 일원화 - 로테이션이 배포 재시작만으로 반영", proj: "nipa", coveredByBlock: true },
          { text: "서비스가 각자 노출돼 보안 정책이 분산되던 구조를 Nginx 게이트웨이로 통합 - 서비스 7개의 HTTPS 종단·인증서·보안 헤더 1곳 관리, Wireshark 정보 노출 점검", proj: "kari", coveredByBlock: true },
          { text: "작고 빈번한 타일 요청마다 반복되던 TCP 핸드셰이크 지연을 Nginx Ingress keepalive 튜닝으로 제거 - 커넥션 재사용으로 응답 지연 단축", proj: "kari", coveredByBlock: true },
          { text: "외부 보안진단에서 지적된 CSP 미비·47개 매퍼 SQL Injection을 모두 조치", proj: "insops" },
          { text: "사내 서버 간 통신을 OpenVPN으로 구성 - 물리적으로 분리된 서버를 안전한 터널로 연결" },
        ],
      },
      {
        title: "메시징·데이터 파이프라인",
        items: [
          { text: "에어갭 망연계에서 Debezium replication slot이 반복 파손되던 문제를 AOP+MyBatis Outbox 라이브러리 직접 개발로 해결 - CDC 인프라 의존 제거, 이벤트 유실 0건", proj: "kari", coveredByBlock: true },
          { text: "TTL이 필요한 휘발성 데이터·API/쿼리 응답 캐싱을 위해 Redis를 Helm으로 K8s에 배포·운영 - RDB 스냅샷으로 재시작 시에도 데이터 유지", proj: "kari" },
        ],
      },
      {
        title: "업무 자동화",
        items: [
          { text: "클러스터 프로비저닝 자동화 - 셸 스크립트에서 Ansible 플레이북으로 표준화, 1~2일→2~3시간" },
          { text: "40여 개 테이블 CRUD 계층 자동 생성 - 테이블당 30분~1시간 걸리던 보일러플레이트 작성을 몇십 초 내로 단축" },
          { text: "FastMCP 사내 에이전트 개발 - Git·캘린더·HRWeb 통합·구글 드라이브 자동 관리 → 주 30~60분 수작업 제거" },
          { text: "Claude 스킬·훅 기반 에이전트 개발 - 작업 계획·평가 자동화" },
        ],
      },
    ] as CareerGroup[],
  },

  projects: [
    {
      pkey: "nipa",
      title: "NIPA 위성 변화탐지 플랫폼 - 클러스터·메시징 인프라 고도화",
      company: "한컴인스페이스",
      period: "2025.07. ~ 진행 중",
      badge: "주도(인프라 2·풀스택 2·AI 1)",
      stack: ["Kubernetes", "ArgoCD", "RabbitMQ", "PostgreSQL", "FastAPI", "OpenTelemetry", "Cilium"],
      desc: "MSA 전환으로 늘어난 클러스터·네트워킹·시크릿 복잡도를 표준화하고, 게이트웨이 인증을 일원화했습니다.",
      logo: "/nipa_logo.svg",
      archImage: "/nipa-satellite_arch.svg",
      blocks: [
        {
          diagram: "cluster-ha",
          label: "control-plane 단일 장애점 제거 → 3노드 HA 구성",
          situation: "MSA 전환 과정에서 서비스 수가 증가하면서 기존 단일 control-plane 구조의 위험이 커졌습니다. control-plane 자체가 장애로 죽은 적은 없었지만, 서버 재부팅으로 API 서버가 완전히 멈추는 다운타임이 있었습니다.",
          cause: "",
          actions: [
            "기존 단일 control-plane 노드를 3노드로 늘리고, kube-vip로 가상 IP(VIP)를 붙여 노드 중 하나가 죽어도 나머지 두 노드가 API 요청을 이어받도록 구성했습니다.",
          ],
          result: "control-plane 단일 장애점을 제거해 노드 장애·재부팅 상황에도 API 서버가 무중단으로 유지되도록 만들었습니다.",
          brief: [
            "MSA 전환 과정에서 서비스 수가 늘며 단일 control-plane 구조의 위험이 커졌고, 서버 재부팅 시 API 서버가 완전히 멈추는 다운타임이 있었습니다.",
            "kube-vip 기반 3노드 control-plane HA를 구성해 단일 장애점을 제거했습니다.",
          ],
        },
        {
          diagram: "otel-observability",
          label: "Metric·Log·Trace 통합 관측 환경 구축 → 장애 원인분석 4시간→20분",
          asisTags: ["9개 서비스 각자 로그", "원인 분석 4시간"],
          tobeTags: ["OTel 통합 관측", "20분 이내"],
          situation: "MSA 전환으로 서비스가 9개로 늘면서 통합해서 볼 수 있는 관측 환경 자체가 없었고, 하나의 요청이 여러 서비스를 거치면서 어느 구간에서 문제가 났는지 추적이 복잡해졌습니다.",
          cause: "",
          actions: [
            "Prometheus·OpenSearch·Tempo·Grafana를 OpenTelemetry 기반으로 신규 도입해 API 서버부터 RabbitMQ, 추론 서비스까지 요청 흐름을 추적할 수 있도록 구축했습니다.",
            "서비스별 로그 확인 방식에서 트레이스 기반 분석 방식으로 전환해, 장애 구간을 로그 수동 추적 없이 대시보드에서 특정할 수 있게 했습니다.",
          ],
          result: "가장 오래 걸리던 사례에서 장애 원인 분석 시간을 4시간에서 20분으로 단축했습니다. OpenSearch는 Elasticsearch 기반이라 EFK 스택의 로그 저장·검색 역할과 같은 자리를 맡고 있습니다.",
          brief: [
            "MSA 전환으로 서비스가 9개로 늘며 통합 관측 환경이 없어, 요청이 여러 서비스를 거칠 때 원인 구간을 추적하기 어려웠습니다.",
            "Prometheus·OpenSearch·Tempo·Grafana를 OpenTelemetry 기반으로 신규 구축해 로그·트레이스 통합 조회 및 요청 흐름 추적이 가능하게 만들었습니다.",
          ],
        },
        {
          label: "서비스별로 흩어진 인증을 Envoy Gateway + Keycloak OIDC로 통합",
          asisTags: ["서비스 9개 각자 인증 구현", "정책 불일치 위험"],
          tobeTags: ["Envoy Gateway L7", "Keycloak OIDC 단일 통과"],
          situation: "MSA 전환으로 서비스가 9개로 늘면서 인증·인가 처리가 서비스마다 개별 구현돼 중복됐습니다.",
          cause: "서비스마다 인증 로직을 따로 구현하다 보니 정책이 어긋나기 쉬웠고, 신규 서비스를 추가할 때마다 인증 코드를 다시 작성해야 했습니다.",
          actions: [
            "Envoy Gateway를 도입해 L7 라우팅을 게이트웨이 한 곳에서 받도록 구성했습니다.",
            "Keycloak OIDC로 인증·SSO를 일원화해 서비스가 인증 로직을 직접 구현하지 않도록 전환했습니다.",
          ],
          result: "인증 처리를 게이트웨이 한 곳으로 통합했습니다. 서비스별로 중복 구현되던 인증 코드가 제거됐습니다.",
          brief: [
            "서비스가 9개로 늘면서 인증·인가 처리가 서비스마다 중복됐습니다.",
            "Envoy Gateway에서 L7 라우팅을 받고 Keycloak OIDC로 인증·SSO를 일원화했습니다.",
          ],
        },
        {
          label: "Jenkins 명령형 배포 → Argo Workflows·Events CI + ArgoCD GitOps 전환",
          asisTags: ["Jenkins 명령형 배포", "선언 상태≠실제 상태 확인 불가"],
          tobeTags: ["ArgoCD GitOps", "Git으로 배포 상태 선언·추적"],
          situation: "Jenkins 명령형 배포는 실행 이력만 남고, 선언된 상태와 실제 클러스터 상태가 같은지 보장할 방법이 없었습니다. 배포 아티팩트도 포맷별로 저장소가 흩어져 있었습니다.",
          cause: "배포가 스크립트 실행 순서에만 의존해, 실패 시 어디까지 반영됐는지 추적하기 어려웠고 롤백 근거도 명확하지 않았습니다.",
          actions: [
            "Argo Workflows·Argo Events 기반 CI를 구성해 빌드·테스트 단계를 이벤트 기반으로 전환했습니다.",
            "ArgoCD GitOps로 배포를 전환해 배포 상태를 Git에 선언하고 클러스터 실제 상태와 지속적으로 동기화하도록 만들었습니다. 포맷별로 흩어져 있던 아티팩트 저장소는 Pulp로 통합했습니다.",
          ],
          result: "배포 상태를 Git으로 선언·추적할 수 있게 되어 드리프트 확인과 롤백 근거를 확보했습니다.",
          oneliner: "선언 상태와 실제 클러스터 상태를 대조할 수 없던 명령형 배포를 GitOps로 전환하고 아티팩트 저장소를 Pulp로 통합 — 드리프트 확인·롤백 근거 확보",
          brief: [
            "Jenkins 명령형 배포는 실행 이력만 남고, 선언된 상태와 실제 상태가 일치하는지 보장할 방법이 없었습니다.",
            "Argo Workflows·Events 기반 CI와 ArgoCD GitOps로 전환해 배포 상태를 Git으로 선언·추적하고, 아티팩트 저장소를 Pulp로 통합했습니다.",
          ],
        },
      ],
    },
    {
      pkey: "kari",
      title: "항공우주연구원(KARI) 위성영상 AI 처리 플랫폼 구축",
      company: "한컴인스페이스",
      period: "2023.10. ~ 2025.07.",
      badge: "주도(인프라 1·풀스택 1·AI 1)",
      stack: ["Kubernetes", "Docker", "Aliyun GPUShare", "PyTorch", "ONNX Runtime", "RabbitMQ", "PostgreSQL", "Spring Boot", "Jenkins"],
      desc: "다누리·Sentinel·Landsat 등 10개 이상 위성 소스를 수집·처리해 객체탐지·세그멘테이션·초해상도 AI 추론 결과를 CesiumJS 뷰어로 가시화하는 플랫폼으로, 한국항공우주연구원(KARI)에 납품했습니다. 외부망과 폐쇄망이 분리된 망분리 구조라, 두 망 사이 데이터 동기화를 망연계 구간으로 처리했습니다. 관리형 K8s가 없는 온프레미스 환경이라 kubeadm 기반으로 클러스터를 구축했고, 이 구조로 AI 추론 일 처리량이 200건에서 3,000건으로 늘며 이후 K8s 기반 AI 처리 플랫폼 구축의 기반이 됐습니다. 영상 ETL 작업 분배는 SaltStack 폴링 방식을 쓰다가, 처리 프로세스가 죽으면 job이 무한 고착되는 문제로 RabbitMQ 이벤트 발행-구독으로 대체했습니다.",
      logo: "/kari_logo.svg",
      archImage: "/kari-satellite_arch.svg",
      blocks: [
        {
          diagram: "gpu-share",
          label: "Kubernetes 클러스터 구축 - kubeadm 베어메탈 부트스트랩 + GPUShare 자원 공유",
          situation: "위성영상을 받아 AI 추론까지 흘려보내는 플랫폼을 만들어야 했는데, 컨테이너 하나가 죽으면 작업이 그냥 사라지는 구조로는 운영이 불가능했습니다. 게다가 노드당 GPU 하나를 컨테이너 하나가 점유하는 방식이라 대부분의 시간 동안 GPU가 유휴 상태였습니다.",
          cause: "워크로드가 여러 노드에 걸쳐 자동 복구돼야 하는데 Docker Compose·스크립트 관리로는 노드가 늘수록 관리 포인트가 선형으로 늘었고, 여러 모델을 동시에 띄워야 하는 요건과 1파드=1GPU 구조도 맞지 않았습니다(당시 GPU는 NVIDIA MIG 미지원).",
          actions: [
            "관리형 K8s가 없는 온프레미스 환경이라 kubeadm으로 클러스터를 직접 부트스트랩",
            "Aliyun GPUShare를 도입해 여러 컨테이너가 하나의 GPU를 fraction 단위로 나눠 쓰는 소프트웨어 레벨 공유 구성",
          ],
          result: "노드 장애 시에도 워크로드가 자동 복구되는 구조 확보(이후 K8s 기반 AI 처리 플랫폼 구축의 기반이 됨), GPU 4장을 공유해 최대 70개 파드에서 병렬 추론",
          brief: [
            "컨테이너 하나가 죽으면 작업이 사라지는 구조로는 운영이 불가능했고, 노드당 GPU를 단일 컨테이너가 독점해 GPU 활용률이 낮았습니다.",
            "kubeadm으로 클러스터를 직접 부트스트랩하고, Aliyun GPUShare로 GPU를 fraction 단위로 나눠 GPU 4장을 공유해 최대 70개 파드에서 병렬 추론을 달성했습니다.",
          ],
        },
        {
          diagram: "cdc-outbox",
          label: "CDC 의존 제거를 위한 Outbox 라이브러리 직접 개발 → 이벤트 유실 0건",
          situation: "망분리 환경에서 Debezium CDC를 사용해 DB 변경 이벤트를 전달했지만 replication slot 문제가 반복 발생했습니다. 장애 시 전체 스냅샷이 필요했고, 이벤트 전달이 중단되는 문제가 있었습니다.",
          cause: "",
          actions: [
            "이를 해결하기 위해 AOP와 MyBatis Executor 인터셉터 기반 Outbox 라이브러리를 직접 개발했습니다. 업무 데이터와 이벤트 데이터를 동일 트랜잭션에서 저장하도록 변경해 이벤트 전달 책임을 애플리케이션 영역으로 이동했습니다.",
            "또한 망연계 구간 파일 처리를 병렬화해 전송 적체를 줄였습니다.",
          ],
          result: "CDC 장애로 인한 동기화 중단 문제를 제거하고 이벤트 유실 0건을 달성했습니다.",
          brief: [
            "Debezium CDC의 replication slot이 반복 파손돼 전체 스냅샷 재수행이 필요했고, 망연계 솔루션은 JSON 파일 기반 전송만 지원해 API 폴링도 불가능했습니다. 자가치유 로직을 붙여도 에어갭 환경에서는 여전히 불안정했고, 파일 처리도 병렬화돼 있지 않아 비효율적이었습니다.",
            "일반 이벤트는 자체 개발한 Outbox 라이브러리로, 망연계 구간은 파일을 병렬로 저장·전송하는 전용 Python 서버로 전환해 CDC 의존을 완전히 제거하고 이벤트 유실 0건을 달성했습니다.",
          ],
        },
        {
          label: "Nginx 게이트웨이 구축 - HTTPS 종단·보안 헤더·정보 노출 점검 통합",
          situation: "레거시 Tomcat 기반 프론트엔드를 외부에 HTTPS로 노출해야 했는데 서비스마다 보안 헤더 설정이 제각각이었고, 각 서비스가 개별적으로 외부에 노출되다 보니 라우팅·보안 처리도 분산돼 응답에 노출 금지 정보가 실리는지 확인할 방법도 없었습니다.",
          cause: "Tomcat 단독으로는 와일드카드 인증서 갱신·보안 헤더 통합 관리가 번거로웠고, 단일 게이트웨이 없이 서비스가 각자 노출되다 보니 보안 정책을 한 곳에서 적용·검증할 수 없었습니다.",
          actions: [
            "Nginx를 Tomcat 앞단 HTTPS 리버스 프록시로 구성 - 와일드카드 TLS 인증서·체인 적용, 중복 보안 헤더를 제거하고 CSP·X-Frame-Options 등을 한 곳에서 통합 관리",
            "path 기반 라우팅으로 내부 분석 서비스·지도 서버와 외부 지도 타일 API를 함께 프록시, 쿠키 보안 속성까지 일괄 적용해 단일 진입점 확보",
            "Wireshark로 패킷을 분석해 서버·버전 등 노출 금지 정보가 실제로 노출되는지 점검",
          ],
          result: "서비스 7개의 HTTPS 종단·인증서·보안 헤더를 게이트웨이 1곳으로 통합, 정보 노출 여부 사전 점검 체계 마련",
          flow: [
            { step: "문제", desc: "서비스별 분산 노출 · 보안 헤더 제각각" },
            { step: "Nginx", desc: "HTTPS 리버스 프록시 + 단일 게이트웨이" },
            { step: "점검", desc: "Wireshark로 정보 노출 여부 확인" },
            { step: "결과", desc: "서비스 7개 HTTPS·인증서·헤더 통합" },
          ],
          brief: [
            "Tomcat 단독으로는 인증서·보안 헤더 관리가 번거로웠고, 서비스가 각자 노출되다 보니 보안 정책 통합도 응답의 정보 노출 여부 확인도 어려웠습니다.",
            "Nginx를 HTTPS 리버스 프록시 겸 단일 게이트웨이로 구성해 인증서·보안 헤더·라우팅을 통합하고, Wireshark 패킷 분석으로 정보 노출 여부까지 점검했습니다.",
          ],
        },
        {
          diagram: "k6-ci",
          label: "CI 파이프라인 테스트 자동화 - k6 부하테스트·유닛테스트 도입 → 배포 후 에러율 11.22%→0%",
          situation: "배포 파이프라인에 자동화된 테스트가 없어, 부하 상황에서만 드러나는 문제나 트랜잭션 경계 결함이 배포 이후에나 발견됐습니다.",
          cause: "부하테스트는 문제가 생길 때마다 추가되는 사후적 sh 스크립트뿐이었고, 유닛테스트도 없어 CI 단계에서 걸러낼 방법이 없었습니다.",
          actions: [
            "가상 유저 플로우를 정의해 k6 부하테스트를 Jenkins 파이프라인에 편입",
            "API 200여 개 규모 시스템에 유닛테스트를 도입해 CI 단계에서 자동 실행",
          ],
          result: "배포 후 에러율 11.22%→0%, 처리량 392→1,177 req/s, 트랜잭션 경계·동기화 결함을 배포 전 CI 단계에서 검출",
          brief: [
            "배포 파이프라인에 자동화된 테스트가 없어 부하 상황에서만 드러나는 문제나 트랜잭션 결함이 배포 이후에야 발견됐습니다.",
            "k6 부하테스트와 유닛테스트를 Jenkins CI 파이프라인에 편입해 배포 전 자동 검증 단계를 만들었고, 배포 후 에러율을 11.22%에서 0%로 낮췄습니다.",
          ],
        },
        {
          label: "웹 서비스 배포 단위 분리 - 6개 서비스 묶음 배포 → 도메인별 분리로 배포 4분→30초",
          situation: "웹 서비스 6개가 각각 개별 Tomcat으로 배포되고 있어, 기능 하나를 수정해도 관련된 서비스마다 개별적으로 재빌드·재배포해야 했습니다.",
          cause: "서비스 간 배포 단위가 분리돼 있지 않아 수정 범위와 무관하게 여러 서비스를 함께 재배포해야 했고, 배포 대상이 많아질수록 전체 배포 시간도 늘었습니다.",
          actions: [
            "서비스를 도메인 단위로 분리해, 수정된 서비스 하나만 배포하면 되도록 재구성",
          ],
          result: "배포 대상이 수정된 서비스 하나로 좁혀져 배포 시간 4분 → 30초로 단축",
          flow: [
            { step: "문제", desc: "6개 서비스 묶음 배포 · 수정 무관 전체 재배포" },
            { step: "분리", desc: "서비스를 도메인 단위로 분리" },
            { step: "결과", desc: "변경분만 개별 배포 · 4분→30초" },
          ],
          brief: [
            "웹 서비스 6개가 개별 Tomcat으로 묶여 배포돼, 기능 하나를 수정해도 관련 서비스마다 재빌드·재배포해야 했습니다.",
            "서비스를 도메인 단위로 분리해 수정된 서비스 하나만 배포하면 되도록 재구성, 배포 시간을 4분에서 30초로 단축했습니다.",
          ],
        },
        {
          diagram: "docker-cache",
          label: "Docker 빌드 캐시 최적화 - 레이어 재배치 + Nexus 패키지 프록시 → 반복 빌드 부담 제거",
          situation: "PyTorch·ONNX Runtime 기반 AI 추론 이미지는 의존성이 무거워 빌드마다 시간이 오래 걸렸는데, Jenkins 파이프라인에서 배포할 때마다 반복 실행되며 병목이 됐습니다.",
          cause: "Dockerfile에서 자주 바뀌는 소스 COPY가 의존성 설치 레이어보다 앞에 있어, 코드 한 줄만 바뀌어도 무거운 의존성 설치 레이어까지 캐시가 무효화됐습니다. 또 사내망에 pip·apt 패키지를 캐싱해줄 프록시가 없어 매번 외부망에서 새로 받아왔습니다.",
          actions: [
            "자주 바뀌지 않는 의존성 설치 레이어를 소스 COPY보다 앞으로 재배치해 소스 변경이 의존성 레이어 캐시를 무효화하지 않도록 순서를 조정",
            "Nexus에 pip·apt proxy repository를 구성해 패키지 다운로드를 사내망에 캐싱, Jenkins 빌드마다 반복되던 외부망 다운로드를 제거",
          ],
          result: "레이어 캐시 재사용률을 높이고 패키지 다운로드를 사내망 캐시로 대체해, 코드 변경 대비 불필요하게 반복되던 빌드 시간을 줄였습니다.",
          brief: [
            "무거운 AI 추론 이미지가 빌드마다 오래 걸렸고, Dockerfile 레이어 순서상 소스 변경만으로도 의존성 설치 레이어 캐시가 매번 무효화됐습니다.",
            "의존성 설치 레이어를 소스 COPY보다 앞으로 재배치하고 Nexus pip·apt proxy로 패키지를 사내망에 캐싱해, 불필요한 반복 빌드 부담을 제거했습니다.",
          ],
        },
        {
          label: "폴링 → RabbitMQ 이벤트 전환 - job 고착 해소 → 워커 1→15개, 위성영상 300장 처리 30분→3분",
          diagram: "rabbitmq-queue",
          asisTags: ["SaltStack job 폴링", "무한 고착"],
          tobeTags: ["RabbitMQ 이벤트", "워커 1→15개", "처리 30분→3분"],
          situation: "영상 ETL 작업 기준 일 5,000건 이상에 파생 작업까지 더하면 약 6배 규모로 늘어, 부하의 대부분이 사용자 트래픽이 아닌 파이프라인 처리량에서 발생했습니다. SaltStack job 폴링(00 대기·01 진행·02 완료·03 실패) 구조라 처리 프로세스가 죽으면 job이 01(진행) 상태에 무한히 머물렀고, 고정 주기(1분) 폴링으로 대기 낭비도 있었습니다.",
          cause: "job 상태 전이를 처리 프로세스 자신이 책임지는 구조라, 프로세스가 죽으면 복구가 불가능했습니다. 타임아웃으로 땜질하기보다 폴링 구조 자체를 바꾸기로 판단했고, 병렬 처리도 job을 다건 등록하는 방식보다 이벤트 발행-구독 방식이 구조적으로 더 효율적이라고 봤습니다.",
          actions: [
            "RabbitMQ 기반 이벤트 발행-구독으로 전환하고, 수집·전처리·추론·후처리 단계별로 큐를 분리해 병목 단계만 워커를 확장할 수 있도록 구성했습니다.",
            "파드를 다중화·클러스터링해 처리 프로세스 장애가 나도 다른 파드가 이어받도록 격리했습니다.",
          ],
          result: "job이 무한 진행 상태에 머무는 문제를 근본적으로 해결하고 폴링 대기 낭비를 제거했습니다. 처리 워커를 1개에서 15개까지 확장 가능한 구조로 개선해 영상 ETL 작업(300장 기준) 처리 시간을 30분에서 3분으로 줄였습니다.",
          brief: [
            "SaltStack job 폴링 구조에서 처리 프로세스가 죽으면 작업이 진행 상태에 무한히 고착됐고, 고정 주기(1분) 폴링으로 대기 낭비도 있었습니다.",
            "RabbitMQ 이벤트 발행-구독으로 전환하고 단계별로 큐를 분리해 병목 단계만 워커를 1개에서 15개까지 확장 — 영상 ETL 작업(300장 기준) 처리 시간 30분→3분.",
          ],
        },
        {
          label: "자체 학습 오케스트레이션 스케줄러 구축 - GPU 인식 큐·장애 격리·웹 대시보드 → 126개 실험 무인 순차 실행",
          situation: "GPU 4장 규모에서 세그멘테이션 모델 실험을 반복해야 했는데, 실험마다 사람이 직접 GPU 점유 상태를 확인하고 순서를 조율해야 했습니다. 수동 실행과 겹치면 같은 GPU를 두 프로세스가 동시에 점유해 학습이 깨졌습니다.",
          cause: "Kubeflow 같은 관리형 MLOps 오케스트레이션은 이 환경(업무망)에 그대로 들여오기 어려웠고, 클러스터에 K8s 노드가 있었지만 단발성 학습 잡을 그 위에 얹기엔 배보다 배꼽이 컸습니다. 실험 대기열·GPU 점유 여부·장애 복구를 전부 사람이 손으로 관리하는 구조가 병목이었습니다.",
          actions: [
            "GPU 점유 상태를 인식해 큐에서 config를 꺼내 torchrun으로 순차 실행하고, GPU가 이미 점유돼 있으면 대기하는 스케줄러를 직접 개발했습니다(queue_ui, 약 1,060줄).",
            "수동으로 실행된 학습 프로세스를 감지해 스케줄러와 충돌하지 않도록 회피 로직을 넣고, start_new_session 기반으로 러너가 죽어도 학습 프로세스는 살아남도록 장애를 격리했습니다.",
            "파일 락(QueueLock)으로 큐 상태 동시성을 보장하고, 재부팅 시에는 큐를 일시정지 상태로 복구해 오작동을 방지했습니다.",
            "REST API와 웹 대시보드를 붙여 GPU·로그를 실시간으로 확인하고 큐 순서를 조작할 수 있게 했고, 크론 기반 GitHub 자동 동기화에는 사내 IP·경로·과제명을 정규식으로 검사해 검출 시 푸시를 차단하는 보안 게이트를 넣었습니다.",
          ],
          result: "126개 실험을 무인으로 순차 실행할 수 있는 구조를 확보했고, 러너 크래시·재부팅 상황에서도 학습이 유실되거나 오작동하지 않도록 만들었습니다.",
          brief: [
            "GPU 4장 규모에서 실험마다 사람이 직접 점유 상태를 확인하고 순서를 조율해야 했고, 수동 실행과 겹치면 같은 GPU를 두 프로세스가 동시에 점유해 학습이 깨졌습니다.",
            "GPU 점유를 인식하는 큐 스케줄러·장애 격리(start_new_session)·파일 락 동시성 제어·REST API+웹 대시보드·보안 게이트(사내정보 유출 차단)를 직접 개발해 126개 실험을 무인 순차 실행했습니다.",
          ],
        },
        {
          label: "라벨 품질 검증 파이프라인 구축 - 지오레퍼런싱 전수 검증으로 라벨 노이즈 성능 천장 규명 → 데이터 품질 개선 전환",
          situation: "세그멘테이션 모델의 mIoU가 여러 구조·손실 함수를 바꿔봐도 특정 구간에서 더 이상 오르지 않았습니다. 원인이 모델링 쪽인지 데이터 쪽인지 불분명했습니다.",
          cause: "클래스별 오분류(FP)를 분석해보니 라벨 자체의 품질을 의심할 근거가 나왔지만, 라벨 1,204장을 사람이 전부 다시 보는 것은 비용이 컸고 라벨-영상 좌표가 실제로 어긋난 타일이 얼마나 되는지 정량화할 방법이 없었습니다.",
          actions: [
            "라벨 품질 검토 파이프라인을 구축해 1,204장 중 312장을 직접 수정하고, 변경된 픽셀 비율을 클래스별로 정량화했습니다(초지 −1.47%, 숲 +0.70%).",
            "md5 대조 기반 전수 무결성 검증으로 수정본과 원본의 차이를 타일 단위까지 확인해 검증(val) 세트 오염 여부를 확인했습니다.",
            "영상과 라벨의 지리좌표를 대조해 자동으로 어긋난 타일을 검출하는 스크립트를 작성했습니다 — 최대 3.93km 어긋난 불량 타일을 발견했고(어긋난 타일들의 중앙값 67.5m, 차상위 355m), 디스크를 추가로 쓰지 않도록 심볼릭 링크 기반으로 라벨만 다른 A/B 데이터셋을 구성해 검증했습니다.",
          ],
          result: "라벨 노이즈가 성능의 실질적 천장(0.71~0.73 구간에서 포화)이라는 것을 데이터로 규명했고, 이후 개선 방향을 모델 구조 탐색에서 데이터 품질로 전환했습니다.",
          brief: [
            "mIoU가 모델 구조·손실 함수를 바꿔도 특정 구간에서 더 오르지 않았는데, 원인이 모델링 쪽인지 데이터 쪽인지 불분명했습니다.",
            "라벨 품질 검토 파이프라인(1,204장 중 312장 수정)·md5 전수 무결성 검증·지오레퍼런싱 자동 대조로 라벨 노이즈가 성능 천장의 원인임을 규명하고, 개선 방향을 데이터 품질로 전환했습니다.",
          ],
        },
        {
          label: "위성 파운데이션 모델 파인튜닝·도메인 갭 분석 - DINOv3 기반 7클래스 세그멘테이션 mIoU 0.7137, ONNX 배포 13일 무중단",
          situation: "위성 소스가 여러 곳(KOMPSAT·NeonSat 등)이라 한 위성으로 학습한 모델이 다른 위성 영상에서는 성능이 크게 떨어지는 도메인 갭 문제가 있었습니다.",
          cause: "일반 ImageNet 사전학습 백본은 위성 영상 특유의 분광·해상도 특성을 충분히 반영하지 못했고, 어느 백본·디코더 조합이 이 도메인에 맞는지, 도메인 갭이 얼마나 되는지 정량 근거가 없었습니다.",
          actions: [
            "위성 특화 파운데이션 모델 DINOv3 ViT-L/16(sat493m)을 부분 동결(24블록)로 파인튜닝하고, DINOv2·DOFA·ConvNeXt·HRNet과 비교 실험 후 dual-backbone 융합 구조로 발전시켰습니다.",
            "UperNet 디코더에 boundary/skeleton 보조 헤드와 ConvNeXt DetailBranch를 추가하고 CE+Tversky+Lovász+Boundary 복합 손실을 구성, 4채널(RGB+NIR) 16bit TIF를 1024×1024로 처리하는 파이프라인을 만들었습니다.",
            "Sentinel 10m 임베딩(AlphaEarth)을 teacher로 하는 지식증류 프로토타입을 구성해 AE 단독 신호를 cosine 0.318 → logreg 0.376 → conv 헤드 0.430까지 끌어올렸고, 타일 기하 분석(1024px@0.7m → 64격자 ≈ 11.2m/px, AE 네이티브 10m에 근접)으로 캐시 해상도 설계를 검증했습니다.",
            "NeonSat 제로샷 평가로 도메인 갭을 −0.17 mIoU로 정량화하고 붕괴 지점을 ground 클래스 IoU 0.248(초지 과다예측)로 특정했으며, PyTorch DDP 3-GPU(torch 2.13+CUDA 13)로 학습한 모델을 ONNX로 export해 gunicorn+uvicorn 추론 API로 배포했습니다.",
          ],
          result: "7클래스 세그멘테이션 mIoU 0.7137을 달성했고(126개 실험), 위성 간 도메인 갭을 클래스 단위로 분해해 개선 우선순위를 도출했습니다. ONNX 배포 추론 서버는 13일 무중단 상주를 확인했습니다.",
          brief: [
            "위성 소스가 여러 곳이라 한 위성으로 학습한 모델이 다른 위성 영상에서는 성능이 크게 떨어졌고, 어느 백본·디코더 조합이 이 도메인에 맞는지 정량 근거가 없었습니다.",
            "DINOv3 위성 파운데이션 모델 파인튜닝·dual-backbone 융합·AlphaEarth 지식증류로 mIoU 0.7137을 달성하고 도메인 갭을 −0.17 mIoU로 정량화했으며, ONNX export 후 gunicorn+uvicorn으로 배포해 13일 무중단 상주를 확인했습니다.",
          ],
        },
      ],
    },
    {
      pkey: "insops",
      title: "국가보안기관 위성영상 시스템 — 개발·에어갭 운영·신규 구축",
      company: "한컴인스페이스",
      period: "2022.07. ~ 진행 중",
      badge: "핵심 참여(인프라 1·풀스택 4·DB 1)",
      stack: ["Kubernetes", "Docker", "Rocky Linux", "Shell", "Zabbix", "GDAL", "PostgreSQL"],
      desc: "위성영상을 수집·판독해 정부 표준 문서로 산출하는 시스템입니다. 망분리를 넘어 외부 인터넷과 매체 반입까지 차단된 에어갭 환경입니다. API·프론트 개발부터 시작해 2024.07부터 에어갭 환경 운영을 담당했고, 2025.06부터는 다종위성 수집·처리 플랫폼을 베어메탈부터 신규 구축하고 있습니다.",
      logo: "/hancominpsace_logo.png",
      archImage: "/insops-satellite_arch.svg",
      blocks: [
        {
          diagram: "nvme-trace",
          label: "표면 에러를 넘어 펌웨어까지 추적한 가시화 전면 장애 → 원인 분석 하루 이상에서 수 시간 이내로 단축",
          situation: "가시화 작업 실패 당시 No space left on device 오류가 발생했지만 마운트 용량은 충분했습니다. 단순 디스크 문제가 아닌 스토리지 계층 문제로 판단하고 범위를 확장해 분석했습니다.",
          cause: "",
          actions: [
            "컨테이너 → 마운트 → 디바이스 → 펌웨어 순서로 확인한 결과, 펌웨어 업데이트 과정에서 NVMe 데이터 이동 로직 누락이 원인이었습니다.",
            "임시 조치로 서비스를 복구하고 업체 패치 적용까지 진행했으며, 대응 절차를 문서화해 동일 장애 발생 시 재현 가능한 대응 체계를 마련했습니다.",
          ],
          result: "컨테이너부터 스토리지, 펌웨어까지 계층별 추적을 통해 원인을 확인해 분석 시간을 하루 이상에서 수 시간 이내로 단축했습니다.",
          brief: [
            "가시화 작업이 전부 실패했는데 로그상 디스크 부족처럼 보였지만 실제 마운트 용량은 여유가 있어, 표면적 에러와 실제 동작이 어긋나 있었습니다.",
            "팀원과 함께 스토리지 장비에 직접 접속해 NVMe 실사용량을 확인하고 업체 코드까지 검토해 펌웨어 이관 로직 누락을 찾아, 임시 패치 후 정식 패치까지 연동해 복구했습니다.",
          ],
        },
        {
          diagram: "db-api-centralize",
          label: "DB 접근 계층 중앙화(신규 구축) → 스키마 변경 영향 API 레이어로 축소",
          situation: "신규 구축 프로젝트에서 각 서비스(카탈로깅, 작업 관리, 가시화 등)가 ORM으로 DB에 직접 접근하는 구조였습니다.",
          cause: "DB 접근 로직과 자격증명이 모든 서비스에 흩어져 있어 스키마가 바뀌면 여러 서비스를 동시에 수정해야 했고, Python ORM과 Go가 같은 DB를 다룰 때 접근 패턴도 서로 어긋났습니다. 언어별로 각자의 ORM 계층을 개선하는 방법도 있었지만, 스키마가 바뀔 때마다 여러 서비스를 동시에 고쳐야 하는 근본 문제 자체는 해결되지 않는 미봉책이었습니다.",
          actions: [
            "독립 스키마를 새로 짜는 기회를 활용해 DB 접근을 Go 기반 API로 중앙화",
            "모든 서비스가 HTTP로만 DB에 접근하도록 재설계",
          ],
          result: "7개 서비스가 직접 접근하던 DB를 API로 중앙화해, 스키마 변경 영향 범위를 API 레이어 한 곳으로 좁혔습니다.",
          brief: [
            "서비스마다 ORM으로 DB에 직접 접근해 스키마 변경 시 여러 서비스를 동시 수정해야 했고, 언어별 ORM 개선만으로는 이 구조적 문제가 해결되지 않았습니다.",
            "DB 접근을 Go 기반 API로 중앙화해, 스키마 변경 영향 범위를 API 레이어 하나로 좁히고 언어 무관하게 동일한 방식으로 DB에 접근하도록 만들었습니다.",
          ],
        },
        {
          label: "베어메탈부터 시작한 신규 인프라 구축",
          situation: "관리형 인프라가 없는 신규 구축 프로젝트로, 물리 서버 설치부터 시작해야 했습니다.",
          cause: "검증된 패턴을 그대로 가져올 수 없는 영역(물리 서버 구성, DB 스키마, 수집기 통합)이 많아 운영 시나리오에 맞게 새로 설계해야 했습니다.",
          actions: [
            "물리 서버 설치, K8s 클러스터 구성에 핵심적으로 참여",
            "다종 수집기 통합, DB 기반 중복 체크, zst/tar.gz 포맷 변환 자동화 구현",
            "히스토그램 스트레칭 자동화, COG 포맷 적용으로 가시화 성능 개선",
            "등록일 기준 자동 삭제 서비스 구축",
          ],
          result: "물리 서버 설치·K8s 클러스터 구성·DB 설계·수집 파이프라인 구현까지 신규 플랫폼의 전체 구성요소를 베어메탈 단계부터 구축하고 운영 가능한 상태로 전환",
          flow: [
            { step: "물리 서버", desc: "설치 · K8s 클러스터 구성" },
            { step: "수집기 통합", desc: "다종 수집기 통합 · 중복 체크 · 포맷 변환 자동화" },
            { step: "가시화 최적화", desc: "히스토그램 스트레칭 · COG 포맷 적용" },
            { step: "자동 삭제", desc: "등록일 기준 자동 삭제 서비스" },
          ],
          brief: [
            "관리형 인프라 없이 물리 서버 설치부터 시작해야 하는 신규 구축 프로젝트였습니다.",
            "물리 서버·K8s 클러스터 구성부터 수집기 통합·포맷 변환 자동화·히스토그램 스트레칭·자동 삭제 워크플로우 구현까지 인프라 전 과정에 핵심적으로 참여했습니다.",
          ],
        },
        {
          label: "외부 보안진단 지적사항 조치 → CSP 미비·SQL Injection 전량 해소",
          situation: "외부 보안진단에서 CSP 미설정과 매퍼 전반의 SQL Injection이 지적됐습니다.",
          cause: "CSP 헤더가 별도로 적용돼 있지 않았고, 매퍼 상당수가 파라미터 바인딩 없이 동적 쿼리를 그대로 조립하고 있었습니다.",
          actions: [
            "CSP 헤더를 적용해 스크립트·스타일 출처를 제한했습니다.",
            "47개 매퍼의 동적 쿼리를 전량 파라미터 바인딩 방식으로 교체했습니다.",
          ],
          result: "외부 보안진단 지적사항을 모두 조치했습니다. 47개 매퍼의 SQL Injection이 모두 해소됐습니다.",
          brief: [
            "외부 보안진단에서 CSP 미설정과 매퍼 전반의 SQL Injection이 지적됐습니다.",
            "CSP 헤더를 적용하고 47개 매퍼의 동적 쿼리를 전량 바인딩 방식으로 교체했습니다.",
          ],
        },
        {
          diagram: "rolling-update",
          label: "에어갭 5대 클러스터 무중단 롤링 배포 - control-plane HA 대신 노드별 순차 운영으로 서비스 영향 없이 갱신",
          situation: "에어갭 클러스터는 인터넷과 매체 반입이 모두 차단돼 있고 워커 5대 규모였습니다. control-plane은 단일 노드로 구성돼 있어, 이미지를 교체하거나 노드를 재기동할 때 서비스 중단 없이 배포할 방법이 필요했습니다.",
          cause: "GitOps 기반 자동 배포는 외부 레지스트리 접근이 필요해 에어갭 환경에 그대로 쓸 수 없었고, 이 클러스터 규모(5대)에서 3노드 control-plane HA를 구성하는 비용 대비 얻는 이득도 크지 않다고 판단했습니다.",
          actions: [
            "워커 노드를 cordon으로 스케줄링에서 제외하고 drain으로 기존 파드를 다른 노드로 안전하게 옮긴 뒤, 이미지 교체·재기동 → 정상 확인까지 마치고 다음 노드로 넘어가는 절차를 셸 스크립트로 표준화해 5대 노드에 순차 적용했습니다.",
            "control-plane 단일 장애점(SPOF)은 이 환경에서는 남겨뒀지만, 이 판단이 모든 환경에 맞는 정답은 아니라고 보고 서비스 수가 늘고 관측 요구가 커진 NIPA 프로젝트에는 별도로 kube-vip 기반 3노드 control-plane HA를 구성했습니다 - 클러스터 규모와 요구사항에 따라 다른 방식을 적용했습니다.",
          ],
          result: "5대 규모 에어갭 클러스터를 서비스 중단 없이 롤링 배포로 운영했고, control-plane HA 적용 여부를 비용과 클러스터 규모·요구사항에 따라 판단하는 기준을 세웠습니다.",
          oneliner: "5대 규모 에어갭 클러스터는 control-plane HA 대신 cordon→drain→이미지 교체→정상 확인 절차를 표준화해 노드별 순차 무중단 롤링 배포 — control-plane HA는 서비스 수·관측 요구가 큰 환경에 별도 적용",
        },
      ],
    },
  ] as DocProject[],

  activities: [
    {
      title: "FESI 13기 - 백엔드 멘토링",
      org: "codeit", year: "2026",
      desc: "프론트엔드 부트캠프 수강생 6명을 대상으로 백엔드 실무 멘토링(PR 리뷰, REST API 설계, DDD·TDD 실습)을 진행했습니다.",
      notes: [
        "[IaC] Terraform으로 AWS EC2 프로비저닝, Ansible로 구성 관리 - 프로비저닝/구성 계층 분리",
        "[비용 설계] NLB 비용 구조 비교 후 AWS EC2+Nginx 게이트웨이 직접 구성 - 실습 환경 규모에서 SPOF 감수·고정비 절감 판단",
        "[성과] 51개 테스트 파일(단위·통합·E2E 3-layer 피라미드) + GitHub Actions CI 구성",
      ],
    },
    {
      title: "항해99 백엔드코스 9기",
      org: "항해99", year: "2025",
      desc: "동시성 제어와 이벤트 드리븐 아키텍처를 실전으로 검증하는 학습 프로젝트로, 상위 10%로 수료했습니다.",
      notes: [
        "[좌석 중복 예약] 비관적 락 → Redis 분산락 → 낙관적 락 순으로 전환, k6 + Grafana 부하 테스트로 트레이드오프 검증",
        "[분산 트랜잭션] Redis 대기열 → Kafka 전환, Choreography Saga + DLQ로 일관성 확보",
      ],
    },
    {
      title: "스위프(SWYP) 웹 9기 ~ 11기, 앱 4기",
      org: "스위프", year: "2025 ~ 2026",
      desc: "4개 기수에 백엔드·프론트엔드·PM으로 참여하며 팀 프로젝트를 웹·앱으로 출시했습니다.",
      notes: [],
    },
  ],
  education: PROFILE.education,
  certs: PROFILE.certs,

  /* 이력서가 아니라 포트폴리오이므로, 인프라 판단의 근거가 된 애플리케이션 레벨(백엔드·
     프론트엔드) 경험도 함께 싣는다. 단, 별도 섹션이 아니라 각 프로젝트 blocks[] 밑에 붙는
     간단한 한 줄로 - 그래서 proj로 태그해 프로젝트별로 나눠 싣는다. blocks[]와 겹치는 항목
     (KARI 에러율 11.22%→0%·Outbox)은 이미 다뤄서 뺐다. 수치는 PROFILE(풀스택 문서)에서 그대로.*/
  devNotes: [
    { text: "백엔드 - 위성 메타 목록 조회 38초→159ms", proj: "kari" },
    { text: "백엔드 - Go 타일 서버 GDAL 워핑에 세마포어 제어로 동시성 확보", proj: "kari" },
    { text: "프론트엔드 - CesiumJS 3D globe 기반 판독·가시화 화면 개발", proj: "insops" },
    { text: "프론트엔드 - jQuery·Thymeleaf 레거시를 Next.js 15 FSD로 전환, 웹 뷰어 신규 개발", proj: "nipa" },
  ] as CareerItem[],

  skills: [
    { category: "오케스트레이션·OS", items: ["Kubernetes 1.19~1.30", "Docker 19.03", "Docker Compose", "Rocky Linux", "Shell"] },
    { category: "IaC·CI/CD", items: ["Terraform 1.15", "Ansible 2.21", "Jenkins 2.568", "ArgoCD 3.4", "Nexus 3.94", "Pulp 3.115"] },
    { category: "관측성", items: ["OpenTelemetry", "Prometheus 3.13", "Grafana 13.1", "Loki 3.7", "Tempo 2.10", "Zabbix 6.4"] },
    { category: "네트워킹·보안", items: ["Cilium 1.19", "kube-vip 0.8", "Nginx 1.26", "Envoy Gateway 1.8", "Keycloak 26.7", "OpenBao 2.6", "OpenVPN"] },
    { category: "데이터·메시징", items: ["PostgreSQL 15~18", "Redis", "RabbitMQ 3.13"] },
    { category: "언어·프레임워크", items: ["Go 1.24", "Python 3.12", "FastAPI 0.115", "Java 17", "Spring Boot 3.1"] },
  ] as SkillGroup[],
};
