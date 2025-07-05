# 🔐 NestJS RBAC with NATS Microservices

This project demonstrates how to implement **Role-Based Access Control (RBAC)** in a **NestJS microservices architecture** using **NATS** for inter-service communication.

We create a modular system with two primary roles: `admin` and `user`. Admins have full system access, while users have limited, read-only access — all securely enforced using guards, decorators, and access policies.

---

## 📌 Why NATS?

- ✅ Fits microservice architecture naturally  
- ⚡ Lightweight, flexible, and high-performance  
- 🔁 Enables load balancing and service discovery  
- 📊 Based on benchmarking, **NATS is significantly faster than HTTP** for serial request execution

---

## 🛡️ Why RBAC?

**Role-based access control (RBAC)** is a security model used to restrict access to resources based on user roles and permissions.

> With RBAC, you define roles (like `admin`, `user`) and control which actions each role is allowed to perform — improving system security, organization, and scalability.

---

## 🚀 Technologies Used

- [NestJS](https://nestjs.com/) — Scalable Node.js framework  
- [NATS](https://nats.io/) — Lightweight messaging system  
- [`nest-access-control`](https://www.npmjs.com/package/nest-access-control) — Role and permission handling  


---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nest-rbac-nats.git
cd nest-rbac-nats
```
### 2. Install dependencies
```bash
npm install
```

### 3. Run the project
```bash
pnpm start:dev
```

## ✅ Flow Summary
- Login → receive JWT

- Send request to protected route

- Gateway or service validates role

- The request is sent via NATS to the appropriate service

- Data is returned to the client

  ## WANT TO DIVE MORE? CHECKOUT [MY BLOG](https://swastij.com/blog/nest-rbac-nats)

## 📜 License
MIT

🌐 Developed by - 
🔗 [Swasti Jain](https://swastij.com) 
