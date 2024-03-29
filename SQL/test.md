모델링은 단지 시스템 구현만을 위해 수행하는 것이 아님.

### 데이터 모델링 유의사항
- 중복(duplication)
  - 데이터 모델은 같은 데이터를 사용하는 사람, 시간, 그리고 장소를 파악하는데 도움을 줌으로써 데이터베이스가 여러 장소에 같은 정보를 저장하는 잘못을 하지 않도록 한다.
- 비유연성(inflexibility)
  - 데이터 모델을 어떻게 설계했느냐에 따라 사소한 업무변화에도 데이터 모델이 수시로 변경됨으로써 유지보수의 어려움을 가중시킬 수 있다. 데이터의 정의를 데이터의 사용 프로세스와 분리함으로써 데이터 모델링은 데이터 혹은 프로세스의 작은 변화가 어플리케이션과 데이터베이스에 중대한 변화를 일으킬 수 있는 가능성을 줄인다
- 비일관성(inconsistency)
  - 데이터의 중복이 없더라도 비일관성은 발생할 수 있는데, 예를 들면 신용 상태에 대한 갱신없이 고객의 납부 이력 정보를 갱신하는 경우이다. 개발자가 서로 연관된 다른 데이터와 모순된다는 고려 없이 일련의 데이터를 수정할 수 있기 때문에 이와 같은 문제가 발생할 수 있다. 데이터 모델링을 할 때 데이터와 데이터 간의 상호 연관 관계에 대해 명확하게 정의한다면 이러한 위험을 사전에 예방하는데 도움을 줄 수 있다. 사용자가 처리하는 프로세스 혹은 이와 관련된 프로그램과 테이블의 연계성을 높이는 것은 데이터 모델이 업무 변경에 대해 취약하게 만드는 단점에 해당한다.

### 데이터모델링
- 개념적 데이터 모델링
  - 추상화 수준이 높고 업무중심적이고 포괄적인 수준의 모델링 진행
  - 전사적 데이터 모델링, EA 수립시 많이 이용
- 논리적 데이터 모델링
  - 시스템으로 구축하고자하는 업무에 대해 Key, 속성, 관계 등을 정확하게 표현, 재사용성이 높음
- 물리적 데이터 모델링
  - 실제로 데이터베이스에 이식할 수 있도록 성능, 저장 등 물리적인 성격을 고려하여 설계

### 데이터베이스 스키마 구조 3단계
- 외부스키마(사용자 뷰)
  - 사용자나 프로그래머가 각 개인의 입장에서 필요로 하는 데이터베이스의 논리적 구조를 정의한 것
  - 서브 스키마라고도 한다
  - 같은 데이터베이스에 대해서 서로 다른 관점을 정의할 수 있도록 허용한다.
- 개념스키마(전체적인 뷰)
  - 조직체 전체를 관장하는 입장에서 DB를 정의
  - 1개밖에 존재할 수 없다.
- 내부스키마(저장 스키마)
  - 물리적 저장장치의 입장에서 본 데이터베이스 구조
  - 물리적 구조를 정의하고 표현방법 물리적 순서 등을 나타낸다

엔터티를 어디에 배치하는가에 대한 문제는 필수사항은 아니지만 왼쪽 상단에 가장 중요한것을 배치한다.

### 엔터티의 특징
- 반드시 해당 없무에서 필요하고 관리하고자하는 정보여야 한다.
- 유일한 식별자에 의해 식별이 가능해야 한다.
- 영속적으로 존재하는 인스턴스의 집합이어야 한다.
- 엔터티는 업무 프로세스에 의해 이용되어야 한다.
- 엔터티는 반드시 속성이 있어야 한다.
- 엔터티는 다른 엔터티와 최소 한 개 이상의 관계가 있어야 한다.