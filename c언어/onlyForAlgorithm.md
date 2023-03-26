

# C언어
## Intro
### 전처리기
'#' 은 전처리기로 컴파일하기 전에 미리 처리하라는 명령어를 의미
- ex) #include <stdio.h> : stdio.h를 컴파일하기전에 추가하라는 뜻

.h 확장자를 가지는 파일을 헤더파일이라고 하며 이미 만들어져 있는 함수가 어떤게 있는지 정리한 목차라고 생각하면 된다. 전처리기를 통해 헤더파일을 추가하면, 컴퓨터는 헤더파일을 보면서 이 함수가 존재하는지 판단하고 기능을 가져올 수 있다

## 이스케이프 시퀀스
이스케이프 시퀀스란 '\'와 특정 문자를 결합하여 c언어 특성상 표현할 수 없는 기능이나 문자를 표시해주는 문자를 의미
- \n : 줄바꿈
- \t : 탭

## 변수
정수형
- char, short, int, long, long long

실수형
- float, double, long double

부호
- signed, unsigned


## 상수
값을 바꿀 수 없는 수
```c
const double pi = 3.1415;
```

## 입력 받기
```c
int a;
scanf("%d", &a)
```
&는 변수의 주소를 나타내는 문자로 scanf를 통해 입력을 받을때에는 변수의 주소를 넣어주어야함

## 논리연산자
- 논리곱(&&, AND)
- 논리합(||, OR)

## 비트연산자
- &, |, ^, ~, <<, >>

## 반복문
### for
```c
int main(){
    int i;
    int sum = 0;
    for (i=1; i<=10; i=i+1){
        sum = sum+i;
    }
    printf("%d", sum);

    return 0;
}
```
### while
```c
int main(){
    int i = 1;
    int sum = 0;
    while(i<5){
        sum += i;
        printf("%d", sum);
        i++;
    }
    return 0;
}
```

### do while
```c
int main(){
    int i = 1;
    int sum = 0;
    do{
        printf("hi")
    }
    while(i<5){
        sum += i;
        printf("%d", sum);
        i++;
    }
    return 0;
}
```

## 배열(array)
sizeof()


## 조건문
```c
int main(){
    int num;
    printf("정수를 입력하세요 :");
    scanf("%d", &num);

    if (0 < num>){
        printf("양수");
    }
    else if (num < 0){
        printf("음수");
    }
    else{
        printf("0");
    }
    return 0;
}
```