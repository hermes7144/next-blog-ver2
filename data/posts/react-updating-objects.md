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

## 전개 구문을 사용하여 객체 복사하기

이전 예제에서 position 객체는 항상 현재 커서 위치에서 새로 만들어졌습니다. 그러나 종종 기존 데이터를 새로 만드는 객체의 일부로 포함시키고 싶을 때가 있습니다. 예를 들어, form에 있는 하나의 필드만 업데이트하고 다른 모든 필드는 이전 값을 유지하고 싶다.
이러한 입력 필드는 onChange 핸들러가 state를 변이하기 때문에 작동하지 않습니다.

예를 들어, 이 줄은 이전 렌더링시의 state를 변이합니다.

```jsx
person.firstName = e.target.value;
```

원하는 동작을 얻을 수 있는 가장 안정적인 방법은 새 객체를 생성하고 이를 설정자 함수에 전달하는 것입니다. 필드 중 하나만 변경된 경우는 **기존 데이터도 복사**해야 합니다.

```jsx
setPerson({
  firstName: e.target.value,
  lastName: person.lastName,
  email: person.email,
});
```

모든 속성을 개별적으로 복사할 필요가 없도록 ...객체 전개 구문을 사용할 수 있습니다.

```jsx
setPerson({
  ...person,
  firstName: e.target.value,
});
```

각 필드에 대해 별도의 state 변수를 선언하지 않는다. 큰 양식의 경우 올바르게 업데이트하기만 하면 모든 데이터를 객체에 그룹화하여 보관하는 것이 매우 편리하다.
... 전개 구문은 "얕은" 구문으로, 한 단계 깊이만 복사한다는 점에 유의하세요. 중첩된 프로퍼티를 업데이트하려면 두 번 이상 사용해야 한다는 뜻이기도 합니다.

## 중첩된 객체 업데이트하기

## 객체는 실제로 중첩되지 않습니다.

이와 같은 객체는 코드에서 "중첩"되어 나타납니다.

```jsx
let obj = {
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  },
};
```

그러나 "중첩"은 객체의 동작 방식을 고려해보자면 정확한 방식은 아닙니다. 코드가 실행될 때 "중첩된" 객체 같은 것은 존재하지 않습니다. 실제로는 서로 다른 두 개의 객체를 보고 있는 것입니다.

```jsx
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1,
};
```

obj1은 obj2의 "내부"에 있지 않습니다. 예를 들어, obj3도 obj1을 "가리킬" 수 있습니다.

```jsx
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1,
};

let obj3 = {
  name: 'Copycat',
  artwork: obj1,
};
```

obj3.artwork.city를 변이하면 obj2.artwork.city와 obj1.city 모두에 영향을 미칩니다. 객체를 "쭝첩된" 객체라고 생각하면 이 점을 이해하기 어렵습니다. 실은 프로퍼티를 사용하여 서로를 "가리키는" 별도의 객체입니다.

## Immer로 간결한 업데이트 로직 작성
Immer는 변이 구문을 사용하여 작성하더라도 자동으로 사본을 생성하주는 편리한 인기 라이브러리입니다. Immer를 사용하면 작성하는 코드가 "규칙을 깨고" 객체를 변이하는 것처럼 보입니다."
하지만 일반 변이와 달리 이전 state를 덮어쓰지 않습니다!

### Immer가 동작하는 원리
Immer에서 제공하는 draft는 프록시라는 특수한 유형이 객체로, 사용자가 자가 수행하는 작업을 "기록"합니다. 그렇기 때문에 원하는 만큼 자유롭게 수정할 수 있습니다! Immer는 내부적으로 어떤 부분이 변경되었는지 파악하고 편집 내용이 포함된 완전히 새로운 객체를 생성합니다.

Immer를 사용해보려면:
1. Immer를 의존성으로 추가합니다.
2. 그런 다음 import { useState } from 'react'를 import { useImmer } from 'use-immer' 로 바꿉니다.

## React에서 state 변이를 권장하지 않는 이유는?
- 디버깅: console.log를 사용하고 state를 변이하지 않으면, 과거의 기록이 최근 state 변이에 의해 지워지지 않습니다. 따라서 렌더링 사이에 state가 어떻게 변경되었는지 명확하게 확인할 수 있습니다.

- 최적화: 일반적인 React 최적화 전략은 이전 프로퍼티나 state가 다음 프로퍼티나 state와 동일한 경우 작업을 건너뛰는 것에 의존합니다. state를 변이하지 않는다면 변경이 있었는지 확인하는 것이 매우 빠릅니다. 만약 prevObj === obj라면, 내부에 변경된 것이 없다는 것을 확신할 수 있습니다.

- 새로운 기능: 새로운 기능은 state가 스냅샷처럼 취급되는 것에 의존합니다. 과거 버전의 state를 변이하는 경우 새로운 기능을 사용하지 못할 수도 있습니다.

- 요구사항 변경: 실행 취소/다시 실행 구현, 변경 내역 표시, 사용자가 양식을 지전 값으로 재설정할 수 있도록 하는 것과 같은 일부 애플리케이션 기능은 아무것도 변이되지 않은 state에서 더 쉽게 수행할 수 있습니다. 과거의 state 복사본을 메모리에 보관하고 필요할 때 재사용할 수 있기 때문입니다. 변경 접근 방식으로 시작하면 나중에 이와 같은 기능을 추가하기 어려울 수 있습니다.

- 더 간단한 구현: React는 변이에 의존하지 않기 때문에 객체에 특별한 작업을 할 필요가 없습니다. 많은 "반응형"솔루션처럼 프로퍼티를 가로채거나, 항상 프록시로 감싸거나, 초기화할 때 다른 작업을 할 필요가 없습니다. 이것이 바로 React를 사용하면 추가 성능이나 정확성의 함정 없이 아무리 큰 객체라도 state에 넣을 수 있는 이유이기도 합니다.
