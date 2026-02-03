# Project Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                            │
│  React 18 + TypeScript + Vite + Tailwind CSS                    │
│  ├── Pages (Login, Register, Dashboard)                         │
│  ├── Components (Navbar, Forms, Cards)                          │
│  ├── Services (API Client)                                      │
│  └── Stores (Zustand State Management)                          │
└─────────────────────┬───────────────────────────────────────────┘
                      │ HTTPS/REST API
┌─────────────────────▼───────────────────────────────────────────┐
│                      API LAYER                                   │
│  Express.js + TypeScript                                        │
│  ├── Auth Routes (register, login, refresh)                     │
│  ├── Certification Routes                                       │
│  ├── Question Routes                                            │
│  ├── Test Routes                                                │
│  ├── Progress Routes                                            │
│  └── Middleware (Auth, Validation, Error Handling)              │
└─────────────────────┬───────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
┌───────▼──┐  ┌──────▼──────┐  ┌───▼──────┐
│PostgreSQL│  │    Redis    │  │AWS S3/R2 │
│Database  │  │    Cache    │  │(Optional)│
└──────────┘  └─────────────┘  └──────────┘
```

## Database Schema Relationships

```
User (1) ──────────────── (M) UserAttempt
  │                             │
  ├─────── (M) UserProgress     ├─────── (M) AttemptedQuestion
  │                             │              │
  ├─────── (M) BookmarkedQuestion         (M) Question
  │
  ├─────── (M) StudyNote
  │
  ├─────── (M) Flashcard
  │
  └─────── (M) FlashcardReview


Topic ──────── (M) Question ──────── (M) Answer
  │                 │
  │                 ├─────── (M) AttemptedQuestion
  │                 │
  │                 └─────── (1) BookmarkedQuestion
  │
  ├─────── (M) StudyNote
  │
  ├─────── (M) Flashcard
  │
  └─────── (M) UserProgress

Certification (1) ──────── (M) Topic
      │
      └────────── (M) UserProgress
```

## API Flow

### Authentication Flow
```
1. User Registration
   POST /api/auth/register
   └─ Create user account
   └─ Hash password with bcrypt
   └─ Generate JWT tokens
   └─ Return tokens + user data

2. User Login
   POST /api/auth/login
   └─ Verify credentials
   └─ Update last_login
   └─ Generate JWT tokens
   └─ Return tokens + user data

3. Token Refresh
   POST /api/auth/refresh
   └─ Verify refresh token
   └─ Generate new access token
   └─ Return new access token

4. Protected Endpoints
   GET /api/auth/me (with JWT in header)
   └─ Middleware validates JWT
   └─ Returns user details
```

### Request/Response Cycle
```
Frontend Request
    ↓
Axios Interceptor (Add JWT token)
    ↓
Express Middleware (Logger, CORS, Validation)
    ↓
Auth Middleware (Verify JWT)
    ↓
Route Handler → Controller → Service/Database
    ↓
Response with status code
    ↓
Axios Response Interceptor (Handle errors)
    ↓
Zustand Store (Update state)
    ↓
React Component Re-render
```

## File Organization

```
CertPrepare/
│
├── backend/
│   ├── src/
│   │   ├── config.ts               # Configuration
│   │   ├── index.ts                # Server entry point
│   │   ├── controllers/            # Business logic
│   │   │   └── authController.ts
│   │   ├── routes/                 # API routes
│   │   │   ├── authRoutes.ts
│   │   │   └── certificationRoutes.ts
│   │   ├── middleware/             # Express middleware
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── logger.ts
│   │   └── utils/                  # Utility functions
│   │       ├── jwt.ts
│   │       ├── password.ts
│   │       └── responses.ts
│   ├── prisma/
│   │   ├── schema.prisma           # Database schema
│   │   └── seed.ts                 # Sample data
│   ├── tests/                      # Test files
│   ├── .env.example                # Environment template
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx                # React entry point
│   │   ├── App.tsx                 # Main app component
│   │   ├── index.css               # Global styles
│   │   ├── config.ts               # Configuration
│   │   ├── pages/                  # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── DashboardPage.tsx
│   │   ├── components/             # Reusable components
│   │   │   └── Navbar.tsx
│   │   ├── services/               # API services
│   │   │   ├── api.ts
│   │   │   └── authService.ts
│   │   ├── stores/                 # State management
│   │   │   └── authStore.ts
│   │   ├── hooks/                  # Custom hooks
│   │   └── types/                  # Type definitions
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── docker-compose.yml              # Docker orchestration
├── README.md                        # Main documentation
├── QUICKSTART.md                    # Quick start guide
├── ROADMAP.md                       # Development roadmap
└── CONTRIBUTING.md                  # Contribution guidelines
```

## Technology Stack Details

### Backend Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18+
- **Language**: TypeScript 5.3+
- **Database**: PostgreSQL 16
- **ORM**: Prisma 5.7+
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs, helmet, cors
- **Validation**: Zod, express-validator
- **API Docs**: Swagger UI
- **Cache**: Redis
- **Testing**: Jest
- **Code Quality**: ESLint, Prettier

### Frontend Stack
- **Framework**: React 18.2+
- **Language**: TypeScript 5.3+
- **Build Tool**: Vite 5.0+
- **Styling**: Tailwind CSS 3.3+
- **Router**: React Router v6
- **State**: Zustand 4.4+
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Validation**: Zod
- **Components**: Custom + shadcn/ui ready
- **Testing**: Vitest
- **Code Quality**: ESLint, Prettier

## Data Flow Example: User Registration

```
1. Frontend: User fills registration form
   ↓
2. Frontend: Form validation with Zod
   ↓
3. Frontend: Submit to /api/auth/register
   ↓
4. Backend: Receive request
   ├─ Validate input with Zod
   ├─ Check if email exists (database query)
   ├─ Validate password strength
   ├─ Hash password with bcryptjs
   ├─ Create user in PostgreSQL
   ├─ Generate JWT access token
   ├─ Generate JWT refresh token
   └─ Return tokens + user data
   ↓
5. Frontend: Receive response
   ├─ Store tokens in Zustand store
   ├─ Persist to localStorage
   ├─ Store user data
   └─ Redirect to /dashboard
   ↓
6. All future requests: Include JWT in Authorization header
```

## Performance Optimization Strategies

1. **Database**: 
   - Proper indexing
   - Query optimization with Prisma
   - Connection pooling

2. **Caching**:
   - User sessions in Redis
   - Question cache
   - User progress cache

3. **Frontend**:
   - Code splitting with React Router lazy loading
   - Image optimization
   - Minification with Vite

4. **API**:
   - Pagination for large datasets
   - Compression with gzip
   - Rate limiting

