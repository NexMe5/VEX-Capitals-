# VEX — Vision & Action Website

A full-stack website built with React + TypeScript + Vite (frontend) and Node.js + Express + JWT (backend).

---

## 🗂 Project Structure

```
vex-website/
├── frontend/          # React + Vite + Tailwind + TypeScript
└── backend/           # Node.js + Express + JWT Auth
```

---

## 🚀 Quick Start

### 1. Start the Backend

```bash
cd backend
npm install
npm start
# Server runs on http://localhost:3001
```

### 2. Start the Frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## 🔑 Test Credentials

| Role  | Email             | Password     |
|-------|-------------------|--------------|
| Admin | admin@vex.com     | password123  |
| User  | test@vex.com      | test1234     |

---

## 📄 Pages

| Route        | Description                            | Auth Required |
|-------------|----------------------------------------|---------------|
| `/`          | Home — Hero section with video bg      | No            |
| `/story`     | Company story and timeline             | No            |
| `/investing` | Investment thesis and portfolio        | No            |
| `/building`  | Venture studio and active ventures     | No            |
| `/advisory`  | Advisory services and case studies     | No            |
| `/login`     | Sign in / Register                     | No            |
| `/dashboard` | Portfolio dashboard with live data     | ✅ Yes        |

---

## 🔐 Auth API

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| POST   | `/api/auth/login`   | Login, returns JWT   |
| POST   | `/api/auth/register`| Register new user    |
| GET    | `/api/auth/me`      | Get current user     |
| GET    | `/api/dashboard/stats` | Dashboard stats   |
| GET    | `/api/dashboard/portfolio` | Portfolio list |

Protected routes require `Authorization: Bearer <token>` header.

---

## ⚙️ Environment Variables (backend/.env)

```env
PORT=3001
JWT_SECRET=vex_super_secret_jwt_key_2024_do_not_expose
JWT_EXPIRES_IN=7d
```

> ⚠️ Change `JWT_SECRET` before going to production.

---

## 🏗 Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router v6
- Google Fonts (Inter)

**Backend**
- Node.js + Express
- jsonwebtoken (JWT)
- bcryptjs
- cors + dotenv

---

## 🎨 Design System

- **Font:** Inter (300, 400, 500, 600)
- **Colors:** Black bg, white text, gray-300/400/500 secondary
- **Effect:** Liquid Glass (backdrop-filter blur + gradient border)
- **Animation:** Character-by-character heading + FadeIn stagger
