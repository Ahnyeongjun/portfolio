# 작업 노트 (이어서 작업용)

> 다른 PC에서 이어서 작업하기 위한 핸드오프 메모. 최신 상태는 항상 이 파일 + git log 기준.

## 최근 작업 (2026-06)

### 1. 헤더에 PDF 드롭다운 추가
- 우측 하단 플로팅 문서 버튼(`FloatingDocButtons`) **제거** → 컴포넌트 파일 삭제, `src/app/page.tsx`에서 참조 제거
- 헤더 우측에 `… | PDF | KO·EN` 형태로 **PDF 드롭다운** 추가 (`src/components/Header.tsx`)
  - hover/포커스 시 메뉴가 열려 **이력서**(`/resume`) / **포트폴리오**(`/portfolio-pdf`) 구분 선택
  - 캐럿 회전, 다크 테마 대응 CSS → `src/app/globals.css` (`.pf-pdf-*`)
  - ※ 클릭 토글 + 닫기 버튼 방식도 시도했다가 hover 방식으로 **원복**함

### 2. PDF 화면(이력서·포트폴리오)에 아이콘 버튼
- 두 문서(`ResumeDocument.tsx`, `PortfolioDocument.tsx`) 우측 상단에 **원형 아이콘 버튼 2개** 나란히 배치
  - `←` 뒤로가기(`/`로 이동), `↓` 다운로드 = PDF 저장/인쇄
- 기존 텍스트 버튼(`tb-btn`/`ghost`) 제거, `aria-label`/`title`로 접근성 유지, 인쇄 시 숨김
- 클래스: `.rallit-toolbar`/`.rallit-iconbtn`, `.wanted-toolbar`/`.wanted-iconbtn`

### 3. 이력서 경력 섹션 정리
- 경력 성과 칩(`.career-metrics`/`.cm`, "재배포 월 10건→1건" 등) **제거**
- 경력 섹션을 **실제 수행 업무 그룹**(`career.groups`) 렌더로 복원 (전 버전과 동일)
- 깨져 있던 `var(--res)` 흔적 정리
- `profileDoc.ts`의 `career.metrics` 데이터 자체는 보존 (현재 화면에는 미사용)

## 다음 할 일 (TODO)

- [ ] **AI 활용 경험 추가**: Claude Code를 ML 실험 오케스트레이터로 활용한 경험을 이력서/포트폴리오에 녹이기
  - 내용: Skill이 `work_history`를 읽고 다음 작업 판단 → Hook+sh로 학습 자동 실행 → 결과를 `work_history`에 기록 → 그 기록 기반으로 다음 학습 결정(자율 루프) → 완료/에러 시 Slack 실시간 알림
  - 메시지 핵심: "AI를 코드 보조가 아니라 반복 엔지니어링을 위임하는 자율 에이전트로 설계·운영"
  - **결정 필요**: ① 배치 위치(이력서 프로젝트 / 대외활동 / 포트폴리오 문서) ② 수치 어필 가능 여부(실험 회전율 등) ③ 회사 업무인지 개인 사이드인지

## 참고 / 주의

- `sample.md` = **다른 사람(뤼튼 Platform Engineer 지원, kangsj12)** 포트폴리오 샘플. 안영준 이력서 아님. 스타일 참고용.
- 이력서/포트폴리오 실제 콘텐츠 단일 소스: `src/data/profileDoc.ts`
- 이력서 렌더: `src/components/resume/ResumeDocument.tsx` (Rallit 스타일)
- 포트폴리오 문서 렌더: `src/components/portfolio-pdf/PortfolioDocument.tsx` (Wanted 스타일)
- `package-lock.json`에 무관한 변경(-11줄)이 남아 있을 수 있음 — 커밋에는 미포함.
