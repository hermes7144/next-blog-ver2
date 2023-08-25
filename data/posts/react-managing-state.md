React는 UI를 조작하는 선언적인 방법을 제공합니다. UI를 개별적으로 직접 조작하는 대신 컴포넌트가 있을 수 있는 다양한 상태를 기술하고, 사용자의 입력에 반응하여 각 상태들 사이를 전환합니다.

state를 잘 구조화하면 수정과 디버깅이 편한 컴포넌트와 버그가 끊임없이 발생하는 컴폰너트 차이를 만들 수 있습니다.

## state 구조화 원칙

1. **관련 state를 그룹화합니다.** 항상 두 개 이상의 state 변수를 동시에 업데이트하는 경우 단일 state 변수로 병합하는 것이 좋습니다.
2. **state의 모순을 피하세요.** 여러 state 조각이 서로 모순되거나 '불일치'하는 방식으로 state를 구성하면 실수가 발생할 여지가 생깁니다. 이를 피하세요.
3. **불필요한 state를 피하세요.** 렌더링 중에 컴포넌트의 props나 기존 state 변수에서 일부 정보를 계산할 수 있다면 해당 정보를 해당 컴포넌트의 state에 넣지 말아야 합니다.
4. **state 중복을 피하세요.** 렌더링 중에 컴포넌트의 props나 기존 state 변수에서 일부 정보를 계산할 수 있다면 해당 정보를 해당 컴포넌트의 state에 넣지 말아야 합니다.
5. **깊게 중첩된 state는 피하세요.** 깊게 계층화된 state는 업데이트하기 쉽지 않습니다. 가능하면 state를 평평한 방식으로 구성하는 것이 좋습니다.

이러한 원칙의 목표는 실수없이 state를 쉽게 업데이트할 수 있도록 하는 것입니다. state에서 불필요하거나 중복된 데이터를 제거하면 모든 데이터가 동기화 상태를 유지하는 데 도움이 됩니다. 이는 데이터베이스 엔지니어가 버그 발생 가능성을 줄이기 위해 데이터베이스를 '정규화'하는 것과 유사합니다. 알버트 아인슈타인의 말을 빌리자면, **"state를 최대한 단순하게 만들되, 그보다 더 단순해서는 안됩니다."**

## props를 state에 그대로 미러링하지 마세요.

다음 코드는 중복 state의 일반적인 예시.

```jsx
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);
}
```

여기서 color state 변수는 messageColor props로 초기화됩니다. 문제는 **부모 컴포넌트가 나중에 다른 messageColor 값(예:blue 대신 red)을 전달하면 color state 변수가 업데이트되지 않는다는 것입니다!** state는 첫 번째 렌더링 중에만 초기화됩니다.
그렇기 때문에 state 변수에 일부 props을 '미러링'하면 혼란을 초래할 수 있습니다. 대신 코드에서 messageColor prop을 직접 사용하세요. 더 짧은 이름을 지정하려면 상수를 사용하세요.

```jsx
function Message({ messageColor }) {
  const color = messageColor;
}
```

이렇게 하면 부모 컴포넌트에서 전달된 props과 동기화되지 않습니다.
props를 state로 '미러링'하는 것은 특정 props에 대한 모든 업데이트를 무시하려는 경우에만 의미가 있습니다. 관례에 따라 prop 이름을 initial 또는 default로 시작하여 새 값이 무시됨을 명확히 하세요.

```jsx
function Message({ initialColor }) {
  // The `color` state variable holds the *first* value of `initialColor`.
  // Further changes to the `initialColor` prop are ignored.
  const [color, setColor] = useState(initialColor);
```

## state 끌어올리기

때로 두 컴포넌트의 state가 항상 함께 변경되기를 원할 때가 있습니다. 그렇게 하려면 두 컴포넌트에서 state를 제거하고 가장 가까운 공통 분모로 이동한 다음 props를 통해 전달하면 됩니다.

### state 끌어올리는 순서

1. 자식 컴포넌트에서 state를 **제거**합니다.
2. 공통 부모 컴포넌트에 하드 코딩된 데이터를 **전달**합니다.
3. 공통 부모 컴포넌트에 state를 **추가**하고 이벤트 핸들러와 함께 전달합니다.

### 각 state의 단일 진실 공급원(SSOT)

React 애플리케이션(이하 앱)에서 많은 컴포넌트는 고유한 state를 가지고 있습니다. 일부 state는 입력값과 같이 leaf 컴포넌트(트리의 맨 아래에 있는 컴포넌트)에 가까이 위치합니다. 다른 state는 앱의 상단에 더 가깝게 "위치"할 수 있습니다. 예를 들어, 클라이언트 측 라우팅 라이브러리도 일반적으로 현재 경로를 React state에 저장하고 props를 통해 전달하는 방식으로 구현됩니다!
**각각의 고유한 state에 대해 해당 state를 "소유"하는 컴포넌트를 선택합니다.** 이 원칙은 "single source of truth(진리의 단일 출처)"라고도 알려져 있습니다. 모든 state가 한 곳에 있다는 뜻이 아니라, 각 state에 대해 특정 컴포넌트가 그 정보를 보유하고 있습니다. 컴포넌트 간에 공유 상태를 중복하여 사용하는 대신, 공통으로 공유되는 상위 부모 컴포넌트로 상태를 올리고, 그것을 필요한 하위 컴포넌트에게 전달합니다.
