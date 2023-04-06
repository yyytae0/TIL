# 자바스크립트

## 자바스크립트란?

HTML은 구조, CSS는 디자인 그리고 자바스크립트는 동작(상호작용)을 담당한다고 생각하면 쉽다. 자바스크립트 프레임워크인 리액트, 뷰, 앵귤러를 제대로 활용하기 위해서는 자바스크립트의 이해가 필수적이라 할 수 있다.

```
<script src="java_file.js" defer></script>
```

## 변수(let) & 상수(const)

let은 데이터 값 변경이 가능한 변수이며, const는 데이터 값의 수정이 불가능한 상수이다. 둘 다 데이터값에 이름을 지정하여 사용하고 싶고 데이터 값을 반복해서 사용하기 위해서 사용한다.

```javascript
// 변수 초기화는 let만 가능하며 const는 불가능하다
let value; // 가능
const value; // 불가능

// , 로 구분하면 한꺼번에 여러개의 변수나 상수를 선언할 수 있다.
let a = 1, b = 2;
const a = 1, b = 2;

// const로 선언된 배열과 객체 내부의 값은 변경이 가능하다.
const array = [1, 2, 3];
array[2] = 4;
```

## 데이터 타입
### 숫자
변수에 값을 바로 대입
```javascript
let value = 1;
```
### 문자열
작은 따옴표 혹은 큰 따옴표로 감싸서 선언
```javascript
lst text = 'hello';
```
### 참/거짓(boolean)
```javascript
let good = true;
let bad = false;
```
### null과 undefined
자바스크립트에서 '없음'을 의미하는 데이터 타입
```javascript
// null은 값이 없음을 의미
const friend = null;
// undefined는 값이 설정되지 않음을 의미
let friend;
``` 
