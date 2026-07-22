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
import { projects } from "@/lib/projects";
import { profile } from "@/data/profile";
import { getAllPosts } from "@/lib/blog";

function parsePeriodStart(period: string): number {
  const m = period.match(/(\d{4})\.(\d{2})/);
  return m ? parseInt(m[1]) * 100 + parseInt(m[2]) : 0;
}

const companyProjects = projects
  .filter((p) => p.type === "company" && !p.hidden)
  .sort((a, b) => parsePeriodStart(b.period) - parsePeriodStart(a.period));

const sideProjects = projects
  .filter((p) => (p.type === "team" || p.type === "personal") && !p.hidden)
  .sort((a, b) => parsePeriodStart(b.period) - parsePeriodStart(a.period));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "안영준",
  url: "https://www.ahnyoungjun.site",
  jobTitle: "Infrastructure Engineer",
  description: "관리형 서비스 없이 베어메탈 K8s 클러스터를 직접 구축·운영하며 수치로 증명해온 인프라 엔지니어",
  sameAs: ["https://github.com/Ahnyeongjun"],
  knowsAbout: ["Kubernetes", "Docker", "Cilium", "ArgoCD", "Go", "Python", "Spring Boot"],
};

export default function Home() {
  const recentPosts = getAllPosts()
    .filter((p) => !p.slug.startsWith('interview-'))
    .slice(0, 4);
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
