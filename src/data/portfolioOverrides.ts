// /portfolio-pdf 회사별 오버라이드 barrel. 공개 레포(master)에서는 항상 비어 있다.
// 실제 회사별 파일(src/data/companies/*.portfolio.ts)과 import 목록은 비공개 레포
// (resume-local)에만 있고, /api/portfolio-overrides가 이 파일을 다시 생성한다.
// master에서는 이 파일을 고치지 않는다 (resume-local과 충돌 방지).

export * from "./portfolioOverrideTypes";
import type { PortfolioOverride } from "./portfolioOverrideTypes";

export const PORTFOLIO_COMPANY_OVERRIDES: Record<string, PortfolioOverride> = {};
