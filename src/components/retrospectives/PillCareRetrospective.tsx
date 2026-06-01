import { Zap, Layers, Brain, Database, BookOpen } from "lucide-react";

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

export function PillCareRetrospective() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">프로젝트 회고</h2>
      <div className="space-y-5">

        <Section icon={Brain} title="건강 위험 지수 설계 — 분산된 데이터를 하나의 점수로">
          <p>
            복약 기록, 증상 일지, 외부 환경 데이터가 따로 존재하면 사용자는 지금 자신의
            건강 상태가 어느 정도 위험한지 직관적으로 알기 어렵습니다.
            이 문제를 해결하고자 5개 도메인을 가중합하는 0~100점 건강 위험 지수를 설계했습니다.
          </p>
          <CodeBlock>{`# 건강 위험 지수 (Health Index) 산출 — 5개 도메인 가중합
health_index = (
    medication_adherence_score * 0.25  # 복약 순응도
  + disease_trend_score        * 0.25  # 질환 추이
  + dur_safety_score           * 0.20  # 식약처 DUR 안전성
  + symptom_trend_score        * 0.15  # 증상 추이
  + environment_index          * 0.15  # 환경지수 (날씨·미세먼지)
)`}</CodeBlock>
          <p>
            각 도메인은 독립적으로 계산되어 DB에 캐싱되고, 스케줄러가 매일 자정
            전체 사용자의 지수를 재계산합니다. 가중치는 만성질환 예방 관리
            지침의 복약 순응도 중요도를 참고해 설정했습니다.
          </p>
          <p>
            단일 점수로 내리는 것에 대한 고민이 있었는데, 점수를 내릴 때
            <Highlight>어떤 도메인이 낮은지</Highlight>를 함께 표시하는 방식으로
            정보 손실 없이 요약값과 세부 원인을 동시에 전달하도록 설계했습니다.
          </p>
        </Section>

        <Section icon={Zap} title="환경 데이터 × 건강 알림 — 컨텍스트 기반 트리거">
          <p>
            단순히 복약 시간을 알려주는 것에서 나아가, 오늘 환경이 특정 질환에
            미치는 영향까지 알림에 반영하고 싶었습니다.
            기상청·에어코리아·식약처 DUR 세 가지 외부 API를 스케줄러로 주기 수집해
            알림 트리거 조건에 결합했습니다.
          </p>
          <CodeBlock>{`# 알림 트리거 조건 예시
# 고혈압 환자 + 기온 급변(일교차 10°C 이상) → 경고 알림
if user.has_disease("hypertension") and weather.temp_diff >= 10:
    notify(user, level="WARNING", reason="기온 급변 — 혈압 변동 주의")

# 호흡기 질환 환자 + 미세먼지 나쁨(PM2.5 > 35) → 외출 자제 알림
if user.has_disease("respiratory") and air.pm25 > 35:
    notify(user, level="CAUTION", reason="미세먼지 나쁨 — 외출 시 마스크 착용")`}</CodeBlock>
          <p>
            외부 API 응답은 <Highlight>AsyncPG + FastAPI</Highlight> 비동기 구조로 처리했습니다.
            날씨·미세먼지 API는 지역 코드 기반 응답이라 사용자 좌표를 행정구역 코드로
            변환하는 매핑 테이블을 별도로 관리했습니다.
          </p>
        </Section>

        <Section icon={Layers} title="AI Hub ResNet — 알약 이미지로 약품명 추론">
          <p>
            복약 등록 시 약품명을 직접 검색하는 것은 번거롭고 오기입 위험이 있습니다.
            AI Hub에서 제공하는 알약 이미지 분류 ResNet 모델을 활용해
            사진 한 장으로 약품명을 자동 추론하는 파이프라인을 구성했습니다.
          </p>
          <CodeBlock>{`# 알약 인식 파이프라인
# 1. 프론트: 사용자가 알약 사진 촬영 → multipart/form-data로 업로드
# 2. 백엔드: AI Hub ResNet 모델로 추론 → 약품 코드 반환
# 3. 식약처 DUR API에서 약품 코드로 상세 정보 조회 → 복약 등록

# FastAPI 추론 엔드포인트
@router.post("/drugs/recognize")
async def recognize_pill(image: UploadFile):
    img_tensor = preprocess(await image.read())   # 전처리
    pred = model(img_tensor)                       # ResNet 추론
    drug_code = label_map[pred.argmax().item()]    # 코드 매핑

    # 식약처 DUR API로 약품 상세 정보 조회
    drug_info = await mfds_client.get_drug(drug_code)
    return drug_info`}</CodeBlock>
          <p>
            파인튜닝 없이 AI Hub 제공 가중치를 그대로 사용했기 때문에
            인식률은 모델 성능에 의존합니다.
            대신 추론 결과에 <Highlight>confidence score</Highlight>를 함께 반환해,
            낮은 신뢰도일 때는 UI에서 "직접 검색"을 권유하는 폴백 흐름을 설계했습니다.
          </p>
          <p>
            식약처 DUR 연동 덕분에 약품명뿐 아니라 병용 금기·주의 성분까지
            등록 시점에 바로 표시할 수 있어 안전성 확인 흐름이 자연스럽게 이어졌습니다.
          </p>
        </Section>

        <Section icon={Database} title="헬스케어 UI 설계 — 정보 계층과 위험도 시각화">
          <p>
            헬스케어 앱에서 가장 중요한 것은 <Highlight>사용자가 정보를 읽는 데 인지 부하를 줄이는 것</Highlight>입니다.
            이미지에 나타난 홈 대시보드를 설계할 때 3단 정보 계층을 의식적으로 구성했습니다.
          </p>
          <div>
            <p className="font-medium text-foreground mb-3">홈 대시보드 3단 구조:</p>
            <ul className="space-y-2 ml-1">
              {[
                "최상단 — AI 건강 브리핑 카드: 점수 + 오늘 주의사항 2줄 (스캔 단계)",
                "중단 — 오늘 복약 현황: 복용/미복용 약 목록, 진행률 (확인 단계)",
                "하단 — 건강 습관 트래커: 수면·운동·수분 섭취 (기록 단계)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p>
            위험 지수 숫자(38, 72 등)는 크기와 색상을 동시에 변환합니다.
            낮은 점수는 파란색·작게, 높은 점수는 빨간색·크게 표시해
            숫자를 읽지 않아도 위험도를 직관적으로 인지할 수 있도록 했습니다.
          </p>
        </Section>

        <Section icon={BookOpen} title="성장과 배움">
          <div>
            <p className="font-medium text-foreground mb-3">이 프로젝트를 통해 얻은 것:</p>
            <ul className="space-y-2 ml-1">
              {[
                "건강 도메인 데이터 모델링 — 복약·질환·일지·예약·알림 6개 도메인 간 관계 설계",
                "FastAPI AsyncPG — Python 비동기 ORM으로 I/O 집약적 외부 API 호출 처리",
                "AI Hub 추론 파이프라인 — confidence score 기반 폴백으로 낮은 신뢰도 처리, 식약처 DUR 연동으로 병용 금기 등록 시점 표시",
                "헬스케어 UI 설계 원칙 — 인지 부하 최소화를 위한 정보 계층 구조와 위험도 시각화",
                "Tailwind CSS v4 — CSS-first 설정 방식과 새 유틸리티 클래스 체계 적응",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

      </div>
    </section>
  );
}
