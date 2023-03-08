# CSS

## INDEX

- CSS 기본기
  - CSS Box Model
  - Chrome 개발자 도구
  - CSS Layout(Display, Position)
  - Practice(Box Positioning)

-----------------------

## Box model

### CSS 원칙 1

 - 모든 요소는 네모(박스모델)이고, 위에서부터 아래로, 왼쪽에서 오른쪽으로 쌓인다.(좌측 상단에 배치) - Normal Flow

### Box model

 - 모든 HTML 요소는 box 형태로 되어있음
 - 하나의 박스는 네 부분(영역)으로 이루어짐
   - content : 글이나 이미지 등 요소의 실제 내용
   - padding : 테두리 안쪽의 내부 여백 요소에 적용된 배경색, 이미지는 padding까지 적용
   - border : 테두리 영역
   - margin : 테두리 바깥의 외부 여백 배경색을 지정할 수 없다

### box-sizing

기본적으로 모든 요소의 box-sizing은 content-box
 - Padding을 제외한 순수 contents 영역만을 box로 지정

다만, 우리가 일반적으로 영역을 볼 때는 border까지의 너비를 보는 것을 원함
 - 그 경우 box-sizing을 border-box로 설정

--------------------
## CSS Display

### CSS 원칙 2

 - display에 따라 크기와 배치가 달라진다.

### 대표적으로 활용되는 display

- block
  - 줄 바꿈이 일어나는 요소(다른 elem를 밀어낸다)
  - 화면 크기 전체의 가로 폭을 차지한다.
  - 블록 레벨 요소 안에 인라인 레벨 요소가 들어갈 수 있음
  - ex) div, ul, ol, li, p, hr, form emd
- inline
  - 줄 바꿈이 일어나지 않는 행의 일부 요소
  - content를 마크업 하고 있는 만큼만 가로 폭을 차지한다.
  - width, height, margin-top, margint-bottom을 지정할 수 없다.
  - 상하 여백은 line-heigt로 지정한다.
  - ex) span, a, img, input, label, b, em, i, strong 등
- inline-block
  - block과 inline 레벨 요소의 특징을 모두 가짐
  - inline처럼 한 줄에 표시 가능하고, block처럼 width, height, margin속성을 모두 지정할 수 있음
- none
  - 해당 요소를 화면에 표시하지 않고, 공간조차 부여되지 않음
  - 이와 비슷한 visibility: hidden은 해당 요소가 공간은 차지하나 화면에 표시만 하지 않는다.

### block

block의 기본 너비는 가질 수 있는 너비의 100%이다.

너비를 가질 수 없다면 자동으로 margin이 부여된다.

### inline

inline의 기본 너비는 컨텐츠 영역만큼

수평정렬 : inline이 정렬하는게 아닌 block이 정렬해주는 것!!

--------------------

## CSS Position

### CSS 원칙 3
 - position으로 위치의 기준을 변경한다.

### CSS Position

 - 문서 상에서 요소의 위치를 지정 (어떤 기준으로 어디에 배치시킬지)
 - 모를때는? 공식 문서를 이용!! MDN!!

### static : 모든 태그의 기본 값(기준 위치)
 - 일반적인 요소의 배치 순서에 따름(좌측 상단)
 - 부모 요소 내에서 배치될 때는 부모 요소의 위치를 기준으로 배치 됨

### relative : 상대 위치
 - 자기 자신의 static 위치를 기준으로 이동(normal flow 유지)
 - 레이아웃에서 요소가 차지하는 공간은 static일 때와 같음(normal position 대비 offset)
  
### absolute : 절대 위치
 - 요소를 일반적인 문서 흐름에서 제거 후 레이아웃에 공간을 차지하지 않음(normal flow에서 벗어남)
 - static이 아닌 가장 가까이 있는 부모/조상 요소를 기준으로 이동(없는 경우 body)

### fixed : 고정 위치
 - 요소를 일반적인 문서 흐름에서 제거 후 레이아웃에 공간을 차지하지 않음(normal flow에서 벗어남)
 - 부모 요소와 관계없이 viewport를 기준으로 이동
   - 스크롤 시에도 항상 같은 곳에 위치함

### sticky : 스크롤에 따라 static -> fixed로 변경
 - 속성을 적용한 박스는 평소에 문서 안에서 position: static 상태와 같이 일반적인 흐름에 따르지만, 스크롤 위치가 임계점에 이르면 position: fixed와 같이 박스를 화면에 고정할 수 있는 속성

-------------------
## 개발자 도구

### 크롬 개발자 도구

 - 웹 브라우저 크롬에서 제공하는 개발과 관련된 다양한 기능을 제공
 - 주요기능
   - Elements - DOM 탐색 및 CSS 확인 및 변경
     - Styles - 요소에 적용된 CSS확인
     - Computed - 스타일이 계산된 최종 결과
     - Event Listeners - 해당 요소에 적용된 이벤트(JS)
   - Sources, Network, Performance, Application, Security, Audits 등