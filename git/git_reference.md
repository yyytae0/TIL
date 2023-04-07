# 참고
## INDEX
- Git 브랜치 전략
- PR(Pull Request) 자세히 알아보기

## Git 브랜치 전략
### 개요
- the strategy that software development teams adopt when writing, merging and deploying code when using a version control system.
- 여러 개발자가 하나의 레포지토리를 사용하는 환경에서 변경 내용의 충돌을 줄이고 협업을 효율적으로 하고자 만들어진 브랜치 생성 규칙 혹은 반법론
- 대표적인 예시로는 git-flow, github-flow, gitlab-flow가 있다.

### git-flow
- 2010년 Vincent Driessen이 제안한 git 브랜치 전략
- 아래와 같이 5개의 브랜치로 나누어 소스코드를 관리
  - master : 제품으로 출시될 수 있는 브랜치
  - develop : 다음 출시 버전을 개발하는 브랜치
  - feature : 기능을 개발하는 브랜치
  - release : 이번 출시 버전을 준비하는 브랜치
  - hotfix : 출시 버전에서 발생한 버그를 수정하는 브랜치
- 대규모 프로젝트에 적합한 브랜치 전략

### github-flow
- 복잡한 git-flow를 개선하여 github에서 사용하는 방식
- Pull Request 기능을 사용하도록 권장하며, 병합 후 배포가 자동화로 이루어짐

### gitlab-flow
- github-flow의 배포 이슈를 보완하기 위해 gitlab에서 사용하는 방식
- master 브랜치와 production 브랜치 사이에 pre-production 브랜치를 두어 개발 내용을 바로 반영하지 않고, 배포 시기를 조절함

### 정리
- 결국 어떤 브랜치 전략을 사용할 것 인지는 팀에서 정하는 문제
- 소개된 git, github, gitlab 브랜치 전략이 아닌 우리 팀 고유의 브랜치 전략도 가능
- 브랜치를 자주 생성하는 것을 강력히 권장하며, main(master) 브랜치 하나로만 작업하는 형태는 지양해야 함

## PR(Pull Request) 자세히 알아보기
### Github에서 Pull request 보내기
- 브랜치를 Push 했을 때 나타나는 Compare & pull request 버튼을 클릭
 - 혹은 상단 바의 Pull requests > New pull request를 통해서도 가능
- base, compare 브랜치 설정
 - 병합될 대상인 base는 master 브랜치로 설정
 - 병합할 대상인 compare는 feature/login 브랜치로 설정
- Pull Request에 대한 제목과 내용, 각종 담당자를 지정하는 페이지
 - 모두 작성했다면 Create pull request를 눌러서 PR을 생성
- PR이 생성되면 Conversation, Commits, Files changed 화면을 확인 가능
 - Conversation
   - write 부분에서 별도로 comment를 작성할 수 있음
   - Merge pull request 버튼을 누르면 병합 시작
   - 충돌(conflict) 상황에서는 충돌을 해결하라고 나타남
 - Commits
   - PR을 통해 반영될 커밋들을 볼 수 있음
 - File changed
   - 파일의 변화 내역들을 볼 수 있음
- 
