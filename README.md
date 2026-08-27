# Furniro

Aplicação full stack de uma loja de móveis e decoração, criada para o programa de bolsas da Compass UOL. Ela reúne um catálogo de produtos, carrinho persistente, cadastro e login de usuários, área de contato e um checkout demonstrativo.

## Sumário

- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Estrutura do projeto](#estrutura-do-projeto)
- [API](#api)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Como executar localmente](#como-executar-localmente)
  - [Configurando o banco de dados](#configurando-o-banco-de-dados)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Docker](#docker)
- [Scripts](#scripts)

## Tecnologias

### Frontend

- React 19, TypeScript e Vite
- Tailwind CSS 4
- React Router DOM
- Axios, com cookies habilitados nas chamadas à API
- Zustand para o carrinho persistido no `localStorage`
- React Hook Form, Zod e `@hookform/resolvers` para validação de formulários
- React Hot Toast para feedbacks na interface
- Lucide React e React Icons

### Backend

- Node.js, Express 5 e TypeScript
- Prisma ORM com MongoDB 8
- JWT armazenado em cookie HTTP-only
- bcrypt para hash de senhas
- CORS e cookie-parser
- Winston para logs
- Faker para popular o catálogo de produtos

## Funcionalidades

### Frontend

- Home responsiva com hero, categorias, produtos em destaque, inspiração, mosaico animado e newsletter.
- Shop em `/shop` com paginação, ordenação, limite de itens e filtro de categoria; também aceita `/shop/:category`.
- Página de produto em `/product/:slug`, com galeria, variantes de cor/tamanho, quantidade, desconto e produtos relacionados.
- Carrinho em `/cart`, com alteração de quantidade, remoção, subtotal e persistência no navegador. Um item é identificado por `produto:cor:tamanho`.
- Sidebar do carrinho e menu responsivo para dispositivos móveis.
- Cadastro (`/signup`) e login (`/login`). As rotas protegidas redirecionam ao login e devolvem o usuário à página solicitada após a autenticação.
- Contato em `/contact`, protegido por autenticação, com formulário e informações da loja.
- Checkout em `/checkout`, também protegido e disponível somente com itens no carrinho. O formulário valida os dados, busca endereço brasileiro pelo CEP usando ViaCEP e permite transferência bancária ou pagamento na entrega.
- Página 404 para rotas inexistentes e para produtos não encontrados.

> Os formulários de contato e checkout são demonstrações de interface: o contato apenas confirma o envio na tela; o checkout mostra sucesso e limpa o carrinho. Não há envio de mensagem, criação de pedido, integração de pagamento ou persistência de dados de entrega no backend.

### Backend

- Catálogo de produtos com filtros, paginação e ordenação.
- Imagens de produto servidas estaticamente em `/images/products`.
- Criação de usuário, login, logout e consulta do usuário autenticado.
- Senhas com no mínimo 6 caracteres, incluindo maiúscula, minúscula e número.
- Autorização das consultas de usuário por cookie JWT, com validade de 7 dias.
- Validação de slug, ObjectId e e-mail; tratamento centralizado de erros HTTP e logs com Winston.
- Seed que gera 30 produtos com imagens locais.

## Estrutura do projeto

```text
.
├── backend/
│   ├── prisma/schema.prisma       # Modelos Product e User
│   ├── src/
│   │   ├── controllers/           # Produtos e usuários
│   │   ├── db/seed/               # Seed do catálogo
│   │   ├── middlewares/           # Auth, validação e erros
│   │   ├── repositories/          # Implementações Prisma
│   │   ├── routes/                # /products e /users
│   │   ├── services/              # Regras de negócio
│   │   └── public/images/         # Imagens estáticas dos produtos
│   └── dockerfile.dev
├── frontend/
│   ├── public/                    # Imagens e ícones da interface
│   ├── src/
│   │   ├── components/            # Componentes reutilizáveis e formulários
│   │   ├── context/               # Autenticação e carrinho Zustand
│   │   ├── pages/                 # Home, Shop, Product, Cart, Auth, Contact e Checkout
│   │   ├── services/              # Clientes de produtos e usuários
│   │   └── utils/
│   └── dockerfile.dev
└── docker-compose.yml
```

## API

O backend usa a porta `3000` por padrão.

### Produtos

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/products` | Lista produtos |
| `GET` | `/products/:slug` | Busca um produto por slug |
| `GET` | `/products/id/:id` | Busca um produto por ObjectId |

`GET /products` aceita os seguintes parâmetros de consulta:

| Parâmetro | Descrição |
|---|---|
| `category` | Filtra por categoria, sem diferenciar maiúsculas/minúsculas |
| `page` | Página atual (padrão: `1`) |
| `limit` | Itens por página (padrão: `16`) |
| `sort` | `price_asc` ou `price_desc` |

Resposta paginada:

```json
{
  "products": [],
  "total": 30,
  "page": 1,
  "limit": 16,
  "totalPages": 2
}
```

### Usuários

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| `POST` | `/users` | Não | Cria usuário com `email` e `password` |
| `POST` | `/users/login` | Não | Autentica e define o cookie JWT |
| `POST` | `/users/logout` | Sim | Remove o cookie JWT |
| `GET` | `/users/me` | Sim | Retorna o usuário da sessão |
| `GET` | `/users/id/:id` | Sim | Busca usuário por ObjectId |
| `GET` | `/users/email/:email` | Sim | Busca usuário por e-mail |

O CORS permite a origem definida em `FRONTEND_URL` e aceita credenciais. Em desenvolvimento, o cookie usa `SameSite=Lax` e não usa `Secure`; em produção, `NODE_ENV=production` ativa `Secure`.

## Variáveis de ambiente

### Backend

Copie `backend/.env.example` para `backend/.env` e preencha os valores:

| Variável | Obrigatória | Descrição |
|---|---|---|
| `DATABASE_URL` | Sim | URL de conexão com o MongoDB. Deve apontar para uma instância com Replica Set habilitado — automático no MongoDB Atlas, ou já configurado no Mongo do Docker Compose. |
| `JWT_SECRET` | Sim | Segredo forte usado para assinar JWTs. |
| `PORT` | Não | Porta do backend; padrão `3000`. |
| `FRONTEND_URL` | Não | Origem liberada pelo CORS; padrão `http://localhost:5173`. |
| `NODE_ENV` | Não | Use `development` localmente ou `production` em produção. |

Exemplo de URL para MongoDB Atlas:

```env
DATABASE_URL="mongodb+srv://<usuario>:<senha>@cluster0.xxxxx.mongodb.net/furniro?retryWrites=true&w=majority"
JWT_SECRET="troque-por-um-segredo-longo-e-aleatorio"
PORT=3000
FRONTEND_URL="http://localhost:5173"
NODE_ENV="development"
```

### Frontend

Opcionalmente, copie `frontend/.env.example` para `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Se ausente, essa é a URL padrão usada pela aplicação.

## Como executar localmente

Pré-requisitos: Node.js 22+, uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (camada gratuita já atende) e acesso à internet no primeiro uso do checkout para a consulta de CEP pelo ViaCEP.

### Configurando o banco de dados

1. Crie um cluster gratuito no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Em **Database Access**, crie um usuário de banco com usuário e senha.
3. Em **Network Access**, libere seu IP (ou `0.0.0.0/0` para desenvolvimento).
4. Em **Database → Connect → Drivers**, copie a connection string. Ela já vem com o Replica Set configurado automaticamente pelo Atlas.

### Backend

```cmd
cd backend
copy .env.example .env
npm install
npx prisma generate
npx tsx src/db/seed/seed.ts
npm run dev
```

Preencha o `.env` com os valores necessários antes de rodar `npm run dev` (veja [Variáveis de ambiente](#variáveis-de-ambiente)). Exemplo de `DATABASE_URL` usando o Atlas:

```env
DATABASE_URL="mongodb+srv://<usuario>:<senha>@cluster0.xxxxx.mongodb.net/furniro?retryWrites=true&w=majority"
```

### Frontend

Em outro terminal:

```cmd
cd frontend
copy .env.example .env
npm install
npm run dev
```

O `.env` do frontend é opcional — veja [Variáveis de ambiente](#variáveis-de-ambiente).

### Acesso

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

O Prisma com MongoDB não usa `prisma migrate`; o schema é aplicado de forma dinâmica pelo banco e o comando necessário para o cliente é `prisma generate`.

## Docker

Com Docker e Docker Compose instalados, a forma mais simples de subir a aplicação inteira (backend, frontend e banco) é:

```cmd
docker compose up -d --build
```

O Compose sobe quatro serviços:

| Serviço | Porta | Responsabilidade |
|---|---:|---|
| `mongodb` | 27017 | Banco MongoDB com Replica Set `rs0` |
| `mongo-init` | — | Inicializa o Replica Set uma única vez |
| `backend` | 3000 | API Express |
| `frontend` | 5173 | Aplicação Vite |

> **Atenção:** o Docker Compose sobe um MongoDB **local em container**, com seu próprio Replica Set, separado do MongoDB Atlas usado na execução local sem Docker (veja [Como executar localmente](#como-executar-localmente)). São dois bancos distintos: dados criados em um não aparecem no outro. Ao alternar entre rodar via Docker e rodar localmente, é necessário rodar o seed novamente no ambiente correspondente.

O `docker-compose.yml` já fornece ao backend uma `DATABASE_URL` interna (`mongodb://mongodb:27017/...`) e define a URL da API para o frontend. O backend também lê o `backend/.env` via `env_file` — garanta que ele existe e está preenchido (`JWT_SECRET`, `FRONTEND_URL`, etc.) antes de subir os containers:

```cmd
cd backend
copy .env.example .env
cd ..
```

Depois de os serviços estarem em execução, popule o catálogo:

```cmd
docker compose exec backend npx tsx src/db/seed/seed.ts
```

Os diretórios de código são montados como volumes, portanto mudanças locais são refletidas pelos servidores de desenvolvimento. Se você adicionar uma nova dependência ao `package.json` (backend ou frontend), é necessário reconstruir a imagem para que ela seja instalada dentro do container:

```cmd
docker compose up -d --build backend
```

Se, mesmo após o rebuild, a dependência não for reconhecida, force a reconstrução sem cache:

```cmd
docker compose build --no-cache backend
docker compose up -d backend
```

Acesse:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Scripts

| Projeto | Comando | Descrição |
|---|---|---|
| Backend | `npm run dev` | Inicia o Express com nodemon e tsx |
| Backend | `npm run build` | Compila TypeScript para `dist` |
| Backend | `npm start` | Executa `dist/server.js` |
| Frontend | `npm run dev` | Inicia o Vite |
| Frontend | `npm run build` | Faz a checagem TypeScript e gera o build de produção |
| Frontend | `npm run lint` | Executa o ESLint |
| Frontend | `npm run preview` | Serve o build gerado localmente |

## Autor

- Eros Franklin — https://github.com/ErosFranklin