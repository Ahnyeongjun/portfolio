'use client';

import { TrendingDown, Zap, ShieldCheck, Users } from 'lucide-react';
import { GlassCard } from '@nuguri03/ui';
import type { ComponentType } from 'react';

interface Metric {
  icon: ComponentType<{ className?: string }>;
  before?: string;
  after: string;
  label: string;
  context: string;
}

const metrics: Metric[] = [
  {
    icon: TrendingDown,
    before: '월 10건',
    after: '1건',
    label: '재배포 횟수',
    context: 'MSA 전환',
  },
  {
    icon: Zap,
    before: '4분',
    after: '30초',
    label: '배포 속도',
    context: 'Gateway 일원화',
  },
  {
    icon: ShieldCheck,
    after: '0건',
    label: '이벤트 유실',
    context: 'Outbox 패턴',
  },
  {
    icon: Users,
    after: '10명',
    label: '팀 실사용',
    context: 'FastMCP 에이전트',
  },
];

export function MetricsSection() {
  return (
    <section className="py-12 print:hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <GlassCard key={i} delay={i * 0.08} className="text-center py-6 px-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                <metric.icon className="w-5 h-5 text-primary" />
              </div>
              {metric.before ? (
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className="text-base text-muted-foreground line-through">{metric.before}</span>
                  <span className="text-muted-foreground text-sm">→</span>
                  <span className="text-2xl font-bold text-primary">{metric.after}</span>
                </div>
              ) : (
                <div className="text-2xl font-bold text-primary mb-1">{metric.after}</div>
              )}
              <p className="text-sm font-medium text-foreground">{metric.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{metric.context}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
