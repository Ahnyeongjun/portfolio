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
  children,
  defaultOpen,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group border border-border rounded-xl overflow-hidden" open={defaultOpen}>
      <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none bg-muted/20 hover:bg-muted/30 transition-colors [list-style:none] [&::-webkit-details-marker]:hidden">
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-foreground text-sm">{title}</span>
          {hint && <span className="ml-2.5 text-xs text-muted-foreground">{hint}</span>}
        </div>
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
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">아키텍처</p>
        <div className="flex justify-center">
          <FlowNode sub="사용자 · 어드민 (Thymeleaf)">웹 프론트엔드</FlowNode>
        </div>
        <div className="flex justify-center text-muted-foreground text-xs">↓</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Spring Boot (inops-api-svr)</p>
            <FlowNode highlight sub="CRUD · 권한 · Outbox · 세션">API 서버</FlowNode>
          </div>
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Go (inias)</p>
            <FlowNode highlight sub="WMS · WMTS · MVT · 타일 캐싱">영상 서빙 서버</FlowNode>
          </div>
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Salt-Stack — Python (janus)</p>
            <div className="flex items-center gap-2">
              <FlowNode highlight sub="inharv · 10+ 소스">수집 스케줄러</FlowNode>
              <span className="text-muted-foreground text-xs shrink-0">→</span>
              <FlowNode sub="indps · GDAL · DB 등록">ETL 처리</FlowNode>
            </div>
          </div>
          <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">FastAPI + ONNX Runtime</p>
            <div className="flex gap-2">
              <FlowNode sub="YOLOv11m-obb + YOLOv11m · 20cls">객체탐지</FlowNode>
              <FlowNode sub="UPerNet+ConvNeXt · 6cls">세그멘테이션</FlowNode>
            </div>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex-1 border-t border-dashed border-border" />
          <span className="shrink-0 px-2">망연계 (외부망 ↔ 폐쇄망)</span>
          <div className="flex-1 border-t border-dashed border-border" />
        </div>
      </div>

      {/* 도입부 */}
      <p>
        다누리·창천위성·Sentinel·Landsat·Planet·MODIS 등 10개 이상 위성 소스를 수집·처리해
        객체탐지·세그멘테이션 AI 추론 결과를 CesiumJS 뷰어로 가시화하는 플랫폼.
        한국항공우주연구원 납품, 3인 팀, 2년.
      </p>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">핵심 기능</h2>

        {/* 1. ETL */}
        <AccordionSection
          title="위성 수집 · ETL 파이프라인"
          hint="Salt-Stack · GDAL COG 변환 · 신규 소스 추가 코드 수정 0건"
        >
          <p>
            소스마다 API·인증·파일 포맷이 상이해 신규 위성 추가 시 파이프라인 전체를 수정해야 했습니다.
            수집 스케줄러가 <Highlight>소스 종류를 모르게</Highlight> 설계해 해결했습니다.
            공통 추상 클래스가 인터페이스를 고정하고, 소스별 구현체는 달라지는 부분(파라미터·포맷 파싱)만 오버라이드했습니다.
            수집 후 GDAL COG 변환·재투영(EPSG:4326), 메타 추출, DB 카탈로깅까지 자동화해 <Highlight>신규 소스 추가 코드 수정 0건</Highlight>을 달성했습니다.
          </p>
          <CodeBlock>{`수집 스케줄러 → 파라미터 설정 → 검색 → 다운로드
ETL 모듈     → GDAL COG 변환 · 재투영(EPSG:4326) → 메타 추출 → DB 카탈로깅
소스별 구현체 — 달라지는 포맷 파싱만 오버라이드`}</CodeBlock>
        </AccordionSection>

        {/* 2. 망연계 */}
        <AccordionSection
          title="파일 기반 양방향 DB 동기화"
          hint="Debezium slot 반복 파손 → Outbox 직접 구현 · 이벤트 유실 0건"
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
            <Highlight>beforeCommit()</Highlight>으로 비즈니스 트랜잭션과 Outbox 저장을 원자적으로 처리하고,
            <Highlight>ThreadLocal OutboxContext</Highlight>로 폐쇄망 수신 데이터 재발행 시 무한 루프를 방지했습니다.
            <Highlight>이벤트 유실 0건</Highlight>.
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

        {/* 3. GPU */}
        <AccordionSection
          title="GPU 1장당 1파드 → 10파드"
          hint="일 처리량 200 → 3,000건"
        >
          <p>
            추론 모델 1개가 GPU 메모리를 1~2 GiB만 사용하지만 K8s 기본 할당은 파드 1개가 GPU 1장을 독점했습니다.
            A4000은 MIG 미지원이므로 Aliyun GPUShare 스케줄러 익스텐더를 적용해
            <Highlight>aliyun.com/gpu-mem</Highlight> 단위로 메모리를 분할했습니다.
            객체탐지·세그멘테이션 추론 서비스를 독립 파드로 분리하고 RabbitMQ 메시지 수 기반 오토스케일링을 적용해
            <Highlight>일 처리량 200건 → 3,000건 이상</Highlight>.
          </p>
          <CompareTable
            headers={["", "기존", "GPUShare 적용"]}
            rows={[
              { cells: ["리소스 키", "nvidia.com/gpu", "aliyun.com/gpu-mem"] },
              { cells: ["할당 단위", "1장 전체", "1 GiB"] },
              { cells: ["파드 / GPU", "1파드", "최대 10파드"], highlight: true },
            ]}
          />
        </AccordionSection>

        {/* 4. OD/SEG */}
        <AccordionSection
          title="OD mAP50 0.644 · SEG mIoU 0.7205 달성"
          hint="OBB/HBB 이원화 · 회전 aug 역효과 발견 · DINOv2 실패 → ConvNeXt-22k"
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
            <strong className="text-foreground">세그멘테이션</strong>은 나지(ground)↔도로(road) RGB 유클리드 거리가 8.2로
            색상만으로는 구분이 어려웠습니다.
            DINOv2 ViT-B/14를 적용했으나 기준선(0.72) 미달로 조기 종료했습니다.
            ImageNet-22k ConvNeXt-Base + 도로 중심선 보조 학습(Skeleton Head)으로
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

        {/* 5. 영상 서빙 */}
        <AccordionSection
          title="영상 서빙 속도 개선"
          hint="WMTS 타일 캐싱 2.4s → 0.4s · MVT 신규 구현 · CesiumJS 커스텀 프로바이더"
        >
          <p>
            수십~수백 MB GeoTIFF 원본을 그대로 내려주면 뷰어 렌더링이 불가능합니다.
            Go로 영상 서빙 서버를 구현하고 WMS·WMTS·MVT 세 프로토콜을 지원했습니다.
          </p>
          <CompareTable
            headers={["프로토콜", "방식", "용도"]}
            rows={[
              { cells: ["WMS", "요청마다 동적 렌더링", "임의 영역·해상도 조회"] },
              { cells: ["WMTS", "사전 분할 타일 디스크 캐싱", "반복 조회 즉시 응답 (2.4s → 0.4s)"], highlight: true },
              { cells: ["MVT", "객체탐지 결과 벡터 타일화", "줌 레벨별 탐지 결과 오버레이 (신규)"], highlight: true },
            ]}
          />
          <p>
            CesiumJS 표준 ImageryProvider로는 WMTS 커스텀 파라미터 제어가 불가해
            <Highlight>커스텀 ImageryProvider</Highlight>를 직접 구현했습니다.
            소스별 좌표계·타일 URL 패턴 차이를 단일 인터페이스로 추상화했습니다.
          </p>
        </AccordionSection>

        {/* 6. 테스트 */}
        <AccordionSection
          title="테스트 환경 구축"
          hint="JUnit · k6 50VU · 에러율 11.22% → 0%"
        >
          <p>
            E2E·API 테스트는 실제 위성 메타·추론 데이터가 DB에 있어야 유효했습니다.
            Mock DB로는 대체 불가하고 부하 테스트는 운영에 영향을 줄 수 없어
            운영과 동일한 구성의 격리 클러스터를 별도 구축했습니다.
            JUnit으로 비즈니스 로직·API 통합 테스트를, k6로 엔드포인트 부하 테스트를 수행했으며
            버전별 배포 검증도 이 환경에서 진행했습니다.
          </p>
          <p>
            PostGIS 쿼리 최적화 검증 결과: k6 50VU 에러율 <Highlight>11.22% → 0%</Highlight>,
            처리량 <Highlight>392 → 1,177 req/s</Highlight>.
          </p>
        </AccordionSection>

      </div>
    </div>
  );
}
