import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollButtons, SectionNav } from "@nuguri03/ui";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { TechStackSection } from "@/components/TechStackSection";
import { CareerSection } from "@/components/sections/CareerSection";
import { SideProjectsSection } from "@/components/sections/SideProjectsSection";
import { projects } from "@/lib/projects";
import { profile } from "@/data/profile";
import { career, activities, education, certifications } from "@/data/experience";

const companyProjects = projects.filter((p) => p.type === "company" && !p.hidden);
const sideProjects = projects.filter((p) => (p.type === "team" || p.type === "personal") && !p.hidden);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "안영준",
  url: "https://www.ahnyoungjun.site",
  jobTitle: "Full-Stack Developer",
  description: "서비스의 지속적인 발전을 고민하는 풀스택 개발자",
  sameAs: ["https://github.com/Ahnyeongjun"],
  knowsAbout: ["Spring Boot", "Next.js", "Kubernetes", "React", "TypeScript", "Go", "Python"],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background" id="portfolio-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <HeroSection role={profile.role} name={profile.name} tagline={profile.tagline} />
        <AboutSection
          name={profile.name}
          initials={profile.initials}
          role={profile.roleFull}
          location={profile.location}
          company={profile.company}
          duration={profile.duration}
          email={profile.email}
          profileImage={profile.profileImage}
          headingLine1={profile.headingLine1}
          headingHighlight={profile.headingHighlight}
          introduction={profile.introduction}
        />
        <ExperienceSection
          career={career}
          activities={activities}
          education={education}
          certifications={certifications}
          githubUsername={profile.github}
          githubProfileUrl={profile.githubUrl}
          bojHandle={profile.boj}
          bojProfileUrl={profile.bojUrl}
        />
        <TechStackSection />
        <CareerSection projects={companyProjects} company={profile.company} period={profile.period} />
        <SideProjectsSection projects={sideProjects} />
      </main>
      <Footer />
      <SectionNav />
      <ScrollButtons />
    </div>
  );
}
