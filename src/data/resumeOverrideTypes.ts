// Type definitions for per-company /resume overrides. Pure types - no
// personal data - so this file is a normal tracked file (not skip-worktree).
// Real per-company content lives in src/data/companies/<key>.resume.ts
// (gitignored). The assembled Record is in resumeOverrides.ts (skip-worktree).
/**
 * Per-variant text overrides (풀스택/backend or 인프라/platform).
 *  - taglineOverride: replaces the header's punchy one-liner with a labeled
 *    "자기소개" block (bold heading + plain-weight paragraph(s), \n\n-separated)
 *    - the common self-intro format for every company override.
 *  - careerOverride: freeform text, one bullet per line, that REPLACES the
 *    entire "01. 경력" body (all groups/items) for this company - the
 *    dashboard's "기본 문구 불러오기" button pre-fills it with the current base
 *    bullets flattened to one-per-line so it's easy to paste over/trim rather
 *    than starting from a blank box. Group titles/periods are dropped once
 *    this is set; leave it empty to keep the base grouped resume unchanged.
 *  - projectAchievements: keyed by `${pkey}:${blockIndex}` into that project's
 *    `blocks` array (blockIndex is the index in the *unfiltered* blocks array,
 *    so it stays put even if a block without brief/oneliner sits between two
 *    that have one) - replaces just that block's text, others fall back to
 *    base content untouched. Positional, so an edit that reorders/removes
 *    blocks in profileDoc.ts can silently point a saved override at the wrong
 *    one - re-check with the dashboard's preview link after reshuffling.
 *  - skillOrder/projectOrder/achievementOrder: pure re-ordering, no text
 *    changes. Any category/project/block NOT listed keeps its original
 *    relative order and is appended after the listed ones - so a partial
 *    list (e.g. just "promote these 2 to the top") is enough.
 *  - extraSkillItems: keyed by category name - items APPENDED to that
 *    category's existing item list (or added as a whole new category if the
 *    name doesn't match an existing one), for this company only.
 */
export type ProjectAchievementOverride = {
  label?: string;
  /** [원인·해결] pair - only meaningful for blocks whose base uses `brief`. */
  brief?: [string, string];
  result?: string;
  /** only meaningful for blocks whose base uses `oneliner` instead of `brief`. */
  oneliner?: string;
};

/** One bullet under an extraProjects entry - same label+brief/result/oneliner
 *  shape as a base project's achievement row, since it has no `blocks[]` of
 *  its own to key a projectAchievements override into. Set either `oneliner`
 *  (single result line) or `brief` (+ optional `result`) for the 원인/해결/결과
 *  3-row breakdown - same contract as ProjectAchievementOverride. */
export type ResumeExtraAchievement = {
  label: string;
  oneliner?: string;
  brief?: [string, string];
  result?: string;
};

/** A whole extra project APPENDED to "02. 프로젝트" for this company only -
 *  for side projects (e.g. a hackathon/공모전 app) that aren't in profileDoc.ts's
 *  base PROFILE.projects and so have no pkey to hang a projectOrder/
 *  achievementOrder/projectAchievements override off of. */
export type ResumeExtraProject = {
  title: string;
  company: string;
  period: string;
  badge?: string;
  /** "·"-joined tech stack line rendered under the title/period, same spot and style as a base project's showProjectStack line. */
  stack?: string[];
  desc?: string;
  achievements: ResumeExtraAchievement[];
};

export type VariantOverride = {
  /** Replaces the header role/title line (e.g. "풀스택 개발자 (인프라 메인)") when set. */
  roleOverride?: string;
  /** Replaces the header photo slot (public/ path) for this company only - e.g. a small architecture icon in place of a real headshot when no photo is available. No effect when unset (falls back to the base profile photo, if any). */
  photoOverride?: string;
  /** Extra label/value rows appended to the header contact block (after EMAIL/GITHUB/PORTFOLIO/CAREER), for this company only - for headhunter/staffing-firm submissions whose own resume template expects admin fields (생년월일·주소·병역·희망연봉·입사가능시기 etc.) that the base resume otherwise omits. No effect when unset. */
  personalInfoOverride?: { label: string; value: string }[];
  /** Renders a single highlighted line (border-top/bottom, deliberately breaks reading flow) right after 자기소개, linking to a blog post that backs up a JD gap. No effect when unset. */
  blogLinkOverride?: { text: string; url: string };
  /** Lays out the "자격증" list as a 2-column grid instead of the default single stacked column, for this company only - fits 4 certs on one page without spilling a lone item onto a near-empty next page. No effect when unset. */
  certsTwoColumn?: boolean;
  /** Replaces the header's punchy one-liner tagline when set - renders as a labeled "자기소개" block instead (bold "자기소개" heading + plain-weight body text, \n\n-separated paragraphs supported) since a company-specific self-intro is usually full paragraph(s), not a one-liner. This is the common format for every company override; the base (no override) resume keeps the original unlabeled bold one-liner + 핵심역량 3-block rundown. */
  taglineOverride?: string;
  /** Optional "핵심역량" block rendered right after 자기소개/지원 동기, before "01. 경력" - paragraphs separated by a blank line, each paragraph's first line is a bold item title (rendered like a "02. 프로젝트" achievement row: accent dot + bold title, plain-weight description below) so it reads as a distinct labeled section rather than a continuation of the 자기소개 prose. No effect when unset. */
  competencies?: string;
  /** Rendered as its own "00. 지원 동기" section, before "01. 경력". */
  motivation?: string;
  /** Whether "01. 경력" (or "02. 프로젝트" if hideCareerSection is set) starts at the top of the next page. When taglineOverride is set, this defaults to `true` (page 1 reserved for the 자기소개/지원동기/핵심역량 intro alone) - set `false` here to opt out for a company whose intro is short enough to leave page 1 mostly blank under that default, so the next section flows right after it instead. Explicit `true`/`false` always wins over the default. */
  pageBreakBeforeCareer?: boolean;
  /** Replaces the whole "01. 경력" body when set - blank-line-separated blocks, each rendered as an achievement row (accent dot + bold label + plain-weight description below), same visual style as "핵심역량"/"02. 프로젝트". A block's first line is the bold label; remaining lines (if any) are the description. A block starting with "## " instead starts a new heading group (cg-title). */
  careerOverride?: string;
  /** Drops the "경력" section entirely for this company - for single-employer histories where it's pure restatement of "프로젝트". Section numbers auto-renumber to fill the gap. */
  hideCareerSection?: boolean;
  projectAchievements?: Record<string, ProjectAchievementOverride>;
  /** Category names (e.g. "언어·프레임워크") in desired display order for "03. 기술 스택". */
  skillOrder?: string[];
  /** Category name -> item order within that category's skill chips (partial list ok - unlisted items keep their original relative order, appended after the listed ones). Base-data item order is otherwise shared across every company, so use this instead of reordering profileDoc.ts's skill item arrays directly. */
  skillItemOrder?: Record<string, string[]>;
  /** Project keys (pkey, or title if no pkey) in desired display order for "02. 프로젝트". */
  projectOrder?: string[];
  /** Per-project (keyed by pkey/title) achievement block indices in desired display order. */
  achievementOrder?: Record<string, number[]>;
  /** Per-project (keyed by pkey/title) achievement block indices to drop from "02. 프로젝트" entirely, for this company only - e.g. a block whose content is already covered by 핵심역량/careerOverride for this company, so showing it again as a project row would be a visible duplicate. Same contract as portfolioOverrides.ts's hideBlocks. */
  hideAchievements?: Record<string, number[]>;
  /** Category name -> extra items appended to it (or a new category if the name is new). */
  extraSkillItems?: Record<string, string[]>;
  /** Category name -> base items to drop from that category's chip list, for this company only - e.g. a shared skill the base resume lists but this company never actually used in practice (unlike extraSkillItems, base data has no per-company removal otherwise). */
  hideSkillItems?: Record<string, string[]>;
  /** One-line italic note rendered under the "04 대외활동" header, before the activity list. */
  activitiesNote?: string;
  /** Activity titles to exclude from "04 대외활동" entirely, for this company only - e.g. a shallow team-project activity with no notes that isn't worth the space for a JD-focused resume. */
  hideActivities?: string[];
  /** Cert names to exclude from "자격증" entirely, for this company only - e.g. pre-college certs with no variance for a service-company application. */
  hideCerts?: string[];
  /** Activity title -> note indices to drop from that activity's bullet list, for this company only - for trimming a learning-project's implementation-level sub-bullets (e.g. "[IaC] ...") down to just the title+desc line, without hiding the whole activity via hideActivities. */
  hideActivityNotes?: Record<string, number[]>;
  /** Extra "04 대외활동" entries appended after the base list, for this company only - same shape as a base activity (title/org/year/desc) plus an optional url that makes the title a clickable link (e.g. a personal blog series that isn't a base career activity), and an optional notes[] for sub-bullets (same contract as a base activity's notes[]) - for promoting a side-project's depth (e.g. per-project one-liners) into 대외활동 instead of a full "02. 프로젝트" card. */
  extraActivities?: { title: string; org: string; year: string; desc: string; url?: string; notes?: string[] }[];
  /** Project keys (pkey, or title if no pkey) to exclude from "02. 프로젝트" entirely, for this company only. */
  hideProjects?: string[];
  /** Per-project (keyed by pkey/title) one-line overview override for "02. 프로젝트" - replaces the base project's `desc` for this company only, so a reviewer scanning many resumes gets the project's what/why in one line instead of the base's fuller paragraph. */
  projectDescOverride?: Record<string, string>;
  /** Per-project (keyed by pkey/title) replacement for the base project's small badge chip (next to the title, e.g. "주도(풀스택 2·인프라 2·AI 1)") for this company only - e.g. to prepend an explicit "BE 1(본인)" role count the base badge doesn't spell out. */
  badgeOverride?: Record<string, string>;
  /** Renders each project's tech stack (profileDoc.ts's `stack` array, "·"-joined) as a small line under the project title/period, for this company only - lets a reviewer see what a project was built with without flipping to "03. 기술환경". Off by default so existing company overrides tuned without it are unaffected. */
  showProjectStack?: boolean;
  /** Per-project (keyed by pkey/title) trimmed/versioned Skills chip list for this company only - replaces the base project's `stack` array in the showProjectStack line, same contract as portfolioOverrides.ts's stackOverride (e.g. so a resume can show "Kubernetes 1.30 · ArgoCD 3.4" instead of the base's unversioned "Kubernetes · ArgoCD"). No effect when showProjectStack is off. */
  stackOverride?: Record<string, string[]>;
  /** Replaces the "프로젝트" section header text when set (e.g. to "경력") - purely cosmetic, doesn't change section numbering or content. */
  projectsSectionTitle?: string;
  /** One-line note rendered under the "프로젝트" section header, before the project list - for a company with hideCareerSection set, where the 경력 body would otherwise have been just a single tag-line summary not worth its own section. */
  projectsSectionNote?: string;
  /** Whole extra projects appended after the base project list in "02. 프로젝트", for this company only. */
  extraProjects?: ResumeExtraProject[];
  /** Where extraProjects render relative to the base (projectOrder-sorted) project list - "before" puts them first (e.g. to lead with an internal/cross-cutting project that maps to a JD's top priority), default "after". Ignored when extraProjectsAfterKey is set. */
  extraProjectsPosition?: "before" | "after";
  /** Renders extraProjects immediately after the base project (by pkey/title) named here, instead of before/after the whole base list - for slotting a cross-cutting project (e.g. "사내 공통") into a specific spot in the sequence (say, matching the equivalent portfolio's project order) rather than only the list's very start or end. Overrides extraProjectsPosition when set. */
  extraProjectsAfterKey?: string;
  /** Per-project (keyed by pkey/title) one-liners appended below that project's achievement list, for this company only - same contract as portfolioOverrides.ts's extraDuties. For a base career item that has no matching block (e.g. a process/habit item like PR review) so there's no block index to hang a projectAchievements override off of. */
  extraDuties?: Record<string, string[]>;
};

/** Where this application currently stands - shown as a badge on /companies.
 *  "완료": 전형이 끝남(결과 불문) · "공고 내려감": 공고가 내려가 지원 기회 자체가 사라짐 · "예정": 아직 지원 전/진행 중 · "서류합격": 서류 전형 통과, 다음 전형 대기/진행 중. */
export type CompanyStatus = "완료" | "공고 내려감" | "예정" | "서류합격";

export type ResumeOverride = {
  /** Display name shown in the /resume/dashboard list. */
  company: string;
  /** Application status shown on /companies - defaults to "예정" when unset. */
  status?: CompanyStatus;
  /** Free-form labels (industry, track, etc.) shown as filterable chips on /companies - e.g. ["인프라", "핀테크"]. */
  tags?: string[];
  backend?: VariantOverride;
  platform?: VariantOverride;
};

