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
            "Salt 폴링 ack/nack 없어 노드 재시작 시 작업 RUNNING 고착 — 수동 DB 복구 반복",
            "RabbitMQ ack/nack + DLQ 비동기 파이프라인으로 전환 — 처리 완료 전 연결 끊기면 자동 재투입, 3회 초과 시 DLQ 격리",
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
            "서비스별 JWT 직접 검증으로 인증 코드 중복 — 정책 변경 시 전 서비스 동시 수정, 신규 서비스마다 미들웨어 직접 추가",
            "Keycloak OIDC Provider 도입, Envoy Gateway SecurityPolicy를 HTTPRoute 단위 적용 — forwardAccessToken으로 헤더 전달",
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
            "모놀리식으로 기능 하나 배포 시 전체 재시작 — 잦은 배포마다 운영 중단 발생",
            "MSA 분리, 전 서비스 FastAPI 전환, Envoy Gateway 라우팅 — 서비스별 독립 배포·장애 격리 확보",
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
            "CesiumJS 커스텀 ImageryProvider — MVT·MBTiles·ImageLayer·달지도 이종 레이어 단일 인터페이스 추상화",
          ],
          result: "신규 레이어 추가 시 기존 코드 수정 0건, 환경변수만으로 지구/달 모드 배포 분리",
          brief: [
            "jQuery에서 Thymeleaf로 이어진 레거시 프론트, 컴포넌트 추상화 없어 기능 경계 모호·작은 수정에도 영향 범위 예측 불가했고, 지구 변화탐지·달지도 두 모드를 별도 배포해야 했습니다.",
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
          result: "위성 메타 목록 38초→159ms(239배), 수집 현황 집계 46초→181ms(256배), 알람 팝업 목록 25초→104ms(캐시 20ms), 50VU 에러율 11.22%→0%, 처리량 392→1,177 req/s",
          brief: [
            "국가기관 납품 특성상 보안 요구사항이 엄격했고, 32개 매퍼에 SQL injection 취약점이 있었으며, k6 50VU 부하테스트에서 에러율 11.22%가 발생했습니다.",
            "보안 체크리스트·JUnit 통합 테스트를 선반영하고 SQL injection을 화이트리스트 검증으로 교체, 조건부 PostGIS 실행·페이지네이션·BLOB 분리·Redis 캐싱으로 병목을 해소했습니다.",
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
          result: "이벤트 유실 없이 안정적으로 운영, 외부 코디네이터 없이 단조 증가·전역 유일성·망 추적 동시 확보",
          brief: [
            "외부망↔폐쇄망이 물리 분리돼 포트·외부 솔루션을 쓸 수 없는 환경에서, Debezium CDC로 양방향 DB 동기화를 구현했으나 replication slot이 반복 파손됐고, UUID v4로는 발생 망·서버 역추적도 불가능했습니다.",
            "CDC 의존을 제거하고 MyBatis Executor 인터셉터 기반 Outbox 라이브러리를 직접 구현했으며, Snowflake 알고리즘으로 worker ID에 망 정보를 인코딩해 이벤트 유실 없이 안정적으로 운영했습니다.",
          ],
          lines: [
            "포트·외부 솔루션 사용 불가한 폐쇄망 환경에서 Debezium CDC 도입 — replication slot 반복 파손, UUID v4로는 발생 망·서버 역추적 불가",
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
            "Go 영상 서빙 서버 구현 — WMS·WMTS·MVT 지원, WMTS 타일 사전생성·캐싱, 객체탐지 결과 MVT 사전생성 전환",
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
