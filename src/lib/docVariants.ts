/**
 * 이력서·포트폴리오 PDF의 인프라/풀스택 탭 노출 여부.
 * 공개 배포본은 인프라 한 가지만 보여준다. 비공개 레포(resume-local)는 `.env.local`에
 * NEXT_PUBLIC_SHOW_VARIANT_TABS=1 을 두고 두 탭을 모두 쓴다.
 */
export const SHOW_VARIANT_TABS = process.env.NEXT_PUBLIC_SHOW_VARIANT_TABS === "1";
