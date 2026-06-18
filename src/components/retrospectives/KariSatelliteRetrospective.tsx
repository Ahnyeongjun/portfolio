import React from 'react';

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto text-sm leading-relaxed font-mono text-foreground">
      {children}
    </pre>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-sm font-medium">
      {children}
    </span>
  );
}

function CompareTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: { cells: (string | React.ReactNode)[]; highlight?: boolean; muted?: boolean }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-muted/40 border-b border-border">
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 text-left text-xs font-medium text-muted-foreground/70 tracking-wide whitespace-nowrap">
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
                row.highlight
                  ? "bg-primary/5"
                  : row.muted
                  ? "opacity-50"
                  : "hover:bg-muted/20 transition-colors"
              }
            >
              {row.cells.map((cell, j) => (
                <td key={j} className={`px-3 py-2 ${row.highlight ? "text-foreground" : "text-muted-foreground"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FlowNode({ children, highlight, sub }: { children: React.ReactNode; highlight?: boolean; sub?: string }) {
  return (
    <div className={`px-3 py-1.5 rounded-md border text-xs font-medium text-center flex-1 ${
      highlight
        ? "bg-primary/10 border-primary/30 text-primary"
        : "bg-background border-border text-foreground"
    }`}>
      {children}
      {sub && <div className="font-normal text-muted-foreground mt-0.5">{sub}</div>}
    </div>
  );
}

function AccordionSection({
  title,
  hint,
  module: moduleName,
  children,
  defaultOpen,
}: {
  title: string;
  hint?: string;
  module?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group border border-border rounded-xl overflow-hidden" open={defaultOpen}>
      <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none bg-muted/20 hover:bg-muted/30 transition-colors [list-style:none] [&::-webkit-details-marker]:hidden">
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-foreground text-sm">{title}</span>
          {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
        </div>
        {moduleName && (
          <span className="shrink-0 px-1.5 py-0.5 text-[10px] font-medium rounded bg-primary/10 text-primary">
            {moduleName}
          </span>
        )}
        <svg
          className="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="px-5 pt-5 pb-4 space-y-4 text-muted-foreground border-t border-border">
        {children}
      </div>
    </details>
  );
}

export function KariSatelliteRetrospective({ description }: { description?: string }) {
  return (
    <div className="space-y-8 text-muted-foreground leading-relaxed">

      {/* 아키텍처 */}
      <div className="p-5 rounded-xl border border-border bg-muted/20 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">아키텍처 — 6개 모듈</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-primary/20 border border-primary/40" />
              단독 설계·구현
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-background border border-border" />
              일부 기여·고도화
            </span>
          </div>
        </div>

        {/* 프론트엔드 3개 */}
        <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">프론트엔드 (Thymeleaf · Spring MVC)</p>
          <div className="grid grid-cols-3 gap-2">
            <FlowNode highlight sub="AI 분석 신청 · 지구본 가시화">사용자 페이지</FlowNode>
            <FlowNode highlight sub="수집·분석 현황 어드민">관리자 페이지</FlowNode>
            <FlowNode highlight sub="서비스 소개">인트로 페이지</FlowNode>
          </div>
        </div>

        <div className="flex justify-center text-muted-foreground text-xs">↓</div>

        {/* 백엔드 3개 */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Spring Boot</p>
            <FlowNode highlight sub="API 200여 개 · 테이블 35개 · Outbox">API 서버</FlowNode>
          </div>
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Spring Boot</p>
            <FlowNode highlight sub="세션 · 권한 · SSO">Auth 서버</FlowNode>
          </div>
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Go</p>
            <FlowNode highlight sub="WMS · WMTS · MVT · 파일 다운로드">타일 / 파일 서버</FlowNode>
          </div>
        </div>

        {/* ETL + AI */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Salt-Stack · Python</p>
            <FlowNode sub="10+ 소스 · GDAL COG">수집 · ETL</FlowNode>
          </div>
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">FastAPI + ONNX Runtime</p>
            <FlowNode highlight sub="OD · SEG · SR · 200→3,000건/일">AI 추론</FlowNode>
            <p className="text-xs text-muted-foreground/70">Aliyun GPUShare — GPU당 10파드 자동 분할</p>
          </div>
        </div>

        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex-1 border-t border-dashed border-border" />
          <span className="shrink-0 px-2">망연계 (외부망 ↔ 폐쇄망) · Kubernetes · PostgreSQL</span>
          <div className="flex-1 border-t border-dashed border-border" />
        </div>
      </div>

      {/* 도입부 */}
      <p>
        항공우주연구원이 발사한 초소형위성 20기의 군집위성 데이터를 수집·처리·가시화하는 통합 플랫폼입니다.
        사용자는 객체탐지·변화탐지·영상분할 등 AI 분석을 신청하고, CesiumJS 지구본 위에서
        시계열 비교와 분할화면으로 결과를 직접 확인할 수 있습니다.
      </p>
      <p>
        어드민 페이지에서는 위성별 수집 현황과 분석 진행 상황을 한눈에 모니터링합니다.
        API 200여 개·테이블 35개 규모의 시스템을 6개 서비스 모듈로 구성했으며,
        ETL 파이프라인을 제외한 나머지 모듈 전체를 처음부터 설계·구현했습니다. 3인 팀, 2년.
      </p>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">핵심 기능</h2>

        {/* 1. 성능·보안 */}
        <AccordionSection
          title="부하 테스트 기반 성능·보안 개선"
          hint="보안 체크리스트 선행 · JUnit 통합 테스트 · k6 50VU 에러율 11.22% → 0%"
          module="API 서버"
        >
          <p>
            국가기관 납품 특성상 보안 요구사항이 엄격했습니다.
            납품 전 보안 체크리스트를 직접 작성해 개발 단계마다 선제 반영했고,
            JUnit으로 비즈니스 로직과 API 통합 테스트를 작성했습니다.
          </p>
          <p>
            부하 테스트는 실제 위성 데이터가 있어야 유효해 운영과 동일한 구성의 격리 클러스터를 별도 구축했습니다.
            k6 50VU로 테스트하자 에러율 11.22%가 나왔고, 병목 원인은 세 가지였습니다.
          </p>
          <ul className="space-y-2 list-none">
            <li className="flex gap-2">
              <span className="shrink-0 text-primary font-medium text-sm mt-0.5">①</span>
              <span><Highlight>위성 메타 목록</Highlight> — 페이지네이션 없이 전체 행 반환, 파라미터가 없어도 매 요청마다 <Highlight>PostGIS ST_INTERSECTION</Highlight> 실행</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-primary font-medium text-sm mt-0.5">②</span>
              <span><Highlight>수집 현황 집계</Highlight> — CTE에 명시적 JOIN 조건 없어 카테시안 곱 발생 → 타임아웃</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-primary font-medium text-sm mt-0.5">③</span>
              <span><Highlight>알람 팝업 목록</Highlight> — base64 PNG BLOB을 목록 쿼리에 포함, HikariCP 커넥션 30개 독점 → 전체 요청 연쇄 타임아웃</span>
            </li>
          </ul>
          <p>
            조건부 PostGIS 실행, 기본 페이지네이션, BLOB 컬럼 목록·상세 분리, Redis 캐싱으로 수정했습니다.
            이 과정에서 32개 MyBatis 매퍼의 ORDER BY 파라미터가 쿼리에 직접 삽입되는
            <Highlight>SQL injection</Highlight> 취약점도 발견해 화이트리스트 검증으로 교체했습니다.
          </p>
          <CompareTable
            headers={["", "전", "후"]}
            rows={[
              { cells: ["위성 메타 목록", "38초", "159ms (239배)"], highlight: true },
              { cells: ["수집 현황 집계", "46초 (타임아웃)", "181ms (256배)"], highlight: true },
              { cells: ["알람 팝업 목록", "25초", "104ms → 20ms (캐시)"], highlight: true },
              { cells: ["50VU 에러율", "11.22%", "0%"], highlight: true },
              { cells: ["처리량", "392 req/s", "1,177 req/s"] },
            ]}
          />
        </AccordionSection>

        {/* 2. 망연계 */}
        <AccordionSection
          title="파일 기반 양방향 DB 동기화"
          hint="Debezium slot 반복 파손 → Outbox 직접 구현 · 이벤트 유실 0건"
          module="API 서버 · 망연계"
        >
          <p>
            국가기관 납품 환경으로 외부망↔폐쇄망이 물리 분리됐습니다.
            위성 메타·추론 결과(외부→폐쇄)와 사용자 요청·처리 상태(폐쇄→외부) 양방향 동기화가 필요했습니다.
          </p>
          <p>
            앱 코드 수정 없이 DB 변경 로그를 읽는 Debezium CDC를 초기 도입했습니다.
            그러나 운영 중 <Highlight>replication slot 반복 파손</Highlight>으로 매번 전체 스냅샷 재수행이 필요했습니다.
          </p>
          <p>
            CDC 의존을 제거하고 MyBatis Executor 인터셉터 기반 Outbox 라이브러리를 직접 구현했습니다.
            <Highlight>beforeCommit()</Highlight>으로 비즈니스 트랜잭션과 Outbox 저장을 원자적으로 묶고,
            <Highlight>ThreadLocal OutboxContext</Highlight>로 폐쇄망 수신 데이터 재발행 시 무한 루프를 방지해
            이벤트 유실 없이 안정적으로 운영할 수 있었습니다.
          </p>
          <CodeBlock>{`@Intercepts({ @Signature(type = Executor.class, method = "update", ...) })
public class OutboxInterceptor implements Interceptor {
    public Object intercept(Invocation inv) throws Throwable {
        Object result = inv.proceed();
        if (OutboxContext.isReplay()) return result; // 무한루프 방지
        captureOutboxEvent(inv);
        return result;
    }
}

@Override
public void beforeCommit(boolean readOnly) {
    outboxRepository.saveAll(OutboxContext.flush()); // 같은 트랜잭션, 원자적 저장
}`}</CodeBlock>
        </AccordionSection>

        {/* 3. 영상 서빙 */}
        <AccordionSection
          title="영상 서빙 속도 개선"
          hint="WMTS 타일 캐싱 2.4s → 0.4s · MVT 신규 구현"
          module="타일 / 파일 서버"
        >
          <p>
            수십~수백 MB GeoTIFF 원본을 그대로 내려주면 뷰어가 렌더링하지 못합니다.
            Go로 영상 서빙 서버를 구현하고, 조회 목적에 따라 세 가지 프로토콜을 지원했습니다.
          </p>
          <CompareTable
            headers={["프로토콜", "방식", "용도"]}
            rows={[
              { cells: ["WMS", "요청마다 동적 렌더링 · 좌표 기반 캐싱 불가", "고정 단일 영역에만 사용 — 좌표가 매번 달라 캐시 히트율 0%에 수렴"] },
              { cells: ["WMTS", "사전 분할 타일 디스크 캐싱", "반복 조회 즉시 응답 (2.4s → 0.4s)"], highlight: true },
              { cells: ["MVT", "ETL 사전 생성 · 줌 레벨별 자동 단순화", "객체탐지 결과 오버레이 (~5분 → 1초 이내)"], highlight: true },
            ]}
          />
          <p className="font-medium text-foreground">GeoJSON → MVT 전환</p>
          <p>
            기존에는 객체탐지 결과를 <Highlight>GeoJSON으로 요청마다 동적 생성</Highlight>해 내려줬습니다.
            영역 기반 조회 특성상 캐시 히트율이 낮아 캐싱 효과도 없었고,
            GeoJSON은 줌 레벨과 무관하게 항상 풀 디테일로 직렬화되기 때문에
            멀리서 볼 때도 수십만 개 좌표를 전부 전송했습니다.
          </p>
          <p>
            ETL 파이프라인에서 탐지 결과를 <Highlight>MVT(Mapbox Vector Tile)로 사전 생성</Highlight>하도록 바꿨습니다.
            MVT는 줌 레벨별로 형상을 자동 단순화해 멀리서는 적은 데이터만, 확대할수록 정밀한 형상을 전송합니다.
            요청 시 생성 없이 미리 만들어진 타일을 바로 서빙하므로 체감 속도가 완전히 달라졌습니다.
          </p>
          <CompareTable
            headers={["구분", "GeoJSON 동적 생성", "MVT 사전 생성"]}
            rows={[
              { cells: ["응답 시간", "~5분 (탐지 결과 규모에 따라)", "1초 이내"], highlight: true },
              { cells: ["클라이언트 사양", "i5 이상 필요", "펜티엄급에서도 동작"], highlight: true },
              { cells: ["줌 대응", "풀 디테일 고정", "줌 레벨별 자동 단순화 — 확대해도 보이는 영역만"], highlight: true },
              { cells: ["캐시 효율", "영역 기반 — 히트율 낮음", "타일 단위 — 재사용 가능"] },
              { cells: ["생성 시점", "요청마다 실시간", "ETL 완료 시 자동"] },
            ]}
          />
          <p>
            MVT는 확대할수록 디테일이 올라가지만 <Highlight>가시 영역 자체가 좁아지기 때문에</Highlight>
            전송·렌더링해야 할 데이터량은 오히려 일정하게 유지됩니다.
            GeoJSON처럼 전체 탐지 결과를 한 번에 내려주지 않아 클라이언트 메모리 부담이 크게 줄었고,
            사양 제약이 있는 현장 운용 환경에서도 원활하게 동작하게 됐습니다.
          </p>
        </AccordionSection>

        {/* 4. OD/SEG */}
        <AccordionSection
          title="관심정보 객체탐지 · 변화탐지 세그멘테이션 성능 향상"
          hint="객체탐지 mAP50 0.644 · 세그멘테이션 mIoU 0.7205"
          module="AI 추론"
        >
          <p>
            <strong className="text-foreground">객체탐지</strong>는 20클래스를 OBB·HBB로 이원화했습니다.
            회전 방향이 식별에 중요한 함선·항공기 등 대형 15cls는 OBB(YOLOv11m-obb),
            위치만 중요한 차량·트럭 소형 5cls는 HBB(YOLOv11m)로 분리했습니다.
            위성은 나디르(직하방) 고정 촬영이라 객체 방향이 이미 정렬되어 있어
            45° 회전 augmentation 적용 시 mAP50이 오히려 하락했습니다.
          </p>
          <CompareTable
            headers={["모델", "타입", "augmentation", "mAP50"]}
            rows={[
              { cells: ["YOLOv11m", "HBB", "mosaic + mixup + copy_paste", "0.644"], highlight: true },
              { cells: ["YOLOv11m", "HBB", "+ degrees=45 회전", "0.577 ↓"], muted: true },
              { cells: ["YOLOv11m-obb", "OBB", "mosaic only (ProBIoU OOM 방지)", "0.604"], highlight: true },
            ]}
          />
          <p>
            <strong className="text-foreground">세그멘테이션</strong>은 땅(나지)과 도로가 색상이 유사해 픽셀 분류 자체가 까다로웠습니다.
            DINOv2 ViT-B/14를 적용했으나 목표 mIoU 0.72에 미달해 조기 종료했습니다.
            ImageNet-22k ConvNeXt-Base에 도로 중심선 보조 학습(Skeleton Head)을 추가해
            최종 <Highlight>mIoU 0.7205</Highlight>를 달성했습니다.
          </p>
          <CompareTable
            headers={["backbone", "decoder", "mIoU", "비고"]}
            rows={[
              { cells: ["ConvNeXt-Base (ImageNet-22k)", "UPerNet + Skeleton Head", "0.7205", "✓ 최종 채택"], highlight: true },
              { cells: ["HRNet-W48 (ImageNet-1k)", "UPerNet", "0.6857", ""] },
              { cells: ["DINOv2 ViT-B/14", "UPerNet", "0.6656", "조기 종료"], muted: true },
            ]}
          />
        </AccordionSection>

      </div>
    </div>
  );
}
