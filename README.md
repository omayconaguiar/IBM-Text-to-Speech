# IBM WATSON

## Getting Started

### Installing

    * yarn install

### Executing program

    * yarn dev

## Exemplo arquivo env

    * PORT=3000

    * LOG_LEVEL='debug'

    * DB_NAME='teste'
    * DB_USERNAME='teste'
    * DB_PASSWORD='12345678'

    * IBM
    * API_KEY='hyqEg-9m-uTHX_2_8o-rPx0A8VlpgUJhK4mDfzDspQAA'
    * URL='https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/7451aeae-df36-4b79-be01-88ccb3d8d50d'

## IBM credenciais

    Crie suas credencias de API_KEY:

    https://cloud.ibm.com/login

## Buildando tabelas

Criar banco de dados mysql.

    * CREATE DATABASE comment;

Criar tabela comment.

    * CREATE TABLE comment(
        id SERIAL PRIMARY KEY,    
        text TEXT NOT NULL
    )

## Author

    Maycon Aguiar 

## Endpoints

    * GET - Endereço com html:
    http://localhost:3000

    * POST - Cria comentário no banco de dados:

    http://localhost:3000/comment:

    * GET - Pega todos comentários do banco de dados:

    http://localhost:3000/comment/

    * GET - Pega comentário por id, e chama api ibm para converter o texto:
    http://localhost:3000/comment/:id
