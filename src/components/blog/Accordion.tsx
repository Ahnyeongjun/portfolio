import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({ title, children, defaultOpen }: AccordionProps) {
  return (
    <details className="pf-accordion" open={defaultOpen}>
      <summary className="pf-accordion-head">
        <span className="pf-accordion-title">{title}</span>
        <ChevronDown size={16} className="pf-accordion-toggle" />
      </summary>
      <div className="pf-accordion-body">{children}</div>
    </details>
  );
}
