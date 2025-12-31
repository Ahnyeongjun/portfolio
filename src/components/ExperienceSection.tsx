"use client";

import { Building2, GraduationCap, Users, Award, Github } from "lucide-react";
import { useGitHubStats } from "@/hooks/useGitHubStats";

const GITHUB_USERNAME = "Ahnyeongjun";

const career = {
  company: "한컴인스페이스",
  position: "연구원",
  period: "2021.07 ~ 현재",
  duration: "5년차",
  description: "위성 영상 처리 플랫폼 및 GIS 웹 서비스 개발",
};

const activities = [
  {
    title: "스위프 (SWYP) 9기 ~ 11기",
    type: "동아리",
    period: "2025.01 ~ 2025.11",
    description: "웹사이트 사이드 프로젝트 참여 (프론트엔드, 백엔드, PM)",
  },
  {
    title: "항해99 백엔드코스 9기",
    type: "교육",
    period: "2025.07 ~ 2025.09",
    description: "Spring Boot (Kotlin), TDD, 동시성 처리, Kafka 학습",
  },
  {
    title: "AI 커리어스쿨",
    type: "교육",
    period: "2024.06 ~ 2024.09",
    description: "데이터 분석법, 파이썬을 이용한 데이터 시각화 학습",
  },
];

const education = [
  {
    school: "한밭대학교",
    major: "융합기술학과",
    period: "2022.03 ~ 졸업예정",
    info: "학점 3.9/4.5 · 야간",
  },
  {
    school: "대덕소프트웨어마이스터고",
    major: "소프트웨어개발과",
    period: "2020.03 ~ 2022.03",
    info: "졸업",
  },
];

const certifications = [
  { year: "2025", title: "SQL개발자(SQLD)" },
  { year: "2025", title: "정보처리기사" },
  { year: "2021", title: "정보기기운용기능사" },
  { year: "2020", title: "정보처리기능사" },
];

export function ExperienceSection() {
  const { totalContributions, loading } = useGitHubStats(GITHUB_USERNAME);

  return (
    <section id="experience" className="py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              경력 & <span className="text-gradient">활동</span>
            </h2>
            <p className="text-muted-foreground">
              회사 경력과 다양한 활동 경험입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Career */}
              <div className="glass rounded-xl p-6 animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">회사 경력</h3>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-semibold text-foreground">{career.company}</span>
                      <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded">{career.duration}</span>
                    </div>
                    <p className="text-muted-foreground">{career.position}</p>
                    <p className="text-sm text-muted-foreground">{career.period}</p>
                    <p className="text-sm text-muted-foreground mt-2">{career.description}</p>
                  </div>
                </div>
              </div>

              {/* Education + Certifications Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Education */}
                <div className="glass rounded-xl p-5 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">학력</h3>
                  </div>
                  <div className="space-y-3">
                    {education.map((edu, index) => (
                      <div key={index}>
                        <p className="font-medium text-foreground text-sm">{edu.school}</p>
                        <p className="text-xs text-muted-foreground">{edu.major}</p>
                        <p className="text-xs text-muted-foreground">{edu.info}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="glass rounded-xl p-5 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-accent" />
                    <h3 className="font-semibold text-foreground">자격증</h3>
                  </div>
                  <div className="space-y-1.5">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">{cert.year}</span>
                        <span className="text-sm text-foreground">{cert.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* GitHub */}
              <div className="glass rounded-xl p-5 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Github className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">GitHub Contributions</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-foreground">
                      {loading ? "..." : `${totalContributions.toLocaleString()}+`}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">commits</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Activities */}
            <div className="glass rounded-xl p-6 animate-fade-in md:h-fit" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2 mb-5">
                <Users className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold text-foreground">활동 & 교육</h3>
              </div>
              <div className="space-y-5">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-5 border-b border-border last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{activity.title}</span>
                        <span className={`px-2 py-0.5 text-xs rounded ${
                          activity.type === "동아리"
                            ? "bg-accent/20 text-accent"
                            : "bg-secondary text-muted-foreground"
                        }`}>
                          {activity.type}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{activity.period}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
