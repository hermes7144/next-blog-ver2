state는 객체를 포함해서, 어떤 종류의 JavaScript 값이든 저장할 수 있습니다. 하지만 React state에 있는 객체를 직접 변이해서는 안됩니다. 대신 객체를 업데이트하려면 새 객체를 생성하고(혹은 기존 객체의 복사본을 만들고), 해당 복사본을 사용하도록 state를 설정해야 합니다.

## 변이란 무엇인가?

어떤 종류의 JavaScript 값이든 state에 저장할 수 있습니다.
숫자, 문자열, 불리언 JavaScript 값은 "불변", 즉, 변이할 수 없거나 "읽기 전용"입니다. 다시 렌더링을 트리거하여 값을 바꿀 수 있습니다.

```jsx
setX(5);
```

x state가 0에서 5로 변경되었지만 숫자 0 자체는 변경되지 않았습니다. JavaScript에서는 숫자, 문자열, 불리언과 같은 빌트인 원시 자료형 값을 변경할 수 없습니다.

객체 state를 고려해봅시다.

```jsx
const [position, setPosition] = useState({ x: 0, y: 0 });
```

기술적으로 객체 자체의 내용을 변경하는 건 가능합니다. **이를 변이라고 합니다.**

```jsx
position.x = 5;
```

React state의 객체는 기술적으로는 변이할 수 있지만, 숫자, 불리언(boolean), 문자열과 같이 불변하는 **것처럼** 취급해야 합니다. 객체를 직접 변이하는 대신, 항상 교체해야 합니다.

## state를 읽기 전용으로 취급하세요

다시 말해 **state에 넣는 모든 JavaScript 객체를 읽기 전용으로 취급해야** 합니다.

```jsx
import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  return (
    <div
      onPointerMove={(e) => {
        position.x = e.clientX;
        position.y = e.clientY;
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          borderRadius: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20,
        }}
      />
    </div>
  );
}
```

문제는 아래 코드에 있습니다.

```jsx
onPointerMove={e => {
  position.x = e.clientX;
  position.y = e.clientY;
}}
```

이 코드는 이전 렌더링에서 position에 할당된 객체를 수정합니다. 하지만 state 설정자 함수를 사용하지 않으면 React는 객체가 변이되었다는 사실을 알지 못합니다. 그래서 React는 아무 반응도 하지 않습니다. 이미 음식을 다 먹은 후에 주문을 바꾸려고 하는 것과 같다. state 변이는 경우에 따라 작동할 수 있지만 권장하지 않습니다. 렌더링에서 접근할 수 있느 state 값은 읽기 전용으로 취급해야 합니다.

이 경우 실제로 리렌더링을 촉발하려면 **새 객체를 생성하고 state 설정자 함수에 전달하세요.**

```jsx
onPointerMove={e => {
  setPosition({
    x:e.clientX,
    y:e.clientY,
  })
}}
```

setPosition으로 React에 다음을 지시합니다:

- position을 이 객체로 바꿔라.
- 이 컴포넌트를 다시 렌더링하라.

## 지역 변이는 괜찮습니다.

이와 같은 코드는 기존객체의 state를 수정하기 때문에 문제가 됩니다.

```jsx
position.x = e.clientX;
position.y = e.clientY;
```

그러나 이와 같은 코든느 방금 생성한 새로운 객체를 변이하는 것이기 때문에 **완전히 괜찮습니다.**

이렇게 작성하는 것과 완전히 동일합니다.
setPosition({
x:e.clientX,
y:e.clientY
})

변이는 이미 state가 있는 기존 객체를 변경할 때만 문제가 됩니다. 방금 생성한 객체를 변경해도 다른 코드가 아직 참조하지 않으므로 괜찮습니다. 객체를 변경해도 해당 객체에 의존하는 다른 객체에 실수로 영향을 미치지 않습니다. 이를 "지역 변이(local mutation)"라고 합니다. 렌더링하는 동안에도 지역 변이를 수행할 수 있습니다. 매우 편리하고 문제 없습니다.
