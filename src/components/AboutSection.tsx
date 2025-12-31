"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Calendar,
  Sparkles,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[280px_1fr] gap-12 items-start">
            {/* Profile Card */}
            <div className="glass rounded-2xl p-6 text-center animate-fade-in">
              {/* Avatar */}
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/20 to-accent/20">
                {imgError ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-gradient">AYJ</span>
                  </div>
                ) : (
                  <Image
                    src="/profile.jpg"
                    alt="안영준"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    priority
                    onError={() => setImgError(true)}
                  />
                )}
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
                  <span>5년차 (2021.07~)</span>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
