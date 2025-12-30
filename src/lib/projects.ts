export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: "live" | "beta" | "development";
  period: string;
  role: string;
  details: string[];
  achievements: string[];
}

export const projects: Project[] = [
  {
    id: "satellite-platform",
    title: "초소형군집위성 플랫폼 (GIS 웹 플랫폼 현대화)",
    description: "K8s 기반 MSA 전환 및 위성 영상 처리 파이프라인 구축",
    tags: ["Kubernetes", "Next.js", "FastAPI", "RabbitMQ"],
    status: "live",
    period: "2024.12 ~ 진행중",
    role: "아키텍처 재설계 및 마이그레이션",
    details: [
      "RabbitMQ 메시지 기반 워커 통신",
      "Saga 패턴으로 장애 시 보상 트랜잭션",
      "Kubernetes 클러스터링 및 레플리카 관리",
      "Nginx Ingress 라우팅 설정",
      "Next.js FSD 구조 재배치 및 Storybook 통합",
      "Spring Boot → FastAPI 마이그레이션",
    ],
    achievements: [
      "DB 폴링 → 이벤트 기반 전환으로 락 대기 시간 제거",
      "팀 내 기술 스택 통일로 협업 효율 증가",
      "FSD 모듈화로 코드 재사용성 증가",
    ],
  },
  {
    id: "image-api",
    title: "위성 영상 타일링 API",
    description: "Go 기반 지리공간 영상 타일링 서버",
    tags: ["Go", "GDAL", "Redis", "GeoTIFF"],
    status: "live",
    period: "2023.12 ~ 2024.12",
    role: "영상 타일링 API 설계 및 개발",
    details: [
      "GDAL 기반 GeoTIFF → PNG/Vector Tile 변환",
      "MBTiles 벡터 타일링으로 줌 레벨/좌표 기반 렌더링",
      "고루틴 병렬 처리 + Redis 캐싱",
      "CPU 코어 × 3 동적 스케일링 (최대 100개 동시 처리)",
      "WMS → WMTS 전환으로 타일 기반 생성 + 캐싱",
    ],
    achievements: [
      "동시 렌더링 영상 수 33배 향상 (30개 → 1,000개+)",
      "영상당 API 요청 500회 → 1회로 감소",
    ],
  },
  {
    id: "gis-platform",
    title: "GIS 레거시 플랫폼",
    description: "3D 지도 뷰어 개발",
    tags: ["Spring Boot", "Redis", "Cesium.js", "PostgreSQL"],
    status: "live",
    period: "2022.12 ~ 2024.12",
    role: "GIS 웹 플랫폼 풀스택 개발",
    details: [
      "Debezium CDC로 변경 데이터 캡처",
      "HTTP 통신 불가 환경에서 JSON 파일 기반 전송 설계",
      "Spring Session + Redis 기반 중앙 집중식 세션 저장소",
      "JWT 기반 인증 및 동시 접속 제어",
      "Cesium.js 기반 3D 지도 뷰어 (CustomProvider 확장)",
    ],
    achievements: [
      "폐쇄망 환경에서 파일 기반 DB 동기화 구현",
      "멀티 모듈 환경 세션 공유 문제 해결",
    ],
  },
  {
    id: "drone-detection",
    title: "드론 실시간 객체 탐지",
    description: "ROS 기반 YOLOv5 객체 탐지 스트리밍 시스템",
    tags: ["ROS", "YOLOv5", "Python", "PyTorch"],
    status: "live",
    period: "2021.12 ~ 2023.12",
    role: "객체 탐지 모델 학습 및 스트리밍 시스템 개발",
    details: [
      "ResNet-FPN 기반 Faster R-CNN 6종 객체 분류",
      "RGB-Depth 동기화로 실시간 스트리밍 안정화",
      "YOLOv5 커스텀 데이터셋 모델 학습",
      "UDP/TCP 소켓 기반 영상 스트리밍",
    ],
    achievements: [
      "드론 탑재 환경에서 실시간 객체 탐지 스트리밍 구현",
      "메모리 최적화 및 안정성 확보",
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
