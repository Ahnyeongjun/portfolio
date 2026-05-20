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

export function SatelliteDataRetrospective() {
  return (
    <div className="space-y-10 text-muted-foreground leading-relaxed">

      <div className="space-y-4">
        <p>
          위성영상 AI 추론 파이프라인입니다.
          Sentinel·Landsat·다누리 등 10개 이상의 위성 소스에서 데이터를 수집해 AI 추론까지 이어지는 전 과정을 담당합니다.
          소스마다 다른 API·포맷·인증을 파이프라인이 모르도록 추상화하고,
          GPU 1장으로 추론 파드 70개를 동시에 운영하는 구조를 만드는 것이 이 프로젝트의 핵심이었습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">GPU 1장에서 70파드 — Aliyun GPUShare 메모리 분할</h3>
        <p>
          K8s는 기본적으로 GPU를 카운트 단위로 할당합니다.
          파드 하나가 GPU 하나를 통째로 점유하는 구조입니다.
          추론 모델 하나가 GPU 메모리를 1~2GiB밖에 안 쓰는데도 GPU 1장 전체를 독점하니
          자원의 90% 이상이 놀고 있었습니다.
        </p>
        <CodeBlock>{`# 기존 — GPU 카운트 단위, 파드 1개 = GPU 1장 점유
resources:
  limits:
    nvidia.com/gpu: 1

# Aliyun GPUShare — 메모리 단위 분할
resources:
  limits:
    aliyun.com/gpu-mem: 1  # 1GiB 단위 할당

# 결과: 물리 GPU 1장에서
# gprocessor 30파드 × 1GiB + inferencer 40파드 × 1GiB = 70파드 동시 운영`}</CodeBlock>
        <p>
          Aliyun GPUShare 스케줄러 익스텐더를 직접 구성해
          <Highlight>aliyun.com/gpu-mem</Highlight> 리소스 단위로 파드별 GPU 메모리를 할당할 수 있게 했습니다.
          GPU 노드에 node selector를 분리해 추론 워크로드와 일반 워크로드도 격리했습니다.
        </p>
        <p>
          자원을 더 구입하지 않고 스케줄러 확장으로 70배 더 많은 파드를 올린 결과,
          제한된 자원 안에서 얼마나 더 많은 것을 할 수 있는지가 인프라 설계의 핵심이라는 걸 다시 확인했습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">H_BASE/S_BASE — 신규 위성 소스 추가 클래스 1개로</h3>
        <p>
          다루는 위성 소스가 다누리(KPLO)·창천위성·Sentinel·Landsat·Planet·MODIS 등 10개가 넘었는데,
          각각 데이터 형식·API·인증 방식이 달랐습니다.
          소스마다 별도 코드를 짜다 보니 신규 위성 추가할 때마다 파이프라인 전체를 손봐야 했습니다.
        </p>
        <CodeBlock>{`# 수집 방식(HTTP/SFTP/API)에 따라 H_BASE 상속
class SentinelCollector(H_BASE):
    def fetch(self, params): ...   # 소스별 수집 로직만 구현

# 위성 소스 특성에 따라 S_BASE 상속
class KPLOSource(S_BASE):
    def parse(self, raw): ...      # 파싱·변환 로직만 구현

# 신규 소스 추가: 클래스 1개 구현 → 기존 파이프라인에 자동 통합
# geocode(Nominatim 리버스 지오코딩), inharv(수확 스케줄러) 변경 없음`}</CodeBlock>
        <p>
          수집 방식에 따라 H_BASE를, 위성 소스 특성에 따라 S_BASE를 상속하도록 표준화했습니다.
          신규 소스를 추가할 때는 해당 클래스 하나만 구현하면 기존 파이프라인에 자동으로 통합됩니다.
          geocode(Nominatim 리버스 지오코딩)와 inharv(다중 소스 수확 스케줄러)도 이 구조 위에 올렸습니다.
        </p>
        <p>
          처음엔 손이 더 갔지만 세 번째 소스부터 비용이 회수되기 시작했습니다.
          추상화는 "지금 필요한가"가 아니라 <Highlight>"얼마나 자주 반복될 것인가"</Highlight>로 판단해야 한다는 걸 체감했습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">OBB/HBB 자동 라우팅 — 객체 크기 기반 모델 선택</h3>
        <p>
          위성 영상 객체탐지에서 OBB(Oriented Bounding Box)는 회전된 경계 상자를 사용해
          항공기·선박처럼 방향이 있는 객체를 정밀하게 검출합니다.
          하지만 작은 객체는 OBB가 오히려 노이즈를 만들었습니다.
        </p>
        <CodeBlock>{`# 클래스별 크기 특성에 따라 모델 자동 라우팅
SMALL_CLASSES = {4, 5, 6, 7, 17}  # 소형 객체 클래스 (차량·소형선박 등)

def route_inference(image, class_ids):
    if any(c in SMALL_CLASSES for c in class_ids):
        return hbb_model.infer(image)   # 소형 → HBB
    return obb_model.infer(image)       # 일반 → OBB`}</CodeBlock>
        <p>
          객체 크기에 따라 <Highlight>OBB/HBB를 자동 라우팅</Highlight>하도록 설계했습니다.
          소형 클래스(4·5·6·7·17번)는 HBB 모델로, 나머지는 OBB 모델로 분기합니다.
          두 모델을 독립 파드로 배포해 각각 독립적으로 스케일링할 수 있게 했습니다.
        </p>
        <p>
          위성 영상 도메인 지식이 ML 설계에 직접 영향을 주는 부분이었습니다.
          좌표계(EPSG), COG 포맷, 다시기 영상 간 방사 차이 같은 도메인 특성을 모르면
          모델 서빙을 아무리 잘 짜도 전처리 단계에서 결과가 틀어집니다.
        </p>
      </div>

    </div>
  );
}
