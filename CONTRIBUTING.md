# CertPrepare Contribution Guidelines

## Code Style

### TypeScript
- Use strict mode
- Add type annotations for function parameters and returns
- Use interfaces over types for object shapes
- Follow camelCase for variables and functions
- Use PascalCase for classes and types

### React
- Use functional components with hooks
- Keep components focused and single-responsibility
- Use descriptive component names
- Separate containers from presentational components

### File Structure
```
src/
├── components/    # Reusable UI components
├── pages/         # Page components
├── services/      # API service calls
├── stores/        # State management (Zustand)
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Git Workflow

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Make your changes
3. Write descriptive commit messages
4. Push to your branch
5. Create a Pull Request with:
   - Clear title
   - Description of changes
   - Testing steps
   - Screenshots (if UI changes)

## Commit Message Format

```
type(scope): subject

body

footer
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(auth): add password reset functionality

- Add password reset request endpoint
- Add email verification link
- Update user model with reset token

Closes #123
```

## Testing

- Write unit tests for utilities and services
- Write integration tests for API endpoints
- Aim for 80%+ code coverage
- Use Jest for backend, Vitest for frontend

## Pull Request Review Checklist

- [ ] Code follows style guidelines
- [ ] New functions have JSDoc comments
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No console.logs in production code
- [ ] No commented-out code
- [ ] Performance implications considered
- [ ] Security implications reviewed

## API Design Principles

1. **Consistency**: Use consistent naming conventions
2. **Clarity**: Endpoint purposes should be obvious
3. **Documentation**: Every endpoint should be documented
4. **Versioning**: Consider API versioning for breaking changes
5. **Error Handling**: Return meaningful error messages

## Security Checklist

- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using Prisma)
- [ ] XSS protection (React auto-escaping)
- [ ] CSRF protection (if using cookies)
- [ ] Rate limiting on sensitive endpoints
- [ ] JWT secrets in environment variables
- [ ] HTTPS in production
- [ ] Secure password requirements

## Performance Considerations

- Lazy load routes in React
- Optimize database queries
- Use Redis caching appropriately
- Minimize bundle size
- Implement pagination for large datasets
- Use indexes on frequently queried columns

## Documentation

- Keep README.md updated
- Document new API endpoints in Swagger
- Add JSDoc comments to complex functions
- Update ROADMAP.md with progress
- Keep deployment guides current

