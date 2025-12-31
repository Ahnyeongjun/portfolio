"use client";

import Link from "next/link";
import { Github } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-semibold text-foreground hover:text-primary transition-colors">
            안영준
          </Link>

          {/* Nav - Right aligned */}
          <nav className="flex items-center gap-6">
            <a
              href="#about"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#experience"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              경력
            </a>
            <a
              href="#tech"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              기술스택
            </a>
            <a
              href="#projects"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              프로젝트
            </a>
            <a
              href="https://github.com/Ahnyeongjun"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
