React 컴포넌트는 props를 이용해 서로 통신합니다. 모든 부모 컴포넌트는 props를 줌으로써 몇몇의 정보를 자식 컴포넌트에게 전달할 수 있습니다. props는 HTML 속성(attribute)을 생각나게 할 수도 있지만, 객체, 배열, 함수를 포함한 모든 JavaScript 값을 전달할 수 있습니다.

## 친숙한 props

props는 JSX 태그에 전달하는 정보입니다. 예를 들어, `className`, `src`, `alt`, `width`, `height`는 `<img>` 태그에 전달할 수 있습니다.

## 컴포넌트에 props 전달하기

### Step1: 자식 컴포넌트에 props 전달하기

먼저, `Avatar`에 몇몇 props를 전달합니다. 예를 들어 , `person`(객체)와 `size`(숫자)를 전달해 보겠습니다.

```jsx
export default function Profile() {
  return (
    <AVatar
      person={{name: 'Lin Lanying', imageId: 'ibX5QH6'}} size={100}
    >
  )
}
```

> 만약 `person=` 뒤에 있는 이중 괄호가 혼란스럽다면, JSX 중괄호 안의 객체라고 기억하시면 됩니다.

이제 `Avatar` 컴포넌트 내 props를 읽을 수 있습니다.

### 자식 컴포넌트 내부에서 props 읽기

이러한 props들은 `function Avatar` 바로 뒤에 있는 `({`와 `})` 안에 그들의 이름인 `person,size` 등을 쉼표로 구분함으로써 읽을 수 있습니다. 이렇게 하면 `Avatar` 코드 내에서 변수를 사용하는 것처럼 사용할 수 있습니다.

### JSX 전개 구문으로 props 전달하기

때때로 전달되는 props들은 반복적입니다.

```jsx
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div>
      <Avatar person={person} size={size} isSepia={isSepia} thickBorder={thickBorder} />
    </div>
  );
}
```

일부 컴포넌트는 그들의 모든 props에 자식 컴포넌트에 전달합니다. 이 경우 Profile 컴포넌트는 props를 직접적으로 사용하지 않기 때문에, 보다 간결한 "전개(spread)" 구문을 사용하는 것이 합리적일 수 있다.

```jsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props}>
    </div>
  );
}
```

이렇게 하면 `Profile`의 모든 props를 각각의 이름을 나열하지 않고 `Avatar`로 전달합니다. 과도하게 사용하지 마세요.

### 자식을 JSX로 전달하기

JSX 태그 내에 콘텐츠를 중첩하면, 부모 컴포넌트는 해당 컨텐츠를 `children`이라는 prop으로 받을 것입니다.

```jsx
import Avatar from './Avatar.js';

function Card({children}) {
  return (
    <div className="card">
      {children}
    </div>
  )
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
        >
    </Card>
  )
}

```

`<Card>`는 children 내부에서 무엇이 렌더링되는지 "알아야 할" 필요가 없습니다. 이러한 유연한 패턴을 여러 곳에서 볼 수 있다.
`children` prop을 가지고 있는 컴포넌트는 부모 컴포넌트가 임의의 JSX로 "채울" 수 있는 "구멍"을 가진 것이라고 생각할 수 있습니다. 패널, 그리드 등의 시각적 래퍼에 종종 `children` prop를 사용합니다.

Props는 컴포넌트의 데이터를 처음에만 반영하는 것이 아니라 모든 시점에 반영합니다.

그러나 props는 불변으로, 컴퓨터 과학에서 "변경할 수 없다"는 뜻의 용어입니다. 컴포넌트가 props를 변경해야 하는 경우(예: 사용자의 상호작용이나 새로운 데이터에 대한 응답으로), 부모 컴포넌트에 다른 props, 즉, 새로운 객체를 전달하도록 "요청"해야 합니다! 그러면 이전의 props는 버려지고(참조를 끊는다), 결국 JavaScript 엔진은 기존 props가 차지했던 메모리를 회수(가비지 컬렉팅. GC)하게 됩니다.

**props 변경을 시도하지 마세요.** 상호작용이 필요한 경우는 "set state"가 필요할 것입니다.
