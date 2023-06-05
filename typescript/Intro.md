# TypeScript

JavaScript가 Node.js가 자리잡고 Angular.js, Vue.js, React.js 처럼 JS 기반 웹 프레임워크가 생기기도 하고, jsx를 활용하여 JS 기반 프레임워크인 React로 앱까지도 만들 수 있게 되면서 점점 JavaScript를 사용하는 프로젝트가 늘어나기 시작함

## TypeScript
JavaScript의 장점은 일반적인 C, Java처럼 자료형이 존재하지 않는다
동적으로 작동하는 JS에서 추적되지 않는 객체들의 속성의 변경이 너무 쉽고 실행중에 이를 알게되는 경우가 발생한다

TypeScript는 기본적으로 변수에 타입을 지정해주면서, 코드를 추적하게 해준다.

현대 프로그래밍 언어에서 TypeScript와 JavaScript의 관계는 다소 독특합니다. JavaScript 위에 레이어로서 자리잡고 있는데, JavaScript의 기능들을 제공하면서 그 위에 자체 레이어를 추가합니다. 이 레이어가 TypeScript 타입 시스템입니다.

JavaScript는 이미 string, number, object, undefined 같은 원시 타입을 가지고 있지만, 전체 코드베이스에 일관되게 할당되었는지는 미리 확인해 주지 않습니다. TypeScript는 이 레이어로서 동작합니다.

이는 이미 존재하고 잘 동작하는 JavaScript 코드는 동시에 TypeScript 코드라는 의미지만, TypeScript의 타입검사기는 사용자가 생각한 일과 JavaScript가 실제로 하는 일 사이의 불일치를 강조할 수 있습니다.