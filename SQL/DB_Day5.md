# DB
## INDEX
- M:N (User - User)
- Fixtures
- Improve Query

## M:N (User - User)
### 개요
- User 자기 자신과의 M:N 관계 설정으 ㄹ통한 팔로우 기능 구현하기

### Profile
자연스러운 follow 흐름을 위한 프로필 페이지를 먼저 작성
```python
# accounts/urls.py

urlpattern = [
  ...,
  path('profile/<username>/', views.profile, name='profile'),
]
```
```python
# accounts/views.py
from django.contrib.auth import get_user_model

def profile(request, username):
  User = get_user_model()
  person = User.objects.get(username=username)
  context = {'person': person}
  return render(request, 'accounts/profile.html', context)
```
```html
<!-- accounts/profile.html -->
{{person.username}}님의 프로필
...
```
```html
<!-- base.html -->
<!-- profile 템플릿으로 이동할 수 있는 하이퍼 링크 작성 -->
<a href="{% url 'accounts:profile' user.username %}">내 프로필</a>

<!-- articles/index.html -->
<a href="{% url 'accounts:profile' article.user.username %}">{{article.user}}</a>
```

### Follow
```python
# accounts/models.py
# 모델 관계 설정

class User(AbstractUser):
  followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
```
```python
# accounts/urls.py

urlpatterns = [
  ...,
  path('<int:user_pk>/follow/', views.follow, name='follow'),
]
```
```python
# accounts/views.py

@require_POST
def follow(request, user_pk):
  if request.user.is_authenticated:
    User = get_user_model()
    person = User.objects.get(pk=user_pk)
    if person != request.user:
      if person.followers.filter(pk=request.user.pk).exists():
        person.followers.remove(request.user)
      else:
        person.followers.add(request.user)
    return redirect('accounts:profile', person.username)
  return redirect('accounts:login')
```
```html
<!-- accounts/profile.html -->
팔로잉 : {{person.follwings.all|length}}
팔로워 : {{person.followers.all|length}}
<form action="{% url 'accounts:follow' person.pk %}" method="POST">
  {% csrf_token %}
  {% if request.user in person.followers.all %}
    <input type="submit" value="Unfollow">
  {% else %}
    <input type="submit" value="Follow">
  {% endif %}
</form>
```
-----------
## Fixtures
### 개요
- Fixtures를 사용해 모델에 초기 데이터 제공하는 방법

### 초기 데이터의 필요성
- 협업시에 gitignore 설정으로 DB는 업로드하지 않기 때문에 누군가 사용한 데이터는 올라가지 않는다
- 다른 누군가가 프로젝트를 받아도 빈 프로젝트를 받게된다.
- Django에서는 fixtures를 사용해 앱에 초기 데이터를 제공할 수 있다.
- 즉, migrations와 fixtures를 사용하여 data와 구조를 공유하게 된다.

### Providing data with fixtures
#### fixtures
- Django가 데이터베이스로 가져오는 방법을 알고 있는 데이터 모음
- fixtures 파일은 직접 만드는 것이 아니라 dumpdata를 사용하여 생성하는 것이다.

#### dumpdata
- 응용 프로그램과 관련된 데이터베이스의 모든 데이터를 표준 출력으로 출력함
- 여러 모델을 하나의 json 파일로 만들 수 있음
```
$ python manage.py dumpdata [app.name[.ModelName][app_name[.ModelName]...]] > {filename}.json
```
- articles app 의 article 모델에 대한 data를 json 형식으로 저장하기
```
$ python manage.py dumpdata --indent 4 articles.article > articles.json
```
- manage.py와 동일한 위치에 data가 담긴 articles.json 파일이 생성됨
- dumpdata의 출력 결과물은 loaddata의 입력으로 사용됨
```
$ python manage.py dumpdata --indent 4 articles.user > users.json
$ python manage.py dumpdata --indent 4 articles.comment > comments.json
```
- 모든 모델 한번에 dump하기
```
# 3개의 모델을 하나의 json파일로
$ python manage.py dumpdata --indent 4 articles.article articles.comment articles.user > data.json

# 모든 모델을 하나의 json 파일로
$ python manage.py dumpdata --indent 4 > data.json
```

#### loaddata
- fixtures의 내용을 검색하여 데이터베이스로 로드
```
$ python manage.py loaddata data.json
```
- 기본경로
  - app_name/fixtures/
  - Django는 설치된 모든 app의 디렉토리에서 fixtures 폴더 이후의 경로로 fixtures 파일을 찾음
- fixtures load하기
```
$ python manage.py loaddata articles.json users.json comments.json
```

**loaddata를 하는 순서**
- loaddata를 한번에 실행하지 않고 하나씩 실행한다면 모델 관계에 따라 순서가 중요할 수 있음
  - comment는 article에 대한 key 및 user에 대한 key가 필요
  - article은 user에 대한 key 필요
- 즉, 현재 모델 관계에서는 user > article > comment 순으로 data를 넣어야 오류가 발생하지 않음

**loaddata 시 encoding codec 관련 에러가 발생하는 경우
- 2가지 방법 중 택1
- dumpdata 시 추가 옵션 작성
```
$ python -Xutf8 manage.py dumpdata ...
```
- 메모장 활용
  - 메모장으로 json 파일 열기
  - 다른이름으로 저장
  - 인코딩을 UTF8로 선택 후 저장
-----------
## Improve Query
### 섣부른 최적화를 하지 말자

### Django ORM
- 장점
  - SQL 몰라도 된다
  - SQL을 사용하는 대신 객체 지향적으로 데이터를 조회할 수 있다.
  - 재사용, 유지보수 쉽다
  - DBMS에 대한 의존도가 떨어진다
- 단점
  - 복잡한 SQL문을 그대로 재현하기 어렵다
  - 멋모르고 사용하면 이상한 쿼리가 나간다(ex - N+1 Problem)

특징
- Django ORM은 기본적으로 Lazy Loading 전략을 사용한다.
  - ORM을 작성하면 Database에 Query하는 것이 아니라, 미루고 미루다가 실제로 데이터를 사용할 때 Database에 Query를 날린다.
  - ORM 함수를 호출할 때가 아닌, Queryset이 실제로 평가될 때 DB를 호출한다.
  - Queryset이 실제로 모습을 드러내야 할 때 DB를 부른다는 뜻
    - print, slicing, len ...
- 똑같은 데이터를 사용한다면 캐싱을 내부적으로 해둔다

### Lazy Loading(지연 로딩)
- 객체와 RDB를 연결하는 ORM 입장에서는, 객체 코드로 다루는 모든 경우에 호출을 하는 것은 비용이 매우 많이 든다
- 따라서 성능 개선을 위해 실제로 해당 데이터가 필요한 시점에 데이터베이스를 호출

### Eager Loading(즉시 로딩)
- 지금 사용하지 않더라도 가져오는 것
- 보통 여러 테이블의 데이터를 한 번에 가져올 때 사용
- select_related와 prefetch_related로 사용

### Caching
- 특정 데이터를 불러온 후 재사용할 경우 ORM은 저장해둔 캐싱을 사용한다.
- 불러온 데이터에 변화를 일으키는 쿼리가 아니라면 저장해둔 데이터를 사용한다

### 정리
- 순서를 변경하는 것만으로 데이터베이스 콜을 줄일 수 있다.
- ORM의 동작원리를 잘 알고 사용하는 것이 중요하다.