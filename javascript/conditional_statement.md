# 조건문

## if - else if - else 문
```javascript
const a = 1;
if (조건1){
  코드;
} else if (조건2){
  코드;
} else{
  코드;
}
```

## switch/case 문
case에 존재하지 않을 경우 default가 실행
case에서 break를 하지 않을 경우 해당 case 이후 코드들도 실행됨
```javascript
let device = 'phone';

switch (device){
  case 'phone':
    코드;
    break;
  case 'computer':
    코드;
    break;
  default:
    코드;
}
```