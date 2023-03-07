# WEB

### INDEX

 - HTML
   - HTML 이해하기
   - HTML 기본구조
   - HTML 문서 구조화
 - CSS
   - CSS 이해하기
   - CSS Selectors
   - CSS 단위
   - CSS 상속

---------
### **웹 사이트는 웹 페이지의 모음**
웹 사이트란 웹 브라우저를 통해서 접속하는 웹 페이지들의 모음!!

웹 페이지는 글, 그림, 동영상 등 여러가지 정보를 담고 있으며, 링크를 통해 다른 웹 페이지로 이동이 가능

즉, **링크를 통해 여러 웹 페이지를 연결한 것**이 웹 사이트

-------------------
### 웹 페이지 구성요소
1. HTML : 구조(레이아웃)
2. HTML + CSS : 표현(스타일링)
3. HTML + CSS + JS : 동작(인터렉션)

----------------------

# HTML

HTML(Hyper Text Markup Language)

Hyper Text : 하이퍼링크를 통해 사용자가 한 문서에서 다른 문서로 즉시 접근할 수 있는 텍스트

Markup Language : 태그 등을 이용하여 문서나 데이터의 구조를 명시하는 언어 ex) HTML, Markdown

**웹페이지를 구조화 하기 위한 언어**

-----------

MDN : 성경!!

W3School : 자습서!!

-----------------

## HTML 기본구조

### HTML 기본구조

 - html : 문서의 최상위(root) 요소
 - head : 문서의 메타데이터 요소
   - 문서제목, 인코딩, 스타일, 외부 파일 로딩 등
   - 일반적으로 브라우저에 나타나지 않는 내용
 - body : 문서 본문 요소
   - 실제 화면 구성과 관련된 내용

### 요소

HTML의 요소는 태그와 내용으로 구성되어 있다.
 - 모든 내용은 태그로 감싸져 있어야 한다
```
<h1>contents</h1>
```

### 속성

각 태그별로 사용할 수 있는 속성이 다르다 

속성은 속성명과 속성값으로 이루어져 있다

```
<a href="https://google.com"></a>
```
여는태그 안쪽에 공백 없이!! 쌍따옴표 사용!!
(속성 지정 스타일 가이드)

-------------

주석 :  \<!-- 주석 -->

-------

## HTML 문서 구조화

### form

 - \<form>은 사용자의 정보를 제출하기 위한 영역

### input

 - 다양한 타입을 가지는 입력 데이터 유형과 위젯이 제공됨
 - \<input> 대표적인 속성
   - etc

### input label

 - label을 클릭하여 input 자체의 초점을 맞추거나 활성화 시킬 수 있음
   - 사용자는 선택할 수 있는 영역이 늘어나 웹/모바일 환경에서 편하게 사용할 수 있음
   - label과 input 입력의 관계가 시각적 뿐만 아니라 화면리더기에서도 label을 읽어 쉽게 내용을 확인 할 수 있도록 함
 - \<input> 에 id 속성을, \<label> 에는 for 속성을 활용하여 상호 연관을 시킴
  ```
  <label> for="agreement">개인정보 수집에 동의합니다.</label>
  <input> type="checkbox" name="agreement" id="agreement">
  ```

### input 유형-일반

- 일반적으로 입력을 받기 위하여 제공되며 type으로 HTML기본 검증 혹은 추가 속성을 활용할 수 있음
  - text : 일반 텍스트 입력
  - password : 입력 시 값이 보이지 않고 문자를 특수기호로 표현
  - email : 이메일 형식이 아닌 경우 form 제출 불가
  - number : min, max, step 속성을 활용하여 숫자 범위 설정 가능
  - file : accept 속성을 활용하여 파일 타입 지정가능

### input 유형 - 항목 중 선택

- label로 선택에 대한 내용을 작성하고, 항목으로 선택할 수 있는 input을 제공
- 동일한 범주에 속하는 항목들은 name을 통일하고, 선택된 항목의 값은 value로 지정함
  - checkbox : 다중 선택
  - radio : 단일 선택

### input 유형 - 종합

\<input> 요소의 동작은 type에 따라 달라지므로, 각각의 내용을 숙지할 것!!

-------------------

# CSS

CSS(Cascading Style Sheets) : 스타일을 지정하기 위한 언어

선택하고, 스타일을 지정하다 (2 step)

-------

### CSS 구문
```
h1{
  color: blue;
  font-size: 15px;
}
```
h1 : 선택자(Selector)

color : 속성

blue : 값

color: blue; : 선언(Declaration)

----------

### CSS 정의 방법

1. 인라인(inline)
2. 내부참조(embedding) - \<style>
3. 외부참조(link file) - 분리된 CSS 파일

#### 인라인

 - 해당 태그에 직접 style 속성을 활용

#### 내부참조

 - \<head> 태그 내에 \<style>에 지정

#### 외부참조

 - 외부 CSS 파일을 \<head>내 \<link>를 통해 불러오기

------

## CSS Selectors

### 선택자 유형

- 기본 선택자
  - 전체 선택자(*), 요소(tag) 선택자
  - 클래스(.class) 선택자, 아이디(#id) 선택자, 속성(attr) 선택자
- 결합자(Comvinators)
  - 자손 결합자(.box p), 자식 결합자(.box > p)

### CSS 적용 우선순위(cascading order)

1. 중요도(Importance) - 사용시 주의
   - !important
2. 우선 순위
   - 인라인 > id > class, 속성 > 요소

## CSS 상속

### CSS 상속

 - CSS는 상속을 통해 부모 요소의 속성을 자식에게 상속한다.
   - 속성(프로퍼티) 중에는 **상속이 되는 것**과 **되지 않는 것**들이 있다.
   - MDN을 통해 확인하기!!