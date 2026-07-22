import { Metadata } from "next";
import { ResumeDocument } from "@/components/resume/ResumeDocument";

export const metadata: Metadata = {
  title: "이력서 | 안영준",
  description: "안영준 이력서 - Infrastructure Engineer",
};

export default function ResumePage() {
  return <ResumeDocument />;
}
