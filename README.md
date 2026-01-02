# Bytus

Enterprise cryptocurrency payment infrastructure enabling businesses to accept crypto payments and manage digital asset treasuries.

## Structure

- `backend/` - Rust API (Axum + PostgreSQL + SQLx)
- `frontend/` - React 19 + TypeScript dashboard
- `contracts/` - Smart contracts (Base L2)

## Backend
```bash
cd backend
cargo run
```

API: http://localhost:8000

## Frontend
```bash
cd frontend
npm install
npm run dev
```

Dashboard: http://localhost:5000

## Status

- ✅ Backend: Authentication + Protected endpoints (JWT)
- ✅ Frontend: Complete dashboard UI
- ⏳ Contracts: Pending