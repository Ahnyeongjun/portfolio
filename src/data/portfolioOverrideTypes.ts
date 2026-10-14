// Type definitions for per-company /portfolio-pdf overrides. Pure types - no
// personal data - so this file is a normal tracked file (not skip-worktree).
// Real per-company content lives in src/data/companies/<key>.portfolio.ts
// (gitignored). The assembled Record is in portfolioOverrides.ts (skip-worktree).
/**
 * A whole extra project APPENDED to "Projects" for this company only - shaped
 * like profileDoc.ts's DocProject/DocBlock (situation/cause/actions/result is
 * the same AS-IS/TO-BE story format the base portfolio uses), minus `pkey`
 * since it has no matching 경력 items to pull "담당 업무" lines from.
 */
export type PortfolioBlock = {
  label: string;
  situation: string;
  cause: string;
  actions: string[];
  result: string;
  /** Optional numbered step sequence (request flow, pipeline stages, etc). */
  flow?: { step: string; desc: string }[];
  /** AS-IS 한 줄을 짧은 태그 체인으로 보여줄 때. */
  asisTags?: string[];
  /** TO-BE 한 줄을 짧은 태그 체인으로 보여줄 때. */
  tobeTags?: string[];
  /** 글만으로는 이해가 어려운 극소수 블록에만 붙이는 박스형 전후 다이어그램(CSS로 직접 렌더) - same contract and kind list as profileDoc.ts's DocBlock.diagram, duplicated here since extraProjects blocks aren't DocBlock literals. */
  diagram?: "cdc-outbox" | "war-session" | "rabbitmq-queue" | "cluster-ha" | "nvme-trace" | "query-tuning" | "otel-observability" | "jenkins-argocd" | "gpu-share" | "k6-ci" | "docker-cache" | "ai-agent-mcp" | "ai-agent-mcp-playwright" | "rolling-update" | "claude-workflow-pipeline" | "provisioning-ansible" | "msa-boundary" | "wedding-cache" | "terraform-ansible-aws" | "health-index";
};

export type PortfolioExtraProject = {
  title: string;
  company: string;
  period: string;
  stack: string[];
  desc: string;
  blocks: PortfolioBlock[];
  screenshot?: string;
  archImage?: string;
  /** 개요 밑에 태그+화살표 체인으로 보여줄 전체 아키텍처/요청 흐름. archImage 대체용. */
  archFlow?: { step: string; desc: string }[];
};

/** Per-block text override, keyed by `${pkey}:${blockIndex}` (same positional
 *  contract as resumeOverrides.ts's projectAchievements) - replaces just the
 *  given fields of that block's label/situation/cause/actions/result for this
 *  company only, so two base blocks can be merged into one combined story
 *  without duplicating the base data for every other company. */
export type PortfolioBlockOverride = {
  label?: string;
  situation?: string;
  cause?: string;
  actions?: string[];
  result?: string;
  /** Small clickable "further reading" line rendered right after the result, for this company only - e.g. a blog post that backs up a judgment call made in this block. Renders as an actual link, unlike embedding a raw URL in `result` (plain text, not clickable). */
  resultLink?: { text: string; url: string };
};

export type PortfolioVariantOverride = {
  /** Replaces the cover's English role line (base VARIANTS[variant].roleEn, e.g. "Infrastructure Engineer") when set, so the portfolio and resume can agree on the same role label - same contract as resumeOverrides.ts's roleOverride. */
  roleOverride?: string;
  /** Extra projects appended after the base project list, for this variant only. */
  extraProjects?: PortfolioExtraProject[];
  /** Pull the "사내 공통 · 업무 자동화" block up to right after this project's card (matched by pkey, or extraProjects title) instead of its default spot after the last project. */
  commonDutiesAfterKey?: string;
  /** Project keys (pkey, or title if no pkey) in desired display order - same contract as resumeOverrides.ts. */
  projectOrder?: string[];
  /** Per-project (keyed by pkey/title) achievement block indices in desired display order. */
  achievementOrder?: Record<string, number[]>;
  /** Project keys (pkey, or title if no pkey) to exclude from "Projects" entirely, for this company only. */
  hideProjects?: string[];
  /** Replaces the cover subtitle line (base P.tagline) when set, so the portfolio and resume can agree on framing. */
  taglineOverride?: string;
  /** Category name -> extra items appended to it (or a new category if the name is new) - same contract as resumeOverrides.ts. */
  extraSkillItems?: Record<string, string[]>;
  /** Category name -> items to drop from it (for shared base items this company never actually used, or to swap in a differently-annotated version via extraSkillItems) - same contract as resumeOverrides.ts's hideSkillItems. */
  hideSkillItems?: Record<string, string[]>;
  /** Per-project (keyed by pkey/title) replacement for the "개요" paragraph (base project's `desc`) for this company only - same contract as resumeOverrides.ts's projectDescOverride, for trimming a multi-sentence base desc to the one JD-relevant headline metric. */
  descOverride?: Record<string, string>;
  /** Category names in desired display order for the Skills · About section - same contract as resumeOverrides.ts. */
  skillOrder?: string[];
  /** Category name -> item order within that category's skill chips (partial list ok) - same contract as resumeOverrides.ts's skillItemOrder. */
  skillItemOrder?: Record<string, string[]>;
  /** Per-project (keyed by pkey/title) block indices to drop from "핵심 업무" for this company only - the resume's projectAchievements one-liner is assumed to cover them instead, so the portfolio can stay to a handful of deep-dive blocks. */
  hideBlocks?: Record<string, number[]>;
  /** Section keys to omit entirely for this company - these duplicate what the resume already owns. "duties" drops the "그 외 담당 업무"/"담당 업무" one-liner list under every project (not the "사내 공통" common-items block, which is separate). */
  hideSections?: ("activities" | "skills-about" | "education" | "duties")[];
  /** Per-project (keyed by pkey/title) extra one-liners appended to "그 외 담당 업무", for this company only - for a base career item that's normally suppressed there via `coveredByBlock` (because other companies show its block in full) but whose block THIS company hides via `hideBlocks`, so it would otherwise vanish entirely from this company's portfolio. Also usable to attach one-liners to an extraProjects entry (keyed by its title, since it has no pkey/base duties of its own). */
  extraDuties?: Record<string, string[]>;
  /** Per-project (keyed by pkey/title) - "before" renders this project's extraDuties ahead of its auto-included base duties/devNotes instead of after (the default), for when the extraDuties entry is more JD-relevant than the base duty it would otherwise trail (e.g. an infra fact should outrank an adjacent-skill fact like a frontend migration note). */
  extraDutiesPosition?: Record<string, "before" | "after">;
  /** Per-project (keyed by pkey/title) - exact rendered text of auto-included base duties/devNotes to drop from "그 외 담당 업무", for this company only - for when a duty's content gets promoted into a full block (via hideBlocks flipped off + blockOverrides) so leaving the same fact as a trailing one-liner too would duplicate it. Match against the text AFTER stripTag+" - " truncation (i.e. what's actually rendered), not the raw base career-item text. */
  hideDuties?: Record<string, string[]>;
  /** Replaces the cover's 4 highlight stat chips (base P.highlights.slice(0,4)) when set, so the portfolio can lead with whichever numbers this company's JD actually cares about instead of the generic default set. */
  highlightsOverride?: { v: string; l: string }[];
  /** Per-block (keyed by `${pkey}:${blockIndex}`) text overrides - see PortfolioBlockOverride. */
  blockOverrides?: Record<string, PortfolioBlockOverride>;
  /** Project keys (pkey, or title if no pkey) to hide the real app-screen screenshot for, for this company only - some review guides (e.g. a specific JD's portfolio checklist) disallow raw UI captures in favor of the AS-IS/TO-BE diagrams. */
  hideScreenshots?: string[];
  /** Per-project (keyed by pkey/title) trimmed Skills chip list for this company only - replaces the base project's full `stack` array in its header. For when the full stack (10+ items) duplicates the consolidated Skills·About page 3x over; trim to the JD-relevant core here and let the Skills page carry the full list. */
  stackOverride?: Record<string, string[]>;
  /** One-line note rendered under the "대외활동 · 학습" title, before the activity list - same contract as resumeOverrides.ts's activitiesNote. */
  activitiesNote?: string;
  /** Adds a BLOG row to the "Skills · About" block's EMAIL/GITHUB/PORTFOLIO/CAREER list, for this company only - the resume's blogLinkOverride has no portfolio equivalent otherwise, so the portfolio ships zero blog reference. */
  blogLinkOverride?: { text: string; url: string };
  /** Exact-text matches of no-`.proj` career items to drop from the "사내 공통 · 업무 자동화" list, for this company only - for when an `extraProjects` entry already promotes that same bullet to a full 문제-해결-결과 block elsewhere in this company's portfolio, so leaving it in the common list would duplicate it. */
  hideCommonDuties?: string[];
  /** Exact-text matches of per-project (has `.proj`) career items to drop from that project's "그 외 담당 업무" list, for this company only - same contract as hideCommonDuties but for a specific project's items rather than the no-`.proj` common list. For when a project's base duty line is now told in full by a block this company shows (e.g. via a newly-promoted block), so leaving the duty line in would duplicate it. */
  hideProjectDuties?: Record<string, string[]>;
  /** Activity titles to exclude from "대외활동 · 학습" entirely, for this company only - same contract as resumeOverrides.ts's hideActivities. */
  hideActivities?: string[];
  /** Activity title -> note indices to drop from that activity's bullet list, for this company only - same contract as resumeOverrides.ts's hideActivityNotes. For splitting a side-project's implementation notes out of a mentoring/learning activity into their own `extraActivities` entry. */
  hideActivityNotes?: Record<string, number[]>;
  /** Cert names to exclude from "Education · Certifications" entirely, for this company only - same contract as resumeOverrides.ts's hideCerts. */
  hideCerts?: string[];
  /** Extra "대외활동 · 학습" entries appended after the base list, for this company only - same contract as resumeOverrides.ts's extraActivities, including the optional url that makes the title a clickable link and the optional notes[] for sub-bullets. */
  extraActivities?: { title: string; org: string; year: string; desc: string; url?: string; notes?: string[] }[];
};

export type PortfolioOverride = {
  /** Display name shown in the /portfolio-pdf/dashboard list. */
  company: string;
  backend?: PortfolioVariantOverride;
  platform?: PortfolioVariantOverride;
};

