# Vue
## INDEX
- DRF Auth System
- DRF Auth with Vue
------------
## DRF Auth System
### Authentication - 인증, 입증
- 자신이라고 주장하는 사용자가 누구인지 확인하는 행위
- 모든 보안 프로세스의 첫 번째 단계 (가장 기본 요소)
- 즉, 내가 누구인지를 확인하는 과정
- 401 Unauthorized
  - 비록 HTTP 표준에서는 "미승인(unauthorized)"을 명확히 하고 있지만, 의미상 이 응답은 "비인증(unauthenticated)"을 의미

### Authorization - 권한 부여, 허가
- 사용자에게 특정 리소스 또는 기능에 대한 액세스 권한을 부여하는 과정(절차)
- 보안 환경에서 권한 부여는 항상 인증이 먼저 필요함
  - 사용자는 조직에 대한 액세스 권한을 부여받기 전에 먼저 자신의 ID가 진짜인지 먼저 확인해야 함
- 서류의 등급, 웹 페이지에서 글을 조회 & 삭제 & 수정할 수 있는 방법, 제한 구역
  - 인증이 되었어도 모든 권한을 부여 받는 것은 아님
- 403 Forbidden
  - 401과 다른 점은 서버는 클라이언트가 누구인지 알고 있음

### Authentication and authorization work together
- 회원가입 후, 로그인 시 서비스를 이용할 수 있는 권한 생성
  - 인증 이후에 권한이 따라오는 경우가 많음
- 단, 모든 인증을 거쳐도 권한이 동일하게 부여되는 것은 아님
  - Django에서 로그인을 했더라도 다른 사람의 글까지 수정/삭제가 가능하진 않음
- 세션, 토큰, 제 3자를 활용하는 등의 다양한 인증 방식이 존재

### authentication determined
- DRF 공식문서에서 제안하는 인증 절차 방법
  - BasicAuthentication, SessionAuthentication
- settings.py에 작성하여야할 설정
  - 기본적인 인증절차를 어떠한 방식으로 둘 것이냐를 설정하는 것
  - 예시의 2가지 방법 외에도 각 framework마다 다양한 인증 방식이 있음
- 우리가 사용할 방법은 DRF가 기본으로 제공해주는 인증 방식 중 하나인 TokenAuthentication
- 모든 상황에 대한 인증 방식을 정의하는 것이므로, 각 요청에 따라 다른 인증 방식을 거치고자 한다면 다른 방식이 필요
- view 함수마다(각 요청마다) 다른 인증 방식을 설정하고자 한다면 decorator 활용
- permission_classes
  - 권한 관련 설정
  - 권한 역시 특정 view 함수마다 다른 접근 권한을 요구할 수 있음

#### 인증 방식
- BasicAuthentication
  - 가장 기본적인 수준의 인증 방식
  - 테스트에 적합
- SessionAuthentication
  - Django에서 사용하였던 session 기반의 인증 시스템
  - DRF와 Django의 session 인증 방식은 보안적 측면을 구성하는 방법에 차이가 있음
- RemoteUserAuthentication
  - Django의 Remote user 방식을 사용할 때 활용하는 인증 방식
- TokenAuthentication
  - 매우 간단하게 구현할 수 있음
  - 기본적인 보안 기능 제공
  - 다양한 외부 패키지가 있음
  - settings.py에서 DEFAULT_AUTHENTICATION_CLASSES를 정의
    - TokenAuthentication 인증 방식을 사용할 것임을 명시

#### TokenAuthentication 사용 방법
- INSTALLED_APPS에 rest_framework.authtoken 등록
```python
INSTALLED_APPS = [
  ...,
  'rest_framework.authtoken'
]
```
- 각 User 마다 고유 Token 생성
```python
from rest_framework.authtoken.models import Token

token = Token.objects.create(user=...)
print(token.key)
```
- 생성한 Token을 각 User에게 발급
  - User는 발급 받은 Token을 요청과 함께 전송
  - Token을 통해 User 인증 및 권한 확인
```python
def some_view_func(request):
  token = Token.objects.create(user=...)
  return Response({'token': token.key})
```
- User는 발급 받은 Token을 headers에 담아 요청과 함께 전송
  - 단, 반드시 Token 문자열 함께 삽입
    - 삽입해야 할 문자열은 각 인증 방식마다 다름(ex. Bearer, Auth, JWT 등)
  - 주의) Token 문자열과 발급받은 실제 token 사이를 ' '(공백)으로 구분
```
Authorization: Token .....
```

#### 토큰 생성 및 관리 문제점
- 기본 제공 방식에서 고려하여야 할 사항들
  - Token 생성 시점
  - 생성한 Token 관리 방법
  - User와 관련된 각종 기능 관리 방법

### dj-rest-auth
- 회원가입, 인증(소셜미디어 인증 포함), 비밀번호 재설정, 사용자 세부 정보 검색, 회원 정보 수정 등을 위한 REST API end point 제공
- 주의) django-rest-auth는 더 이상 업데이트를 지원하지 않음 dj-rest-auth 사용
- 사용 방법
```
$ pip install dj-rest-auth

INSTALLED_APPS = [
  ...,
  'rest_framework',
  'rest_framework.authtoken',
  'dj_rest_auth'
]

urlpatterns = [
  path('dj-rest-auth/', include('de_rest_auth.urls'))
]
```
- 시작하기 전에
  - auth.User를 accouts.User로 변경 필요
  - auth.User로 설정된 DB 제거

#### Registration
- Registration 기능을 사용하기 위해 추가 기능 등록 및 설치 필요
  - dj-rest-auth는 소셜 회원가입을 지원한다.
  - dj-rest-auth의 회원가입 기능을 사용하기 위해서는 django-allauth 필요
- django-allauth 설치
```bash
# 반드시 ''도 함께 입력
$ pip install 'dj-rest-auth[with_social]'
```
- App 등록, REST_AUTH 설정 및 SITE_ID 설정
  - SITE_ID
  - Django는 하나의 컨텐츠를 기반으로 여러 도메인에 컨텐츠를 게시 가능하도록 설계됨
  - 다수의 도메인이 하나의 데이터베이스에 등록
  - 현재 프로젝트가 첫 번째 사이트임을 나타냄
- urls.py 설정 및 migrate

#### Permission setting
- 권한 세부 설정
  - 모든 요청에 대해 인증을 요구하는 설정
  - 모든 요청에 대해 인증이 없어도 허용하는 설정
- 설정 위치 == 인증 방법을 설정한 곳과 동일
  - 우선 모든 요청에 대해 허용 설정
  ```python
  'DEFAULT_PERMISSION_CLASSES': [
    'rest-framework.permissions.AllowAny',
  ]
  ```
- 인증된 경우만 허용하도록 권한 부여
  - decorator를 활용
  - `@permission_classes([IsAuthenticated])`

#### 정리
- 인증 방법 설정
  - DEFAULT_AUTHENTICATION_CLASSES
- 권한 설정하기
  - DEFAULT_PERMISSION_CLASSES
- 인증 방법, 권한 세부 설정도 가능
  - @authentication_classes
  - @permission_classes
- 인증 방법은 다양한 방법이 있으므로 내 서비스에 적합한 방식을 선택
-----------
## DRF Auth with Vue
### SignUp Request
- 회원가입을 완료 시 응답받을 정보 Token을 store에서 관리할 수 있도록 actions를 활용하여 요청 후, state에 저장할 로직 작성
  - 회원가입이나 로그인 후 얻을 수 있는 Token은 server를 구성 방식에 따라 매 요청마다 요구할 수 있으므로, 다양한 컴포넌트에서 쉽게 접근할 수 있도록 중앙 상태 저장소인 vuex에서 관리

### 토큰 관리
- 게시물 전체 조회와 달리, 인증 요청의 응답으로 받은 Token은 매번 요청하기 힘듦
  - 비밀번호를 항상 보관하고 있을 수는 없음
  - localStorage에 token 저장을 위해 vuex-persistedstate 활용
- User 인증 정보를 localStorage에 저장해도 되는가?
  - 안전한 방법으로 볼 수는 없음
  - 따라서, vuex-persistedstate는 아래의 2가지 방법을 제공
    - 쿠키를 사용하여 관리
    - 로컬 저장소를 난독화 하여 관리
  - 실습의 편의를 위해 localStorage를 사용할 예정

### IsAuthenticated in Vue
- 회원가입, 로그인 요청에 대한 처리 후 state에 저장된 Token을 직접 확인하기 전까지 인증 여부 확인 불가
- 인증되지 않았을 시 게시글 정보를 확인할 수 없으나 이유을 알 수 없음
  - 로그인 여부를 확인할 수 있는 수단이 없음
- 로그인 여부 판별 코드 작성
  - Token이 있으면 true 없으면 false 반환
```javascript
getters: {
  isLogin(state){
    return state.token ? true : false
  }
}
```

### Article with Token
- 로그인은 했으나 Django에서는 로그인한 것으로 인식하지 못함
  - 발급 받은 token을 요청으로 보내지 않았기 때문
- headers HTTP에 Token을 담여 요청을 보내야 한다.
- axios 요청의 headers에 Authorizations와 token을 추가
```javascript
axios({
  method: 'get',
  url: ``,
  headers: {
    Authorization: `Token ${context.state.token}`
  }
})
```