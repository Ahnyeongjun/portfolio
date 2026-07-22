import { Metadata } from "next";
import { PortfolioDocument } from "@/components/portfolio-pdf/PortfolioDocument";

export const metadata: Metadata = {
  title: "포트폴리오 | 안영준",
  description: "안영준 포트폴리오 - Infrastructure Engineer",
  alternates: {
    canonical: "https://www.ahnyoungjun.site/portfolio-pdf",
  },
};

export default function PortfolioPDFPage() {
  return <PortfolioDocument />;
}
