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
