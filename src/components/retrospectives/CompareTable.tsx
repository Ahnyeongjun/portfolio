import React from 'react';
import { ArrowRight } from 'lucide-react';

export function CompareTable({
  headers,
  rows,
  variant = "list",
}: {
  headers: string[];
  rows: { cells: (string | React.ReactNode)[]; highlight?: boolean; muted?: boolean }[];
  variant?: "list" | "beforeAfter";
}) {
  const beforeIdx = headers.length - 2;
  const afterIdx = headers.length - 1;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-muted/40 border-b border-border">
            {headers.map((h, i) => (
              <th
                key={i}
                className={`px-3 py-2 text-left text-xs font-medium tracking-wide whitespace-nowrap ${
                  variant === "beforeAfter" && i === afterIdx
                    ? "text-primary/80"
                    : "text-muted-foreground/70"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr
              key={i}
              className={
                row.muted
                  ? "opacity-50"
                  : row.highlight
                  ? "bg-primary/5"
                  : "hover:bg-muted/20 transition-colors"
              }
            >
              {row.cells.map((cell, j) => {
                if (variant === "beforeAfter" && !row.muted && j === beforeIdx) {
                  return (
                    <td key={j} className="px-3 py-2 text-muted-foreground line-through decoration-muted-foreground/50">
                      {cell}
                    </td>
                  );
                }
                if (variant === "beforeAfter" && !row.muted && j === afterIdx) {
                  return (
                    <td key={j} className="px-3 py-2 text-primary font-semibold">
                      <span className="inline-flex items-center gap-1.5">
                        <ArrowRight className="w-3.5 h-3.5 text-primary/50 shrink-0" />
                        {cell}
                      </span>
                    </td>
                  );
                }
                return (
                  <td key={j} className={`px-3 py-2 ${row.highlight ? "text-foreground" : "text-muted-foreground"}`}>
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
