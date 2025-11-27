# Geri+

Desenvolvido para apoiar a gestão de lares de idosos, o GERI+, oferece ferramentas para organização de serviços, comunicação interna e acompanhamento de informações relevantes. O projeto foi construído com foco em escalabilidade e integração de diferentes tecnologias modernas.

---

## Tecnologias utilizadas
- **Java (Spring Boot)** → Backend principal
- **Angular v.20.3.10** → Frontend web
- **MongoDB** → Banco de dados NoSQL
- **RabbitMQ** → Mensageria e comunicação entre serviços
- **Docker & Docker Compose** → Orquestração e execução dos containers

![Java](https://img.shields.io/badge/Java-Spring%20Boot-red?logo=springboot)
![Angular](https://img.shields.io/badge/Angular-20.3.10-darkred?logo=angular)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-Messaging-orange?logo=rabbitmq)
![Docker](https://img.shields.io/badge/Docker-Container-blue?logo=docker)
![Docker Compose](https://img.shields.io/badge/Docker-Compose-lightblue?logo=docker)


## Estrutura do projeto
- `laridosos_service` → Serviço backend principal (Spring Boot)
- `notification_service` → Serviço de notificações
- `frontend-angular` → Interface web em Angular
- `mongo_db` → Banco de dados MongoDB
- `rabbitmq_server` → Servidor RabbitMQ com painel de administração

## Como executar o projeto em Docker
**1. Baixe e instale o Docker Desktop (Windows/Mac) ou o Docker Engine (Linux) e verifique se está funcionando com:**
```bash
   docker --version
   docker ps
```
**2. Clone este repositório:**
```bash
   git clone https://github.com/JaineRosa/LarIdosos.git
   cd LarIdosos
```
**3. Suba os containers com Docker Compose:**
```bash
   docker-compose up
```
**3. Acesse os serviços:**

- Frontend Angular → http://localhost

- Backend Spring Boot → http://localhost:8080

- Notification Service → http://localhost:8090

- RabbitMQ Dashboard → http://localhost:15672

- Mongo_DB → http://localhost:27017

## Principais endpoints da API

### Autenticação
**Base URL:** `/api/auth`

- `POST /login` → Login de usuário
- `POST /familiar` → Login de familiar

### Medicamentos
**Base URL:** `/api/medicamentos`

- `POST /` → Criar medicamento
- `GET /` → Listar todos
- `GET /{id}` → Buscar por ID
- `PUT /{id}` → Editar medicamento
- `DELETE /{id}` → Deletar medicamento

### Prescrição
**Base URL:** `/api/prescricao`

- `POST /salvar` → Salvar prescrição
- `GET /{id}` → Buscar por ID
- `GET /idoso/{idosoId}` → Buscar por idoso
- `PUT /{id}` → Editar prescrição

### Saúde Diária
**Base URL:** `/api/saudediaria`

- `POST /` → Criar registro
- `GET /` → Listar todos
- `GET /idoso/{idosoId}` → Listar por idoso
- `GET /cuidador/{cuidadorId}` → Listar por cuidador
- `GET /{id}` → Buscar por ID
- `PUT /{id}` → Atualizar registro
- `DELETE /{id}` → Deletar registro

### Usuário
**Base URL:** `/api/usuarios`

- `POST /` → Criar usuário
- `GET /` → Listar todos
- `GET /{id}` → Buscar por ID
- `GET /email/{email}` → Buscar por email
- `GET /nome/{nome}` → Buscar por nome
- `GET /tipo/{tipo}` → Buscar por tipo de usuário
- `PUT /{id}` → Atualizar usuário
- `PUT /{id}/senha` → Atualizar senha
- `DELETE /{id}` → Deletar usuário

### Visita
**Base URL:** `/api/visitas`

- `POST /` → Agendar visita
- `GET /` → Listar todas
- `GET /{id}` → Buscar por ID
- `GET /idoso/{idosoId}` → Listar por idoso
- `GET /cuidador/{cuidadorId}` → Listar por cuidador
- `GET /medico/{medicoId}` → Listar por médico
- `PUT /{id}` → Atualizar visita

## Exemplo de requisição

```http
POST /api/medicamentos
Content-Type: application/json

{
  "nome": "Dipirona",
  "dosagem": "500mg",
  "frequencia": "8h"
}

```

## Mensageria (RabbitMQ)
### Estrutura de Mensageria
**Exchange:** larIdosos.exchange

**Filas principais e Fluxo:**

- Saúde Diária: health.alert.queue → recebe alertas críticos de saúde
```
Cadastra registro → Verifica limites → Gera alerta → Envia RabbitMQ → Consumer processa
```
- Usuário: email.welcome.queue → recebe notificações para envio de e-mail de boas-vindas
```
Cria usuário → Monta DTO → Envia RabbitMQ → Consumer envia e-mail
```
- Resumo diário Idoso: email.summary.queue → recebe resumo saúde diária, visitas e recomendações do dia para envio de e-mail ao responsável
```
Gera resumo diário (Scheduler às 19h)→ Coleta dados do idoso (saúde, visitas, recomendações)→ Monta corpo do e-mail (texto do resumo)→ Cria EmailNotificationDTO→ Cria EmailNotificationDTO → Envia para RabbitMQ (Exchange → Routing Key → Fila)→ Consumer do notification_service recebe a mensagem→ Consumer envia o e-mail ao responsável
```
- Visitas Agendamento: notify.visit.queue → envia notificação de nova visita
```
Agenda visita → Valida dados → Salva no banco → Monta DTO → Envia RabbitMQ → Consumer envia notificação
```
- Visitas Mudança de Status(INICIADA, CONCLUÍDA, CANCELADA): notify.visit.queue → envia notificação sobre mudança de status da visita
```
Atualiza status → Identifica tipo de notificação → Monta DTO → Envia RabbitMQ → Consumer envia notificação
```
## Video de Marketing Geri+
📺 [Assista no YouTube](https://www.youtube.com/watch?v=e9snkxQH6fI)

## Video funcionamento projeto
📺 [Assista no YouTube](https://www.youtube.com/projeto-geri+)

## Projeto Final FullStack-DEVS2BLU 2025
**Autoria**
- Projeto desenvolvido por [![GitHub - Jaine Rosa](https://img.shields.io/badge/-Jaine%20Rosa-black?logo=github&style=flat)](https://github.com/JaineRosa)
- Projeto desenvolvido por [![GitHub - Ruthe Cecilia](https://img.shields.io/badge/-Ruthe%20Cecilia-black?logo=github&style=flat)](https://github.com/Cecilia0292)





