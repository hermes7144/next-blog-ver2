# 컴포넌트란?

React를 사용하면 앱의 **재사용가능한 UI 요소**인 컴포넌트를 만들 수 있다.
React 앱에서 모든 UI는 컴포넌트입니다.

HTML 태그와 마찬가지로 컴포넌트를 작성, 순서 지정 및 중첩하여 전체 페이지를 디자인할 수 있다.

```jsx
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to='/docs'>Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```

위의 코드는 리액트 코드이다. 다른 곳에서 전에 작성한 컴포넌트를 재사용하여 디자인을 구성할 수 있으므로 개발 속도가 빨라진다. 예를 들어위의 `<TableOfContents />`를 사용해 다른화면에 추가할 수 있다.

## 컴포넌트 정의하기

기존에 웹페이지를 만들 때 웹 개발자가 콘텐츠를 마크업한 다음 JavaScript를 뿌려 상호작용을 추가했습니다. 이건 상호작용이 웹에서 필수적인 요소가 아닐 때는 잘 작동했습니다. 현재는 많은 사이트와 모든 앱에서 상호작용이 필요합니다. React는 여전히 동일한 기술을 사용하면서 상호작용을 우선시합니다.
리액트 컴포넌트는 JSX를 사용하여 UI를 구성하고, 이를 마크업으로 변환하여 브라우저에 렌더링됩니다. JSX는 HTML과 유사한 구문을 가지며, JavaScript로 변환되어 React 컴포넌트를 구현합니다.

### Step 1: 컴포넌트 내보내기

`export default` 접두사는 표준 JavaScript 구문으로, 이 접두사를 사용하면 나중에 다른 파일에서 가져올 수 있도록 파일에 주요 기능을 표시할 수 있다.

### Step 2: 함수 정의하기

`function Profile() { }`를 사용하면 Profile이라는 JavaScript 함수를 정의할 수 있다.

### Step 3: 마크업 추가하기

```jsxTraditionally when creating web pages, web developers marked up their content and then added interaction by sprinkling on some JavaScript. This worked great when interaction was a nice-to-have on the web. Now it is expected for many sites and all apps. React puts interactivity first while still using the same technology: a React component is a JavaScript function that you can sprinkle with markup. Here’s what that looks like (you can edit the example below)Traditionally when creating web pages, web developers marked up their content and then added interaction by sprinkling on some JavaScript. This worked great when interaction was a nice-to-have on the web. Now it is expected for many sites and all apps. React puts interactivity first while still using the same technology: a React component is a JavaScript function that you can sprinkle with markup. Here’s what that looks like (you can edit the example below)
return <img src='https://i.imgur.com/MK3eW3As.jpg' alt='Katherine Johnson' />;
```

위 `<img />`는 HTML처럼 작성되었지만 JavaScript입니다. 이 구문을 JSX라고 하며, JavaScript 안에 마크업을 삽입할 수 있습니다.

최종 코드는 이렇습니다.

```jsx
export default function Profile() {
  return <img src='https://i.imgur.com/MK3eW3As.jpg' alt='Katherine Johnson' />;
}
```

##컴포넌트의 모든 것
대부분의 React 앱은 모든 부분에서 컴포넌트를 사용합니다. 즉, 버튼과 같이 재사용 가능한 부분뿐만 아니라 사이드바, 목록, 그리고 궁극적으로 전체 페이지와 같은 더 큰 부분에도 컴포넌트를 사용하게 됩니다! 컴포넌트는 한 번만 사용되더라도 UI 코드와 마크업을 정리하는 편리한 방법입니다.
리액트 기반 프레임워크들은 이를 한 단계 더 발전시킵니다. 빈 HTML 파일을 사용하고 React가 JavaScript로 페이지 관리를 "대행"하도록 하는 대신, React 컴포넌트에서 HTML을 자동으로 생성하기도 합니다. 이를 통해 JavaScript 코드가 로드되기 전에 앱에서 일부 컨텐츠를 표시할 수 있습니다.

컴포넌트의 가장 큰 장점은 재사용성으로 컴포넌트를 조합해 또 다른 컴포넌트를 만들 수 있습니다. 컴포넌트를 여러 번 중첩하게 되면 다른 파일로 분리해야 하는 시점이 생깁니다. 이렇게 분리하면 나중에 파일을 더 찾기 쉽고 재사용하기 편리해집니다.
