JavaScript에서 배열은 변경 가능하지만 state에 저장할 때는 변경이 불가능한 것으로 취급해야 합니다. 객체와 마찬가지로, state에 저장된 배열을 업데이트하려면, 새로운 배열을 만들고 (또는 기존 배열을 복사본을 만듦) 새 배열을 사용하도록 state를 설정해야 합니다.

## 변이 없이 배열 업데이트하기

JavaScript에서 배열은 객체의 또 다른 종류일 뿐입니다. 객체와 마찬가지로, **React state의 배열은 읽기 전용으로 취급해야 합니다.** 즉, arr[0] = 'bird'와 같이 배열 내부 항목을 재할당해서는 안 되며, push() 및 pop() 같이 배열을 변이하는 메서드도 사용해서는 안됩니다.
filter() 및 map()과 같이 비변이 메서드를 호출하여 새 배열을 만들면 됩니다. 그렇게 만들어진 새 배열을 state로 설정할 수 있습니다.

## 배열에 추가하기

push()는 배열을 변이시킵니다.
대신 기존 항목과 끝에 새 항목을 포함하는 새 배열을 만드세요. 이 작업을 수행하는 방법은 여러가지가 있지만 가장 쉬운 방법은 ...배열 전개 구문을 사용하는 것입니다.

## 배열에서 제거하기

배열에서 항목을 제거하는 가장 쉬운 방법은 필터링하는 것입니다. 즉, 해당 항목을 포함하지 않는 새 배열을 생성합니다. filter 메서드를 주로 사용.filter은 배열을 수정하지 않고 반환한다.

## 배열 변경하기

()배열의 일부 또는 모든 항목을 변경하려면 map()을 사용하여 **새로운** 배열을 만들 수 있습니다. map에 전달할 함수는 데이터 또는 인덱스(또는 둘 다)에 따라 각 항목에 대해 수행할 작업을 결정할 수 있습니다.

## 배열에서 항목 교체하기

배열에서 하나 이상의 항목을 바꾸고 싶은 경우에도 map을 사용하는 것이 좋다.
항목을 바꾸려면 map으로 새 배열을 만듭니다. map 호출 내에서 두 번째 인수로 항목의 인덱스를 받게 된다. 이를 사용하여 원래 항목을 반환하거나 다른 것을 반환할지 결정할 수 있습니다.

```jsx
import { useState } from 'react';

let initialCounters = [0, 0, 0];

export default function CounterList() {
  const [counters, setCounters] = useState(initialCounters);

  function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // Increment the clicked Counter
        return c + 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setCounters(nextCounters);
  }

  return (
    <ul>
      {counters.map((counters, i) => (
        <li key={i}>
          {counter}
          <button
            onClick={() => {
              handleIncrementClick(i);
            }}>
            +1
          </button>
        </li>
      ))}
    </ul>
  );
}
```

## 배열에 다른 변경 사항 적용하기

전개 구문과 map() 및 filter()와 같은 비변이 메서드만으론 할 수 없는 일이 있다. 예를 들어, 배열을 반전시키거나 정렬하고 싶을 수 있다. JavaScript reverse() 및 sort() 메서드는 원래 배열을 변이하므로 직접적으로 사용하면 안됩니다.
대신, **배열을 먼저 복사한 다음 변이하면 됩니다.**

```jsx
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
];

export default function List() {
  const [list, setList] = useState(initialList);

  function handleClick() {
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>Reverse</button>
      <ul>
        {list.map((artwork) => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}
```

여기서는 [...list] 전개 구문을 사용하여 먼저 원본 배열의 복사본을 만듭니다. 이제 복사본이 생겼으므로 nextList.reverse() 또는 nextList.sort()와 같은 변이 메서드를 사용하거나 nextList[0] = "something"으로 개별 항목을 할당할 수도 있습니다.

그러나 **배열을 복사하더라도 배열 내부의 기존 항목을 직접 변이할 수는 없습니다.** 이는 얕은 복사가 이루어져 배열에는 원래 배열과 동일한 항목이 포함되기 때문입니다. 따라서 복사된 배열 내부의 객체를 수정하면 기존 state를 변이하는 것입니다. 예를 들어, 다음의 코드가 문제가 된다.

```jsx
const nextList = [...list];
nextList[0].seen = true; // Problem: mutates list[0]
setList(nextList);
```

nextList와 list 는 서로 다른 배열이지만, **nextList[0]**과 **list[0]**은 같은 객체를 가리킵니다. 따라서 nextList[0].seen을 변경하면 list[0].seen도 변경하는 것입니다. 이것은 state를 변이하므로 피해야 합니다!

## 배열 내부의 객체 업데이트하기

객체는 실제로 배열 "내부"에 존재하지 않습니다. 코드에서는 "내부"에 있는 것처럼 보일 수 있지만 배열의 각 객체는 배열이 "가리키는" 별도의 값입니다. 그렇기 때문에 list[0]과 같이 중첩된 필드를 변경할 때 주의해야 합니다. 다른 사람의 작품 목록이 배열의 동일한 요소를 가리킬 수 있습니다!

**중첩된 state를 업데이트할 때는 업데이트하려는 지점부터 최상위 수준까지 복사본을 만들어야 합니다.**

```jsx
const myNextList = [...myList];
const artwork = myNextList.find((a) => a.id === artworkId);
artwork.seen = nextSeen; // Problem: mutates an existing item
setMyList(myNextList);
```

myNextList 배열 자체는 새 배열이지만, 항목 자체는 원래의 myList 배열과 동일합니다. 따라서 artwork.seen을 변경하면 원본작품 항목이 변경됩니다.
**map을 사용하여 이전 항목에 대한 변이 없이 업데이트된 버전으로 대체할 수 있습니다.**

```jsx
setMyList(
  myList.map((artwork) => {
    if (artwork.id === artworkId) {
      // Create a 'new' object with changes
      return { ...artwork, seen: nextSeen };
    } else {
      return artwork;
    }
  })
);
```

여기서 ...는 객체의 복사본을 만드는데 사용되는 객체 전개 구문입니다.
이 접근 방식을 사용하면 기존ㅇ state 항목이 변이되지 않으며 버그가 수정됩니다.
일반적으로 **방금 만든 객체만 변이해야 합니다.** 새로운 artwork를 삽입하는 경우에는 변이해도 되지만, 이미 있는 state의 artwork을 다루는 경우에는 복사본을 만들어야 합니다.
