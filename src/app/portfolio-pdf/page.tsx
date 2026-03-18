import { Metadata } from "next";
import { PortfolioDocument } from "@/components/portfolio-pdf/PortfolioDocument";
import { ResumePrintButton } from "@/components/resume/ResumePrintButton";

export const metadata: Metadata = {
  title: "포트폴리오 | 안영준",
  description: "안영준 포트폴리오 — Full-Stack Developer",
};

export default function PortfolioPDFPage() {
  return (
    <div className="min-h-screen bg-gray-200 py-8 print:bg-white print:p-0">
      <div className="flex justify-center mb-6 print:hidden">
        <ResumePrintButton />
      </div>
      <PortfolioDocument />
    </div>
  );
}
