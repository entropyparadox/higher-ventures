# 개발환경 셋팅하기

스타터를 사용하여 개발환경을 셋팅하는 방법을 설명합니다.

## 1. Node, NPM 설치

node와 npm 버전을 관리하는 툴로 [volta](https://volta.sh/)를 사용합니다.
터미널에 아래 명령어로 volta를 설치합니다.

```bash
curl https://get.volta.sh | bash
```

설치가 완료되면 터미널을 껐다 켠 뒤, 프로젝트 디렉토리에 접근하여 노드 버전을 확인해봅니다.
처음 실행시 노드 설치를 한 번 진행합니다.

```bash
node -v

# => v16.14.2
```

package.json에 명시되어 있는 node 버전과 같으면 설치 완료입니다.

```js
// package.json

{
  ...
  "volta": {
    "node": "16.14.2",
    "npm": "8.5.5",
    "yarn": "1.22.17"
  }
}
```

## 2. 로컬 DB 실행

API 개발에 필요한 DB가 도커 컴포즈로 제공됩니다. 도커를 활용하여 로컬 환경에 DB를 띄워두고 개발을 진행하게 됩니다.
도커가 설치되어 있지 않다면 [여기](https://www.docker.com/products/docker-desktop/)서 도커 데스크탑을 설치합니다.

도커 설치가 완료되었으면 아래 명령어로 DB 컨테이너를 실행시킵니다.

```bash
docker-compose up
```

위 명령어를 실행시키면 개발환경 DB 컨테이너와 테스트환경 DB 컨테이너가 동시에 실행됩니다.

현재 실행 중인 컨테이너를 확인하려면 아래 명령어를 실행합니다.

```bash
docker ps -a
```

개발환경 DB는 33080, 테스트환경 DB는 33081 포트를 기본값으로 사용합니다.
유저네임, 패스워드 등의 자세한 설정은 docker-compose.yml 파일을 참고해주세요.

DB 컨테이너를 모두 종료하려면 아래 명령어를 실행합니다.

```bash
docker-compose down
```

## 3. 환경변수

서버 실행에 필요한 환경변수를 정의해야 합니다.

먼저 `.env.example` 파일을 같은 위치에 `.env` 파일로 복사합니다.

```bash
cp .env.example .env
```

필수 환경변수는 주석이 해제되어 있으며 별도 수정 없이 사용할 수 있습니다.
필수가 아닌 환경변수는 주석처리 되어 있으니 필요에 따라 주석 해제하여 값을 채워 넣으시면 됩니다.

각 환경변수에 대한 설명은 `.env.example` 파일을 참고해주세요.

## 4. 서버 실행

스타터는 NestJS monorepo 구조로 front-api와 admin-api 두 가지의 서버 어플리케이션으로 구성되어 있습니다. 따라서 서버를 실행할 때도 front-api와 admin-api의 서버를 각각 따로 띄워야 합니다.

아래 명령어를 실행하여 개발환경에서 front-api 서버를 실행합니다.

```bash
yarn start:front:dev
```

아래 명령어를 실행하여 개발환경에서 admin-api 서버를 실행합니다.

```bash
yarn start:admin:dev
```
