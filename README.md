# 🧱 Clean Architecture + PostgreSQL Integration (with Docker)

In this module, I have learned **Clean Code Architecture** and how to integrate **PostgreSQL** using **Docker**.

---

## 🚀 What I Learned
- Clean Code Architecture (Layered structure: Routes → middleware → controller  → Use Cases → Database)
- PostgreSQL integration in a Node.js service
- Docker & Docker Compose setup for:
  - Node.js backend
  - PostgreSQL database
  - pgAdmin GUI
- Using environment variables for configuration
- Running cron jobs in Node.js

---

## 🏗 Tech Stack
- **Node.js** (Express)
- **PostgreSQL**
- **Docker / Docker Compose**
- **pgAdmin**
- **Pino** logger

---

## 📦 How to Run

```bash
docker-compose up --build
```

## How to Access Api

```bash
0.0.0.0:5000/v1/user-service/health-check/
```
```bash
0.0.0.0:5000/v1/user-service/login/
```
```bash
0.0.0.0:5000/v1/user-service/permission/module
```
```
bash
0.0.0.0:5000/v1/user-service/user-permission
```
