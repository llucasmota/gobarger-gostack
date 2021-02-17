## Go Barber

- Este é um projeto que tem o objetivo de fornecer:
  - Autenticação com jwt
  - Creação de usuários
  - Agendamentos de serviços de barbearia

### Tecnologias utilizadas:

- Typescript
- ExpressJS
- TypeORM
- Postgres
- Multer
- Docker

### Como instalar o projeto?

#### Baixando:

- `git clone https://github.com/llucasmota/go-barber.git`

#### Instalando:

- Na pasta raiz do projeto, através do terminal, executar o comando: `yarn`

### Configurações do docker:

#### Pré-requisito: Docker instalado

- No docker executar o seguinte comando(ajustando os dados de nomes, senhas e demais de acordo o que desejar): `$ docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres`

- Dados de variáveis de conexão podem ser atualizadas no caminho: `config/database.js`

### Criando as tabelas através das migrations:

- Na raiz do projeto executar o comando: `yarn sequelize db:migrate`

### Subindo o servidor:

- Na raiz do projeto executar o comando: `yarn dev`

### Executanto testes:

- `yarn test`
