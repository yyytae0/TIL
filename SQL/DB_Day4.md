# DB
## INDEX
- N:1 (Comment - User)
- Many to many relationship
- M:N (Article - User)

## N:1 (Comment - User)
### 개요
- Comment(N) - User(1)
- Comment 모델과 User 모델 간 관계 설정
- "0개 이상의 댓글은 1개의 회원에 의해 작성될 수 있음"

### 모델 관계 설정
```python
# articles/models.py
# Comment 모델에 User 모델을 참조하는 외래 키 작성

class Comment(models.Model):
  article = models.ForeignKey(Article, on_delete=models.CASCADE)
  user = models.ForeighKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
```

### CREATE
```python
# articles/forms.py
# CommentForm의 출력 필드 수정

class CommentForm(forms.ModelForm):
  class Meta:
    model = Comment
    exclude = ('article', 'user',)
```
```python
# articles/views.py
# 댓글 작성 시 작성자 정보가 함께 저장될 수 있도록 save의 commit 옵션을 활용

def comments_create(request, pk):
  ...
  comment = comment_form.save(commit=False)
  comment.article = article
  comment.user = request.user
  comment.save()
  return redirect('articles:detail', article.pk)
```

### READ
```html
<!-- articles/detail.html -->
<!-- detail 템플릿에서 각 게시글의 작정자 출력-->

...
<li>
  {{comment.user}} - {{comment.content}}
</li>
```

### DELETE
```python
# articles/views.py
# 삭제를 요청하는 사람과 작성한 사람을 비교 후 본인의 댓글만 삭제

def comments_delete(request, article_pk, comment_pk):
  comment = Comment.objects.get(pk=comment_pk)
  if request.user == comment.user:
    comment.delete()
  return redirect('articles:detail', article_pk)
```
```html
<!-- articles/detail.html -->
<!-- 댓글 작성자가 아니면 삭제 버튼을 출력하지 않음 -->

...
{% if request.user == comment.user %}
  ...
{% endif %}
```

### 인증된 사용자에 대한 접근 제한하기
```python
# articles/views.py
# 인증된 사용자인 경우만 댓글 작성 및 삭제하기

@require_POST
def cemments_create(request, pk):
  if request.user.is_authenticated:
    ...
  return redirect('accounts:login')

@require_POST
def comments_delete(request, article_pk, comment_pk):
  if request.user.is_authenticated:
    ...
  return redirect('articles:detail', article_pk)
```
```html
<!-- articles/detail.html -->
<!-- 비인증 사용자는 CommentForm을 볼 수 없도록 하기 -->

...
{% if request.user.is_authenticated %}
  ...
{% else %}
  <a href="{% url 'accounts:login' %}">댓글을 작성하려면 로그인하세요</a>
{% endif %}
```

## Many to many relationship
### 데이터 모델링
- 주어진 개념으로부터 논리적인 데이터 모델을 구성하는 작업
- 물리적인 데이터베이스 모델로 만들어 고객의 요구에 따라 특정 정보 시스템의 데이터베이스에 반영하는 작업

### 용어 정리
- target model
  - 관계 필드를 가지지 않은 모델
- source model
  - 관계 필드를 가진 모델

### 중개 모델
- 환자 모델의 외래 키를 삭제하고 별도의 예약 모델을 새로 작성
- 예약 모델은 의사와 환자에 각각 N:1 관계를 가짐

### Django ManyToManyField
- Django는 ManyToManyField를 통해 중개 테이블을 자동으로 생성함
```python
# hospitals/models.py

class Patient(models.Model):
  doctors = models.ManyToManyField(Doctor)
```

### 정리
- M:N 관계로 맺어진 두 테이블에는 변화가 없음
- Django의 ManyToManyField는 중개 테이블을 자동으로 생성함
- Django의 ManyToManyField는 M:N 관계를 맺는 두 모델 어디에 위치해도 상관없음
  - 대신 필드 작성 위치에 따라 참조와 역참조 방향을 주의할 것
- N:1은 완전한 종속의 관계였지만 M:N은 의사에게 진찰받는 환자, 환자를 진찰하는 의사의 두 가지 형태로 모두 표현이 가능한 것

### ManyToManyField
- ManyToManyField(to, **options)
- 다대다(M:N, many-to-many) 관계 설정 시 사용하는 모델 필드
- 하나의 필수 위치인자(M:N 관계로 설정할 모델 클래스)가 필요
- 모델 필드의 RelatedManager를 사용하여 관련 개체를 추가, 제거 또는 만들 수 있음
  - add(), remove(), create(), clear() ...

#### 데이터 베이스에서의 표현
- Django는 다대다 관계를 나타내는 중개 테이블을 만듦
- 테이블 이름은 ManyToManyField 이름과 이를 포함하는 모델의 테이블 이름을 조합하여 생성됨
- 'db_table' arguments를 사용하여 중개 테이블의 이름을 변경할 수도 있음

#### Arguments
- related name
  - target model이 source model을 참조할 때 사용할 manager name
  - ForeignKey의 related_name과 동일
- through
  - 중개 테이블을 직접 작성하는 경우, through 옵션을 사용하여 중개 테이블을 나타내는 Django 모델을 지정
  - 일반적으로 중개 테이블에 추가 데이터를 사용하는 다대다 관계와 연결하려는 경우(extra data with a many-to-many relationship)에 사용됨
- symmetrical
  - 기본 값: True
  - ManyToManyField가 동일한 모델(on self)을 가리키는 정의에서만 사용
  - True일 경우
    - _set 매니저를 추가하지 않음
    - source 모델의 인스턴스가 target 모델의 인스턴스를 참조하면 자동으로 target 모델 인스턴스도 source 모델 인스턴스를 자동으로 참조하도록 함(대칭)
    - 즉, 내가 당신의 친구라면 당신도 내 친구가 됨
  - 대칭을 원하지 않는 경우 False로 설정
    - Follow 기능 구현에서 다시 확인할 예정

#### Related Manager
- N:1 혹은 M:N 관계에서 사용 가능한 문맥(context)
- Django는 모델 간 N:1 혹은 M:N 관계가 설정되면 역참조시에 사용할 수 있는 manager를 생성
  - 우리가 이전에 모델 생성 시 objects라는 매니저를 통해 queryset api를 사용했던 것처럼 related manager를 통해 queryset api를 사용할 수 있게 됨
- 같은 이름의 메서드여도 각 관계(N:1, M:N)에 따라 다르게 사용 및 동작됨
  - N:1에서는 target 모델 객체만 사용 가능
  - M:N 관계에서는 관련된 두 객체에서 모두 사용 가능
- 메서드 종류
  - add(), remove(), create(), clear(), set() ...

#### methods ( many-to-many relationships일 때의 동작만 작성되었음)
- add()
  - 지정된 객체를 관련 객체 집합에 추가
  - 이미 존재하는 관계에 사용하면 관계가 복제되지 않음
  - 모델 인스턴스, 필드 값(PK)을 인자로 허용
- remove()
  - 관련 객체 집합에서 지정된 모델 개체를 제거
  - 내부적으로 QuerySet.delete()를 사용하여 관계가 삭제됨
  - 모델 인스턴스, 필드 값(PK)을 인자로 허용

#### 중개 테이블 필드 생성 규칙
- 소스(source model) 및 대상(target model) 모델이 다른 경우
  - id
  - <containing_model>_id
  - <other_model>_id
- ManyToManyField가 동일한 모델을 가리키는 경우
  - id
  - from_<model>_id
  - to_<model>_id
-----------
## M:N (Article - User)
### 개요
- Article과 User의 M:N 관계 설정을 통한 좋아요 기능 구현하기

### LIKE
```python
# articles/models.py
# 모델 관계 설정

class Article(models.Model):
  ...
  like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_articles')
```
- like_users 필드 생성 시 자동으로 역참조에서 .article_set 매니저가 생성됨
- 그러나 이전 N:1(Article-User) 관계에서 이미 해당 매니저를 사용 중
  - user가 작성한글, user가 좋아요를 누른 글을 구분할 수 없게 됨
- user와 관계된 ForeignKey 혹은 ManyToManyField 중 하나에 related_name을 작성해야 함

```python
# articles/urls.py

urlpattern = [
  ...,
  path('<int:article_pk>/likes/', views.likes, name='likes'),
]
```
```python
# articles/views.py

@require_POST
def likes(request, article_pk):
  if request.user.is_authenticated:
    article = Article.objects.get(pk=article_pk)
    if article.like_users.filter(pk=request.user.pk).exists():
      article.like_users.remove(request.user)
    else:
      article.like_users.add(request.user)
    return redirect('articles:index')
  return redirect('accounts:login')
```
```html
<!-- articles/index.html -->
<!-- index 템플릿에서 각 게시글에 좋아요 버튼 출력하기 -->

...
<form action="{% url 'articles:likes' article.pk %}" method="POST">
  {% csrf_token %}
  {% if request.user in article.like_users.all %}
    <input type="submit" value="좋아요 취소">
  {% else %}
    <input type="submit" value="좋아요">
  {% endif %}
</form>
```