import { Sparkles, ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen print:min-h-0 print:py-16 flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden print:hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] print:hidden"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            Backend Developer
          </span>
        </div>

        <h1
          className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-foreground">안녕하세요,</span>{" "}
          <br className="md:hidden" />
          <span className="text-gradient">안영준</span>
          <span className="text-foreground">입니다</span>
        </h1>

        <p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          위성 영상 기반 지도 플랫폼을 처음부터 설계·구현하고, 모놀리식에서 MSA로 전환하며 구조적 문제를 주도적으로 개선해온 백엔드 개발자입니다.
        </p>

        <div className="animate-fade-in print:hidden" style={{ animationDelay: "0.3s" }}>
          <a
            href="#about"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span>더 알아보기</span>
            <ArrowDown className="w-4 h-4 animate-float" />
          </a>
        </div>
      </div>
    </section>
  );
}
