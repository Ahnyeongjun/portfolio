import type { CareerInfo, ActivityItem, EducationItem, CertificationItem } from '@/components/sections/ExperienceSection';

export const career: CareerInfo = {
  company: '한컴인스페이스',
  position: '연구원',
  period: '2021.07 ~ 현재',
  duration: '5년차',
  description: '위성 영상 분석 플랫폼 MSA 전환 주도, AI 모델 서빙, 인증 시스템 고도화',
};

export const activities: ActivityItem[] = [
  {
    title: 'FESI 13기 백엔드 멘토링',
    type: '멘토링',
    period: '2026.03 ~ 2026.04',
    description: '프론트엔드 부트캠프에서 백엔드 엔지니어로 참여, 백엔드와의 협업 경험 공유',
  },
  {
    title: '스위프 (SWYP) 웹 9기 ~ 11기, 앱 4기',
    type: '동아리',
    period: '2025.01 ~ 2026.04',
    description: '웹사이트 사이드 프로젝트 참여 (프론트엔드, 백엔드, PM)',
  },
  {
    title: '항해99 백엔드코스 9기',
    type: '교육',
    period: '2025.07 ~ 2025.09',
    description: 'Spring Boot (Kotlin), TDD, 동시성 처리, Kafka 학습',
  },
  {
    title: 'AI 커리어스쿨',
    type: '교육',
    period: '2024.06 ~ 2024.09',
    description: '데이터 분석법, 파이썬을 이용한 데이터 시각화 학습',
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
