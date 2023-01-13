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

- `git pull`
  - '동기화하기
  - 'origin master'

- `git commit -amend`
  - 잘못올린 커밋 수정하는 버전 ( push 전에 사용해야함 )
  - i를 눌러 insert모드로 변경 \> 수정 \> esc로 insert모드 탈출 > :wq로 저장

- `touch .gitignore`
  - 제외할 파일들을 명시할 .gitignore 파일 생성
  - .gitignore를 메모장으로 열어서 안에 제외할 파일 기입 
