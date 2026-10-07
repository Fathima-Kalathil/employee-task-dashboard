# TaskHub - Employee Task Management Dashboard

Internal admin dashboard to manage employees and their tasks.

**Stack:** React (Vite) + Tailwind CSS | Node.js + Express | MongoDB (Mongoose) | JWT auth

## Features
- Admin login (JWT)
- Add / edit / delete employees, search the list
- Create, edit, delete tasks and assign them to employees
- Task fields: title, description, assignee, priority, due date, status
- Change status inline; filter by employee and status (Pending / In Progress / Completed)
- Dashboard summary: total employees and task counts
- Responsive layout (sidebar collapses on mobile)

## Run locally
Requires Node 18+ and a MongoDB database (local or MongoDB Atlas).

```bash
# 1. Backend
cd server
cp .env.example .env     # fill in MONGO_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run dev              # http://localhost:5000

# 2. Frontend (new terminal)
cd client
cp .env.example .env
npm install
npm run dev              # http://localhost:5173
```
Log in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `server/.env`.

## API
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/login | Admin login, returns JWT |
| GET/POST | /api/employees | List / create employees |
| PUT/DELETE | /api/employees/:id | Update / delete (tasks become unassigned) |
| GET/POST | /api/tasks | List (`?status=&employee=`) / create |
| PUT/DELETE | /api/tasks/:id | Update / delete |
| PATCH | /api/tasks/:id/status | Change status |
| GET | /api/stats | Dashboard counts |

All endpoints except login require `Authorization: Bearer <token>`.

## Deploy (Vercel)
Create two Vercel projects from this repo:
1. **Backend** - Root Directory `server`. Env vars: `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLIENT_URL` (frontend URL).
2. **Frontend** - Root Directory `client`. Env var: `VITE_API_URL` = `https://<backend-url>/api`.

In MongoDB Atlas, allow network access from `0.0.0.0/0`.
