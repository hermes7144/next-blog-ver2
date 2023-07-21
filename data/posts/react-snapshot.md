state 변수는 읽고 쓸 수 있는 일반 JavaScript 변수처럼 보일 수 있습니다.
하지만 state는 스냅샷처럼 동작합니다. state 변수를 설정해도 이미 가지고 있는 state 변수는 변경되지 않고, 대신 리렌더링이 실행됩니다.

```jsx
export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');
  if (isSent) {
    return <h1>Your message is on its way!</h1>;
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSent(true);
        sendMessage(message);
      }}>
      <textarea placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type='submit'>Send</button>
    </form>
  );
}

function sendMessage(message) {
  // ...
}
```

버튼을 클릭할 때 일어나는 과정을 설명하겠습니다.

1. `onSubmit` 이벤트 핸들러가 실행됩니다.
2. `setIsSent(true)`가 `isSent`를 `true`로 설정하고 새 렌더링을 큐에 대기시킵니다.
3. React는 새로운 isSent 값에 따라 컴포넌트를 다시 렌더링합니다.

state와 렌더링의 관계를 자세히 살펴보겠습니다.

## 렌더링은 그 시점의 스냅샷을 찍습니다.

"렌더링"이란 React가 컴포넌트, 즉, 함수를 호출한다는 뜻입니다. 해당 함수에서 반환하는 JSX는 시간상 UI의 스냅샷과 같습니다. prop, 이벤트 핸들러, 로컬 변수는 모두 **렌더링 당시의 state를 사용해** 계산됩니다.

사진이나 동영상 프레임과 달리 반환하는 UI '스냅샷'은 대화형입니다. 여기에는 input에 대한 응답으로 어떤 일이 일어날지 지정하는 이벤트 핸들러와 같은 로직이 포함됩니다. 그러면 React는 이 스냅샷과 일치하도록 화면을 업데이트하고 이벤트 핸들러를 연결합니다. 결과적으로 버튼을 누르면 JSX에서 클릭 핸들러가 발동됩니다.

React가 컴포넌트를 다시 렌더링할 때:

1. React가 함수를 다시 호출합니다.
2. 함수가 새로운 JSX 스냅샷을 반환합니다.
3. 그러면 React가 반환된 스냅샷과 일치하도록 화면을 업데이트합니다.

![Alt text](/images/re-render.png)

컴포넌트의 메모리로서 state는 함수가 반환된 후 사라지는 일반 변수와 다릅니다. state는 실제로 함수 외부에 마치 선반에 있는 것처럼 React 자체에 "존재"합니다. React가 컴포넌트를 호출하면 특정 렌더링에 대한 state의 스냅샷을 제공합니다. 컴포넌트는 **해당 렌더링의 state 값을 사용해** 계산된 새로운 props 세트와 이벤트 핸들러가 포함된 UI의 스냅샷을 JSX에 반환합니다!

![Alt text](/images/re-render2.png)

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

`number`는 클릭당 한 번만 증가한다.
**state를 설정하면 다음 렌더링에 대해서만 변경됩니다.** 첫 번째 렌더링에서 number는 0이었습니다. 따라서 해당 렌더링의 onClick 핸들러에서 `setNumber(nuber+ 1)`가 호출된 후에도 `number`의 값은 여전히 0입니다.

```jsx
<button
  onClick={() => {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1);
  }}>
  +3
</button>
```

이 버튼의 클릭 핸들러가 React에 지시하는 작업은 다음과 같습니다.

1. setNumber(number + 1): number는 0이므로 setNumber(0 + 1) 입니다.

- React는 다음 렌더링에서 number를 1로 변경할 준비를 합니다.

2. setNumber(number + 1): number는 0이므로 setNumber(0 + 1) 입니다.

- React는 다음 렌더링에서 number를 1로 변경할 준비를 합니다.

3. setNumber(number + 1): number는 0이므로 setNumber(0 + 1) 입니다.

- React는 다음 렌더링에서 number를 1로 변경할 준비를 합니다.

setNumber(number + 1)를 세 번 호출했지만, 이 렌더링에서 이벤트 핸들러의 number는 항상 0이므로 state를 1로 세 번 설정했습니다. 이것이 이벤트 핸들러가 완료된 후 React가 컴포넌트안의 number를 3이 아닌 1로 다시 렌더링하는 이유입니다.

코드에서 state 변수를 해당 값으로 대입하여 이를 시각화할수도 있습니다. 이 렌더링에서 state 변수는 0이므로 이벤트 핸들러는 다음과 같습니다.

```jsx
<button
  onClick={() => {
    setNumber(0 + 1);
    setNumber(0 + 1);
    setNumber(0 + 1);
  }}>
  +3
</button>
```

## 시간 경과에 따른 state

예시 코드

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 5);
          setTimeout(() => {
            alert(number);
          }, 3000);
        }}>
        +5
      </button>
    </>
  );
}
```

대체 방법을 상요하면 알림에 전달된 state의 '스냅샷'을 볼 수 있습니다.

```jsx
setNumber(0 + 5);
setTimeout(() => {
  alert(0);
}, 3000);
```

사용자가 상호작용한 시점에 state 스냅샷을 사용하는 건 이미 예약되어 있던 것입니다!
**렌더링 내에서 상태 변수의 값은 절대로 변경되지 않습니다.** 심지어 이벤트 핸들러의 코드가 비동기라도요.
해당 렌더이의 onClick내에서, `setNumber(number + 5)`가 호출된 후에도, number의 값은 계속 0입니다. 이 값은 컴포너트를 호출해 React가 UI의 "스냅샷을 찍을" 때 "고정"된 값입니다.

**React는 하나의 렌더링 이벤트 핸들러 내에서 state 값을 "고정"으로 유지합니다.** 코드가 실행되는 동안 state가 변경되었는지 걱정할 필요가 없습니다.

렌더링하기 전에 최신 state를 읽고 싶다면 state 업데이터 함수를 사용하면 됩니다.
