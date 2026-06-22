import Image from "next/image";
import { profile } from "@/data/profile";
import { projects, type Project } from "@/lib/projects";
import { career, activities, education, certifications } from "@/data/experience";
import { techStack } from "@/data/skills";

/* ── Derived content (synced with the portfolio data) ── */

const summary = profile.introduction[0].replace(/^안녕하세요\.\s*/, "");

const companyProjects = projects.filter((p) => p.type === "company" && !p.hidden);

// Curated backend-focused side projects — a backend résumé should show depth, not every project.
const FEATURED_SIDE_IDS = ["deadline-mate", "concert-reservation", "booksight"];
const sideProjects = FEATURED_SIDE_IDS
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is Project => Boolean(p));

/** Splits "[label] body" into a bold label and the rest. */
function splitLabel(text: string): [string | null, string] {
  const m = text.match(/^\[([^\]]+)\]\s*(.*)$/);
  return m ? [m[1], m[2]] : [null, text];
}

/* ── Sub-components ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-slate-300 pt-6 mt-6">
      <h2 className="text-[15px] font-bold text-slate-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="text-[9.5px] px-2 py-[3px] bg-blue-50 text-blue-600 rounded-md font-medium leading-none">
      {label}
    </span>
  );
}

function AchievementList({ items }: { items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="space-y-1.5 mt-2.5">
      {items.map((a, i) => {
        const [label, rest] = splitLabel(a);
        return (
          <li key={i} className="flex gap-2 text-[10.5px] text-slate-600 leading-relaxed">
            <span className="mt-[5px] shrink-0 w-[4px] h-[4px] rounded-full bg-blue-400" />
            <span>
              {label && <strong className="font-semibold text-slate-800">[{label}] </strong>}
              {rest}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function ProjectBlock({ proj, meta, maxAchievements }: { proj: Project; meta: string; maxAchievements?: number }) {
  const shown = maxAchievements ? proj.achievements.slice(0, maxAchievements) : proj.achievements;
  return (
    <div className="break-inside-avoid">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[12.5px] font-bold text-slate-800">{proj.title}</h3>
        <span className="text-[10.5px] text-slate-400 shrink-0">{proj.period}</span>
      </div>
      <p className="text-[10px] text-slate-400 mt-0.5">{meta}</p>
      <div className="flex flex-wrap gap-1.5 mt-2 mb-2.5">
        {proj.tags.map((t) => <Chip key={t} label={t} />)}
      </div>
      <p className="text-[11px] text-slate-600 leading-relaxed">{proj.description}</p>
      <AchievementList items={shown} />
    </div>
  );
}

/* ── Main Document ── */

export function ResumeDocument() {
  return (
    <article
      className="w-[210mm] mx-auto bg-white text-slate-800 shadow-xl print:shadow-none print:w-full print:mx-0 px-[18mm] py-[16mm] print:px-[14mm] print:py-[12mm]"
      style={{ fontFamily: "'Pretendard', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* ── Header ── */}
      <header className="flex justify-between items-start gap-8 pb-9">
        <div className="flex-1 min-w-0">
          <h1 className="text-[30px] font-extrabold tracking-tight text-slate-900 leading-none">{profile.name}</h1>
          <p className="text-[13.5px] font-semibold text-slate-500 mt-2.5">{profile.roleFull} · {career.duration}</p>
          <p className="text-[11px] text-slate-500 leading-[1.7] mt-4 max-w-[145mm]">{summary}</p>
        </div>
        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className="w-[80px] h-[80px] rounded-full overflow-hidden border border-slate-200">
            <Image src={profile.profileImage} alt={profile.name} width={80} height={80} className="object-cover w-full h-full" />
          </div>
          <div className="text-right text-[10.5px] text-slate-500 space-y-0.5 leading-snug">
            <p>{profile.email}</p>
            <a href={profile.githubUrl} className="block text-blue-600">{profile.github}</a>
            <p>{profile.location}</p>
          </div>
        </div>
      </header>

      {/* ── 경력 ── */}
      <Section title="경력">
        <div className="flex items-baseline justify-between">
          <span className="text-[14px] font-bold text-slate-900">{career.company}</span>
          <span className="text-[10.5px] text-slate-400">{career.period} · {career.duration}</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 mb-6 leading-relaxed">
          {career.position} — {career.description}
        </p>
        <div className="space-y-6">
          {companyProjects.map((proj) => (
            <ProjectBlock key={proj.id} proj={proj} meta={proj.role} maxAchievements={3} />
          ))}
        </div>
      </Section>

      {/* ── 사이드 프로젝트 ── */}
      <Section title="사이드 프로젝트">
        <div className="space-y-6">
          {sideProjects.map((proj) => (
            <ProjectBlock key={proj.id} proj={proj} meta={`${proj.role}${proj.company ? ` · ${proj.company}` : ""}`} maxAchievements={2} />
          ))}
        </div>
      </Section>

      {/* ── 기술 스택 ── */}
      <Section title="기술 스택">
        <div className="space-y-3">
          {techStack.map((cat) => (
            <div key={cat.label} className="flex gap-4">
              <span className="text-[11px] font-semibold text-slate-500 w-[96px] shrink-0 pt-[3px]">{cat.label}</span>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((i) => <Chip key={i} label={i} />)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 교육 ── */}
      <Section title="교육">
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.school}>
              <p className="text-[12.5px] font-bold text-slate-800">{edu.school}</p>
              <p className="text-[10.5px] text-slate-500 mt-0.5">{edu.major} · {edu.period} · {edu.info}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 자격증 ── */}
      <Section title="자격증">
        <div className="space-y-2">
          {certifications.map((cert) => (
            <div key={cert.title} className="flex items-baseline gap-3">
              <span className="text-[10.5px] text-slate-400 w-10 shrink-0">{cert.year}</span>
              <span className="text-[11.5px] text-slate-700 font-medium">{cert.title}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 활동 · 교육 ── */}
      <Section title="활동 · 교육">
        <div className="space-y-3.5">
          {activities.map((act) => (
            <div key={act.title} className="break-inside-avoid">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[11.5px] font-semibold text-slate-800">{act.title}</span>
                <span className="text-[10.5px] text-slate-400 shrink-0">{act.period}</span>
              </div>
              <p className="text-[10.5px] text-slate-500 mt-0.5 leading-relaxed">{act.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <p className="text-center text-[9px] text-slate-300 mt-8">{profile.name} · {profile.email}</p>
    </article>
  );
}
