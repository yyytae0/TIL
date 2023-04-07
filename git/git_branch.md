- git branch
	- 깃 브랜치 목록
- git branch {branch 이름}
	- {branch 이름}으로 브랜치 만들기
- git branch -d {branch 이름}
	- {branch 이름} 브랜치 지우기

- git switch {branch 이름}
	- {branch 이름} 브랜치로 이동
- git switch -c {branch 이름}
	- {branch 이름} 브랜치로 만들면서 이동
	- git branch {branch 이름} + git switch {branch 이름}

- git log --all
	- 모든 브랜치의 깃 로그 확인
- git log --graph
	- 깃 로그를 그림으로 확인
- git log --oneline --all --graph
	- 모든 브랜치의 깃 로그를 / 한줄로 / 그림으로 확인(명령어들의 조합)

- git merge {branch 이름}
	- 현재 브랜치에서 {branch 이름}을 병합

- vim editor에서
	- i : 입력모드
	- esc : 모드 취소
	- :wq : 저장 후 나가기