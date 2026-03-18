import { Metadata } from "next";
import { ResumeDocument } from "@/components/resume/ResumeDocument";
import { ResumePrintButton } from "@/components/resume/ResumePrintButton";

export const metadata: Metadata = {
  title: "이력서 | 안영준",
  description: "안영준 이력서 — Full-Stack Developer",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 print:bg-white print:p-0">
      {/* Print button — hidden when printing */}
      <div className="flex justify-center mb-6 print:hidden">
        <ResumePrintButton />
      </div>

      {/* A4 document */}
      <ResumeDocument />
    </div>
  );
}
