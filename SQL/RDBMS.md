# 관계형 데이터베이스 개요
## 데이터베이스
- 일상적인 정보들을 모아 놓은 것 자체
- 특정 기업이나 조직 또는 개인이 필요에 의해 데이터를 일정한 형태로 저장해 놓은 것
- 보다 효율적인 데이터 관리 뿐만 아니라 에기치 못한 사건으로 인한 데이터의 손상을 피하고, 필요시 필요한 데이터를 복구하기 위한 강력한 기능의 소프트웨어 시스템을 DBMS(Database Management System)이라 한다.

## RDBMS

- 관계형 데이터베이스 시스템(Relational)
- 테이블 기반의 DBMS(Table based)
  - 데이터를 테이블 단위로 관리  > 하나의 테이블은 여러개의 column으로 구성
  - 중복 데이터를 최소화  > 데이터 수정 시 문제가 발생할 가능성이 높아짐 (정규화)
  - 여러 테이블에 분산되어 있는 데이터를 검색 시 테이블 간의 관계를 이용하여 필요한 데이터를 검색


## SQL(Structured Query Language)

- Database에 있는 정보를 사용할 수 있도록 지원하는 언어
- 모든 DBMS에서 사용 가능
- Query의 대소문자는 구분하지 않음(단, 데이터의 대소문자는 구분)
  - MySQL은 데이터도 대소문자 구분하지 않음(binary 함수 이용)

### SQL 구문

- DML(Data Manipulation Language) : 개별적으로 Database 테이블에서 새로운 행을 입력하고, 기존의 행을 변경하고 제거한다.
  - INSERT
  - UPDATE
  - DELETE
  - SELECT : Database로 부터 Data를 검색
- DDL(Data Definition Language) : 테이블로부터 데이터 구조를 생성, 변경, 제거한다.
  - CREATE
  - ALTER
  - DROP
  - RENAME
- DCL(Data Control Language) : Database와 그 구조에 대한 접근 권한을 제공하거나 제거한다.
  - GRANT
  - REVOKE
- TCL(Transaction Control Language) : DML에 의해 조작된 결과를 작업단위(트랜잭션) 별로 관리, 제어한다.
  - COMMIT
  - ROLLBACK

## 테이블
어느 특정한 주제와 목적으로 만들어지는 일종의 집합


## ERD(Entity Relationship Diagram)
테이블 내부의 관계, 테이블간의 연관성이나 관계를 직관적으로 표시하는 수단








### DDL

**데이터 베이스 생성**

```SQL
> create database 데이터베이스명;
> create database 데이터베이스명
  default character set 값
  collate 값;
```

> Character set은 각 문자가 컴퓨터에 저장될 때 어떠한 '코드'로 저장될지에 대한 규칙의 집합을 의미한다.
> Collation은 특정 문자 셋에 의해 데이터베이스에 저장된 값들을 비교 검색하거나 정렬 등의 작업을 위해 문자들을 서로 '비교'할 때 사용하는 규칙들의 집합을 의미한다.

**데이터 베이스 변경**

```SQL
> alter database 데이터베이스명
  default character set 값 collate 값;
```

**데이터 베이스 삭제**

```SQL
> drop database 데이터베이스명;
```

**데이터 베이스 사용**

```SQL
> use 데이터베이스명;
```


### DML

**SELECT, FROM**

SELECT clause 와 FROM clause는 필수

select clause

- \* : FROM 정에 나열된 테이블에서 모든 열을 선택
- ALL : 선택된 모든 행을 반환. ALL이 default(생략 가능)
- DISTINCT : 선택된 모든 행 중에서 중복 행 제거
- column : FROM 절에 나열된 테이블에서 지정된 열을 선택
- alias : 별칭

모든 사원의 모든 정보 검색

```SQL
select *
from employees;
```

사원이 근무하는 부서의 부서번호 검색

```SQL
SELECT all department_id
FROM employees;
select distinct department_id
from empoloyees;
```

모든 사원의 사번, 이름, 급여 검색

```SQL
select employee_id, first_name, salary
from employees;
```

모든 사원의 사번, 이름, 급여, 연봉 검색

```SQL
select employee_id as 사번, first_name '이름', salary as '급여', salary*12 '연봉'
from employees;
```

모든 사원의 사번, 이름, 급여, 연봉, 커미션, 커미션포함 연봉 검색

```SQL
select employee_id 사번, first_name '이름', salary '급여', salary*12 '연봉', commission_pct, (salary + salary*commission_pct)*12 '커미션포함연봉1', (salary + salary*IFNULL(commission_pct, 0))*12 '커미션포함연봉2'
from employees;
```

모든 사원의 사번, 이름, 급여, 급여에 따른 등급표시 검색(15000 이상 '고액연봉', 8000 이상 '평균연봉', 8000 미만 '저액연봉')

```SQL
select employee_id, first_name, salary,
  case when salary > 15000 then '고액연봉'
  when salary > 8000 then '평균연봉'
  else '저액연봉'
from employees;
```

**WHERE(and, or, not, in, between, NULL, like, order by)**

부서번호가 50인 사원 중 급여가 7000이상인 사원의 사번, 이름, 급여, 부서번호 검색

```SQL
select employee_id, first_name, salary, department_id
from employees
where department_id = 50
and salary >= 7000;
```

근무 부서번호가 50, 60, 70에 근무하는 사원의 사번, 이름, 부서번호 검색

```SQL
select employee_id, first_name, department_id
from employees
where department_id = 50
or department_id = 60
or department_id = 70;
```

```SQL
select employee_id, first_name, department_id
from employees
where department_id in (50, 60, 70)
```

급여가 6000이상 10000이하인 사원의 사번, 이름, 급여 검색

```SQL
select employee_id, first_name, salary
from employees
where salary >= 6000
and salary <= 10000;
```

```SQL
select employee_id, first_name, salary
from employees
where salary between 6000 and 10000;
```

근무 부서가 지정되지 않은(알 수 없는) 사원의 사번, 이름, 부서번호 검색

```SQL
select employee_id, first_name, salary
from employees
where department_id = null;
```

**like(wild card: %, _)**

이름에 'x'가 들어간 사원의 사번, 이름 검색

```SQL
select employee_id, first_name
from employees
where first_name like '%x%';
```

이름의 끝에서 3번째 자리에 'x'가 들어간 사원의 사번, 이름 검색

```SQL
select employee_id, first_name
from employees
where first_name like '%x__';
```

NULL 논리연산

**정렬**

부서별 정렬(오름차순) 후 급여 순 (내림차순) 검색

```SQL
select employee_id, first_name, department_id, salary
from employees
order by department_id, salary desc;
```
