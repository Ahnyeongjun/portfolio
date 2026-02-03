import Link from "next/link";
import { FlaskConical } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2025 안영준. All rights reserved.
          </p>

          {/* Lab Link */}
          <Link
            href="/lab"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            Lab
          </Link>
        </div>
      </div>
    </footer>
  );
}
