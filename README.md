# Home Library Service

![](./assets/im-fine.svg)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - 18 (LTS)

## Downloading

```
git clone git@github.com:BamblooV/nodejs2023Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Prepare for running

1. Create `.env` file in root folder. You can just rename `.env.example`
2. Specify `PORT`. (4000 as default)
Change  port in `doc/api.yaml` on 8 line if you want use swagger to interact with api.
3. Specify `POSTGRES_HOST`. If yoy want run app locally it should be `localhost`. If you want run app in docker container it should be `postgres`.

## Running application
App require running database. You should run db if you want run app locally.
```
npm run docker:dev
npm run start:dev
```
Or you can run application in docker:
```
npm run docker:start
```

## Development in Container
If you want docker watch your working directory, you should start app by
```
npm run start:docker:dev
```

## Migrations
Migrations runs automatically on app start. But there are some scripts for migrations:
```
npm rin migration:create
npm rin migration:generate
npm rin migration:run
npm rin migration:revert
```

## Vulnerability
You can scan images vulnerability by
```
npm run docker:scan
```
You also can scan images vulnerability after containers:
```
npm run docker:run
```

It works only for windows users with latest docker desktop.

## Testing

After application running open new terminal and enter:

```
npm run test:auth
```


