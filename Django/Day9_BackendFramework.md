# Django
## INDEX
- Django REST framework(Single Model)
  - POST
- Django REST framework(N:1)
- Serializer 활용하기
- 문서화

## Build RESTful API - Article
### POST
요청에 대한 데이터 생성이 성공했을 경우는 201 Created 상태코드를 응답하고 실패했을 경우는 400 Bad request를 응답
```python
# articles/views.py
from rest_framework import status

@api_view(['GET', 'POST'])
def article_list(requset):
  if request.method == 'GET':
    ...
  elif request.method == 'POST':
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serialzer.errors, status=status.HTTP_400_
    BAD_REQUEST)
```

#### Raising an exception on invalid data
- 유효하지 않은 데이터에 대해 예외 발생시키기
- is_valid()는 유효성 검사 오류가 잇는 경우 ValidationError 예외를 발생시키는 선택적 raise_exception 인자를 사용할 수 있음
- DRF에서 제공하는 기본 예외 처리기에 의해 자동으로 처리되며 기본적으로 HTTP 400 응답을 반환

### DELETE
- 게시글 삭제하기
- 요청에 대한 데이터 삭제가 성공했을 경우 204 No Content 상태 코드 응답
```python
# articles/views.py

@api_view(['GET', 'DELETE'])
def article_detail(require, article_pk):
  article = Article.objects.get(pk=article_pk)
  if request.method == 'GET':
    ...
  elif request.method == 'DELETE':
    article.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
```

### PUT
- 게시글 데이터 수정하기
- 요청에 대한 데이터 수정이 성공했을 경우는 200 OK 상태 코드 응답

```python
# articles/views.py

@api_view(['GET', 'DELETE', 'PUT'])
def article_detail(request, article_pk):
  ...
  elif request.method == 'PUT':
    serializer = ArticleSerializer(article, data=request.data)
    if serializer.is_valid(raise_exception=True):
      serializer.save()
      return Response(serializer.data)
```

---------
## Django REST framework - N:1 Relation
### 개요
- N:1 관계에서의 모델 data를 Serialization하여 JSON으로 변환하는 방법 학습

### GET- List
- 댓글 목록 조회하기
- Article List와 비교하며 작성해보기
```python
# articles/serializers.py
from .models import Article, Comment

class CommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = '__all__'
```
```python
# articles/urls.py

urlpatterns = [
  ...,
  path('comments/', views.comment_list),
]
```
```python
# articles/views.py

from .models import Article, Comment
from .serializers import ..., CommentSerializer

@api_view(['GET'])
def comment_list(request):
  comments = Comment.objects.all()
  serializer = CommentSerializer(comments, many=True)
  return Response(serializer.data)
```

### GET - Detail
- 단일 댓글 데이터 조회하기
- Ariticle과 달리 같은 serializer 사용하기
```python
# articles/urls.py

urlpatterns = [
  ...,
  path('comments/<int:comment_pk>/', views.comment_detail),
]
```
```python
# articles/views.py

@api_view(['GET'])
def comment_detail(request, comment_pk):
  comment = Comment.objects.get(pk=comment_pk)
  serializer = CommentSerializer(comment)
  return Response(serializer.data)
```

### POST
- 단일 댓글 데이터 생성하기
```python
# articles/urls.py

urlpatterns = [
  ...,
  path('articles/<int:article_pk>/comments/', views.comment_create),
]
```
```python
# articles/views.py

@api_view(['POST'])
def comment_create(request, article_pk):
  article = Article.objects.get(pk=article_pk)
  serializer = CommentSerializer(data=request.data)
  if serializer.is_valid(raise_exception=True):
    serializer.save(article=article)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
```
#### Passing Additional attributes to .save()
- save() 메서드는 특정 Serializer 인스턴스를 저장하는과정에서 추가적인 데이터를 받을 수 있음
- CommentSerializer를 통해 Serialize되는 과정에서 Parameter로 넘어온 article_pk에 해당하는 article 객체를 추가적인 데이터를 넘겨 저장

#### 읽기 전용 필드 설정
- read_only_fields를 사용해 외래 키 필드를 '읽기 전용 필드'로 설정
- 읽기 전용 필드는 데이터를 전송하는 시점에 '해당 필드를 유효성 검사에서 제외시키고 데이터 조회 시에는 출력'하도록 함
```python
# articles/serializers.py

class CommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = '__all__'
    read_only_fields = ('article',)
```

### DELETE & PUT
- 댓글 데이터 삭제 및 수정 구현하기
```python
# articles/views.py

@api_view(['GET', 'DELETE', 'PUT'])
def comment_detail(request, comment_pk):
  comment = Comment.objects.get(pk=comment_pk)
  if request.method == 'GET':
    ...
  elif request.method == 'DELETE':
    comment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  elif request.method == 'PUT':
    serializer = CommentSerializer(comment, data=request.data)
    if serializer.is_valid(raise_exception=True):
      serializer.save()
      return Response(serializer.data)
```
---------
## N:1 - 역참조 데이터 조회
### 개요
- 특정 게시글에 작성된 댓글 목록 출력하기
  - 기존 필드 override
- 특정 게시글에 작성된 댓글의 개수 출력하기
  - 새로운 필드 추가

### 특정 게시글에 작성된 댓글 목록 출력하기
- PrimaryKeyRelatedField()
```python
# articles/serializers.py

class ArticleSerializer(serializers.ModelSerializer):
  comment_set = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
  class Meta:
    model = Article
    fields = '__all__'
```
  - models.py에서 related_name을 통해 이름 변경 가능
- Nested relationships
```python
# articles/serializers.py

class CommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = '__all__'
    read_only_fields = ('article',)

class ArticleSerializer(serializers.ModelSerializer):
  comment_set = CommentSerializer(many=True, read_only=True)
  class Meta:
    model = Article
    fields = '__all__'
```
  - 모델 관계 상으로 참조된 대상은 참조하는 대상의 표현에 포함되거나 중첩될 수 있음
  - 이러한 중첩된 관계는 serializers를 필드로 사용하여 표현할 수 있음
  - 두 클래스의 상/하 위치를 변경해야 함

### 특정 게시글에 작성된 댓글의 개수 출력하기
- 새로운 필드 추가 - Article Detail
  - 게시글 조회 시 해당 게시글의 댓글 개수까지 함께 출력하기
```python
# articles/serializers.py

class AritlceSerializer(serializers.ModelSerializer):
  comment_set = CommentSerializer(many=True, read_only=True)
  comment_count = serializers.IntegerField(source='comment_set.count', read_only=True)
  class Meta:
    model = Article
    fields = '__all__'
```
- source
  - serializers field's argument
  - 필드를 채우는 데 사용할 속성의 이름
  - 점 표기법(dotted notation)을 사용하여 속성을 탐색할 수 있음

### 읽기 전용 필드 지정 이슈
- 특정 필드를 override 혹은 추가한 경우 read_only_fields가 동작하지 않으니 주의

## Serializer 활용하기
```python
class ArticleListSerializer(serializers.ModelSerializer):
  class Meta:
    model = Article
    fields = ('id', 'title', 'content',)

# 상속 이용하기
class ArticleDetailSerializer(AriticleListSerializer):
  comment_set = CommentSerializer(many=True, read_only=True)
  comment_count = serializers.IntegerField(source='comment_set.count', read_only=True)

  class Meta(ArticleListSerializer.Meta):
    fields = ArticleListSerializer.Meta.fields + (
      'comment_set',
      'comment_count',
    )
  
  # comment_set을 comments로 변경하기
  def to_representation(self, instance):
    rep = super().to_representation(instance)
    rep['comments'] = rep.pop('comment_set', [])
    return rep
```