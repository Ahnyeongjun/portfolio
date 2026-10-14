# portfolio-next (공개 레포)

안영준의 **공개 프로필 사이트**. 여기 들어간 내용은 전부 인터넷에 공개된다는 전제로 작업한다.
배포: `master` → origin(`Ahnyeongjun/portfolio`) → Vercel.

## 이 레포의 역할 (경계)

| 레포 | 역할 | 공개 |
|---|---|---|
| **portfolio-next** (`master`, 이 레포) | 공개될 내 정보: 프로필·경력·프로젝트·이력서/포트폴리오 PDF, **블로그 원본** | 공개 |
| portfolio-next-resume-local (`resume-local` → private remote) | 개인 기록: 일정, 학습 기록, 작업 메모 | 비공개 |

**판단 기준: "처음 보는 채용 담당자가 읽어도 되는가?"** 아니면 이 레포에 넣지 않는다.

### 흐름
- `master` → `resume-local` 방향으로만 merge한다. resume-local은 이 레포 위에 비공개 파일을 얹은 구조
- **블로그는 이 레포에서 쓰고 배포한다.** resume-local은 블로그를 쓰지 않고 공개 URL(`/blog/<slug>`)로 링크만 건다
- 블로그에는 draft 기능이 없다. 작성 중인 글은 브랜치에 두고, 완성되면 master로 merge
- 공유 파일(`src/app/page.tsx`, `layout.tsx`, `next.config.ts`, 공용 컴포넌트)은 이 레포에서 고친다

### 여기에 넣지 않는 것
- 회사별 맞춤 문서, 개인 계획·일정·학습 진도, 연봉 등 사적인 내용 → resume-local
- 작업 메모·핸드오프 노트, 이력서 복붙용 txt → resume-local (`.gitignore`에 등록됨)
- 사내 IP·호스트명·SSH 정보, 납품 데이터(위성영상 등), 고객사 내부 수치 원본
- 연락처 외 개인정보 (주소, 생년월일 등). 이메일/GitHub/LinkedIn만 공개

애매하면 넣기 전에 사용자에게 묻는다.

## 구조

```
src/
  app/            Next.js App Router 페이지 (/, /projects/[id], /blog, /resume, /portfolio-pdf, /lab)
  components/     sections/ (메인 섹션), resume/, portfolio-pdf/, blog/
  data/           콘텐츠 원본 (아래)
  content/blog/   블로그 MDX
messages/         next-intl ko/en
public/           이미지 (프로젝트 썸네일·아키텍처 등)
```

### 콘텐츠 원본 (수정은 여기서)
- `src/data/profile.ts` — 메인 사이트 프로필·프로젝트
- `src/data/profileDoc.ts` — 이력서/포트폴리오 PDF 내용 (`PROFILE`, `PROFILE_PLATFORM`)
- `src/data/experience.ts`, `skills.ts`, `strings.ts`
- `src/data/resumeOverrides.ts` — 공개본은 **빈 기본값**만. `--skip-worktree` 처리됨, 실제 회사별 값은 resume-local에서 관리

## 작업 규칙

- 한국어로 답한다. 커밋 메시지도 한국어 (`content:`, `fix:`, `feat:` 접두사, 기존 로그 형식 따름)
- 직군 표기는 중립: **Software & Infrastructure Engineer**
- 톤: 단정적·과장 표현 피하고 사실과 수치 위주. 수치는 출처(측정 방법)를 설명할 수 있는 것만
- 경력·프로젝트 날짜를 바꾸면 `profile.ts`와 `profileDoc.ts` 양쪽을 같이 고친다
- 블로그 글에는 실제 스크린샷을 우선 사용
- PDF 페이지 나눔 문제는 `resume-pdf-pagination` 스킬 참고
- 블로그 글을 쓸 때: 위 "넣지 않는 것"을 점검한다 (회사명, 사내 IP·호스트명, 고객 내부 수치)
- resume-local에서 기능/콘텐츠를 가져올 때도 같은 점검 후 cherry-pick (회사명, IP 패턴)

## 확인
```bash
npm run build
npm run lint
```
