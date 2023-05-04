# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter o seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

## Estrutura do projeto
Na primeira parte do projeto nos instalamos todas as dependencias necessarias e configuramos o projeto
criamos a pasta src e dentro dele configuramos o app.ts (onde inicializamos o nosso projeto com o fastify) e o server.ts (onde esta localizado o nosso servidor na onde ele vai rodar) e depois criamos uma pasta env que nela nos configurando a variavel de ambiente para rodar no nosso projeto sem que ocorra erro. um diretorio .npmrc para que todas as dependencias do nosso app permanecam na versao que foi criado o projeto para que futuramente ele nao atualize sozinho e venha causar erro no nosso site.

# inicializando o projeto
    npm init -y

# intalando o typescript
    npm i typescript @types/node tsx tsup -D

# Inicia o typescript na aplicacao
    npx tsc --init (cria o arquivo tsconfig.json)

# Intalando o fastify
    npm i fastify

# Instalando o eslint
    npm i @rocketseat/eslint-config -D

##  Integração com Prisma ORM
Nesse modulo integramos o prisma com a nossa aplicacao utilizando o docker para criar uma instancia do banco de dados postegre, com isso inicializamos o prisma, criamos as migrations e esta sendo rodado no docker

# Instalando o Prisma e inicializando prisma e vamos instalar o prisma/client tambem
    npm i prisma -D
    npx prisma init
    npm i @prisma/client
    npx prisma migrate dev (utilizamos para criar uma migration)

# Para criar o doker utilizamos esse comando no terminal e para inicializar ele tambem 
    docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql

    docker start api-solid-pg (nome que esta no docker 03-api-solid-api-solid-pg-1)
    docker stop api-solid-pg (nome que esta no docker 03-api-solid-api-solid-pg-1)
    docker ps (utilizamos para saber se o banco esta rodando ou nao)

# Instalamos o bcryptjs para criptografar a senha utilizando o hash
    npm i bcryotjs
    npm i @types/bcryotjs -D