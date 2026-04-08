'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Mail, Calendar, Sparkles, Building2 } from 'lucide-react';
import { Button, GlassCard, Section } from '@nuguri03/ui';

interface AboutSectionProps {
  name: string;
  initials: string;
  role: string;
  location: string;
  company: string;
  duration: string;
  email: string;
  profileImage?: string;
  headingLine1: string;
  headingHighlight: string;
  introduction: readonly string[];
}

export function AboutSection({ name, initials, role, location, company, duration, email, profileImage, headingLine1, headingHighlight, introduction }: AboutSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Section id="about">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-[280px_1fr] gap-12 items-start">
          <GlassCard className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/20 to-accent/20">
              {imgError || !profileImage ? (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-gradient">{initials}</span>
                </div>
              ) : (
                <Image src={profileImage} alt={name} width={128} height={128} className="object-cover w-full h-full" priority onError={() => setImgError(true)} />
              )}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-1">{name}</h3>
            <p className="text-sm text-primary font-medium mb-4">{role}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2"><MapPin className="w-4 h-4" /><span>{location}</span></div>
              <div className="flex items-center justify-center gap-2"><Building2 className="w-4 h-4" /><span>{company}</span></div>
              <div className="flex items-center justify-center gap-2"><Calendar className="w-4 h-4" /><span>{duration}</span></div>
            </div>
            <Button className="w-full mt-6 print:hidden" onClick={() => (window.location.href = `mailto:${email}`)}>
              <Mail className="w-4 h-4 mr-2" />연락하기
            </Button>
            <p className="hidden print:block mt-4 text-sm text-muted-foreground">{email}</p>
          </GlassCard>

          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">About Me</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {headingLine1}
              <br />
              <span className="text-gradient">{headingHighlight}</span>
              <br />
              {name}입니다.
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {introduction.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
