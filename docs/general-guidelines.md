# General Guidelines

## Code Quality Standards

### Code Review Requirements

Every pull request must:
- Pass all automated tests and linting checks
- Have at least one approval from a team member
- Address all comments and suggestions
- Maintain or improve code coverage

### Commit Messages

Follow conventional commit format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(auth): add JWT token refresh mechanism

Implement automatic token refresh to maintain user sessions
across page reloads. Tokens are now refreshed 5 minutes
before expiration.

Closes #123
```

## Performance Guidelines

1. **Bundle Size**: Monitor and minimize JavaScript bundle size
2. **Lazy Loading**: Lazy load components and routes when possible
3. **Image Optimization**: Use appropriate image formats and sizes
4. **Caching**: Implement client-side and server-side caching strategies
5. **Debouncing**: Debounce frequent API calls from user input

## Security Best Practices

1. **Input Validation**: Always validate user input on both client and server
2. **XSS Prevention**: Sanitize HTML content and use Vue's built-in XSS protection
3. **CSRF Protection**: Implement CSRF tokens for state-changing operations
4. **Secrets Management**: Never commit API keys or secrets to version control
5. **Dependencies**: Keep dependencies updated and audit for vulnerabilities

```bash
npm audit
npm audit fix
```

## Accessibility

1. **Semantic HTML**: Use proper HTML semantic elements
2. **ARIA Labels**: Add aria labels where necessary
3. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
4. **Color Contrast**: Maintain sufficient color contrast ratios (WCAG AA minimum)
5. **Focus Management**: Provide clear focus indicators

## Documentation

### Code Comments

Comment should explain **why**, not **what**:

```typescript
// Bad: Explains what the code does
const result = array.filter(item => item.status === 'active')

// Good: Explains why
// Filter to active items only, as inactive items should not appear in the list
const result = array.filter(item => item.status === 'active')
```

### README Updates

Always update `README.md` when:
- Adding new features
- Changing project structure
- Updating dependencies
- Modifying build or deployment process
- Adding new scripts or commands

## File Organization

```
src/
  __tests__/          # Test files
  assets/             # Static assets (images, fonts)
  components/         # Vue components
  store/              # State management
  types/              # TypeScript type definitions
  utils/              # Utility functions
  api.ts              # API client
  helpers.ts          # Helper functions
  App.vue             # Root component
  main.ts             # Entry point
```

## Naming Conventions

- **Files**: Use kebab-case for file names (e.g., `user-card.vue`)
- **Variables/Functions**: Use camelCase (e.g., `getUserData`)
- **Classes/Components**: Use PascalCase (e.g., `UserCard`)
- **Constants**: Use UPPER_SNAKE_CASE (e.g., `MAX_RETRY_ATTEMPTS`)
- **Private Members**: Prefix with underscore (e.g., `_internalCache`)

## Git Workflow

1. Create a new branch for each feature or bug fix
2. Name branches descriptively: `feature/user-authentication` or `fix/login-error`
3. Keep commits atomic and logical
4. Push regularly to avoid data loss
5. Create a pull request when ready for review
6. Update branch to main before merging to avoid conflicts

```bash
# Create and switch to new branch
git checkout -b feature/my-feature

# Make changes and commit
git commit -m "feat(auth): add login form"

# Push to remote
git push -u origin feature/my-feature

# Create pull request via GitHub
```

## Debugging

### Console Logging

Use console methods appropriately:

```typescript
console.log('General information')
console.warn('Warning messages')
console.error('Error messages')
console.debug('Debug-only information')
```

### Browser DevTools

- Use Vue DevTools extension for component inspection
- Use Network tab to debug API calls
- Use Console for runtime errors
- Use Performance tab for performance analysis

## Staying Up-to-Date

- Review CHANGELOG.md for dependency updates
- Attend code review discussions
- Participate in team retrospectives
- Keep documentation current
- Follow team discussions and decisions
