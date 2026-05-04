import type { CareerInfo, ActivityItem, EducationItem, CertificationItem } from '@/components/sections/ExperienceSection';

export const career: CareerInfo = {
  company: '한컴인스페이스',
  position: '연구원',
  period: '2021.07 ~ 현재',
  duration: '5년차',
  description: '구조적 병목을 직접 진단하고 아키텍처 수준에서 해결 — MSA 전환으로 재배포 월 10건→1건, API 응답 4초→0.5초 달성',
};

export const activities: ActivityItem[] = [
  {
    title: 'FESI 13기 백엔드 멘토링',
    type: '멘토링',
    period: '2026.03 ~ 2026.04',
    description: '수강생 6명 대상 백엔드 멘토링 — PR 리뷰, REST API 설계 원칙 지도 및 DDD 기반 도메인 설계를 TDD로 검증하는 실습 진행',
  },
  {
    title: '제4회 블레이버스 MVP 개발 해커톤',
    type: '해커톤',
    period: '2026.01',
    description: '기계공학 3D 학습 플랫폼 SIMVEX 개발 — @react-three/fiber 기반 3D 분해·조립 시뮬레이션 및 SSE 스트리밍 AI 어시스턴트 구현',
  },
  {
    title: '스위프 (SWYP) 웹 9기 ~ 11기, 앱 4기',
    type: '동아리',
    period: '2025.01 ~ 2026.04',
    description: '4개 기수 참여 — 9기 백엔드(모먼티어), 10기 프론트엔드(축지법), 11기 PM·프론트엔드(위딩), 앱 4기 백엔드(Mapin)',
  },
  {
    title: '항해99 백엔드코스 9기',
    type: '교육',
    period: '2025.07 ~ 2025.09',
    description: '상위 10% 수료 — TDD·이벤트 드리븐 설계 첫 경험, k6 부하 테스트로 목표 TPS 달성 검증, 토스 사례로 동기·비동기 아키텍처 비교 분석, 코레오그래피 사가 패턴 학습 및 실습',
  },
  {
    title: 'AI 커리어스쿨',
    type: '교육',
    period: '2024.06 ~ 2024.09',
    description: 'Python 기반 데이터 분석 및 시각화 학습 — 위성 영상 데이터 파이프라인·AI 모델 서빙 업무의 데이터 처리 흐름 이해에 기반이 됨',
  },
];

export const education: EducationItem[] = [
  {
    school: '한밭대학교',
    major: '융합기술학과',
    period: '2022.03 ~ 2026.03',
    info: '졸업 · 야간',
  },
  {
    school: '대덕소프트웨어마이스터고',
    major: '소프트웨어개발과',
    period: '2020.03 ~ 2022.03',
    info: '졸업',
  },
];

export const certifications: CertificationItem[] = [
  { year: '2025', title: 'SQL개발자(SQLD)' },
  { year: '2025', title: '정보처리기사' },
  { year: '2021', title: '정보기기운용기능사' },
  { year: '2020', title: '정보처리기능사' },
];
