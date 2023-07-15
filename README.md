# Projeto de Importação e Exportação de Boletos

Este é um projeto de importação e exportação de boletos em um sistema de controle de condomínio. O projeto utiliza Node.js, TypeScript, TypeORM e Docker.

## Requisitos

- Node.js
- Docker

## Instalação

1. Clone o repositório:

```bash
git clone git@github.com:leandrofacim/green-park.git
```

### Acesse a pasta do projeto:
cd green-park

### Inicie os contêineres Docker:
docker compose up

### Acesse o contêiner do backend:
docker exec -it backend-api bash

### Executando as Migrações

```bash
npm run typeorm migration:run
```

O servidor estará disponível em http://localhost:8080.


tem dois arquivos na raiz boleto.csv e boleto.pdf

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

