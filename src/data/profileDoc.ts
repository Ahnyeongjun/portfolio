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
  military: "면제",

  tagline: "5년간 국가기관 납품 플랫폼의 백엔드를 맡아, 구조적 병목을 직접 파고들어 아키텍처 개선으로 수치를 바꿔온 개발자입니다.",
  summary: [
    {
      head: "대규모 요청에도 무너지지 않는 API를 만듭니다",
      body: "국가기관 납품 플랫폼에서 k6 부하테스트 기반 성능 개선을 주도해 50VU 동시 요청 에러율을 11.22%에서 0%로, 처리량을 392에서 1,177 req/s로 끌어올렸습니다. 병목의 대부분은 DB에 있었습니다. 조건부 PostGIS 실행·페이지네이션·BLOB 분리·Redis 캐싱으로 위성 메타 목록 조회를 38초에서 159ms(239배)로 단축했고, 32개 매퍼에 있던 SQL injection 취약점을 화이트리스트 검증으로 전량 교체했습니다. 쿼리 한 줄이 서비스 전체의 안정성을 좌우한다는 것을 실무에서 체득했습니다.",
    },
    {
      head: "프레임워크가 못 해주는 것은 직접 만듭니다",
      body: "물리 망분리 환경에서 Debezium CDC의 replication slot이 반복 파손되자, Spring AOP + MyBatis Executor 인터셉터로 Outbox 패턴 라이브러리를 직접 구현해 CDC 인프라 의존을 제거하고 이벤트 유실 0건을 달성했습니다. 폐쇄망이라 분산 ID 코디네이터조차 둘 수 없어, Snowflake 알고리즘의 worker ID에 망 정보를 인코딩해 장애 시 발생 서버까지 역추적되는 전역 유일 ID 발급 체계를 직접 만들었습니다. DRM 암호화 파일이 동시 다운로드 시 조각별 재암호화로 깨지는 동시성 버그를 바이트 레벨에서 추적해 요청 직렬화로 해결하는 등, 프레임워크 아래 계층의 문제도 회피하지 않고 직접 풀어왔습니다.",
    },
    {
      head: "배포가 두렵지 않은 구조를 만듭니다",
      body: "폐쇄망 납품 환경에서는 한 번 터진 에러를 곧바로 손볼 수 없어, 배포 전에 문제를 잡는 데 집중했습니다. 보안 체크리스트와 JUnit 통합 테스트를 파이프라인에 선반영하고, 모놀리식을 도메인 단위 9개 서비스로 분리(MSA)해 전체 재배포 월 10건→1건, 배포 4분→30초, 사내 에러 문의 주 2~3회→월 1회로 줄였습니다.",
    },
  ],
  summaryClose: "이 경험을 더 큰 트래픽의 컨슈머 서비스에서 이어가고 싶습니다.",

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
    overview: "입사 후 약 2년간 개발환경을 구축하고 사내 서버를 관리했으며, 이후 한국항공우주연구원(KARI)·국가보안기관·정보통신산업진흥원(NIPA) 등 국가기관을 대상으로 위성영상 처리 플랫폼의 백엔드를 설계·개발하고 Kubernetes 기반 서버 배포와 운영을 담당했습니다.",
    metrics: ["재배포 월 10건→1건", "배포 4분→30초", "메타데이터 API 38초→159ms", "GPU 4장 70파드 병렬 추론", "이벤트 유실 0건"],
    groups: [
      {
        title: "국가보안기관 위성영상 시스템 - 개발·운영·신규 구축",
        period: "2022.05 ~ 진행 중",
        items: [
          "Spring Boot·MyBatis·PostGIS 기반 9개 모듈 시스템에서 인증·다운로드 API를 2년간 end-to-end 개발",
          "Spring Security 필터+AOP 선언적 인가 설계, Redis 세션 통제·위험도별 Rate Limiting으로 보안 체계 직접 구축",
          "외부 보안 진단 지적사항(CSP·SQL Injection 등 10건 이상) 전량 대응 완료",
          "information_schema 기반 Entity·MyBatis mapper 자동 생성 도구 - 40여 테이블 보일러플레이트 제거",
          "에어갭 환경 수십 대 서버 클러스터 무중단 운영 - NVMe 펌웨어 레벨 장애 추적, 수억 픽셀 영상 OOM 대응, Zabbix 사전 감지",
          "신규 플랫폼 DB 접근 계층 Go API 중앙화 · 다중 레이어 타일 서버 동시성 재설계 - 베어메탈부터 전 과정 신규 구축",
        ],
      },
      {
        title: "항공우주연구원(KARI) 위성영상 처리 플랫폼 구축",
        period: "2023.10 ~ 2025.07",
        items: [
          "k6 부하테스트 기반 API 최적화 - PostGIS 38초→159ms(239배), 50VU 에러율 11.22%→0%, 처리량 392→1,177 req/s",
          "외래키 없는 스키마 설계 - 샤딩을 염두에 둔 트레이드오프, 유저 생성 트랜잭션 경계 버그 수정",
          "Spring AOP + MyBatis Executor 인터셉터 Outbox 라이브러리 직접 개발, CDC 이벤트 멱등키 재설계 - 이벤트 유실 0건·23개 테이블 dedup",
          "Go 영상 서빙 서버(WMS·WMTS·MVT) - 객체탐지 오버레이 응답 약 5분→1초 이내",
          "GPU 4장 70파드 추론 운영 - 일 처리량 200건→3,000건",
        ],
      },
      {
        title: "NIPA 위성 변화탐지 플랫폼 - MSA 설계",
        period: "2025.07 ~ 진행 중",
        items: [
          "모놀리식을 도메인 단위 9개 서비스로 분리 - 재배포 월 10건→1건, 배포 4분→30초",
          "RabbitMQ ack/nack + DLQ 비동기 파이프라인 - 작업 유실 0건",
          "Keycloak OIDC + Envoy Gateway 게이트웨이 레벨 인증 - 정책 변경 시 SecurityPolicy 1개 수정",
        ],
      },
      {
        title: "사내 자동화",
        period: "2026.03 ~ 2026.04",
        items: [
          "FastMCP 기반 Git·캘린더·HRWeb 통합 에이전트 - 1인 담당 서비스 1개→5개",
        ],
      },
    ],
  },

  projects: [
    {
      title: "NIPA 위성 변화탐지 AI 플랫폼 - MSA 설계",
      company: "한컴인스페이스",
      period: "2025.07. ~ 진행 중",
      stack: ["RabbitMQ", "Next.js 15", "TypeScript", "CesiumJS", "FastAPI", "Go", "ONNX Runtime", "Kubernetes", "Envoy Gateway", "Keycloak"],
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
            "Salt 폴링 ack/nack 없어 노드 재시작 시 작업 RUNNING 고착 - 수동 DB 복구 반복",
            "RabbitMQ ack/nack + DLQ 비동기 파이프라인으로 전환 - 처리 완료 전 연결 끊기면 자동 재투입, 3회 초과 시 DLQ 격리",
            "작업 유실 0건",
          ],
        },
        {
          label: "게이트웨이 레벨 인증",
          situation: "서비스별 JWT 직접 검증으로 인증 코드 중복",
          cause: "정책 변경 시 전 서비스 동시 수정 필요, 신규 서비스마다 JWT 미들웨어 직접 추가",
          actions: [
            "Keycloak OIDC Provider 도입, Envoy Gateway SecurityPolicy를 HTTPRoute 단위로 적용해 인증을 게이트웨이 레벨로 이동",
            "forwardAccessToken으로 인증된 요청에만 Access Token 헤더 전달, 백엔드는 헤더 사용자 정보만 사용",
            "서비스별 Keycloak 클라이언트 분리, SealedSecret으로 클라이언트 시크릿 암호화",
          ],
          result: "정책 변경 시 SecurityPolicy 1개만 수정, 신규 서비스는 Policy 연결만으로 인증 적용, Keycloak 세션 공유 SSO 확보",
          brief: [
            "서비스가 늘어날수록 각 FastAPI 서비스가 JWT 검증을 직접 처리해 인증 코드가 중복되고, 정책 변경 시 전 서비스를 동시에 수정해야 했습니다.",
            "Keycloak OIDC와 Envoy Gateway SecurityPolicy로 인증을 게이트웨이 레벨로 끌어올려, 정책 변경은 SecurityPolicy 1개만 수정하면 되도록 만들었습니다.",
          ],
          lines: [
            "서비스별 JWT 직접 검증으로 인증 코드 중복 - 정책 변경 시 전 서비스 동시 수정, 신규 서비스마다 미들웨어 직접 추가",
            "Keycloak OIDC Provider 도입, Envoy Gateway SecurityPolicy를 HTTPRoute 단위 적용 - forwardAccessToken으로 헤더 전달",
            "SecurityPolicy 1개만 수정하면 정책 변경 완료, Keycloak 세션 공유 SSO 확보",
          ],
        },
        {
          label: "MSA 전환",
          situation: "모놀리식으로 기능 하나 배포 시 전체 서비스 재시작",
          cause: "모든 기능이 단일 프로세스로 결합, 도메인 경계 없음",
          actions: [
            "MSA 분리, 전 서비스 FastAPI 전환, Envoy Gateway로 경로별 라우팅·OIDC 인증 처리",
          ],
          result: "재배포 월 10건→1건, 배포 속도 4분→30초",
          brief: [
            "모든 기능이 단일 프로세스로 결합돼 도메인 경계 부재, 기능 하나 배포에도 전체 서비스 재시작으로 배포 시마다 운영 중단",
            "도메인 단위 9개 서비스로 분리, 전 서비스 FastAPI 통일·Envoy Gateway 라우팅",
          ],
          lines: [
            "모놀리식으로 기능 하나 배포 시 전체 재시작 - 잦은 배포마다 운영 중단 발생",
            "MSA 분리, 전 서비스 FastAPI 전환, Envoy Gateway 라우팅 - 서비스별 독립 배포·장애 격리 확보",
            "재배포 월 10건→1건, 배포 속도 4분→30초",
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
          label: "어드민 페이지 성능 개선 - 부하 테스트 기반 병목 진단",
          situation: "국가기관 납품으로 보안 요구사항 엄격, k6 50VU 부하테스트에서 에러율 11.22% 발생. 같은 시기 SaltStack master 파드도 반복적으로 CrashLoopBackOff에 빠짐",
          cause: "32개 매퍼에 SQL injection 취약점 존재, 페이지네이션·조건 없는 쿼리로 4가지 성능 병목(PostGIS 미조건 실행·카테시안 곱·BLOB의 커넥션 독점·조회 API의 반복적 트랜잭션 생성) 발생. CrashLoopBackOff는 livenessProbe가 전체 minion을 순회하며 kubectl exec까지 수행하는 무거운 스크립트였고 probe timeout(1초)과 충돌한 것이 원인",
          actions: [
            "보안 체크리스트 선반영, JUnit 통합 테스트 작성",
            "SQL injection 취약점을 화이트리스트 검증으로 교체",
            "조건부 PostGIS 실행, 페이지네이션, BLOB 컬럼 분리·인덱스 추가, Redis 캐싱 적용",
            "조회 API에서 테이블마다 별도로 열리던 트랜잭션을 단일 트랜잭션으로 통합해 HikariCP 커넥션 점유 축소",
            "SaltStack master 파드의 헬스체크를 프로세스 생존 확인(pgrep)만으로 경량화하고 timeoutSeconds·periodSeconds 재조정",
          ],
          result: "위성 메타 목록 38초→159ms(239배), 50VU 에러율 11.22%→0%, 처리량 392→1,177 req/s",
          brief: [
            "32개 매퍼에 SQL injection 취약점, k6 50VU 부하테스트 에러율 11.22%, SaltStack master 파드 CrashLoopBackOff 반복 발생.",
            "SQLi 화이트리스트 전환, 조건부 실행·페이지네이션·인덱스·캐싱·트랜잭션 통합으로 병목 해소, 헬스체크 경량화로 파드 안정성 확보.",
          ],
        },
        {
          label: "외래키 없는 스키마 설계 - 샤딩을 염두에 둔 트레이드오프",
          situation: "위성 메타·추론 결과 테이블의 로우 수가 계속 늘어 향후 샤딩·파티셔닝 가능성을 염두에 둬야 했음",
          cause: "외래키는 참조 대상 테이블이 다른 샤드로 옮겨가는 순간 걸림돌이 되고, 대상 데이터는 관측·추론 결과성이라 일부 참조가 깨져도 치명적이지 않았음. 다만 이 판단이 유저 생성처럼 정합성이 중요한 경로에도 그대로 적용돼, 유저·권한 insert가 각각 별도 트랜잭션으로 실행되며 한쪽만 실패하면 정합성이 깨지는 버그가 있었음",
          actions: [
            "정합성 요구가 낮은 관측·추론 결과성 테이블에 한해 외래키 제약을 두지 않는 스키마로 설계",
            "유저·권한 insert를 하나의 트랜잭션으로 묶어 원자성 확보 - 스키마에서 포기한 정합성을 필요한 경로에서는 트랜잭션 경계로 재확보",
          ],
          result: "샤딩 여지 확보, 유저 생성 정합성 버그 근본 해결",
          brief: [
            "테이블 로우 증가로 샤딩을 염두에 둬야 했는데, 이 판단이 유저 생성에도 적용돼 유저·권한 insert가 별도 트랜잭션이라 정합성이 깨지는 버그 발생.",
            "정합성 요구 낮은 테이블만 외래키 제외, 유저 생성은 단일 트랜잭션으로 묶어 원자성 확보.",
          ],
        },
        {
          label: "Debezium CDC 안정화 - Outbox 전환·자가치유·멱등키 설계",
          situation: "외부망↔폐쇄망 물리 분리 환경에서 DB 양방향 동기화·분산 ID 발급이 필요했고, 유지되는 CDC 파이프라인에서도 Debezium replication slot이 반복 파손됨. 재전달된 CDC 이벤트가 멱등키 설계 결함으로 중복 반영되는 문제도 있었음",
          cause: "Debezium CDC는 slot 파손 시 전체 재동기화가 필요해 안정성이 낮았고 UUID v4로는 발생 망·서버 역추적이 불가했으며, 상태 판정 우선순위 오류로 WAL 완전 유실 상황도 '비활성'으로 오판해 필요한 slot 재생성을 건너뛰는 버그도 있었음. 멱등키는 payload 서명에 타임스탬프 컬럼까지 포함돼 동일 이벤트도 재전달마다 다른 서명이 생성됐고, 원본 payload를 얕은 참조로 들고 있어 처리 중 오염되는 문제도 있었음",
          actions: [
            "폐쇄망 동기화 용도로는 Debezium CDC를 제거하고 MyBatis Executor 인터셉터 기반 Outbox 라이브러리 직접 구현, Snowflake 알고리즘으로 worker ID 비트 영역에 망 정보(외부망·내부망·분리망) 인코딩",
            "그래도 유지해야 하는 CDC 파이프라인은 상태 판정 순서를 NOT_FOUND→WAL lost→inactive→healthy로 재정렬하고, 강제종료→slot 삭제→재생성→검증 4단계 복구 함수로 자가치유 자동화(연속 3회 실패 시에만 트리거)",
            "휘발성 컬럼을 제외하고 정렬해 정규화하는 서명 로직으로 멱등키를 재설계, 원본 payload는 deepcopy로 참조 분리 - 수신·처리 계층 양쪽에 동일 로직 독립 구현",
          ],
          result: "이벤트 유실 0건, 전역 유일 ID 발급 확보, 23개 테이블 CDC dedup 안전 처리",
          brief: [
            "Debezium replication slot 반복 파손, 재전달 CDC 이벤트가 멱등키 설계 결함(타임스탬프 포함 서명)으로 중복 반영.",
            "폐쇄망용은 Outbox+Snowflake로 Debezium 의존 제거, 유지 구간은 자가치유 스크립트로, 이벤트 중복은 멱등키 재설계로 각각 안정화.",
          ],
        },
        {
          label: "영상 서빙 속도 개선",
          situation: "수십~수백 MB GeoTIFF 원본을 그대로 내려주면 뷰어가 렌더링 불가",
          cause: "WMS는 BBOX가 매번 달라 캐시 히트율이 0%에 수렴, 객체탐지 결과 GeoJSON은 요청마다 동적 생성돼 줌 레벨과 무관하게 항상 풀 디테일로 직렬화",
          actions: [
            "Go로 영상 서빙 서버 구현, WMS·WMTS·MVT 세 프로토콜 지원",
            "WMTS 256×256 고정 격자 타일 사전 생성·디스크 캐싱으로 베이스맵 서빙",
            "객체탐지 결과를 GeoJSON 동적 생성에서 ETL 단계 MVT 사전 생성으로 전환",
          ],
          result: "WMTS 타일 캐싱 2.4s→0.4s, MVT 전환으로 객체탐지 오버레이 응답 약 5분→1초 이내",
          brief: [
            "수십~수백 MB GeoTIFF 원본을 그대로 내려주면 뷰어가 렌더링하지 못했고, 객체탐지 결과를 GeoJSON으로 매번 동적 생성해 캐싱 효과 없이 응답에 최대 5분이 걸렸습니다.",
            "Go로 영상 서빙 서버를 구현해 WMS·WMTS·MVT 세 프로토콜을 지원하고, 베이스맵은 WMTS 타일 사전 생성·캐싱으로, 객체탐지 결과는 ETL 단계 MVT 사전 생성으로 전환했습니다.",
          ],
          lines: [
            "GeoTIFF 원본 직접 서빙 시 뷰어 렌더링 불가, 객체탐지 결과 GeoJSON 동적 생성으로 캐싱 불가·응답 최대 5분",
            "Go 영상 서빙 서버 구현 - WMS·WMTS·MVT 지원, WMTS 타일 사전생성·캐싱, 객체탐지 결과 MVT 사전생성 전환",
            "WMTS 타일 캐싱 2.4s→0.4s, MVT 전환으로 객체탐지 오버레이 응답 약 5분→1초 이내",
          ],
        },
        {
          label: "대용량 산출물 다운로드 재설계",
          situation: "goroutine+channel 기반 다운로드 압축 로직에서 타임아웃 시 채널 close와 결과 전송이 경쟁해 panic 위험",
          cause: "압축 결과를 메모리로 한 번에 스트리밍해 Range(재개 다운로드) 요청도 지원 불가",
          actions: [
            "압축 결과를 임시파일로 만든 뒤 원자적 rename으로 캐싱(TTL 1시간)",
            "채널 기반 동시성 코드를 제거하고 HTTP Range 요청(재개 다운로드) 지원 방식으로 재작성",
          ],
          result: "채널 경쟁조건 제거, 캐시 응답으로 재압축 회피, 재개 다운로드 지원",
          brief: [
            "goroutine+channel로 구현된 다운로드 압축 로직에 타임아웃 시 채널 close와 결과 전송이 경쟁하는 panic 위험이 있었고, Range 재개 다운로드도 지원하지 않았습니다.",
            "압축 결과를 원자적 rename으로 캐싱하고 HTTP Range 요청을 지원하는 파일 기반 스트리밍으로 재설계해 동시성 버그를 제거하고 재개 다운로드를 지원했습니다.",
          ],
        },
      ],
    },
    {
      title: "국가보안기관 위성영상 시스템 - 개발·운영·신규 구축",
      company: "한컴인스페이스",
      period: "2022.05. ~ 진행 중",
      stack: ["Spring Boot", "Java", "MyBatis", "PostGIS", "Redis", "JWT", "Go", "Kubernetes", "Zabbix"],
      desc: "위성영상을 수집·판독해 정부 표준 문서(HWP) 보고서로 산출하는 시스템입니다. 프론트·API 개발부터 에어갭 무중단 운영, 신규 플랫폼 구축까지 담당했습니다.",
      blocks: [
        {
          label: "보안 체계 설계 및 강화 (인증·인가 · Rate Limiting · CSP)",
          situation: "엔드포인트가 늘수록 컨트롤러마다 권한 체크 코드가 흩어져 누락·중복 위험이 커졌고, 동시 로그인 통제·로그인 시도 공격 방어도 필요했으나 토큰 단방향 저장만으로는 '이 사용자가 몇 세션 접속 중인가'를 답할 수 없었음. 고위험 엔드포인트도 조회 API와 동일하게 무제한 호출이 가능했고, 외부 보안 진단에서 CSP 미비·SQL Injection 등 10건 이상을 지적받음",
          cause: "인증과 인가 로직이 분리되지 않고 각 컨트롤러에 개별 구현되어 있어 신규 API마다 권한 체크를 매번 새로 작성해야 했고, 토큰 저장 구조도 검증만 가능할 뿐 사용자 기준 역조회가 불가능했음. 지도 라이브러리(CesiumJS)가 eval·인라인 스타일에 의존해 CSP를 강하게 걸면 화면이 깨지는 제약도 있었음",
          actions: [
            "인증은 Spring Security 필터 체인에서 일괄 처리, 인가는 커스텀 어노테이션 + AOP로 선언적으로 분리 - 신규 API는 어노테이션만 붙이면 권한 검증 적용",
            "토큰과 함께 user→token 역색인을 Redis에 저장해 사용자별 활성 세션을 즉시 조회·통제, 로그인 실패는 IP·계정 단위로 카운트해 5회 초과 시 차단 - 차단 해제는 TTL 자동 만료로 처리",
            "필터+AOP 2계층 위험도 기반 Rate Limiting(HIGH 5회/분~MEDIUM 20회/분) 도입, 로그인 실패 카운트는 Redis INCR로 락-프리 처리하고 Redis 장애 시 로그인은 막지 않는 fail-open 정책 채택",
            "CSP를 API origin 기반 런타임 동적 생성으로 전환, CesiumJS의 eval 패턴을 소스 레벨에서 직접 패치해 CSP 위반 없이 동작하도록 우회, 13개 매퍼의 SQL Injection을 파라미터 바인딩으로 전환",
          ],
          result: "권한 적용 누락 구조적 방지, 위험도별 요청 제한, 보안 진단 지적사항 10건 이상 해소",
          brief: [
            "컨트롤러마다 권한 체크 코드 분산, 고위험 엔드포인트 무제한 호출 가능, 외부 보안 진단 CSP·SQLi 등 10건 이상 지적.",
            "인증·인가는 필터+AOP로 분리, Redis 세션·Rate Limiting 구축, CSP 동적 생성·13개 매퍼 SQLi 파라미터 바인딩으로 전환.",
          ],
        },
        {
          label: "다운로드 엔드포인트 통합",
          situation: "일반 다운로드와 INNORIX 대용량 전송의 엔드포인트가 분리되면 클라이언트·운영 복잡도가 증가",
          cause: "DRM 재암호화가 다운로드 요청마다 개별 실행되면서, 조각별로 재암호화된 바이트 구조가 서로 달라져 재조립한 파일이 깨지는 동시성 버그가 있었음",
          actions: [
            "/download.do 단일 엔드포인트에서 오프셋 파라미터 유무로 일반/대용량 다운로드를 자동 분기",
            "DRM 재암호화로 조각별 바이트 구조가 달라지는 문제를 요청 직렬화와 암호화 파일 재사용으로 수정",
          ],
          result: "파일 크기·전송 방식과 무관한 단일 인터페이스, 파일 깨짐 제거",
          brief: [
            "일반 다운로드와 대용량(INNORIX) 전송의 엔드포인트가 분리돼 있었고, DRM 재암호화가 요청마다 개별 실행돼 조각별 바이트 구조가 달라지며 파일이 깨지는 동시성 버그가 있었습니다.",
            "/download.do 단일 엔드포인트로 통합하고, 요청 직렬화와 암호화 파일 재사용으로 DRM 동시성 버그를 수정했습니다.",
          ],
        },
        {
          label: "mapper·entity 자동 생성 도구",
          situation: "40여 개 테이블의 Entity·MyBatis mapper를 수작업으로 반복 작성",
          cause: "테이블마다 컬럼 타입·제약조건에 맞춰 Entity와 CRUD/검색 mapper를 손으로 작성해야 하는 반복 작업이었음",
          actions: [
            "information_schema에서 컬럼·PK·precision을 읽어 타입·검증 애노테이션을 자동 매핑",
            "CRUD/검색 mapper를 자동 생성하는 도구를 직접 구현",
          ],
          result: "신규 테이블 온보딩 보일러플레이트 제거, 스키마 2세대 전환에도 재사용",
          brief: [
            "40여 개 테이블의 Entity·MyBatis mapper를 수작업으로 반복 작성하고 있었습니다.",
            "information_schema 기반으로 컬럼·PK·precision을 읽어 Entity와 CRUD/검색 mapper를 자동 생성하는 도구를 구현했습니다.",
          ],
        },
        {
          label: "HWP 판독보고서 연동 파이프라인",
          situation: "외부 판독지원시스템(IBS)이 생성한 HWP 판독보고서를 등록→썸네일 생성→조건부 내부망 배포하는 과정에 수작업 개입 필요",
          cause: "초기 구현은 파일 경로 하드코딩과 원본 move(삭제) 방식이라 외부 연동 실패 시 원본 유실 위험",
          actions: [
            "등록일자+문서ID 기반 디렉터리 파티셔닝으로 전환, move를 copy로 변경해 원본 유실 방지",
            "외부 시스템 3종을 어댑터로 분리해 썸네일 생성→조건부 배포 체인 구현",
          ],
          result: "외부 연동 실패 시에도 원본 데이터가 보존되는 안정적인 문서 산출물 파이프라인 확보",
          brief: [
            "외부 판독지원시스템이 생성한 HWP 보고서를 등록·배포하는 과정이 자동화되지 않았고, 초기 구현은 원본을 이동(삭제)하는 방식이라 연동 실패 시 유실 위험이 있었습니다.",
            "디렉터리 파티셔닝과 move→copy 전환으로 원본 유실을 방지하고, 외부 시스템 3종을 어댑터로 분리해 썸네일 생성→조건부 배포 체인을 구현했습니다.",
          ],
        },
        {
          label: "에어갭 무중단 운영",
          situation: "'No space left on device'로 가시화 작업이 전부 실패했지만, 마운트된 스토리지 용량은 충분히 남아 있었음",
          cause: "마운트 경로 직접 쓰기 테스트로 컨테이너가 아닌 스토리지 자체 문제로 특정, NVMe 펌웨어 업그레이드 과정에서 데이터 이동 로직이 누락된 것이 근본 원인이었음",
          actions: [
            "컨테이너→마운트→디바이스→펌웨어 순으로 추적해 근본 원인 특정, 임시 패치로 즉시 복구 후 정식 패치 연동",
            "수억 픽셀 규모 영상의 OOM에는 픽셀 수 기준 처리 경로 분기와 GDAL 축소 파이프라인 도입",
            "Zabbix 커스텀 대시보드로 장애 사전 감지 체계 구축",
          ],
          result: "에어갭 환경에서 수십 대 서버 규모 클러스터를 무중단 운영, 외부 레퍼런스 없이 시스템 하부 레이어까지 추적하는 트러블슈팅 역량 확보",
          brief: [
            "'No space left on device'로 가시화 작업이 전부 실패했지만 마운트 용량은 충분했고, 수억 픽셀 영상 처리 시 OOM도 반복됐습니다.",
            "스토리지→디바이스→펌웨어까지 추적해 NVMe 펌웨어 버그를 근본 원인으로 특정해 복구하고, 대용량 영상은 GDAL 축소 파이프라인으로, 장애는 Zabbix 대시보드로 사전 감지하도록 만들었습니다.",
          ],
        },
        {
          label: "신규 플랫폼 DB 접근 계층 중앙화 · 타일 서버 동시성 재설계",
          situation: "서비스별 ORM 직접 접근으로 DB 로직·자격증명이 여러 서비스에 흩어져 있었고, 위성·항공·월면 다중 레이어 위성영상을 GDAL로 워핑하는 WMS 엔드포인트는 순차 처리로 레이어가 늘수록 응답이 느려짐",
          cause: "스키마가 바뀔 때마다 여러 서비스를 동시에 수정해야 했음. 타일 서버는 무제한 goroutine 병렬화를 처음 도입했다가 문제가 생겨 전체 원복했고, 세마포어 기반 버전도 다시 원복되는 등 두 차례 시행착오를 거침",
          actions: [
            "DB 접근을 Go 기반 API 한 곳으로 중앙화",
            "레이어별 이미지 로딩을 고루틴으로 병렬화하되 CPU 코어 수 기반 동적 세마포어로 동시 실행 수 제한, 요청 타임아웃·TTL 캐시·버퍼 풀·수동 GC를 결합해 두 차례 실패 끝에 안전한 병렬 처리 구조로 정착",
          ],
          result: "스키마 변경 영향 범위를 API 레이어로 축소, 두 차례 시행착오 끝에 안전한 병렬 처리 구조 확보",
          brief: [
            "서비스별 ORM 직접 접근으로 DB 로직 분산, 다중 레이어 타일 서버는 무제한 goroutine 병렬화 도입 후 두 차례 원복.",
            "DB 접근을 Go API로 중앙화, 타일 서버는 CPU 코어 기반 동적 세마포어+타임아웃+TTL 캐시로 안전한 병렬 처리 구조 정착.",
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
            "FastMCP 8개 도구 구현 - list_commits·get_trips·generate_report·upload_hrweb 등, Cursor·Claude Desktop에서 호출 가능",
            "Git 커밋+캘린더 병합 → 엑셀 생성 → Gmail 발송 단일 명령 자동화",
            "HRWeb(아마란스) Playwright 전 흐름 자동화",
          ],
          result: "수작업 전 과정 제거, Claude Desktop·Cursor에서 팀 전체 호출 가능",
          brief: [
            "Git·캘린더·HR 시스템이 분리돼 있어 주간보고 작성과 HRWeb 공수 입력을 매주 30~60분씩 수동으로 처리했습니다.",
            "FastMCP로 8개 도구를 구현해 Git 커밋과 캘린더를 병합·엑셀 생성·Gmail 발송까지 단일 명령으로 자동화하고, 팀 전체가 Claude Desktop·Cursor에서 호출할 수 있게 했습니다.",
          ],
          lines: [
            "주간보고 작성·HRWeb 공수 입력에 매주 30~60분 소요 - Git·캘린더·HR 시스템이 분리되어 수집·작성 모두 수동",
            "FastMCP 8개 도구 구현 - list_commits·get_trips·generate_report·upload_hrweb 등, Git 커밋+캘린더 병합 → 엑셀 생성 → Gmail 발송 단일 명령 자동화",
            "수작업 전 과정 제거, Claude Desktop·Cursor에서 팀 전체 호출 가능",
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

  skills: ["Spring Boot", "Java", "Kotlin", "Python", "Go", "FastAPI", "PostgreSQL", "MySQL", "Redis", "RabbitMQ", "Kafka", "Kubernetes", "Docker", "SaltStack", "Zabbix"],

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
  role: "플랫폼 엔지니어",
  email: PROFILE.email,
  github: PROFILE.github,
  githubUrl: PROFILE.githubUrl,
  location: PROFILE.location,
  military: PROFILE.military,

  tagline: "관리형 서비스에 기대지 않고, 클러스터를 바닥부터 만들고 굴려온 플랫폼 엔지니어",
  summary: [
    {
      head: "관리형 서비스 없이, 클러스터를 직접 부트스트랩",
      body: "관리형 K8s가 없는 온프레미스 환경이라 kubeadm으로 클러스터를 직접 부트스트랩했습니다. SaltStack Minion으로 노드별 연결 상태와 메모리 사용률을 실시간 점검해 메모리 50% 미만 노드에만 AI 워크로드를 자동 할당하는 자원 인지형 배치 구조를 만들었고, Aliyun GPUShare로 GPU 한 장을 fraction 단위로 나눠 여러 컨테이너가 동시에 추론하도록 구성했습니다.",
    },
    {
      head: "인터넷이 완전히 막힌 환경에서, 장애는 코드와 로그로만",
      body: "국가보안기관 납품 시스템은 외부 검색도 라이브러리 반입도 불가능한 에어갭 환경입니다. 가시화가 전부 실패하는 장애를 마운트 → 디바이스 → 펌웨어까지 추적해 NVMe 펌웨어 업그레이드 시 데이터 이동 로직 누락을 근본 원인으로 찾아냈고, Zabbix로 장애 사전 감지 체계를 직접 구축했습니다.",
    },
    {
      head: "메시지 큐로 쪼개면, 병목만 골라 늘릴 수 있다",
      body: "DB 폴링 방식의 처리 파이프라인을 수집·전처리·추론·후처리 단계별 큐로 분리해 처리 워커를 1개에서 15개로 수평 확장했습니다. 물리 베어메탈 서버 설치부터 K8s 클러스터 구성, DB 접근 계층을 Go API로 중앙화하는 신규 구축까지 인프라 전 과정을 직접 결정한 경험이 있습니다.",
    },
  ],
  summaryClose: "",

  highlights: [
    { v: "kubeadm", l: "베어메탈 K8s 직접 부트스트랩" },
    { v: "GPU 1장 → 70파드", l: "Aliyun GPUShare 병렬 추론" },
    { v: "1개 → 15개", l: "처리 워커 수평 확장" },
    { v: "컨테이너 → 펌웨어", l: "NVMe 장애 근본원인 추적" },
    { v: "이벤트 유실 0건", l: "Outbox 라이브러리 직접 개발" },
  ],

  career: {
    company: "한컴인스페이스",
    position: "연구원 · 플랫폼 엔지니어링 · 재직 중",
    period: "2021.07. ~ 재직 중 (5년)",
    overview: "국가기관 대상 위성영상 AI 처리 플랫폼의 인프라 설계·구축·운영을 전담해왔습니다. 관리형 K8s가 없는 온프레미스·에어갭 환경에서 kubeadm 클러스터 부트스트랩부터 노드 자원 분배·GPU 공유·비동기 파이프라인·모니터링까지 인프라 전 영역을 직접 설계·구축·운영했습니다.",
    metrics: ["kubeadm 베어메탈 클러스터 구축", "GPU 1장 70파드 병렬 추론", "처리 워커 1→15개 수평 확장", "에어갭 무중단 운영", "이벤트 유실 0건"],
    groups: [
      {
        title: "인프라 설계·구축·운영",
        period: "2021.07 ~ 진행 중",
        items: [
          "관리형 K8s 없는 온프레미스 환경에 kubeadm으로 클러스터 직접 부트스트랩",
          "SaltStack Minion 기반 노드 자원 인지형 워크로드 배치 - 메모리 50% 미만 노드에만 할당, OOM 사전 차단",
          "에어갭(인터넷 완전 차단) 환경에서 수십 대 서버 규모 클러스터 무중단 운영, Zabbix 커스텀 대시보드로 장애 사전 감지 체계 구축",
          "컨테이너 → 마운트 → 디바이스 → 펌웨어 경계를 넘나든 NVMe 장애 근본원인 추적",
        ],
      },
      {
        title: "AI 워크로드 스케줄링 & 비동기 파이프라인",
        period: "2023.10 ~ 2025.07",
        items: [
          "Aliyun GPUShare로 GPU 메모리 fraction 단위 분할 - GPU 1장에서 70파드 병렬 추론",
          "RabbitMQ 단계별 큐 분리(수집→전처리→추론→후처리) - 처리 워커 1개→15개 수평 확장",
          "AOP+MyBatis Outbox 라이브러리 직접 개발 - CDC 인프라 의존 제거, 이벤트 유실 0건",
        ],
      },
      {
        title: "베어메탈 신규 구축 & DB 접근 계층 설계",
        period: "2025.06 ~ 2025.12",
        items: [
          "물리 서버 설치부터 K8s 클러스터 구성까지 신규 인프라 전 과정 직접 결정",
          "DB 접근을 Go 기반 API 한 곳으로 중앙화 - 스키마 변경 영향 범위를 API 레이어로 축소",
        ],
      },
    ],
  },

  projects: [
    {
      title: "항공우주연구원(KARI) 위성영상 AI 처리 플랫폼 구축",
      company: "한컴인스페이스",
      period: "2023.10. ~ 2025.07.",
      stack: ["Kubernetes", "Go", "Python", "SaltStack", "Aliyun GPUShare", "PostgreSQL", "Zabbix", "Nginx", "Rocky Linux"],
      desc: "회사의 모든 K8s 기반 AI 처리 플랫폼의 출발점이 된 프로젝트입니다. 관리형 K8s가 없는 온프레미스 환경이라 kubeadm으로 클러스터를 직접 부트스트랩했습니다.",
      blocks: [
        {
          label: "Kubernetes 도입 - kubeadm 베어메탈 클러스터 부트스트랩",
          situation: "위성영상을 받아 AI 추론까지 흘려보내는 플랫폼을 만들어야 했는데, 처음엔 Docker 컨테이너 몇 개로 묶는 구조를 먼저 생각했습니다. 컨테이너 하나가 죽으면 작업이 그냥 사라지는 구조로는 운영이 불가능했습니다.",
          cause: "대안은 세 가지였습니다 - Docker Compose로 묶는 방식, 직접 스크립트로 프로세스를 관리하는 방식, K8s. 앞의 두 방식은 노드가 늘어날수록 관리 포인트가 선형으로 늘고, 노드 장애 시 수동 개입이 필요했습니다.",
          actions: [
            "워크로드가 여러 노드에 걸쳐 돌아야 하고 자동 복구가 필요한 상황이라 K8s를 선택",
            "관리형 K8s가 없는 온프레미스 환경이라 kubeadm으로 클러스터를 직접 부트스트랩",
          ],
          result: "노드 장애 시에도 워크로드가 자동 복구되는 구조 확보, 이후 모든 K8s 기반 AI 처리 플랫폼의 출발점이 됨",
          brief: [
            "컨테이너 하나가 죽으면 작업이 사라지는 구조로는 운영이 불가능했고, Docker Compose·스크립트 기반 관리는 노드가 늘수록 관리 포인트가 선형으로 늘고 장애 시 수동 개입이 필요했습니다.",
            "워크로드가 여러 노드에 걸쳐 자동 복구돼야 하는 요건에 맞춰 K8s를 선택하고, 관리형 K8s가 없는 온프레미스 환경이라 kubeadm으로 클러스터를 직접 부트스트랩했습니다.",
          ],
        },
        {
          label: "GPU 자원 공유 (Fractional GPU)",
          situation: "노드당 GPU 하나를 컨테이너 하나가 점유하는 방식이라, 대부분의 시간 동안 GPU가 유휴 상태였습니다.",
          cause: "여러 모델을 동시에 띄워야 하는 요건과 1파드=1GPU 구조가 맞지 않았고, 당시 GPU 모델은 NVIDIA MIG를 지원하지 않아 하드웨어 파티셔닝을 쓸 수 없었습니다.",
          actions: [
            "Aliyun GPUShare를 도입해 여러 컨테이너가 하나의 GPU를 fraction 단위로 나눠 쓰는 소프트웨어 레벨 공유 구성",
          ],
          result: "GPU 4장에서 70파드 병렬 추론, 한정된 GPU로 더 많은 워크로드 처리",
          brief: [
            "노드당 GPU 하나를 컨테이너 하나가 점유해 대부분의 시간 동안 GPU가 유휴 상태였고, 당시 GPU는 NVIDIA MIG도 지원하지 않았습니다.",
            "Aliyun GPUShare로 GPU 메모리를 fraction 단위로 나누는 소프트웨어 레벨 공유를 도입해, GPU 4장에서 70파드 병렬 추론을 달성했습니다.",
          ],
        },
        {
          label: "Debezium CDC 안정화 - Outbox 전환 및 자가치유 운영",
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
          label: "K8s 운영 안정화 - 자원 인지형 스케줄링 및 CrashLoopBackOff 진단",
          situation: "K8s 기본 스케줄러가 노드별 메모리 사용률을 실시간 반영하지 못해 특정 노드에 무거운 AI 작업이 몰리면 OOM이 발생했고, SaltStack master 파드도 반복적으로 CrashLoopBackOff에 빠졌습니다.",
          cause: "스케줄러가 리소스 요청·한도 값만 보고 배치할 뿐 실제 사용률은 반영하지 않는 구조였고, CrashLoopBackOff는 livenessProbe가 전체 minion 목록을 조회하고 각 minion에 kubectl exec까지 수행하는 무거운 스크립트라 probe timeout(1초)에 가까워 정상 상황에서도 타임아웃이 잦은 것이 원인이었습니다.",
          actions: [
            "SaltStack Minion으로 각 노드의 연결 상태와 메모리 사용률을 실시간 점검, 메모리 50% 미만 노드에만 AI 워크로드를 자동 할당하는 자원 인지형 배치 구조 구현",
            "SaltStack master 파드의 헬스체크를 프로세스 생존 여부(pgrep)만 확인하는 경량 체크로 축소하고 timeoutSeconds·periodSeconds를 재조정, 기존 minion 자동 재시작 로직은 probe에서 분리",
          ],
          result: "특정 서버 과부하와 OOM 사전 차단, 불필요한 재시작을 유발하던 무거운 체크 로직 제거로 파드 안정성 확보",
          brief: [
            "K8s 기본 스케줄러가 노드별 메모리 사용률을 반영하지 못해 OOM이 발생했고, SaltStack master 파드도 무거운 헬스체크와 probe timeout 충돌로 반복 재시작됐습니다.",
            "SaltStack Minion으로 노드 메모리 사용률을 점검해 50% 미만 노드에만 워크로드를 할당했고, 헬스체크도 프로세스 생존 확인만으로 경량화해 두 문제 모두 해결했습니다.",
          ],
        },
        {
          label: "HTTPS 리버스 프록시·TLS 인증서 구성",
          situation: "레거시 Tomcat 기반 프론트엔드를 외부에 HTTPS로 노출해야 했고, 서비스마다 보안 헤더 설정이 제각각이었습니다.",
          cause: "Tomcat 단독으로는 와일드카드 인증서(전체 체인 포함) 갱신·보안 헤더 통합 관리가 번거로웠고, 외부 지도 타일 API 호출을 프론트엔드에서 직접 나가면 CSP·보안 정책에 걸렸습니다.",
          actions: [
            "Nginx를 Tomcat 앞단 HTTPS 리버스 프록시로 구성 - 와일드카드 TLS 인증서·체인을 적용하고 TLSv1.2/1.3·세션 캐시 설정",
            "Tomcat이 내려주는 중복 보안 헤더를 제거하고 CSP·X-Frame-Options·Referrer-Policy 등을 Nginx 한 곳에서 통합 관리",
            "path 기반 라우팅으로 내부 분석 서비스·지도 서버와 외부 지도 타일 API를 함께 프록시, 쿠키 보안 속성(secure·httponly·samesite)까지 일괄 적용",
          ],
          result: "HTTPS 종단·인증서 관리·보안 헤더를 Nginx 한 곳에서 통합, 대용량 위성영상 전송을 위한 타임아웃·바디 크기(최대 5GB)까지 함께 튜닝",
          brief: [
            "Tomcat 단독으로는 와일드카드 인증서 갱신과 서비스별 제각각인 보안 헤더 관리가 번거로웠습니다.",
            "Nginx를 HTTPS 리버스 프록시로 앞단에 두고 TLS 인증서·보안 헤더·쿠키 속성을 한 곳에서 통합 관리하도록 구성했습니다.",
          ],
        },
        {
          label: "Nginx Ingress keepalive 튜닝",
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
      ],
    },
    {
      title: "NIPA RabbitMQ 기반 변화탐지 AI 처리 플랫폼",
      company: "한컴인스페이스",
      period: "2025.07. ~ 진행 중",
      stack: ["Kubernetes", "RabbitMQ", "FastAPI", "Go", "PostgreSQL", "PyTorch"],
      desc: "DB 폴링 방식이라 수평 확장이 막혀 있던 처리 구조를, 메시지 큐 기반 비동기 아키텍처로 전면 재설계했습니다.",
      blocks: [
        {
          label: "RabbitMQ 도입 - Kafka 대비 선택 근거",
          situation: "DB 폴링 방식을 메시지 큐 기반으로 전환하기로 하면서, Kafka와 RabbitMQ 중 하나를 골라야 했습니다.",
          cause: "Kafka는 처리량이 높지만 운영 오버헤드가 큽니다. 위성 처리 작업은 단위가 명확해서 메시지 큐 모델이 더 적합했고, ack/nack 기반의 확실한 전달 보장이 필요했습니다.",
          actions: [
            "RabbitMQ를 선택하고 ack/nack + DLQ 기반 비동기 구조로 전환",
          ],
          result: "운영 오버헤드를 늘리지 않으면서 확실한 전달 보장 확보",
          brief: [
            "메시지 큐 기반 전환을 앞두고 Kafka와 RabbitMQ 중 하나를 골라야 했는데, Kafka는 처리량은 높지만 운영 오버헤드가 컸습니다.",
            "작업 단위가 명확하고 ack/nack 기반의 확실한 전달 보장이 필요한 요건에 맞춰 RabbitMQ를 선택했습니다.",
          ],
        },
        {
          label: "단계별 큐 분리와 워커 수평 확장",
          situation: "기존 시스템은 DB를 일정 주기로 폴링해 작업을 가져갔습니다. 워커를 늘려도 같은 DB에 더 많은 폴링 쿼리가 몰려 락 경합으로 수평 확장 효과가 거의 없었습니다.",
          cause: "완료 콜백 구조라 노드 재시작 시 콜백이 유실되면 작업이 RUNNING 상태로 고착됐고, 폴링 주기를 짧게 잡으면 DB 부하가, 길게 잡으면 지연이 늘었습니다.",
          actions: [
            "RabbitMQ ack/nack + DLQ 기반 비동기 구조로 전환",
            "단일 큐가 아니라 수집→전처리→추론→후처리 단계별로 큐를 분리",
          ],
          result: "단계별 독립 확장 가능한 구조 확보, 처리 워커 컨테이너 1개→15개 수평 확장, 작업 유실 0건. 요청을 큐로 받아 워커에 분산하는 이 패턴은 더 큰 트래픽의 AI 추론 서비스 인프라에도 그대로 적용 가능",
          brief: [
            "DB 폴링 방식은 워커를 늘려도 같은 DB에 폴링 쿼리가 몰려 락 경합으로 수평 확장 효과가 거의 없었습니다.",
            "RabbitMQ ack/nack+DLQ 기반으로 전환하고 파이프라인 단계별로 큐를 분리해, 처리 워커를 1개에서 15개로 수평 확장했습니다. 요청을 큐로 받아 워커에 분산하는 이 패턴은 더 큰 트래픽의 AI 추론 인프라에도 그대로 적용됩니다.",
          ],
        },
        {
          label: "AI 탐지 품질 개선",
          situation: "완성된 AI 모듈을 그대로 연동하던 기존 방식에서는 전후 영상의 조명·색상 차이와 그림자가 변화로 오탐되는 문제가 누적됐습니다.",
          cause: "모델 출력을 후처리 없이 그대로 사용해 노이즈가 결과에 그대로 반영됐습니다.",
          actions: [
            "전처리에 그림자 제거와 색상 정규화 추가",
            "후처리에 면적 기반 필터링과 모폴로지 연산 적용",
          ],
          result: "픽셀 단위 노이즈 제거, 탐지 품질 개선",
          brief: [
            "완성된 AI 모듈을 그대로 연동하며 전후 영상의 조명·색상 차이와 그림자가 변화로 오탐되는 문제가 누적됐습니다.",
            "전처리에 그림자 제거·색상 정규화, 후처리에 면적 기반 필터링·모폴로지 연산을 추가해 픽셀 단위 노이즈를 제거했습니다.",
          ],
        },
      ],
    },
    {
      title: "국가보안기관 위성영상 AI 처리 플랫폼 운영·신규 구축",
      company: "한컴인스페이스",
      period: "2024.07. ~ 진행 중",
      stack: ["Kubernetes", "Docker", "Rocky Linux", "NVMe Storage", "Go", "PostgreSQL", "GDAL", "Zabbix", "Shell"],
      desc: "인터넷이 완전히 차단된 에어갭 환경에서 수십 대 서버 규모 클러스터를 무중단 운영하는 위성영상 AI 처리 플랫폼 운영을 맡았고(2024.07~), 이어서 다종위성 수집·처리 플랫폼을 물리 베어메탈 서버 설치부터 K8s 클러스터 구성, DB 설계, 파이프라인 구현까지 전 과정 신규 구축했습니다(2025.06~2025.12).",
      blocks: [
        {
          label: "에어갭 무중단 운영 - 장애 근본원인 추적·OOM 대응·사전 감지 체계",
          situation: "가시화 작업이 전부 'No space left on device'로 실패했지만 마운트된 스토리지 용량은 충분했고, 일부 위성영상은 수억 픽셀 규모라 통째로 메모리에 올리다 컨테이너가 OOM으로 강제 종료됐으며, 외부 인터넷이 차단된 에어갭 환경이라 이런 장애를 사후에야 인지하는 구조였습니다.",
          cause: "마운트 경로에 빈 파일을 직접 써보니 단순 쓰기조차 실패해 컨테이너가 아닌 스토리지 자체 문제로 특정했고, 스토리지 장비 NVMe 상태를 원격으로 확인하니 실제 여유 용량이 0이었습니다. 대용량 영상은 기존 단일 처리 방식이 영상 크기와 무관하게 동일한 경로로 처리해 구조적으로 실패했고, 호스트·서비스 상태를 실시간으로 관측할 모니터링 체계도 없었습니다.",
          actions: [
            "업체 운영 코드를 검토해 펌웨어 업그레이드 과정에서 NVMe→system pool 데이터 이동 로직이 누락된 근본 원인 특정, 임시 패치로 서비스 즉시 복구 후 업체 정식 패치 연동까지 마무리",
            "픽셀 수를 기준으로 일반용·대용량용 처리 경로 분기, 대용량 영상은 GDAL 파이프라인으로 먼저 축소한 뒤 폴리곤화하는 방식 도입",
            "Zabbix로 호스트·서비스 모니터링 및 커스텀 대시보드 직접 구축",
          ],
          result: "컨테이너 → 마운트 → 디바이스 → 펌웨어로 시스템 경계를 넘어 추적하는 트러블슈팅 역량 확보, 자원이 부족한 환경에서도 구조적으로 작업이 진행되도록 개선, 장애 사전 감지 체계 확보",
          brief: [
            "가시화 작업이 전부 'No space left on device'로 실패했지만 마운트 용량은 충분했고, 대용량 영상 처리 시 OOM도 반복됐으며, 에어갭 환경이라 장애를 사후에야 인지하는 구조였습니다.",
            "스토리지→디바이스→펌웨어까지 추적해 NVMe 펌웨어 버그를 근본 원인으로 특정해 복구하고, 대용량 영상은 GDAL 축소 파이프라인으로, 장애는 Zabbix 대시보드로 사전 감지하도록 만들었습니다.",
          ],
        },
        {
          label: "DB 접근 계층 중앙화 (신규 구축)",
          situation: "이어서 주도한 다종위성 수집·처리 플랫폼 신규 구축 프로젝트에서, 기존 프로젝트들은 각 서비스(Cataloger, Job Manager, 가시화 등)가 ORM으로 DB에 직접 접근하는 구조였습니다.",
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
            "물리 서버 설치, K8s 클러스터 구성 직접 결정",
            "다종 수집기 통합, DB 기반 중복 체크, zst/tar.gz 포맷 변환 자동화 구현",
            "히스토그램 스트레칭 자동화, COG 포맷 적용으로 가시화 성능 개선",
            "Cleaner 서비스로 등록일 기준 자동 삭제 워크플로우 구축",
          ],
          result: "베어메탈에서 운영 가능한 시스템까지 인프라 전 과정을 직접 결정한 경험 확보",
          brief: [
            "관리형 인프라 없이 물리 서버 설치부터 시작해야 하는 신규 구축 프로젝트였습니다.",
            "물리 서버·K8s 클러스터 구성부터 수집기 통합·포맷 변환 자동화·히스토그램 스트레칭·Cleaner 자동 삭제 워크플로우까지 인프라 전 과정을 직접 주도했습니다.",
          ],
        },
      ],
    },
  ] as DocProject[],

  activities: PROFILE.activities,
  education: PROFILE.education,
  certs: PROFILE.certs,

  skills: ["Kubernetes", "Docker", "SaltStack", "Zabbix", "Go", "Python", "RabbitMQ", "PostgreSQL", "GDAL", "FastAPI", "Redis", "MySQL", "Kafka"],
};
