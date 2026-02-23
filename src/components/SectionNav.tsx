"use client";

import { useState, useEffect } from "react";

const sections = [
  { id: "about", label: "소개" },
  { id: "experience", label: "경력" },
  { id: "tech", label: "기술스택" },
  { id: "career", label: "회사 프로젝트" },
  { id: "side-projects", label: "사이드 프로젝트" },
];

export function SectionNav() {
  const [activeId, setActiveId] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);

      const offsets = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { id: s.id, top: rect.top };
        })
        .filter(Boolean) as { id: string; top: number }[];

      // Find the section closest to viewport top (with 200px offset)
      let current = "";
      for (const s of offsets) {
        if (s.top <= 200) {
          current = s.id;
        }
      }
      if (current) setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => {
            const el = document.getElementById(section.id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="group relative flex items-center justify-end gap-2"
          aria-label={section.label}
        >
          <span className="pointer-events-none text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-card/80 backdrop-blur px-2 py-0.5 rounded border border-border">
            {section.label}
          </span>
          <span
            className={`w-2.5 h-2.5 rounded-full border-2 transition-all shrink-0 ${
              activeId === section.id
                ? "bg-primary border-primary scale-125"
                : "bg-transparent border-muted-foreground/40 group-hover:border-primary"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
