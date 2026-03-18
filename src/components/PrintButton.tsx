"use client";

import { useEffect, useRef, useState } from "react";
import { Download, FileText, LayoutTemplate } from "lucide-react";
import Link from "next/link";

export function PrintButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 text-muted-foreground hover:text-primary transition-colors"
        title="다운로드"
      >
        <Download className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-xl glass border border-border/60 shadow-lg py-1.5 z-50">
          <Link
            href="/resume"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <FileText className="w-4 h-4 shrink-0" />
            이력서
          </Link>
          <Link
            href="/portfolio-pdf"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <LayoutTemplate className="w-4 h-4 shrink-0" />
            포트폴리오
          </Link>
        </div>
      )}
    </div>
  );
}
