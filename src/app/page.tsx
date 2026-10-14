import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechStackSection } from "@/components/TechStackSection";
import { CareerSection } from "@/components/sections/CareerSection";
import { SideProjectsSection } from "@/components/sections/SideProjectsSection";
import { BackgroundSection } from "@/components/sections/BackgroundSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionNav } from "@/components/SectionNav";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { projects, type Project } from "@/lib/projects";
import { profile } from "@/data/profile";
import { getAllPosts } from "@/lib/blog";

function parsePeriodStart(period: string): number {
  const m = period.match(/(\d{4})\.(\d{2})/);
  return m ? parseInt(m[1]) * 100 + parseInt(m[2]) : 0;
}

// 인프라 프로젝트를 앞에, 그 안에서는 최신순
const isInfra = (p: Project) => (p.category.includes("infra") ? 1 : 0);
const byInfraThenRecent = (a: Project, b: Project) =>
  isInfra(b) - isInfra(a) || parsePeriodStart(b.period) - parsePeriodStart(a.period);

const companyProjects = projects
  .filter((p) => p.type === "company" && !p.hidden)
  .sort(byInfraThenRecent);

const sideProjects = projects
  .filter((p) => (p.type === "team" || p.type === "personal") && !p.hidden)
  .sort(byInfraThenRecent);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "안영준",
  url: "https://www.ahnyoungjun.site",
  jobTitle: "Software & Infrastructure Engineer",
  description: "반복되는 문제를 찾아 시스템으로 바꾸고, 모든 변화를 수치로 증명해 온 엔지니어",
  sameAs: ["https://github.com/Ahnyeongjun"],
  knowsAbout: ["Kubernetes", "Docker", "Cilium", "ArgoCD", "Go", "Python", "Spring Boot"],
};

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 4);
  return (
    <div id="portfolio-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RevealObserver />
      <SectionNav />
      <Header />
      <main style={{ paddingTop: 68 }}>
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <CareerSection projects={companyProjects} company={profile.company} period={profile.period} />
        <SideProjectsSection projects={sideProjects} />
        <BackgroundSection />
        <BlogPreviewSection posts={recentPosts} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
