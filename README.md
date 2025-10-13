Sure! Here's a **professional, clean, and fully detailed README in English** for your project in Markdown format:

---

# 📝 Todo Microservices App

A **NestJS-based Todo Application** built with a microservices architecture, focusing on **security**, **scalability**, and **best programming practices**.

---

## 🚀 Services & Modules

| Service                  | Responsibility                                                   | Default Port |
| ------------------------ | ---------------------------------------------------------------- | ------------ |
| **User Service**         | User management, registration, login, authentication             | 3000         |
| **Todo Service**         | Todo CRUD operations with filtering & pagination                 | 3001         |
| **Notification Service** | Sending notifications (Email, SMS, Push)                         | 3002         |
| **Gateway**              | Manages incoming API requests and communication between services | 3003         |

---

## 🛠 Prerequisites

* Node.js >= 20
* NestJS CLI
* Docker & Docker Compose
* PostgreSQL (Containerized)
* RabbitMQ (Containerized)

---

## ⚡ Key Features

* **Microservices Architecture**: Services are independent and async.
* **Security First**: All data is strongly typed and validated.
* **Centralized Exception Handling**: Global exception filter handles all errors.
* **Professional Logging**: Environment-based logging (Dev/Prod).
* **Postman Collection**: Ready for testing all APIs.
* **Swagger Documentation**: Auto-generated for every service.

---

## 📂 Project Structure

```
/todo-app
├── docker-compose.yml        # Databases + RabbitMQ
├── README.md                 # Project documentation
├── user-service
│   ├── src
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── user/
│   │   ├── auth/
│   │   └── common/
│   └── ormconfig.ts
├── todo-service
│   ├── src
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── todo/
│   │   └── common/
│   └── ormconfig.ts
├── notification-service
│   ├── src
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── notification/
│   │   └── common/
└── gateway
    ├── src
    │   ├── main.ts
    │   ├── app.module.ts
    │   ├── gateway.controller.ts
    │   └── gateway.service.ts
```

---

## 🐳 Running the Project with Docker

1. Clone the repository:

```bash
git clone <repo-url>
cd todo-app
```

2. Start Docker containers:

```bash
docker-compose up -d
```

* PostgreSQL: port `5432`
* RabbitMQ: ports `5672` and management `15672`

3. Create `.env` files for each service (based on `.env.example`):

```env
# Example for todo-service
DB_HOST=localhost
DB_PORT=5432
DB_USER=nestuser
DB_PASSWORD=nestpassword
DB_NAME=todo_app
```

4. Install dependencies and run each service:

```bash
cd todo-service
npm install
npm run start:dev
```

---

## 📄 Swagger API Documentation

Access Swagger for each service:

```
http://localhost:<PORT>/api/docs
```

Example:

```
http://localhost:3001/api/docs
```

---

## 🔗 Service Communication

* **Todo Service → Notification Service**: Sends a message to RabbitMQ whenever a todo is created or updated.
* **Gateway → All Services**: Handles request routing, JWT verification, and standard responses.

---

## 📬 Notification Service

* Sends notifications via **Email, SMS, or Push**.
* Fully asynchronous using RabbitMQ.
* Easily extendable for future messaging features.

---

## 🔐 Security & Standards

* **DTOs & Interfaces** for strict typing (no `any`).
* **Global ValidationPipe** ensures input validation.
* **AllExceptionsFilter** for centralized error handling.
* Environment-based logging (Dev/Prod).
* Secure and standardized data transfer between services.

---

## 🧪 Testing & Development

* Postman collection included for easy testing.
* All APIs documented with Swagger.
* Microservices designed to be async and scalable.

---

## 🌟 Professional Highlights

* Ready to **scale** with microservices architecture.
* API Gateway handles all external requests and routing.
* Modular project structure for easy extension and maintenance.
* Exception handling and logging implemented using best practices.

---

If you want, I can also create a **complete Postman Collection** for **all endpoints (User, Todo, Notification, Gateway)** so you can test the full microservices setup immediately.

Do you want me to do that next?
