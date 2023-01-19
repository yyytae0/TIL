# 함수의 응용
## Built in Function

- map(function, iterable)
  - iterable의 모든 요소에 function을 적용하고 그 결과를 map object로 반환
  - ex) n, m = map(int, input().split())
  - ex) lst = list(map(int, input().split()))
  
- filter(function, iterable)
  - iterable의 모든 요소에 function을 적용하고  그 결과가 True인 요소만을 filter object로 반환
  - ex) lst = list(filter(odd, numbers))
  
- zip(\*iterable)
  - 복수의 iterable을 모아 튜플을 원소로 하는 zip object를 반환
  - ex) pair = list(zip(boys, girls))
  
- lamda 함수
  - 간결하게 사용가능 but return이나 반복문 이나 간단한 조건문외의 조건문을 쓸 수 없음
  - ex) triangle_area = lamda b, h : 0.5 * b * h    >>>> triangle_area(5, 6) #15.0
 
- recursive 함수(재귀함수)

- 패킹, 언패킹 연산자 *
  - 가변인자로도 사용가능 ex) def odd(\*args)
  - 가변키워드인자 ** ex) def odd(\*\*kwargs)


## 모듈과 패키지

 - 모듈 : 다양한 기능을 하나의 파일로(.py로 작성)
 - 패키지 : 다양한 파일을 하나의 폴더로
 - 라이브러리 : 다양한 패키지를 하나의 묶음으로

 - ex)
   - import module
   - from module import *
   - import package
   - from package import module
   - from package.module import *

 - 모든 폴더에는 \_\_init\_\_.py를 만들어 패키지로 인식
   - ex) my_package(init.py, check.py, calculator)  > calculator(init.py, tools.py)

## 가상환경
- 복수의 프로젝트를 상이한 버전에서 사용하는 경우
- $ python -m venv 폴더명   : 가상환경 생성
- bash : $ source 폴더명/bin/activate    : 가상환경 활성화
- $ deactivate   : 가상환경 비활성화
