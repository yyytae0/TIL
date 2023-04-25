# JavaScript
## INDEX
- Event
  - Event란?
  - Event 등록하기
  - Event 전파

## Event
### 개요
- Event란 HTML 요소에서 발생하는 모든 상황을 의미
  - 예를 들어 사용자가 웹 페이지의 버튼을 클릭한다면 클릭에 대해 이벤트가 발생하고 우리는 이벤트를 통해 클릭이라는 사건에 대한 결과를 받거나, 조작을 할 수 있음
- 클릭 말고도 웹에서는 각양각색의 Event가 존재
  - 키보드 키 입력, 브라우저 닫기, 데이터 제출, 텍스트 복사 등

### Event object
- 네트워크 활동이나 사용자와의 상호작용 같은 사건의 발생을 알리기 위한 객체
- 이벤트가 발생했을 때 생성되는 객체
- Event 발생
  - 마우스를 클릭하거나 키보드를 누르는 등 사용자 행동으로 발생할 수도 있고
  - 특정 메서드를 호출하여 프로그래밍적으로도 만들어 낼 수 있음
- DOM 요소는 Event를 받고(**수신**)
- 받은 Event를 **처리**할 수 있음
  - Event 처리는 주로 addEventListener()메서드를 통해 Event 처리기(Event handler)를 다양한 html 요소에 **부착**해서 처리함

### Event handler
- 특별한 함수가 아닌 일반적인 JavaScript Function을 정의하여 사용
- 웹 페이지에서 발생하는 Event에 대해 반응하여 동작하는 함수를 지칭
- Event handler 함수는 이벤트가 발생했을 때 호출되며, Event 객체를 매개 변수로 전달 받음
- addEventListener()
  - **대상**에 **특정 Event**가 발생하면 ,**할 일**을 등록하자
  - **EventTarget**.addEventlistener(**type**, **handler function**)
  - 지정한 Event가 대상에 전달될 때마다 호출할 함수를 설정
  - Event를 지원하는 모든 객체(Element, Document, Window 등)를 대상(EventTarget)으로 지정 가능
  - type ex) input, click, submit...
  - handler function
    - 지정된 타입의 Event를 수신할 객체
    - JavaScript function 객체(콜백함수)여야 함
    - 콜백 함수는 발생한 Event의 데이터를 가진 Event 객체를 유일한 매개변수로 받음

### Event 전파와 취소
#### Event 전파란?
- DOM 요소에서 발생한 이벤트가 상위 노드에서 하위 노드 혹은, 하위 노드에서 상위 노드로 전파되는 현상을 의미
- addEventListner 메서드를 사용하여 전파 방식을 제어할 수 있음
  - 기본 값은 하위 노드에서 상위 노드로 전파되는 방식을 사용 - Event Bubbling
- 또한, 이러한 이벤트 전파 상황을 필요에 따라 제어할 수도 있음

`event.preventDefault()`
- 현재 Event의 기본 동작을 중단
- HTML 요소의 기본 동작을 작동하지 않게 막음
- HTML 요소의 기본 동작 예시
  - a 태그 : 클릭 시 특정 주소로 이동
  - form 태그 : form 데이터 전송

