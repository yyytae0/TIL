###SQLD 와 SQLP의 차이

- SQLD는 SQL언어를 이용해 DDL, DML, DCL을 유용하게 사용하고, relational DB의 기능을 효과적으로 사용하는 방법을 학습
- SQLP는 SQL의 고급활용(아키텍처, 트랜젝션, 옵티마이저, 인덱스, 조인 등)과 튜닝(성능개선)에 대해 다룬다


### SQL 튜닝
- Library Cache 최적화
  - Application Cursor Caching
  - Bind Parameter

- Call 최소화
  - Parse Call 최적화
  - Execute Call 최적화
  - Fetch Call 최적화

- IO 최적화
  - OLTP 프로그래밍(수직적 탐색 고도화, 수평적 탐색 고도화, Table Random I/O 최소화)
  - 배치 프로그래밍(Parallel Read, Parallel Write, Temporary Tablespace R/W, Direct Path Read, Direct Path Write, Lob-type Read No Cache)


### Oracle DBMS