import { MapPin, Compass, Filter, Satellite, FileWarning } from "lucide-react";

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-sm font-medium">
      {children}
    </span>
  );
}

export function InsopsRetrospective() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">프로젝트 회고</h2>
      <p className="text-muted-foreground leading-relaxed mb-5">
        다종 위성영상을 판독·변화탐지하는 국가보안기관 대상 플랫폼(INSOPS)의 프론트엔드(inops-das)와
        API(inops-api-svr)를 2년간 담당했습니다. Spring Boot·MyBatis·PostGIS·CesiumJS 기반의
        9개 모듈 멀티 모듈 프로젝트로, 판독보고서·AOI 관리·촬영계획·변화탐지 등 분석관이 매일 쓰는
        기능을 end-to-end로 다뤘습니다.
      </p>
      <div className="space-y-5">

        <Section icon={MapPin} title="촬영계획 → AOI 자동 생성">
          <p>
            긴급 촬영 주문이 들어오면 분석관이 동일한 좌표 정보를 <Highlight>AOI로 다시 수동 등록</Highlight>해야
            했습니다. 촬영 주문에 이미 있는 좌표·반경 데이터를 그대로 활용해 긴급(PS+우선순위) 플래그가
            있는 주문이 등록될 때 AOI 레코드를 자동으로 생성하도록 만들어, 이중 입력을 없앴습니다.
          </p>
        </Section>

        <Section icon={Compass} title="좌표 표시 — DD/DMS 듀얼 포맷">
          <p>
            좌표 표기 방식(위경도 우선 vs 경위도 우선)이 고정돼 있어, 협업하는 분석관마다 익숙한 표기가
            달라 매번 헷갈리는 문제가 있었습니다. 라디오 버튼으로 표기 순서를 전환할 수 있게 하고,
            CesiumJS 좌표 계산 로직과 DD(십진도)·DMS(도분초) 포맷터 양쪽에 이 값을 반영해
            토글 즉시 화면이 갱신되도록 했습니다.
          </p>
        </Section>

        <Section icon={Filter} title="AOI 조회 성능 — 당일 데이터만 필터링">
          <p>
            AOI 관리 화면이 과거 데이터까지 전부 표출해 그리드가 무거워지고 있었습니다.
            등록일 컬럼을 기준으로 <Highlight>당일 데이터만</Highlight> 조회하도록 MyBatis 쿼리 조건을
            추가했습니다. 분석관이 실제로 확인해야 하는 건 그날 들어온 긴급/일반 AOI뿐이라,
            조회 대상 자체를 줄이는 방향으로 접근했습니다.
          </p>
        </Section>

        <Section icon={Satellite} title="변화탐지 매칭 범위 확대 — 위성 소스 우선순위 재설계">
          <p>
            시계열 변화탐지 분석에서 비교할 위성 영상을 고를 때, 시간창 제약이 지나치게 좁고 우선순위
            로직에 신규 위성(PNEO)이 반영돼 있지 않아 비교 대상이 누락되는 경우가 있었습니다.
            시간창 제약을 완화하고, WV3 → WV2 → PNEO → K3A → K3 순으로 우선순위를 다시 정렬해
            더 넓은 범위에서 적절한 비교 영상을 찾을 수 있도록 했습니다.
          </p>
        </Section>

        <Section icon={FileWarning} title="판독보고서 데이터 정합성 버그">
          <p>
            분석관이 판독보고서 작성 시 해외지역 여부를 "예"로 체크했는데, 저장 후 다시 조회하면
            "아니오"로 표시되는 버그가 보고됐습니다. 원인은 MyBatis 매퍼의 INSERT 파라미터
            바인딩 순서가 실제 테이블 컬럼 순서와 어긋나 있던 것이었습니다. 매퍼의 파라미터 순서를
            테이블 스키마에 맞게 정정해 지정학적으로 중요한 메타데이터가 정확히 저장되도록 했습니다.
          </p>
        </Section>

      </div>
    </section>
  );
}
