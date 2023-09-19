# React 소개

React는 사용자 인터페이스(UI)를 렌더링하기 위한 JavaScript 라이브러리입니다. UI는 버튼, 텍스트, 이이미와 같은 작은 단위로 구성됩니다. React를 사용하면 재사용 가능하고 중첩 가능한 컴포넌트롤 결합할 수 있습니다. 웹 사이트부터 휴대폰 앱까지 화면의 모든 것을 컴포넌트로 분류할 수 있습니다.

React를 사용하면 마크업, CSS, JavaScirpt를 **앱의 재사용 가능한 UI**요소인 사용자 정의 "컴포넌트"로 결합할 수 있습니다.

HTML 태그와 마찬가지로 컴포넌트를 작성, 순서 지정 및 중첩하여 전체 페이지를 디자인할 수 있습니다.
프로젝트가 성장함에 따라 이미 작성한 컴포넌트를 재사용하여 많은 디자인을 구성할 수 있으므로 개발 속도가 빨라집니다.

## 컴포넌트 정의하기

기존에는 웹 페이지를 만들 때 웹 개발자가 콘텐츠를 마크업한 다음 JavaScript를 뿌려 상호작용을 추가했습니다.
React는 동일한 기술을 사용하면서도 상호작용을 우선시합니다. **React 컴포넌트는 마크업으로 뿌릴 수 있는 JavaScript 함수입니다.**

컴포넌트를 빌드하는 방법

### Step 1: 컴포넌트 내보내기

export default 접두사는 표준 JavaScript 구문. 이 접두사를 사용하면 나중에 다른 파일에서 가져올 수 있도록 파일에 주요 기능을 표시할 수 있습니다.

### Step 2: 함수 정의하기

function Profile() { }을 사용하면 Profile이라는 이름의 JavaScript 함수를 정의할 수 있습니다.

### Step 3: Add markup

이 컴포넌트는 src 및 alt 속성을 가진 img 태그를 반환합니다. img 태그는 HTML처럼 작성되었지만 실제로는 Javascript입니다! 이 구문을 JSX라고 하며, JavaScript 안에 마크업을 삽입할 수 있습니다.

반환문은 이 컴포넌트에서처럼 한 줄에 모두 작성할 수 있습니다.

```jsx
return <img src='https://i.imgur.com/MK3eW3As.jpg' alt='Katherine Johnson' />;
```

그러나 마크업이 모두 return 키워드와 같은 라인에 있지 않은 경우에는 다음과 같이 괄호로 묶어야 합니다.

```jsx
return (
  <div>
    <img src='https://i.imgur.com/MK3eW3As.jpg' alt='Katherine Johnson' />
  </div>
);
```

## 컴포넌트 사용하기

이제 Profile 컴포넌트를 정의했으므로 다른 컴포넌트 안에 중첩할 수 있습니다. 예를 들어, 여러 Profile 컴포넌트를 사용하는 Gallery 컴포넌트를 내보낼 수 있습니다.

```jsx
function Profile() {
  return <img src='https://i.imgur.com/MK3eW3As.jpg' alt='Katherine Johnson' />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

> 괄호가 없으면 return 뒷 라인에 있는 모든 코드가 무시됩니다!

## 컴포넌트 중첩 및 구성

컴포넌트는 일반 JavaScript 함수이므로 같은 파일에 여러 컴포넌트를 포함할 수 있습니다. 컴포넌트가 상대적으로 작거나 서로 밀접하게 관련되어 있을 때 편리합니다. 이 파일이 복잡해지면 언제든지 별도의 파일로 옮길 수 있습니다.

Profile 컴포넌트는 Gallery 내에 렌더링되기 때문에(심지어 여러번!), Gallery는 각 Profile을 "자식"으로 렌더링하는 **부모 컴포넌트**라고 말할 수 있습니다. 컴포넌트를 한 번 정의한 다음 원하는 곳에 원하는 만큼 여러 번 사용할 수 있다는 점이 바로 React의 마법입니다.
