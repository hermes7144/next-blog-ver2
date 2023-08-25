## State 로직을 Reducer로 추출하기

여러 개의 state 업데이트가 여러 이벤트 핸들러에 분산되어 있는 컴포넌트는 과부하가 걸릴 수 있습니다. 이러한 경우, reducer라고 하는 단일 함수를 통해 컴포넌트 외부의 모든 state 업데이트 로직을 통합할 수 있습니다.

### reducer로 state 로직 통합하기

Reducer는 state를 관리하는 다른 방법입니다. useState에서 useReducer로 마이그레이션하는 방법은 세 단계로 진행됩니다:

1. state를 설정하는 것에서 action들을 전달하는 것으로 **변경**하기
2. reducer 함수 **작성**하기
3. 컴포넌트에서 reducer **사용**하기

### Step 1: state 설정을 action들의 전달로 바꾸기

reducer를 사용한 state 관리는 state를 직접 설정하는 것과 약간 다릅니다. state를 설정하여 React에게 "무엇을 할 지"를 지시하는 대신, 이벤트 핸들러에서 "action"을 전달하여 "사용자가 방금 한 일"을 지정합니다.(state 업데이트 로직은 다른 곳에 있습니다!) 즉, 이벤트 핸들러를 통해 "tasks를 설정"하는 대신 "task를 추가/변경/삭제"하는 action을 전달하는 것입니다.

```jsx
function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function handleChangeTask(task) {
  dispatch({
    type: 'changed',
    task: task,
  });
}

function handleDeleteTask(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId,
  });
}
```

dispatch 함수에 넣어준 객체를 "action"이라고 합니다.

```jsx
function handleDeleteTask(taskId) {
  dispatch(
    // "action" object:
    {
      type: 'deleted',
      id: taskId,
    }
  );
}
```

이 객체는 일반적인 JavaScript 객체입니다. 여기에 무엇을 넣을지는 여러분이 결정하지만, 일반적으로 무슨 일이 *일어났는지*에 대한 최소한의 정보를 포함해야 합니다.

### Note

action 객체는 어떤 형태든 될 수 있습니다.
그렇지만 무슨 일이 일어나는지 설명하는 문자열 타입의 type을 지정하고 추가적인 정보는 다른 필드를 통해 전달하도록 작성하는게 일반적입니다. type은 컴포넌트에 따라 다르므로 이 예에서는 'added' 또는 'added_task'를 사용하면 됩니다. 무슨 일이 일어나는지를 설명하는 이름을 선택하세요!

```jsx
dispatch({
  // specific to component
  type: 'what happend',
  // other fields go here
});
```

### Step 2: reducer 함수 작성하기

reducer 함수에 state 로직을 둘 수 있습니다. 이 함수는 두 개의 매개변수를 가지는데, 하나는 현재 state이고 하나는 action 객체입니다. 그리고 이 함수가 다음 state를 반환합니다.

```jsx
function yourReducer(state, action) {
  // return next state for React to set
}
```

React는 reducer로부터 반환된 것을 state로 설정할 것입니다.

state를 설정하는 로직을 이벤트 핸들러에서 reducer 함수로 옮기기 step

1. 현재의 state(tasks)를 첫 번째 매개변수로 선언하세요.
2. action 객체를 두 번째 매개변수로 선언하세요.
3. 다음 state를 reducer 함수에서 반환하세요.(React가 state로 설정할 것입니다.)

아래는 모든 state 설정 로직을 reducer 함수로 옮긴 내용입니다.

```jsx
function tasksReducer(tasks, action) {
  if (action.type === 'added') {
    return [
      ...tasks,
      {
        id: action.id,
        text:action.text,
        done:false
      }
    ]
  } else if (action.type === 'changed') {
    return tasks.map((t) => {
      if (t.id === action.task.id) {
        return action.task;
      } eles {
        return t;
      }
    });
  } else if (action.type === 'deleted') {
    return tasks.filter((t) => t.id !== action.id);
  } else {
    throw Error('Unknown action: ' + action.type);
  }
}
```

reducer 함수는 state(tasks)를 매개변수로 갖기 때문에, **컴포넌트 밖에서 reducter 함수를 선언**할 수 있습니다. 이렇게 하면 들여쓰기 단계도 줄이고 코드를 읽기 쉽게 만들 수 있습니다.

### Note

그러나 reducer 안에서는 switch 구문을 사용하는 게 일반적입니다. 결과는 똑같지만 switch 구문이 한 눈에 봐도 읽기 더 편하다.

```jsx
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

case 블럭을 모두 중괄호 { }로 감싸는 걸 추천합니다. 이렇게 하면 다양한 case들 안에서 선언된 변수들이 서로 충돌하지 않습니다. 또한, 하나의 case는 보통 return으로 끝나야합니다. 만약 return을 잊는다면 이 코드는 다음 case에 빠지게 될 것이고, 이는 실수로 이어질 수 있습니다.

### 왜 reducer라고 부를까요?

reducer들이 비록 컴포넌트 안에 있는 코드의 양을 "줄여주긴"하지만, 이건 사실 배열에서 사용한느 reduce() 연산을 따서 지은 이름입니다.
reduce() 연산은 배열을 가지고 많은 값들을 하나의 값으로 "누적"할 수 있습니다.

reduce로 넘기는 함수가 "reducer"로 알려져 있습니다. 지금까지의 결과와 현재의 아이템을 가지고, 다음 결과를 반환합니다. React reducer는 이 아이디어와 똑같은 예시입니다. React reducer도 지금까지의 state와 action을 가지고 다음 state를 반환합니다. 이런 방식으로 시간이 지나면서 action들을 state로 모으게 됩니다.
심지어 reduce() 메서드를 initialState와 actions 배열을 사용해서 reducer로 최종 state를 계산할 수도 있습니다.

```jsx
import tasksReducer from './tasksReducer.js';

let initialState = [];
let actions = [
  { type: 'added', id: 1, text: 'Visit Kafka Museum' },
  { type: 'added', id: 2, text: 'Watch a puppet show' },
  { type: 'deleted', id: 1 },
  { type: 'added', id: 3, text: 'Lennon Wall pic' },
];
let finalState = actions.reduce(tasksReducer, initialState);

const output = document.getElementById('output');
output.textContent = JSON.stringify(finalState, null, 2);
```

### step 3: 컴포넌트에서 reducer 사용하기

마지막으로, 컴포넌트에 tasksReducer를 연결해야 합니다. React에서 useReducer Hook을 import 하세요.

```jsx
import { useReducer } from 'react';
```

그런 다음, useState 대신:

```jsx
const [tasks, setTasks] = useState(initialState);
```

useReducer로 바꿔주세요.

```jsx
const [tasks, dispatch] = useReducer(tasksReducer, initialState);
```

useReducer Hook은 useState와 비슷합니다. 초기 state 값을 전달해야 하며, 그 결과로 state 값과 state 설정자 함수(useReducer의 경우 dispatch 함수)를 반환합니다. 하지만 조금 다른 점이 있습니다.
useReducer Hook은 두 개의 인자를 받습니다.

1. reducer 함수
2. 초기 state

그리고 아래 내용을 반환합니다.

1. state값
2. dispatch함수(사용자의 action을 reducer에 "전달"해주는 함수)
