# 랠릿 이력서

## 소개

레거시 모놀리식 구조를 MSA로 전환하며 재배포 월 10건→1건, 배포 속도 4분→30초 달성. 이벤트 드리븐 파이프라인으로 전처리 대기 40분→즉시 처리, Outbox 패턴 라이브러리 직접 개발로 이벤트 유실 0건을 달성했습니다.

FastAPI + ONNX Runtime 기반 ML 추론 서비스 3종 독립 배포, Aliyun GPUShare로 물리 GPU 1장에서 70파드 병렬 운영 체계를 구축했습니다. ROS + Faster R-CNN 기반 드론 재난탐지 시스템에서 핀홀 모델 역투영으로 2D→3D 절대좌표 변환까지 구현했습니다.

백엔드 경계 밖이어도 필요하다고 판단하면 직접 움직였습니다. Next.js FSD 마이그레이션 주도부터 FastMCP 기반 AI 에이전트 개발까지 역할을 가리지 않았습니다.

복잡한 시스템의 병목을 추적하고 근본 원인을 해결하는 방식으로 일합니다.

Java / Kotlin / Spring Boot / JPA / QueryDSL / Spring Batch / MySQL / Redis / RabbitMQ / Kafka / Docker / Kubernetes / AWS / NCP / Next.js / FastAPI / Go / Python / PyTorch / ONNX Runtime / GDAL

---

## 담당업무 — 한컴인스페이스

**MSA 전환 설계 및 주도**
모놀리식 구조를 9개 MSA로 분리, Spring Cloud Gateway 인증·라우팅 일원화, Snowflake 알고리즘 직접 구현으로 분산 ID 발생 서버 추적.

**이벤트 드리븐 아키텍처 도입 & Outbox 라이브러리 개발**
서비스 간 직접 호출을 RabbitMQ 비동기 이벤트로 전환. Debezium CDC 대체 Outbox 패턴 라이브러리 직접 개발 — 트랜잭션 원자성 보장, 이벤트 유실 0건.

**Go 기반 위성 이미지 처리 API 개발**
Go 1.23 + GDAL 바인딩 기반 위성 이미지 REST API 2종(image-api, inias) 구현.

**ML 추론 서비스 개발**
FastAPI + ONNX Runtime 추론 서비스 3종 독립 배포, Aliyun GPUShare GPU 메모리 분할로 물리 GPU 1장에서 70파드 병렬 운영.

**위성 데이터 수집 자동화**
janus 워크플로우 엔진 구축 — 10+ 위성 소스 단일 파이프라인 통합, SFTP 망연계 relay·이메일 알림 5종 직접 구현.

**K8s 기반 인프라 운영**
HPA 동적 스케일링, GPU 메모리 단위 분할(70파드 병렬), OpenSearch + Fluent-bit 중앙 로깅, 운영·테스트 클러스터 분리.

**드론 실시간 재난탐지 시스템 개발**
ROS Noetic + Faster R-CNN 7클래스 실시간 탐지, 핀홀 역투영 2D→3D 좌표 변환, UDP GCS 전송.

**FastMCP 기반 AI 에이전트 개발**
Git·Calendar·HRWeb 연동 자동화 에이전트, 팀 10명 실사용.

---

## 프로젝트

### MSA 전환 및 독립 배포 체계 구축
한컴인스페이스 · 2022.12 ~ 진행 중

현상: 기능 하나 배포 시 전체 서비스 재시작, 월 10건 이상 전체 재배포. 한 서비스 장애가 전체로 전파.
원인: 모놀리식 구조로 단일 배포 단위에 묶여 있었고, 인증·로깅이 12개 서비스에 각각 내장.
해결:
- 도메인 경계 기준 9개 MSA 분리. Spring Cloud Gateway로 인증·라우팅·로깅 cross-cutting concerns 일원화 — 12개 서비스의 인증 코드 중복을 Gateway 레이어 하나로 수렴
- 기능별 플로우 테스트 코드 작성 + GitHub Actions CI로 커밋마다 자동 검증 체계 구축
- 폐쇄망·공개망 분리 환경에서 UUID는 발생 서버 추적 불가, ZooKeeper 등 외부 코디네이터 접근 불가 — Snowflake 알고리즘 직접 구현, worker ID에 망 정보 인코딩해 ID만으로 발생 서버 즉시 식별
성과: 재배포 월 10건→1건, 배포 대상 12개→1개, 배포 속도 4분→30초, 고객 오류 문의 대응 1주→하루 이내

---

### Outbox 패턴 라이브러리 개발
한컴인스페이스 · 2026.02 ~ 2026.04

현상: 네트워크 불안정으로 Debezium replication slot 반복 파손, 전체 스냅샷 재수행 필요.
원인: PostgreSQL WAL은 replication slot이 읽은 위치까지만 삭제를 지연하는 구조 — slot이 파손되어 재생성되면 이전 LSN 위치를 잃고 그 사이 삭제된 WAL은 복구 불가. 근본적으로 CDC가 DB 인프라에 강하게 의존하는 구조적 문제.
해결:
- AOP + MyBatis Executor 인터셉터로 INSERT/UPDATE/DELETE 자동 감지 — 기존 비즈니스 코드 무변경, Spring Boot 자동설정으로 라이브러리 추가만으로 즉시 적용
- TransactionSynchronization.beforeCommit()으로 비즈니스 트랜잭션과 Outbox 저장을 동일 트랜잭션 내에서 처리해 이벤트 유실 원천 차단
- 시간(60초) + 건수(1000건) 이중 트리거 배치(check interval 5초), FOR UPDATE SKIP LOCKED로 다중 인스턴스 중복 처리 방지
- ThreadLocal 기반 suppress로 폐쇄망 수신 데이터 적용 시 Outbox 재발행 차단 — 양방향 동기화 무한 루프 방지
- 13개 테이블 변경 자동 감지(mc_user·mc_survey·mc_auth_grp·mc_menu 등)
성과: CDC 인프라 의존성 제거, 이벤트 유실 0건

---

### 어드민 인증 시스템 최적화
한컴인스페이스 · 2024.04 ~ 2024.12

현상: 권한 수정 후 일부 서비스에 즉시 미반영, 권한 조회 응답 저하.
원인: Redis에 세션을 flat하게 저장해 특정 유저 세션 조회 시 전체 키 풀스캔 필요 — O(N). 재귀적 트리 구조 메뉴에서 권한 조회 시 depth마다 DB 쿼리 반복.
해결:
- userId→sessionId 역인덱스 구축 — 권한 변경 시 해당 유저 세션만 O(1)로 즉시 조회·갱신. Redis DB 3개 용도 분리(세션/방문자 통계/로그인 실패), IP+userId 단위 4회 초과 시 10분 잠금
- 재귀 트리 전체를 WITH RECURSIVE CTE 단일 쿼리로 조회 후 메모리 매핑 — 인증 필터에서 요청당 DB 쿼리 제거
- Spring Cloud Gateway 도입으로 서비스별 분산 세션 관리 제거, 공통 인증 처리 일원화
성과: O(N) 풀스캔→O(1), 권한 변경 실시간 반영, 요청당 DB 쿼리 제거

---

### ML 추론 서비스 플랫폼
한컴인스페이스 · 2024.10 ~ 진행 중 · 팀 3명

현상: 위성 영상 분석 요청마다 수동 처리, GPU 서버에 모델 1개 고정으로 동시 추론 불가.
원인: 추론 서비스 미분리, K8s GPU 할당이 카운트 단위라 1파드=1GPU 강제.
해결:
- FastAPI 기반 추론 서비스 3종 독립 배포 — 단일 엔드포인트(/inference)가 객체 크기 기반으로 OBB/HBB 모델 자동 라우팅, 클라이언트는 모델 선택 불필요
  - object-detection: YOLOv26 OBB/HBB 듀얼모델, 20클래스(선박·항공기·차량·교량 등), letterbox 1024px, mAP ~70%
  - segmentation: UPerNet+ConvNeXt 백본, 6클래스 토지피복, mIoU ~70%
  - inferencer: Super-Resolution, rasterio GeoTIFF 직접 처리, 512×512 패딩
- Aliyun GPUShare 스케줄러 익스텐더로 `aliyun.com/gpu-mem` 단위 GPU 메모리 할당 — K8s 기본 카운트 단위 제약 우회, 서비스별 필요한 만큼만 메모리 점유
성과: 물리 GPU 1장에서 gprocessor 30파드 + inferencer 40파드 동시 운영, 70파드 병렬 추론

---

### 위성 데이터 수집 파이프라인
한컴인스페이스 · 2024.12 ~ 진행 중 · 팀 3명

현상: 위성 소스별 수집 로직 난립, 신규 위성 추가 시 파이프라인 전체 수정 필요.
원인: 소스별 하드코딩, 수집·카탈로그·잡 처리 강결합.
해결:
- Salt-Stack 기반 워크플로우 엔진(janus) 구축 — H_BASE/S_BASE 추상 클래스로 수집기 인터페이스 표준화, 신규 소스는 해당 클래스 상속 구현만으로 자동 통합
- 다누리(KPLO)·창천위성·Sentinel·Landsat·Planet·MODIS 등 10+ 소스 단일 파이프라인 통합
- SFTP 기반 망연계 relay 직접 구현 — 외부망↔폐쇄망 파일 중계
- 이메일 알림 5종 직접 구현(분석완료·시스템에러·보안다운로드 등)
성과: 신규 위성 소스 추가 시 수집기 클래스 1개만 구현, 기존 파이프라인 코드 수정 0건

---

### 드론 실시간 재난탐지 시스템
한컴인스페이스 · 2024.10 ~ 2025.12 · 팀 3명

현상: 재난 현장 드론 영상에서 부상자·위험물 위치를 육안으로 식별, 거리 추정 불가.
원인: 실시간 탐지 파이프라인 부재, 2D 영상만으로는 depth 정보 없음.
해결:
- ROS Noetic + Faster R-CNN ResNet50-FPN, 7클래스 실시간 탐지(~2~3fps)
- RGB·Depth 스트림을 ApproximateTimeSynchronizer(slop=0.5s)로 동기화 — 타임스탬프 불일치로 잘못된 depth가 사용되는 문제 해결
- 핀홀 카메라 모델 역투영으로 2D BBox 중심점 → 3D 카메라 좌표 변환, 카메라→드론 좌표계 변환 행렬 적용 후 절대 3D 좌표 산출(mm→m)
- 커스텀 ROS 메시지(MultiTarget/TargetData) 직접 설계, UDP로 GCS 실시간 전송, systemd 서비스 등록
성과: 탐지 대상 3D 절대좌표 실시간 산출, GCS 자동 보고

---

### 위성 영상 전처리 파이프라인 자동화
한컴인스페이스 · 2022.03 ~ 2022.12

현상: 파이프라인 장애 시 원인 파악에 하루 소요, 정상 데이터도 실패 데이터에 영향받아 처리 중단.
원인: 폴더 감시 폴링 방식으로 작업 간 격리 없음, 실패 지점 미기록.
해결:
- RabbitMQ 기반 이벤트 드리븐 파이프라인 전환 — ack/nack 기반 메시지 유실 방지, 완료 즉시 다음 큐 실행
- Choreography Saga 패턴 + DLQ — 실패 시 보상 트랜잭션 자동 실행, 재시도 초과 시 DLQ 격리로 무한 루프 방지 및 수동 처리 가능
- gprocessor J_ECD: 형태학적 필터링(3×3 kernel 4회) + 그림자 제거 → 변화 폴리곤 Shapefile 출력
- gprocessor J_MCD: MambaCD SSM + MINIMA 정합 + ECDF 히스토그램 매칭 + 타일 추론, COG 변환 + gdalwarp 멀티스레드 + EPSG:5179 재투영
성과: 장애 파악 하루→2시간 이내, 정상 데이터 실패율 0건

---

### 운영 수준 테스트 환경 구축
한컴인스페이스 · 2023.01 ~ 2023.06

현상: 로컬에서 테스트 통과해도 운영 배포 후 장애가 반복 발생.
원인: 테스트 서버 없이 로컬 → 운영 직접 배포, 엔지니어마다 환경 차이 존재.
해결: 운영 클러스터와 동일한 K8s 기반 테스트 클러스터를 사내 온프레미스에 구축, ETL·AI 모델·DB 동일하게 구성.
성과: 환경 차이로 인한 배포 후 장애 대폭 감소, 서버 5대→2대로 자원 효율화
