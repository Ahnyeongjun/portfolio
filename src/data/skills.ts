export interface SkillCategory {
  label: string;
  sub: string;
  items: string[];
}

/** Single source of truth for the tech stack - used by the portfolio section and the résumé. */
export const techStack: SkillCategory[] = [
  { label: 'Infrastructure', sub: 'infra-ops',   items: ['Kubernetes', 'Docker', 'Cilium', 'kube-vip', 'ArgoCD', 'SaltStack', 'Zabbix', 'Nginx', 'Envoy Gateway', 'Keycloak'] },
  { label: 'Observability',  sub: 'monitoring',  items: ['OpenTelemetry', 'Prometheus', 'Grafana'] },
  { label: 'Backend',        sub: 'server-side', items: ['Spring Boot', 'Java', 'FastAPI', 'Python', 'Go'] },
  { label: 'Database',       sub: 'data-layer',  items: ['PostgreSQL', 'Redis', 'RabbitMQ'] },
  { label: 'Frontend',       sub: 'client-side', items: ['Next.js', 'TypeScript', 'Storybook'] },
  { label: 'AI / ML',        sub: 'ai-ml',       items: ['YOLO', 'ConvNeXt', 'SAM', 'DINO', 'ONNX Runtime', 'FastMCP'] },
  { label: 'Geospatial',     sub: 'geo-data',    items: ['CesiumJS', 'GDAL', 'GeoTIFF', 'MBTiles'] },
];
