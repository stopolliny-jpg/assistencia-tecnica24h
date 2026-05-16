# Assistência Apple 24H - Sistema Completo

Este é o sistema completo (Backend e Admin Panel) para gerenciamento de assistência técnica de iPhones, incluindo agendamentos, orçamentos, disponibilidade e integração com Google Calendar.

## Tecnologias Usadas
*   **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose), JWT, Zod, Nodemon, tsx.
*   **Admin Panel**: React, TypeScript, Vite, Tailwind CSS, React Router, Axios, Lucide React.
*   **Integração**: Google Calendar API.

## Estrutura do Projeto
*   `/` (Raiz) - O site público em React (Vite). Roda em `http://localhost:5173`.
*   `/backend` - A API RESTful conectada ao MongoDB. Roda em `http://localhost:3001`.
*   `/admin` - O painel de administração Frontend (React). Roda em `http://localhost:5174`.

---

## Passo 1: Pré-requisitos
Certifique-se de ter instalado em sua máquina:
1.  **Node.js** (versão 18 ou superior) -> [Baixar Node.js](https://nodejs.org/)
2.  **MongoDB** rodando localmente na porta 27017, ou uma string de conexão do **MongoDB Atlas**.

---

## Passo 2: Configurar e Rodar o Backend

1. Abra o terminal e entre na pasta `backend`:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie o arquivo `.env` baseado no `.env.example`:
   Copie o conteúdo de `backend/.env.example` para um novo arquivo chamado `backend/.env`.
   Se estiver usando um MongoDB Atlas, altere a variável `MONGODB_URI`.
4. Inicie o servidor:
   ```bash
   npm run dev
   ```
   *O backend rodará na porta 3001.*

---

## Passo 3: Configurar e Rodar o Painel Admin

1. Abra um novo terminal e entre na pasta `admin`:
   ```bash
   cd admin
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o painel:
   ```bash
   npm run dev
   ```
   *O painel abrirá em `http://localhost:5174` (ou outra porta indicada pelo Vite).*

---

## Passo 4: Criar o Primeiro Administrador

Como o banco de dados está vazio, você precisa criar o primeiro usuário Admin manualmente via API.

Você pode usar o **Postman** ou **Insomnia**, ou rodar o comando abaixo no terminal (PowerShell ou Bash):

```bash
curl -X POST http://localhost:3001/api/admin/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Dono da Assistencia", "email":"admin@email.com", "password":"senha_super_segura_123"}'
```

Após executar isso com sucesso, o usuário estará criado. Você já pode acessar `http://localhost:5174/login` e usar as credenciais:
*   **Email:** `admin@email.com`
*   **Senha:** `senha_super_segura_123`

*(Nota: a rota de register só funciona 1 vez. Se já houver um admin no banco, ela será bloqueada por segurança).*

---

## Passo 5: Configurar Google Calendar API (Google Cloud Console)

Para permitir a integração com o Google Calendar, você precisa criar credenciais no Google Cloud:

1. Acesse [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um novo projeto.
3. Vá em "APIs e Serviços" -> "Biblioteca" e ative a **Google Calendar API**.
4. Vá em "Tela de permissão OAuth" e configure como "Externo". (Adicione o seu email como usuário de teste se o app não for publicado).
5. Vá em "Credenciais" -> "Criar Credenciais" -> "ID do cliente OAuth".
6. Tipo de aplicativo: **Aplicativo da Web**.
7. Em **Origens JavaScript autorizadas**, adicione: `http://localhost:3001` e `http://localhost:5174`.
8. Em **URIs de redirecionamento autorizados**, adicione EXATAMENTE: `http://localhost:3001/api/admin/google/callback`.
9. Clique em Salvar. Você receberá o **ID do Cliente** e a **Chave Secreta (Client Secret)**.
10. Coloque esses dados no arquivo `backend/.env`:
    ```env
    GOOGLE_CLIENT_ID=seu_client_id_aqui
    GOOGLE_CLIENT_SECRET=seu_client_secret_aqui
    ```
11. Reinicie o backend.

### Conectando a Agenda pelo Painel
1. Faça login no Painel Admin.
2. No menu lateral, vá em "Google Agenda".
3. Clique em **Conectar Google Agenda**.
4. Faça login com sua conta do Google e aceite as permissões.
5. Selecione o calendário que você deseja usar como destino dos eventos.

---

## Passo 6: Como o Sistema Funciona (Uso Diário)

### Abrir Horários (Painel)
1. Vá na aba **Disponibilidade**.
2. Selecione a data, hora inicial, hora final e duração de cada atendimento (ex: 30 minutos).
3. Clique em "Gerar Horários". O sistema criará os slots disponíveis (ex: 09:00, 09:30, 10:00).

### Como o Cliente Agenda (Site Público - Endpoint `POST /api/public/quote-with-booking`)
Quando você construir o Front-End do site público, ele consumirá a API da seguinte forma:
1. O site busca horários de um dia específico usando `GET /api/public/availability?date=2026-05-20`.
2. O usuário escolhe um horário (Slot ID) e preenche o formulário.
3. O site faz um `POST /api/public/quote-with-booking` enviando os dados e o `slotId`.
4. O backend **automaticamente e de forma atômica** (para evitar reservas duplicadas):
   * Trava o horário (isBooked = true).
   * Cria o Orçamento.
   * Cria o Agendamento.
   * Envia o evento para a conta do Google Calendar conectada (se configurada).
   * Retorna a URL do WhatsApp pronta para o frontend redirecionar o cliente.

### Exemplo de Payload para o Site Público:
```json
{
  "slotId": "ID_DO_SLOT_RECEBIDO_NO_GET",
  "fullName": "Arthur Rodrigues",
  "whatsapp": "11999999999",
  "deviceModel": "iPhone 11",
  "problemType": "Tela quebrada",
  "description": "Caiu e quebrou tudo.",
  "source": "site-oficial"
}
```

---

## Observações de Segurança para Produção
*   Altere `JWT_SECRET` e `TOKEN_ENCRYPTION_SECRET` no arquivo `.env` para strings grandes e complexas antes de colocar o servidor online.
*   Altere a `MONGODB_URI` para o seu cluster de produção (Atlas).
*   Altere `FRONTEND_URL` e `ADMIN_URL` no `.env` para os seus domínios reais (ex: `https://assistenciaapple24h.com.br`). Isso protegerá a API contra acesso de origens não autorizadas (CORS).
*   Se for publicar no Google Cloud (OAuth), lembre-se de atualizar os "URIs de redirecionamento" para o seu domínio real de backend.
