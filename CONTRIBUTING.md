# 🤝 Contributing to Gestion Absences

Thank you for your interest in contributing to our project! This document provides guidelines and information for contributors.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

## 🛡️ Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and inclusive in all interactions.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Git

### Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/gestion-absences.git
   cd gestion-absences
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   ```bash
   cp env.example .env.local
   ```
5. Set up the database:
   ```bash
   npm run db:setup
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

### Branch Naming Convention
- `feature/description` - for new features
- `fix/description` - for bug fixes
- `docs/description` - for documentation updates
- `refactor/description` - for code refactoring

### Commit Message Format
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation changes
- `style`: formatting, missing semicolons, etc.
- `refactor`: code refactoring
- `test`: adding tests
- `chore`: maintenance tasks

Examples:
```
feat(auth): add user registration functionality
fix(api): resolve 500 error in absences endpoint
docs(readme): update installation instructions
```

## 📝 Code Standards

### JavaScript/React Standards
- Use functional components with hooks
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep components small and focused

### CSS/Tailwind Standards
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use consistent color scheme (magenta theme)
- Avoid custom CSS when possible

### File Organization
```
app/
├── components/     # Reusable components
├── context/        # React context providers
├── hooks/          # Custom hooks
├── lib/            # Utility functions
├── api/            # API routes
└── [pages]/        # Page components
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linting
npm run lint

# Run type checking
npm run type-check
```

### Writing Tests
- Write tests for new features
- Ensure all tests pass before submitting PR
- Use descriptive test names
- Test both success and error cases

## 🔄 Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the code standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Commit your changes** using conventional commits
6. **Push to your fork** and create a pull request
7. **Fill out the PR template** completely
8. **Request review** from maintainers

### PR Review Checklist
- [ ] Code follows project standards
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Responsive design works on all devices
- [ ] Accessibility standards are met

## 🐛 Reporting Issues

### Before Reporting
1. Check existing issues to avoid duplicates
2. Try to reproduce the issue locally
3. Check the documentation for solutions

### Issue Template
Use the provided issue templates:
- 🐛 [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md)
- ✨ [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md)

### Information to Include
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, browser, Node.js version)
- Screenshots if applicable
- Console errors if any

## 🏷️ Labels

We use the following labels to categorize issues and PRs:
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority: high` - High priority issues
- `priority: low` - Low priority issues

## 📞 Getting Help

If you need help:
1. Check the [documentation](docs/)
2. Search existing issues
3. Create a new issue with the appropriate template
4. Join our community discussions

## 🎉 Recognition

Contributors will be recognized in:
- Project README
- Release notes
- GitHub contributors page

Thank you for contributing to Gestion Absences! 🚀
