'use client';

import { Server, Code2, Database, Cloud } from 'lucide-react';
import { Section, SectionHeader, GlassCard, Tag } from '@nuguri03/ui';
import type { ComponentType } from 'react';

interface TechCategory {
  icon: ComponentType<{ className?: string }>;
  title: string;
  skills: string[];
}

const techCategories: TechCategory[] = [
  { icon: Server, title: 'Backend', skills: ['Spring Boot', 'Java', 'JPA', 'QueryDSL', 'Spring Batch', 'Kotlin', 'FastAPI', 'Go', 'Python'] },
  { icon: Code2, title: 'Frontend', skills: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Cesium.js'] },
  { icon: Database, title: 'Database', skills: ['MySQL', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Kafka'] },
  { icon: Cloud, title: 'DevOps', skills: ['Kubernetes', 'Docker', 'AWS', 'NCP', 'Jenkins', 'GitHub Actions', 'OpenSearch', 'Fluent-bit'] },
  { icon: Server, title: 'ML / AI', skills: ['PyTorch', 'ONNX Runtime', 'OpenCV', 'ROS', 'YOLOv26', 'CUDA'] },
  { icon: Database, title: 'Geospatial', skills: ['GDAL', 'PostGIS', 'rasterio', 'Salt-Stack'] },
];

export function TechStackSection() {
  return (
    <Section id="tech">
      <SectionHeader
        title="기술"
        titleHighlight="스택"
        subtitle="백엔드 아키텍처 설계부터 인프라 운영, AI 에이전트 개발까지"
        className="mb-16"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {techCategories.map((category, index) => (
          <GlassCard key={category.title} delay={index * 0.1} className="hover-lift">
            <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
              <category.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <Tag key={skill} variant="mono">{skill}</Tag>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
