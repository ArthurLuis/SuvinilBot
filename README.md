<img src="https://forest-brownie-850.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F1aab4067-799e-4213-8327-6de6cca0ea2b%2F96478a8a-9482-4fe2-b0b2-edc432f1d628%2FCapa_notion_design__4.png?table=block&id=280e6690-8855-4406-b46f-ff8f7541e8b3&spaceId=1aab4067-799e-4213-8327-6de6cca0ea2b&width=1940&userId=&cache=v2" alt="Banner da loomi" width="100%"/>

# Catálogo Inteligente de Tintas Suvinil 🚀

Bem-vindo ao **Catálogo Inteligente de Tintas Suvinil**, uma API REST capaz de:
- Recomendar tintas ideais ao usuário via chat interativo
- Enriquecer respostas com RAG (Retrieval-Augmented Generation)
- Gerar simulações visuais de aplicação de tinta via OpenAI Image API

---

## 📚 Sumário

1. [Tecnologias](#-tecnologias)  
2. [Arquitetura](#-arquitetura)  
3. [Módulos Principais](#-módulos-principais)  
4. [Pré-requisitos](#-pré-requisitos)  
5. [Configuração do Projeto](#-configuração-do-projeto)  
6. [Variáveis de Ambiente](#-variáveis-de-ambiente)  
7. [Orquestração com Docker Compose](#-orquestração-com-docker-compose)  
8. [Executando a Aplicação](#-executando-a-aplicação)  
9. [Documentação Swagger / OpenAPI](#-documentação-swagger--openapi)  
10. [Endpoints de Demonstração](#-endpoints-de-demostração)  
11. [Testagem](#-testagem)  
12. [Dicas de Uso](#-dicas-de-uso)  
13. [Estrutura de Pastas](#-estrutura-de-pastas)  
14. [Próximos Passos](#-próximos-passos)  
15. [Autor](#-autor)  

---

## 🛠️ Tecnologias

- **Backend**: NestJS (modular, DI, Clean Architecture)  
- **Linguagem**: TypeScript  
- **Banco de Dados**: PostgreSQL + pgvector  
- **ORM**: Prisma (com extensão postgresqlExtensions)  
- **Infraestrutura**: Docker Compose  
- **IA / LLM**: OpenAI GPT-4 Turbo & GPT-3.5-Turbo  
- **Embeddings**: text-embedding-3-small (1536 dims)  
- **Vector Search**: SQL RAW com `<->` e índice ivfflat  
- **LangChain**: orchestration de prompts via LCEL  

<div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
  <img src="https://www.datocms-assets.com/48401/1628645197-learn-typescript.png" alt="TypeScript Logo" width="80"/>
  <img src="https://nestjs.com/img/logo_text.svg" alt="NestJS Logo" width="90"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" alt="PostgreSQL Logo" width="70"/>
  <img src="https://cdn.worldvectorlogo.com/logos/prisma-2.svg" alt="Prisma Logo" width="90"/>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJl4fp0SkQbTPU5ZxVl6AKWYuKCwM0gIhNtQ&s" alt="Docker Compose Logo" width="60"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png" alt="GPT-4 Turbo Logo" width="60"/>
  <img src="https://images.seeklogo.com/logo-png/61/2/langchain-logo-png_seeklogo-611654.png" alt="LangChain Logo" width="60"/>
</div>

---

## 🏗️ Arquitetura

1. **TintasModule** – CRUD de tintas com atributos (nome, cor, acabamento, features, linha…)  
2. **EmbeddingModule** – Geração e busca de embeddings (UsageAgent usa SQL RAW)  
3. **AgentsModule** – Agentes especializados:
   - **IntentAgent**: classifica intenção (environment, resistance, visualization)  
   - **EnvironmentAgent**: sugere propriedades por ambiente  
   - **ResistanceAgent**: detalha requisitos técnicos (UV, anti-mofo…)  
   - **UsageAgent**: busca vetorial e sumarização  
   - **VisualizationAgent**: gera prompt + imagens via DALL·E  
4. **OrchestratorModule** – Orquestra agentes e compõe contexto  
5. **ChatModule** – Endpoint `/chat` com histórico e sessionId  
6. **OpenaiModule** – Acesso genérico à API OpenAI  

Fluxo de `/chat`:  
- Cliente envia `{ question, sessionId? }`  
- IntentAgent decide agentes  
- Orchestrator chama Usage + Environment/Resistance  
- VisualizationAgent gera imagem se solicitado  
- ChatService retorna `{ reply, sessionId, imageUrls? }`

---

## 📦 Módulos Principais

- **/tintas**  
  - `POST /tintas` – Cria nova tinta  
  - `GET /tintas` – Lista tintas  
  - `GET /tintas/:id` – Detalha tinta  
  - `PATCH /tintas/:id` – Atualiza tinta  
  - `DELETE /tintas/:id` – Remove tinta  
- **/embeddings**  
  - `POST /embeddings/generate-all`  
  - `POST /embeddings/:id`  
  - `GET  /embeddings/search?q=texto&k=5`  
- **/chat**  
  - `POST /chat` – Chat interativo com IA  
- **/openai**  
  - `POST /openai` – Endpoint genérico OpenAI  

---

## 🖥️ Pré-requisitos

- Node.js ≥ 16  
- Docker & Docker Compose  
- Git  

---

## ⚙️ Configuração do Projeto

1. Clone o repositório:  
    - git clone https://github.com/seu-usuario/catalogo-inteligente-suvinil.git  
    - cd catalogo-inteligente-suvinil  
2. Instale as dependências:  
    - npm install  
    - ou yarn install  

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz com:

    DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/dbname
    OPENAI_API_KEY=sk-YOUR_KEY
    PORT=3001

---

## 🐳 Orquestração com Docker Compose

- Levanta containers de Postgres (+ pgvector) e API NestJS  
- Arquivo: `docker-compose.yml`

    version: '3.8'
    services:
      db:
        image: postgres:15
        environment:
          POSTGRES_USER: user
          POSTGRES_PASSWORD: pass
          POSTGRES_DB: catalogo
        volumes:
          - db-data:/var/lib/postgresql/data
      api:
        build: .
        env_file: .env
        ports:
          - "${PORT}:3001"
        depends_on:
          - db
    volumes:
      db-data:

---

## ▶️ Executando a Aplicação

- Com Docker Compose:  
    docker-compose up --build  
- Localmente (sem Docker):  
    npm run start:dev  

A API estará disponível em `http://localhost:3001`.

---

## 📖 Documentação Swagger / OpenAPI

- Acesse: `http://localhost:3001/api`  
- Explore todos os endpoints, modelos de request/response e exemplos interativos.

---

## ⚡ Endpoints de Demonstração

1. **Teste Chat**  
    Envie `{ "question": "Qual tinta para área externa?" }` em `POST /chat`.  
2. **Geração de Embeddings**  
    - `POST /embeddings/generate-all`  
    - `POST /embeddings/1`  
3. **Busca Vetorial**  
    - `GET /embeddings/search?q=externo&k=3`  
4. **CRUD de Tintas**  
    - `POST /tintas` com JSON de `CreateTintaDto`  
    - `GET /tintas`  
    - ...  

---

## 🧪 Testagem

1. **Quarto fácil de limpar e sem cheiro forte**  
   Requisição:  
   POST /chat  
   Content-Type: application/json  

   {  
     "question": "Quero pintar meu quarto, mas prefiro algo que seja fácil de limpar e sem cheiro forte. Tem alguma sugestão?"  
   }  
  
![Uploading Captura de tela 2025-05-03 032336.png…]()

2. **Fachada exposta ao sol e chuva**  
   Requisição:  
   POST /chat  
   Content-Type: application/json  

   {  
     "question": "Preciso pintar a fachada da minha casa. Bate muito sol e chove bastante por aqui. Qual tinta você recomenda?"  
   }  
 
![Captura de tela 2025-05-03 032531](https://github.com/user-attachments/assets/feb5dcc7-fea7-40b7-a405-c73d6e1f608e)

3. **Tinta para madeira resistente ao calor**  
   Requisição:  
   POST /chat  
   Content-Type: application/json  

   {  
     "question": "Você tem alguma tinta para madeira que seja resistente ao calor?"  
   }  
  ![Captura de tela 2025-05-03 032707](https://github.com/user-attachments/assets/3b35f21e-ae1e-4476-aaec-b4fd6d072283)


4. **Simulação de cinza moderno no escritório**  
   Requisição:  
   POST /chat  
   Content-Type: application/json  

   {  
     "question": "Quero pintar meu escritório com um tom de cinza moderno. Mostra como ficaria?"  
   }  
   _🖼️ Print da resposta e da imagem de mockup._

## 💡 Dicas de Uso

- Gere os embeddings antes de testar  
  Use o botão flutuante no canto inferior direito do frontend para rodar POST /embeddings/generate-all.

- Fluxo de orquestração  
  Quanto mais agentes forem acionados, maior o tempo de resposta. Comece com perguntas mais diretas e depois aumente a complexidade.

- Sessão e contexto  
  O frontend mantém o mesmo sessionId. Para reiniciar o chat sem contexto antigo, recarregue a página ou clique no ícone da Suvinil.

- Consistência do DALL·E  
  Os resultados podem variar conforme o tipo de tinta. Se a imagem sair estranha, tente reformular o prompt ou reenviar a requisição.

- Swagger para testes diretos  
  Você também pode testar todos os endpoints em http://localhost:3001/api sem precisar do frontend.

- Monitore os logs do backend  
  Observe os logs para ver como a orquestração dos agentes acontece em tempo real. Exemplo:  
  `[Nest] 22212 - DEBUG [IntentService] Classificando intenção: "[…]"`  
  `[Nest] 22212 - LOG [IntentService] Agentes selecionados: environment, resistance`  
  `[Nest] 22212 - DEBUG [OrchestratorService] Buscando tintas similares…]`  

## 🗂️ Estrutura de Pastas

    src/
    ├─ app.module.ts
    ├─ main.ts
    ├─ agents/
    ├─ embedding/
    ├─ prompts/
    ├─ tintas/
    ├─ chat/
    ├─ openai/
    ├─ orchestrator/
    └─ prisma/
      └─ schema.prisma

---

## 🚀 Próximos Passos

- Adicionar mais agentes
- Testes unitarios
- Cadastro de usuario e gestão de conversas

---


## 🙋 Autor

Codado com ❤️ por **Arthur Luis**  
Desenvolvedor de software | entusiasta de IA e arquitetura limpa  
