import { Layers, Server, Database, BookOpen } from "lucide-react";

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

export function WithingRetrospective() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">프로젝트 회고</h2>
      <div className="space-y-5">

        <Section icon={Server} title="Next.js API Route - 프록시로 쓰다">
          <p>
            프론트엔드에서 백엔드와 AI 서버를 직접 호출하면 두 가지 문제가 생깁니다.
            하나는 <Highlight>CORS</Highlight>이고, 다른 하나는 <Highlight>Authorization 헤더</Highlight> 관리입니다.
            서버가 여러 개면 각 fetch마다 토큰을 직접 추가해야 하고, 클라이언트 코드에 백엔드 URL이 직접 노출됩니다.
          </p>
          <p>
            이 프로젝트에서는 Next.js <Highlight>API Route</Highlight>를 프록시 레이어로 두어 이 문제를 해결했습니다.
            브라우저는 항상 같은 도메인의 <code>/api/...</code>로 요청하고,
            API Route가 실제 백엔드나 AI 서버로 요청을 전달하면서 Authorization 헤더를 추가합니다.
          </p>
          <CodeBlock>{`// pages/api/recommend/dress.ts (API Route)
export default async function handler(req, res) {
  const token = req.headers.authorization;

  const response = await fetch(process.env.LLM_SERVER_URL + "/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,        // 서버에서 토큰 추가
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}

// 클라이언트에서는 /api/recommend/dress 만 알면 됨
fetch("/api/recommend/dress", { method: "POST", body: ... })`}</CodeBlock>
          <p>
            클라이언트 코드에서 AI 서버 URL이 사라지고, 토큰 처리 로직이 한 곳에 모입니다.
            환경 변수도 서버 사이드에서만 읽히므로 외부에 노출되지 않습니다.
          </p>
        </Section>

        <Section icon={Database} title="SHA256 해시 캐싱 - 540가지 조합을 미리 쌓다">
          <p>
            드레스 추천 로직은 <Highlight>체형</Highlight>과 <Highlight>스타일 선호도</Highlight> 조합에 따라
            GPT-4에게 프롬프트를 보내고 결과를 반환하는 구조입니다.
            문제는 GPT-4 호출 비용과 응답 지연이었습니다.
            체형 분류 3가지, 상체 타입 3가지, 하체 타입 3가지 등을 조합하면
            총 <Highlight>540가지</Highlight> 경우의 수가 나옵니다.
          </p>
          <p>
            입력 파라미터 조합을 <Highlight>SHA256</Highlight>으로 해시하여 MySQL에 캐시 키로 저장했습니다.
            같은 체형·스타일 조합이 들어오면 DB에서 즉시 반환하고,
            새로운 조합일 때만 GPT-4를 호출한 뒤 결과를 저장합니다.
          </p>
          <CodeBlock>{`# SHA256 해시로 캐시 키 생성
import hashlib, json

def make_cache_key(params: dict) -> str:
    serialized = json.dumps(params, sort_keys=True)
    return hashlib.sha256(serialized.encode()).hexdigest()

# 캐시 조회
cache_key = make_cache_key({"body_type": "A", "style": "romantic", ...})
cached = db.query("SELECT result FROM dress_cache WHERE cache_key = %s", cache_key)

if cached:
    return cached["result"]          # DB에서 즉시 반환

# 캐시 미스 → GPT-4 호출 후 저장
result = await call_gpt4(prompt)
db.execute("INSERT INTO dress_cache (cache_key, result) VALUES (%s, %s)",
           cache_key, result)`}</CodeBlock>
          <p>
            서비스 초기에 미리 540가지 조합을 모두 채워두면 이후 요청은 전부 캐시 히트됩니다.
            GPT-4 반복 호출 비용을 줄이면서도 응답 속도를 개선할 수 있었습니다.
          </p>
        </Section>

        <Section icon={Layers} title="웨딩홀 추천 - SQL 동적 쿼리와 조건 완화 폴백">
          <p>
            웨딩홀 추천은 GPT-4 대신 <Highlight>SQL 동적 쿼리 빌더</Highlight>로 구현했습니다.
            예산, 지역, 수용 인원, 분위기 등 여러 필터 조건을 조합하여 DB에서 직접 조회하는 방식입니다.
          </p>
          <p>
            문제는 조건이 많을수록 결과가 0건이 되는 경우입니다.
            이를 방지하기 위해 <Highlight>조건 완화 폴백 전략</Highlight>을 적용했습니다.
            전체 조건으로 조회 → 결과 없으면 부차적 조건 하나 제거 → 반복하여 최소한의 결과를 보장합니다.
          </p>
          <CodeBlock>{`# 조건 완화 폴백 전략
def recommend_halls(filters: dict):
    # 1차: 전체 조건으로 조회
    results = query_with_filters(filters)
    if results:
        return results

    # 2차: 분위기 조건 완화
    relaxed = {**filters}
    relaxed.pop("mood", None)
    results = query_with_filters(relaxed)
    if results:
        return results

    # 3차: 지역 조건 완화
    relaxed.pop("region", None)
    results = query_with_filters(relaxed)
    if results:
        return results

    # 최종: 예산 범위 확대
    relaxed["budget_max"] = relaxed["budget_max"] * 1.3
    return query_with_filters(relaxed)`}</CodeBlock>
          <p>
            드레스 추천(GPT-4)과 웨딩홀 추천(SQL)을 분리한 것은 의미 있는 선택이었습니다.
            드레스는 체형과 스타일에 대한 자연어 해석이 필요하지만,
            웨딩홀은 구조화된 필터 조건으로 충분히 처리할 수 있었습니다.
            LLM이 항상 정답이 아니라는 것을 직접 설계하면서 느꼈습니다.
          </p>
        </Section>

        <Section icon={BookOpen} title="성장과 배움">
          <p>
            PM으로서 기획부터 IA 설계, 와이어프레임까지 직접 작업하면서
            프론트엔드 개발 전에 구조를 먼저 잡는 경험을 했습니다.
            AI 서버를 직접 설계하면서 LLM을 쓸 곳과 쓰지 않을 곳을 구분하는 감각도 생겼습니다.
          </p>
          <div>
            <p className="font-medium text-foreground mb-3">이 프로젝트를 통해 얻은 것:</p>
            <ul className="space-y-2 ml-1">
              {[
                "Next.js API Route 프록시 패턴 - CORS 우회와 인증 헤더 중앙화를 동시에 해결하는 구조",
                "SHA256 해시 기반 MySQL 캐싱 - 동일 조합 재호출을 DB 조회로 대체하여 LLM 비용 절감",
                "SQL 동적 쿼리 + 조건 완화 폴백 - 구조화된 데이터에는 LLM보다 SQL이 적합함을 직접 확인",
                "DALL-E 2 + Paramiko SSH 파이프라인 - 이미지 생성부터 서버 업로드까지 자동화",
                "PM 역할 병행 - IA 설계와 WBS 관리를 직접 해보며 기획자의 시각으로 개발 우선순위 조정 경험",
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
