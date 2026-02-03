#!/usr/bin/env bash
# CertPrepare - Quick Start Script
# Run this to set up the entire project

set -e

echo "🚀 CertPrepare Platform - Setup Script"
echo "======================================"
echo ""

# Check if Docker is installed
if command -v docker &> /dev/null; then
    echo "✅ Docker found"
    echo "💡 Using Docker Compose for fastest setup..."
    echo ""
    echo "Running: docker-compose up -d"
    docker-compose up -d
    echo ""
    echo "⏳ Waiting for services to start..."
    sleep 5
    echo ""
    echo "Setting up database..."
    docker-compose exec -T backend npm run db:push
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "🌐 Access your application at:"
    echo "   Frontend:    http://localhost:3000"
    echo "   Backend API: http://localhost:3001"
    echo "   API Docs:    http://localhost:3001/api-docs"
    echo "   Database GUI: docker-compose exec backend npm run db:studio"
else
    echo "⚠️  Docker not found - Using local setup"
    echo ""
    
    echo "Setting up Backend..."
    cd backend
    npm install
    cp .env.example .env
    npm run db:push
    echo "✅ Backend ready"
    echo ""
    
    echo "Setting up Frontend..."
    cd ../frontend
    npm install
    cp .env.example .env
    echo "✅ Frontend ready"
    echo ""
    
    echo "📝 To run:"
    echo "   Backend:  cd backend && npm run dev"
    echo "   Frontend: cd frontend && npm run dev"
fi

echo ""
echo "📚 Documentation:"
echo "   • 00_READ_ME_FIRST.md  - Start here!"
echo "   • QUICKSTART.md        - Setup guide"
echo "   • ARCHITECTURE.md      - System design"
echo "   • ROADMAP.md          - Feature plan"
echo "   • CONTRIBUTING.md     - Code standards"
echo ""
echo "🎉 Happy building!"
