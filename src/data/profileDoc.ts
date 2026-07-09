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

  tagline: "백엔드에서 시작해, 서비스 전체를 만드는 엔지니어",
  summary: [
    {
      head: "당장 돌아가는지보다, 계속 돌아갈 수 있는지를 먼저 보는 백엔드 엔지니어입니다",
      body: "돌아가는 시스템이라도 부하테스트로 성능과 비용의 병목을 찾아내고, 반복되는 수작업을 구조로 없애왔습니다. 폐쇄망 납품 환경이라 손볼 수도 없이 반복 파손되던 Debezium은 MyBatis 인터셉터 기반 Outbox 라이브러리를 직접 구현해 의존 자체를 걷어냈고, 서비스마다 복제되던 JWT 검증은 Envoy Gateway로 끌어올려 정책 변경이 SecurityPolicy 1개 수정으로 끝나게 했습니다. 그 결과 재배포는 월 10건에서 1건으로, 에러 문의는 주 2~3회에서 월 1회로 줄었습니다.",
    },
    {
      head: "문제가 있는 곳이면, 스택을 가리지 않았습니다",
      body: "주력은 Spring과 FastAPI지만, 병목이 백엔드 안에만 있지는 않았습니다. 영상 서빙이 느리면 Go로 타일 서버를 만들어 객체탐지 오버레이 응답을 5분에서 1초로 줄였고, AI 모델이 필요하면 직접 학습해 GPU 4장 위 70개 파드로 서빙하며 일 처리량을 200건에서 3,000건으로 올렸습니다. 반복되는 운영 작업은 FastMCP 에이전트를 만들어 팀 전체가 쓰도록 자동화했습니다. 언어와 레이어는 문제를 풀기 위한 도구였지, 제 경계가 아니었습니다.",
    },
    {
      head: "새 기술은 밖에서 먼저 검증하고, 안으로 들여왔습니다",
      body: "이벤트 드리븐 아키텍처는 사이드 프로젝트에서 동시성 제어와 함께 실전으로 검증한 뒤, 사내 변화탐지 플랫폼의 RabbitMQ 비동기 파이프라인 설계에 적용했습니다. Next.js도 팀 프로젝트로 출시까지 겪어본 뒤에 사내 레거시 프론트 전환에 썼습니다. 회사 프로젝트를 실험대로 쓰지 않기 위해, 검증은 제 시간으로 했습니다.",
    },
  ],
  summaryClose: "이 경험을 이제 매일 배포하고, 트래픽이 실시간으로 움직이는 AI 서비스에서 이어가려 합니다.",

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
          "MSA 전환·배포 자동화 - 재배포 월 10건→1건, 배포 4분→30초",
          "k6 부하테스트 기반 API 최적화 - PostGIS 38초→159ms, 에러율 11%→0%",
          "AOP+MyBatis Outbox 라이브러리 직접 개발 - CDC 인프라 의존 제거, 이벤트 유실 0건",
        ],
      },
      {
        title: "AI 모델 학습·추론",
        items: [
          "객체탐지·세그멘테이션 모델 학습·서빙 - mAP50 0.644, mIoU 0.7205",
          "추론 가용성 확보 - GPU 4장 70파드 동시 운영, 처리량 200→3,000건/일",
        ],
      },
      {
        title: "사내 자동화 에이전트 개발",
        items: [
          "FastMCP 에이전트 - Git·캘린더·HRWeb 통합, 문서 자동화",
          "ML 실험 자율화 에이전트 - cronjob으로 학습 루프 자동 실행·기록, Claude Skill·Hook 기반 실험기록 표 자동 생성, Slack 알림",
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
        {
          label: "멀티 배포 뷰어·레거시 프론트 재설계",
          situation: "Thymeleaf 레거시에 기능 경계 없어 수정 영향 범위 예측 불가",
          cause: "컴포넌트 추상화 없는 SSR 방식으로 재사용 불가, 지구 변화탐지·달지도 두 모드를 별도 배포해야 함",
          actions: [
            "Next.js 15 + FSD 전면 마이그레이션, 지구 변화탐지·지역통계·달지도를 독립 feature slice로 분리",
            "동일 Docker 이미지를 K8s env(MAP_TYPE: EARTH|MOON)만 바꿔 배포판 분리, dynamic import로 달지도 청크 지연 로드",
            "CesiumJS 커스텀 ImageryProvider - MVT·MBTiles·ImageLayer·달지도 이종 레이어 단일 인터페이스 추상화",
          ],
          result: "신규 레이어 추가 시 기존 코드 수정 0건, 환경변수만으로 지구/달 모드 배포 분리",
          brief: [
            "jQuery·Thymeleaf 레거시 프론트는 컴포넌트 추상화가 없어 기능 경계가 모호했고, 지구 변화탐지·달지도 두 모드를 별도로 배포해야 했습니다.",
            "Next.js 15·FSD로 feature slice를 분리해 동일 Docker 이미지를 K8s 환경변수만으로 여러 배포판으로 나눴고, CesiumJS 커스텀 ImageryProvider로 이종 레이어를 단일 인터페이스로 추상화했습니다.",
          ],
          lines: [
            "Thymeleaf 레거시에 기능 경계 없어 수정 영향 범위 예측 불가, 지구/달지도 두 모드 배포 필요",
            "Next.js 15 + FSD로 feature slice 분리, K8s env(MAP_TYPE)만으로 멀티 배포, CesiumJS ImageryProvider로 이종 레이어 단일 인터페이스 추상화",
            "신규 레이어 추가 시 기존 코드 수정 0건, 환경변수만으로 지구/달 모드 배포 분리",
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
          label: "부하 테스트 기반 성능·보안 개선",
          situation: "국가기관 납품으로 보안 요구사항 엄격, k6 50VU 부하테스트에서 에러율 11.22% 발생",
          cause: "32개 매퍼에 SQL injection 취약점 존재, 페이지네이션·조건 없는 쿼리로 3가지 성능 병목(PostGIS 미조건 실행·카테시안 곱·BLOB의 커넥션 독점) 발생",
          actions: [
            "보안 체크리스트 선반영, JUnit 통합 테스트 작성",
            "SQL injection 취약점을 화이트리스트 검증으로 교체",
            "조건부 PostGIS 실행, 페이지네이션, BLOB 컬럼 분리, Redis 캐싱 적용",
          ],
          result: "위성 메타 목록 38초→159ms(239배), 50VU 에러율 11.22%→0%, 처리량 392→1,177 req/s",
          brief: [
            "국가기관 납품 특성상 보안 요구사항이 엄격했는데, 32개 매퍼에 SQL injection 취약점이 있었고 k6 50VU 부하테스트 에러율도 11.22%에 달했습니다.",
            "보안 체크리스트·JUnit 통합 테스트를 선반영하고 SQL injection을 화이트리스트 검증으로 교체했습니다. 조건부 PostGIS 실행·페이지네이션·BLOB 분리·Redis 캐싱으로 병목도 해소했습니다.",
          ],
          lines: [
            "보안 요구사항 엄격 + SQL injection 취약점 + k6 50VU 에러율 11.22%(PostGIS 미조건 실행·카테시안 곱·BLOB의 커넥션 독점)",
            "보안 체크리스트·JUnit 통합 테스트 선반영, SQL injection 화이트리스트 검증 교체, 조건부 실행·페이지네이션·BLOB 분리·Redis 캐싱",
            "위성 메타 38초→159ms, 수집 현황 46초→181ms, 알람 목록 25초→104ms(캐시 20ms), 에러율 11.22%→0%, 처리량 392→1,177 req/s",
          ],
        },
        {
          label: "파일 기반 양방향 DB 동기화",
          situation: "외부망↔폐쇄망 물리 분리 환경에서 DB 양방향 동기화·분산 ID 발급 필요",
          cause: "Debezium CDC의 replication slot 반복 파손, UUID v4로는 발생 망·서버 역추적 불가",
          actions: [
            "Debezium CDC 제거, MyBatis Executor 인터셉터 기반 Outbox 라이브러리 직접 구현",
            "Snowflake 알고리즘 직접 구현, worker ID 비트 영역에 망 정보(외부망·내부망·분리망) 인코딩",
          ],
          result: "이벤트 유실 없이 안정적으로 운영, 외부 코디네이터 없이 전역 유일 ID 발급·망 추적 확보",
          brief: [
            "외부망↔폐쇄망이 물리 분리된 환경에서 Debezium CDC의 replication slot이 반복 파손됐고, UUID v4로는 발생 망·서버를 역추적할 수 없었습니다.",
            "MyBatis Executor 인터셉터 기반 Outbox 라이브러리를 직접 구현하고, Snowflake 알고리즘으로 worker ID에 망 정보를 인코딩했습니다.",
          ],
          lines: [
            "포트·외부 솔루션 사용 불가한 폐쇄망 환경에서 Debezium CDC 도입 - replication slot 반복 파손, UUID v4로는 발생 망·서버 역추적 불가",
            "Debezium 제거, MyBatis Executor 인터셉터 기반 Outbox 라이브러리 직접 구현, Snowflake 알고리즘으로 worker ID에 망 정보 인코딩",
            "이벤트 유실 없이 안정적으로 운영, 외부 코디네이터 없이 단조 증가·전역 유일성·망 추적 동시 확보",
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
          label: "관심정보 객체탐지·변화탐지 세그멘테이션 성능 향상",
          situation: "위성 나디르(직하방) 고정 촬영 특성상 회전 augmentation이 오히려 역효과, 땅과 도로 색상이 유사해 세그멘테이션 픽셀 분류가 까다로움",
          cause: "객체 방향이 이미 정렬돼 있어 45도 회전 augmentation 적용 시 mAP50 0.644→0.577로 하락, DINOv2·HRNet 백본은 목표 mIoU 0.72에 미달",
          actions: [
            "회전 방향이 중요한 대형 15클래스는 OBB(YOLOv11m-obb, ProBIoU 메모리 이슈로 mosaic만 적용), 위치만 중요한 소형 5클래스는 HBB(YOLOv11m, mosaic+mixup+copy_paste)로 이원화",
            "회전 augmentation 실험으로 mAP50 하락 확인·제거",
            "DINOv2 ViT-B/14(mIoU 0.6656)·HRNet-W48(0.6857) 대비 실험 후 ConvNeXt-Base(ImageNet-22k)+UPerNet에 도로 중심선 보조 학습(Skeleton Head) 추가",
          ],
          result: "HBB mAP50 0.644 / OBB mAP50 0.604, 세그멘테이션 mIoU 0.7205(DINOv2·HRNet 대비 최종 채택)",
          brief: [
            "위성 나디르 고정 촬영 특성상 회전 augmentation이 오히려 mAP50을 떨어뜨렸고, 땅과 도로 색상이 유사해 세그멘테이션 픽셀 분류가 까다로웠습니다.",
            "20클래스를 OBB/HBB로 이원화하고 회전 augmentation을 제거했으며, DINOv2·HRNet 대비 실험을 거쳐 ConvNeXt-Base+UPerNet에 Skeleton Head를 추가해 mIoU 0.7205를 달성했습니다.",
          ],
          lines: [
            "나디르 고정 촬영으로 회전 augmentation 역효과(mAP50 0.644→0.577), 땅·도로 색상 유사로 세그멘테이션 분류 어려움",
            "20클래스 OBB(대형)/HBB(소형) 이원화, 회전 augmentation 제거, DINOv2·HRNet 대비 실험 후 ConvNeXt-Base+UPerNet+Skeleton Head 채택",
            "HBB mAP50 0.644 / OBB 0.604, 세그멘테이션 mIoU 0.7205(DINOv2·HRNet 대비 최종 채택)",
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
    {
      title: "ML 실험 자율 오케스트레이터 - Claude Code 에이전트 설계",
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
          result: "엔지니어 개입 없는 연속 실험 가능 - AI를 코드 보조가 아닌 반복 엔지니어링 위임 에이전트로 운영",
          brief: [
            "ML 실험 루프의 각 단계마다 사람이 결과를 보고 다음 실험을 결정해야 해서, 자리를 비우면 실험이 멈추고 재개할 때 맥락을 다시 파악해야 했습니다.",
            "cronjob으로 Claude Code Skill을 주기적으로 실행해 work_history를 읽고 다음 실험을 판단하게 하고, Hook으로 학습을 자동 실행·기록·재투입하는 자율 루프를 구성해 엔지니어 개입 없는 연속 실험을 가능하게 했습니다.",
          ],
          lines: [
            "ML 실험 루프를 엔지니어가 수동 순환 - 자리 비우면 실험 멈추고 재개까지 맥락 재파악 필요",
            "cronjob으로 Claude Code Skill 주기 실행 → work_history 읽고 다음 실험 판단, Hook+sh 학습 자동 실행, 결과 재기록 → 재판단 자율 루프 - Slack 완료·에러 실시간 알림",
            "엔지니어 개입 없는 연속 실험 가능 - AI를 코드 보조가 아닌 반복 엔지니어링 자체를 위임하는 자율 에이전트로 운영",
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
      title: "제4회 블레이버스 MVP 개발 해커톤",
      org: "블레이버스", year: "2026",
      desc: "기계공학 3D 학습 플랫폼 SIMVEX 개발 - @react-three/fiber 기반 3D 분해·조립 시뮬레이션 및 SSE 스트리밍 AI 어시스턴트 구현.",
      notes: [
        "부품이 같은 방향으로 분해되어 겹치는 문제를 피보나치 스피어 알고리즘으로 해결 - 균일한 분해 애니메이션 구현",
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
      desc: "Python 기반 데이터 분석 및 시각화 학습 - 위성 영상 데이터 파이프라인·AI 모델 서빙 업무의 데이터 처리 흐름 이해에 기반이 됨.",
      notes: [],
    },
  ],

  education: [
    { school: "한밭대학교", degree: "대학교(학사) · 융합기술학과", period: "2022.03. ~ 2026.03.", status: "졸업" },
    { school: "대덕소프트웨어마이스터고등학교", degree: "고등학교 · 소프트웨어개발과", period: "2020.03. ~ 2022.03.", status: "졸업" },
  ],

  skills: ["Spring Boot", "Java", "Kotlin", "Python", "Go", "FastAPI", "PostgreSQL", "MySQL", "Redis", "RabbitMQ", "Kafka", "Kubernetes", "Docker", "SaltStack", "Zabbix", "Next.js"],

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
        items: [
          "관리형 K8s 없는 온프레미스 환경에 kubeadm으로 클러스터 직접 부트스트랩",
          "SaltStack Minion 기반 노드 자원 인지형 워크로드 배치 - 메모리 50% 미만 노드에만 할당, OOM 사전 차단",
          "에어갭(인터넷 완전 차단) 환경에서 수십 대 서버 규모 클러스터 무중단 운영, Zabbix 커스텀 대시보드로 장애 사전 감지 체계 구축",
          "컨테이너 → 마운트 → 디바이스 → 펌웨어 경계를 넘나든 NVMe 장애 근본원인 추적",
        ],
      },
      {
        title: "AI 워크로드 스케줄링 & 비동기 파이프라인",
        items: [
          "Aliyun GPUShare로 GPU 메모리 fraction 단위 분할 - GPU 1장에서 70파드 병렬 추론",
          "RabbitMQ 단계별 큐 분리(수집→전처리→추론→후처리) - 처리 워커 1개→15개 수평 확장",
          "AOP+MyBatis Outbox 라이브러리 직접 개발 - CDC 인프라 의존 제거, 이벤트 유실 0건",
        ],
      },
      {
        title: "베어메탈 신규 구축 & DB 접근 계층 설계",
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
          label: "노드 자원 인지형 스케줄링",
          situation: "K8s 기본 스케줄러가 노드별 메모리 사용률을 실시간 반영하지 못해, 특정 노드에 무거운 AI 작업이 몰리면 OOM이 발생했습니다.",
          cause: "스케줄러가 리소스 요청·한도 값만 보고 배치할 뿐 실제 사용률은 반영하지 않는 구조였습니다.",
          actions: [
            "SaltStack Minion으로 각 노드의 연결 상태와 메모리 사용률을 실시간 점검",
            "메모리 50% 미만 노드에만 AI 워크로드를 자동 할당하는 자원 인지형 배치 구조 구현",
          ],
          result: "특정 서버 과부하와 OOM을 사전에 차단",
          brief: [
            "K8s 기본 스케줄러가 노드별 메모리 사용률을 실시간 반영하지 못해, 특정 노드에 AI 작업이 몰려 OOM이 발생했습니다.",
            "SaltStack Minion으로 노드 메모리 사용률을 실시간 점검해 50% 미만 노드에만 워크로드를 자동 할당, 과부하와 OOM을 사전에 차단했습니다.",
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
          label: "이벤트 유실 문제 해결 (Outbox 패턴)",
          situation: "Debezium CDC의 replication slot이 반복 파손돼 전체 스냅샷을 재수행해야 했습니다.",
          cause: "CDC 방식은 DB 로그 기반이라 slot 파손 시 외부 인프라 의존도가 높아 안정성을 보장하기 어려웠습니다.",
          actions: [
            "CDC 인프라 의존을 걷어내고 AOP + MyBatis Executor 인터셉터 기반 Outbox 라이브러리 직접 개발",
          ],
          result: "이벤트 유실 0건, 외부 인프라 의존 없이 애플리케이션 레벨에서 이벤트 보장",
          brief: [
            "Debezium CDC의 replication slot이 반복 파손돼 전체 스냅샷을 재수행해야 하는 상황이 반복됐습니다.",
            "CDC 인프라 의존을 걷어내고 AOP+MyBatis Executor 인터셉터 기반 Outbox 라이브러리를 직접 개발해 이벤트 유실 0건을 달성했습니다.",
          ],
        },
        {
          label: "망연계 DB 동기화",
          situation: "외부망과 폐쇄망 DB를 동기화해야 했지만, 망연계 솔루션이 파일 기반 전송만 지원했습니다.",
          cause: "API 폴링은 망 구조상 불가능했고, DB 덤프 주기 전송은 실시간성이 너무 떨어졌습니다.",
          actions: [
            "Debezium CDC로 외부망 DB의 변경 사항을 WAL 레벨에서 캡처해 JSON 파일로 반출",
            "폐쇄망으로 반입해 동기화하는 망 분리 우회형 정합성 아키텍처 구축",
          ],
          result: "보안 지침을 지키면서도 사용자 경험을 해치지 않는 실시간성 확보",
          brief: [
            "외부망·폐쇄망 DB를 동기화해야 했지만 망연계 솔루션이 파일 기반 전송만 지원해 API 폴링이 불가능했습니다.",
            "Debezium CDC로 WAL 레벨 변경분을 JSON 파일로 반출·반입하는 망 분리 우회형 아키텍처를 구축해 보안을 지키면서 실시간성을 확보했습니다.",
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
          label: "가시화 전면 실패 장애 - 근본 원인 추적",
          situation: "가시화 작업이 전부 'No space left on device'로 실패했지만, 마운트된 스토리지 용량은 충분히 남아 있었습니다.",
          cause: "마운트 경로에 빈 파일을 직접 써보니 단순 쓰기조차 실패해 컨테이너가 아닌 스토리지 자체 문제로 특정했고, 스토리지 장비 NVMe 상태를 원격으로 확인하니 실제 여유 용량이 0이었습니다.",
          actions: [
            "업체 운영 코드를 검토해 펌웨어 업그레이드 과정에서 NVMe→system pool 데이터 이동 로직이 누락된 근본 원인 특정",
            "임시 패치로 서비스 즉시 복구",
            "업체 정식 패치 연동까지 마무리",
          ],
          result: "컨테이너 → 마운트 → 디바이스 → 펌웨어로 시스템 경계를 넘어 추적하는 트러블슈팅 역량 확보, 외부 레퍼런스 없이도 근본 원인까지 추적",
          brief: [
            "가시화 작업이 전부 'No space left on device'로 실패했지만 마운트 용량은 충분했습니다. 컨테이너가 아닌 스토리지 자체 문제로 좁혀 NVMe 상태를 직접 확인했습니다.",
            "업체 운영 코드까지 추적해 펌웨어 업그레이드 시 NVMe→system pool 이동 로직 누락을 근본 원인으로 특정, 임시 패치로 즉시 복구 후 정식 패치 연동을 마무리했습니다.",
          ],
        },
        {
          label: "대용량 위성영상 OOM 대응",
          situation: "일부 위성영상이 수억 픽셀 규모라 영상 전체를 메모리에 올리는 것조차 불가능해 컨테이너가 OOM으로 강제 종료됐습니다.",
          cause: "기존 단일 처리 방식은 영상 크기와 무관하게 동일한 경로로 처리해, 자원이 제한된 환경에서 대용량 영상을 구조적으로 처리할 수 없었습니다.",
          actions: [
            "픽셀 수를 기준으로 일반용·대용량용 처리 경로 분기",
            "대용량 영상은 GDAL 파이프라인으로 먼저 축소한 뒤 폴리곤화하는 방식 도입",
          ],
          result: "자원이 부족한 환경에서도 구조적으로 작업이 진행되도록 개선",
          brief: [
            "수억 픽셀 규모 위성영상을 통째로 메모리에 올리다 컨테이너가 OOM으로 강제 종료됐습니다.",
            "픽셀 수 기준으로 일반·대용량 처리 경로를 분기하고, 대용량 영상은 GDAL로 먼저 축소 후 폴리곤화해 구조적으로 해결했습니다.",
          ],
        },
        {
          label: "장애 사전 감지 체계 구축",
          situation: "외부 인터넷이 차단된 에어갭 환경이라 장애를 사후에야 인지하는 구조였습니다.",
          cause: "호스트·서비스 상태를 실시간으로 관측할 모니터링 체계가 없어, 장애가 발생해도 사용자 신고 전까지 인지가 늦었습니다.",
          actions: [
            "Zabbix로 호스트·서비스 모니터링 및 커스텀 대시보드 직접 구축",
          ],
          result: "장애 사전 감지 체계 확보",
          brief: [
            "인터넷이 차단된 에어갭 환경이라 장애를 사후에야 인지하는 구조였습니다.",
            "Zabbix 커스텀 대시보드로 호스트·서비스 모니터링 체계를 직접 구축해 장애를 사전에 감지할 수 있도록 했습니다.",
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
