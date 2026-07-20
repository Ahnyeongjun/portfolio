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
    <div className={`px-3 py-1.5 rounded-md border text-xs font-medium text-center flex-1 ${highlight
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

export function RosDetectionRetrospective() {
  return (
    <div className="space-y-8 text-muted-foreground leading-relaxed">

      {/* 아키텍처 */}
      <div className="p-5 rounded-xl border border-border bg-muted/20 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">아키텍처 - ROS1 Noetic → ROS2 Humble</p>

        <div className="flex justify-center">
          <FlowNode highlight sub="RGB + Depth 토픽">RealSense 카메라</FlowNode>
        </div>
        <div className="flex justify-center text-muted-foreground text-xs">↓</div>
        <div className="flex justify-center">
          <FlowNode highlight sub="ApproximateTimeSynchronizer">RGB/Depth 시간 동기화</FlowNode>
        </div>
        <div className="flex justify-center text-muted-foreground text-xs">↓</div>
        <div className="flex justify-center">
          <FlowNode sub="Faster R-CNN, GPU · RGB 프레임 입력">객체 탐지 (팀원 작성)</FlowNode>
        </div>
        <div className="flex justify-center text-muted-foreground text-xs">↓</div>
        <div className="flex justify-center">
          <FlowNode sub="Pinhole 역투영 · 탐지 bbox 중심 픽셀의 depth 샘플링">3D 좌표 변환 (팀원 작성)</FlowNode>
        </div>
        <div className="flex justify-center text-muted-foreground text-xs">↓</div>
        <div className="flex justify-center">
          <FlowNode highlight sub="MultiTarget 퍼블리시 · UDP 시각화 전송">GCS / 드론</FlowNode>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex-1 border-t border-dashed border-border" />
          <span className="shrink-0 px-2">ROS_MASTER_URI(ROS1) → ROS_DOMAIN_ID(ROS2) 기반 프로세스당 드론 격리</span>
          <div className="flex-1 border-t border-dashed border-border" />
        </div>
      </div>

      {/* 도입부 */}
      <p>
        드론에 탑재된 RealSense 카메라로 폭발물·화재·부상자 등을 탐지해 3D 좌표로 변환,
        GCS(지상 통제소)로 전송하는 시스템입니다. 핵심 탐지 모델(Faster R-CNN)과 좌표
        변환 로직은 팀원이 작성했고, 저는 시스템 전체 아키텍처를 역분석해 문서화하고
        테스트를 추가한 뒤, <Highlight>ROS1 Noetic(catkin)에서 ROS2 Humble(colcon/ament)로의
        마이그레이션</Highlight>을 설계·구현했습니다.
      </p>
      <p>
        ROS1에서는 UDP로 받은 드론 IP마다 <code>ROS_MASTER_URI</code>를 새로 설정해
        별도 프로세스를 띄우는 방식으로 여러 드론을 동시에 서빙했습니다. ROS2에는 이
        Master 개념 자체가 없어(DDS 기반 자동 discovery), 이 프로세스당 격리 구조를
        유지할 방법부터 다시 설계해야 했습니다.
      </p>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">핵심 기능</h2>

        {/* 1. ROS_DOMAIN_ID 격리 재설계 */}
        <AccordionSection
          title="멀티 드론 격리 재설계 - ROS_MASTER_URI에서 ROS_DOMAIN_ID로"
          hint="Master 개념이 없는 ROS2에서 프로세스당 드론 격리 구조를 그대로 재사용하는 매핑 모듈 설계"
          module="detector"
          defaultOpen
        >
          <p>
            ROS1에서는 <code>multiprocessing.Process</code>마다 <code>ROS_MASTER_URI</code>를
            드론 IP로 설정해 프로세스 단위로 통신을 격리했습니다. ROS2는 DDS 기반이라
            Master가 없고, 대신 <Highlight>ROS_DOMAIN_ID</Highlight>가 다르면 노드끼리 서로
            보이지 않는 방식으로 격리됩니다. 기존 "프로세스당 드론 하나" 아키텍처를 최소
            재설계로 재사용하려면, 드론 IP를 도메인 ID로 바꿔주는 계층이 필요했습니다.
          </p>
          <p>
            <code>domain_map.py</code>를 rospy/소켓/환경변수 접근이 전혀 없는{" "}
            <Highlight>순수 함수 모듈</Highlight>로 작성했습니다. <code>config.yaml</code>의
            명시적 IP→도메인 매핑을 우선 사용하고, 매핑이 없으면 IP 마지막 옥텟에서
            결정론적으로 도메인 ID를 파생하되 유효 범위(1~101)로 클램프합니다. ROS 환경
            없이도 pytest로 이 로직만 독립적으로 검증할 수 있습니다.
          </p>
          <CodeBlock>{`def ip_to_domain_id(ip, explicit_map=None):
    if explicit_map and ip in explicit_map:
        return _validated(explicit_map[ip])
    octets = ip.split(".")
    last = int(octets[-1])
    span = DOMAIN_ID_MAX - DOMAIN_ID_MIN + 1
    return DOMAIN_ID_MIN + (last % span)  # 1~101 범위로 결정론적 파생`}</CodeBlock>
          <CompareTable
            headers={["", "ROS1", "ROS2"]}
            rows={[
              { cells: ["격리 단위", "프로세스당 ROS_MASTER_URI", "프로세스당 ROS_DOMAIN_ID"], highlight: true },
              { cells: ["드론 식별", "IP를 마스터 주소로 직접 사용", "IP → domain_map.py로 도메인 ID 변환"], highlight: true },
              { cells: ["아키텍처 변경 범위", "-", "프로세스당 격리 구조는 그대로, 격리 메커니즘만 교체"] },
            ]}
          />
        </AccordionSection>

        {/* 2. 패키지 이식 */}
        <AccordionSection
          title="패키지 전체 이식 - catkin → colcon, rospy → rclpy"
          hint="explore_msgs·detector 두 패키지를 ROS2 빌드 시스템과 노드 API로 전환"
          module="explore_msgs · detector"
        >
          <p>
            메시지 패키지 <code>explore_msgs</code>는 <code>package.xml</code> format2→3,
            빌드를 <code>ament_cmake</code> + <code>rosidl_generate_interfaces</code>로
            전환했습니다. <code>detector</code>는 <code>ament_python</code>{" "}
            (setup.py/setup.cfg/resource) 구조로 바꾸고, 메인 로직을{" "}
            <code>rclpy.node.Node</code> 인스턴스를 인자로 받아 사용하는 구조로
            재작성했습니다.
          </p>
          <CompareTable
            headers={["항목", "ROS1", "ROS2"]}
            rows={[
              { cells: ["초기화", "rospy.init_node()", "rclpy.init() + Node(name)"], highlight: true },
              { cells: ["spin", "rospy.spin()", "rclpy.spin(node)"], highlight: true },
              { cells: ["시간", "rospy.Time.now()", "node.get_clock().now().to_msg()"], highlight: true },
              { cells: ["종료 확인", "rospy.is_shutdown()", "not rclpy.ok()"] },
            ]}
          />
          <p>
            하드코딩돼 있던 <code>/catkin_ws/src/detector/...</code> 절대경로도{" "}
            <Highlight>DETECTOR_ROOT</Highlight> 환경변수(미설정 시 파일 위치 기준 자동
            해석)로 파라미터화해, 도커 이미지·설치 경로가 바뀌어도 코드 수정 없이 대응하게
            했습니다. 호출부가 확인되지 않던 <code>master_check.py</code>는 ROS2에 대응하는
            등가물이 없어 마이그레이션 대상에서 제외했습니다.
          </p>
        </AccordionSection>

        {/* 3. Docker GPU 디버깅 */}
        <AccordionSection
          title="Docker GPU 파이프라인 디버깅 - UCX·OpenCV 런타임 오류 해결"
          hint="Ubuntu 22.04+Humble 풀빌드 후 실제 GPU 결합 테스트에서 발견한 런타임 오류 2건"
          module="Docker"
        >
          <p>
            Ubuntu 22.04 기반 ROS2 Humble 이미지로 전환하고 <code>colcon build</code>가
            성공한 뒤, 실제 GPU 추론까지 엮은 결합 테스트에서 두 가지 런타임 오류를
            만났습니다.
          </p>
          <p className="font-medium text-foreground">1. torch import 시 UCX 심볼 오류</p>
          <p>
            <code>undefined symbol: ucm_set_global_opts</code>로 torch import가 실패했습니다.
            원인은 HPC-X UCX 라이브러리가 부분적으로만 로드된 것이었습니다.{" "}
            <Highlight>libucm/uct/ucs/ucp</Highlight> 4종을 의존성 순서대로{" "}
            <code>LD_PRELOAD</code>하고, 충돌하던 기존 hpcx/ompi{" "}
            <code>LD_LIBRARY_PATH</code>는 제거해 해결했습니다.
          </p>
          <p className="font-medium text-foreground">2. OpenCV 타입 스텁 버그</p>
          <p>
            nvcr 베이스 이미지의 opencv 4.7 typing 스텁에 있는{" "}
            <code>cv2.dnn.DictValue</code> 버그로 <code>cv2</code> import 자체가
            실패했습니다. pip으로 opencv를 덧설치하던 것을 제거해 베이스 이미지의 4.7을
            그대로 쓰도록 하고, 문제가 되는 스텁 한 줄을 무력화해 우회했습니다.
          </p>
          <p>
            두 문제 모두 <code>colcon build</code> 성공만으로는 드러나지 않고 실제 GPU
            추론 파이프라인을 끝까지 돌려봐야 나오는 종류라, 빌드 통과와 런타임 동작 검증을
            분리해서 봐야 한다는 걸 확인한 과정이었습니다.
          </p>
        </AccordionSection>

        {/* 4. 안전한 종료 처리 */}
        <AccordionSection
          title="안전한 종료 처리 - ExternalShutdownException과 무효 컨텍스트 publish 방지"
          hint="STOP 명령 시 나던 트레이스백 2종을 정상 종료 경로 처리 + publish 직전 가드로 제거"
          module="detector"
        >
          <p>
            UDP로 받은 <code>STOP</code> 명령으로 <code>DepthPointor</code> 프로세스를
            종료할 때 트레이스백 2종이 발생했습니다. 하나는 <code>rclpy.spin()</code>이
            던지는 <Highlight>ExternalShutdownException</Highlight>을 오류로 취급해 로그를
            더럽히는 것이었고, 다른 하나는 무거운 GPU 추론이 도는 도중 종료 신호가 오면
            추론이 끝난 뒤 <Highlight>이미 내려간 rclpy 컨텍스트에 publish를 시도</Highlight>하다
            죽는 경쟁 상태였습니다.
          </p>
          <p>
            <code>ExternalShutdownException</code>을{" "}
            <code>KeyboardInterrupt</code>와 함께 정상 종료 경로로 분류하고, 모든 publish
            호출 직전에 <code>shutdown_flag</code>와 <code>rclpy.ok()</code>를 다시 확인하는{" "}
            <code>_safe_publish()</code> 가드를 추가했습니다. 함수 진입 시점 검사만으로는
            추론이 오래 걸리는 동안 상태가 바뀔 수 있어, publish 직전에 한 번 더 확인하는
            것이 핵심이었습니다.
          </p>
          <CodeBlock>{`def _safe_publish(self, publisher, msg):
    # 무거운 GPU 추론 도중 STOP 이 오면 함수 진입 시점 검사만으론 부족 -
    # publish 직전에 다시 확인한다.
    if self.shutdown_flag or not rclpy.ok():
        return
    publisher.publish(msg)`}</CodeBlock>
          <p>
            실 하드웨어 없이 전체 흐름(UDP 명령 수신 → 프로세스 spawn → 합성 카메라 →
            GPU 추론 → MultiTarget 퍼블리시 → STOP)을 재현해 <Highlight>MultiTarget
            27건 퍼블리시, 종료 트레이스백 0건</Highlight>을 확인했습니다.
          </p>
        </AccordionSection>

        {/* 5. 실장비 없는 회귀 검증 */}
        <AccordionSection
          title="실장비 없는 회귀 검증 - synthetic 메시지 기반 통합 테스트"
          hint="ROS1→ROS2 API 전면 교체인데 자동화 테스트가 전무 → pytest 단위 + rostest 통합 테스트 신설"
          module="tests"
        >
          <p>
            저장소에 자동화 테스트가 전혀 없어 지금까지는 실 드론+RealSense 장비에서 수동
            확인만으로 검증해온 시스템이었습니다. ROS1→ROS2는 API·빌드 시스템이 전면
            교체되는 변경이라, 수동 확인만으로는 회귀를 놓치기 쉽다고 판단해 마이그레이션에
            앞서 최소한의 자동 테스트부터 추가했습니다.
          </p>
          <p>
            3D 좌표 변환(<code>point_distance</code>/<code>drone_points</code>)과 UDP 명령
            파싱(<code>handle_command</code>)에서 <Highlight>rospy/OpenCV에 의존하지
            않는 순수 로직</Highlight>을 <code>geometry.py</code>/<code>command_parser.py</code>로
            분리하고, <code>gcs_ros_main.py</code>가 이를 호출하도록 리팩터링(동작은
            동일)했습니다. ROS가 설치되지 않은 환경에서도{" "}
            <code>pytest</code>만으로 이 로직을 검증할 수 있습니다.
          </p>
          <p>
            여기에 더해 synthetic <code>CameraInfo</code>/<code>CompressedImage</code>/depth{" "}
            <code>Image</code>를 퍼블리시하고 <code>inference.model_checkpoint</code>/
            <code>inference.main</code>만 모킹(GPU·가중치 불필요)한 <code>rostest</code>{" "}
            통합 테스트를 추가해, 실제 <code>cv_bridge</code>/<code>message_filters</code>{" "}
            동기화 경로를 태우는 end-to-end 검증까지 확보했습니다.
          </p>
          <CompareTable
            headers={["테스트 레이어", "대상", "결과"]}
            rows={[
              { cells: ["pytest 단위 테스트", "좌표 변환·명령 파싱 순수 로직", "10 passed - ROS 미설치 환경에서도 실행 가능"], highlight: true },
              { cells: ["rostest 통합 테스트", "RGB+Depth 동기화 → 추론 → MultiTarget 퍼블리시", "GPU·가중치 없이 전체 경로 검증"], highlight: true },
              { cells: ["전체", "colcon build + pytest", "17 passed"], highlight: true },
            ]}
          />
        </AccordionSection>
      </div>
    </div>
  );
}
