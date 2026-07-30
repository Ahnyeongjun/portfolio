// Local-only per-company resume overrides for the 인프라(platform) resume tab.
//
// This file is tracked by git but marked --skip-worktree, so local edits here
// never show up in `git status`/`git diff` and can never be accidentally
// committed or deployed - only this committed empty-default ships publicly.
//
// To use locally: add an entry under COMPANY_OVERRIDES and point
// ACTIVE_COMPANY at its key. Fast Refresh picks up edits without a dev
// server restart. To reset to the public default, set ACTIVE_COMPANY back
// to null (don't delete entries - they're handy to keep around per company).
//
// If this file was never marked skip-worktree on this machine, run:
//   git update-index --skip-worktree src/data/resumeOverrides.ts
// (undo with --no-skip-worktree if you ever need to commit a real change here)

export type ResumeOverride = {
  /** Rendered as its own "00. 지원 동기" section, before "01. 경력". */
  motivation?: string;
  /** Force "01. 경력" to start at the top of the next page. */
  pageBreakBeforeCareer?: boolean;
};

export const ACTIVE_COMPANY: string | null = null;

export const COMPANY_OVERRIDES: Record<string, ResumeOverride> = {};
