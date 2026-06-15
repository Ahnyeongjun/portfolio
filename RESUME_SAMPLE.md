# 안영준 — Backend Engineer

**ahn479512@gmail.com** · [github.com/Ahnyeongjun](https://github.com/Ahnyeongjun) · 서울

---

## 요약

운영 서비스의 구조적 병목을 직접 진단하고 수치로 증명해온 백엔드 엔지니어.  
모놀리식 → 9개 MSA 전환(재배포 월 10→1건 · 배포 4분→30초),  
Go 영상 API 응답 4초→0.5초 미만, Outbox 라이브러리 직접 개발로 이벤트 유실 0건.  
K8s HPA 운영 · GPU 1장에서 70파드 병렬 추론 경험 보유.

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| Backend | Spring Boot · Java 21 · Kotlin · FastAPI · Go · Python |
| Database | PostgreSQL · MySQL · Redis · Kafka · RabbitMQ |
| DevOps | Kubernetes · Docker · Jenkins · GitHub Actions |
| ML/Infra | PyTorch · ONNX Runtime · GDAL |

---

## 경력

### 한컴인스페이스 — 연구원 `2021.07 ~ 현재 (5년차)`

위성영상 AI 처리 플랫폼 백엔드 개발 및 아키텍처 설계

---

#### MSA 전환 · 이벤트 드리븐 아키텍처 `2022.12 ~ 현재`

`Spring Boot` `FastAPI` `RabbitMQ` `K8s` `Spring Cloud Gateway`

- 기능 배포마다 전체 서비스 재시작 → 도메인 경계 기준 9개 MSA 분리 + Spring Cloud Gateway 인증/라우팅 일원화  
  → **재배포 월 10건→1건 · 배포 속도 4분→30초**

- Salt 폴링 ack/nack 없어 노드 재시작 시 작업 RUNNING 고착 → RabbitMQ ack/nack + DLQ 비동기 파이프라인 전환  
  → **작업 유실 0건**

- Debezium replication slot 반복 파손으로 전체 스냅샷 재수행 필요 → AOP + MyBatis 기반 Outbox 패턴 라이브러리 직접 개발  
  → **CDC 인프라 의존 제거, 이벤트 유실 0건**

- 폐쇄망 환경에서 외부 코디네이터(ZooKeeper) 접근 불가 → Snowflake 알고리즘 분산 ID 생성기 직접 구현, worker ID에 망 정보 인코딩  
  → **양 망간 ID 충돌 0건, 로그에서 발생 서버 즉시 추적 가능**

---

#### Go 기반 영상 타일링 API 고성능화 `2024.04 ~ 2025.03`

`Go` `GDAL` `Redis` `GeoTIFF` `Nginx` `K8s`

- 영상 수 증가할수록 WMS 합성 응답 시간 선형 증가 (4초 이상) → WMTS + z/x/y 좌표 캐시 키 고정 + Go 고루틴 타일 병렬 생성  
  → **API 응답 4초→0.5초 미만**

---

#### 어드민 인증 시스템 최적화 `2024.04 ~ 2024.12`

`Spring Boot` `Spring Cloud Gateway` `Redis` `PostgreSQL`

- 권한 변경 시 Redis 전체 세션 풀스캔 → userId→sessionId Set 역인덱스 재설계  
  → **O(N)→O(1), 권한 변경 실시간 반영**

- 재귀 트리 메뉴 N+1 쿼리 → WITH RECURSIVE CTE 단일 쿼리 전환

---

#### GPU 활용률 최적화 · AI 추론 서비스 3종 `2024.10 ~ 현재`

`Kubernetes` `Aliyun GPUShare` `ONNX Runtime` `FastAPI`

- K8s 기본 GPU 카운트 단위로 1파드=1GPU 강제, 자원 90% 유휴 → Aliyun GPUShare `aliyun.com/gpu-mem` 메모리 단위 분할 스케줄러 구성  
  → **GPU 1장에서 70파드 병렬 추론 운영**

- 단일 모델 고정으로 동시 추론 불가 → object-detection · segmentation · inferencer 3종 FastAPI 서비스 독립 배포  
  → **모델별 독립 스케일링 달성**

---

#### K8s 테스트 환경 분리 · SSO 인증 `2021.07 ~ 2023.06`

`Kubernetes` `LDAP` `Active Directory` `Spring Security`

- 로컬 환경 차이로 운영 배포 후 반복 장애 → 운영 클러스터와 동일 구성의 K8s 테스트 클러스터 물리 분리  
  → **환경 차이 기인 배포 후 장애 대폭 감소 · 서버 5대→2대 효율화**

---

## 사이드 프로젝트

### Mapin — 콘텐츠 관점 분석 AI 서비스 `2026.03 ~ 04`

백엔드 단독 · `Spring Boot 4.0` `Java 21` `Virtual Threads` `GPT-4.1-mini` `PostgreSQL`

- 동일 콘텐츠 재요청마다 GPT API 비용 반복 발생 → L1(결과 JSON 캐시)·L2(분석 이력)·L3(키워드 풀) 3단계 캐싱 설계  
  → **재요청 시 API 호출 0회**

- 반대관점 후보 N개 개별 스코어링으로 토큰 낭비 → 배치 스코어링으로 GPT 1회 호출로 전체 후보 처리

- E2E 포함 13개 테스트 파일 · iOS App Store + 웹 동시 배포

---

### DeadlineMate — 스터디 모임 플랫폼 `2026.03 ~ 04`

백엔드 · `Spring Boot` `Java 21` `QueryDSL` `JUnit5` `GitHub Actions CI`

- 알림 실패가 모임 데이터에 영향을 주는 강결합 → `@TransactionalEventListener(AFTER_COMMIT)` 이벤트 분리  
  → **외부 서비스 장애 시에도 모임 데이터 유실 0건**

- 동시 신청 시 maxMembers 초과 가능성 → PESSIMISTIC_WRITE + Batch UPDATE 원자적 증감

- **51개 테스트 파일** — Controller · Service(Mockito) · Repository(@DataJpaTest) · E2E 3-layer 피라미드 + GitHub Actions CI

---

### 동시성 제어 콘서트 예약 시스템 `2025.07 ~ 09`

항해99 9기 상위 10% · `Spring Boot` `Redis` `Kafka` `k6` `Grafana`

- 분산락 재시도 로직이 응답 지연 원인 → k6+Grafana 부하 테스트로 병목 특정 → 낙관적 락 전환으로 해결

- Redis 대기열 → Kafka 마이그레이션 + Choreography Saga + DLQ 패턴

---

### Booksight — 오늘의 신간 발견 서비스 `2025.04 ~ 07`

서브 백엔드 · `Kotlin` `Spring Boot` `Spring Batch` `QueryDSL` `MySQL` `Oracle`

- 12만 건 초기 적재 시 OOM → JdbcTemplate 배치 INSERT 전환 → **전체 데이터 안정 적재**

- AOP + Spring Event 기반 검색 로그 수집 · 2차 배치 연동

---

## 학력

| 학교 | 전공 | 기간 |
|------|------|------|
| 한밭대학교 | 융합기술학과 | 2022.03 ~ 2026.03 (졸업·야간) |
| 대덕소프트웨어마이스터고 | 소프트웨어개발과 | 2020.03 ~ 2022.03 (졸업) |

## 자격증

- 정보처리기사 (2025)
- SQL개발자 SQLD (2025)

## 활동

- **FESI 13기 백엔드 멘토링** `2026.03 ~ 04` — 수강생 6명 PR 리뷰 · DDD+TDD 실습 진행
- **스위프(SWYP) 웹 9~11기, 앱 4기** `2025.01 ~ 2026.04` — 백엔드·프론트엔드·PM 역할 순환 참여
- **항해99 백엔드코스 9기** `2025.07 ~ 09` — TDD · 동시성 처리 · Kafka · 상위 10% 수료
