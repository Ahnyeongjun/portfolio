"use client";

import { Download } from "lucide-react";

export function ResumePrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors shadow"
    >
      <Download className="w-4 h-4" />
      PDF로 저장
    </button>
  );
}
