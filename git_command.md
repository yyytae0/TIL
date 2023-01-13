# GIT 명령어


- `git init`
  - 깃 레포 만들기
  - git 안에서 다시 init하지 않기 (오류날 수 있음)

- `git add new.txt`
  - commit 전 중간저장
  - working directory > staging area

- `git commit -m 'some message`
  - 커밋(기록) 남기기
  - staging area > commits

- `git status`
  - 상태확인
  - 마지막 commit과 비교

- `git log`
  - 로그 확인
  - \--oneline > 메세지만 확인

- `git config --global user.name taeyeong`
  - 유저 닉네임

- `git config --global user.email aaa@naver.com`
  - 유저 메일

- `git config --global -l`
  - 유저 정보 확인

- `shift + insert`
  - 복붙

- `git remote add origin ~~`
  - 원격 연결
  - origin이란 별명의 주소~~

- `git remote -v`
  - 연결된 주소 확인

- `git push`
  - 업로드하기
  - `origin master`
  - `-u origin master` 이후에는 git push만으로 가능
