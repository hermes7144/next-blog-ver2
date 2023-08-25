## state 보존 및 재설정

state는 컴포넌트 간에 격리됩니다. React는 UI 트리에서 어떤 컴포넌트가 어떤 state에 속하는지 추적합니다. state를 언제 보존하고 언제 초기화할지 제어할 수 있습니다.

### UI 트리

브라우저는 UI를 모델링하기 위해 많은 트리 구조를 사용합니다. DOM은 HTML 요소를 나타내고, CSSOM은 CSS에 대해 동일한 역할을 합니다.
React 또한 트리 구조를 사용하여 상뇨자가 만든 UI를 관리하고 모델링합니다. React는 JSX로부터 UI 트리를 만듭니다. 그런 다음 React DOM은 해당 UI 트리와 일치하도록 브라우저 DOM 엘리먼트를 업데이트합니다.

### state는 트리의 한 위치에 묶입니다

컴포넌트에 state를 부여할 때, state가 컴포넌트 내부에 "존재"한다고 생각할 수 있습니다. 하지만 state는 실제로 React 내부에서 유지됩니다. React는 UI 트리에서 해당 컴포넌트가 어디에 위치하는지에 따라 보유하고 있는 각 state를 올바른 컴포넌트와 연결합니다.
여기에는 <Counter /> JSX 태그가 하나만 있지만 두 개의 위치에서 렌더링됩니다.

```jsx
import { useState } from 'react';

export default function App() {
  const counter = <Counter />;
  return (
    <div>
      {counter}
      {counter}
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div className={className} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  );
}
```

**이 카운터는 각 트리에서 고유한 위치에 렌더링되기 때문에 두 개의 개별 카운터입니다.** 일반적으로 React를 사용하기 위해 이러한 위치에 대해 생각할 필요는 없지만, 작동 방식을 이해하는 것이 유용할 수 있습니다.
React에서 화면의 각 컴포넌트는 완전히 분리된 state를 갖습니다. 예를 들어, 두 개의 Counter 컴포넌트를 나란히 렌더링하면 각각 독립적인 score 및 hover state를 갖게 됩니다.
React는 컴포넌트가 UI 트리의 해당 위치에서 렌더링되는 동안 컴포넌트의 state를 유지합니다. 컴포넌트가 제거되거나 같은 위치에 다른 컴포넌트가 렌더링되면 React는 해당 컴포넌트의 state를 삭제합니다.

### 동일한 위치의 동일한 컴포넌트는 state를 유지합니다

함정
**React에서 중요한 것은 JSX 마크업이 아니라 UI 트리에서의 위치라는 것을 기억하세요!** 이 컴포넌트에는 if 내부와 외부에 서로 다른 <Counter /> JSX 태그가 있는 두 개의 return 절이 있습니다.
checkbox를 선택하면 state가 재설정될 것으로 예상할 수 있지만 그렇지 않습니다! 이 **두 <Counter /> 태그가 모두 같은 위치에 렌더링되기 때문입니다.** React는 함수에서 조건을 어디에 배치했는지 알지 못합니다. 단지 여러분이 반환하는 트리만 볼 수 있을 뿐입니다.
두 경우 모두 App 컴포넌트는 <Counter />를 첫 번째 자식으로 가진 <div>를 반환합니다. React에서 이 두 카운터는 루트의 첫 번째 자식의 첫 번째 자식이라는 동일한 "주소"를 갖습니다. React는 로직을 어떻게 구성하든 상관없이 이전 렌더링과 다음 렌더링 사이에서 이 방법으로 이들을 일치시킬 수 있습니다.

### 동일한 위치에서 Counter 재설정하기

기본적으로 React는 컴포넌트가 같은 위치에 있는 동안 컴포넌트의 state를 보존합니다. 일반적으로 이것은 사용자가 원하는 것이므로 기본적으로는 적합합니다. 하지만 때로는 컴포넌트의 state를 리셋하고 싶을 때가 있습니다.
전환할 때 state를 재설정하는 방법에는 두 가지가 있습니다:

1. 컴포넌트를 다른 위치에 렌더링하기 - 이 솔루션은 같은 위치에 몇 개의 독립적인 컴포넌트만 렌더링할 때 편리합니다. 이 예시에서는 두 개만 있으므로 JSX에서 두 컴포넌트를 별도로 렌더링하는 것이 번거롭지 않습니다.

2. 각 컴포넌트에 key로 명시적인 아이덴티티 부여하기 - 컴포넌트의 state를 재설정하는 데 더 일반적인 방법.
   key를 사용해 React가 모든 컴포넌트를 구분하도록 할 수 있습니다. 기본적으로 React는 부모 내의 순서를 사용해 컴포넌트를 구분합니다. 하지만 key를 사용하면 이것이 첫 번째 counter나 두 번째 counter가 아니라 특정 counter임을 React에 알릴 수 있습니다. 이렇게 하면 React는 특정 컴포넌트가 트리의 어디에 나타나든 알 수 있습니다!

key를 지정하면 React가 부모 내 순서가 아닌 key 자체를 위치의 일부로 사용하도록 지시합니다. 그렇기 때문에 JSX에서 같은 위치에 렌더링하더라도 React의 관점에서 보면 두 카운터는 서로 다른 카운터입니다. 결과적으로 state를 공유하지 않습니다.
