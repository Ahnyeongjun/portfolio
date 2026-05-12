# 이력서/포트폴리오 추가 가능 항목 — 최종 정리

> 탐색 완료: apiss / instationx / InOPS_APISS_2023 / ros_detection / work/inops_gaia  
> 기간·팀 규모 확정 / 수치 확정

---

## 1. 담당업무 — 추가/보강 항목

### 신규 항목

**ML 추론 서비스 개발** (apiss · 2024.12~)
- FastAPI + ONNX Runtime + CUDAExecutionProvider 기반 추론 서비스 3종 구현
- `object-detection`: YOLOv26 OBB/HBB 듀얼모델, 객체 크기 기반 자동 라우팅, 20클래스(선박·항공기·차량·교량 등), mAP ~70%, letterbox 1024px
- `segmentation`: UPerNet+ConvNeXt, 6클래스 토지피복(산림/수계/건물/도로), miou ~70%
- `inferencer`: Super-Resolution, rasterio GeoTIFF 직접 처리, 512×512 패딩

**K8s GPU 메모리 분할 운영** (instationx · 2024.10~)
- Aliyun GPUShare 스케줄러 익스텐더 적용 — `aliyun.com/gpu-mem` 단위 분할
- gprocessor 30파드 × 1GiB + inferencer 40파드 × 1GiB 동시 운영
- 물리 GPU 1장을 최대 70개 파드가 메모리 단위로 공유

**Go 기반 위성 이미지 처리 API** (apiss / instationx · 2024.10~)
- `image-api`: Go 1.23 + Gorilla Mux + godal(GDAL 바인딩), LayerInfo 캐시(TTL 1분), bbox/EPSG 쿼리, 캐시 히트 ~20ms
- `inias`: Go + GDAL, 위성 이미지 REST API, sync.Pool 동시 요청 처리

**위성 데이터 수집·워크플로우 오케스트레이션** (apiss · 2024.12~)
- Salt-Stack 기반 분산 워크플로우 엔진(janus) — H_BASE/S_BASE 추상 클래스로 수집기 표준화
- 다누리(KPLO)·창천위성·Sentinel·Landsat·Planet·MODIS 등 10+ 소스 동일 파이프라인
- geocode(Nominatim 리버스 지오코딩), inharv(다중 소스 수확 스케줄러) 포함

**드론 실시간 재난탐지 시스템** (ros_detection · 2024.10 ~ 2025.12, 팀 3명)
- ROS Noetic + Faster R-CNN ResNet50-FPN + RealSense D435 깊이 카메라
- 7클래스(폭발물/화재/부상자/탈출구/석유/사람), 추론 ~2~3fps
- 핀홀 카메라 모델 역투영으로 2D BBox → 3D 좌표 변환 (mm→m)
- 카메라→드론 좌표계 변환, ApproximateTimeSynchronizer RGB+Depth 동기화(slop=0.5s)
- 커스텀 ROS 메시지(MultiTarget/TargetData) 설계, UDP로 GCS 실시간 전송
- systemd 서비스 등록, 드론 부팅 시 자동 실행

**3D 위성 영상 뷰어 개발** (instationx viewer · 2024.10~)
- Next.js 15 + Cesium.js 3D 글로브, Mapbox 벡터 타일
- mgaia/apiss/moon 멀티 모드 지원

### 기존 항목 보강

**K8s 기반 인프라 운영** → GPU 노드 분리(node selector), Aliyun GPUShare 메모리 분할, OpenSearch+Fluent-bit 중앙 로깅 추가

**영상 표출 API 성능 개선** → Go image-api 레이어 캐싱(TTL 1분, 캐시 히트 ~20ms) 추가

---

## 2. 프로젝트 카드 — 신규

### 위성 영상 AI 분석 서비스 플랫폼
**apiss / instationx · 2024.10 ~ 진행 중 · 팀 3명**

현상: 위성 영상 분석 요청마다 수동 처리, GPU 서버 단일 모델 고정 사용으로 동시 처리 불가
원인: 추론 서비스 미분리, K8s GPU 할당이 카운트 단위라 1파드=1GPU 강제
해결:
- FastAPI + ONNX Runtime으로 추론 서비스 3종 독립 배포 (mAP ~70%)
- object-detection: OBB/HBB 듀얼모델 — 객체 크기 기반 자동 라우팅, 20클래스
- Aliyun GPUShare 스케줄러 익스텐더 직접 구성 — `aliyun.com/gpu-mem` 단위 분할

성과: 물리 GPU 1장에서 gprocessor 30파드 + inferencer 40파드 동시 점유, 70개 파드 병렬 추론

---

### 드론 실시간 재난탐지 시스템
**ros_detection · 2024.10 ~ 2025.12 · 팀 3명**

현상: 재난 현장 드론 영상에서 부상자·위험물 위치를 사람이 육안으로 식별
원인: 실시간 탐지 파이프라인 부재, 2D 영상만으로 거리 추정 불가
해결:
- ROS Noetic + Faster R-CNN ResNet50-FPN, 7클래스 실시간 탐지(~2~3fps)
- RealSense D435 depth 채널 활용, 핀홀 모델 역투영으로 2D→3D 좌표 변환
- 커스텀 ROS 메시지(MultiTarget/TargetData) 설계, UDP로 GCS 실시간 전송
- ApproximateTimeSynchronizer RGB+Depth 비동기 스트림 동기화

성과: 드론 탑재 GPU 실시간 추론, 3D 절대 좌표 GCS 자동 보고

---

### 위성 데이터 수집·처리 파이프라인
**apiss · 2024.12 ~ 진행 중 · 팀 3명**

현상: 위성 소스별 수집 로직 난립, 신규 위성 추가 시 파이프라인 전체 수정
원인: 소스별 하드코딩, 수집-카탈로그-잡 처리 강결합
해결:
- Salt-Stack 기반 분산 워크플로우 엔진(janus) — H_BASE/S_BASE 추상 클래스 표준화
- 다누리(KPLO)·창천위성·Sentinel·Landsat·Planet·MODIS 등 10+ 소스 동일 파이프라인
- Go + GDAL 이미지 API(inias) — bbox/EPSG 변환, 캐시 히트 ~20ms

성과: 신규 위성 소스 추가 시 수집기 클래스 1개만 구현, 파이프라인 수정 0건

---

## 3. 기존 프로젝트 — 내용 보강

### Outbox 패턴 라이브러리 (기존, 보강)
InOPS_APISS_2023 소스 확인 → 수치 추가 가능:
- 배치 1000건 / 60초 주기 / check interval 5초
- 13개 테이블 변경 자동 감지 (mc_user, mc_survey, mc_auth_grp, mc_menu 등)
- 파일 기반 비동기 전달 → 내부망↔폐쇄망 데이터 동기화

### 위성 영상 전처리 파이프라인 자동화 (기존, 보강)
- gprocessor J_ECD: 형태학적 필터링(3×3 kernel, 4회) + 그림자 제거, 변화 폴리곤 Shapefile
- gprocessor J_MCD: MambaCD SSM — MINIMA 정합 + ECDF 히스토그램 매칭 + 타일 추론
- COG 변환 + gdalwarp 멀티스레드 + EPSG:5179 재투영

---

## 4. 기술스택 — 추가 항목

| 카테고리 | 추가 |
|---|---|
| Backend | `Python`, `FastAPI`, `Go`, `C++` |
| ML/AI | `ONNX Runtime`, `PyTorch`, `OpenCV`, `ROS` |
| Infra | `OpenSearch`, `Fluent-bit`, `Salt-Stack` |
| Geospatial | `GDAL`, `PostGIS`, `rasterio`, `Cesium.js` |

---

## 5. 전체 커버리지 요약

| 프로젝트 | 기간 | 팀 | 주요 작업 |
|---|---|---|---|
| apiss | 2024.12 ~ 진행 중 | 3명 | object-detection, segmentation, inferencer, janus, inias, geocode, inharv |
| instationx | 2024.10 ~ 2026.03 | 3명 | image-api, gprocessor, inferencer, viewer, trainer, indk |
| ros_detection | 2024.10 ~ 2025.12 | 3명 | ROS detector, 커스텀 메시지, 3D 좌표 변환 |
| InOPS_APISS_2023 | - | - | Outbox 라이브러리 소스(기존 이력서 보강) |
| inops_gaia | 2022 ~ | - | MSA 전환, 어드민 인증, 이벤트 드리븐 등 (기존 이력서) |
