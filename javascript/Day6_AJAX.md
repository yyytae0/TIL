# JavaScript
## AJAX
- Asynchronous JavaScript And XML(비동기식 JavaScript와 XML)
- 비동기 통신을 이용하면 화면 전체를 새로고침 하지 않아도 서버로 요청을 보내고, 데이터를 받아 화면의 일부분만 업데이트 가능
- 이러한 비동기 통신 웹 개발 기술을 AJAX라 함
- 비동기 웹 통신을 위한 라이브러리 중 하나가 Axios

### 특징
- 페이지 전체를 reload(새로 고침)를 하지 않고서도 수행되는 비동기성
- 서버의 응답에 따라 전체 페이지가 아닌 일부분만을 업데이트 할 수 있음
  - 페이지 새로고침 없이 서버에 요청
  - 서버로부터 응답(데이터)을 받아 작업을 수행

### 적용하기(팔로우)
- 각각의 템플릿에서 script 코드를 작성하기 위한 block tag 작성
```html
<!-- base.html -->
<body>
  {% block script %}
  {% endblock script %}
</body>
```
```html
<!-- accounts/profile.html -->
{% block script %}
<script src="axios CDN..."></script>
<script>
  const form = document.querySelector('#follow-form')
  form.addEventListener('submit', function(event){
    event.preventDefault()
    axios({
      method: 'post',
      url: `/accounts/${}/follow/`
    })
  })
</script>
{% endblock script %}
```

- axios로 POST 요청을 보내기 위해 필요한 것
  - url에 작성할 user pk는 어떻게 작성해야 할까?
  - csrftoken은 어떻게 보내야 할까?

**data-\* attributes**
- 사용자 지정 데이터 특성을 만들어 임의의 데이터를 HTML과 DOM사이에서 교환할 수 있는 방법
- ex) data-test-value라는 이름의 특성을 지정했다면 JavaScript에서는 element.dataset.testValue로 접근할 수 있음
- 속성명 작성 시 주의사항
  - 대소문자 여부에 상관없이 xml로 시작하면 안 됨
  - 세미콜론을 포함해서는 안됨
  - 대문자를 포함해서는 안됨
- 사용 예시
```html
<div data-my-id="my-data"></div>
<script>
  const myId = event.target.dataset.myId
</script>
```

**csrftoken**
- 먼저 hidden 타입으로 숨겨져있는 csrf 값을 가진 input 태그를 선택해야 함
```javascript
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
```
- AJAX로 csrftoken을 보내는 방법
```javascript
axios({
  ...,
  headers: {'X-CSRFToken': csrftoken,}
})
```

#### XHR
- XMLHttpRequest
- AJAX 요청을 생성하는 JavaScript API
- XHR의 메서드로 브라우저와 서버 간 네트워크 요청을 전송할 수 있음
- Axios는 손쉽게 XHR을 보내고 응답 결과를 Promise 객체로 반환해주는 라이브러리

#### 최종코드
```html
<!-- accounts/profile.html -->

{% extends 'base.html' %}

{% block content %}
  <h1>{{ person.username }}님의 프로필</h1>
  <div>
    팔로워 : <span id="followers-count">{{ person.followers.all|length }}</span>
    팔로잉 : <span id="followings-count">{{ person.followings.all|length }}</span>
  </div>

  {% if request.user != person %}
  <div>
    <form id="follow-form" data-user-id="{{ person.pk }}">
      {% csrf_token %}
      {% if request.user in person.followers.all %}
        <input type="submit" value="언팔로우">
      {% else %}
        <input type="submit" value="팔로우">
      {% endif %}
    </form>
  <div>
  {% endif %}
{% endblock content %}
```
```python
# accounts/views.py

@require_POST
def follow(request, user_pk):
    if request.user.is_authenticated:
        User = get_user_model()
        me = request.user
        you = User.objects.get(pk=user_pk)
        if me != you:
            if you.followers.filter(pk=me.pk).exists():
                you.followers.remove(me)
                is_followed = False
            else:
                you.followers.add(me)
                is_followed = True
            context = {
                'is_followed': is_followed,
                'followers_count': you.followers.count(),
                'followings_count': you.followings.count(),
            }
            return JsonResponse(context)
        return redirect('accounts:profile', you.username)
    return redirect('accounts:login')
```
```javascript
{% block script %}
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
    const form = document.querySelector('#follow-form')
    form.addEventListener('submit', function(event){
      event.preventDefault()
      const userId = event.target.dataset.userId
      const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
      axios({
        method: 'POST',
        url: `/accounts/${userId}/follow/`,
        headers: {'X-CSRFToken': csrftoken}
      })
      .then((response) => {
        const isFollowed = response.data.is_followed
        const followBtn = document.querySelector('#follow-form > input[type=submit]')
        const followersCountTag = document.querySelector('#followers-count')
        const followingsCountTag = document.querySelector('#followings-count')
        const followersCount = response.data.followers_count
        const followingsCount = response.data.followings_count

        followersCountTag.innerText = followersCount
        followingsCountTag.innerText = followingsCount

        if (isFollowed === true){
          followBtn.value = 'unfollow'
        } else{
          followBtn.value = 'follow'
        }
      })
    })
  </script>
{% endblock script %}
```

### 적용하기(좋아요)
- 좋아요 비동기 적용은 팔로우 흐름 + forEach()&querySelectorAll()