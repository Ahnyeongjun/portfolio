import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TechStackSection } from "@/components/TechStackSection";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Footer } from "@/components/Footer";
import { ScrollButtons } from "@/components/ScrollButtons";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "안영준",
  url: "https://www.ahnyoungjun.site",
  jobTitle: "Full-Stack Developer",
  description:
    "서비스의 지속적인 발전을 고민하는 풀스택 개발자",
  sameAs: ["https://github.com/Ahnyeongjun"],
  knowsAbout: [
    "Spring Boot",
    "Next.js",
    "Kubernetes",
    "React",
    "TypeScript",
    "Go",
    "Python",
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <TechStackSection />
        <ProjectsSection />
      </main>
      <Footer />
      <ScrollButtons />
    </div>
  );
}
