# AI Agent Instructions for CertPrepare

## Project Overview

**CertPrepare** is a full-stack professional certification exam preparation platform built with:
- **Backend**: Node.js + Express.js + TypeScript + Prisma ORM
- **Frontend**: React 18 + Vite + Tailwind CSS + Zustand
- **Database**: PostgreSQL (13 tables, SQLite for local dev)
- **Authentication**: JWT with access/refresh tokens + bcryptjs

**Architecture**: REST API with React SPA consuming it via Axios. Express middleware handles auth, logging, and error responses.

---

## Essential Setup & Workflows

### Starting Development
```bash
# Option 1: Docker Compose (recommended)
docker-compose up -d
docker-compose exec backend npm run db:push

# Option 2: Local with npm
cd backend && npm install && npm run db:push && npm run dev
# Terminal 2: cd frontend && npm install && npm run dev
```

Access: Frontend (3000), Backend (3001), API docs (3001/api-docs)

### Common Commands
- **DB migrations**: `npm run db:push` (backend)
- **Database IDE**: `npm run db:studio` (Prisma Studio at localhost:5555)
- **Testing**: `npm test` (backend Jest), frontend uses Vitest
- **Type checking**: `tsc --noEmit` (both)
- **Linting**: `eslint src --ext .ts,.tsx`

---

## Critical Architecture Patterns

### Request/Response Flow
1. **Frontend** (React): Form → `api.ts` Axios instance with JWT interceptor
2. **Interceptor**: Auto-adds `Authorization: Bearer {token}` header; handles 401 refresh
3. **Backend**: `authMiddleware` extracts & validates JWT, attaches user to `req` object
4. **Response**: Controllers use `successResponse()` / `errorResponse()` utilities for consistent JSON
5. **State**: Frontend stores tokens + user in Zustand `authStore` (persisted to localStorage)

**Example flow**: Register → `POST /api/auth/register` → Create user + hash password → Return `{access_token, refresh_token, user}`

### Database & Relationships
- **User** is root: has 1→M relations to UserAttempt, UserProgress, StudyNote, Flashcard, etc.
- **Certification** → Topics → Questions → Answers (hierarchy)
- Use Prisma relations for eager/lazy loading; define in schema via `@relation` directives
- All models have `created_at`/`updated_at` timestamps
- See [backend/prisma/schema.prisma](../backend/prisma/schema.prisma) for full schema

### Authentication & Authorization
- **Access token** (7d): Short-lived, includes `{userId, email, role}` payload
- **Refresh token** (30d): Long-lived, used to get new access token when expired
- **Role-based**: `requireRole(...roles)` middleware enforces permissions; supports multiple roles
- Auth is required for all protected endpoints (attach middleware to route)
- Tokens from env vars: `JWT_SECRET`, `JWT_REFRESH_SECRET`

---

## Code Conventions & Patterns

### Backend (Node.js + Express)
- **Controllers**: Pure business logic; validate input with Zod schemas before processing
- **Validation pattern**: `const validated = mySchema.parse(req.body)` → catch `z.ZodError` for 400 responses
- **Error handling**: Zod errors → `errorResponse(res, 'message', 400, errors)`; unexpected errors → 500
- **Database**: `new PrismaClient()` singleton per file; use async/await
- **Response format**: Always use `successResponse<T>(res, data, message, statusCode)` for success
- **Middleware**: Auth checks first, then validation, then business logic
- **File naming**: camelCase for files/functions, PascalCase for classes/types

### Frontend (React + TypeScript)
- **Functional components** with hooks; prefer `React.FC` for typing
- **State**: Zustand stores for global (auth), React hooks for local
- **API calls**: Use `api.ts` (Axios instance) — never direct fetch
- **Form validation**: React Hook Form + Zod schemas (same as backend for consistency)
- **Navigation**: React Router; protected routes via `{isAuthenticated}` check in layout
- **Styling**: Tailwind classes; use `clsx` for conditional styling
- **Types**: Define in `src/types/` or colocate with component

### Shared Conventions
- **TypeScript**: Strict mode enabled; all functions typed; interfaces over types for objects
- **Error handling**: Distinguish client errors (400), auth errors (401), permission errors (403), server errors (500)
- **API documentation**: Swagger comments in routes (`/** @swagger ... */`)
- **Git commits**: Format `type(scope): message` (e.g., `feat(auth): add password reset`)

---

## Integration Points & External Services

### Configured But Not Fully Implemented
- **Email**: SMTP config in `src/config.ts`; used for password reset, email verification
- **AWS S3/R2**: Object storage for exam assets (images, code snippets); env vars ready
- **Redis**: Configured for caching; not yet integrated into controllers
- **Swagger/OpenAPI**: Auto-generated at `/api-docs` from JSDoc comments in routes

### Common Additions
- **Rate limiting**: Express middleware; recommended for auth endpoints
- **Pagination**: Use `paginatedResponse()` utility for list endpoints
- **Search/filtering**: Add query params to endpoints; validate with Zod
- **File uploads**: Multer + S3 integration (S3 config ready in `src/config.ts`)

---

## File Structure Quick Reference

| Path | Purpose | Examples |
|------|---------|----------|
| `backend/src/controllers/` | Business logic per domain | `authController.ts` |
| `backend/src/routes/` | Endpoint definitions + Swagger | `authRoutes.ts` → POST /register |
| `backend/src/middleware/` | Auth, logging, error handling | `auth.ts`, `errorHandler.ts` |
| `backend/src/utils/` | Reusable functions | `jwt.ts`, `password.ts`, `responses.ts` |
| `backend/prisma/` | Database schema + migrations | `schema.prisma`, `seed.ts` |
| `frontend/src/pages/` | Route pages (full page components) | `LoginPage.tsx`, `DashboardPage.tsx` |
| `frontend/src/components/` | Reusable UI components | `Navbar.tsx` |
| `frontend/src/services/` | API client + domain services | `api.ts`, `authService.ts` |
| `frontend/src/stores/` | Zustand state management | `authStore.ts` |
| `frontend/src/types/` | TypeScript type definitions | Global types, API contracts |

---

## Debugging & Common Issues

- **401 errors in frontend**: Check if refresh token is expired or token is invalid; login UI should redirect
- **CORS issues**: Ensure `cors()` middleware is before routes in `index.ts`
- **Database connection**: Verify `DATABASE_URL` in `.env` and run `npm run db:push`
- **JWT decode fails**: Check `jwtSecret` env var matches between backend and frontend config
- **Type errors in Prisma**: Run `npx prisma generate` after schema changes

---

## When Adding Features

1. **Define DB schema** in `prisma/schema.prisma` → run `npm run db:push`
2. **Create API endpoint**: Route + controller + Zod validation
3. **Add frontend page/component** + integrate `api.ts` client
4. **Update Zustand store** if needed for new state
5. **Document** Swagger comment in route + update README if architectural change
6. **Test** via Postman/curl (backend) and UI (frontend)

---

*Last updated: February 2026 | Reference: ARCHITECTURE.md, CONTRIBUTING.md*
