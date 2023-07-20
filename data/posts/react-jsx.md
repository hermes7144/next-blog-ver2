## JSX란?

JSX는 JavasScript를 확장한 문법으로, JavaScript 파일 안에 HTML과 유사한 마크업을 작성할 수 있도록 해줍니다.
수년동안 HTML이 컨텐츠를, CSS는 디자인을, 로직은 JavaScript로 작성했습니다.

하지만 웹이 더욱 인터렉티브해지면서 로직이 컨텐츠를 결정하는 경우가 많아졌습니다. 그래서 JavaScript가 HTML을 담당하게 되었습니다!
**이것이 바로 React에서 렌더링 로직과 마크업이 같은 위치의 컴포넌트에 함께 있는 이유입니다.**

버튼 렌더링 로직과 마크업이 함께 존재한다면 전체 편집에서 서로 동기화 상태를 유지할 수 있습니다.
React 컴포넌트느 JSX라는 구문 확장자를 사용하여 해당되는 마크업을 표현합니다. JSX는 HTML과 매우 비슷하지만 약간 더 엄격하며 동적인 정보를 표시할 수 있습니다.

> JSX와 React는 서로 다른 별개의 개념입니다. JSX는 문법 확장이며, React는 JavaScript 라이브러리입니다.

## JSX 규칙

### 1. 단일 루트 엘리먼트를 반환하세요.

> 왜 여러개의 JSX 태그를 감싸줘야하는가?
> JSX가 JavaScript의 문법적 확장이며 JavaScript 코드로 컴파일되기 때문입니다. JavaScript에서 함수는 단일 값 또는 객체만 반환할 수 있습니다. 따라서 감싸지 않은 여러 개의 JSX 태그는 단일 값을 반환하는 규칙을 위반하므로 구문 오류가 생깁니다.
> 부모 컨테이너인 `<div>` 요소나 React Fragment(`<>...</>`)와 같은 요소로 여러 개의 JSX 태그를 감싸주면, 여러 개의 JSX 태그를 포함하는 단일 부모 요소를 제공합니다.

### 2. 모든 태그를 닫으세요.

### 3. ~~거의~~ 대부분이 카멜 케이스입니다!

```jsx
<img
  src='https://i.imgur.com/yXOvdOSs.jpg' //
  alt='Hedy Lamarr' //
  className='photo'
/>
```

## 중괄호 사용하기

JSX는 JavaScript를 작성하는 특별한 방법입니다. 이는, 중괄호 `{ }`안에서 JavaScript를 사용할 수 있다는 의미입니다.
아래 예시에서는 먼저 과학자의 이름인 name 을 선언한 다음 <h1>안에 중괄호와 함께 포함시켰습니다.

```jsx
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return <h1>{name}'s To Do List</h1>;
}
```

## 중괄호 사용 위치

1. JSX 태그 안에 직접 **텍스트**로 사용 `<h1>{name}'s To Do List</h1>`는 작동하지만 <{tag}>NoName's To Do List</{tag}>는 작동하지 않습니다.
2. `=` 기호 바로 뒤에 오는 **속성**: `src={avatar}`는 아바타 변수를 읽지만 src="{avatar}"는 문자열 "{avatar}"를 전달합니다.

## 이중 중괄호 사용: JSX 내에서의 CSS 및 다른 객체

문자열, 숫자 및 기타 JavaScript 표현식 외에도 JSX로 객체를 전달할 수도 있습니다. 따라서 JSX에서 JS 객체를 전달하려면 다른 중괄호 쌍으로 객체를 감싸야 합니다. `person={{name: "Hedy Lamarr", inventions: 5}}`

JSX 인라인 CSS 스타일에서 이것을 볼 수 있습니다. React에서는 인라인 스타일을 사용할 필요가 없습니다. 하지만 인라인 스타일이 필요한 경우 `style` 어트리뷰트에 객체를 전달합니다.

```jsx
<ul style={
  {
    backgroundColor: 'black',
    color:'pink'
  }
}>
```

다음에 JSX에서 `{{`와 `}}`를 볼 때, 이는 JSX 중괄호 내부의 객체일 뿐이라는 점을 기억하세요!
