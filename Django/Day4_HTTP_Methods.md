# Django
## INDEX
- Admin Site
- CRUD with View
  - Read & Create
  - HTTP Methods
  - Delete & Update
  - Handling HTTP requests

## Admin site
### 개요
- Django의 가장 강력한 기능 중 하나인 automatic admin interface
- "관리자 페이지"
  - 사용자가 아닌 서버의 관리자가 활용하기 위한 페이지
  - 모델 class를 admin.py에 등록하고 관리
  - 레코드 생성 여부 확인에 매우 유용하며 직접 레코드를 삽입할 수도 있음

### admin 계정 생성
```
$ python manage.py createsuperuser
```
- username과 password를 입력해 관리자 계정을 생성
  - email은 선택사항이기 때문에 입력하지 않고 enter를 입력하는 것이 가능
  - 비밀번호 생성 시 보안상 터미널에 입력되지 않으니 무시하고 입력을 이어가도록 함

### admin에 모델 클래스 등록
- 모델의 record를 보기 위해서는 admin.py에 등록 필요
    ```python
    # articles/admin.py
    from django.contrib import admin
    from .models import Article

    admin.site.register(Article)
    ```

## CRUD with view functions
### 개요
- 이전에 익힌 QuerySet API를 통해 view함수에서 직접 CRUD 구현하기

### READ1(index page)
전체 게시글 조회
- index 페이지에서는 전체 게시글을 조회해서 출력한다.
    ```python
    from .models import Article

    def index(request):
      articles = Article.objects.all()
      context = {
        'articles': articles,
      }
      return render(request, 'articles/index.html', context)
    ```
    ```html
    <!-- templates/articles/index.html -->
    {% extends 'base.html' %}

    {% block content %}
      <h1>Articles</h1>
      <hr>
      {% for article in articles %}
        <p>글 번호: {{ article.pk }}</p>
        <a href="{% url 'articles:detail' article.pk %}">
          <p>글 제목: {{ article.title }}</p>
        </a>
        <p>글 내용: {{ article.content }}</p>
        <hr>
      {% endfor %}
    {% endblock content %}
    ```
### READ2(detail page)
개요
- 개별 게시글 상세 페이지 제작
- 모든 게시글 마다 뷰 함수와 템플릿 파일을 만들 수는 없음
  - 글의 번호(pk)를 활용해서 하나의 뷰 함수와 템플릿 파일로 대응
- 무엇을 활용할 수 있을까?
  - Variable Routing

urls
- URL로 특정 게시글을 조회할 수 있는 번호를 받음
    ```python
    # articles/urls.py

    urlpatterns = [
      ...
      path('<int:pk>/', views.detail, name='detail'),
    ]
    ```

views
- Article.objects.get(pk=pk)에서 오른쪽 pk는 variable routing을 통해 받은 pk, 왼쪽 pk는 DB에 저장된 레코드의 id 컬럼
    ```python
    # articles/views.py

    def detail(request, pk):
      article = Article.objects.get(pk=pk)
      context = {
        'article': article,
      }
      return render(request, 'articles/detail.html', context)
    ```

templates
```html
<!-- templates/articles/detail.html -->

{% extends 'base.html' %}

{% block content %}
  <h2>DETAIL</h2>
  <h3>{{ article.pk }}번째 글</h3>
  <hr>
  <p>제목: {{ article.title }}</p>
  <p>내용: {{ article.content }}</p>
  <p>작성 시각: {{ article.created_at }}</p>
  <p>수정 시각: {{ article.updated_at }}</p>
  <hr>
  <a href="{% url 'articles:index' %}">[back]</a>
{% endblock content %}
```


### CREATE
개요
- CREATE 로직을 구현하기 위해서는 몇 개의 view 함수가 필요할까?
  - 사용자의 입력을 받을 페이지를 렌더링 하는 함수 1개('new'view function)
  - 사용자가 입력한 데이터를 전송 받아 DB에 저장하는 함수 1개('create'view function)

#### New
```python
# articles/urls.py

urlpattern = [
  ...
  path('new/', views.new, name='new'),
]
```
```python
# articles/views.py

def new(request):
  return render(request, 'articles/new.html')
```
```html
<!-- templates/articles/new.html -->

{% extends 'base.html' %}

{% block content %}
  <h2>NEW</h2>
  <hr>
  <form action="{% url 'articles:create' %}" method="GET">
    <label for="title">Title:</label>
    <input type="text" name="title" id="title"><br>
    <label for="content">Content:</label>
    <textarea name="content" id="content"></textarea><br>
    <input type="submit">
  </form>
  <hr>
  <a href="{% url 'articles:index' %}">[back]</a>
{% endblock content %}
```

#### Create
```python
# articles/urls.py

urlpattern = [
  ...
  path('create/', views.create, name='create'),
]
```
```python
# articles/views.py

def create(request):
  title = request.GET.get('title')
  content = request.GET.get('content')

  article = Article(title=title, content=content)
  # 3가지 방식 중 위 방식을 사용하는 이유
  # - create 메서드가 더 간단해 보이지만 추후 데이터가 저장되기 전에 유효성 검사 과정을 거치게 될 예정
  # - 유효성 검사가 진행된 후에 save 메서드가 호출되는 구조를 택하기 위함
  article.save()

  return redirect('articles:detail', article.pk) # 이미 만들어진 url로 이동
```

### HTTP Method
- HTTP
  - 네트워크 상에서 데이터를 주고 받기 위한 약속
- HTTP Method
  - 데이터(리소스)에 어떤 요청(행동)을 원하는지를 나타낸 것

현재 코드 재검토
- 현재는 게시글이 작성될 때 /aritcle/create/?title=1&content=1 과 같은 URL로 요청이 보내짐
- GET은 쿼리 스트링 파라미터로 데이터를 보내기 때문에 url을 통해 데이터를 보냄
- 하지만 현재 요청은 데이터를 조회하는 것이 아닌 작성을 원하는 요청
- 우리가 원하는 동작이 조회인가??

GET & POST
- GET
  - 어떠한 데이터(리소스)를 조회하는 요청
  - GET 방식으로 데이터를 전달하면 Query String 형식으로 보내짐
  - 반드시 데이터를 가져올 때만 사용해야 함
  - DB에 변화를 주지 않음
  - CRUD에서 R 역할을 담당
- POST
  - 어떠한 데이터(리소스)를 생성(변경)하는 요청
  - POST 방식으로 데이터를 전달하면 Query String이 아닌 Body에 담겨서 보내짐
  - 서버로 데이터를 전송할 때 사용
  - 서버에 변경사항을 만듦
  - GET의 쿼리 스트링 파라미터와 다르게 URL로 데이터를 보내지 않음
  - CRUD에서 C/U/D 역할을 담당

#### 403 Forbidden
- 서버에 요청이 전달되었지만, 권한 때문에 거절되었다는 것을 의미
- 서버에 요청은 도달했으나 서버가 접근을 거부할 때 반환됨
- 즉, 게시글을 작성할 권한이 없다 > Django 입장에서는 "작성자가 누구인지 모르기 때문에 함부로 작성할 수 없다"라는 의미
- 모델(DB)을 조작하는 것은 단순 조회와 달리 최소한의 신원 확인이 필요하기 때문

#### CSRF
- Cross-Site-Request-Forgery
- "사이트 간 요청 위조"
- 사용자가 자신의 의지와 무관하게 공격자가 의도한 행동을 하여 특정 웹 페이지를 보안에 취약하게 하거나 수정, 삭제 등의 작업을 하게 만드는 공격 방법
- 실제 사례 - "2008년 옥션 개인정보 해킹 사건"
  - 해커가 옥션 운영자에게 CSRF 코드가 포함된 가짜 사이트가 담긴 이메일을 보냄
  - 관리자는 해당 사이트에 정보를 입력하여 관련 정보가 해커에게 보내졌고, 해커는 옥션 사이트의 관리자 권한을 얻어냄(당시 1860만건 유출)

#### CSRF 공격 방어
- "Security Token 사용 방식(CSRF Token)"
  - 사용자의 데이터에 임의의 난수 값(token)을 부여해 매 요청마다 해당 난수 값을 포함시켜 전송 시키도록 함
  - 이후 서버에서 요청을 받을 때마다 전달된 token 값이 유효한지 검증
  - 일반적으로 데이터 변경이 가능한 POST, PATCH, DELETE Method 등에 적용
  - Django는 DTL에서 csrf_token 템플릿 태그를 제공

#### csrf_token 템플릿 태그
```{% csrf_token %}```
- 해당 태그가 없다면 Django 서버는 요청에 대해 403 forbidden으로 응답
- 템플릿에서 내부 URL로 향하는 Post form을 사용하는 경우에 사용
  - 외부 URL로 향하는 POST form에 대해서는 CSRF 토큰이 유출되어 취약성을 유발할 수 있기 때문에 사용해서는 안됨
  ```html
  {% extends 'base.html' %}

  {% block content %}
    <h2>NEW</h2>
    <hr>
    <form action="{% url 'articles:create' %}" method="POST">
      {% csrf_token %}
      ...
    </form>
    <hr>
    <a href="{% url 'articles:index' %}">[back]</a>
  {% endblock content %}
  ```

### DELETE
삭제하고자 하는 특정 글을 조회 후 삭제해야 함
```python
  # articles/urls.py

  urlpatterns = [
    ...
    path('<int:pk>/delete/', views.delete, name='delete),
  ]
```
```python
  # articles/views.py

  def delete(request, pk):
    article = Article.objects.get(pk=pk)
    article.delete()
    return redirect('articles:index')
```
```html
  <!-- articles/detail.html -->
  <!-- Detail 페이지에 작성하며 DB에 영향을 미치기 때문에 POST method를 사용 -->
  {% extends 'base.html' %}

  {% block content %}
    <h2>DELETE</h2>
    <hr>
    <form action="{% url 'articles:delete' article.pk %}" method="POST">
      {% csrf_token %}
      <input type="submit" value="DELETE">
    </form>
    <hr>
    <a href="{% url 'articles:index' %}">[back]</a>
  {% endblock content %}
```

### UPDATE
개요
- 수정은 CREATE 로직과 마찬가지로 2개의 view 함수가 필요
- 사용자의 입력을 받을 페이지를 렌더링 하는 함수 1개('edit'view function)
- 사용자가 입력한 데이터를 전송 받아 DB에 저장하는 함수 1개('update'view function)

#### Edit
```python
# articles/urls.py

urlpatterns = [
  ...
  path('<int:pk>/edit/', views.edit, name='edit'),
]
```
```python
# articles/views.py

def edit(request, pk):
  article = Article.objects.get(pk=pk)
  context = {
    'article': article,
  }
  return render(request, 'articles/edit.html', context)
```
```html
<!-- templates/articles/new.html -->

{% extends 'base.html' %}

{% block content %}
  <h2>EDIT</h2>
  <hr>
  <form action="#" method="POST">
    {% csrf_token %}
    <label for="title">Title:</label>
    <input type="text" name="title" id="title" value="{{ article.title }}"><br>
    <label for="content">Content:</label>
    <textarea name="content" id="content">{{ article.content }}</textarea><br>
    <input type="submit">
  </form>
  <hr>
  <a href="{% url 'articles:index' %}">[back]</a>
{% endblock content %}
```

#### Update
```python
# articles/urls.py

urlpatterns = [
  ...
  path('<int:pk>/update/', views.update, name='update'),
]
```
```python
# articles/views.py

def update(request, pk):
  article = Article.objects.get(pk=pk)
  article.title = request.POST.get('title')
  article.content = request.POST.get('content')
  article.save()
  return redirect('articles:detail', article.pk)
```
```html
<!-- templates/articles/edit.html -->

{% extends 'base.html' %}

{% block content %}
  <h2>EDIT</h2>
  <hr>
  <form action="{% url 'articles:update' article.pk %}" method="POST">
    {% csrf_token %}
    <label for="title">Title:</label>
    <input type="text" name="title" id="title" value="{{ article.title }}"><br>
    <label for="content">Content:</label>
    <textarea name="content" id="content">{{ article.content }}</textarea><br>
    <input type="submit">
  </form>
  <hr>
  <a href="{% url 'articles:index' %}">[back]</a>
{% endblock content %}
```

### Handling HTTP requests
개요
- 'HTTP requests 처리에 따른 view 함수 구조 변화'
- new-create, edit-update의 view 함수 역할을 잘 살펴보면 하나의 공통점과 하나의 차이점이 있다
- 공통점
  - 각각 CREATE, UPDATE 로직을 구현하기 위한 공통 목적
- 차이점
  - new와 edit은 GET 요청에 대한 처리만
  - create와 update는 POST 요청에 대한 처리만을 진행한다
- 이 공통점과 차이점을 기반으로, 하나의 view 함수에서 method에 따라 로직이 분리되도록 변경

#### Create
```python
# new와 create view 함수를 합침
# 각각의 역할은 request.method 값을 기준으로 나뉨
# 합친 이후에는 반드시 불필요해진 view함수와 url path 삭제하기
# html 이름 변경 및 action 속성 값 수정
# index 페이지에 있던 new 관련 링크 수정
def create(request):
  if request.method == 'POST':
    title = request.POST.get('title')
    content = request.POST.get('content')
    article = Article(title=title, content=content)
    article.save()
    return redirect('articles:detail', pk=article.pk)
  else:
    return render(request, 'articles/create.html')
```

#### Update
```python
# edit와 update view 함수를 합침
# 각각의 역할은 request.method 값을 기준으로 나뉨
# 합친 이후에는 반드시 불필요해진 view함수와 url path 삭제하기
# html 이름 변경 및 action 속성 값 수정
# index 페이지에 있던 edit 관련 링크 수정
def update(request, pk):
  article = Article.objects.get(pk=pk)
  if request.method == 'POST':
    article.title = request.POST.get('title')
    article.content = request.POST.get('content')
    article.save()
    return redirect('articles:detail', pk=article.pk)
  else:
    context = {'article': article}
    return render(request, 'articles/update.html', context)
```

#### Delete
```python
# POST 요청에 대해서만 삭제가 가능하도록 수정
def delete(request, pk):
  article = Article.objects.get(pk=pk)
  if request.method == 'POST':
    article.delete()
    return redirect('articles:index')
  else:
    return redirect('articles:detail', article.pk)
```