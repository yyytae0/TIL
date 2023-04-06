# DB
## INDEX
- 데이터
- 데이터베이스
- 관계형 데이터베이스
- DBMS
- SQL

## 데이터(Data)
**저장**이나 **처리**에 효율적인 형태로 변환된 정보(information)
- 매일 초당 2억개의 메일이 전송되며 3만명이 넷플릭스를 시청
- 배달의 민족 월평균 주문 약 6천만건
- ....
- 카카오, 네이버 4000억 데이터 센터 구축투자
- 전 세계 데이터센터 전력 소비량이 남아공 국가 소비전력 추월

>> 데이터를 잘 저장하고 관리하는 기술이 필요하다

### 파일을 이용한 데이터 관리
- 장점
  - 운영체제에 관계 없이 어디에서나 쉽게 사용가능
  - 이메일이나 메신저를 이용해 간편하게 전송 가능
- 단점
  - 성능과 보안적 측면에서 한계가 명확
  - 대용량 데이터를 다루기에 적합하지 않음
  - 데이터를 구조적으로 정리하기에 어려움
  - 확장이 불가능한 구조

### 표를 이용한 데이터 관리
- 단점
  - 무한하게 커질 수 없음
  - 데이터 보안 측면
  - 데이터 무결성 측면

## 데이터베이스
### 데이터베이스의 종류
SQL(관계형 데이터베이스) VS NoSQL(비관계형 데이터베이스)

### 비관계형 데이터베이스
- 관계형 데이터베이스의 한계를 극복하기 위해 조금 더 유연한 데이터베이스
- 실제로 많이 쓰이는 데이터베이스로 서브 데이터베이스로 두고 빠른 처리, 확장이 필요한 기능에서 사용하는 경우가 많음
- 채팅, 소셜 관계, 실시간 사진, 메세지 처리, 실시간 추천 등
- 일반적으로 메인 데이터베이스는 관계형 데이터베이스를 사용


## 관계형 데이터베이스
### 관계형 데이터베이스(RDB)
- 데이터를 테이블, 행, 열 등으로 나누어 구조화 하는 방식
- 구조화해서 저장하므로 보다 체계적으로 데이터를 저장하고 관리할 수 있음
- 자료를 여러 테이블로 나누어서 관리하고, 테이블간 관계를 설정해 여러 데이터를 조작할 수 있음
- 데이터의 무결성(정확성, 일관성) 유지에 장점이 있음
- SQL을 사용하여 데이터를 조회하고 조작

### 구조
- 스키마
  - 테이블의 구조(Structure)
  - 데이터베이스에서 자료의 구조, 표현 방법, 관계 등 전반적인 명세를 기술한 것
- 테이블
  - 필드와 레코드를 사용해 조직된 데이터 요소들의 집합
  - 관계(relation)라고도 부름


## SQL
Structured Query Language

관계형 데이터 베이스에서 데이터를 관리하기 위해 사용하는 언어

### SQL Syntax
#### SQL Syntax
```sql
SELECT column_name FROM table_name;
```
- 모든 SQL 문(statement)는 SELECT, INSERT, UPDATE 등과 같은 키워드로 시작하고, 하나의 statement는 세미콜론(;)으로 끝남
  - 세미콜론은 각 SQL문을 구분하는 표준 방법
- SQL 키워드는 대소문자를 구분하지 않음
  - 즉, SELECT와 select는 SQL 문에서 동일한 의미
  - 하지만 대문자로 작성하는 것을 권장
- SQL에 대한 세부적인 문법 사항들은 이어지는 DDL, DML을 진행하며 익혀볼 것

#### Statement & Clause
- Statement(문)
  - 독립적으로 실행할 수 있는 완전한 코드 조각
  - statement는 clause로 구성됨
- Clause(절)
  - statement의 하위 단위
```sql
SELECT column_name FROM table_name;
```
- SELECT statement라 부름
- SELECT column_name, FROM table_name 2개의 clause로 구성 됨.

## CREATE TABLE
```sql
CREATE TABLE contacts(
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  email TEXT NOT NULL UNIQUE
);
```
### SQLite Data Types
- NULL
  - NULL value
  - 정보다 없거나 알 수 없음을 의미 (missing information or unknown)
- INTEGER
  - 정수
  - 크기에 따라 0, 1, 2, 3, 4, 6 또는 8바이트와 같은 가변 크기를 가짐
- REAL
  - 실수
  - 8바이트 부동 소수점을 사용하는 10진수 값이 있는 실수
- TEXT
  - 문자 데이터
- BLOB(Binary Large Object)
  - 입력된 그대로 저장된 데이터 덩어리(대용 타입 없음)
  - 바이너리 등 멀티미디어 파일
  - ex) 이미지 데이터
- Boolean type
  - SQLite에는 별도의 Boolean 타입이 없음
  - 대신 Boolean 값은 정수 0과 1로 저장됨

### Type Affinity
- 타입 선호도
- 특정 컬럼에 저장된 데이터에 권장되는 타입
- 데이터 타입 작성 시 SQLite의 5가지 데이터 타입이 아닌 다른 데이터 타입을 선언한다면, 내부적으로 각 타입의 지정된 선호도에 따라 5가지 선호도로 인식됨
- 존재 이유
  - 다른 데이터베이스 엔진간의 호환성을 최대화
  - 정적이고 엄격한 타입을 사용하는 데이터베이스의 SQL문을 SQLite에서도 작동하도록 하기 위함

### Constraints
#### 개요
- 제약조건
- 입력하는 자료에 대해 제약을 정함
- 제약에 맞지 않다면 입력이 거부됨
- 사용자가 원하는 조건의 데이터만 유지하기 위한 즉, 데이터의 무결성을 유지하기 위한 보편적인 방법으로 테이블의 특정 컬럼에 설정하는 제약

#### 데이터 무결성
- 데이터베이스 내의 데이터에 대한 정확성, 일관성을 보장하기 위해 데이터 변경 혹은 수정 시 여러 제한을 두어 데이터의 정확성을 보증하는 것
  - 무결성이란 데이터의 정확성, 일관성을 나타냄
- 데이터베이스에 저장된 데이터의 무결성을 보장하고 데이터베이스의 상태를 일관되게 유지하는 것이 목적

#### 종류
- NOT NULL
  - 컬럼이 NULL 값을 허용하지 않도록 지정
  - 기본적으로 테이블의 모든 컬럼은 NOT NULL 제약 조건을 명시적으로 사용하는 경우를 제외하고는 NULL 값을 허용함
- UNIQUE
  - 컬럼의 모든 값이 서로 구별되거나 고유한 값이 되도록 함
- PRIMARY KEY
  - 테이블에서 행의 고유성을 식별하는 데 사용되는 컬럼
  - 각 테이블에는 하나의 기본 키만 있음
  - 암시적으로 NOT NULL 제약 조건이 포함되어 있음
  - INTEGER 타입에만 사용가능
- AUTOINCREMENT
  - 사용되지 않은 값이나 이전에 삭제된 행의 값을 재사용하는 것을 방지
  - INTEGER PRIMARY KEY 다음에 작성하면 rowid를 다시 재사용하지 못하도록 함

#### rowid의 특징
- 테이블을 생성할 때마다 rowid라는 암시적 자동 증가 컬럼이 자동으로 생성됨
- 테이블의 행을 고유하게 식별하는 64비트 부호 있는 정수 값
- 테이블에 새 행을 삽입할 때마다 정수 값을 자동으로 할당
  - 값은 1에서 시작
  - 데이터 삽입 시에 rowid 또는 INTEGER PRIMARY KEY 컬럼에 명시적으로 값이 지정되지 않은 경우, SQLite는 테이블에서 가장 큰 rowid보다 하나 큰 다음 순차 정수를 자동으로 할당(AUTOINCREMENT와 관계없이)
- 만약 INTEGER PRIMARY KEY 키워드를 가진 컬럼을 직접 만들면 이 컬럼은 rowid 컬럼의 별칭(alias)이 됨
  - 즉, 새 컬럼 이름으로 rowid에 액세스 할 수 있으며 rowid 이름으로도 여전히 액세스 가능
- 데이터가 최대 값에 도달하고 새 행을 삽입하려고 하면 SQLite는 사용되지 않는 정수를 찾아 사용
- 만약 SQLite가 사용되지 않은 정수를 찾을 수 없으면 SQLITE_FULL 에러가 발생
  - 또한 일부 행을 삭제하고 새 행을 삽이하면 SQLite는 삭제된 행에서 rowid 값을 재사용하려고 시도


## ALTER TABLE
### 개요
- "Modify the structure of an existing table"
- 기존 테이블의 구조를 수정(변경)
- SQLite의 ALTER TABLE 문을 사용하면 기존 테이블을 변경할 수 있음

### 예시
```sql
-- RENAME table
ALTER TABLE table_name RENAME TO new_table_name;
-- RENAME column
ALTER TABLE table_name RENAME COLUMN column_name TO new_column_name;
-- ADD new column
ALTER TABLE table_name ADD COLUMN column_definition;
-- DELETE column
ALTER TABLE table_name DROP COLUMN column_name;
```

### ALTER TABLE ADD COLUMN
- 만약 테이블에 기존 데이터가 있을 경우 에러가 발생
- 이전에 이미 저장된 데이터들은 새롭게 추가되는 컬럼에 값이 없기 때문에 NULL이 작성됨
- 새로 추가되는 컬럼에 NOT NULL 제약조건이 있기 떄문에 기본 값 없이는 추가될 수없다는 에러 발생
- 따라서 DEFAULT 제약조건을 사용하여 해결 가능

### ALTER TABLE DROP COLUMN
- 삭제하지 못하는 경우
  - 컴럼이 다른 부분에서 참조되는 경우
    - FK 제약조건에서 사용되는 경우
  - PK인 경우
  - UNIQUE 제약 조건이 있는 경우

## DROP TABLE
### 개요
- Remove a table from the database
- 데이터베이스에서 테이블을 제거
- 존재하지 않는 테이블을 제거하면 SQLite에서 오류가 발생

### 특징
- 한 번에 하나의 테이블만 삭제할 수 있음
- 여러 테이블을 제거하려면 여러 DROP TABLE 문을 실행해야 함
- DROP TABLE 문은 실행 취소하거나 복구할 수 없음
  - 주의하여 수행 필요
