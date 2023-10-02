파이어베이스 셋팅은 필요하면 따로 글을 작성하겠다.

![Alt text](/images/book-3/image.png)

파이어베이스 오버뷰 화면에서 설정 버튼을 클릭한다.
그리고 하단으로 내려가면 파이어베이스 초기설정 방법을 확인할 수 있다.

![Alt text](/images/book-3/image-1.png)

설명된 것과 같이 npm install firebase로 firebase를 설치해준다.

![Alt text](/images/book-3/image-2.png)

src/api 폴더 아래에 firebase.ts 파일을 생성해주고 아래의 제품 SDK를 복사해서 붙여준다.
그리고 필요한 부분만 정리하고, 키들은 외부에 공개되지 않도록.env.local 폴더로 옮겨준다.

![Alt text](/images/book-3/image-3.png)

아래와 같이 작업하면 기본 셋팅은 완료되었다.

구글 로그인 작업을 위해서 파이어베이스에서 코드를 복사해온다.

![Alt text](/images/book-3/image-4.png)

다음엔 로그인 함수를 만들어 외부에서 로그인 함수를 호출 시 구글 인증을 할 수 있도록 만든다.
**firebase.ts**

```jsx
export function login() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch(console.error);
}
```

일단 반환되는 값을 확인하기 위해 콘솔로 반환값을 확인한다.
Navbar의 로그인 버튼에 함수를 연결시켜서 확인한다.
**Navbar.ts**

```jsx
...
<button onClick={login}>Login</button>
```

![Alt text](/images/book-3/image-5.png)
로그인 버튼을 클릭하면 위의 로그인 팝업이 열린다. 로그인해서 반환값을 확인해보자.

![Alt text](/images/book-3/image-6.png)
로그인에 성공하면 반환된 객체를 확인할 수 있다. 이제 로그인시 유저 정보를 넘겨주고 로그아웃 시 null을 반환하도록 구성한다.

```jsx
export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}
export async function logout() {
  return signOut(auth).then(() => null);
}
```

그리고 유저 정보를 가져오기 위해서 onAuthStateChanged 함수를 사용합니다.

```jsx
export function onUserStateChange(callback: Function) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
```

Navbar에서 login, logout, onUserStateChange를 navbar에서 import해 줍니다.

```jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import { login, logout, onUserStateChange } from '../api/firebase';
import { User } from 'firebase/auth';
export default function Navbar() {
  const [user, setUser] = (useState < User) | (null > null);
  useEffect(() => {
    onUserStateChange((user: User) => {
      setUser(user);
    });
  }, []);

  const handleLogin = () => {
    login().then((user) => {
      setUser(user);
    });
  };

  const handleLogout = () => {
    logout().then(setUser);
  };

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <nav className='flex items-end gap-4 font-semibold'>
        <Link to='/' className='text-4xl text-primary'>
          동네책방
        </Link>
        <Link to='/neighborhood'>동네인증</Link>
      </nav>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/books/new' className='text-xl'>
          <BsFillPencilFill />
        </Link>
        {!user && <button onClick={handleLogin}>Login</button>}
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}
```

useEffect hook을 사용해 컴포넌트가 마운팅 되는 시점에 실행할 동작을 작성해줍니다. 그리고 의존성을 동작에 따라 지정해주는데 이 경우에는 초기에만 동작이 필요하므로 의존성에 빈 배열을 전달해줍니다. 이렇게 작성하면 새로고침을 하더라도 useEffect로 인해 firebase 계정 설정을 자연스럽게 할 수 있습니다.

일단 기본적인 로그인 로그아웃 기능은 완성했고 다음으론 동네 인증 기능을 구현하겠습니다.
