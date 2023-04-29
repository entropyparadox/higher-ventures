# Starter

Full stack web application

## Starter Setup

```bash
# Starter 클론
$ git clone git@github.com:entropyparadox/starter.git <project name>

# setup 스크립트 실행
$ ./setup.sh

Project name: # 띄어쓰기 X, 영어 소문자, 하이픈, 언더스코어만 허용

```

### `setup.sh` 가 하는 일

1. starter git history 삭제
2. starter 라는 문자열을 프로젝트 이름으로 찾아바꾸기
3. `.env.example` 로 부터 `.env` 생성
4. 설정한 프로젝트 레포지토리로 git init & git commit & git remote add

## Guide

[Martian 개발자 문서](https://www.notion.so/Martian-f6b232112311429090b0942b2a52a6bf)

## Requirements

[Volta](https://volta.sh/), 각 폴더 package.json 의 volta 파트에서 node 및 npm 버전 확인 가능

- Install volta

```
curl https://get.volta.sh | bash
```

volta 설치 후 터미널 재시작하면 자동으로 node 및 npm 버전 설정 됨.

## Development

아래 명령어 실행 후 바로 개발 환경 시작 가능

```
npm i
npm start
```

## References

### back-end

- [NestJS](https://docs.nestjs.com)
- [TypeORM](https://typeorm.io)
- [PostgreSQL with Docker](https://www.notion.so/Docker-PostgreSQL-3a0005448c35425d977d6a9b0495e51d)

### front-end

- [React](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [React Query](https://react-query.tanstack.com)
- [react-hook-form](https://react-hook-form.com)
- [react-ridge-state](https://github.com/web-ridge/react-ridge-state)
- [Moment.js](https://momentjs.com)
