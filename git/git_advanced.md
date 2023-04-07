# GIT
## INDEX
- git branch & merge
- git workflow

## Git branch & merge
### Git branch
개요
- 브랜치는 나뭇가지라는 뜻을, 여러 갈래로 작업 공간을 나누어 독립적으로 작업할 수 있도록 도와주는 Git의 도구

장점
- 브랜치는 독립 공간을 형성하기 때문에 원본(master)에 대해 안전함
- 하나의 작업은 하나의 브랜치로 나누어 진행되므로 체계적인 개발이 가능함
- Git은 브랜치를 만드는 속도가 굉장히 빠르고, 적은 용량을 소모함

git branch
- 브랜치의 조회, 생성, 삭제와 관련된 Git 명령어
- 조회
  - ```git branch  # 로컬 저장소의 브랜치 목록 확인```
  - ```git branch -r  # 원격 저장소의 브랜치 목록 확인```
- 생성
  - ```git branch {브랜치 이름}  # 새로운 브랜치 생성```
  - ```git branch {브랜치 이름} {커밋 ID}  # 특정 커밋 기준으로 브랜치 생성```
- 삭제
  - ```git branch -d {브랜치 이름}  # 병합된 브랜치만 삭제 가능```
  - ```git branch -D {브랜치 이름}  # 강제 삭제```

git switch
- 현재 브랜치에서 다른 브랜치로 이동하는 명령어
- ```git switch {브랜치 이름}  # 다른 브랜치로 이동```
- ```git switch -c {브랜치 이름}  # 브랜치를 새로 생성 및 이동```
- ```git switch -c {브랜치 이름} {커밋 ID}  # 특정 커밋 기준으로 브랜치 생성 및 이동```
- switch하기 전에, 해당 브랜치의 변경 사항을 반드시 커밋 해야함을 주의할 것!
  - 다른 브랜치에서 파일을 만들고 커밋하지 않은 상태에서 switch를 하면 브랜치를 이동했음에도 불구하고 해당 파일이 그대로 남아있게 됨


### Git merge
git merge
- 분기된 브랜치들을 하나로 합치는 명령어
- master 브랜치가 상용이므로, 주로 master 브랜치에 병합
- ```git merge {합칠 브랜치 이름}```
  - 병합하기 전에 브랜치를 합치려고 하는, 즉 메인 브랜치로 switch 해야함
  - Fast-Forward, 3-way Merge, Merge Conflict 세종류가 존재

Fast-Forward
- 마치 빨리감기처럼 브랜치가 가리키는 커밋을 앞으로 이동시키는 방법
- ```(master) $ git merge hotfix```

3-way Merge
- 각 브랜치의 커밋 두 개와 공통 조상 하나를 사용하여 병합하는 방법
- ```(master) $ git merge hotfix```

Merge Conflict
- 두 브랜치에서 같은 부분을 수정한 경우, Git이 어느 브랜치의 내용으로 작성해야 하는지 판단하지 못하여 충돌(Conflict)이 발생했을 때 이를 해결하며 병합하는 방법
- 보통 같은 파일의 같은 부분을 수정했을 때 자주 발생함
- 충돌이 발생한 부분을 작성자가 직접 해결
- 충돌 해결 후, 병합된 내용을 기록한 Merge Commit 생성

## Git workflow
### 개요
- 브랜치와 원격 저장소를 이용해 협업을 하는 두 가지 방법
  - 원격 저장소 소유권이 있는 경우 : Shared repository model
  - 원격 저장소 소유권이 없는 경우 : Fork & Pull model

### Shared repository model
개요
- 원격 저장소가 자신의 소유이거나 Collaborator로 등록되어 있는 경우
- master 브랜치에 직접 개발하는 것이 아니라, 기능별로 브랜치를 따로 만들어 개발
- Pull Request를 사용하여 팀원 간 변경 내용에 대한 소통 진행

### Fork & Pull model
개요
- 오픈소스 프로젝트와 같이, 자신의 소유가 아닌 원격 저장소인 경우
- 원본 원격 저장소를 그대로 내 원격 저장소에 복제(이러한 행위를 Fork라고 함)
- 기능 완성 후 복제한 내 원격 저장소에 Push
- 이후 Pull Request를 통해 원본 원격 저장소에 반영될 수 있도록 요청함
