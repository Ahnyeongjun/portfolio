'use client';

import { Building2, GraduationCap, Users, Award, Github, Code2 } from 'lucide-react';
import { Section, SectionHeader, GlassCard, StatCard, Tag } from '@nuguri03/ui';
import { useGitHubStats, useBOJStats, getTierName, getTierColor } from '@nuguri03/ui';

export interface CareerInfo {
  company: string;
  position: string;
  period: string;
  duration: string;
  description: string;
}

export interface ActivityItem {
  title: string;
  type: string;
  period: string;
  description: string;
}

export interface EducationItem {
  school: string;
  major: string;
  period: string;
  info: string;
}

export interface CertificationItem {
  year: string;
  title: string;
}

interface ExperienceSectionProps {
  career: CareerInfo;
  activities: ActivityItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  githubUsername: string;
  githubProfileUrl: string;
  bojHandle: string;
  bojProfileUrl: string;
}

export function ExperienceSection({ career, activities, education, certifications, githubUsername, githubProfileUrl, bojHandle, bojProfileUrl }: ExperienceSectionProps) {
  const github = useGitHubStats(githubUsername);
  const boj = useBOJStats(bojHandle);

  return (
    <Section id="experience">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="경력 &" titleHighlight="활동" subtitle="회사 경력과 다양한 활동 경험입니다." />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <GlassCard>
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
                    <Tag variant="primary">{career.duration}</Tag>
                  </div>
                  <p className="text-muted-foreground">{career.position}</p>
                  <p className="text-sm text-muted-foreground">{career.period}</p>
                  <p className="text-sm text-muted-foreground mt-2">{career.description}</p>
                </div>
              </div>
            </GlassCard>

            <div className="grid grid-cols-2 gap-4">
              <GlassCard delay={0.1}>
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">학력</h3>
                </div>
                <div className="space-y-3">
                  {education.map((edu, i) => (
                    <div key={i}>
                      <p className="font-medium text-foreground text-sm">{edu.school}</p>
                      <p className="text-xs text-muted-foreground">{edu.major}</p>
                      <p className="text-xs text-muted-foreground">{edu.info}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
              <GlassCard delay={0.2}>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-foreground">자격증</h3>
                </div>
                <div className="space-y-1.5">
                  {certifications.map((cert, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">{cert.year}</span>
                      <span className="text-sm text-foreground">{cert.title}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>

          <GlassCard delay={0.4} className="md:h-fit">
            <div className="flex items-center gap-2 mb-5">
              <Users className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">활동 & 교육</h3>
            </div>
            <div className="space-y-5">
              {activities.map((activity, i) => (
                <div key={i} className="flex items-start gap-4 pb-5 border-b border-border last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{activity.title}</span>
                      <Tag variant={activity.type === '동아리' ? 'accent' : 'secondary'}>{activity.type}</Tag>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{activity.period}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <StatCard
            icon={<Github className="w-5 h-5 text-primary" />}
            title="GitHub"
            loading={github.loading}
            href={githubProfileUrl}
            delay={0.5}
          >
            <div className="text-center">
              <span className="text-3xl font-bold text-foreground">{github.totalContributions.toLocaleString()}</span>
              <p className="text-sm text-muted-foreground mt-1">contributions</p>
            </div>
          </StatCard>
          <StatCard
            icon={<Code2 className="w-5 h-5 text-primary" />}
            title="BOJ"
            loading={boj.loading}
            href={bojProfileUrl}
            delay={0.55}
          >
            {boj.error ? (
              <div className="text-center text-muted-foreground">불러오기 실패</div>
            ) : (
              <div className="text-center">
                <span className="text-2xl font-bold" style={{ color: getTierColor(boj.tier) }}>{getTierName(boj.tier)}</span>
                <p className="text-sm text-muted-foreground mt-1">{boj.solvedCount}문제 solved</p>
              </div>
            )}
          </StatCard>
        </div>
        <GlassCard delay={0.6} className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Github className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">GitHub Contributions</h3>
          </div>
          <a href={githubProfileUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={`https://ghchart.rshah.org/${githubUsername}`}
              alt="GitHub contribution graph"
              className="w-full rounded opacity-90 hover:opacity-100 transition-opacity"
            />
          </a>
        </GlassCard>
      </div>
    </Section>
  );
}
