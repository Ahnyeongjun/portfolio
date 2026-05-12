# 백엔드 취업 준비 플랜

> 목표: 스타트업 백엔드 포지션 서류 통과율 개선
> 분석 기준: 여기어때, 오누이(설탭), 누아, 넵튠, 먼치팩토리 공고
> 마지막 업데이트: 2026.04.24

---

## ✅ 완료된 것 (포트폴리오 사이트)

- [x] outbox-module 프로젝트 추가 (WAL lifecycle / slot 취약점 설명)
- [x] team-mcp-agent 프로젝트 추가 (팀 10명 실사용)
- [x] satellite-platform MSA 항목 분리 (장애격리 vs HPA 이유 분리)
- [x] image-api 불필요한 achievement 제거
- [x] TechStack: Kotlin 추가, Debezium CDC → Kafka 교체
- [x] experience.ts: 블레이버스 해커톤, FESI/스위프/항해99 설명 구체화
- [x] profile.ts: MCP 업무 자동화 언급 추가
- [x] outbox GitHub URL 수정 (outbox_module)

---

## 1. 랠릿 이력서 수정 (미완료)

> 포트폴리오 사이트와 별개로 실제 제출 이력서도 맞춰야 함

### 🔴 즉시 수정

| # | 항목 | 내용 |
|---|------|------|
| 1 | **타이틀 변경** | "풀스택 개발자" → "Backend Engineer" |
| 2 | **Summary 재작성** | 숫자 3개 포함, 2~3줄로 압축 |
| 3 | **기술 스택 보강** | Redis, Go, JPA, Docker, RabbitMQ, Kafka, Kotlin 추가 |
| 4 | **경력 섹션** | 기술스택 / 팀 규모 / 핵심 성과 수치 추가 |
| 5 | **사이드 프로젝트** | Booksight, 축지법 (백엔드 위주) 추가 |
| 6 | **대외활동 정리** | 프론트엔드 항목 삭제, 백엔드·항해99 앞으로 |
| 7 | **포지션 표기** | "연구원 (Backend Engineer)" 추가 |

### Summary 예시
```
5년차 백엔드 엔지니어. 모놀리식 → MSA 전환 주도(9개 서비스),
Go 기반 API 응답 87% 개선(4초→0.5초), 이벤트 드리븐 파이프라인으로
장애 대응 시간 12배 단축. K8s 기반 인프라 설계·운영 경험 보유.
```

---

## 2. 면접 준비 (기술)

> 포트폴리오는 잘 돼있는데 말로 설명하는 연습이 필요함

### 🔴 바로 답할 수 있어야 하는 것

**동시성 처리 — 실제 경험 연결**
```
FOR UPDATE SKIP LOCKED  → Outbox 배치 다중 인스턴스 중복 처리 방지
Redis INCR 원자성       → 어드민 브루트포스 카운터
스레드풀 고갈 + HPA     → image-api / satellite-platform
```
"동시성 이슈 경험 있어요?" 물으면 위 세 가지로 답하기

**@Transactional 동작 원리**
- 프록시(CGLIB) 기반, 자기 자신 호출 시 트랜잭션 무시되는 이유
- Outbox 모듈에서 TransactionSynchronization 직접 쓴 이유랑 연결

**트랜잭션 전파**
```
REQUIRED      → 기본값, 있으면 합류
REQUIRES_NEW  → 새 트랜잭션, 기존 suspend
NESTED        → 세이브포인트
```

**분산락 한계**
- "언제 쓰면 안 되는지 아는 사람"으로 답변
- DB 분리된 서비스 간 → Saga/Outbox로 해결
- 단일 서비스 다중 인스턴스 → DB 락(FOR UPDATE SKIP LOCKED)으로 해결

### 🟡 알고 있으면 차별화

- JVM GC: Young/Old, G1GC 특징, Stop-the-World
- AOP: JDK Proxy vs CGLIB 차이
- READ COMMITTED vs REPEATABLE READ 팬텀 리드

---

## 3. 코드로 보여줘야 할 것들

### 🔴 테스트 코드 (우선순위 1)

사이드 프로젝트 하나에 제대로 붙이기.
```
추천: Booksight (Kotlin이라 Kotest 자연스럽게 연결)
목표: 핵심 도메인 단위테스트 + Repository 통합테스트
도구: Kotest + Testcontainers
```
커버리지 수치 README에 명시까지.

### 🟡 Redis 분산락 실제 적용

항해99에서 배웠다고 했는데 적용한 프로젝트가 없음.
사이드 프로젝트에 "재고 차감" 또는 "중복 요청 방지" 시나리오로 붙여보기.
단, FOR UPDATE SKIP LOCKED로 해결 가능한 케이스엔 굳이 쓰지 말기.

### 🟡 GitHub outbox_module README 정리

면접관이 클릭할 리포지토리.
```
최소 구성:
- 배경 (왜 만들었는지, Debezium 한계)
- 아키텍처 다이어그램
- 사용법 (애노테이션 예시)
- 핵심 구현 설명 (FOR UPDATE SKIP LOCKED, TransactionSynchronization)
```

---

## 4. 실력 보강

### 🔴 AWS 실습 (2~3주)

5개 공고 중 4개가 AWS 필수/우대. 사이드 프로젝트 AWS 배포.
```
최소 구성:
ECS Fargate / RDS(MySQL) / ElastiCache(Redis)
ALB + Target Group
GitHub Actions → ECR → ECS 배포 파이프라인
Route53 + ACM (HTTPS)
```

### 🟡 기술 블로그 2~3개

새 기술 공부 말고 이미 한 걸 쓰는 거.
```
1. Outbox 패턴 직접 구현기 (WAL 한계 → AOP 인터셉터 설계)
2. MSA 9개 서비스 전환 과정
3. Go + Redis로 API 4초→0.5초 개선
```
글 한 편이 이력서 한 줄보다 설득력 있음.

---

## 5. 우선순위 체크리스트

### 즉시 (이번 주)
- [ ] 랠릿 이력서 타이틀 / Summary / 기술스택 수정
- [ ] 랠릿 경력 섹션에 수치 추가
- [ ] 동시성 처리 + @Transactional 면접 답변 말로 연습

### 1~2주
- [ ] outbox_module GitHub README 정리
- [ ] Booksight에 Kotest 테스트 코드 추가
- [ ] 기술 블로그 1편 (Outbox 구현기)

### 2~4주
- [ ] AWS 실습 시작 (기존 사이드 프로젝트 배포)
- [ ] Redis 분산락 적용 시나리오 만들기
- [ ] 기술 블로그 2~3편

### 동시 진행
- [ ] 초기 스타트업 (시리즈A 이하) 집중 지원
- [ ] SWYP/항해99 인맥 리퍼럴 요청
- [ ] 링크드인 CTO DM 5~10건
