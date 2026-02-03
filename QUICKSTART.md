# Quick Start Guide for CertPrepare

## Option 1: Using Docker Compose (Recommended)

This is the quickest way to get everything running with PostgreSQL and Redis automatically.

### Prerequisites
- Docker
- Docker Compose

### Steps

1. **Clone/Navigate to project**
   ```bash
   cd CertPrepare
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Run database migrations**
   ```bash
   docker-compose exec backend npm run db:push
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Docs: http://localhost:3001/api-docs
   - PostgreSQL: localhost:5432
   - Redis: localhost:6379

5. **Stop services**
   ```bash
   docker-compose down
   ```

---

## Option 2: Local Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Redis 6+

### Backend Setup

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Update .env with your PostgreSQL connection**
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/certprepare
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your-secret-key-here
   JWT_REFRESH_SECRET=your-refresh-secret-here
   ```

5. **Run database migrations**
   ```bash
   npm run db:push
   ```

6. **Start the backend server**
   ```bash
   npm run dev
   ```
   Backend will run at http://localhost:3001

### Frontend Setup (in another terminal)

1. **Navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Start the frontend server**
   ```bash
   npm run dev
   ```
   Frontend will run at http://localhost:3000

---

## Testing the Application

### 1. Create a User Account
- Go to http://localhost:3000/register
- Fill in the registration form
- Submit to create account

### 2. Login
- Go to http://localhost:3000/login
- Use your registered credentials

### 3. Access Dashboard
- After login, you'll be redirected to /dashboard
- View available certifications

### 4. Test API Endpoints
- Use Postman or curl to test endpoints
- API documentation available at http://localhost:3001/api-docs

**Test Registration:**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

**Test Login:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'
```

---

## Database Management

### Using Prisma Studio (Local Development)
```bash
cd backend
npm run db:studio
```
Opens interactive GUI at http://localhost:5555

### View Database Logs
```bash
docker-compose logs -f postgres
```

### Reset Database (Warning: Deletes all data)
```bash
cd backend
npm run db:push -- --skip-generate
```

---

## Troubleshooting

### Port Already in Use
- Change ports in docker-compose.yml or package.json scripts

### Database Connection Error
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Run `npm run db:push` to create tables

### JWT Token Issues
- Clear browser localStorage
- Update JWT_SECRET in .env
- Regenerate tokens by logging in again

### Frontend Can't Connect to Backend
- Check if backend is running on port 3001
- Update VITE_API_BASE in frontend/.env
- Check CORS settings in backend/src/index.ts

---

## Next Steps

1. Review the database schema in `backend/prisma/schema.prisma`
2. Explore API endpoints in `backend/src/routes/`
3. Check out React components in `frontend/src/components/`
4. Start implementing features from the project requirements
5. Add more controllers and routes as needed

---

## Useful Commands

### Backend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run db:migrate   # Create new migration
npm test             # Run tests
npm run lint         # Check code style
```

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview build
npm run lint         # Check code style
npm run type-check   # Check TypeScript
```

---

For more details, see [README.md](../README.md)
