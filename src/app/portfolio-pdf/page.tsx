import { Metadata } from "next";
import { PortfolioDocument } from "@/components/portfolio-pdf/PortfolioDocument";

export const metadata: Metadata = {
  title: "포트폴리오 | 안영준",
  description: "안영준 포트폴리오 - Backend Engineer",
};

export default function PortfolioPDFPage() {
  return <PortfolioDocument />;
}
