# Bootstrap

## INDEX
- Bootstrap 알아보기
- Bootstrap Grid System

-----------------

## CDN
Content Delivery(Distribution) Network

 - 컨텐츠(CSS, JS, Image, Text 등)을 효율적으로 전달하기 위해 여러 노드를 가진 네트워크에서 데이터를 제공하는 시스템.
 - 개별 end-user의 가까운 서버를 통해 빠르게 전달 가능(지리적 이점)
 - 외부 서버를 활용함으로써 본인 서버의 부하가 적어짐
 - ex) Youtube, Netflix
-----------------

## Bootstrap
### spacing

rem : 브라우저 html font-size에 비례(기본값 : 16px)

- m-1 : 0.25rem > 4px
- m-2 : 0.5rem > 8px
- m-3 : 1rem > 16px
- etx . . .

### spacing 종합

- m ,p : margin, padding

- t, b, s, e, y, x : top, bottom, left, right, top&bottom, left&right

### 반응형 웹(Responsive Web)
 - 부트스트랩 쓰는 가장 큰 이유 중 하나

-----------------
## Bootstrap Grid System

### The Grid System
- CSS가 아닌 편집 디자인에서 나온 개념으로 구성 요소를 잘 배치해서 시각적으로 좋은 결과물을 만들기 위함
- 기본적으로 안쪽에 있는 요소들의 오와 열을 맞추는 것에서 기인
- 정보 구조와 배열을 체계적으로 작성하여 정보의 질서를 부여하는 시스템

### Web에서의 Grid System
- 요소들의 디자인과 배치에 도움을 주는 시스템
- 기본 요소
  - Column : 실제 컨텐츠를 포함하는 부분
  - Gutter : 컬럼과 컬럼 사이의 공간(사이 간격)
  - Container : Column들을 담고 있는 공간

### Bootstrap grid system
- Bootstrap Grid system은 flexbox로 제작됨
- container, rows, column으로 컨텐츠를 배치하고 정렬
- 반드시 기억해야 할 2가지!!
  - 12개의 column
  - 6개의 grid breakpoints