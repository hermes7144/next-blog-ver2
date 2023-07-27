state 변수를 설정하면 다음 렌더링이 큐(대기열, queue)에 들어갑니다. 그러나 다음 렌더링을 큐에 넣기 전, 값에 대해 여러 작업을 수행하고 싶을 때도 있습니다. 이를 위해서 React가 state 업데이트를 어떻게 배치하면 좋을지 이해하는 것이 도움이 된다.

## state 업데이트 일괄처리

setNumber(number + 1)를 세 번 호출하므로 "+3" 버튼을 클릭하면 세 번 증가할 것으로 예상할 수 있습니다.

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}>
        +3
      </button>
    </>
  );
}
```

그러나, 각 렌더링의 state 값은 고정되어 있으므로, 첫번째 렌더링의 이벤트 핸들러의 number 값은 setNumber(1)을 몇 번 호출하든 항상 0입니다.

```jsx
setNumber(0 + 1);
setNumber(0 + 1);
setNumber(0 + 1);
```

**React는 state를 업데이트 하기 전에 이벤트 핸들러의 모든 코드가 실행될 때까지 기다립니다.** 이 때문에 리렌더링은 모든 setNumber() 호출이 완료된 이후에만 일어납니다.
이렇게 하면 너무 많은 리렌더링을 촉발하지 않고도 여러 컴포넌트에서 나온 다수의 state 변수를 업데이트할 수 있습니다. 하지만 이는 이벤트 핸들러와 그 안에 있는 코드가 완료될 때까지 UI가 업데이트되지 않는다는 의미이기도 합니다. 일괄처리(배칭, batching)라고도 하는 이 동작은 React 앱을 훨씬 빠르게 실행할 수 있게 해줍니다. 또한 일부 변수만 업데이트된 "반쯤 완성된" 혼란스러운 렌더링을 처리하지 않아도 됩니다.

**React는 클릭과 같은 여러 의도적인 이벤트에 대해 일괄 처리하지 않으며,** 각 클릭은 개별적으로 처리됩니다. React는 일반적으로 안전한 경우에만 일괄 처리를 수행하니 안심하세요. 예를 들어, 첫번째 버튼 클릭으로 양식이 비활성화되면 두 번째 클릭으로 양식이 다시 제출되지 않습니다.

## 다음 렌더링 전에 동일한 state 변수를 여러 번 업데이트하기

다음 렌더링 전에 동일한 state 변수를 여러 번 업데이트 하고 싶다면 setNumber(number + 1)와 같은 다음 state 값을 전달하는 대신, setNumber(n => n + 1)와 같이 큐의 이전 state를 기반으로 다음 state를 계산하는 함수를 전달할 수 있습니다. 이는 단순히 state 값을 대체하는 것이 아니라 React에게 "state 값으로 무언가를 하라"라고 지시하는 방법입니다.

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber((n) => n + 1);
          setNumber((n) => n + 1);
          setNumber((n) => n + 1);
        }}>
        +3
      </button>
    </>
  );
}
```

여기서 `n => n + 1`는 **업데이터 함수(updater function)**라고 부릅니다. 이를 state 설정자 함수에 전달할 때:

1. React는 이벤트 핸들러의 다른 코드가 모두 실행한 후에 이 함수가 처리되도록 큐에 넣습니다.
2. 다음 렌더링 중에 React는 큐를 순회하여 최종 업데이트된 state를 제공합니다.

3. setNumber(n => n +1): n => n + 1 함수를 큐에 추가합니다.
4. setNumber(n => n +1): n => n + 1 함수를 큐에 추가합니다.
5. setNumber(n => n +1): n => n + 1 함수를 큐에 추가합니다.

다음 렌더링 중에 useState를 호출하면 React는 큐를 순회합니다. 이전 number state는 0이었으므로 React는 이를 첫 번째 업데이터 함수에 n 인수로 전달합니다. 그런 다음 React는 이전 업데이터 함수의 반환값을 가져와서 다음 업데이터 함수에 n으로 전달하는 식으로 반복합니다.

| queued update | n   | returns   |
| ------------- | --- | --------- |
| n => n +1     | 0   | 0 + 1 = 1 |
| n => n +1     | 1   | 1 + 1 = 2 |
| n => n +1     | 2   | 2 + 1 = 3 |

React는 3을 최종 결과로 저장하고 useState에서 반환합니다.

이벤트 핸들러가 완료되면 React는 리렌더링을 실행합니다. 리렌더링하는 동안 React는 큐를 처리합니다. **업데이터 함수는 순수해야 하며** 결과만 반환해야합니다. 업데이터 함수 내부에서 state를 변경하거나 다른 사이드 이펙트를 실해하려고 하지 마세요.

함수를 전달하면 여러 번 업데이트 할 수 있는 것일까?

이 페이지에 설명된 알고리즘이 React가 최종 state를 계산하는 데 사용하는 알고리즘입니다.
계속보다 보면 이해가 되는거 같다.

```jsx
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  for (let update of queue) {
    if (typeof update === 'function') {
      // Apply the updater function.
      finalState = update(finalState);
    } else {
      // Replace the next state.
      finalState = update;
    }
  }

  return finalState;
}
```
