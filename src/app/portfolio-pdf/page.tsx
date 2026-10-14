import { Metadata } from "next";
import { PortfolioDocument } from "@/components/portfolio-pdf/PortfolioDocument";
import { PORTFOLIO_COMPANY_OVERRIDES } from "@/data/portfolioOverrides";

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "안영준 포트폴리오 - Software & Infrastructure Engineer",
  alternates: {
    canonical: "https://www.ahnyoungjun.site/portfolio-pdf",
  },
};

export default async function PortfolioPDFPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; company?: string }>;
}) {
  const { tab, company } = await searchParams;
  const override = company ? PORTFOLIO_COMPANY_OVERRIDES[company] : undefined;
  return <PortfolioDocument initialTab={tab ?? null} override={override} />;
}
