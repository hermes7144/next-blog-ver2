컴포넌트별 메모리 **state**

## 일반 변수로 충분하지 않은 경우

컴포넌트를 새 데이터로 업데이트하려면 두 가지 작업이 필요합니다.

1. 렌더링 사이에 데이터를 **유지**합니다.
2. 새로운 데이터로 컴포넌트를 렌더링(리렌더링) 하도록 React를 **촉발**합니다.

useState훅은 이 두가지를 제공합니다.

1. 렌더링 사이에 데이터를 유지하기 위한 **state 변수.**
   렌더링 사이에 state를 사용하지 않으면 내부에서 사용한 변수는 유지되지 않는다.

2. 변수를 업데이트하고 React가 컴포넌트를 다시 렌더링하도록 촉발하는 **state 설정자 함수.**

## state 변수를 추가하는 법

state 변수를 추가하려면 파일 상단에 있는 React에서 `useState`를 Import합니다.

```jsx
import { useState } from 'react';
```

useState를 구조분해할당으로 값을 읽습니다.

```jsx
const [index, setIndex] = useState(0);
```

`index`는 state 변수이고, `setIndex`는 설정자 함수입니다.

## 첫번째 훅

React에서는 `useState`를 비롯해 `"use"`로 시작하는 다른 함수를 훅(hook)이라고 부릅니다.

훅은 렌더링 중일 때만 사용할 수 있는 특별한 함수입니다. 이를 통해 다양한 React 기능을 "연결"할 수 있습니다.

## useState 해부하기

`useState`를 호출하는 것은, React에게 이 컴포넌트가 무언가를 기억하기를 원한다고 말하는 것입니다.

```jsx
const [index, setIndex] = useState(0);
```

이경우 React가 `index`를 기억하기를 원합니다.

`useState`의 유일한 인수는 state 변수의 **초기값**입니다. 이 예제에서는 `useState(0)`에 의해 `index`의 초기값이 `0`으로 설정되어 있습니다.

컴포넌트가 렌더링될 때마다 `useState`는 두 개의 값을 포함하는 배열을 제공합니다.

1. 저장한 값을 가진 **state 변수(index)**.
2. state 변수를 업데이트하고 React가 컴포넌트를 다시 렌더링하도록 촉발할 수 있는 **State 설정자 함수(setIndex)**

실제 작동 방식

1. **컴포넌트가 처음 렌더링됩니다.** index의 초기값으로 0을 useState에 전달했으므로 [0, setState]가 반환됩니다. React는 0을 최신 state 값으로 기억합니다.
2. **State를 업데이트합니다.** 사용자가 버튼을 클릭하면 setState(index + 1)를 호출합니다. index는 0이므로 setIndex(1)입니다. 이로써 React는 이제 index가 index가 1임을 기억하고 다음 렌더링을 촉발합니다.
3. **컴포넌트가 두 번째로 렌더링됩니다.** React는 여전히 useState(0)을 보지만, index를 1로 설정한 것을 기억하고 있기 때문에, 이번에는 [1, setIndex]를 반환합니다.
4. 이런 식으로 계속됩니다!

## state는 격리되고 프라이빗합니다.

state는 화면의 컴포넌트 인스턴스에 지역적입니다. 즉, **동일한 컴포넌트를 두 군데에서 렌더링하면 각 사본은 완전히 격리된 state를 갖게 됩니다!** 이 중 하나를 변경해도 다른 컴포넌트에는 영향을 미치지 않습니다.

```jsx
import Gallery from './Gallery.js';

export default function Page() {
  return (
    <div className='Page'>
      <Gallery />
      <Gallery />
    </div>
  );
}
```

이것이 모듈 상단에 선언하는 일반 변수와 state의 차이점입니다. state는 특정 함수 호출에 묶이기 않고, 코드의 특정 위치에 묶이지도 않지만, 화면상의 특정 위치에 "지역적"입니다. 두 개의 <Gallery /> 컴포넌트를 렌더링했으므로 해당 state는 별도로 저장됩니다. 두 개의 <Gallery /> 컴포넌트를 렌더링했으므로 해당 state는 별도로 저장됩니다.

Page 컴포넌트는 Gallery의 state뿐 아니라 심지어 state가 있는지 여부조차 전혀 "알지 못한다"는 점도 주목하세요. props와 달리 **state는 이를 선언하는 컴포넌트 외에는 완전히 비공개이며, 부모 컴포넌트는 이를 변경할 수 없습니다.** 따라서 다른 컴포넌트에 영향을 주지 않고 state를 추가하거나 제거할 수 있습니다.

state 변수는 컴포넌트의 리렌더링 사이에 정보를 유지하는 데만 필요합니다. 단일 이벤트 핸들러 내에서는 일반 변수로도 충분합니다. 일반 변수가 잘 작동할 때는 state 변수를 도입하지 마세요.
