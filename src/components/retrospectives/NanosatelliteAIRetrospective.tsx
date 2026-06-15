function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-sm font-medium">
      {children}
    </span>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left font-semibold text-foreground whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-2.5 text-muted-foreground">
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

export function NanosatelliteAIRetrospective() {
  return (
    <div className="space-y-10 text-muted-foreground leading-relaxed">

      <div className="space-y-4">
        <p>
          초소형군집위성 영상을 대상으로 객체탐지(HBB/OBB)와 토지피복 세그멘테이션 모델을
          개발했습니다. 4×A4000 GPU DDP 환경에서 수십 회 실험을 반복하며
          데이터 증강 전략·손실 함수·디코더 구조를 체계적으로 탐색했습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">객체탐지 — HBB 실험 결과</h3>
        <p>
          20클래스 HBB 탐지 모델을 중심으로 모델 아키텍처와 증강 전략을 비교했습니다.
          <Highlight>mosaic + mixup + copy_paste + randaugment</Highlight> 복합 증강이
          단일 증강 대비 가장 높은 성능을 보였습니다.
        </p>
        <Table
          headers={["실험", "모델", "증강 전략", "mAP50", "비고"]}
          rows={[
            ["training_02", "yolo26m", "default", "0.327", ""],
            ["training_05", "yolo26m", "default", "0.390", "20cls"],
            ["training_07", "yolo11m", "degrees=45 (강한 회전)", "0.344", "회전 역효과"],
            ["training_06", "yolo11m", "mosaic+mixup+copy_paste+randaugment", <span key="a" className="text-green-600 font-semibold">0.644 ★</span>, "BEST"],
          ]}
        />
        <p>
          강한 회전 증강(degrees=45)이 axis-aligned BBox를 왜곡해 오히려 mAP가 하락했습니다.
          HBB에서는 회전 증강을 적용하지 않는 것이 최적임을 확인했습니다.
          또한 yolo11m이 동일 조건에서 yolo26m 대비 <Highlight>+2.1%p(0.623→0.644)</Highlight> 우세했습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">객체탐지 — OBB 실험 결과</h3>
        <p>
          OBB는 probiou loss 계산이 메모리를 많이 사용하는데,
          mosaic 증강과 조합하면 인스턴스 수가 폭증해 <Highlight>OOM이 발생</Highlight>했습니다.
          보수적 증강(mosaic만)으로 전환해 안정적인 학습을 달성했습니다.
        </p>
        <Table
          headers={["실험", "증강 전략", "mAP50", "비고"]}
          rows={[
            ["training_01~02", "norotate / 초기", "—", "best 없음"],
            ["training_04", "mosaic + 강한 aug", "—", "OOM 실패"],
            ["training_05", "mosaic + 강한 aug + 패치", "0.466", "probiou 패치 버그"],
            ["training_03", "보수적 (mosaic만)", <span key="a" className="text-green-600 font-semibold">0.604 ★</span>, "BEST"],
          ]}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">세그멘테이션 — 주요 실험 결과 (39회 중 발췌)</h3>
        <p>
          ConvNeXt-Base(ImageNet-22k pretrained) + UPerNet 조합을 기반으로
          손실 함수, 디코더, 외부 데이터, Skeleton Head를 단계적으로 탐색했습니다.
        </p>
        <Table
          headers={["실험", "백본+디코더", "손실 함수", "데이터", "mIoU", "비고"]}
          rows={[
            ["training_02", "ConvNeXt-B + UPerNet", "CE+Dice", "korean(725)", "0.7064", "baseline"],
            ["training_03", "ConvNeXt-B + UPerNet", "Focal+Lovász", "korean(725)", "0.7147", "손실 개선"],
            ["training_14", "ConvNeXt-B + UPerNet", "CE+Dice", "korean+aihub(4,486)", "0.7189", "외부데이터 best"],
            ["training_17", "ConvNeXt-B + GLTB", "CE+Dice", "korean(725)", "0.7135", "앙상블용"],
            ["training_23", "HRNet-W48 + UPerNet", "CE+Dice", "korean+lc_v3", "0.6857", "HRNet 열세"],
            ["training_26", "ConvNeXt-B + UPerNet+Skeleton", "CE+Tversky+Lovász", "korean(725)", <span key="a" className="text-green-600 font-semibold">0.7205 ★</span>, "BEST"],
          ]}
        />
        <p className="text-sm text-muted-foreground/70">
          ※ training_26 TTA 적용 시 mIoU 0.7222 / 에러 이미지 11장 제외 시 0.7338
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">road↔ground 오분류 — 색감으로 구분 불가능한 한계</h3>
        <p>
          가장 어려운 문제는 도로(road)와 나지(ground) 클래스 간 오분류였습니다.
          Confusion matrix를 분석해 보니 두 클래스의
          <Highlight>RGB 유클리드 거리가 8.2</Highlight>로, 색감만으로는 구분이 불가능한 수준이었습니다.
          Gabor 질감 거리(7.6)도 마찬가지였습니다.
          0.5m 해상도에서 질감이 뭉개지는 한계입니다.
        </p>
        <Table
          headers={["클래스 쌍", "RGB 유클리드 거리", "판단"]}
          rows={[
            ["road ↔ ground", "8.2", "색감 구분 불가 (Gabor 7.6도 동일)"],
            ["road ↔ building", "48.3", "구분 가능"],
            ["forest ↔ meadow", "22.1", "경계에서 혼동"],
          ]}
        />
        <p>
          형태 정보로 보완하기 위해 <Highlight>Skeleton Head</Highlight>를 추가했습니다.
          고해상도 feature에서 도로 중심선을 별도로 예측하게 해
          모델이 도로의 선형 구조를 직접 학습하도록 유도했습니다.
          이미지별 road↔ground 색상 거리를 분석하면 거리 &gt; 20인 이미지가 46%(41장)로,
          이 케이스에서는 형태 학습이 실질적인 개선 효과를 냈습니다.
        </p>
      </div>

    </div>
  );
}
