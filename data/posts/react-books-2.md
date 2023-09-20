프로젝트 라우터 설정을 먼저 해줍니다. 우선 react-router을 설치해줍니다.

```jsx
yarn add react-router-dom
```

파일 구성은 아래와 같이 합니다.

![Alt text](image-9.png)

index.tsx에 라우터 구성을 해줍니다.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Allbooks from './pages/Allbooks';
import NewBook from './pages/NewBook';
import Neighborhood from './pages/Neighborhood';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/books', element: <Allbooks /> },
      {
        path: '/books/new',
        element: <NewBook />,
      },
      {
        path: '/neighborhood',
        element: <Neighborhood />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

그 다음으로 App.tsx에 Outlet을 import 시킵니다. 각 페이지 컴포넌트가 보여져야 하는 부분에 Outlet 컴포넌트를 넣었다.

```jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
```

주소창에 localhost:3000/books로 검색을 하면 books 페이지로 라우팅이 된 것을 확인할 수 있다.

![Alt text](image-10.png)

다음으로 상단의 네비게이션 바를 구성해준다.
우선 src > components 폴더 안에 Navbar.tsx를 생성한다.
![Alt text](image-11.png)

그리고 App.tsx에 Navbar를 가져온다.

```jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
```
