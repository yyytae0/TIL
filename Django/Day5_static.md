# Django
## INDEX
- Django Form
- Django Model Form
- Static & Media Files

## Django Form
### 개요
- 우리는 지금까지 HTML form, input 태그를 통해서 사용자로부터 데이터를 받았음
- 현재 우리 Django 서버는 들어오는 요청을 모두 수용하고 있는데, 이러한 요청 중에는 비정상적인 혹은 악의적인 요청이 있다는 것을 생각해야 함
- 이처럼 사용자가 입력한 데이터가 우리가 원하는 데이터 형식이 맞는지에 대한 유효성 검증이 반드시 필요
  - 이러한 유효성 검증은 많은 부가적인 것들을 고려해서 구현해야 하는데, 이는 개발 생산성을 늦출뿐더러 쉽지 않은 작업임
- Django Form은 이 과정에서 과중한 작업과 반복 코드를 줄여줌으로써 훨씬 쉽게 유효성 검증을 진행할 수 있도록 만들어 줌

### Form에 대한 Django의 역할
- Form은 Django의 유효성 검사 도구 중 하나로 외부의 악의적 공격 및 데이터 손상에 대한 중요한 방어 수단
- Django는 Form과 관련한 유효성 검사를 단순화하고 자동화할 수 있는 기능을 제공하여, 개발자가 직접 작성하는 코드보다 더 안전하고 빠르게 수행하는 코드를 작성할 수 있다.
  - 개발자가 필요한 핵심 부분만 집중할 수 있도록 돕는 프레임워크의 특성

### Django는 Form에 관련된 작업의 세 부분을 처리
1. 렌더링을 위한 데이터 준비 및 재구성
2. 데이터에 대한 HTML forms 생성
3. 클라이언트로부터 받은 데이터 수신 및 처리

### The Django Form Class
#### 개요
- Form Class
  - Django form 관리 시스템의 핵심

#### Form Class 선언
- Form class를 선언하는 것은 Model Class를 선언하는 것과 비슷하다.
- 비슷한 이름의 필드 탑입을 많이 가지고 있다.(다만 이름만 같을 뿐 같은 필드는 아님)
- Model과 마찬가지로 상속을 통해 선언(forms 라이브러리의 Form 클래스를 상속받음)
- 앱 폴더에 forms.py를 생성 후 ArticleForm Class 선언
  ```python
  # articles/forms.py
  from django import forms

  class ArticleForm(forms.Form):
    title = forms.CharField(max_length=10)
    content = forms.CharField()
  # Form Class를 forms.py에 작성하는 것은 규약이 아니다.
  # 파일 이름이 달라도 되고 models.py나 다른 어디에도 작성 가능
  # 다만 더 나은 유지보수의 관점 그리고 관행적으로 forms.py 파일 안에 작성하는 것을 권장
  ```
- form에는 model field와 달리 TextField가 존재하지 않음
- 모델의 TextField처럼 사용하려면 어떻게 작성 할 수 있을지는 나중에 알아볼 예정

```python
# view 업데이트
def create(request):
  if request.method == 'POST':
    ...
  else:
    form = ArticleForm()
    context = {'form': form}
    return render(request, 'articles/create.html', context)
```
```html
<!-- create 템플릿 업데이트 -->
{% block content %}
  <h1>CREATE</h1>
  <form action="{% url 'articles:create' %}" method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit">
  </form>
  <hr>
  <a href="{% url 'articles:index' %}">[back]</a>
{% endblock content %}
```

#### 업데이트 후 출력 확인
- view 함수에서 정의한 ArticleForm의 인스턴스(form) 하나로 input과 label 태그가 모두 렌더링 되는 것을 개발자 도구에서 확인하기
- 각 태그의 속성 값들 또한 자동으로 설정 되어있음

#### Form rendering options
- \<label> & \<input> 쌍에 대한 3가지 출력 옵션
- 각각 p, li, tr 태그로 감싸져서 렌더링
  - as_p()
  - as_ul() : ul태그는 직접 작성해야 한다.
  - as_table()
- 특별한 상황이 아니면 as_p()만 사용

#### Django의 2가지 HTML input 요소 표현
1. Form field
   - 입력에 대한 유효성 검사 로직을 처리
   - 템플릿에서 직접 사용됨
    ```python
    forms.CharField()
    ```
2. Widgets
   - 웹 페이지의 HTML input 요소 렌더링을 담당
     - 단순히 input 요소의 보여지는 부분을 변경
   - Widgets은 반드시 form fields에 할당 됨
   ```python
   forms.CharField(widget=forms.Textarea)
   ```

#### Widgets
개요
- Django의 HTML input element의 표현을 담당
- 단순히 HTML 렌더링을 처리하는 것이며 유효성 검증과 아무런 관계가 없음
  - '웹 페이지에서 input element의 단순 raw한 렌더링만을 처리하는 것일 뿐'

Textarea 위젯 적용하기
```python
# articles/forms.py

class ArticleForm(forms.Form):
  title = forms.CharField(max_length=10)
  content = forms.CharField(widget=forms.Textarea)
```

## Django ModelForm
### 개요
- Form Class를 작성하면서 든 생각
  - 'Model이랑 너무 중복되는 부분이 많은 것 같은데??'
- 이미 Article Model Class에 필드에 대한 정보를 작성했는데 이를 Form에 매핑하기 위해 Form Class에 필드를 재정의 해야만 했음
- ModelForm을 사용하면 이러한 Form을 더 쉽게 작성할 수 있음

### ModelForm Class
- Model을 통해 Form Class를 만들 수 있는 helper class
- ModelForm은 Form과 똑같은 방식으로 View 함수에서 사용

### ModelForm 선언
- forms 라이브러리에서 파생된 ModelForm 클래스를 상속받음
- 정의한 ModelForm 클래스 안에 Meta 클래스를 선언
- 어떤 모델을 기반으로 form을 작성할 것인지에 대한 정보를 Meta클래스에 지정
```python
# articles/forms.py

from django import forms
from .models import Article

class ArticleForm(forms.ModelForm):
  class Meta:
    model = Article
    fields = '__all__'
# 기존 ArticleForm은 주석처리
```

### ModelForm에서의 Meta Class
- ModelForm의 정보를 작성하는 곳
- ModelForm을 사용할 경우 참조할 모델이 있어야 하는데, Meta class의 model 속성이 이를 구성함
  - 참조하는 모델에 정의된 field 정보를 Form에 적용함
- fields 속성에 '\_\_all__'를 사용하여 모델의 모든 필드를 포함할 수 있음
- 또는 exclude 속성을 사용하여 모델에서 포함하지 않을 필드를 지정할 수 있음
```python
class Meta:
  model = Article
  fields = '__all__'

class Meta:
  model = Article
  exclude = ('title',)
# fields와 exclude를 함께 작성해도 되나 권장하지 않음
```
### 주의사항
- Meta 클래스는 왜 여기에 작성할까...
  - 파이썬의 문법적 개념으로 접근하지 말 것
- 단순히 모델 정보를 Meta라는 이름의 내부 클래스로 작성하도록 ModelForm의 설계가 이렇게 되어 있을 뿐 우리는 ModelForm의 역할과 사용법을 숙지해야 함

### Model Form 구현하기
CREATE
- 유효성 검사를 통과하면 데이터 저장 후 상세 페이지로 리다이렉트
- 통과하지 못하면 작성 페이지로 리다이렉트
```python
def create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            # is_valid() method
            # 유효성 검사를 실행하고, 데이터가 유효한지 여부를 boolean으로 반환
            article = form.save()
            # save() method
            # form 인스턴스에 바인딩된 데이터를 통해 데이터베이스 객체를 만들고 저장
            # instance 여부를 통해 생성할 지, 수정할 지를 결정함
            return redirect('articles:detail', article.pk)
    else:
        form = ArticleForm()
    context = {'form': form}
    return render(request, 'articles/new.html', context)
```

UPDATE
- ModelForm의 인자 instance는 수정 대상이 되는 객체(기존 객체)를 지정
- request.POST
  - 사용자가 form을 통해 전송한 데이터(새로운 데이터)
- instance
  - 수정이 되는 대상
```python
def update(request, pk):
    article = Article.objects.get(pk=pk)
    if request.method == 'POST':
        form = ArticleForm(request.POST, instance=article)
        if form.is_valid():
            form.save()
            return redirect('articles:detail', article.pk)
    else:
        form = ArticleForm(instance=article)
    
    context = {'form': form, 'article': article}
    return render(request, 'articles/update.html', context)
```
```html
{% block content %}
  <h1>UPDATE</h1>
  <hr>
  <form action="{% url 'articles:update' article.pk %}" method="POST">
    {% csrf_token %}

    {{form.as_p}}
    <input type="submit" value="제출">
  </form>
  <hr>
  <a href="{% url 'articles:index' %}">[back]</a>
{% endblock content %}
```

### Form과 ModelForm
- ModelForm이 Form보다 더 좋은 것이 아니라 각자 역할이 다른 것
- Form
  - 사용자의 입력을 필요로 하며 직접 입력 데이터가 DB 저장에 사용되지 않거나 일부 데이터만 사용될 때
- ModelForm
  - 사용자의 입력을 필요로 하며 입력을 받은 것을 그대로 DB 필드에 맞춰 저장할 때
  - 데이터의 유효성 검사가 끝나면 데이터를 각각 어떤 레코드에 매핑해야 할지 이미 알고 있기 때문에 곧바로 save() 호출이 가능

### Widgets 활용하기
1. 
```python
class ArticleForm(forms.ModelForm):
  class Meta:
    model = Article
    fields = '__all__'
    widgets = {
      'title': forms.TextInput(attrs={
        'class': 'title',
        'placeholder': 'Enter the title',
        'maxlength': 10,
        }
      )
    }
```
2. 
```python
class ArticleForm(forms.ModelForm):
  title = forms.CharField(
    label = '제목',
    widget=forms.TextInput(
      attrs={
        'class': 'my-title',
        'placeholder': 'Enter the title',
      }
    )
  )
  class Meta:
    model = Article
    fields = '__all__'
  
```

## Static files
### Static file
- 응답할 때 별도의 처리 없이 파일 내용을 그대로 보여주면 되는 파일
  - 사용자의 요청에 따라 내용이 바뀌는 것이 아니라 요청한 것을 그대로 보여주는 파일
- **파일 자체가 고정**되어 있고, 서비스 중에도 추가되거나 **변경되지 않고 고정** 되어있음
  - 예를 들어, 웹 사이트는 일반적으로 이미지, 자바스크립트 또는 CSS와 같은 미리 준비된 추가 파일(움직이지 않는)을 제공해야 함
- DJango에서는 이러한 파일들을 'static file'이라 함
  - Django는 staticfiles앱을 통해 정적 파일과 관련된 기능을 제공

### Media File
- 미디어 파일
- 사용자가 웹에서 업로드하는 정적 파일(user-uploaded)
- 유저가 업로드 한 모든 정적 파일

### 웹 서버와 정적 파일
- 웹 서버의 기본 동작은
  - 특정 위치(URL)에 있는 자원을 요청(HTTP request)받아서
  - 응답(HTTP response)을 처리하고 제공(serving)하는 것
- 이는 '자원과 자원에 접근 가능한 주소가 있다'라는 의미
  - 예를 들어, 사진 파일은 자원이고 해당 **사진 파일을 얻기 위한 경로인 웹 주소(URL)가 존재**함
- 즉, 웹 서버는 요청 받은 URL로 서버에 존재하는 정적 자원(static resource)을 제공함

### Django에서 정적파일을 구성하고 사용하기 위한 몇가지 단계
1. INSTALLED_APPS에 django.contrib.staticfiles가 포함되어 있는지 확인하기
2. settings.py에서 STATIC_UTL 정의하기
3. 앱의 static 폴더에 정적 파일을 위치하기( ex) my_app/static/sample.jpg )
4. 템플릿에서 static 템플릿 태그를 사용하여 지정된 경로에 있는 정적 파일의 URL 만들기
  ```html
  {% load static %}
  <img src="{% static 'sample.jpg' %}" alt="sample">
  ```
- load tag
  - 특정 라이브러리, 패키지에 등록된 모든 템플릿 태그와 필터를 로드
- static tag
  - STATIC_ROOT에 저장된 정적 파일에 연결

### Static files 관련 Core Settings
1. STATIC_ROOT
   - Default: None
   - Django 프로젝트에서 사용하는 모든 정적 파일을 한 곳에 모아 넣는 경로
   - **collectstatic**이 배포를 위해 정적 파일을 수집하는 디렉토리의 절대 경로
   - **개발 과정에서 settings.py의 DEBUG 값이 True로 설정되어 있으면 해당 값은 작용되지 않음**
   - 실 서비스 환경(배포 환경)에서 Django의 모든 정적 파일을 다른 웹 서버가 직접 제공하기 위해 사용
   - 배포환경에서는 Django를 직접 실행하는 것이 아니라, 다른 서버에 의해 실행되기 때문에 실행하는 다른 서버는 Django에 내장되어 있는 정적 파일들을 인식하지 못함(내장되어 있는 정적 파일들을 밖으로 꺼내는 이유)

2. STATICFILES_DIRS
   - Default: [](Empty list)
   - **app/static/** 디렉토리 경로를 사용하는 것(기본 경로)외에 추가적인 정적 파일 경로 목록을 정의하는 리스트
   - 추가 파일 디렉토리에 대한 전체 경로를 포함하는 문자열 목록으로 작성되어야 함
    ```python
    STATICFILES_DIRS = [
      BASE_DIR / 'static',
    ]
    ```

3. STATIC_URL
   - Default: None
   - STATIC_ROOT에 있는 정적 파일을 참조할 때 사용할 URL
   - 개발 단계에서는 실제 정적 파일들이 저장되어 있는 app/static/ 경로(기본 경로) 및 STATICFILES_DIRS에 정의된 추가 경로들을 탐색
   - **실제 파일이나 디렉토리가 아니며, URL로만 존재**
   - 비어 있지 않은 값으로 설정한다면 반드시 '/'로 끝나야 함
    ```python
    STATIC_URL = '/static/'
    ```

### static file 가져오기
1. 기본경로에 있는 static file 가져오기
   - articles/static/articles 경로에 이미지 파일 배치하기
   - static tag를 사용해 이미지 파일 출력하기
2. 추가경로에 있는 static file 가져오기
   - 추가경로 작성
   - static/ 경로에 이미지 파일 배치하기
   - static tag를 사용해 이미지 파일 출력하기


### Media Files
ImageField()
- 이미지 업로드에 사용하는 모델 필드
- FileField를 상속받는 서브 클래스이기 때문에 FileField의 모든 속성 및 메서드를 사용 가능
- 더해서 사용자에 의해 업로드 된 객체가 유효한 이미지인지 검사
- ImageField 인스턴스는 최대 길이가 100자인 문자열로 DB에 생성되며, max_length 인자를 사용하여 최대 길이를 변경할 수 있음

FileField()
- FileField(upload_to='', storage=None, max_length=100, **options)
- 파일 업로드에 사용하는 모델 필드
- 2개의 선택 인자를 가지고 있음
  - upload_to
  - storage

FileField/ImageField를 사용하기 위한 단계
1. settings.py에 MEDIA_ROOT, MEDIA_URL 설정
2. upload_to 속성을 정의하여 업로드 된 파일에 사용할 MEDIA_ROOT의 하위 경로를 지정(선택사항)

MEDIA_ROOT
- Default: ''(Empty string)
- 사용자가 업로드 한 파일(미디어 파일)들을 보관할 디렉토리의 절대 경로
- Django는 성능을 위해 업로드 파일은 데이터베이스에 저장하지 않음
  - 데이터베이스에 저장되는 것은 "파일 경로"
- MEDIA_ROOT는 STATIC_ROOT와 반드시 다른 경로로 지정해야 함

MEDIA_URL
- Default: ''(Empty string)
- MEDIA_ROOT에서 제공되는 미디어 파일을 처리하는 URL
- 업로드 된 파일의 주소(URL)를 만들어 주는 역할
  - 웹 서버 사용자가 사용하는 public URL
- 비어 있지 않은 값으로 설정 한다면 반드시 '/'로 끝나야함
- MEDIA_URL은 STATIC_URL과 반드시 다른 경로로 지정해야 함

개발 단계에서 사용자가 업로드한 미디어 파일 제공하기
```python
# articles/urls.py
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
  ...
] + static(settings.MEDIA_URL, document_root=setting.MEDIA_ROOT)
```
- 사용자로부터 업로드 된 파일이 프로젝트에 업로드 되고나서, 실제로 사용자에게 제공하기 위해서는 업로드 된 파일의 URL이 필요함
  - 업로드 된 파일의 URL == settings.MEDIA_URL
  - 위 URL을 통해 참조하는 파일의 실제 위치 == settings.MEDIA_ROOT

### Media File 사용하기
#### CREATE
```python
# articles/models.py

class Article(models.Model):
  title = models.CharField(max_length=20)
  content = models.TextField()
  image = models.ImageField(blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
# 기존 컬럼 사이에 작성해도 실제 테이블에 추가될 때는 가장 우측에 추가됨
```
blank
- Default: False
- True인 경우 필드를 비워 둘 수 있음
  - 이럴 경우DB에는 ''(빈 문자열)이 저장됨
- 유효성 검사에서 사용됨(is_valid)
  - Validation-related
  - 필드에 blank=True가 있으면 form 유효성 검사에서 빈 값을 입력할 수 있음

null
- Default: False
- True인 경우 Django는 빈 값을 DB에 NULL로 저장함
  - Database-related
- 주의사항
  - **CharField, TextField와 같은 문자열 기반 필드에는 null 옵션 사용을 피해야 함**
  - 문자열 기반 필드에 null=True로 설정 시 데이터 없음에 대한 표현이 2가지가 생김
  - Django는 문자열 기반 필드에서 NULL이 아닌 빈 문자열을 사용하는 것이 규칙

Migrations
- ImageField를 사용하려면 반드시 pillow 라이브러리가 필요
- pillow 설치 없이는 makemigrations 실행 불가
- pillow
  - 광범위한 파일 형식 지원, 효율적이고 강력한 이미지 처리 기능을 제공하는 라이브러리
  - 이미지 처리 도구를 위한 견고한 기반을 제공

파일 또는 이미지 업로드 시에는 form 태그에 enctype 속성을 다음과 같이 변경해야 한다.
```html
<form action="url" method="POST" enctype="multipart/form-data">
```
파일 및 이미지는 request의 POST 속성 값으로 넘어가지 않고 FILES 속성 값에 담겨 넘어간다.
```python
# articles/views.py

def create(request):
  if request.method == 'POST':
    form = ArticleForm(request.POST, request.FILES)
  ...
```
이후 게시글을 작성하면 이미지를 첨부하지 않으면 blank=True 속성으로 인해 빈 문자열이 저장되고, 이미지를 첨부한 경우는 MEDIA_ROOT 경로에 이미지가 업로드 된다. (DB에는 파일자체가 아닌 경로가 저장된다!!)

만약 같은 이름의 파일을 업로드 한다면 Django는 파일 이름 끝에 임의의 난수 값을 붙여 저장한다.

#### READ
```html
<!-- articles/detail.html -->
<!-- 업로드 된 파일의 상대 URL은 Django가 제공하는 url속성을 통해 얻을 수 있음 -->
{% block content %}
  {% if article.image %} <!-- 이미지 데이터가 있는 경우만 이미지 출력할 수 있도록 처리 -->
    <img src="{{ article.image.url }}">
  {% endif %}
  ...
<!-- article.image.url : 업로드 파일의 경로 -->
<!-- article.image : 업로드 파일의 파일 이름 -->
```

#### UPDATE
```html
<!-- articles/update.html -->
<!-- enctype 속성값 추가 -->
{% block content %}
  <form action="url" method="POST" enctype="multipart/form-data">
```
```python
# articles/views.py
# 이미지 파일이 담겨있는 request.FILES 추가 작성

def update(request, pk):
  article = Article.objects.get(pk=pk)
  if request.user == article.user:
    if request.method == 'POST':
      form = ArticleForm(request.POST, request.FILES, instance=article)
```