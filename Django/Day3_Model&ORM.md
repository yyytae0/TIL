# Django

## INDEX
- Form & Data
- Django Model
  - INTRO
  - Database 맛보기
  - Model 기초
  - Migrations
  - ORM
- QuerySet API
-----------
## Form & Data
### Sending and Retrieving form data
- 데이터를 보내고 가져오기
- HTML form element를 통해 사용자와 애플리케이션 간의 상호작용 이해하기

### Client & Server architecture
- 웹은 다음과 같이 가장 기본적으로 클라이언트-서버 아키텍처를 사용
  - 클라이언트(일반적으로 웹 브라우저)가 서버에 요청을 보내고, 서버는 클라이언트의 요청에 응답
- 클라이언트 측에서 HTML form은 HTTP 요청을 서버에 보내는 가장 편리한 방법
- 이를 통해 사용자는 HTTP 요청에서 전달할 정보를 제공할 수 있음

### Sending form data(Client)
#### HTML \<form> elment
- 데이터가 전송되는 방법을 정의
- 웹에서 사용자 정보를 입력하는 여러 방식(text, button, submit 등)을 제공하고, 사용자로부터 할당된 데이터를 서버로 전송하는 역할을 담당
- '데이터를 어디(action)로 어떤 방식(method)으로 보낼지'
- 핵심 속성
  - action
  - method

HTML form's attributes
1. action
  - 입력 데이터가 전송될 URL을 지정
  - 데이터를 어디로 보낼 것인지 지정하는 것이며 이 값은 반드시 유효한 URL이어야 함
  - 만약 이 속성을 지정하지 않으면 데이터는 현재 form이 있는 페이지의 URL로 보내짐
2. method
  - 데이터를 어떻게 보낼 것인지 정의
  - 입력 데이터의 HTTP request methods를 지정
  - HTML form 데이터는 오직 2가지 방법으로만 전송 할 수 있는데 바로 GET 방식과 POST 방식

#### HTML \<input> element
- 사용자로부터 데이터를 입력 받기 위해 사용
- 'type' 속성에 따라 동작 방식이 달라진다.
  - input 요소의 동작 방식은 type 특성에 따라 현격히 달라지므로 각각의 type은 별도로 MDN문서에서 참고하여 사용하도록 함
  - type을 지정하지 않은 경우, 기본값은 'text'
- 핵심 속성
  - name

HTML input's attribute
- name
  - form을 통해 데이터를 제출(submit)했을 때 name 속성에 설정된 값을 서버로 전송하고, 서버는 name 속성에 설정된 값을 통해 사용자가 입력한 데이터 값에 접근할 수 있음
  - 서버에 전달하는 파라미터(name은 key, value는 value)로 매핑하는 것

#### HTTP request methods
- HTTP
  - HTML 문서와 같은 리소스(데이터, 자원)들을 가져올 수 있도록 해주는 프로토콜(규칙, 규약)
- 웹에서 이루어지는 모든 데이터 교환의 기초
- HTTP는 주어진 리소스가 수행 할 원하는 작업을 나타내는 request methods를 정의
- 자원에 대한 행위(수행하고자 하는 동작)를 정희
- 주어진 리소스(자원)에 수행하길 원하는 행동을 나타냄
- HTTP Method 예시
  - GET, POST, PUT, DELETE
- GET이 아닌 다른 method는 추후 다시 알아볼 예정

GET
- 서버로부터 정보를 조회하는 데 사용
  - 즉, 서버에게 리소스를 요청하기 위해 사용
- 데이터를 가져올 때만 사용해야 함
- 데이터를 서버로 전송할 때 Query String Parameters를 통해 전송
  - 데이터는 URL에 포함되어 서버로 보내짐

GET 메서드 작성
- GET과 get 모두 대소문자 관계없이 동일하게 동작하지만 명시적 표현을 위해 대문자 사용을 권장
- 데이터를 입력 후 submit 버튼을 누르고 URL의 변화를 확인한다.

Query String Parameters
- 사용자가 입력 데이터를 전달하는 방법 중 하나로, url 주소에 데이터를 파라미터를 통해 넘기는 것
- 이러한 문자열은 앰퍼샌드(&)로 연결된 key=value 쌍으로 구성되며 기본 URL과 물음표(?)로 구분됨
  - ex) https://host:port/path?key=value&key=value
- Query String이라고도 함
- 정해진 주소 이후에 물음표를 쓰는 것으로 Query String이 시작함을 알림
- key=value로 필요한 파라미터의 값을 적음
  - '='로 key와 value가 구분됨
- 파라미터가 여러 개일 경우 '&'를 붙여 여러 개의 파라미터를 넘길 수 있음

### Retrieving the data(Server)
#### Retrieving the data(Server)
- '데이터 가져오기(검색하기)'
- 서버는 클라이언트로 받은 key-value 쌍의 목록과 같은 데이터를 받게 됨
- 이러한 목록에 접근하는 방법은 사용하는 특정 프레임워크에 따라 다름
- Django 프레임워크 : throw가 보낸 데이터를 catch에서 가져오기

#### 데이터 가져오기
- '모든 요청 데이터는 view 함수의 첫번째 인자 request에 들어있다.'
  ```python
  def catch(request):
    message = request.GET.get('message')
    context = {
      'message': message,
    }
    return render(request, 'catch.html', context)

### Request and Response
- 요청과 응답 객체 흐름
  1. 페이지가 요청되면 Django는 요청에 대한 메타데이터를 포함하는 HttpRequest object를 생성
  2. 그리고 해당하는 적절한 view 함수를 로드하고 HttpRequest를 첫번째 인자로 전달
  3. 마지막으로 view 함수는 HttpResponse object를 반환

---------------
## Django Model
### 개요
- Model(이하 모델)의 핵심 개념과 ORM을 통한 데이터베이스 조작 이해
- Django는 웹 애플리케이션의 데이터를 구조화하고 조작하기 위한 추상적인 계층(모델)을 제공
  
### Database
Database
- 체계화된 데이터의 모임
- 검색 및 구조화 같은 작업을 보다 쉽게 하기 위해 조직화된 데이터를 수집하는 저장 시스템
- 기본 구조
  - 스키마(Schema)
  - 테이블(Table)

스키마(Schema)
- 뼈대(Structure)
- 데이터베이스에서 자료의 구조, 표현 방법, 관계 등을 정의한 구조

테이블(Table)
- 필드와 레코드를 사용해 조직된 데이터 요소들의 집합
- 관계(Relation)라고도 부름
  1. 필드(field) : 속성, 컬럼(Column)
  2. 레코드(record) : 튜플, 행(Row)

필드(field)
- 속성 혹은 컬럼(column)
- 각 필드에는 고유한 데이터 형식이 지정됨
  - INT, TEXT 등

레코드(record)
- 튜플 혹은 행(row)
- 테이블의 데이터는 레코드에 저장됨

PK(Primary Key)
- 기본 키
- 각 레코드의 고유한 값(식별자로 사용)
- 기술적으로 **다른 항목과 절대로 중복될 수 없는 단일 값(unique)**
- 데이터베이스 관리 및 테이블 간 관계 설정 시 주요하게 활용 됨
- ex) 주민등록번호

쿼리(Query)
- 데이터를 조회하기 위한 명령어
- 조건에 맞는 데이터를 추출하거나 조작하는 명령어(주로 테이블형 자료구조에서)
- 'Query를 날린다' == '데이터베이스를 조작한다'

### Model
개요
- Django는 Model을 통해 데이터에 접근하고 조작
- 사용하는 데이터들의 필수적인 필드들과 동작들을 포함
- 저장된 데이터베이스의 구조(layout)
- 일반적으로 각각의 모델은 하나의 데이터베이스 테이블에 매핑(mapping)
  - 모델 클래스 1개 == 데이터베이스 테이블 1개

Model 작성하기
- models.py 작성
  - 모델 클래스를 작성하는 것은 데이터베이스 테이블의 스키마를 정의하는 것
  - '모델 클래스 == 테이블 스키마'
    ```python
    # articles/models.py

    class Article(models.Model):
      title = models.CharField(max_length=10)
      content = models.TextField()
    # id 컬럼은 테이블 생성시 Django가 자동으로 생성
    ```
  - 각 모델은 django.models.Model 클래스의 서브 클래스
    - 즉, 각 모델은 django.db.models 모듈의 Model 클래스를 상속받아 구성됨
    - 클래스 상속 기반 형태의 Django 프레임워크 개발
  - models 모듈을 통해 어떠한 타입의 DB 필드를 정의할 것인지 정의
    - Article에는 어떤 데이터 구조가 필요한지 정의
    - 클래스 변수 title과 content는 DB 필드를 나타냄

Django Model Field
- django는 모델 필드를 통해 테이블의 필드(컬럼)에 저장할 데이터 유형(INT, TEXT 등)을 정의
- 데이터 유형에 따라 다양한 모델 필드를 제공
  - ex) DataField(), CharFiesd(), IntegerField()
- CharField(max_length=None, **options)
  - 길이의 제한이 있는 문자열을 넣을 때 사용
  - max_length
    - 필드의 최대 길이(문자)
    - CharField의 필수 인자
    - 데이터베이스와 Django의 유효성 검사(값을 검증하는 것)에서 활용됨
- TextField(**options)
  - 글자 수가 많을 때 사용
  - max_length 옵션 작성 시 사용자 입력 단계에서는 반영 되지만, 모델과 데이터베이스 단계에는 적용되지 않음(CharField를 사용해야 함)
    - 실제로 저장될 때 길이에 대한 유효성을 검증하지 않음

데이터베이스 스키마
- 지금까지 작성한 models.py는 데이터베이스 스키마를 정의한 것
- 이제 이러한 모델의 변경사항을 실제 데이터베이스에 반영하기 위한 과정이 필요

### Migrations
Django가 모델에 생긴 변화(필드 추가, 수정 등)를 실제 DB에 반영하는 방법

주요 명령어
- makemigrations
  - 모델의 변경사항에 대한 새로운 migration을 만들 때 사용
    ```
    $ python manage.py makemigrations
    ```
  - 명령어 실행 후 migration/0001_initial.py가 생성된 것을 확인
  - '파이썬으로 작성된 설계도'
- migrate
  - makemigrations로 만든 설계도를 실제 데이터베이스에 반영하는 과정(db.sqlite3 파일에 반영)
  - 결과적으로 모델의 변경사항과 데이터베이스를 동기화
    ```
    $ python manage.py migrate
    ```
  - 설계도를 실제 db.sqlite3 DB파일에 반영

반드시 기억해야 할 migration 3단계
1. models.py에서 변경사항이 발생하면
2. migration 생성 : makemigrations
3. DB 반영(모델과 DB의 동기화) : migrate

### ORM
개요
- Object-Relational-Mapping
- 객체 지향 프로그래밍 언어를 사용하여 호환되지 않는 유형의 시스템 간에(Django <-> DB)데이터를 변환하는 프로그래밍 기술
- 객체 지향 프로그래밍에서 데이터베이스를 연동할 때, 데이터베이스와 객체 지향 프로그래밍 언어 간의 호환되지 않는 데이터를 변환하는 프로그래밍 기술
- Django는 내장 Django ORM을 사용
- 한 마디로 SQL을 사용하지 않고 데이터베이스를 조작할 수 있게 만들어주는 매개체
![orm 예시](diagram3.PNG)

ORM 장단점
- 장점
  - SQL을 잘 알지 못해도 객체지향 언어로 DB 조작이 가능
  - 객체 지향적 접근으로 인한 높은 생산성
- 단점
  - ORM만으로 세밀한 데이터베이스 조작을 구현하기 어려운 경우가 있음

ORM을 사용하는 이유
- **생산성**
- 현시대 개발에서 가장 중요한 키워드는 바로 생산성
- 우리는 DB를 객체(object)로 조작하기 위해 ORM을 사용할 것

### Model 정리
 - '웹 애플리케이션의 데이터를 구조화하고 조작하기 위한 도구'
-----------
## QuerySet API
### 사전준비

### QuerySet API
Database API
- Django가 제공하는 ORM을 사용해 데이터베이스를 조작하는 방법
- Model을 정의하면 데이터를 만들고 읽고 수정하고 지울 수 있는 API를 제공
- 구문 : ModelClass.Manager.QuerysetAPI
  - ex) Articles.objects.all()

objects manager
- Django 모델이 데이터베이스 쿼리 작업을 가능하게 하는 인터페이스
- Django는 기본적으로 모든 Django 모델 클래스에 대해 objects라는 Manager 객체를 자동으로 추가함
- 이 Manager를 통해 특정 데이터를 조작할 수 있음
- DB를 Python class로 조작할 수 있도록 여러 메서드를 제공하는 manager

Query
- 데이터베이스에 특정한 데이터를 보여 달라는 요청
  - '쿼리문을 작성한다' == 원하는 데이터를 얻기 위해 데이터베이스에 요청을 보낼 코드를 작성한다.
- 이때, 파이썬으로 작성한 코드가 ORM에 의해 SQL로 변환되어 데이터베이스에 전달되며, 데이터베이스의 응답 데이터를 ORM이 QuerySet이라는 자료 형태로 변환하여 우리에게 전달

QuerySet
- 데이터베이스에게서 전달 받은 객체 목록(데이터 모음)
  - 순회가 가능한 데이터로써 1개 이상의 데이터를 불러와 사용할 수 있음
- Django ORM을 통해 만들어진 자료형이며, 필터를 걸거나 정렬 등을 수행할 수 있음.
- object manager를 사용하여 복수의 데이터를 가져오는 queryset method를 사용할 때 반환되는 객체
- 단, 데이터베이스가 단일한 객체를 반환 할 때는 QuerySet이 아닌 모델(Class)의 인스턴스로 반환됨

QuerySet API
- QuerySet과 상호작용하기 위해 사용하는 도구(메서드, 연산자 등)

### QuerySet API 익히기
CRUD
- Create/ Read/ Update/ Delete
  - 생성/ 조회/ 수정/ 삭제
- 대부분의 컴퓨터 소프트웨어가 가지는 기본적인 데이터 처리 기능 4가지를 묶어서 일컫는 말

### CREATE
데이터 객체를 만드는(생성하는) 3가지 방법
- 첫번째 방법
  1. article = Article() : 클래스를 통한 인스턴스 생성
  2. article.title : 클래스 변수명과 같은 이름의 인스턴스 변수를 생성 후 값 할당
  3. article.save() : 인스턴스로 save 메서드 호출
- 두번째 방법
  - 인스턴스 생성 시 초기 값을 함께 작성하여 생성
    ```
    >>> article = Article(title='second', content='django!')
    ```
- 세번째 방법
  - QuerySet API 중 create() 메서드 활용
    ```
    # 위 2가지 방식과는 다르게 바로 생성된 데이터가 반환 된다.

    >>> Article.objects.create(title='thire', content='django!')
    ```

.save()
- 'Saving object'
- 객체를 데이터베이스에 저장함
- 데이터 생성 시 save를 호출하기 전에는 객체의 id 값은 None
  - id 값은 Django가 아니라 데이터베이스에서 계산되기 때문
- 단순히 모델 클래스를 통해 인스턴스를 생성하는 것은 DB에 영향을 미치지 않기 때문에 반드시 save를 호출해야 테이블에 레코드가 생성됨

### READ
개요
- QuerySet API method를 사용해 데이터를 다양하게 조회하기
- QuerySet API method는 크게 2가지로 분류됨
  - Methods that 'return new querysets'
  - Methods that 'do not retusn querysets'
  
all()
- QuerySet return
- 전체 데이터 조회

get()
- 단일 데이터 조회
- 객체를 찾을 수 없으면 DoesNotExist 예외를 발생시키고, 둘 이상의 객체를 찾으면 MultipleObjectsReturned 예외를 발생시킴
- 위와 같은 특징을 가지고 있기 때문에 primary key와 같이 고유성을 보장하는 조회에서 사용해야 함

filter()
- 지정된 조회 매개 변수와 일치하는 객체를 포함하는 새 QuerySet을 반환

Field lookups
- 특정 레코드에 대한 조건을 설정하는 방법
- QuerySet 메서드 filter(), exclude() 및 get()에 대한 키워드 인자로 지정됨

### UPDATE
Update 과정
1. 수정하고자 하는 article 인스턴스 객체를 조회 후 반환 값을 저장
2. article 인스턴스 객체의 인스턴스 변수 값을 새로운 값으로 할당
3. save() 인스턴스 메서드 호출

### DELETE
Delete 과정
1. 삭제하고자 하는 article 인스턴스 객체를 조회 후 반환 값을 저장
2. delete() 인스턴스 메서드 호출