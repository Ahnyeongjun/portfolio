export interface ProjectResource {
  label: string;
  url: string;
  type: "image" | "pdf" | "html" | "link";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  link?: string;
  status: "live" | "beta" | "development";
  type: "company" | "personal";
  category: "fullstack" | "backend" | "frontend" | "ai";
  company?: string;
  period: string;
  role: string;
  longDescription?: string;
  details: string[];
  roleDetails?: { role: string; items: string[] }[];
  achievements: string[];
  resources?: ProjectResource[];
}

export const projects: Project[] = [
  {
    id: "chukjibeob",
    title: "축지법",
    description: "전국 축제 정보를 지도와 달력으로 한눈에 보여주는 서비스",
    tags: ["Spring Boot", "Spring Batch", "QueryDSL", "MySQL"],
    imageUrl: "/chukjibeob.webp",
    status: "live",
    type: "personal",
    category: "backend",
    period: "2025.07 ~ 2025.08",
    role: "백엔드",
    longDescription: "스위프(SWYP) 10기에서 진행한 사이드 프로젝트입니다. 주말마다 어디서 무슨 축제가 열리는지 한눈에 알기 어려웠던 문제를 해결하고자 기획했습니다. 전국의 축제 정보를 지도와 달력 위에 펼쳐, 내 주변의 작은 마을 축제부터 대규모 행사까지 관심 있는 테마와 일정에 맞춰 필터링하고 발견할 수 있습니다.",
    details: [],
    roleDetails: [
      {
        role: "백엔드",
        items: [
          "Spring Boot 3 + JPA + QueryDSL 기반 REST API 설계 및 구현",
          "Spring Batch로 공공데이터(Tour API) 축제 정보 자동 수집",
          "지역/테마/일정별 축제 검색 및 필터링 API",
          "달력 뷰 일별 축제 수 통계 API",
          "지도 뷰 좌표 기반 축제 조회 API",
          "Spring Security + JWT + OAuth(카카오) 인증",
          "북마크 및 사용자 활동 로그 기능",
        ],
      },
    ],
    achievements: [
      "공공데이터 API 배치 처리로 축제 데이터 자동화",
      "QueryDSL 동적 쿼리로 복잡한 필터링 조건 처리",
    ],
  },
  {
    id: "with-ing",
    title: "위딩 (With-ing)",
    description: "예비부부를 위한 웨딩 플래너 플랫폼. 웨딩홀, 스튜디오, 드레스, 메이크업 업체 검색 및 AI 기반 체형 분석 드레스 추천 서비스를 제공합니다.",
    tags: ["Next.js", "Spring Boot", "FastAPI", "OpenAI"],
    imageUrl: "/with_ing.webp",
    link: "https://with-ing.vercel.app/main",
    status: "live",
    type: "personal",
    category: "fullstack",
    period: "2024.10 ~ 2024.11",
    role: "PM, 프론트엔드, 백엔드 피드백, AI 추천 기능, 서버 관리",
    longDescription: "스위프(SWYP) 11기에서 진행한 사이드 프로젝트입니다. 예비부부들이 웨딩 준비 과정에서 겪는 정보 탐색의 어려움을 해결하고자 기획했습니다. 웨딩홀, 스튜디오, 드레스샵, 메이크업샵 정보를 한 곳에서 검색하고 비교할 수 있으며, AI가 사용자의 체형을 분석하여 어울리는 드레스를 추천해주는 기능을 제공합니다.",
    details: [],
    roleDetails: [
      {
        role: "PM",
        items: [
          "WBS 일정 관리 및 프로젝트 진행 총괄",
          "IA(정보 구조) 설계",
          "와이어프레임 및 디자인 작업",
        ],
      },
      {
        role: "프론트엔드",
        items: [
          "Claude Code + Figma MCP 활용 퍼블리싱",
          "31개 컴포넌트 구현",
        ],
      },
      {
        role: "백엔드 피드백",
        items: [
          "Spring Boot 3 + JPA 기반 REST API 설계 리뷰",
        ],
      },
      {
        role: "AI 추천 기능",
        items: [
          "FastAPI + OpenAI API 기반 드레스 추천 서버 개발",
          "체형 조합별 프롬프트 설계 및 응답 캐싱 (540가지 조합)",
        ],
      },
      {
        role: "서버 관리",
        items: [
          "Docker Compose + GitHub Actions CI/CD 구축",
          "현재 K8s + Jenkins 기반 MSA 구조로 전환 (도메인별 서비스 분리)",
        ],
      },
    ],
    achievements: [
      "6주 내 MVP 출시 (기획 → 배포)",
      "AI 도구 활용으로 프론트엔드 개발 생산성 향상",
    ],
    resources: [
      { label: "IA 설계", url: "/with_ing_ia.html", type: "html" },
      { label: "디자인 & 와이어프레임", url: "/with_ing_design.png", type: "image" },
    ],
  },
  {
    id: "satellite-platform",
    title: "초소형군집위성 플랫폼 (GIS 웹 플랫폼 현대화)",
    description: "K8s 기반 MSA 전환 및 위성 영상 처리 파이프라인 구축",
    tags: ["Kubernetes", "Next.js", "FastAPI", "RabbitMQ"],
    status: "live",
    type: "company",
    category: "fullstack",
    company: "한컴인스페이스",
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
    title: "위성 영상 타일링 서버",
    description: "Go 기반 지리공간 영상 처리 서버 (동시 렌더링 33배 향상)",
    tags: ["Go", "GDAL", "Redis", "GeoTIFF"],
    status: "live",
    type: "company",
    category: "backend",
    company: "한컴인스페이스",
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
    description: "폐쇄망 DB 동기화 및 3D 지도 뷰어 개발",
    tags: ["Spring Boot", "Redis", "Cesium.js", "PostgreSQL"],
    status: "live",
    type: "company",
    category: "fullstack",
    company: "한컴인스페이스",
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
    type: "company",
    category: "ai",
    company: "한컴인스페이스",
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
