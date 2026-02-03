# CertPrepare - Professional Certification Exam Preparation Platform

A full-stack web application that helps professionals prepare for and pass certification exams through interactive learning, practice tests, and progress tracking.

## Project Structure

```
CertPrepare/
├── backend/              # Node.js + Express backend
├── frontend/             # React 18 + TypeScript frontend
└── README.md
```

## Tech Stack

### Backend
- **Framework**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (Prisma ORM)
- **Cache**: Redis
- **Authentication**: JWT with refresh tokens
- **Testing**: Jest
- **API Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **UI**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Redis 6+
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update DATABASE_URL in .env with your PostgreSQL connection string
# Update JWT_SECRET and other secrets

# Run migrations
npm run db:push

# Start development server
npm run dev
```

The backend will be running at `http://localhost:3001`
API documentation available at `http://localhost:3001/api-docs`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be running at `http://localhost:3000`

## Database Schema

### Core Tables
- **users**: User accounts and authentication
- **certifications**: Certification programs (AWS, Azure, PMP, etc.)
- **topics**: Topics within each certification
- **questions**: Practice questions with multiple types
- **answers**: Answer options for questions
- **user_attempts**: Practice exam attempts
- **attempted_questions**: Questions answered in each attempt
- **user_progress**: Topic-wise mastery tracking
- **bookmarked_questions**: Questions saved by users
- **study_notes**: User notes per topic
- **flashcards**: User-created flashcards
- **flashcard_reviews**: Spaced repetition tracking

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Certifications (Coming Soon)
- `GET /api/certifications` - List all certifications
- `GET /api/certifications/:id` - Get certification details
- `POST /api/certifications` - Create certification (Admin)

## Features

### Implemented
- ✅ User authentication with JWT
- ✅ Role-based access control (STUDENT, INSTRUCTOR, ADMIN)
- ✅ Database schema for all features
- ✅ Basic frontend structure with React Router
- ✅ API documentation with Swagger

### In Progress
- 🔄 Certification management
- 🔄 Question bank system
- 🔄 Practice test engine
- 🔄 Progress analytics
- 🔄 Study materials (flashcards, notes)

### Planned
- 📋 Admin panel
- 📋 Email verification
- 📋 Password reset
- 📋 AWS S3 integration for media
- 📋 Video integration
- 📋 Real-time progress sync
- 📋 Mobile app

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/certprepare
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_change_in_production
PORT=3001
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_BASE=http://localhost:3001/api
```

## Development Scripts

### Backend
```bash
npm run dev           # Start dev server with hot reload
npm run build         # Build for production
npm start             # Start production server
npm run db:migrate    # Run database migrations
npm run db:studio     # Open Prisma Studio
npm test              # Run tests
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
```

### Frontend
```bash
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run type-check    # Check TypeScript types
```

## Deployment

### Backend
- Docker support ready
- Can be deployed to Railway, Render, or Heroku
- Environment variables need to be configured

### Frontend
- Optimized Vite build
- Ready for Vercel, Netlify, or traditional hosting
- Configure API base URL for production

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@certprepare.com or open an issue on GitHub.
