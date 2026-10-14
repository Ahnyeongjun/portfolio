import { Metadata } from "next";
import { ResumeDocument } from "@/components/resume/ResumeDocument";
import { COMPANY_OVERRIDES } from "@/data/resumeOverrides";

export const metadata: Metadata = {
  title: "이력서",
  description: "안영준 이력서 - Software & Infrastructure Engineer",
  alternates: {
    canonical: "https://www.ahnyoungjun.site/resume",
  },
};

export default async function ResumePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; company?: string }>;
}) {
  const { tab, company } = await searchParams;
  const override = company ? COMPANY_OVERRIDES[company] : undefined;
  return <ResumeDocument initialTab={tab ?? null} override={override} />;
}
