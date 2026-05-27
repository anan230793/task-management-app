# Task Management App

A production-ready MERN task management application with JWT authentication, full task CRUD, filtering, and search.

## Features

- User registration, login, and logout with secure httpOnly cookies
- Protected dashboard with task CRUD operations
- Task status management (Pending / Completed)
- Search, filter, and task lists
- Optimistic UI updates with rollback on failure
- Responsive, accessible UI with green brand identity

## Tech Stack

| Layer    | Technologies                                                                                        |
| -------- | --------------------------------------------------------------------------------------------------- |
| Frontend | React 18, Vite, TypeScript, Tailwind CSS, TanStack Query, Axios, React Router, React Hook Form, Zod |
| Backend  | Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, Zod                                           |
| Auth     | JWT stored in httpOnly cookies (`sameSite: lax`, `secure` in production)                            |

## Folder Structure

```
task-management-app/
├── client/          # React frontend
│   └── src/
│       ├── api/     # Axios API clients
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       └── types/
└── server/          # Express API
    └── src/
        ├── controllers/
        ├── middleware/
        ├── models/
        ├── routes/
        └── services/
```

## Setup

### Prerequisites

- Node.js 18+
- MongoDB running locally or a cloud URI

### Environment Variables

**Server** (`server/.env`):

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/task-management-db
JWT_SECRET=your_secret_key_at_least_32_characters_long
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

**Client** (`client/.env`):

```env
VITE_API_URL=http://localhost:5000/api
```

### Install & Run

```bash
# Install dependencies
cd server && npm install
cd ../client && npm install

# Terminal 1 — API
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:5000/api
