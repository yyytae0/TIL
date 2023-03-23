# Django
## INDEX
- Authentication with User
- View decorators
-----------------------
## Authentication with User
### 개요
- User Object와 User CRUD에 대한 이해
  - 회원 가입, 회원 탈퇴, 회원정보 수정, 비밀번호 변경
-----------------
## 회원 가입
회원가입은 User를 Create하는 것이며 UserCreationForm built-in form을 사용

### UserCreationForm
- 주어진 username과 password로 권한이 없는 새 user를 생성하는 ModelForm
- 3개의 필드를 가짐
  - username(from the user)
  - password1
  - password2

### 회원가입 페이지 작성
```python
# accounts/urls.py

app_name = 'accounts'
urlpattern = [
  ...,
  path('signup/', views.signup, name='signup')
]
```
```python
# accounts/views.py
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

def signup(request):
  if request.method == 'POST':
    form = UserCreationForm(request.POST)
    if form.is_valid():
      form.save()
      return redirect('article:index')
  else:
    form = UserCreationForm()
  context = {
    'form': form,
  }
  return render(request, 'accounts/signup.html', context)
```
```html
<!-- accounts/signup.html -->

{% extends 'base.html' %}

{% block content %}
<h1>회원가입</h1>
<form action="{% url 'accounts:signup' %} method="POST">
  {% csrf_token %}
  {{ form.as_p }}
  <input type="submit">
</form>
{% endblock content %}
```

### Custom user & Built-in auth forms
회원가입에 사용하는 UserCreationForm이 우리가 대체한 커스텀 유저 모델이 아닌 기존 유저 모델로 인해 작성된 클래스이기 때문에 회원가입 진행 후 에러페이지가 나타나게 된다.
- Custom user와 기존 Built-in auth forms 간의 관계
- Custom user로 인한 Built-in auth forms 변경

### AbstractBaseUser의 모든 subclass와 호환되는 forms
- 아래 Form 클래스는 User 모델을 대체하더라도 커스텀 하지 않아도 사용가능
  - AuthenticationForm
  - SetPasswordForm
  - PasswordChangeForm
  - AdminPasswordChangeForm
- 기존 User 모델을 참조하는 Form이 아니기 때문

### 커스텀 유저 모델을 사용하려면 다시 작성하거나 확장해야하는 forms
- UserCreationForm
- UserChangeForm
두 form 모두 class Meta: model = user 가 등록된 form이기 때문에 반드시 커스텀(확장)해야 함

### UserCreationForm() 커스텀 하기
```python
# accounts/forms.py
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

class CustomUserCreationForm(UserCreationForm):
  class Meta(UserCreationForm.Meta):
    model = get_user_model()

class CustomUserChangeForm(UserChangeForm):
  class Meta(UserChangeForm.Meta):
    model = get_user_model()
```

**get_user_model()**
- **현재 프로젝트에서 활성화된 사용자 모델(active user model)**을 반환
- 직접 참조하지 않는 이유
  - 예를 들어 기존 User 모델이 아닌 User 모델을 커스텀한 상황에서는 커스텀 User 모델을 자동으로 반환해주기 때문
- Django는 User클래스를 직접 참조하는 대신 get_user_model()을 사용해 참조해야 한다고 강조하고 있음
- User model 참조에 대한 자세한 내용은 추후 모델 관계 수업에서 다룰 예정

**CustomUserCreationForm()으로 대체하기**
```python
# accounts/views.py
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from .forms import CustomUserCreationForm, CustomUserChangeForm

def signup(request):
  if request.method == 'POST':
    form = CustomUserCreationForm(request.POST)
    if form.is_valid():
      user = form.save()
      auth_login(request, user)
      return redirect('article:index')
  else:
    form = CustomUserCreationForm()
  context = {
    'form': form,
  }
  return render(request, 'accounts/signup.html', context)
```
--------------------
## 회원 탈퇴
회원 탈퇴하는 것은 DB에서 유저를 Delete하는 것과 같음

### 회원 탈퇴 로직 작성
```python
# accounts/urls.py

app_name = 'accounts'
urlpatterns = [
  ...,
  path('delete/', views.delete, name='delete')
]
```
```python
# accounst/views.py

def delete(request):
  request.user.delete()
  # auth_logout(request)
  # 탈퇴하면서 해당 유저의 세션 정보도 함께 지우고 싶을 경우
  # 탈퇴 후 로그아웃의 순서가 바뀌면 안됨
  # 먼저 로그아웃 해버리면 해당 요청 객체 정보가 없어지기 때문에 탈퇴에 필요한 정보 또한 없어지기 때문
  return redirect('articles:index')
```
```html
<!-- base.html -->
<form action="{% url 'accounts:delete' %}" method="POST">
  {% csrf_token %}
  <input type="submit" value="회원탈퇴">
</form>
```
----------------
## 회원정보 수정
회원정보 수정은 User를 Update 하는 것이며 UserChangeForm built-in form을 사용

### UserChangeForm
- 사용자의 정보 및 권한을 변경하기 위해 admin 인터페이스에서 사용되는 ModelForm
- UserChangeForm 또한 ModelForm이기 때문에 instance 인자로 기존 user 데이터 정보를 받는 구조 또한 동일함
- 이미 이전에 CustomUserChangeForm으로 확장했기 때문에 CustomUserChangeForm을 사용하기

### 회원정보 수정 페이지 작성
```python
# accounts/urls.py

app_name = 'accounts'
urlpatterns = [
  ...,
  path('update/', views.update, name='update')
]
```
```python
# accounts/views.py

def update(request):
  if request.method == 'POST':
    form = CustomUserChangeForm(request.POST, instance=request.user)
    if form.is_valid():
      form.save()
      return redirect('articles:index')
  else:
    form = CustomUserChangeForm(instance=request.user)
  context = {
    'form': form,
  }
  return render(request, 'accounts/update.html', context)
```
```html
<!-- accounts/update.html -->
<form action="{% url 'accounts:update' %}" method="POST">
  {% csrf_token %}
  {{ form.as_p }}
  <input type="submit">
</form>
```

### UserChangeForm 사용 시 문제점
- 일반 사용자가 접근해서는 안 될 정보들(fields)까지 모두 수정이 가능해짐
  - admin 인터페이스에서 사용되는 ModelForm이기 때문
- 따라서 UserChangeForm을 상속받아 작성해 두었던 서브 클래스 CustomUserChangeForm에서 접근 가능한 필드를 조정해야 함

### CustomUserChangeForm fields 재정의
```python
# accounts/forms.py

class CustomUserChangeForm(UserChangeForm):
  class Meta(UserChangeForm.Meta):
    model = get_user_model()
    fields = ('email', 'first_name', 'last_name',)
```
-------------
## 비밀번호 변경
### PasswordChangeForm
- 사용자가 비밀번호를 변경할 수 있도록 하는 Form
- 이전 비밀번호를 입력하여 비밀번호를 변경할 수 있도록 함
- 이전 비밀번호를 입력하지 않고 비밀번호를 설정할 수 있는 SetPasswordForm을 상속받는 서브 클래스

### 비밀번호 변경 페이지 작성
```python
# accounts/urls.py

app_name = 'accounts'
urlpatterns = [
  ...,
  path('password/', views.change_password, name='change_password')
]
```
```python
# accounts/views.py

def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
          form.save()
          update_session_auth_hash(request, form.user)
          return redirect('articles:index')
    else:
        form = PasswordChangeForm(request.user)
    context = {
        'form': form,
    }
    return render(request, 'accounts/change_password.html', context)
```

### 암호 변경 시 세션 무효화 방지하기
비밀번호 변경 후 로그인 상태가 지속되지 못하는 문제 발생
- 비밀번호가 변경되면 기존 세션과의 회원 인증 정보가 일치하지 않게 되어 버려 로그인 상태가 유지되지 못함
- 비밀번호가 잘 변경되었으나 비밀번호가 변경 되면서 기존 세션과의 회원 인증정보가 일치하지 않기 때문

### update_session_auth_hash()
- update_session_auth_hash(request, user)
- 현재 요청(current request)과 새 session data가 파생 될 업데이트 된 사용자 객체를 가져오고, session data를 적절하게 업데이트해줌
- 암호가 변경되어도 로그아웃 되지 않도록 새로운 password의 session data로 session을 업데이트

--------------
## View decorators
### 데코레이터(Decorator)
- 기존에 작성된 함수에 기능을 추가하고 싶을 때, 해당 함수를 수정하지 않고 기능을 추가해주는 함수
- Django는 다양한 HTTP 기능을 지원하기 위해 view 함수에 적용할 수 있는 여러 데코레이터를 제공

### Allowed HTTP methods
- django.views.decorators.http의 데코레이터를 사용하여 요청 메서드를 기반으로 접근을 제한할 수 있음
- 일치하지 않는 메서드 요청이라면 405 Method Not Allowed를 반환
- 메서드 목록
  - require_http_methods()
  - require_POST()
  - require_safe()

**require_http_methods()**
- view 함수가 특정한 요청 method만 허용하도록 하는 데코레이터
```python
from django.views.decorators.http import require_http_methods

@require_http_methods(['GET', 'POST'])
def create(request):
  ...
```

**require_POST()**
- view 함수가 POST 요청 method만 허용하도록 하는 데코레이터
```python
from django.views.decorators.http import require_POST

@require_POST
def delete(request, pk):
  ...
```

**require_safe()**
- require_GET이 있지만 Django에서는 require_safe를 사용하는 것을 권장
```python
from django.views.decorators.http import require_safe

@require_safe
def index(request):
  ...
```

### Limiting access to logged-in users
로그인 사용자에 대한 접근 제한하기

**is_authenticated**
- User model의 속성(attributes) 중 하나
- 사용자가 인증되었는지 여부를 알 수 있는 방법
- 모든 User 인스턴스에 대해 항상 True인 읽기 전용 속성
  - AnonymousUser에 대해서는 항상 False
- 일반적으로 request.user에서 이 속성을 사용(request.user.is_authenticated)
- **권한과는 관련이 없으며, 사용자가 활성화 상태이거나 유효한 세션을 가지고 있는지도 확인하지 않음**

**적용하기**
- 로그인과 비로그인 상태에서 출력되는 링크를 다르게 설정하기
- 인증된 사용자만 게시글 작성 링크를 볼 수 있도록 처리하기
- 인증된 사용자라면 로그인 로직을 수행할 수 없도록 처리하기
```html
{% if request.user.is_authenticated %}
  ...
{% else %}
  ...
{% endif %}
```
```python
def login(request):
  if request.user.is_authenticated:
    return redirect('articles:index')
```
