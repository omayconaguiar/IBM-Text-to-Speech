# TalkMore API application

<img
    src="https://i.ibb.co/Yd8QcNB/frdfd.jpg"
    alt="Swagger Page of that application"
    title="Swagger Page of that application" />

## Frontend Repository

https://github.com/omayconaguiar/TalkMoreFrontend

## Setup Para rodar local

```js
yarn install
```

### Docker - Subir banco de dados localmente

```js
docker-compose up db
```

### Migrations

```js
yarn knex migrate:latest
```

```js
yarn knex seed:run
```

### Run 

```js
yarn dev
```

### Test

```js
yarn test
```

### Lint

```js
yarn lint
```