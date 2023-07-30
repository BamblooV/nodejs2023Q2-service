# Home Library Service

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

1. Create `.env` file in root folder.
2. Specify `PORT`. (4000 as default)
3. You can run OpenAPI spec on 80 port by:
```
docker compose up -d --build
```
Change  port in `doc/api.yaml` on 8 line if you want use swagger to interact with api.

## Running application

```
npm start
```

## Testing

After application running open new terminal and enter:

```
npm run test
```