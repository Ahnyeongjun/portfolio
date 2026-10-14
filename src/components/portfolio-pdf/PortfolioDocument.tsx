"use client";

import React, { Fragment, useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SHOW_VARIANT_TABS } from "@/lib/docVariants";
import { PROFILE, PROFILE_PLATFORM, type DocProject, type CareerGroup, type CareerItem } from "@/data/profileDoc";
import type { PortfolioOverride } from "@/data/portfolioOverrides";

/** 인프라/풀스택 두 버전. /resume 과 동일한 탭 구조 (기본 = 인프라). */
const VARIANTS = {
  platform: { label: "인프라", roleEn: "Infrastructure Engineer", data: PROFILE_PLATFORM },
  backend: { label: "풀스택", roleEn: "Backend Engineer", data: PROFILE },
} as const;
type Variant = keyof typeof VARIANTS;

const TAB_PARAM: Record<Variant, string> = { backend: "fullstack", platform: "infra" };

function variantFromTab(tab: string | null | undefined): Variant {
  if (!SHOW_VARIANT_TABS) return "platform"; // 공개본은 인프라 한 가지
  if (tab === "fullstack") return "backend";
  if (tab === "infra") return "platform";
  return "platform"; // 파라미터 없음/미인식 값 - 기본 탭(인프라) 유지
}

// 글만으로는 이해가 어려운 극소수 블록 전용 박스형 전후 다이어그램 (CSS로만 그림, 이미지 파일 아님).
function BlockDiagram({ kind }: { kind: "cdc-outbox" | "war-session" | "rabbitmq-queue" | "cluster-ha" | "nvme-trace" | "query-tuning" | "otel-observability" | "jenkins-argocd" | "gpu-share" | "k6-ci" | "docker-cache" | "ai-agent-mcp" | "ai-agent-mcp-playwright" | "rolling-update" | "claude-workflow-pipeline" | "db-api-centralize" | "provisioning-ansible" | "msa-boundary" | "wedding-cache" | "terraform-ansible-aws" | "health-index" }) {
  if (kind === "health-index") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-fan">
            <div className="b-fan-col">
              <span className="b-box">복약 기록</span>
              <span className="b-box">증상 기록</span>
              <span className="b-box">환경 API 3종<span className="b-box-sub">기상청·에어코리아·DUR</span></span>
            </div>
            <span className="b-diagram-note">⚠ 각각 분리되어 있고, 외부 API는 매 요청마다 직접 호출 - 캐싱 없음</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">외부 API 3종<span className="b-box-sub">스케줄러 주기 수집</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">3계층 캐시</span>
            <span className="b-arrow">→</span>
            <span className="b-box">5개 도메인 가중합</span>
            <span className="b-arrow">→</span>
            <span className="b-box">Health Index<span className="b-box-sub">0~100</span></span>
            <span className="b-diagram-note">호출 비용·응답 지연 감소, 흩어진 기록을 단일 신호로 통합</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "terraform-ansible-aws") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-diagram-flow">
            <span className="b-box">AWS 콘솔 수동 구성<span className="b-box-sub">EC2·보안그룹·NLB 클릭 설정</span></span>
            <span className="b-diagram-note">⚠ 콘솔 조작은 코드로 남지 않음 - 재현·재구축 불가</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">Terraform<span className="b-box-sub">EC2·네트워크·보안그룹 선언</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">Ansible<span className="b-box-sub">패키지·Nginx 설정</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">EC2 + Nginx 게이트웨이</span>
          </div>
          <div className="b-diagram-flow">
            <span className="b-box">apply</span>
            <span className="b-arrow">→</span>
            <span className="b-box">운영</span>
            <span className="b-arrow">→</span>
            <span className="b-box">destroy</span>
            <span className="b-arrow">→</span>
            <span className="b-box">apply</span>
            <span className="b-arrow">→</span>
            <span className="b-box">동일 상태 확인</span>
            <span className="b-diagram-note">클러스터 파기 후 코드만으로 재구축 - 형상 관리 상태가 실제로 재현됨을 검증</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "msa-boundary") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-fan">
            <div className="b-fan-col">
              <span className="b-box">기관 A 납품<span className="b-box-sub">모놀리식</span></span>
              <span className="b-box">기관 B 납품<span className="b-box-sub">모놀리식</span></span>
              <span className="b-box">기관 C 납품<span className="b-box-sub">모놀리식</span></span>
            </div>
            <span className="b-diagram-note">⚠ 핵심 기능(AI 학습·추론·가시화)이 납품마다 중복 구현 - 기능 하나 배포에도 전체 재시작</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">Envoy Gateway<span className="b-box-sub">경로별 라우팅</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">공통 9개 서비스<span className="b-box-sub">FastAPI 통일 · 버전 공유</span></span>
            <span className="b-arrow">←</span>
            <span className="b-box">기관별 부가 서비스<span className="b-box-sub">표적·PPT·로깅·인증만 교체</span></span>
            <span className="b-diagram-note">모듈 수정 1/5 · 신규 구축 6개월→1개월 · 재배포 월 10건→1건</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "wedding-cache") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-diagram-flow">
            <span className="b-box">체형·스타일 입력</span>
            <span className="b-arrow">→</span>
            <span className="b-box">GPT 추천</span>
            <span className="b-arrow">→</span>
            <span className="b-box">DALL-E 이미지 생성</span>
            <span className="b-diagram-note">⚠ 같은 조합도 매번 재호출 - 비용 선형 증가</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">체형·스타일 입력</span>
            <span className="b-arrow">→</span>
            <span className="b-box">SHA256 캐시 조회<span className="b-box-sub">540개 조합</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">hit: 즉시 응답<span className="b-box-sub">miss: GPT·DALL-E 호출 후 캐싱</span></span>
            <span className="b-diagram-note">재요청 시 GPT·DALL-E 재호출 없음</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "provisioning-ansible") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-diagram-flow">
            <span className="b-box">기관별 수작업 절차<span className="b-box-sub">문서 의존</span></span>
            <span className="b-diagram-note">⚠ 담당자·기관마다 설정이 미묘하게 달라짐 - 재현 검증 불가</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">셸 스크립트<span className="b-box-sub">최소 표준화</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">Ansible 플레이북<span className="b-box-sub">멱등성·코드 리뷰 가능</span></span>
            <span className="b-diagram-note">클러스터 구축 1~2일→2~3시간, 신규 노드 추가 시 설정 편차 제거</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "claude-workflow-pipeline") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-diagram-flow">
            <span className="b-box">작업 시작</span>
            <span className="b-arrow">→</span>
            <span className="b-box">개발자가 직접<span className="b-box-sub">맥락 파악·계획 수립·브랜치 생성·완료 후 자체 점검</span></span>
            <span className="b-diagram-note">⚠ 개인별 상이한 방식 - 표준화된 워크플로우 없음</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">Jira 티켓</span>
            <span className="b-arrow">→</span>
            <span className="b-box">브랜치 자동 생성<span className="b-box-sub">Jira·Bitbucket 연동</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">Claude Code<span className="b-box-sub">+ CLAUDE.md</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">스킬<span className="b-box-sub">계획 수립</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">작업</span>
            <span className="b-arrow">→</span>
            <span className="b-box">훅<span className="b-box-sub">완료 평가</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">PR</span>
            <span className="b-diagram-note">팀 전체 워크플로우로 정착 - 브랜치 누락 없이 자동 생성</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "ai-agent-mcp") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-fan">
            <span className="b-box">개발자</span>
            <div className="b-fan-arrows"><span>↗</span><span>→</span><span>↘</span></div>
            <div className="b-fan-col">
              <span className="b-box">Git</span>
              <span className="b-box">Jira·캘린더</span>
              <span className="b-box">HRWeb</span>
              <span className="b-box">구글드라이브</span>
            </div>
            <span className="b-diagram-note">⚠ 도구마다 개별 인터페이스·인증 - 컨텍스트 전환 비용</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">개발자<span className="b-box-sub">자연어 명령</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">Claude Code<span className="b-box-sub">CLAUDE.md·스킬·훅</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">MCP 서버</span>
            <span className="b-arrow">→</span>
            <div className="b-fan-col">
              <span className="b-box">Git</span>
              <span className="b-box">Jira·캘린더</span>
              <span className="b-box">HRWeb</span>
              <span className="b-box">구글드라이브</span>
            </div>
            <span className="b-diagram-note">하나의 인터페이스로 통합 조회·실행, 팀 전체가 쓰는 워크플로우로 정착</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "ai-agent-mcp-playwright") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-fan">
            <span className="b-box">개발자</span>
            <div className="b-fan-arrows"><span>↗</span><span>→</span><span>↘</span></div>
            <div className="b-fan-col">
              <span className="b-box">Git</span>
              <span className="b-box">Jira·캘린더</span>
              <span className="b-box">HRWeb<span className="b-box-sub">API 없음</span></span>
              <span className="b-box">구글드라이브</span>
            </div>
            <span className="b-diagram-note">⚠ 도구마다 개별 인터페이스·인증 - 컨텍스트 전환 비용</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">개발자<span className="b-box-sub">자연어 명령</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">Claude Code<span className="b-box-sub">CLAUDE.md·스킬·훅</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">MCP 서버<span className="b-box-sub">8개 도구</span></span>
            <span className="b-arrow">→</span>
            <div className="b-fan-col">
              <span className="b-box">Git</span>
              <span className="b-box">Jira·캘린더</span>
              <span className="b-box">HRWeb<span className="b-box-sub">Playwright 브라우저 조작</span></span>
              <span className="b-box">구글드라이브</span>
            </div>
            <span className="b-diagram-note">하나의 인터페이스로 통합 조회·실행, 팀 전체가 쓰는 워크플로우로 정착</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "gpu-share") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-diagram-flow">
            <span className="b-box">컨테이너 1개<span className="b-box-sub">파드당 GPU 통째로 점유</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">GPU 1장</span>
            <span className="b-diagram-note">⚠ 대부분 유휴 상태 - GPU 3장 노는 시간 多</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-fan">
            <div className="b-fan-col">
              <span className="b-box">파드 1</span>
              <span className="b-box">파드 2</span>
              <span className="b-box">파드 N<span className="b-box-sub">~70개</span></span>
            </div>
            <div className="b-fan-arrows"><span>↘</span><span>→</span><span>↗</span></div>
            <span className="b-box">GPU 4장<span className="b-box-sub">Aliyun GPUShare · fraction 단위</span></span>
            <span className="b-diagram-note">GPU 4장으로 최대 70파드 동시 추론</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "k6-ci") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-diagram-flow">
            <span className="b-box">커밋</span>
            <span className="b-arrow">→</span>
            <span className="b-box">Jenkins 빌드</span>
            <span className="b-arrow">→</span>
            <span className="b-box">배포</span>
            <span className="b-arrow">→</span>
            <span className="b-box">운영 트래픽<span className="b-box-sub">테스트 없음</span></span>
            <span className="b-diagram-note">⚠ 부하 상황 결함이 배포 후에야 발견 - 에러율 11.22%</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">커밋</span>
            <span className="b-arrow">→</span>
            <span className="b-box">Jenkins CI<span className="b-box-sub">유닛테스트 + k6 부하테스트</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">배포 전 검출</span>
            <span className="b-arrow">→</span>
            <span className="b-box">배포</span>
            <span className="b-diagram-note">에러율 11.22%→0%, 392→1,177 req/s</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "db-api-centralize") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-diagram-flow">
            <span className="b-box">서비스 1~7<span className="b-box-sub">카탈로깅·작업 관리·가시화 등</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">각자 ORM</span>
            <span className="b-arrow">→</span>
            <span className="b-box">DB</span>
            <span className="b-diagram-note">⚠ 스키마 변경 시 7곳 동시 수정, 언어별 접근 패턴도 어긋남</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">서비스 1~7</span>
            <span className="b-arrow">→</span>
            <span className="b-box">HTTP</span>
            <span className="b-arrow">→</span>
            <span className="b-box">Go DB-API</span>
            <span className="b-arrow">→</span>
            <span className="b-box">DB</span>
            <span className="b-diagram-note">스키마 변경 영향이 API 레이어 한 곳으로 축소</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "docker-cache") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-diagram-flow">
            <span className="b-box">FROM base</span>
            <span className="b-arrow">→</span>
            <span className="b-box">COPY . /app<span className="b-box-sub">소스 - 자주 바뀜</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">RUN pip/apt install<span className="b-box-sub">무거운 의존성</span></span>
            <span className="b-diagram-note">⚠ 소스 한 줄만 바뀌어도 캐시 무효화 - 매번 외부망에서 재설치</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">FROM base</span>
            <span className="b-arrow">→</span>
            <span className="b-box">RUN pip/apt install<span className="b-box-sub">Nexus proxy 캐싱</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">COPY . /app<span className="b-box-sub">소스 - 맨 뒤로 이동</span></span>
            <span className="b-diagram-note">소스 변경 시 의존성 레이어는 캐시 재사용, 다운로드는 사내망에서 처리</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "rolling-update") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-diagram-flow">
            <span className="b-box">Control-Plane<span className="b-box-sub">단일 노드 · HA 없음</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">Worker 1~5<span className="b-box-sub">kubeadm 베어메탈 · 에어갭</span></span>
            <span className="b-diagram-note">⚠ 이미지 교체 시 서비스 중단 없이 배포할 방법 필요</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">① cordon</span>
            <span className="b-arrow">→</span>
            <span className="b-box">② drain</span>
            <span className="b-arrow">→</span>
            <span className="b-box">③ 이미지 교체·재기동</span>
            <span className="b-arrow">→</span>
            <span className="b-box">④ 정상 확인</span>
            <span className="b-arrow">→</span>
            <span className="b-box">⑤ 다음 노드</span>
            <span className="b-diagram-note">쉘 스크립트 기반 노드별 순차 롤링 - 5대 규모에 맞춰 서비스 중단 없이 반복</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "jenkins-argocd") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-diagram-flow">
            <span className="b-box">Bitbucket 커밋</span>
            <span className="b-arrow">→</span>
            <span className="b-box">Jenkins<span className="b-box-sub">명령형 스크립트</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">클러스터 직접 apply</span>
            <span className="b-diagram-note">⚠ 배포 이력·롤백 추적 불가, 선언 상태 ≠ 실제 상태 확인 못 함</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">Bitbucket 커밋</span>
            <span className="b-arrow">→</span>
            <span className="b-box">Argo Events<span className="b-box-sub">webhook</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">Argo Workflows<span className="b-box-sub">빌드·테스트</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">Pulp<span className="b-box-sub">아티팩트 통합</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">Git 매니페스트</span>
            <span className="b-arrow">→</span>
            <span className="b-box">ArgoCD<span className="b-box-sub">Git ↔ 클러스터 동기화</span></span>
            <span className="b-diagram-note">드리프트 확인·롤백 가능</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "otel-observability") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-diagram-flow">
            <span className="b-box">서비스 A</span>
            <span className="b-box">서비스 B</span>
            <span className="b-box">서비스 C<span className="b-box-sub">… 9개</span></span>
            <span className="b-diagram-note">⚠ 각자 로그만 남김 - 수동 대조, 원인 분석 4시간</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">9개 서비스<span className="b-box-sub">OTel 계측</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">OTel Collector</span>
            <span className="b-arrow">→</span>
            <span className="b-box">Prometheus·Tempo·OpenSearch<span className="b-box-sub">메트릭·트레이스·로그</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">Grafana<span className="b-box-sub">단일 대시보드</span></span>
            <span className="b-diagram-note">trace_id로 요청 흐름 추적, 원인 분석 20분</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "query-tuning") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-diagram-flow">
            <span className="b-box">요청</span>
            <span className="b-arrow">→</span>
            <span className="b-box">테이블 A·B·C<span className="b-box-sub">개별 트랜잭션</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">PostGIS 전수 연산<span className="b-box-sub">조건 무관 전 행 스캔</span></span>
            <span className="b-diagram-note">⚠ 38초, HikariCP 커넥션 중복 점유</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">요청</span>
            <span className="b-arrow">→</span>
            <span className="b-box">Redis 캐시<span className="b-box-sub">hit 시 즉시 응답</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">조건 판정</span>
            <span className="b-arrow">→</span>
            <span className="b-box">단일 트랜잭션<span className="b-box-sub">인덱스 조회 + 조건부 공간 연산</span></span>
            <span className="b-diagram-note">159ms (239배) · 392→1,177 req/s</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "rabbitmq-queue") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-fan">
            <div className="b-fan-col">
              <span className="b-box">워커 1</span>
              <span className="b-box">워커 2</span>
              <span className="b-box">워커 N</span>
            </div>
            <div className="b-fan-arrows"><span>↘</span><span>→</span><span>↗</span></div>
            <span className="b-box">SaltStack 폴링<span className="b-box-sub">job 상태 전이</span></span>
            <span className="b-diagram-note">⚠ 프로세스 죽으면 job 진행 상태에 무한 고착</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">수집 큐</span>
            <span className="b-arrow">→</span>
            <span className="b-box">전처리 큐</span>
            <span className="b-arrow">→</span>
            <span className="b-box">추론 큐</span>
            <span className="b-arrow">→</span>
            <span className="b-box">후처리 큐<span className="b-box-sub">ack/nack+DLQ</span></span>
            <span className="b-diagram-note">워커 1→15개, 단계별 독립 확장</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "cluster-ha") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-diagram-flow">
            <span className="b-box">control-plane<span className="b-box-sub">단일 노드</span></span>
            <span className="b-diagram-note">⚠ SPOF - 장애 시 API 서버 전체 중단</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">Node 1</span>
            <span className="b-box">Node 2</span>
            <span className="b-box">Node 3</span>
            <span className="b-arrow">→</span>
            <span className="b-box">kube-vip<span className="b-box-sub">VIP</span></span>
            <span className="b-diagram-note">노드 장애에도 API 서버 무중단</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "nvme-trace") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-diagram-flow">
            <span className="b-box">로그: No space left on device</span>
            <span className="b-diagram-note">⚠ 마운트 용량은 여유 있음 - 표면 에러만으론 원인 불명</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <span className="b-box">컨테이너</span>
            <span className="b-arrow">→</span>
            <span className="b-box">마운트</span>
            <span className="b-arrow">→</span>
            <span className="b-box">디바이스</span>
            <span className="b-arrow">→</span>
            <span className="b-box">펌웨어<span className="b-box-sub">이관 로직 누락 발견</span></span>
            <span className="b-diagram-note">원인 분석 하루 이상 → 수 시간</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "cdc-outbox") {
    return (
      <div className="b-diagram">
        <div className="b-diagram-row asis">
          <span className="b-diagram-k">AS-IS</span>
          <div className="b-diagram-flow">
            <div className="b-group">
              <span className="b-group-tag">트랜잭션 경계</span>
              <span className="b-box">App</span>
              <span className="b-arrow">→</span>
              <span className="b-box">CRUD DB</span>
            </div>
            <span className="b-arrow">⇢</span>
            <span className="b-box">Debezium CDC<span className="b-box-sub">별도 프로세스</span></span>
            <span className="b-arrow">→</span>
            <span className="b-box">파일 export</span>
            <span className="b-diagram-note">⚠ slot 파손 시 유실</span>
          </div>
        </div>
        <div className="b-diagram-row tobe">
          <span className="b-diagram-k">TO-BE</span>
          <div className="b-diagram-flow">
            <div className="b-group">
              <span className="b-group-tag">트랜잭션 경계</span>
              <span className="b-box">App</span>
              <span className="b-arrow">→</span>
              <span className="b-box">CRUD DB<span className="b-box-sub">+ Outbox 테이블</span></span>
            </div>
            <span className="b-arrow">→</span>
            <span className="b-box">Outbox 폴러</span>
            <span className="b-arrow">→</span>
            <span className="b-box">파일 export</span>
            <span className="b-diagram-note">유실 0건</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="b-diagram">
      <div className="b-diagram-row asis">
        <span className="b-diagram-k">AS-IS</span>
        <div className="b-diagram-flow">
          <span className="b-box">WAR-1<span className="b-box-sub">로컬 세션</span></span>
          <span className="b-box">WAR-2<span className="b-box-sub">로컬 세션</span></span>
          <span className="b-box">WAR-3<span className="b-box-sub">로컬 세션</span></span>
          <span className="b-diagram-note">✕ 서로 연결 없음 → 재로그인 필요</span>
        </div>
      </div>
      <div className="b-diagram-row tobe">
        <span className="b-diagram-k">TO-BE</span>
        <div className="b-fan">
          <div className="b-fan-col">
            <span className="b-box">WAR-1</span>
            <span className="b-box">WAR-2</span>
            <span className="b-box">WAR-3</span>
          </div>
          <div className="b-fan-arrows"><span>↘</span><span>→</span><span>↗</span></div>
          <span className="b-box">Redis<span className="b-box-sub">공유 세션 저장소</span></span>
        </div>
      </div>
    </div>
  );
}

type DocActivity = { title: string; org: string; year: string; desc: string; notes: string[] };
type DocCareer = { company: string; position: string; period: string; overview: string; groups: CareerGroup[] };

/* Wanted-style portfolio document. CSS ported verbatim from wanted-doc.css. */
const CSS = `
.wanted-root { --ink:#1a1a1e; --ink-2:#4a4f57; --ink-3:#8b9099; --line:#e9ebee; --line-2:#f2f3f5; --bg-soft:#f6f7f9; --accent:#3366ff; --accent-soft:#eaf0ff; --tobe:#8b9099; --tobe-soft:#f2f3f5; --asis:#9298a2; --asis-soft:#f1f3f5; --font-sans:"Pretendard",-apple-system,BlinkMacSystemFont,system-ui,"Apple SD Gothic Neo",sans-serif; --font-mono:"JetBrains Mono",ui-monospace,"SFMono-Regular",monospace; }
.wanted-root { background:#dde1e6; color:var(--ink); font-family:var(--font-sans); line-height:1.56; letter-spacing:-0.012em; word-break:keep-all; -webkit-font-smoothing:antialiased; min-height:100vh; padding:1px 0; }
.wanted-root * { box-sizing:border-box; margin:0; padding:0; }
.wanted-root a { color:inherit; text-decoration:none; }
.wanted-root mark { background:#eef1f6; color:var(--ink); font-weight:700; padding:1px 5px; border-radius:4px; box-shadow:inset 0 -2px 0 rgba(51,102,255,0.35); }
.wanted-root .sheet { width:210mm; min-height:297mm; background:#fff; margin:22px auto; position:relative; box-shadow:0 1px 2px rgba(20,22,28,0.05),0 18px 50px rgba(20,22,28,0.12); }
.wanted-root .sheet-inner { padding:22mm 20mm 24mm; }
.wanted-root .pg-spacer { background:#fff; }
.wanted-root .pg-line { position:absolute; left:0; right:0; height:28px; background:#dde1e6; z-index:10; display:flex; align-items:center; justify-content:center; pointer-events:none; }
.wanted-root .pg-line-label { font-family:var(--font-mono); font-size:9px; color:var(--ink-3); letter-spacing:0.06em; }
.wanted-toolbar { position:fixed; top:16px; right:16px; z-index:100; display:flex; gap:8px; align-items:center; }
.wanted-variant { position:fixed; top:16px; left:16px; z-index:100; display:flex; gap:2px; padding:4px; background:rgba(255,255,255,0.88); -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px); border:1px solid var(--line); border-radius:999px; box-shadow:0 4px 16px rgba(20,22,28,0.1); }
.wanted-variant-btn { border:none; background:transparent; font-family:var(--font-sans); font-size:12.5px; font-weight:700; color:var(--ink-2); padding:8px 16px; border-radius:999px; cursor:pointer; transition:background .15s, color .15s; }
.wanted-variant-btn.active { background:var(--ink); color:#fff; }
.wanted-variant-btn:not(.active):hover { background:var(--bg-soft); color:var(--ink); }
@media print { .wanted-variant { display:none !important; } }
@media (max-width:760px) { .wanted-variant { left:8px; top:8px; } }
.wanted-iconbtn { display:inline-flex; align-items:center; justify-content:center; width:42px; height:42px; background:rgba(255,255,255,0.88); -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px); color:var(--ink-2); border:1px solid var(--line); border-radius:50%; box-shadow:0 4px 16px rgba(20,22,28,0.1); cursor:pointer; transition:transform .15s, box-shadow .2s, color .15s, background .15s; }
.wanted-iconbtn:hover { box-shadow:0 8px 22px rgba(20,22,28,0.16); background:#fff; color:var(--ink); }
.wanted-iconbtn svg { transition:transform .15s; }
.wanted-back:hover svg { transform:translateX(-2px); }
.wanted-print:hover svg { transform:translateY(1px); }
@media print {
  .wanted-root { background:#fff; padding:0; }
  .wanted-toolbar { display:none !important; }
  .wanted-root .sheet { width:auto; margin:0; box-shadow:none; min-height:0 !important; }
  .wanted-root .sheet-inner { padding:15mm 15mm; }
  @page { size:A4; margin:11mm 0; }
  .wanted-root .w-proj-intro, .wanted-root .other-item, .wanted-root .w-cover, .wanted-root .w-two, .wanted-root .w-shot, .wanted-root .w-cg-items, .wanted-root .w-proj-head, .wanted-root .w-skills-block, .wanted-root .w-core-h, .wanted-root .w-extra-duties-wrap, .wanted-root .w-activities, .wanted-root .w-edu-wrap, .wanted-root .contrib-diagram, .wanted-root .b-diagram, .wanted-root .ab { break-inside:avoid; }
  .wanted-root .w-sec-title, .wanted-root .w-core-h, .wanted-root .contrib-h { break-after:avoid; }
  /* Each project still starts on its own printed page (a project is a
     distinct portfolio chapter) - the on-screen preview simulates this with
     JS spacers, but actual PDF/print pagination is decided entirely by the
     browser from these break-* rules, independently of that preview math, so
     the rule has to be declared here too. Uses the general sibling
     combinator (~), not adjacent (+): the JS-inserted .pg-spacer sits between
     consecutive .w-proj elements in the DOM (hidden via display:none below,
     but still present as a sibling), so the adjacent-sibling form never
     matches and break-before silently never applied - ~ matches regardless of
     what's in between. Within a project, individual "핵심 업무" (.contrib)
     achievement blocks are intentionally NOT in this avoid-break list (unlike
     before) - only their diagram (.contrib-diagram/.b-diagram) is protected,
     so the AS-IS/TO-BE text can flow across a page boundary instead of the
     whole block jumping to a fresh page and leaving the rest of the previous
     page blank. */
  .wanted-root .w-proj ~ .w-proj { break-before:page; }
  .wanted-root .pg-spacer, .wanted-root .pg-line { display:none; }
  .wanted-root * { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
}
.wanted-root .w-cover { position:relative; overflow:hidden; }
.wanted-root .w-cover-deco { position:absolute; bottom:20px; border-radius:50%; pointer-events:none; }
.wanted-root .w-cover-deco.ring-a { width:220px; height:220px; right:-40px; border:1.5px solid var(--line); }
.wanted-root .w-cover-deco.ring-b { width:140px; height:140px; right:0px; border:1.5px solid var(--accent-soft); }
.wanted-root .w-cover-deco.ring-c { width:60px; height:60px; right:30px; border:2px solid var(--accent); }
.wanted-root .w-brand { font-family:var(--font-mono); font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--accent); }
.wanted-root .w-contact { position:absolute; left:0; bottom:20px; font-size:12.5px; color:var(--ink-2); }
.wanted-root .w-contact b { display:block; font-weight:800; color:var(--ink); font-size:14px; margin-bottom:4px; }
.wanted-root .w-name { font-size:19px; font-weight:800; color:var(--ink); letter-spacing:-0.01em; margin-top:18px; }
.wanted-root .w-role { font-size:44px; font-weight:800; letter-spacing:-0.045em; line-height:1.04; margin-top:8px; }
.wanted-root .w-role .dot { color:var(--accent); }
.wanted-root .w-sub { font-size:16px; color:var(--ink-2); font-weight:600; margin-top:14px; max-width:150mm; line-height:1.5; }
.wanted-root .w-hero-stats { display:grid; grid-template-columns:repeat(2, auto); gap:8px 24px; margin-top:20px; }
.wanted-root .w-hero-stat { font-size:12px; color:var(--ink-2); white-space:nowrap; }
.wanted-root .w-hero-stat b { font-family:var(--font-mono); font-weight:800; color:var(--accent); margin-left:6px; }
.wanted-root .w-about-row { display:flex; gap:10px; font-size:12px; padding:4px 0; }
.wanted-root .w-about-row .k { font-family:var(--font-mono); font-size:10px; color:var(--ink-3); min-width:54px; padding-top:1px; }
.wanted-root .w-about-row .v { color:var(--ink); font-weight:600; }
.wanted-root .w-skill-line { font-size:12px; color:var(--ink); line-height:1.72; }
.wanted-root .w-skill-line b { font-weight:700; }
.wanted-root .w-blog-weapon { display:flex; align-items:baseline; gap:9px; margin-top:16px; padding:10px 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line); text-decoration:none; }
.wanted-root .w-blog-weapon-ar { color:var(--accent); font-weight:800; font-size:13px; }
.wanted-root .w-blog-weapon-tx { font-size:13px; font-weight:700; color:var(--ink); letter-spacing:-0.01em; line-height:1.5; }
.wanted-root .w-proj { margin-top:0; }
.wanted-root .w-proj-head { padding-bottom:14px; border-bottom:2px solid var(--ink); }
.wanted-root .w-proj-top { display:flex; align-items:baseline; justify-content:space-between; gap:16px; }
.wanted-root .w-proj-name { font-size:22px; font-weight:800; letter-spacing:-0.03em; }
.wanted-root .w-proj-period { font-family:var(--font-mono); font-size:11.5px; color:var(--accent); font-weight:600; margin-top:7px; }
/* 아키텍처는 세부 라벨이 읽혀야 하므로 항상 가로 전체 폭 한 장으로 크게 싣는다.
   실사용 화면은 그 위에 밴드로 얹어 세로로 쌓는다(2단 배치는 도면이 작아져 못 읽힘). */
.wanted-root .w-shots { display:grid; grid-template-columns:1fr; gap:10px; margin-top:14px; }
.wanted-root .w-shot { display:grid; place-items:center; width:100%; height:auto; min-height:150px; border:1px solid var(--line); border-radius:12px; overflow:hidden; background:var(--bg-soft); font-family:var(--font-mono); font-size:11px; color:var(--ink-3); letter-spacing:0.06em; }
.wanted-root .w-shot img { width:100%; height:auto; max-height:280px; object-fit:contain; }
.wanted-root .w-shot.arch { height:auto; min-height:220px; }
.wanted-root .w-shot.arch img { height:auto; max-height:520px; object-fit:contain; background:#fff; padding:10px; }
/* 백엔드 변형: 흐름도(archFlow 태그체인)가 대표 이미지 자리이므로, 실사용 화면은 개요 아래 보조 컷으로 작게 */
.wanted-root .w-shots-sub { margin-top:12px; }
.wanted-root .w-shots-sub .w-shot { min-height:90px; }
.wanted-root .w-shots-sub .w-shot img { max-height:160px; }
.wanted-root .w-proj-titlewrap { display:flex; align-items:center; gap:10px; }
.wanted-root .w-proj-logo { width:30px; height:30px; border-radius:7px; object-fit:contain; background:#fff; border:1px solid var(--line); padding:3px; flex-shrink:0; }
.wanted-root .w-sub-h { display:flex; align-items:center; gap:8px; font-size:15px; font-weight:800; letter-spacing:-0.01em; color:var(--ink); margin:22px 0 11px; padding-bottom:8px; border-bottom:1px solid var(--line); }
.wanted-root .w-sub-h::before { content:""; width:8px; height:8px; border-radius:2px; background:var(--accent); flex-shrink:0; }
.wanted-root .w-overview { font-size:12.5px; color:var(--ink-2); line-height:1.62; }
.wanted-root .w-role-list { display:flex; flex-direction:column; gap:5px; }
.wanted-root .w-be-list { margin-top:11px; gap:6px; }
/* 경력 - 이력서(career.groups)와 동일한 항목을 포폴에도 싣는다 */
.wanted-root .w-career-meta { font-size:12px; color:var(--ink-2); margin-top:-4px; }
.wanted-root .w-career-overview { font-size:12.5px; color:var(--ink-2); line-height:1.62; margin-top:8px; }
.wanted-root .w-cg { margin-top:17px; }
.wanted-root .w-cg-top { display:flex; align-items:baseline; justify-content:space-between; gap:12px; padding-bottom:7px; border-bottom:1px solid var(--line); }
.wanted-root .w-cg-title { font-size:13.5px; font-weight:800; letter-spacing:-0.02em; }
.wanted-root .w-cg-period { font-family:var(--font-mono); font-size:10px; color:var(--ink-3); flex-shrink:0; }
.wanted-root .w-cg-items { display:flex; flex-direction:column; gap:6px; margin-top:9px; }
.wanted-root .w-cg-item { font-size:12px; color:var(--ink); line-height:1.55; padding-left:13px; position:relative; }
.wanted-root .w-cg-item::before { content:""; position:absolute; left:0; top:7px; width:4px; height:4px; border-radius:50%; background:var(--accent); }
.wanted-root .w-cg-sub { display:flex; flex-direction:column; gap:3px; margin-top:4px; }
.wanted-root .w-cg-subitem { font-size:11px; color:var(--ink-2); line-height:1.5; padding-left:11px; position:relative; }
.wanted-root .w-cg-subitem::before { content:"-"; position:absolute; left:0; color:var(--ink-3); }
.wanted-root .w-role-item { font-size:12.5px; color:var(--ink); line-height:1.55; padding-left:14px; position:relative; }
.wanted-root .w-role-item::before { content:""; position:absolute; left:0; top:8px; width:5px; height:5px; border-radius:50%; background:var(--accent); }
.wanted-root .w-extra-duties { display:flex; flex-direction:column; gap:4px; margin-top:12px; }
.wanted-root .w-extra-duty-item { padding-left:13px; position:relative; font-size:11.5px; color:var(--ink-3); line-height:1.5; }
.wanted-root .w-extra-duty-item::before { content:""; position:absolute; left:0; top:6px; width:4px; height:4px; border-radius:50%; background:var(--ink-3); }
.wanted-root .w-stack { display:flex; flex-wrap:wrap; gap:6px; }
.wanted-root .tag { font-family:var(--font-mono); font-size:10px; color:var(--ink-2); background:var(--bg-soft); border:1px solid var(--line); border-radius:6px; padding:4px 9px; }
.wanted-root .w-core-h { margin-top:20px; }
.wanted-root .contrib { margin-top:22px; }
.wanted-root .contrib + .contrib { margin-top:20px; padding-top:20px; border-top:1px solid var(--line); }
.wanted-root .contrib-h { font-size:13px; font-weight:700; color:var(--ink); letter-spacing:-0.01em; margin-bottom:10px; }
.wanted-root .contrib-diagram { width:100%; border:1px solid var(--line); border-radius:10px; overflow:hidden; margin-bottom:10px; background:#fff; }
.wanted-root .contrib-diagram img { width:100%; height:auto; max-height:200px; object-fit:contain; display:block; }
/* 박스형 전후 다이어그램 - 글로만은 이해가 어려운 극소수 블록 전용, CSS로만 그린다(이미지 파일 아님) */
.wanted-root .b-diagram { display:flex; flex-direction:column; gap:8px; margin-bottom:10px; padding:10px 12px; border:1px solid var(--line); border-radius:10px; background:#fff; }
.wanted-root .b-diagram-row { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.wanted-root .b-diagram-k { font-family:var(--font-mono); font-size:9.5px; font-weight:800; letter-spacing:0.04em; width:38px; flex-shrink:0; }
.wanted-root .b-diagram-row.asis .b-diagram-k { color:#c9302c; }
.wanted-root .b-diagram-row.tobe .b-diagram-k { color:var(--accent); }
.wanted-root .b-diagram-flow { display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
.wanted-root .b-box { font-size:10px; font-weight:600; color:var(--ink-2); background:var(--bg-soft); border:1px solid var(--line); border-radius:7px; padding:5px 8px; text-align:center; line-height:1.35; }
.wanted-root .b-box .b-box-sub { display:block; font-size:9px; font-weight:500; color:var(--ink-3); margin-top:1px; }
.wanted-root .b-group { display:flex; align-items:center; gap:6px; padding:7px 8px 5px; border:1.5px dashed var(--ink-3); border-radius:8px; position:relative; margin-top:8px; }
.wanted-root .b-group-tag { position:absolute; top:-8px; left:8px; background:#fff; padding:0 5px; font-family:var(--font-mono); font-size:8.5px; font-weight:800; color:var(--ink-3); letter-spacing:0.03em; }
.wanted-root .b-diagram-row.tobe .b-group { border-color:var(--accent); }
.wanted-root .b-diagram-row.tobe .b-group-tag { color:var(--accent); }
.wanted-root .b-arrow { font-size:12px; color:var(--ink-3); flex-shrink:0; }
.wanted-root .b-diagram-note { font-size:9.5px; color:#c9302c; flex-shrink:0; }
.wanted-root .b-diagram-row.tobe .b-diagram-note { color:var(--accent); }
.wanted-root .b-fan { display:flex; align-items:center; gap:10px; }
.wanted-root .b-fan-col { display:flex; flex-direction:column; gap:4px; }
.wanted-root .b-fan-arrows { display:flex; flex-direction:column; justify-content:space-around; align-self:stretch; font-size:11px; color:var(--ink-3); }
.wanted-root .b-diagram-flow-v { display:flex; flex-direction:column; align-items:flex-start; gap:4px; }
.wanted-root .contrib-tags { display:flex; flex-direction:column; gap:5px; margin-bottom:10px; }
.wanted-root .contrib-tag-row { display:flex; flex-wrap:wrap; align-items:center; gap:5px; font-size:11px; }
.wanted-root .contrib-tag-k { font-family:var(--font-mono); font-size:9.5px; font-weight:800; letter-spacing:0.04em; width:38px; flex-shrink:0; }
.wanted-root .contrib-tag-row.asis .contrib-tag-k { color:#c9302c; }
.wanted-root .contrib-tag-row.tobe .contrib-tag-k { color:var(--accent); }
.wanted-root .contrib-tag-chain { display:inline-flex; align-items:center; gap:5px; }
.wanted-root .contrib-tag { padding:2px 8px; border-radius:999px; border:1px solid var(--line); background:var(--bg-soft); font-weight:600; }
.wanted-root .contrib-tag-row.asis .contrib-tag { border-color:#f0c4c2; background:#fdeeee; color:#c9302c; }
.wanted-root .contrib-tag-row.tobe .contrib-tag { border-color:var(--accent-soft); background:var(--accent-soft); color:var(--accent); }
.wanted-root .contrib-tag-arrow { color:var(--ink-3); font-size:9px; }
.wanted-root .ab { display:flex; flex-direction:column; gap:6px; }
.wanted-root .ab + .ab { margin-top:14px; }
.wanted-root .ab-k { display:inline-block; font-family:var(--font-mono); font-size:10px; font-weight:800; letter-spacing:0.04em; }
.wanted-root .ab.asis .ab-k { color:var(--asis); }
.wanted-root .ab.tobe .ab-k { color:var(--tobe); }
.wanted-root .ab-v { font-size:12px; line-height:1.66; color:var(--ink-2); }
.wanted-root .ab-v.muted { color:var(--ink-2); }
.wanted-root .ab-list { display:flex; flex-direction:column; gap:5px; }
.wanted-root .ab-list .li { font-size:12px; color:var(--ink-2); line-height:1.55; }
.wanted-root .ab-result { margin-top:9px; padding:8px 12px; background:var(--tobe-soft); border-radius:8px; font-size:12px; font-weight:500; color:var(--ink-2); display:flex; align-items:baseline; gap:6px; }
.wanted-root .ab-result-arrow { color:var(--tobe); font-weight:700; flex-shrink:0; }
.wanted-root .ab-result-link { display:block; margin-top:6px; font-size:11px; font-weight:600; color:var(--tobe); text-decoration:none; }
.wanted-root .w-flow { display:flex; flex-wrap:wrap; align-items:center; gap:5px; margin-top:12px; padding-top:12px; border-top:1px dashed var(--line); list-style:none; }
.wanted-root .w-flow-step { display:flex; align-items:center; gap:5px; }
.wanted-root .w-flow-badge { display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:999px; border:1px solid var(--line); background:var(--bg-soft); font-size:10.5px; }
.wanted-root .w-flow-num { display:inline-flex; align-items:center; justify-content:center; width:14px; height:14px; border-radius:50%; background:var(--accent); color:#fff; font-size:9px; font-weight:800; flex-shrink:0; }
.wanted-root .w-flow-name { font-weight:700; color:var(--ink); }
.wanted-root .w-flow-desc { color:var(--ink-2); }
.wanted-root .w-flow-arrow { color:var(--ink-3); font-size:10px; }
.wanted-root .w-arch-flow { border-top:none; padding-top:2px; margin-top:8px; }
.wanted-root .w-activities-note { font-size:11.5px; color:var(--ink-3); line-height:1.6; margin-bottom:12px; font-style:italic; }
.wanted-root .other-item { padding:13px 0; border-bottom:1px solid var(--line); }
.wanted-root .other-item:last-child { border-bottom:none; padding-bottom:0; }
.wanted-root .other-top { display:flex; align-items:baseline; justify-content:space-between; gap:14px; }
.wanted-root .other-name { font-size:14px; font-weight:800; }
.wanted-root .other-meta { font-family:var(--font-mono); font-size:10.5px; color:var(--ink-3); white-space:nowrap; }
.wanted-root .other-desc { font-size:12px; color:var(--ink-2); margin-top:4px; line-height:1.6; }
.wanted-root .other-contrib { font-size:11.5px; color:var(--ink); margin-top:6px; }
.wanted-root .w-two { display:grid; grid-template-columns:1fr 1fr; gap:30px; }
.wanted-root .edu-item, .wanted-root .cert-item { padding:10px 0; border-bottom:1px solid var(--line-2); }
.wanted-root .edu-item:first-child, .wanted-root .cert-item:first-child { padding-top:0; }
.wanted-root .edu-item:last-child, .wanted-root .cert-item:last-child { border-bottom:none; padding-bottom:0; }
.wanted-root .edu-school { font-size:13px; font-weight:700; }
.wanted-root .edu-degree { font-size:11.5px; color:var(--ink-2); margin-top:2px; }
.wanted-root .edu-meta { font-family:var(--font-mono); font-size:10px; color:var(--ink-3); margin-top:4px; }
.wanted-root .cert-top { display:flex; justify-content:space-between; align-items:baseline; }
.wanted-root .cert-name { font-size:13px; font-weight:700; }
.wanted-root .cert-date { font-family:var(--font-mono); font-size:10px; color:var(--ink-3); }
.wanted-root .cert-issuer { font-size:11px; color:var(--ink-2); margin-top:2px; }
.wanted-root .w-sec-title { font-size:19px; font-weight:800; letter-spacing:-0.03em; margin:28px 0 13px; padding-bottom:9px; border-bottom:2px solid var(--ink); }
.wanted-root .foot { margin-top:26px; padding-top:12px; border-top:1px solid var(--line); display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:9.5px; color:var(--ink-3); letter-spacing:0.03em; }
/* Sheet stays fixed A4 width at every viewport - small screens scroll horizontally,
   content never reflows (deterministic pagination). */
`;

const MARK_RE = new RegExp(
  [
    "\\d[\\d.]*\\s*(?:건|분|초|배|파드|장|개|명|%)\\s*(?:→|->)\\s*\\d[\\d.]*\\s*(?:건|분|초|배|파드|장|개|명)?",
    "O\\(N?\\)\\s*(?:→|->)\\s*O\\(1\\)",
    "\\d+\\s*%\\s*(?:향상|개선|단축|절감)",
    "GPU\\s*\\d+장\\s*(?:→|->)\\s*\\d+파드",
    "수정 0건|유실 0건|호출 0회|(?<![\\d.,])0건|(?<![\\d.,])0회",
  ].map((s) => `(?:${s})`).join("|"),
  "g"
);

/** Wrap measurable metrics in <mark>, mirroring wanted-doc hl(). */
function hl(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  MARK_RE.lastIndex = 0;
  while ((m = MARK_RE.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(<mark key={`${m.index}-${m[0]}`}>{m[0]}</mark>);
    last = m.index + m[0].length;
    if (m.index === MARK_RE.lastIndex) MARK_RE.lastIndex++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function reorderBy<T>(items: T[], order: string[] | undefined, keyOf: (item: T) => string): T[] {
  if (!order || order.length === 0) return items;
  const rank = new Map(order.map((k, i) => [k, i]));
  return items
    .map((item, i) => ({ item, i, r: rank.has(keyOf(item)) ? rank.get(keyOf(item))! : Infinity }))
    .sort((a, b) => a.r - b.r || a.i - b.i)
    .map((x) => x.item);
}

const GAP = 28; // px - height of the gray page-gap bar

function topInSheet(el: HTMLElement, sheet: HTMLElement): number {
  const er = el.getBoundingClientRect();
  const sr = sheet.getBoundingClientRect();
  return er.top - sr.top;
}

export function PortfolioDocument({
  initialTab,
  override,
}: {
  initialTab?: string | null;
  override?: PortfolioOverride;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [variant, setVariant] = useState<Variant>(() => variantFromTab(initialTab));
  const { data: P, roleEn: roleEnBase } = VARIANTS[variant];
  const activeOverride = override?.[variant];
  const roleEn = activeOverride?.roleOverride ?? roleEnBase;
  // Extra projects (e.g. a side project relevant to one company only) are
  // appended after the base list - same DocProject shape, so every existing
  // render/pagination path (KEEP selector, w-proj break rules) just works.
  const hideProjects = activeOverride?.hideProjects;
  const projectsAll: DocProject[] = [...(P.projects as DocProject[]), ...(activeOverride?.extraProjects ?? [])];
  const projectsRaw = projectsAll.filter((pr) => !hideProjects?.includes(pr.pkey ?? pr.title));
  const projects = reorderBy(projectsRaw, activeOverride?.projectOrder, (pr) => pr.pkey ?? pr.title);
  // extraSkillItems appends to a matching category (or adds a new one), hideSkillItems
  // drops named items from a category - both apply before skillOrder reorders the
  // result - same contract as ResumeDocument.tsx.
  const extraSkillItems = activeOverride?.extraSkillItems;
  const hideSkillItems = activeOverride?.hideSkillItems;
  const skillsMerged = extraSkillItems || hideSkillItems
    ? [
        ...P.skills.map((g) => ({
          category: g.category,
          items: (extraSkillItems?.[g.category] ? [...g.items, ...extraSkillItems[g.category]] : g.items)
            .filter((item) => !hideSkillItems?.[g.category]?.includes(item)),
        })),
        ...Object.entries(extraSkillItems ?? {})
          .filter(([category]) => !P.skills.some((g) => g.category === category))
          .map(([category, items]) => ({ category, items })),
      ]
    : P.skills;
  const skillsOrdered = reorderBy(skillsMerged, activeOverride?.skillOrder, (g) => g.category)
    .map((g) => ({
      ...g,
      items: reorderBy(g.items, activeOverride?.skillItemOrder?.[g.category], (item) => item),
    }));
  const activities = P.activities as DocActivity[];
  // 인프라 문서에만 있는 백엔드/프론트엔드 개발 경험 - 별도 섹션이 아니라 관련 프로젝트의
  // 핵심 업무 밑에 한 줄씩 붙인다 (풀스택 문서는 프로젝트 본문에 이미 포함이라 없음).
  const devNotes = "devNotes" in P ? (P.devNotes as CareerItem[]) : [];
  const devNotesOf = (key?: string) => (key ? devNotes.filter((it) => it.proj === key) : []);
  const career = P.career as DocCareer;
  // 포폴은 경력 칸을 따로 두지 않는다. 경력 항목을 proj 키로 프로젝트별로 나눠 각 프로젝트
  // 안에 '담당 업무'로 싣고, 프로젝트에 안 붙는 항목(사내 자동화 등)만 뒤에 따로 모은다.
  // '프로젝트 개요' 그룹은 프로젝트 제목·기간·역할과 중복이라 제외.
  const careerItems = career.groups
    .filter((g) => g.title !== "프로젝트 개요")
    .flatMap((g) => g.items as CareerItem[]);
  // blocks[]에서 이미 스토리로 다루는 항목(coveredByBlock)은 중복이니 제외 - 핵심 업무와
  // 안 겹치는 나머지만 간략히 보여준다.
  const dutiesOf = (key?: string) =>
    key ? careerItems.filter((it) => it.proj === key && !it.coveredByBlock && !activeOverride?.hideProjectDuties?.[key]?.includes(it.text)) : [];
  // 프로젝트 밑에 넣으면 꼬리표 "(NIPA)"는 중복이므로 렌더 시 떼어낸다.
  const stripTag = (t: string) => t.replace(/\s*\((?:국가보안기관|KARI|NIPA|드론)\)$/, "");
  const commonItems = careerItems.filter((it) => !it.proj && !activeOverride?.hideCommonDuties?.includes(it.text));
  // Rendered after the last project by default; a company can pull it earlier
  // (right after a specific project's card) via `commonDutiesAfterKey`, same
  // contract as resumeOverrides.ts's extraProjectsAfterKey.
  const commonDutiesBlock = commonItems.length > 0 && (
    <>
      <div className="w-sec-title">사내 공통 · 업무 자동화</div>
      <div className="other-item">
        <div className="w-cg-items">
          {commonItems.map((it, j) => (
            <div key={j} className="w-cg-item">
              {hl(it.text)}
              {it.sub && it.sub.length > 0 && (
                <div className="w-cg-sub">
                  {it.sub.map((s, k) => <div key={k} className="w-cg-subitem">{hl(s)}</div>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
  // "그 외 담당 업무" 라벨은 그 위에 "핵심 업무"(보이는 블록)가 있을 때만 말이 된다 -
  // 이 회사가 해당 프로젝트의 블록을 전부 숨겼다면 "그 외"라고 부를 대상이 없으니
  // 그냥 "담당 업무"로 표시한다.
  const hasVisibleBlocks = (pr: DocProject) => {
    const hidden = activeOverride?.hideBlocks?.[pr.pkey ?? pr.title];
    return pr.blocks.some((_, idx) => !hidden?.includes(idx));
  };

  const handleVariantChange = useCallback((key: Variant) => {
    setVariant(key);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", TAB_PARAM[key]);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router]);
  const sheetRef = useRef<HTMLDivElement>(null);

  const applyBreaks = useCallback(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    // clean up previous injections (reset min-height first so the re-measure is honest)
    sheet.style.minHeight = '';
    sheet.querySelectorAll('.pg-spacer, .pg-line').forEach(el => el.remove());

    // Page size is fixed to the CSS rendering of A4 (1mm = 96/25.4px at every
    // resolution), so breaks are deterministic and never shift between reloads
    // or screens. This matches the 210mm sheet's own rendered width.
    const pxPerMm = 96 / 25.4;
    const pageH = 297 * pxPerMm;

    // Rule: flow continuously, but never cut a unit across a page boundary. The
    // portfolio is flat (no section wrappers), so each unit is kept whole and
    // sections simply flow. Units too tall to fit a page (a whole project) are
    // skipped, and their inner blocks (contrib, shots) handle the crossing.
    // .w-shot (개별 이미지, 도면/실사용 화면 각각): intro 전체가 한 페이지에 안 들어가면
    // 도면을 먼저 보여주고, 공간이 부족한 실사용 화면만 다음 페이지로 넘긴다 - 두 이미지를
    // .w-shots로 묶어 통째로 유지하면 도면 하나만으로 충분히 들어가는 페이지도 통째로
    // 다음 장으로 밀려나 빈 공간이 커지므로, 이미지 단위(.w-shot)로만 쪼갠다.
    // .w-cg-items(담당 업무 목록): 도면이 커진 뒤 .w-proj-intro 가 한 페이지를 넘길 수 있어,
    // 그 경우 intro 는 통째 유지를 포기하고 이미지(.w-shot)·담당 업무 단위로 넘긴다.
    const KEEP = '.w-proj, .w-cover, .other-item, .w-two, .w-shot, .w-cg-items, .w-proj-head, .w-skills-block, .w-proj-intro, .w-sec-title, .w-core-h, .w-extra-duties-wrap, .w-activities, .contrib-diagram, .b-diagram, .ab, .contrib-h';
    const PAGE_PAD = pxPerMm * 16;       // top inset kept at the start of every continued page
    const usable = pageH - PAGE_PAD * 2 - GAP; // a unit taller than this can't be kept whole

    // Cover fills the rest of page 1 (deterministic, set once - not part of the
    // push/spacer logic below, so it can't interact with or destabilize it).
    // Gives the corner decoration a fixed box to anchor to via plain CSS.
    const cover = sheet.querySelector('.w-cover') as HTMLElement | null;
    if (cover) {
      cover.style.minHeight = '';
      const coverTop = topInSheet(cover, sheet);
      cover.style.minHeight = `${Math.max(0, pageH - coverTop - GAP - PAGE_PAD)}px`;
    }

    // first real content block following a section title - kept on the same page
    // as the title so it never lands alone at the bottom. The layout is flat, so
    // find the first block that follows the title in document order.
    const firstBlockOf = (header: HTMLElement): HTMLElement | null => {
      const blocks = Array.from(
        sheet.querySelectorAll('.w-proj-intro, .other-item, .w-two, .contrib-diagram, .b-diagram, .ab')
      ) as HTMLElement[];
      for (const b of blocks) {
        if (header.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) return b;
      }
      return null;
    };

    // push an element to the top of the next page so that its visible content
    // lands at exactly GAP + PAGE_PAD below the boundary - regardless of which
    // element type starts the page. `top` is the border-box top, and the element
    // only moves down by the spacer's height (its margin-top still applies on top
    // of the spacer, so margin must NOT be subtracted). Only the border-box-inner
    // spacing (border + padding) offsets the visible content, so subtract that.
    const pushBefore = (el: HTMLElement, top: number, boundary: number) => {
      const cs = getComputedStyle(el);
      const ownInset =
        (parseFloat(cs.borderTopWidth) || 0) +
        (parseFloat(cs.paddingTop) || 0);
      const spacer = document.createElement('div');
      spacer.className = 'pg-spacer';
      spacer.style.height = `${Math.max(0, boundary - top + GAP + PAGE_PAD - ownInset)}px`;
      el.parentNode?.insertBefore(spacer, el);
    };

    // Cover page: Projects always starts on page 2, even if it would fit on
    // page 1 - the header reads as a dedicated cover. Runs before the single
    // pass below so everything after Projects re-flows against the shift.
    const projTitle = sheet.querySelector('.w-sec-title') as HTMLElement | null;
    if (projTitle) {
      const top = topInSheet(projTitle, sheet);
      if (top < pageH) pushBefore(projTitle, top, pageH);
    }

    // Single top-to-bottom pass. A push only ever moves elements that come
    // AFTER it in the DOM (never before), so once an element earlier in
    // document order is resolved it never needs revisiting - each element is
    // measured and, if needed, fixed exactly once. (An earlier version
    // restarted the whole scan from the top after every fix, which could
    // reprocess the same element many times and, if a fix ever failed to
    // fully clear a later check, kept stacking spacers - the runaway
    // "63-page" bug.)
    //
    // The "every project after the first starts on a fresh page" rule used to
    // run as its own pre-pass, before this loop. That measured every
    // project's position before any of THIS loop's fixes had reflowed the
    // page - so a project's forced-break spacer was sized for a position
    // that later shifted once an earlier project's own overflow (its
    // "핵심 업무" heading, an oversized contrib block, etc.) got pushed down
    // by this loop. The two pushes stacked instead of replacing each other,
    // producing a spacer taller than a full page - i.e. a fully blank page.
    // Folding the project-break rule into this same pass (below, on '.w-proj'
    // itself) fixes that: because it now runs in strict document order
    // together with everything else, a later project is only ever measured
    // after every earlier project's own internal breaks are already applied.
    const firstProj = sheet.querySelector('.w-proj') as HTMLElement | null;
    const els = Array.from(sheet.querySelectorAll(KEEP)) as HTMLElement[];
    for (const el of els) {
      const top = topInSheet(el, sheet);
      const pageIdx = Math.floor(top / pageH);
      const prevBoundary = pageIdx * pageH;
      const boundary = prevBoundary + pageH;

      if (el.classList.contains('w-proj')) {
        // "already at the top of its page" means sitting at the exact spot a
        // push would have landed it (boundary + GAP + PAGE_PAD), not merely
        // top > prevBoundary - virtually everything satisfies that trivial
        // check, which pushed already-correctly-placed projects one page
        // further every time.
        if (el !== firstProj) {
          const canonicalTop = prevBoundary + GAP + PAGE_PAD;
          if (Math.abs(top - canonicalTop) > 4) pushBefore(el, top, boundary);
        }
        continue; // a whole project is usually taller than one page - the fit-check below is for finer units
      }

      const h = el.offsetHeight;
      if (h > usable) {
        // No finer sub-unit to fall back on for any of these KEEP units, so a
        // unit taller than one page still gets pushed whole to the next page
        // top rather than left to overflow past the bottom padding - it may
        // still spill into the page after, but at least it starts clean.
        // .w-cover is excluded (fixed at the very start, must never move).
        // Canonical-top guard (same as .w-proj above) prevents re-pushing an
        // already-correctly-placed unit every iteration.
        if (!el.classList.contains('w-cover')) {
          const canonicalTop = prevBoundary + GAP + PAGE_PAD;
          if (Math.abs(top - canonicalTop) > 4) pushBefore(el, top, boundary);
        }
        continue; // too tall to keep whole - a finer unit handles it
      }

      // a title is "cut" if it would be split from its first block (break-after:avoid)
      let span = top + h;
      if (el.classList.contains('w-sec-title') || el.classList.contains('w-core-h') || el.classList.contains('contrib-h')) {
        const fb = firstBlockOf(el);
        if (fb && fb.offsetHeight <= usable) span = topInSheet(fb, sheet) + fb.offsetHeight;
      }

      // (1) element (or title + first block) ends inside the next page's bottom
      // padding zone → next page. Threshold is contentBottom (boundary - PAGE_PAD),
      // not the raw boundary - otherwise content ending inside the reserved
      // bottom margin (between contentBottom and boundary) silently invades
      // the padding instead of triggering a push. This also covers the case
      // where `top` itself already sits past contentBottom (a slightly
      // overflowing previous sibling pushed this element's start into the
      // padding zone already) - not just the "straddles the boundary" case -
      // since any el reaching here already fits within one page in isolation
      // (h <= usable was checked above), so span > contentBottom always means
      // it needs to move, regardless of where top landed.
      const contentBottom = boundary - PAGE_PAD;
      if (span > contentBottom) {
        pushBefore(el, top, boundary);
        continue;
      }
      // (2) element sits underneath a page-gap bar (covered) → nudge below the bar
      if (prevBoundary >= pageH && top - prevBoundary < GAP) {
        pushBefore(el, top, prevBoundary);
      }
    }

    // pad the sheet up to a whole number of pages, so the last page is a full
    // fixed-size A4 too (the white sheet fills the last page instead of ending
    // at the content). scrollHeight already includes .sheet-inner's own
    // trailing bottom padding (24mm) after the last real content - that
    // padding is just breathing room, not displayable content, so it
    // shouldn't by itself be enough to force a whole extra blank page when
    // the last content block lands close to a page boundary.
    const sheetInnerPadBottom = 24 * (96 / 25.4);
    const contentH = sheet.scrollHeight - sheetInnerPadBottom;
    const pages = Math.max(1, Math.ceil((contentH - 1) / pageH));
    sheet.style.minHeight = `${pages * pageH}px`;

    // overlay page-gap bars at each boundary
    for (let p = 1; p < pages; p++) {
      const line = document.createElement('div');
      line.className = 'pg-line';
      line.style.top = `${p * pageH}px`;
      line.innerHTML = `<span class="pg-line-label">PAGE ${p + 1}</span>`;
      sheet.appendChild(line);
    }
  }, []);

  useEffect(() => {
    applyBreaks();
    // Web fonts load after first paint; the initial measure uses fallback-font
    // metrics and misplaces breaks. Recompute once fonts are ready, and again on
    // the next frame to settle any reflow.
    let raf = 0;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        applyBreaks();
        raf = requestAnimationFrame(applyBreaks);
      });
    }
    // 아키텍처 도면(.w-shot.arch)은 height:auto 라 로드가 끝나기 전에는 min-height(220px)
    // 로만 측정된다. 로드 후 실제 높이(최대 540px)로 늘어나므로, 그때 다시 계산하지 않으면
    // 늘어난 만큼 뒤 내용이 페이지 경계에서 밀린다. ResizeObserver는 WIDTH만 보기 때문에
    // (높이는 applyBreaks 자신이 바꾸므로 관찰 시 무한 루프) 이미지 로드를 직접 기다린다.
    let imgRaf = 0;
    const scheduleFromImage = () => {
      if (imgRaf) cancelAnimationFrame(imgRaf);
      imgRaf = requestAnimationFrame(applyBreaks);
    };
    const imgCleanups: Array<() => void> = [];
    sheetRef.current?.querySelectorAll("img").forEach((im) => {
      if (im.complete && im.naturalHeight > 0) return;
      im.addEventListener("load", scheduleFromImage);
      im.addEventListener("error", scheduleFromImage);
      imgCleanups.push(() => {
        im.removeEventListener("load", scheduleFromImage);
        im.removeEventListener("error", scheduleFromImage);
      });
    });

    // Only recompute when the sheet's WIDTH changes (window resize / zoom).
    // applyBreaks mutates the sheet's HEIGHT (spacers + min-height); observing
    // that would feed back into an endless resize loop.
    let lastW = sheetRef.current?.clientWidth ?? 0;
    const ro = new ResizeObserver(() => {
      const w = sheetRef.current?.clientWidth ?? 0;
      if (w === lastW) return;
      lastW = w;
      applyBreaks();
    });
    if (sheetRef.current) ro.observe(sheetRef.current);
    return () => {
      ro.disconnect();
      imgCleanups.forEach((fn) => fn());
      if (raf) cancelAnimationFrame(raf);
      if (imgRaf) cancelAnimationFrame(imgRaf);
    };
  }, [applyBreaks, variant, override]);

  return (
    <div className="wanted-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {SHOW_VARIANT_TABS && (
        <div className="wanted-variant">
          {(Object.keys(VARIANTS) as Variant[]).map((key) => (
            <button
              key={key}
              className={`wanted-variant-btn${variant === key ? " active" : ""}`}
              onClick={() => handleVariantChange(key)}
            >
              {VARIANTS[key].label}
            </button>
          ))}
        </div>
      )}
      <div className="wanted-toolbar">
        {process.env.NODE_ENV !== "production" && (
          <Link href="/portfolio-pdf/dashboard" className="wanted-iconbtn wanted-dashboard" aria-label="포트폴리오 대시보드" title="포트폴리오 대시보드 (회사별 오버라이드 관리)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg>
          </Link>
        )}
        <Link href="/" className="wanted-iconbtn wanted-back" aria-label="포트폴리오로 돌아가기" title="포트폴리오로 돌아가기">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
        </Link>
        <button className="wanted-iconbtn wanted-print" onClick={() => window.print()} aria-label="PDF로 저장 / 인쇄" title="PDF로 저장 / 인쇄">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></svg>
        </button>
      </div>

      <div className="sheet" ref={sheetRef}><div className="sheet-inner">
        <div className="w-cover">
          <div className="w-cover-deco ring-a" aria-hidden="true" />
          <div className="w-cover-deco ring-b" aria-hidden="true" />
          <div className="w-cover-deco ring-c" aria-hidden="true" />
          <div className="w-brand">Portfolio</div>
          <div className="w-hero">
            <div className="w-name">{P.name}</div>
            <div className="w-role">{roleEn}<span className="dot">.</span></div>
            <div className="w-sub">{activeOverride?.taglineOverride ?? P.tagline}</div>
            <div className="w-hero-stats">
              {(activeOverride?.highlightsOverride ?? (P.highlights as { v: string; l: string }[])).slice(0, 4).map((h, i) => (
                <span key={i} className="w-hero-stat">{h.l}:<b>{h.v}</b></span>
              ))}
            </div>
            <div className="w-contact"><b>{P.name}</b>{P.email}</div>
          </div>
        </div>

        <div className="w-sec-title">Projects</div>
        {projects.map((pr, idx) => (
          <Fragment key={idx}>
          <div className="w-proj">
            <div className="w-proj-intro">
              <div className="w-proj-head">
                <div className="w-proj-top">
                  <span className="w-proj-titlewrap">
                    {pr.logo && <img src={pr.logo} alt="" className="w-proj-logo" />}
                    <span className="w-proj-name">{pr.title}</span>
                  </span>
                </div>
                <div className="w-proj-period">{pr.company} · {pr.period}</div>
              </div>
              {variant === "platform" && (pr.screenshot || pr.archImage) && (
                <div className="w-shots">
                  {pr.screenshot && (
                    <div className="w-shot"><img src={pr.screenshot} alt="실사용 화면" /></div>
                  )}
                  {pr.archImage && (
                    <div className="w-shot arch"><img src={pr.archImage} alt="아키텍처" /></div>
                  )}
                </div>
              )}
              <div className="w-sub-h">개요</div>
              <div className="w-overview">{activeOverride?.descOverride?.[pr.pkey ?? pr.title] ?? pr.desc}</div>
              {pr.archFlow && pr.archFlow.length > 0 && (
                <ol className="w-flow w-arch-flow">
                  {pr.archFlow.map((f, k) => (
                    <li key={k} className="w-flow-step">
                      <span className="w-flow-badge">
                        <span className="w-flow-num">{k + 1}</span>
                        <span className="w-flow-name">{f.step}</span>
                        {f.desc && <span className="w-flow-desc">{f.desc}</span>}
                      </span>
                      {k < pr.archFlow!.length - 1 && <span className="w-flow-arrow">→</span>}
                    </li>
                  ))}
                </ol>
              )}
              {variant === "backend" && pr.screenshot && !activeOverride?.hideScreenshots?.includes(pr.pkey ?? pr.title) && (
                <div className="w-shots w-shots-sub">
                  <div className="w-shot"><img src={pr.screenshot} alt="실사용 화면" /></div>
                </div>
              )}
              <div className="w-skills-block">
                <div className="w-sub-h">Skills</div>
                <div className="w-stack">{(activeOverride?.stackOverride?.[pr.pkey ?? pr.title] ?? pr.stack).map((s) => <span key={s} className="tag">{s}</span>)}</div>
              </div>
            </div>

            {hasVisibleBlocks(pr) && <div className="w-sub-h w-core-h">핵심 업무</div>}
            {reorderBy(
              pr.blocks
                .map((b, idx) => ({ b, idx }))
                .filter(({ idx }) => !activeOverride?.hideBlocks?.[pr.pkey ?? pr.title]?.includes(idx)),
              activeOverride?.achievementOrder?.[pr.pkey ?? pr.title]?.map(String),
              ({ idx }) => String(idx)
            ).map(({ b, idx: j }) => {
              const bov = activeOverride?.blockOverrides?.[`${pr.pkey ?? pr.title}:${j}`];
              const label = bov?.label ?? b.label;
              const situation = bov?.situation ?? b.situation;
              const cause = bov?.cause ?? b.cause;
              const actions = bov?.actions ?? b.actions;
              const result = bov?.result ?? b.result;
              return (
              <div key={j} className="contrib">
                <div className="contrib-h">{label}</div>
                {b.image && (
                  <div className="contrib-diagram"><img src={b.image} alt="변경 전후 구조" /></div>
                )}
                {b.diagram && <BlockDiagram kind={b.diagram} />}
                {b.asisTags && (
                  <div className="contrib-tags">
                    <div className="contrib-tag-row asis">
                      <span className="contrib-tag-k">AS-IS</span>
                      {b.asisTags.map((t, k) => (
                        <span key={k} className="contrib-tag-chain">
                          <span className="contrib-tag">{t}</span>
                          {k < b.asisTags!.length - 1 && <span className="contrib-tag-arrow">→</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="ab asis">
                  {!b.asisTags && <span className="ab-k">AS-IS</span>}
                  <div className="ab-v muted">{situation} <span style={{ opacity: 0.85 }}>{cause}</span></div>
                </div>
                {b.tobeTags && (
                  <div className="contrib-tags">
                    <div className="contrib-tag-row tobe">
                      <span className="contrib-tag-k">TO-BE</span>
                      {b.tobeTags.map((t, k) => (
                        <span key={k} className="contrib-tag-chain">
                          <span className="contrib-tag">{t}</span>
                          {k < b.tobeTags!.length - 1 && <span className="contrib-tag-arrow">→</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="ab tobe">
                  {!b.tobeTags && <span className="ab-k">TO-BE</span>}
                  <div className="ab-v">
                    <div className="ab-list">{actions.map((a, k) => <div key={k} className="li">{hl(a)}</div>)}</div>
                    <div className="ab-result"><span className="ab-result-arrow">→</span>{result}</div>
                    {bov?.resultLink && (
                      <a className="ab-result-link" href={bov.resultLink.url} target="_blank" rel="noopener noreferrer">▶ {bov.resultLink.text}</a>
                    )}
                  </div>
                </div>
                {b.flow && b.flow.length > 0 && (
                  <ol className="w-flow">
                    {b.flow.map((f, k) => (
                      <li key={k} className="w-flow-step">
                        <span className="w-flow-badge">
                          <span className="w-flow-num">{k + 1}</span>
                          <span className="w-flow-name">{f.step}</span>
                          <span className="w-flow-desc">{f.desc}</span>
                        </span>
                        {k < b.flow!.length - 1 && <span className="w-flow-arrow">→</span>}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
              );
            })}
            {/* 담당 업무·백엔드/프론트엔드 개발 경험은 별도 섹션으로 다 나열하지 않는다 -
                blocks[]와 겹치는 항목이 대부분이라 중복이었다. 안 겹치는 나머지만 핵심 업무
                밑에 간략히 한 줄씩 덧붙인다. */}
            {!activeOverride?.hideSections?.includes("duties") && (dutiesOf(pr.pkey).length > 0 || devNotesOf(pr.pkey).length > 0 || (activeOverride?.extraDuties?.[pr.pkey ?? pr.title]?.length ?? 0) > 0) && (
              <div className="w-extra-duties-wrap">
                <div className="w-sub-h">{hasVisibleBlocks(pr) ? "그 외 담당 업무" : "담당 업무"}</div>
                <div className="w-extra-duties">
                  {(() => {
                    const extra = activeOverride?.extraDuties?.[pr.pkey ?? pr.title] ?? [];
                    const hideDuties = activeOverride?.hideDuties?.[pr.pkey ?? pr.title];
                    const base = [
                      ...dutiesOf(pr.pkey).map((it) => stripTag(it.text.split(" - ")[0])),
                      ...devNotesOf(pr.pkey).map((it) => it.text),
                    ].filter((t) => !hideDuties?.includes(t));
                    const ordered = activeOverride?.extraDutiesPosition?.[pr.pkey ?? pr.title] === "before"
                      ? [...extra, ...base]
                      : [...base, ...extra];
                    return ordered.map((t, i) => <div key={i} className="w-extra-duty-item">{t}</div>);
                  })()}
                </div>
              </div>
            )}
          </div>
          {activeOverride?.commonDutiesAfterKey === (pr.pkey ?? pr.title) && commonDutiesBlock}
          </Fragment>
        ))}

        {!activeOverride?.commonDutiesAfterKey && commonDutiesBlock}

        {!activeOverride?.hideSections?.includes("activities") && (
          <div className="w-activities">
            <div className="w-sec-title">대외활동 · 학습</div>
            {activeOverride?.activitiesNote && <p className="w-activities-note">{activeOverride.activitiesNote}</p>}
            {activities.filter((a) => !activeOverride?.hideActivities?.includes(a.title)).map((a, i) => (
              <div key={i} className="other-item">
                <div className="other-top"><span className="other-name">{a.title}</span><span className="other-meta">{a.org} · {a.year}</span></div>
                <div className="other-desc">{a.desc}</div>
                {a.notes.map((n, j) => !activeOverride?.hideActivityNotes?.[a.title]?.includes(j) && <div key={j} className="other-contrib">{hl(n)}</div>)}
              </div>
            ))}
            {activeOverride?.extraActivities?.map((a, i) => (
              <div key={"extra" + i} className="other-item">
                <div className="other-top">
                  <span className="other-name">
                    {a.url ? <a href={a.url} target="_blank" rel="noopener noreferrer">{a.title}</a> : a.title}
                  </span>
                  <span className="other-meta">{a.org} · {a.year}</span>
                </div>
                <div className="other-desc">{a.desc}</div>
                {a.notes?.map((n, j) => <div key={j} className="other-contrib">{hl(n)}</div>)}
              </div>
            ))}
          </div>
        )}

        {!activeOverride?.hideSections?.includes("skills-about") && (
          <>
            <div className="w-sec-title">Skills · About</div>
            <div className="w-two">
              <div>
                {skillsOrdered.map((g) => (
                  <div key={g.category} className="w-skill-line">
                    <b>{g.category}</b> · {g.items.join(", ")}
                  </div>
                ))}
              </div>
              <div>
                <div className="w-about-row"><span className="k">EMAIL</span><span className="v">{P.email}</span></div>
                <div className="w-about-row"><span className="k">GITHUB</span><a className="v" href={P.githubUrl} target="_blank" rel="noopener noreferrer">{P.github}</a></div>
                <div className="w-about-row"><span className="k">PORTFOLIO</span><a className="v" href={P.portfolioUrl} target="_blank" rel="noopener noreferrer">{P.portfolio}</a></div>
                <div className="w-about-row"><span className="k">CAREER</span><span className="v">{P.career.company} · 5년</span></div>
              </div>
            </div>
          </>
        )}

        {!activeOverride?.hideSections?.includes("education") && (
          <div className="w-edu-wrap">
            <div className="w-sec-title">Education · Certifications</div>
            <div className="w-two">
              <div>
                {P.education.map((e, i) => (
                  <div key={i} className="edu-item">
                    <div className="edu-school">{e.school}</div>
                    <div className="edu-degree">{e.degree}</div>
                    <div className="edu-meta">{e.period} · {e.status}</div>
                  </div>
                ))}
              </div>
              <div>
                {P.certs.filter((c) => !activeOverride?.hideCerts?.includes(c.name)).map((c, i) => (
                  <div key={i} className="cert-item">
                    <div className="cert-top"><span className="cert-name">{c.name}</span><span className="cert-date">{c.date}</span></div>
                    <div className="cert-issuer">{c.status} · {c.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeOverride?.blogLinkOverride && (
          <a
            className="w-blog-weapon"
            href={activeOverride.blogLinkOverride.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="w-blog-weapon-ar">▶</span>
            <span className="w-blog-weapon-tx">{activeOverride.blogLinkOverride.text}</span>
          </a>
        )}
      </div></div>
    </div>
  );
}
