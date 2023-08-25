# context로 데이터 깊숙히 전달하기

Context는 컴포넌트가 그 아래 전체 트리에 일부 정보를 제공할 수 있도록 합니다.

## props 전달의 문제

props 전달은 UI 트리를 통해 데이터를 사용하는 컴포넌트로 명시적으로 연결할 수 있는 좋은 방법이다.
그러나 트리 깊숙히 props을 전달해야 하거나 많은 컴포넌트에 동일한 prop이 필요한 경우 prop 전달이 장황하고 불편해질 수 있습니다. 가장 가까운 공통 조상이 데이터가 필요한 컴포넌트에서 멀리 떨어져 있을 수 있으며, state를 그렇게 높이 끌어올리면 "prop drilling"이라고 불리는 상황이 발생할 수 있습니다.
props를 전달하지 않고도 트리에서 데이터를 필요한 컴포넌트로 "텔레포트" 하려면 React를 context기능을 사용하면 된다.

## Context: props 전달의 대안

Context를 사용하면 상위 컴포넌트가 그 아래 전체 트리에 데이터를 제공할 수 있습니다.

Context 구성 3 Step:

1. context를 **생성**합니다.
2. 데이터가 필요한 컴포넌트에서 해당 context를 **사용**합니다.
3. 데이터를 지정하는 컴포넌트에서 해당 context를 **제공**합니다.

context는 멀리 떨어진 상위 트리라도 그 안에 있는 전체 트리에 일부 데이터를 제공할 수 있게 해줍니다.

### Step1: context 만들기

먼저 context를 만들어야 합니다. 컴포넌트에서 사용할 수 있도록 **파일에서 내보내기**를 해야 합니다.

```jsx
import { createContext } from 'react';

export const LevelContext = createContext(1);
```

createContext의 유일한 인수는 기본값입니다. 여기서 1은 가장 큰 제목 수준을 의미하지만 모든 종류의 값(객체 포함)을 전달할 수 있습니다. 기본값의 중요성은 다음 단계에서 확인할 수 있습니다.

### Step2: context 사용하기

React와 context에서 useContext Hook을 가져옵니다:

```jsx
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';
```

현재 Heading 컴포넌트는 props에서 level을 읽습니다.

```jsx
export default function Heading({ level, children }) {
  // ...
}
```

대신 level prop을 제거하고 방금 import한 context인 LevelContext에서 값을 읽습니다.

```jsx
export default function Heading({ children }) {
  const level = useContext(LevelContext);
  // ...
}
```

useContext는 Hook입니다. useState 및 useReducer와 마찬가지로, React 컴포넌트의 최상단에서만 Hook을 호출할 수 있습니다. **useContext는 React에게 Heading 컴포넌트가 LevelContext를 읽기를 원한다고 알려줍니다.**

### Step 3: context 제공하기

**context provider로 감싸** LevelContext를 제공하세요.

```jsx
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children}) {
  return (
    <section className="section">
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </sction>
  )
}
```

이는 React에게 "이 <Secttion> 안에 있는 컴포넌트가 LevelContext를 요청하면 이 level을 제공하라."고 지시합니다. 컴포넌트는 그 위에 있는 UI트리에서 가장 가까운 <LevelContext.Provider>의 값을 사용합니다.

```jsx
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section level={1}>
      <Heading>Title</Heading>
      <Section level={2}>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section level={3}>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section level={4}>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

원래 코드와 동일한 결과이지만, 각 Heading 컴포넌트에 level prop을 전달할 필요가 없습니다! 대신, 위의 가장 가까운 Section에 요청하여 제목 level을 "파악"합니다.

1. level prop을 <Section>에 전달합니다.
2. Section은 Section의 children을 <LevelContext.Provider value={level>로 감쌉니다.
3. Heading은 useContext(LevelContext)를 사용하여 위의 LevelContext 값에 가장 가까운 값을 요청합니다.

## context를 사용하기 전에

context는 매우 매혹적이지만 쉽게 남용될 수도 있습니다. **props를 몇 단계 깊이 전달해야 한다고 해서 해당 정보를 context에 넣어야 한다는 의미는 아닙니다.**
다음은 context를 사용하기 전에 고려해야 할 몇 가지 대안입니다:

1. **props 전달로 시작하세요.** 컴포넌트가 단순하지 않은 경우, 종종 수십개의 prop를 여러 컴포넌트를 통해 전달하는 것이 흔합니다. 이 작업은 지루할 수 있지만 어떤 컴포넌트에서 사용하는지 명확하게 보여주기 때문에 중요합니다! 코드를 유지 관리하는 사람은 props를 사용하여 데이터 흐름을 명확하게 만든 것에 만족할 것입니다.
2. 컴포넌트를 추출하고 JSX를 children으로 전달하세요. 일부 데이터를 사용하지 않는 중간 컴포넌트의 여러 레이어를 거쳐 전달한다면(그리고 더 아래로만 전달한다면), 이는 종종 그 과정에서 일부 컴포넌트를 추출하는 것을 잊었다는 것을 의미합니다. 예를 들어, posts과 같은 데이터르 props를 직접 사용하지 않는 시각적 컴포넌트에 <Layout posts={posts} />와 같은 방법 대신 Layout이 children을 prop로 사용하도록 만들고 <Layout><Posts posts={posts}/></Layout>를 렌더링합니다. 이렇게 하면 데이터를 지정하는 컴포넌트와 데이터를 필요로하는 컴포넌트 사이에 레이어 수가 줄어듭니다.
   이 두 가지 접근 방식이 모두 적합하지 않은 경우 context를 고려하세요.

## context 사용 사례

**테마:** 앱에서 사용자가 앱의 모양을 변경할 수 있는 경우(예: 다크모드), 앱 상단에 context provider를 배치하고 시각적 모양을 조정해야 하는 컴포넌트에서 해당 context를 사용할 수 있습니다.
**현재 계정:** 많은 컴포넌트에서 현재 로그인한 사용자를 알아야 할 수 있습니다. 이 정보를 context에 넣으면 트리의 어느 곳에서나 편리하게 읽을 수 있습니다.
**라우팅**: 대부분의 라우팅 솔루션은 내부적으로 context를 사용하여 현재 경로를 유지합니다. 이것이 모든 링크가 활성 상태인지 아닌지를 "아는" 방식입니다. 자체 라우터를 구축하는 경우에도 이러한 방식을 사용할 수 있습니다.
**state 관리:** 앱이 성장함에 따라 앱 상단에 많은 state가 가까워질 수 있습니다. 아래에 있는 많은 멀리 떨어진 컴포넌트에서 이를 변경하고 싶을 수 있습니다. context와 함께 reducer를 사용하여 복잡한 state를 관리하고 번거로움 없이 멀리 떨어진 컴포넌트에 전달하는 것이 일반적입니다.

Context는 정적인 값에 국한되지 않습니다. 다음 렌더링에서 다른 값을 전달하면, React는 해당 값을 아래에서 읽는 모든 컴포넌트를 업데이트합니다! 이것이 context가 state와 함께 자주 사용되는 이유입니다. 이것이 Context가 종종 state와 함께 사용되는 이유입니다.
