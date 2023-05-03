# Vue
## INDEX
- Vue Data Management
  - Pass Props
  - Emit Events
- Lifecycle Hooks

## Data in Components
- 컴포넌트는 부모-자식 관계를 가지고 있으므로, 부모-자식 관계만 데이터를 주고받게 하자!
  - 데이터의 흐름을 파악하기 용이
  - 유지 보수하기 쉬워짐

### Pass props & emit event
- 부모 > 자식으로의 데이터 흐름
  - pass props의 방식
- 자식 > 부모로의 데이터 흐름
  - emit event의 방식

### Pass props
- 요소의 속성(property)을 사용하여 데이터 전달
- props는 부모 컴포넌트의 정보를 전달하기 위한 사용자 지정 특성
- 자식 컴포넌트는 props 옵션을 사용하여 수신하는 props를 명시적으로 선언해야 함
  - 정적인 데이터를 전달하는 경우 static props라고 명시하기도 함
  - 요소에 속성을 작성하듯이 사용 가능하여, prop-data-name="value"의 형태로 데이터를 전달
  - 이때 속성의 키 값은 kebab-case를 사용
- prop 명시
  - 데이터를 받는 쪽, 즉 하위 컴포넌트에서도 props에 대해 명시적으로 작성해주어야 함
  - 전달받은 props를 type과 함께 명시
  - 컴포넌트를 문서화할 뿐만 아니라, 잘못된 타입을 전달하는 경우 브라우저의 자바스크립트 콘솔에서 사용자에게 경고

#### Pass Props convention
- 부모에서 넘겨주는 props
  - kebab-case(HTML 속성명은 대소문자를 구분하지 않기 때문)
- 자식에게 받는 props
  - camelCase
- 부모 템플릿(html)에서 kebab-case로 넘긴 변수를 자식의 스크립트(vue)에서 자동으로 camelCase로 변환하여 인식함

#### Dynamic props
- 변수를 props로 전달할 수 있음
- v-bind directive를 사용해 데이터를 동적으로 바인딩
- 부모 컴포넌트의 데이터가 업데이트되면 자식 컴포넌트로 전달되는 데이터 또한 업데이트 됨
```vue
<template>
<MyChild
  static-props="static"
  :dynamic-props="dynamic"/> // 자식 컴포넌트는 dynamicProps로 데이터를 받는다 
</template>

<script>
export default{
  data: function(){
    return {
      dynamic: "dynamic"
    }
  }
}
</script>
```

#### 컴포넌트의 data 함수
- 각 vue 인스턴스는 같은 data 객체를 공유하므로 새로운 data 객체를 반환(return)하여 사용해야 함

#### 단방향 데이터 흐름
- 모든 props는 부모에서 자식으로 즉 아래로 단방향 바인딩을 형성
- 부모 속성이 업데이트되면 자식으로 흐르지만 반대 방향은 아님
  - 부모 컴포넌트가 업데이트될 때마다 자식 컴포넌트의 모든 prop들이 최신 값으로 새로고침 됨
- 목적
  - 하위 컴포넌트가 실수로 상위 컴포넌트의 상태를 변경하여 앱의 데이터 흐름을 이해하기 힘들게 만드는 것을 방지
- 하위 컴포넌트에서 prop을 변경하려고 시도해서는 안되며 그렇게 하면 Vue는 콘솔에서 경고를 출력함

### Emit Event
- 자식 컴포넌트에서 부모 컴포넌트로 데이터를 전달할 때는 이벤트를 발생 시킴
- 이벤트를 발생시키는 게 어떻게 데이터를 전달하는 것이냐?
  - 데이터를 이벤트 리스너의 콜백함수의 인자로 전달
  - 상위 컴포넌트는 해당 이벤트를 통해 데이터를 받음

#### $emit
- $emit 메서드를 통해 부모 컴포넌트에 이벤트를 발생
  - $emit('event-name') 형식으로 사용하며 부모 컴포넌트에 event-name이라는 이벤트가 발생했다는 것을 알림
  - 마치 사용자가 마우스 클릭을 하면 click 이벤트가 발생하는 것처럼 $emit('event-name')가 실행되면 event-name 이벤트가 발생하는 것
```vue
// 자식 컴포넌트에 버튼을 만들고 클릭 이벤트를 추가
<template>
<button @click="ChildToParent">클릭</button>
</template>

// $emit을 통해 부모 컴포넌트에게 child-to-parent 이벤트를 트리거
<script>
export default{
  methods:{
    ChildToParent(){
      this.$emit('child-to-parent', 'child data') // 인자로 데이터를 전달 가능
    }
  }
}
</script>
```
```vue
// emit된 이벤트를 상위 컴포넌트에서 청취 후 핸들러 함수 실행
<template>
<MyChild
  @child-to-parent="parentGetEvent"
  />
</template>

<script>
export default{
  methods:{
    parentGetEvent(inputData){
      console.log('이벤트')
      console.log(inputData) // 자식컴포넌트에서 넘겨받은 데이터를 인자로 사용 가능
    }
  }
}
</script>
```

## Lifecycle Hooks
- 각 Vue 인스턴스는 생성과 소멸의 과정 중 단계별 초기화 과정을 거침
  - Vue 인스턴스가 생성된 경우, 인스턴스를 DOM에 마운트하는 경우, 데이터가 변경되어 DOM을 업데이트하는 경우 등
- 각 단계가 트리거가 되어 특정 로직을 실행할 수 있음
- 이를 Lifecycle Hooks라고 함

### created
- Vue instance가 생성된 후 호출됨
- data, computed 등의 설정이 완료된 상태
- 서버에서 받은 데이터를 vue instance의 data에 할당하는 로직을 구현하기 적합
- 단, mount되지 않아 요소에 접근할 수 없음
- JavaScript에서 학습한 Dog API 활용 실습의 경우 버튼을 누르면 강아지 사진을 보여줌
  - 버튼을 누르지 않아도 첫 실행 시 기본 사진이 출력되도록 하고 싶다면?
  - created 함수에 강아지 사진을 가져오는 함수를 추가

### mounted
- Vue instance가 요소에 mount된 후 호출됨
- mount된 요소를 조작할 수 있음
- created의 경우, mount되기 전이기 때문에 DOM에 접근할 수 없으므로 동작하지 않음

### updated
- 데이터가 변경되어 DOM에 변화를 줄 때 호출됨

### Lifecycle Hooks 특징
- instance마다 각각의 Lifecycle을 가지고 있음
- Lifecycle Hooks는 컴포넌트별로 정의할 수 있음
- 부모 컴포넌트의 mounted hook이 실행 되었다고 해서 자식이 mount된 것이 아니고, 부모 컴포넌트가 updated hook이 실행되었다고 해서 자식이 updated된 것이 아님
  - 부착 여부가 부모-자식 관계에 따라 순서를 가지고 있지 않은 것
- instance마다 각각의 Lifecycle을 가지고 있기 때문