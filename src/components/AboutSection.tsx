"use client";

import {
  MapPin,
  Mail,
  Calendar,
  Sparkles,
  GraduationCap,
  Award,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const education = [
  { year: "2022", title: "융합기술학과", school: "한밭대학교 (졸업예정)" },
  { year: "2020", title: "소프트웨어개발과", school: "대덕소프트웨어마이스터고" },
];

const certifications = [
  { year: "2025", title: "SQL개발자(SQLD)" },
  { year: "2025", title: "정보처리기사" },
  { year: "2021", title: "정보기기운용기능사" },
  { year: "2020", title: "정보처리기능사" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[280px_1fr] gap-12 items-start">
            {/* Profile Card */}
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6 text-center animate-fade-in">
                {/* Avatar */}
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gradient">AYJ</span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1">
                  안영준
                </h3>
                <p className="text-sm text-primary font-medium mb-4">
                  Full-Stack Developer
                </p>

                {/* Info */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>서울, Korea</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>한컴인스페이스</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>4+ years experience</span>
                  </div>
                </div>

                {/* Contact Button */}
                <Button
                  className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() =>
                    (window.location.href = "mailto:ahn479512@gmail.com")
                  }
                >
                  <Mail className="w-4 h-4 mr-2" />
                  연락하기
                </Button>
              </div>

              {/* Education & Certifications */}
              <div
                className="glass rounded-xl p-5 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                {/* Education */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      학력
                    </span>
                  </div>
                  <div className="space-y-2">
                    {education.map((edu) => (
                      <div key={edu.title} className="flex items-start gap-3">
                        <span className="text-xs font-mono text-muted-foreground w-10">
                          {edu.year}
                        </span>
                        <div>
                          <p className="text-sm text-foreground">{edu.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {edu.school}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-accent" />
                    <span className="text-sm font-semibold text-foreground">
                      자격증
                    </span>
                  </div>
                  <div className="space-y-2">
                    {certifications.map((cert) => (
                      <div
                        key={cert.title}
                        className="flex items-center gap-3"
                      >
                        <span className="text-xs font-mono text-muted-foreground w-10">
                          {cert.year}
                        </span>
                        <p className="text-sm text-foreground">{cert.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* About Content */}
            <div
              className="animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">About Me</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                서비스의 지속적인 발전을
                <br />
                <span className="text-gradient">고민하는 풀스택 개발자</span>
                <br />
                안영준입니다.
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  하루 수천 건의 위성영상을 처리하는 서비스를 개발하며,
                  직접 만든 시스템을 MSA/K8s 기반으로 현대화하는 작업까지 주도했습니다.
                </p>
                <p>
                  대용량 파이프라인 설계, 폐쇄망 환경 문제 해결 등 특수한 환경에서의
                  경험을 쌓았고, 공통 모듈 설계를 통해 팀 개발 효율을 높이는 데도 기여했습니다.
                </p>
                <p>
                  구현에서 끝내지 않고, 서비스 구조와 개발 생산성까지
                  함께 고민하는 개발자입니다.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">4+</div>
                  <div className="text-sm text-muted-foreground">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">4</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">∞</div>
                  <div className="text-sm text-muted-foreground">Passion</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
