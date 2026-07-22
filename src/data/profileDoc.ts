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
export interface CareerItem {
  text: string;
  sub?: string[];
}
export interface CareerGroup {
  title: string;
  period?: string;
  items: CareerItem[];
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
  role: "풀스택 개발자 (백엔드 메인)",
  email: "ahn479512@gmail.com",
  github: "github.com/Ahnyeongjun",
  githubUrl: "https://github.com/Ahnyeongjun",
  portfolio: "ahnyoungjun.site",
  portfolioUrl: "https://www.ahnyoungjun.site",
  location: "서울, Korea",
  military: "면제",

  tagline: "5년차 백엔드 중심 풀스택 개발자입니다. k6 부하테스트로 에러율 11%→0%·처리량 3배, MSA 전환으로 재배포 10건→1건, DB 튜닝으로 응답속도 239배 단축까지 국가기관 납품 환경에서 수치로 증명되는 성과를 냈습니다. 프레임워크가 못 푸는 문제는 직접 만들어 해결합니다.",
  summary: [
    {
      head: "대규모 요청에도 무너지지 않는 API를 만듭니다",
      body: "국가기관 납품 플랫폼들에서 k6 부하테스트 기반 성능 개선을 주도해 50VU 동시 요청 에러율을 11.22%에서 0%로, 처리량을 392에서 1,177 req/s로 끌어올렸습니다. 병목의 대부분은 DB에 있었고, 조건부 PostGIS 실행·페이지네이션·BLOB 분리·Redis 캐싱으로 위성 메타 목록 조회를 38초에서 159ms(239배)로 단축했습니다. 쿼리 한 줄이 서비스 전체의 안정성을 좌우한다는 것을 실무에서 체득했습니다.",
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
    { v: "300여 개", l: "API 혼자 설계·구현" },
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
    overview: "입사 후 약 2년간 개발환경을 구축하고 사내 서버를 관리했으며, 이후 한국항공우주연구원(KARI)·국가보안기관·정보통신산업진흥원(NIPA) 등 국가기관을 대상으로 위성영상 처리 플랫폼의 백엔드를 설계·개발하고 Kubernetes 기반 서버 배포와 운영을 담당했습니다.",
    metrics: ["재배포 월 10건→1건", "배포 4분→30초", "메타데이터 API 38초→159ms", "GPU 4장 70파드 병렬 추론", "이벤트 유실 0건"],
    groups: [
      {
        title: "국가보안기관 위성영상 시스템 - 개발·운영·신규 구축",
        period: "2022.05 ~ 진행 중",
        items: [
          { text: "핵심 도메인 서비스 개발·운영 - 판독보고서(웹 PPT) 생성·어드민·위성 ETL(수집·전처리·적재)·AI 분석 연동" },
          { text: "레거시 모듈 점진적 전환 주도 - 인증·다운로드 안정화 → 장애 전파 최소화" },
          { text: "공통 base 모듈·자동화 도구 개발 - 반복 개발 작업 제거 → 신규 테이블 온보딩 효율화" },
          { text: "보안 취약점 진단·대응 - 브루트포스 차단 구현, 47개 매퍼 SQL Injection 전량 해소" },
          { text: "에어갭 무중단 운영 체계 수립 - 오프라인 대응 판단 체계화 → 장애 사전 감지" },
        ],
      },
      {
        title: "항공우주연구원(KARI) 위성영상 AI 처리 플랫폼 구축",
        period: "2023.10 ~ 2025.07",
        items: [
          {
            text: "테스트 문화 정착 주도 - k6·유닛테스트 도입 → 배포 후 에러율 11%→0%",
          },
          {
            text: "에어갭 망연계 개선 - 자체 Outbox 모듈 전환 → 이벤트 유실 0건",
          },
          {
            text: "SaltStack 동기 방식에서 RabbitMQ 비동기 파이프라인·단계별 큐 분리 구조로 전환",
          },
          {
            text: "CDC·Outbox 아키텍처 팀 내 설명 - 신규 도입 배경·개념 전파",
          },
          {
            text: "Go 영상 서빙 서비스 신규 개발 - WMS·MVT(MBTiles 기반) 지원",
          },
          {
            text: "운영 유연성 중심 무외래키 스키마 설계 (정합성은 애플리케이션 레벨 보장) - 입력·삭제·마이그레이션 단순화, 추후 샤딩 시 테이블 분리 저장 가능",
          },
          {
            text: "K8s 워크로드 관리 고도화 - Aliyun GPUShare로 GPU 4장 70파드 병렬 추론, Job→Deployment 전환으로 자동 복구",
          },
          {
            text: "보안 게이트웨이·정보 노출 점검 - Nginx 게이트웨이 구축·정보 노출 여부 점검",
          },
          {
            text: "AI 모델 직접 학습·서빙 - YOLOv11 객체탐지(HBB mAP50 0.644)·UPerNet 세그멘테이션(mIoU 0.72)",
          },
        ],
      },
      {
        title: "NIPA 위성 변화탐지 플랫폼 - MSA 설계",
        period: "2025.07 ~ 진행 중",
        items: [
          {
            text: "MSA 마이그레이션 주도 - 모놀리식 9개 서비스 분리 → 재배포 월10건→1건",
          },
          {
            text: "Go 영상 서빙 서비스 확장 - WMTS 컴포지트·NDJSON 레이어 지원 → 지구/달지도 멀티 레이어 대응",
          },
          {
            text: "Envoy Gateway·Keycloak 게이트웨이 구축 - 인증 통합·인증서 자동화, 팀원과 함께 참여",
          },
          {
            text: "CI/CD·GitOps 전환 참여 - Jenkins 명령형 배포 → ArgoCD GitOps",
          },
          {
            text: "관측성 통합 - Prometheus·OpenSearch·Tempo를 OTel로 수집, Grafana 단일 대시보드로 장애 원인분석 시간 단축",
          },
          {
            text: "클러스터 인프라 고도화 - Cilium(eBPF) CNI·kube-vip HA·OpenBao 시크릿 중앙화로 클러스터 안정성 확보",
          },
          {
            text: "프론트 레거시 마이그레이션 주도 - jQuery·Thymeleaf 정리 → Next.js 15 FSD 기반 웹 뷰어 개발(지구/달지도 멀티 배포)",
          },
          {
            text: "MSA·메시지 큐·FSD 프론트 아키텍처 팀 내 설명 - 신규 아키텍처 도입 배경 공유",
          },
        ],
      },
      {
        title: "드론 객체탐지 시스템 - ROS1→ROS2 마이그레이션",
        period: "2026.07",
        items: [
          { text: "ROS1(catkin/rospy) → ROS2(colcon/rclpy) 전체 패키지 마이그레이션 설계·구현" },
          { text: "ROS_DOMAIN_ID 기반 멀티 드론 격리 재설계 - 순수 로직 모듈화 + 단위 테스트 검증" },
          { text: "실장비 없는 회귀 검증 체계 구축 - pytest 단위·통합 테스트 17건 통과" },
        ],
      },
      {
        title: "사내 자동화",
        period: "2026.03 ~ 진행 중",
        items: [
          { text: "FastMCP 사내 에이전트 개발 - Git·캘린더·HRWeb 통합 → 주 30~60분 수작업 제거" },
          { text: "Claude 스킬·훅 기반 에이전트 개발 - 작업 계획·평가 자동화" },
          { text: "Jira·Bitbucket 연동 자동화 - 자동 브랜치 생성 → PR 문화 정착" },
        ],
      },
    ] as CareerGroup[],
  },

  projects: [
    {
      title: "국가보안기관 위성영상 시스템 - 개발·운영·신규 구축",
      company: "한컴인스페이스",
      period: "2022.05. ~ 진행 중",
      badge: "주도(팀 6명)",
      stack: ["Spring Boot", "Java", "MyBatis", "PostGIS", "Redis", "Spring Session", "Go", "Kubernetes", "Zabbix", "Jenkins", "Nexus"],
      desc: "위성영상을 수집·판독해 정부 표준 문서(HWP) 보고서로 산출하는 시스템입니다. API·프론트 개발부터 에어갭 무중단 운영, 신규 플랫폼 구축까지 담당했습니다.",
      blocks: [
        {
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
      title: "항공우주연구원(KARI) 위성영상 AI 처리 플랫폼 구축",
      company: "한컴인스페이스",
      period: "2023.10. ~ 2025.07.",
      badge: "주도(팀 3명)",
      stack: ["Spring Boot", "Go", "PyTorch", "FastAPI", "ONNX Runtime", "Kubernetes", "Aliyun GPUShare", "MyBatis", "Redis", "Salt-Stack", "Jenkins", "Nexus"],
      desc: "다누리·Sentinel·Landsat 등 10개 이상 위성 소스를 수집·처리해 객체탐지·세그멘테이션·초해상도 AI 추론 결과를 CesiumJS 뷰어로 가시화하는 플랫폼입니다. 한국항공우주연구원(KARI)에 납품했으며, Outbox 패턴 라이브러리·Aliyun GPUShare·자체 워크플로우 엔진을 이 프로젝트에서 설계·구현했습니다.",
      blocks: [
        {
          label: "k6·유닛테스트 도입 - 동시 부하 문제 사전 검출 → 에러율 11%→0%",
          situation: "부하테스트는 문제가 생길 때마다 사후적으로 추가되는 sh 스크립트뿐이라 미래 대비가 어려웠고, 유닛테스트 문화도 없었음",
          cause: "sh 스크립트는 이미 발생한 문제만 막을 뿐 동시 부하 상황에서만 드러나는 문제는 재현할 방법이 없었고, 유닛테스트 부재로 트랜잭션 경계·동기화 로직의 결함도 사전에 잡을 수 없었음",
          actions: [
            "가상 유저 플로우를 정의하고 k6로 부하테스트 진행",
            "API 300여 개 규모 시스템에 유닛테스트 도입",
          ],
          result: "에러율 11.22%→0%·처리량 392→1,177 req/s, 유저·권한 insert 트랜잭션 분리 버그·동기화 레이스 컨디션 등 트랜잭션 범위 문제 다수 발견·수정",
          brief: [
            "부하테스트가 사후적 sh 스크립트뿐이라 동시 부하 상황에서만 드러나는 문제를 재현할 방법이 없었고, 유닛테스트 부재로 트랜잭션 경계·동기화 로직 결함도 사전에 잡을 수 없었음",
            "가상 유저 플로우를 정의해 k6 부하테스트 도입, API 300여 개 규모 시스템에 유닛테스트 도입",
          ],
        },
        {
          label: "CDC → Outbox 전환 - CDC 인프라 의존 제거 → 이벤트 유실 0건",
          situation: "에어갭 환경은 파일로만 통신 가능해 DB 양방향 동기화도 파일 전송으로 구현해야 했고, 위성 메타·추론 테이블 로우 증가로 샤딩 가능성도 대비해야 했음. 초기엔 Debezium으로 CDC를 캡처해 Go로 파일에 저장→파일 서버 전송→반대편 Go가 읽어 DB에 적재하는 구조를 만들었고, 이 과정에서 분산 ID(Snowflake)·멱등키 설계와 bytea/EWKB 인코딩 수정도 함께 이뤄졌음",
          cause: "폐쇄망 환경의 반복되는 네트워크·서버 장애로 Debezium replication slot이 계속 깨졌음. 로그 확인 로직을 붙여 slot 파손 시 자동 재생성하는 자가치유를 구현했지만, 변경량이 많을 때는 재생성 도중 일부 데이터가 유실됐고 복구를 위해 양쪽 DB를 비교하는 로직도 비용이 만만치 않았음. 외래키는 샤딩 시 걸림돌이라 정합성 요구 낮은 테이블은 애초에 제외하기로 함",
          actions: [
            "정합성 요구 낮은 테이블만 외래키 제외하는 스키마로 설계",
            "Debezium 파일 동기화 구조에 Snowflake 분산 ID·멱등키 재설계, bytea는 LargeBinary, EWKB는 전용 디코더로 정리",
            "slot 파손 자동 재생성 자가치유를 붙였지만 데이터 유실이 남아, 결국 CDC 인프라 의존 자체를 없애는 Outbox 패턴으로 전환 - CRUD와 이벤트를 같은 트랜잭션에 적재하고 배치로 한 번에 전송",
          ],
          result: "샤딩 여지 확보, CDC 인프라 의존·slot 파손 리스크 제거, 이벤트 유실 0건",
          brief: [
            "파일로만 통신 가능한 에어갭 환경이라 Debezium CDC를 파일 전송으로 우회했으나, 폐쇄망 네트워크 불안정으로 slot이 반복 파손되고 자가치유로도 재생성 중 데이터 유실·비싼 DB 비교 복구 비용이 남음",
            "CDC 인프라 의존 자체를 제거하는 Outbox 패턴으로 전환, CRUD와 이벤트를 같은 트랜잭션에 적재·배치 전송, Snowflake worker ID에 망 정보를 인코딩해 발생 망 역추적 가능",
          ],
        },
        {
          label: "폴링 → RabbitMQ 이벤트 전환 - job 고착 해소 → GPU 4장 70파드",
          situation: "SaltStack job 폴링(00 대기·01 진행·02 완료·03 실패) 구조 - 처리 프로세스가 죽으면 job이 01(진행)에 무한히 머묾, 고정 주기 폴링(1분)으로 대기 낭비도 있었음",
          cause: "job 상태 전이를 처리 프로세스 본인이 책임지는 구조라 죽으면 복구 불가 - 타임아웃으로 땜질하기보다 폴링 구조 자체를 바꾸기로 판단. 병렬 처리도 job 다건 등록보다 이벤트 발행-구독이 구조적으로 더 효율적",
          actions: [
            "RabbitMQ 기반 이벤트 발행-구독으로 전환, 단계별 큐 분리로 병목 단계만 워커 확장",
            "Aliyun GPUShare로 GPU 분할+파드 생명주기 관리, 파드 다중화·클러스터링으로 장애 격리",
          ],
          result: "job 무한 진행 문제 근본 해결, 폴링 대기 낭비 제거, 병목 구간 선택적 확장, GPU 4장 70파드 병렬 추론",
          brief: [
            "SaltStack job 폴링 구조에서 처리 프로세스가 죽으면 작업이 진행 상태에 무한 고착됐고, 고정 주기(1분) 폴링으로 대기 낭비도 발생",
            "RabbitMQ 이벤트 발행-구독으로 전환·단계별 큐 분리로 병목 단계만 워커 확장, Aliyun GPUShare로 GPU 분할+파드 생명주기 관리·파드 다중화·클러스터링으로 장애 격리",
          ],
        },
      ],
    },
    {
      title: "NIPA 위성 변화탐지 플랫폼 - MSA 설계",
      company: "한컴인스페이스",
      period: "2025.07. ~ 진행 중",
      badge: "주도(팀 5명)",
      stack: ["RabbitMQ", "Next.js 15", "TypeScript", "CesiumJS", "FastAPI", "Go", "ONNX Runtime", "Kubernetes", "Envoy Gateway", "Keycloak", "Cilium", "ArgoCD", "Pulp", "OpenTelemetry", "OpenBao"],
      desc: "두 시점의 위성영상을 비교해 지표 변화를 AI로 탐지하는 플랫폼입니다. NIPA(정보통신산업진흥원) 지원 사업으로, MSA + FastAPI 기반으로 재설계했습니다.",
      blocks: [
        {
          label: "모놀리식 → 9개 서비스 MSA 분리 - 중복 구현 제거 → 재배포 월10건→1건",
          situation: "여러 기관에 커스텀 납품하지만 핵심 기능(AI 학습·추론·영상 가시화)은 항상 동일했고, 표적·파워포인트·로깅·인증 등 프로젝트마다 정도 차이는 있는 기능도 재사용되는 경우가 많았음",
          cause: "핵심 기능이 납품 건마다 중복 구현되고 있어, 필요한 부분만 교체하기 어려웠고 유지보수 부담도 컸음. 모놀리식이라 기능 하나 배포에도 전체 서비스 재시작 필요",
          actions: [
            "핵심 기능과 부가 기능(표적·파워포인트·로깅·인증 등)을 도메인 단위 9개 서비스로 분리해 버전 공유",
            "전 서비스 FastAPI 통일, Envoy Gateway로 경로별 라우팅·인증 처리",
          ],
          result: "기존 모듈 수정 횟수 1/5로 감소, 신규 납품 6개월 견적 → 1개월 이내 테스트·배포, 재배포 월10건→1건·배포 4분→30초",
          brief: [
            "여러 기관 커스텀 납품이지만 핵심 기능(AI 학습·추론·영상 가시화)이 납품 건마다 중복 구현돼, 필요한 부분만 교체하기 어렵고 유지보수 부담이 컸음. 모놀리식이라 기능 하나 배포에도 전체 서비스 재시작 필요",
            "핵심·부가 기능(표적·파워포인트·로깅·인증 등)을 도메인 단위 9개 서비스로 분리해 버전 공유, 전 서비스 FastAPI 통일·Envoy Gateway 경로별 라우팅",
          ],
          lines: [
            "여러 기관 커스텀 납품, 핵심 기능(AI 학습·추론·영상 가시화)이 납품 건마다 중복 구현 - 필요한 부분만 교체하기 어렵고 유지보수 부담 큼",
            "핵심·부가 기능을 도메인 단위 9개 서비스로 분리, 버전 공유·전 서비스 FastAPI 통일·Envoy Gateway 라우팅",
            "모듈 수정 횟수 1/5로 감소, 신규 납품 6개월 견적 → 1개월 이내 테스트·배포, 재배포 월 10건→1건·배포 4분→30초",
          ],
        },
        {
          label: "관측성 통합 - 9개 서비스 분리로 추적 복잡 → 장애 분석 시간 단축",
          situation: "모놀리식을 9개 서비스로 분리하면서 로그·트레이스를 통합해서 볼 수 있는 관측 스택 자체가 없었고, 하나의 요청이 여러 서비스를 거치면서 어느 구간에서 문제가 났는지 추적이 복잡해졌음",
          cause: "MSA 특성상 요청이 여러 서비스에 걸쳐 흐르면 단일 서비스 로그만으로는 원인 구간을 특정하기 어려웠고, 통합 관측 스택은 아예 신규로 갖춰야 했음",
          actions: [
            "팀원과 함께 Prometheus·OpenSearch·Tempo·Grafana를 신규 도입해 OpenTelemetry 기반 관측 스택을 새로 구축",
            "Grafana 단일 대시보드에서 로그·트레이스를 함께 조회하고 서비스 간 요청 흐름을 추적하도록 구성",
          ],
          result: "장애 원인분석 시간 단축, MSA 서비스 간 요청 흐름을 단일 대시보드에서 추적",
          brief: [
            "모놀리식을 9개 서비스로 분리하며 통합 관측 스택 자체가 없어, 하나의 요청이 여러 서비스를 거칠 때 원인 구간을 추적하기가 어려웠음",
            "팀원과 함께 Prometheus·OpenSearch·Tempo·Grafana를 신규 도입해 OTel 기반 관측 스택을 새로 갖추고, Grafana 단일 대시보드에서 로그·트레이스 조회 및 서비스 간 요청 흐름 추적",
          ],
        },
      ],
    },
    {
      title: "드론 객체탐지 시스템 - ROS1 → ROS2 마이그레이션",
      company: "한컴인스페이스",
      period: "2026.07.",
      badge: "주도(팀 2명)",
      stack: ["ROS2", "rclpy", "Python", "Docker", "PyTorch", "pytest"],
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
            "ROS1은 프로세스당 ROS_MASTER_URI로 드론을 격리했는데, ROS2엔 Master 개념 자체가 없어 기존 격리 구조를 그대로 가져갈 수 없었습니다.",
            "드론 IP를 ROS_DOMAIN_ID로 매핑하는 순수 로직 모듈(domain_map.py)을 설계하고 단위 테스트로 검증해, 기존 프로세스당-격리 아키텍처를 재사용했습니다.",
          ],
        },
        {
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
      ],
    },
  ] as DocProject[],

  activities: [
    {
      title: "FESI 13기 - 백엔드 멘토링",
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
  ],

  education: [
    { school: "한밭대학교", degree: "대학교(학사) · 융합기술학과", period: "2022.03. ~ 2026.03.", status: "졸업" },
    { school: "대덕소프트웨어마이스터고등학교", degree: "고등학교 · 소프트웨어개발과", period: "2020.03. ~ 2022.03.", status: "졸업" },
  ],

  skills: ["Spring Boot", "Java", "Kotlin", "Python", "Go", "FastAPI", "MyBatis", "PostgreSQL", "MySQL", "Redis", "RabbitMQ", "Kubernetes", "Docker", "SaltStack", "Zabbix"],

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

  tagline: "관리형 서비스에 기대지 않고, 클러스터를 바닥부터 만들고 굴려온 인프라 엔지니어",
  summary: [
    {
      head: "운영 관리를 위해 서비스를 쪼개니, 인프라도 함께 다시 설계해야 했다",
      body: "9개 서비스로 MSA 전환을 주도하며 처리 파이프라인을 단계별 큐로 분리해 처리 워커를 1개에서 15개로 수평 확장했습니다. 이후 서비스 간 트래픽 증가로 필요해진 Cilium(eBPF) 네트워킹·kube-vip HA·ArgoCD GitOps·OpenTelemetry 관측성 고도화는 팀원과 설계 방향을 함께 정하며 참여했습니다.",
    },
    {
      head: "관리형 서비스 없이, 클러스터를 직접 부트스트랩",
      body: "관리형 K8s가 없는 온프레미스 환경이라 kubeadm으로 클러스터를 직접 부트스트랩했습니다. SaltStack Minion으로 노드별 연결 상태와 메모리 사용률을 실시간 점검해 메모리 50% 미만 노드에만 AI 워크로드를 자동 할당하는 자원 인지형 배치 구조를 만들었고, Aliyun GPUShare로 GPU 한 장을 fraction 단위로 나눠 여러 컨테이너가 동시에 추론하도록 구성했습니다.",
    },
    {
      head: "인터넷이 완전히 막힌 환경에서, 인프라를 새로 짓고 지켰다",
      body: "국가보안기관 납품 시스템은 외부 검색도 라이브러리 반입도 불가능한 에어갭 환경입니다. 외부 레퍼런스 없이 호스트·서비스 상태를 실시간으로 관측할 수 있도록 Zabbix로 장애 사전 감지 체계를 직접 구축했고, 이어진 신규 구축 프로젝트에서는 물리 서버 설치부터 K8s 클러스터 구성까지 참여하며 DB 접근을 Go 기반 API 한 곳으로 중앙화해 스키마 변경 영향 범위를 좁혔습니다.",
    },
  ],
  summaryClose: "단일 컨테이너 부트스트랩에서 시작한 인프라 여정은 NIPA의 클러스터 고도화까지, 팀과 함께 이어가고 있습니다.",

  highlights: [
    { v: "kubeadm", l: "베어메탈 K8s 직접 부트스트랩" },
    { v: "GPU 4장 → 70파드", l: "Aliyun GPUShare 병렬 추론" },
    { v: "1개 → 15개", l: "처리 워커 수평 확장" },
    { v: "이벤트 유실 0건", l: "Outbox 라이브러리 직접 개발" },
  ],

  career: {
    company: "한컴인스페이스",
    position: "연구원 · 인프라 엔지니어링 · 재직 중",
    period: "2021.07. ~ 재직 중 (5년)",
    overview: "국가기관 대상 위성영상 AI 처리 플랫폼의 인프라 설계·구축·운영을 전담해왔습니다. 관리형 K8s가 없는 온프레미스·에어갭 환경에서 kubeadm 클러스터 부트스트랩부터 노드 자원 분배·GPU 공유·비동기 파이프라인·모니터링까지 인프라 전 영역을 직접 설계·구축·운영했고, 최근에는 MSA 전환에 맞춰 팀원과 함께 Cilium 기반 네트워킹·control-plane HA·ArgoCD GitOps로 인프라 영역을 계속 확장하고 있습니다.",
    metrics: ["kubeadm 베어메탈 클러스터 구축", "GPU 4장 70파드 병렬 추론", "처리 워커 1→15개 수평 확장", "에어갭 무중단 운영", "이벤트 유실 0건"],
    groups: [
      {
        title: "NIPA 클러스터 인프라 고도화 & GitOps 전환",
        period: "2025.07 ~ 진행 중",
        items: [
          { text: "RabbitMQ 단계별 큐 분리(수집→전처리→추론→후처리) - 처리 워커 1개→15개 수평 확장" },
          { text: "Cilium(eBPF)·kube-vip 클러스터 네트워킹 전환 - 서비스 증가에 따른 처리 오버헤드·단일 장애점 해결" },
          { text: "OpenBao+ESO 시크릿 중앙화, CloudNativePG PostgreSQL 운영 - 서비스별 개별 관리 부담 해소" },
          { text: "Jenkins → ArgoCD GitOps 전환, Pulp 패키지 저장소 통합 - 배포 드리프트 추적성 확보" },
          { text: "Prometheus·OpenSearch·Tempo·Grafana 신규 도입 - OTel 기반 관측 스택 구축" },
        ],
      },
      {
        title: "KARI 클러스터 인프라·비동기 파이프라인 구축",
        period: "2023.10 ~ 2025.07",
        items: [
          { text: "Kubernetes 클러스터 구축 - kubeadm 베어메탈 부트스트랩, Aliyun GPUShare로 GPU 4장 70파드 병렬 추론" },
          { text: "Nginx 게이트웨이 구축 - HTTPS 리버스 프록시·TLS 인증서·보안 헤더 통합, Wireshark 패킷 분석으로 정보 노출 여부 점검" },
          { text: "Nginx Ingress keepalive 튜닝 - 백엔드 커넥션 재사용 → TCP 핸드셰이크 오버헤드 제거" },
          { text: "CI 파이프라인에 k6 부하테스트·유닛테스트 도입 → 배포 후 에러율 11%→0%" },
          { text: "AOP+MyBatis Outbox 라이브러리 직접 개발 - CDC 인프라 의존 제거, 이벤트 유실 0건" },
        ],
      },
      {
        title: "국가보안기관 인프라 운영·신규 구축",
        period: "2024.07 ~ 진행 중",
        items: [
          { text: "에어갭(인터넷 완전 차단) 환경에서 수십 대 서버 규모 클러스터 무중단 운영, Zabbix 커스텀 대시보드로 장애 사전 감지 체계 구축" },
          { text: "가시화 전면 실패 장애 대응 - 표면 에러(디스크 부족)를 따라가 NVMe 펌웨어 이관 로직 누락까지 추적, 팀원과 함께 원인 분석·복구" },
          { text: "DB 접근을 Go 기반 API 한 곳으로 중앙화 - 스키마 변경 영향 범위를 API 레이어로 축소" },
          { text: "물리 서버 설치부터 K8s 클러스터 구성까지 신규 인프라 구축 참여" },
        ],
      },
      {
        title: "사내 자동화",
        period: "2022 ~ 진행 중",
        items: [
          { text: "DB 스키마(information_schema) 기반 CRUD 코드 자동 생성 도구 개발 - Controller·Service·Mapper·Entity 반복 작업 제거" },
          { text: "FastMCP 사내 에이전트 개발 - Git·캘린더·HRWeb 통합 → 주 30~60분 수작업 제거" },
          { text: "Claude 스킬·훅 기반 에이전트 개발 - 작업 계획·평가 자동화" },
          { text: "Jira·Bitbucket 연동 자동화 - 자동 브랜치 생성 → PR 문화 정착" },
        ],
      },
    ] as CareerGroup[],
  },

  projects: [
    {
      title: "NIPA 위성 변화탐지 플랫폼 - 클러스터·메시징 인프라 고도화",
      company: "한컴인스페이스",
      period: "2025.07. ~ 진행 중",
      badge: "주도(팀 5명)",
      stack: ["Kubernetes", "RabbitMQ", "FastAPI", "Go", "PostgreSQL", "PyTorch", "Cilium", "kube-vip", "OpenBao", "CloudNativePG", "ArgoCD", "Pulp", "OpenTelemetry", "Envoy Gateway", "Keycloak"],
      desc: "DB 폴링 방식이라 수평 확장이 막혀 있던 처리 구조를 메시지 큐 기반 비동기 아키텍처로 재설계하고, MSA 전환에 맞춰 클러스터 네트워킹·시크릿·배포·관측성까지 인프라 전 영역을 고도화했습니다.",
      blocks: [
        {
          label: "메시지 큐 기반 파이프라인 전환 - RabbitMQ 단계별 큐 분리 → 처리 워커 1개→15개",
          situation: "기존 시스템은 DB를 일정 주기로 폴링해 작업을 가져갔습니다. 워커를 늘려도 같은 DB에 더 많은 폴링 쿼리가 몰려 락 경합으로 수평 확장 효과가 거의 없었고, 완료 콜백 구조라 노드 재시작 시 콜백이 유실되면 작업이 RUNNING 상태로 고착됐습니다.",
          cause: "Kafka는 처리량이 높지만 운영 오버헤드가 컸고, 위성 처리 작업은 단위가 명확해 ack/nack 기반의 확실한 전달 보장이 되는 메시지 큐 모델이 더 적합했습니다.",
          actions: [
            "RabbitMQ를 선택하고 ack/nack + DLQ 기반 비동기 구조로 전환",
            "단일 큐가 아니라 수집→전처리→추론→후처리 단계별로 큐를 분리",
          ],
          result: "단계별 독립 확장 가능한 구조 확보, 처리 워커 컨테이너 1개→15개 수평 확장, 작업 유실 0건",
          brief: [
            "DB 폴링 방식은 워커를 늘려도 같은 DB에 폴링 쿼리가 몰려 락 경합으로 수평 확장 효과가 거의 없었고, 완료 콜백 유실 시 작업이 고착되는 문제도 있었습니다.",
            "RabbitMQ ack/nack+DLQ 기반으로 전환하고 파이프라인 단계별로 큐를 분리해, 처리 워커를 1개에서 15개로 수평 확장했습니다.",
          ],
        },
        {
          label: "클러스터 인프라 고도화 - Cilium·kube-vip·ArgoCD·OTel, 팀원과 설계",
          situation: "MSA로 9개 서비스를 분리하면서 네트워킹·시크릿·배포·관측성 각각에서 감당하기 어려운 문제가 함께 드러났습니다. kube-proxy(iptables)는 서비스 수가 늘수록 규칙 매칭이 느려졌고, control-plane은 단일 노드라 장애 시 API 서버 전체가 멈췄고, 시크릿은 서비스마다 개별 관리돼 로테이션 부담이 늘었고, Jenkins 명령형 배포는 실제 상태와 스크립트가 분리돼 드리프트 추적이 안 됐고, 통합 관측 스택 자체가 없어 장애 구간을 특정하기 어려웠습니다.",
          cause: "각 문제가 네트워킹·시크릿·배포·관측성이라는 서로 다른 영역에서 동시에 터졌기 때문에, 팀원과 영역을 나눠 각각 해결해야 했습니다.",
          actions: [
            "네트워킹 오버헤드 해결: kube-proxy를 Cilium(eBPF)로 대체해 서비스 처리를 커널 레벨에서 경량화하고 L3~L7 정책을 통합",
            "단일 장애점 제거: kube-vip로 3노드 control-plane HA 구성해 노드 장애 시에도 API 서버 무중단",
            "시크릿 관리 부담 해소: OpenBao+ESO로 시크릿 중앙화, CloudNativePG로 PostgreSQL 운영 표준화",
            "배포 추적성 확보: Jenkins 명령형 배포를 ArgoCD GitOps로 전환, Pulp로 패키지 저장소 통합",
            "관측 스택 신규 구축: Prometheus·OpenSearch·Tempo·Grafana를 새로 도입해 OTel로 수집 통합, 서비스 간 요청 흐름 추적 가능하게 구성",
          ],
          result: "클러스터 네트워킹·시크릿·배포를 팀 차원에서 표준화, 관측 스택을 신규로 갖춰 장애 원인분석 시간 단축",
          brief: [
            "MSA 전환으로 네트워킹·시크릿·배포·관측성 각 영역에서 감당하기 어려운 문제가 동시에 드러났습니다.",
            "팀원과 영역을 나눠 Cilium·kube-vip로 네트워킹·HA를, OpenBao·CloudNativePG로 시크릿·DB를, ArgoCD·Pulp로 배포를, 신규 도입한 Prometheus·Grafana 등으로 관측성을 각각 해결했습니다.",
          ],
        },
      ],
    },
    {
      title: "항공우주연구원(KARI) 위성영상 AI 처리 플랫폼 구축",
      company: "한컴인스페이스",
      period: "2023.10. ~ 2025.07.",
      badge: "주도(팀 3명)",
      stack: ["Kubernetes", "Go", "Python", "SaltStack", "Aliyun GPUShare", "PostgreSQL", "Zabbix", "Nginx", "Rocky Linux", "Jenkins", "Nexus"],
      desc: "회사의 모든 K8s 기반 AI 처리 플랫폼의 출발점이 된 프로젝트입니다. 관리형 K8s가 없는 온프레미스 환경이라 kubeadm으로 클러스터를 직접 부트스트랩했습니다.",
      blocks: [
        {
          label: "Kubernetes 클러스터 구축 - kubeadm 베어메탈 부트스트랩 + GPUShare 자원 공유",
          situation: "위성영상을 받아 AI 추론까지 흘려보내는 플랫폼을 만들어야 했는데, 컨테이너 하나가 죽으면 작업이 그냥 사라지는 구조로는 운영이 불가능했습니다. 게다가 노드당 GPU 하나를 컨테이너 하나가 점유하는 방식이라 대부분의 시간 동안 GPU가 유휴 상태였습니다.",
          cause: "워크로드가 여러 노드에 걸쳐 자동 복구돼야 하는데 Docker Compose·스크립트 관리로는 노드가 늘수록 관리 포인트가 선형으로 늘었고, 여러 모델을 동시에 띄워야 하는 요건과 1파드=1GPU 구조도 맞지 않았습니다(당시 GPU는 NVIDIA MIG 미지원).",
          actions: [
            "관리형 K8s가 없는 온프레미스 환경이라 kubeadm으로 클러스터를 직접 부트스트랩",
            "Aliyun GPUShare를 도입해 여러 컨테이너가 하나의 GPU를 fraction 단위로 나눠 쓰는 소프트웨어 레벨 공유 구성",
          ],
          result: "노드 장애 시에도 워크로드가 자동 복구되는 구조 확보(이후 모든 K8s 기반 AI 처리 플랫폼의 출발점이 됨), GPU 4장에서 70파드 병렬 추론",
          brief: [
            "컨테이너 하나가 죽으면 작업이 사라지는 구조로는 운영이 불가능했고, 노드당 GPU 하나를 컨테이너 하나가 점유해 대부분의 시간 동안 GPU가 유휴 상태였습니다.",
            "kubeadm으로 클러스터를 직접 부트스트랩하고, Aliyun GPUShare로 GPU를 fraction 단위로 나눠 GPU 4장에서 70파드 병렬 추론을 달성했습니다.",
          ],
        },
        {
          label: "Debezium CDC 안정화 - Outbox 전환 및 자가치유 운영 → 이벤트 유실 0건",
          situation: "Debezium CDC의 replication slot이 반복 파손돼 전체 스냅샷을 재수행해야 했고, 외부망·폐쇄망 DB 동기화도 필요했지만 망연계 솔루션이 파일 기반 전송만 지원했습니다.",
          cause: "CDC 방식은 DB 로그 기반이라 slot 파손 시 외부 인프라 의존도가 높아 안정성을 보장하기 어려웠고, API 폴링은 망 구조상 불가능했으며 DB 덤프 주기 전송은 실시간성이 너무 떨어졌습니다. 망연계용으로 유지한 CDC 구간에서도 상태 판정 우선순위 오류로 WAL 완전 유실 상황을 '비활성'으로 오판해 필요한 slot 재생성을 건너뛰는 버그가 있었습니다.",
          actions: [
            "일반 이벤트 처리는 CDC 인프라 의존을 걷어내고 AOP + MyBatis Executor 인터셉터 기반 Outbox 라이브러리 직접 개발",
            "망연계 구간은 Debezium CDC로 WAL 레벨 변경분을 JSON 파일로 반출·반입하는 망 분리 우회형 아키텍처로 유지하되, 상태 판정 순서를 NOT_FOUND→WAL lost→inactive→healthy로 재정렬하고 강제종료→slot 재생성→검증까지 이어지는 자가치유 함수로 자동 복구",
          ],
          result: "이벤트 유실 0건으로 애플리케이션 레벨 이벤트 보장, 보안 지침을 지키면서도 망연계 실시간성 확보, 유지되는 CDC 구간도 재시도 폭주 없는 자가치유 구조 확보",
          brief: [
            "Debezium CDC의 replication slot이 반복 파손돼 전체 스냅샷 재수행이 필요했고, 망연계 솔루션은 파일 기반 전송만 지원해 API 폴링도 불가능했습니다.",
            "일반 이벤트는 Outbox 라이브러리로 CDC 의존 자체를 걷어냈고, 망연계용으로 유지한 Debezium 구간은 상태 판정 순서를 재정렬해 자가치유 자동 복구 스크립트로 안정화했습니다.",
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
          result: "HTTPS 종단·인증서·보안 헤더·게이트웨이 라우팅을 Nginx 한 곳에서 통합, 정보 노출 여부 사전 점검 체계 마련",
          brief: [
            "Tomcat 단독으로는 인증서·보안 헤더 관리가 번거로웠고, 서비스가 각자 노출되다 보니 보안 정책 통합도 응답의 정보 노출 여부 확인도 어려웠습니다.",
            "Nginx를 HTTPS 리버스 프록시 겸 단일 게이트웨이로 구성해 인증서·보안 헤더·라우팅을 통합하고, Wireshark 패킷 분석으로 정보 노출 여부까지 점검했습니다.",
          ],
        },
        {
          label: "Nginx Ingress keepalive 튜닝 → TCP 핸드셰이크 오버헤드 제거",
          situation: "위성영상 타일 요청이 트래픽 대부분을 차지하는데, 매 요청마다 TCP 핸드셰이크가 반복되는 오버헤드가 있었습니다.",
          cause: "Nginx Ingress의 기본 설정은 백엔드로의 커넥션을 요청마다 새로 맺어, 핸드셰이크 비용이 그대로 응답 지연에 더해졌습니다.",
          actions: [
            "Nginx Ingress의 upstream keepalive 설정으로 백엔드 커넥션을 재사용하도록 튜닝",
          ],
          result: "TCP 핸드셰이크 오버헤드 제거, K8s 레플리카를 늘려도 그대로 스케일되는 구조 확보",
          brief: [
            "타일 요청이 트래픽 대부분을 차지하는데 매 요청마다 TCP 핸드셰이크가 반복돼 응답 지연이 누적됐습니다.",
            "Nginx Ingress upstream keepalive로 백엔드 커넥션을 재사용하도록 튜닝해 핸드셰이크 오버헤드를 제거하고 K8s 레플리카 확장에도 그대로 대응하도록 만들었습니다.",
          ],
        },
        {
          label: "CI 파이프라인 테스트 자동화 - k6 부하테스트·유닛테스트 도입 → 배포 후 에러율 11%→0%",
          situation: "배포 파이프라인에 자동화된 테스트가 없어, 부하 상황에서만 드러나는 문제나 트랜잭션 경계 결함이 배포 이후에나 발견됐습니다.",
          cause: "부하테스트는 문제가 생길 때마다 추가되는 사후적 sh 스크립트뿐이었고, 유닛테스트도 없어 CI 단계에서 걸러낼 방법이 없었습니다.",
          actions: [
            "가상 유저 플로우를 정의해 k6 부하테스트를 Jenkins 파이프라인에 편입",
            "API 300여 개 규모 시스템에 유닛테스트를 도입해 CI 단계에서 자동 실행",
          ],
          result: "배포 후 에러율 11.22%→0%, 트랜잭션 경계·동기화 결함을 배포 전 CI 단계에서 검출",
          brief: [
            "배포 파이프라인에 자동화된 테스트가 없어 부하 상황에서만 드러나는 문제나 트랜잭션 결함이 배포 이후에야 발견됐습니다.",
            "k6 부하테스트와 유닛테스트를 Jenkins CI 파이프라인에 편입해 배포 전 자동 검증 단계를 만들었고, 배포 후 에러율을 11.22%에서 0%로 낮췄습니다.",
          ],
        },
      ],
    },
    {
      title: "국가보안기관 위성영상 AI 처리 플랫폼 운영·신규 구축",
      company: "한컴인스페이스",
      period: "2024.07. ~ 진행 중",
      badge: "주도(팀 6명)",
      stack: ["Kubernetes", "Docker", "Rocky Linux", "Go", "PostgreSQL", "GDAL", "Zabbix", "Shell", "Jenkins", "Nexus"],
      desc: "인터넷이 완전히 차단된 에어갭 환경에서 수십 대 서버 규모 클러스터를 무중단 운영하는 위성영상 AI 처리 플랫폼 운영을 맡았고(2024.07~), 이어서 다종위성 수집·처리 플랫폼을 물리 베어메탈 서버 설치부터 K8s 클러스터 구성, DB 설계, 파이프라인 구현까지 전 과정 신규 구축했습니다(2025.06~2025.12).",
      blocks: [
        {
          label: "에어갭 무중단 운영 - Zabbix 장애 사전 감지 체계",
          situation: "외부 인터넷이 차단된 에어갭 환경이라 장애가 발생해도 사용자 신고 전까지는 인지가 늦는 구조였습니다.",
          cause: "호스트·서비스 상태를 실시간으로 관측할 모니터링 체계가 없었습니다.",
          actions: [
            "Zabbix로 호스트·서비스 모니터링 및 커스텀 대시보드 직접 구축",
          ],
          result: "장애 사전 감지 체계 확보",
          brief: [
            "외부 인터넷이 차단된 에어갭 환경이라 장애를 사후에야 인지하는 구조였습니다.",
            "Zabbix 커스텀 대시보드로 호스트·서비스 상태를 실시간 모니터링해 장애를 사전에 감지하도록 만들었습니다.",
          ],
        },
        {
          label: "가시화 전면 실패 장애 - 표면 에러를 따라가 만난 진짜 원인",
          situation: "어느 날 가시화 작업이 전부 실패 처리되기 시작했습니다. 로그에는 No space left on device가 찍혀 단순 디스크 부족처럼 보였지만, 마운트된 스토리지 용량을 확인하니 여유가 충분히 남아 있었습니다.",
          cause: "명령어로 본 용량과 실제 동작이 어긋나 있어, 컨테이너가 아니라 마운트된 스토리지 자체의 문제로 의심됐습니다. 팀원과 함께 스토리지 장비에 원격 접속해 NVMe 상태를 확인한 결과 실제 여유 용량이 0이었고, 업체 운영 코드를 검토한 결과 펌웨어 업그레이드 과정에서 NVMe→system pool 데이터 이동 로직이 누락된 것이 근본 원인이었습니다.",
          actions: [
            "마운트 경로에 빈 파일을 만들어 단순 쓰기조차 실패하는 것을 확인, 컨테이너가 아닌 스토리지 자체 문제로 범위를 좁힘",
            "팀원과 함께 스토리지 장비에 원격 접속해 NVMe 상태를 직접 확인하고, 업체 운영 코드까지 검토해 펌웨어 이관 로직 누락을 발견",
            "임시 패치로 서비스를 즉시 복구한 뒤 업체 정식 패치 연동까지 마무리",
          ],
          result: "컨테이너→마운트→디바이스→펌웨어로 경계를 넘어 근본 원인 추적, 외부 레퍼런스 없이 시스템 하부 레이어까지 내려가는 트러블슈팅 경험 확보",
          brief: [
            "가시화 작업이 전부 실패했는데 로그상 디스크 부족처럼 보였지만 실제 마운트 용량은 여유가 있어, 표면적 에러와 실제 동작이 어긋나 있었습니다.",
            "팀원과 함께 스토리지 장비에 직접 접속해 NVMe 실사용량을 확인하고 업체 코드까지 검토해 펌웨어 이관 로직 누락을 찾아, 임시 패치 후 정식 패치까지 연동해 복구했습니다.",
          ],
        },
        {
          label: "DB 접근 계층 중앙화(신규 구축) → 스키마 변경 영향 API 레이어로 축소",
          situation: "이어서 주도한 다종위성 수집·처리 플랫폼 신규 구축 프로젝트에서, 기존 프로젝트들은 각 서비스(카탈로깅, 작업 관리, 가시화 등)가 ORM으로 DB에 직접 접근하는 구조였습니다.",
          cause: "DB 접근 로직과 자격증명이 모든 서비스에 흩어져 있어 스키마가 바뀌면 여러 서비스를 동시에 수정해야 했고, Python ORM과 Go가 같은 DB를 다룰 때 접근 패턴도 서로 어긋났습니다. 언어별로 각자의 ORM 계층을 개선하는 방법도 있었지만, 스키마가 바뀔 때마다 여러 서비스를 동시에 고쳐야 하는 근본 문제 자체는 해결되지 않는 미봉책이었습니다.",
          actions: [
            "독립 스키마를 새로 짜는 기회를 활용해 DB 접근을 Go 기반 API 한 곳으로 중앙화",
            "모든 서비스가 HTTP로만 DB에 접근하도록 재설계",
          ],
          result: "스키마 변경 영향 범위가 API 레이어 한 곳으로 축소, 서비스는 언어와 무관하게 동일한 방식으로 DB 접근 가능",
          brief: [
            "서비스마다 ORM으로 DB에 직접 접근해 스키마 변경 시 여러 서비스를 동시 수정해야 했고, 언어별 ORM 개선만으로는 이 구조적 문제가 해결되지 않았습니다.",
            "DB 접근을 Go 기반 API 한 곳으로 중앙화해, 스키마 변경 영향 범위를 API 레이어 하나로 좁히고 언어 무관하게 동일한 방식으로 DB에 접근하도록 만들었습니다.",
          ],
        },
        {
          label: "베어메탈부터 시작한 신규 인프라 구축",
          situation: "관리형 인프라가 없는 신규 구축 프로젝트로, 물리 서버 설치부터 시작해야 했습니다.",
          cause: "검증된 패턴을 그대로 가져올 수 없는 영역(물리 서버 구성, DB 스키마, 수집기 통합)이 많아 운영 시나리오에 맞게 새로 설계해야 했습니다.",
          actions: [
            "물리 서버 설치, K8s 클러스터 구성에 참여",
            "다종 수집기 통합, DB 기반 중복 체크, zst/tar.gz 포맷 변환 자동화 구현",
            "히스토그램 스트레칭 자동화, COG 포맷 적용으로 가시화 성능 개선",
            "등록일 기준 자동 삭제 서비스 구축",
          ],
          result: "베어메탈에서 운영 가능한 시스템까지 인프라 전 과정에 참여한 경험 확보",
          brief: [
            "관리형 인프라 없이 물리 서버 설치부터 시작해야 하는 신규 구축 프로젝트였습니다.",
            "물리 서버·K8s 클러스터 구성 참여부터 수집기 통합·포맷 변환 자동화·히스토그램 스트레칭·자동 삭제 워크플로우 구현까지 인프라 전 과정에 참여했습니다.",
          ],
        },
      ],
    },
  ] as DocProject[],

  activities: [
    {
      title: "FESI 13기 - 백엔드 멘토링",
      org: "codeit", year: "2026",
      desc: "프론트엔드 부트캠프 수강생 6명 대상 실무 방식 기반 멘토링 (PR 리뷰, REST API 설계, DDD·TDD 실습).",
      notes: [
        "[동시성] 동시 신청 시 maxMembers 초과 가능 → PESSIMISTIC_WRITE 락 + Batch UPDATE로 원자적 증감 처리",
        "[강결합] 알림 실패가 모임 데이터에 영향 → @TransactionalEventListener(AFTER_COMMIT)로 이벤트 분리, fault tolerance 확보",
        "[배포] AWS 환경에 GitHub Actions CI/CD로 배포, 51개 테스트 파일(단위·통합·E2E 3-layer 피라미드) 구성",
      ],
    },
    {
      title: "스위프(SWYP) 웹 9기 ~ 11기, 앱 4기",
      org: "스위프", year: "2025 ~ 2026",
      desc: "4개 기수에 백엔드·프론트엔드·PM으로 참여하며 팀 프로젝트를 웹·앱으로 출시했습니다.",
      notes: [
        "9기 백엔드(모먼티어), 10기 프론트엔드(축지법), 11기 PM·프론트엔드(위딩), 앱 4기 백엔드(Mapin)",
        "[배포] NCP(네이버클라우드플랫폼) 환경에 배포",
      ],
    },
    {
      title: "항해99 백엔드코스 9기",
      org: "항해99", year: "2025",
      desc: "동시성 제어와 이벤트 드리븐 아키텍처를 실전으로 검증하는 학습 프로젝트. 상위 10% 수료.",
      notes: [
        "[좌석 중복 예약] 비관적 락 → Redis 분산락 → 낙관적 락 순으로 전환, k6 + Grafana 부하 테스트로 트레이드오프 검증",
        "[분산 트랜잭션] Redis 대기열 → Kafka 전환, Choreography Saga + DLQ로 일관성 확보",
        "[배포] 온프레미스 환경에 Docker Compose로 배포, GitHub Actions CI 구성",
      ],
    },
  ],
  education: PROFILE.education,
  certs: PROFILE.certs,

  skills: ["Kubernetes", "Docker", "Cilium", "kube-vip", "ArgoCD", "SaltStack", "Zabbix", "Nginx", "Envoy Gateway", "Keycloak", "OpenBao", "CloudNativePG", "OpenTelemetry", "Prometheus", "Grafana", "Go", "Python", "RabbitMQ", "PostgreSQL", "GDAL", "FastAPI", "Redis", "MySQL", "Kafka", "Jenkins", "Nexus"],
};
