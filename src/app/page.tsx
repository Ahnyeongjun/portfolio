import { LangProvider } from "@/context/lang";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HudFrame } from "@/components/HudFrame";
import { RevealObserver } from "@/components/RevealObserver";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactSection } from "@/components/ImpactSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechStackSection } from "@/components/TechStackSection";
import { CareerSection } from "@/components/sections/CareerSection";
import { SideProjectsSection } from "@/components/sections/SideProjectsSection";
import { BackgroundSection } from "@/components/sections/BackgroundSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { projects } from "@/lib/projects";
import { profile } from "@/data/profile";

const companyProjects = projects.filter((p) => p.type === "company" && !p.hidden);
const sideProjects = projects.filter((p) => (p.type === "team" || p.type === "personal") && !p.hidden);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "안영준",
  url: "https://www.ahnyoungjun.site",
  jobTitle: "Backend Developer",
  description: "운영 중인 서비스의 구조적 한계를 직접 진단하고, 아키텍처 개선으로 수치를 바꿔온 백엔드 개발자",
  sameAs: ["https://github.com/Ahnyeongjun"],
  knowsAbout: ["Spring Boot", "Next.js", "Kubernetes", "React", "TypeScript", "Go", "Python"],
};

export default function Home() {
  return (
    <LangProvider>
    <div id="portfolio-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pf-bg-field" />
      <div className="pf-bg-grid" />
      <HudFrame />
      <RevealObserver />
      <Header />
      <main style={{ paddingTop: 68 }}>
        <HeroSection />
        <ImpactSection />
        <AboutSection />
        <TechStackSection />
        <CareerSection projects={companyProjects} company={profile.company} period={profile.period} />
        <SideProjectsSection projects={sideProjects} />
        <BackgroundSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
    </LangProvider>
  );
}
