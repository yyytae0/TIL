# WEB

## INDEX

- CSS Layout
  - Float
  - Flexbox

--------------

## Float

### Float
- 박스를 왼쪽 혹은 오른쪽으로 이동시켜 텍스트를 포함 인라인요소들이 주변을 wrapping 하도록 함
- 요소가 Normal flow를 벗어나도록 함

### Float 속성
- none : 기본값
- left : 요소를 왼쪽으로 띄움
- right : 요소를 오른쪽으로 띄움

### Float 정리
- Float는 레이아웃을 구성하기 위해 필수적으로 활용 되었으나, 최근 Flexbox, Grid 등장과 함께 사용도가 낮아짐
- Float 활용 전략 - Normal Flow에서 벗어난 레이아웃 구성
  - 원하는 요소들을 Float로 지정하여 배치

```css
clear: both;  /* 이후로는 다시 normal flow를 따르도록 함 */
```
------

## Flexbox
 - Layout을 위해 탄생한 Flexbox
 - 수직 정렬
 - 아이템의 너비와 높이 혹은 간격을 동일하게 배치

### CSS Flexible Box Layout
- 행과 열 형태로 아이템들을 배치하는 1차원 레이아웃 모델
- 축
  - main axis(메인 축)
  - cross axis(교차 축)
- 구성 요소
  - Flex Container(부모 요소)
  - Flex Item(자식 요소)

### Flexbox 축
- flex-direction : row

### Flexbox 구성요소
- Flex Container(부모 요소)
  - flexbox 레이아웃을 형성하는 가장 기본적인 모델
  - Flex Item들이 놓여있는 영역
  - display 속성을 flex 혹은 inline-flex로 지정
- Flex Item(자식 요소)
  - 컨테이너에 속해 있는 컨텐츠(박스)

### Flexbox 시작

```css
.flex-container{
  display: flex;
}
```
부모요소에 display: flex를 추가하게 되면 컨테이너 안에 아이템들이 배치되는데 주축을 기준으로 배치되며 각각의 아이템들은 내용물의 width를 갖도록, 아이템들의 height는 컨테이너와 같도록 조정된다. > 각자 저마다의 높이를 가져도 자동으로 맞춰준다!

### Flex 속성
- 배치 설정
  - flex-direction
  - flex-wrap
- 공간 나누기
  - justify-content(main axis)
  - align-content(cross axis)
- 정렬
  - align-items(모든 아이템을 cross axis 기준으로)
  - align-self(개별 아이템)

### flex-direction(container)
- Main axis 기준 방향 설정
- 역방향의 경우 HTML 태그 선언 순서와 시각적으로 다르니 유의
1) row
2) row-reverse
3) column
4) column-reverse

### flex-wrap(container)
- 아이템이 컨테이너를 벗어나는 경우 해당 영역 내에 배치되도록 설정
- 즉, 기본적으로 컨테이너 영역을 벗어나지 않도록 함
1) wrap : 넘치면 그 다음 줄로 배치
2) nowrap(기본값) : 한 줄에 배치

### justify(align)-content(container)
( justify : main축 기준, align : 교차축 기준)
- Main(Cross) axis를 기준으로 공간 배부
1) flex-start : axis 시작점으로
2) flex-end : axis 끝 쪽으로
3) center : axis 중앙으로
4) space-between : 간격을 균일하게 분배
5) space-around : 둘러싼 영역을 균일하게 분배(아이템의 상하좌우)
6) space-evenly : 전체 영역에서 아이템 간 간격을 균일하게 분배

### align-items(container) & align-self(item)
- 모든(개별) 아이템들을 Cross-axis를 기준으로 정렬
1) stretch(기본 값) : 컨테이너를 가득 채움
2) flex-start : 위
3) flex-end : 아래
4) center : 가운데
5) baseline : 텍스트 baseline에 기준선을 맞춤

### Flex에 적용하는 속성
- 기타 속성
  - flex-grow : 남은 영역을 아이템에 분배
  - order : 배치 순서
