#  ⌨️ Typee

A modern, high-performance touch typing practice tool built with Vue 3, TypeScript, and Vite.

**Live Demo:** [isaaceliape.github.io/typee](https://isaaceliape.github.io/typee)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Status](#-project-status)
- [Quick Start](#-quick-start)
- [Project Setup](#-project-setup)
- [Development](#-development)
- [Architecture](#-architecture)
- [Code Quality](#-code-quality)
- [Contributing](#-contributing)
- [Tools & Commands](#-tools--commands)
- [Performance](#-performance)
- [Troubleshooting](#-troubleshooting)

## ⚙️ Features

### Core Features
- **Real-time typing practice** - Type along with dynamically generated text
- **Error tracking** - Real-time error counting and display
- **Word counter** - Track words typed per sentence
- **Progress monitoring** - See typing progress and sentence completion

### UI Features
- **Multiple font families** - Choose your preferred typing font
- **Font size adjustment** - Customize text size for comfort
- **Dark/Light mode support** - Toggle between themes
- **Responsive design** - Works on desktop and tablet devices
- **Keyboard overlay** - Visual keyboard guide showing next keys to type

### Advanced Features
- **Configurable sentence length** - Adjust words per sentence
- **Sentence progression** - Automatic advancement through sentences
- **Reset functionality** - Quick reset to start fresh (Tab key)
- **Menu system** - Easy access to settings and controls
- **Help/Info panel** - Built-in documentation

## 🎨 Demo

![Typee Screenshot](https://raw.githubusercontent.com/isaaceliape/typing_tool/master/src/assets/example.png)

## 🛠️ Tech Stack

### Frontend Framework
- **Vue 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe development with strict mode enabled
- **Vite** - Next-generation build tool with hot module replacement
- **SCSS** - Advanced CSS preprocessing for styling

### State Management
- **Pinia** - Lightweight state management (migrated from Vuex)

### Development Tools
- **BUN** - Fast JavaScript runtime and package manager (10x faster than NPM)
- **ESLint** - Code quality and style enforcement
- **Vitest** - Unit testing framework
- **@vue/test-utils** - Vue component testing utilities

### Build & Deployment
- **Vite** - Production build optimization
- **GitHub Pages** - Live deployment

## 📊 Project Status

### Completion Status: 96% ✅

| Category | Status | Details |
|----------|--------|---------|
| **Type Safety** | ✅ 100% | Full TypeScript, no `any` types |
| **Test Coverage** | ✅ 79 Tests | 8 test files, all passing |
| **ESLint Compliance** | ✅ 0 Errors | Clean code quality |
| **Bundle Size** | ✅ Optimized | 11.14 KB JS + 1.46 KB CSS |
| **Build Time** | ✅ 700ms | Fast production builds |
| **Performance** | ✅ Optimized | Code splitting, tree-shaking |

### Resolved Issues
- ✅ 8 CRITICAL TypeScript issues (#10-17)
- ✅ 2 HIGH priority issues (#18-19)
- ✅ 1 HIGH priority migration (#28 - NPM to BUN)
- ✅ 2 MEDIUM priority issues (#8, #26)
- ✅ 19 CLOSED issues total

### Open Tasks
- 🔵 EPIC #27: Application Progress Monitoring (tracking only)

## 🚀 Quick Start

### Prerequisites

This project requires **BUN** as the package manager - a modern, fast alternative to NPM.

#### Install BUN
```bash
# macOS
brew install bun

# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1|iex"

# Linux
curl -fsSL https://bun.sh/install | bash

# Verify installation
bun --version
```

### Installation & Running

```bash
# Install dependencies
bun install

# Start development server (http://localhost:5173)
bun run dev

# Build for production
bun run build

# Preview production build (http://localhost:4173)
bun run preview
```

## 📂 Project Setup

### Install Dependencies
```bash
bun install
```

### Development

Start the Vite development server with hot module replacement (HMR):
```bash
bun run dev
```
Server runs on [http://localhost:5173](http://localhost:5173)

### Production Build

Build for production:
```bash
bun run build
```

Preview production build locally:
```bash
bun run preview
```
Preview server runs on [http://localhost:4173](http://localhost:4173)

## 💻 Development

### Project Structure

```
typee/
├── src/
│   ├── components/          # Vue components
│   │   ├── App.vue
│   │   ├── TextRenderer.vue # Main typing component
│   │   ├── InfoPanel.vue    # Status display
│   │   ├── Menu.vue         # Settings menu
│   │   ├── BurgerMenu.vue   # Mobile menu
│   │   ├── Keymap.vue       # Keyboard guide
│   │   ├── Letter.vue       # Individual letter display
│   │   └── ToggleButton.vue # UI buttons
│   ├── store/
│   │   └── app.ts           # Pinia state management
│   ├── __tests__/           # Unit tests (79 tests)
│   ├── assets/              # Images and data
│   │   ├── 1000EnglishWords.js
│   │   └── pangrams.js
│   ├── api.ts               # External data fetching
│   ├── helpers.ts           # Utility functions
│   ├── main.ts              # Application entry point
│   └── App.vue              # Root component
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── vitest.config.ts         # Vitest configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies
└── bun.lock                 # Dependency lock file (BUN)
```

### Code Style Guidelines

- **Imports**: ES6 imports, grouped by type (Pinia, helpers, components)
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Formatting**: 2-space indentation, no semicolons, single quotes
- **Types**: TypeScript strict mode, no implicit `any`
- **Error Handling**: try/catch for async, console logging for debugging
- **Vue Components**: Composition API with `<script setup>`, reactive state
- **Store (Pinia)**: camelCase state, computed getters, typed actions
- **Styling**: SCSS in components, BEM-like class naming

### File Conventions

- Components: `PascalCase.vue`
- Utilities: `camelCase.ts`
- Tests: `*.spec.ts` or `*.test.ts`
- Styles: SCSS in component `<style>` blocks

## 🏗️ Architecture

### Component Hierarchy

```
App.vue
├── TextRenderer.vue (main typing interface)
│   ├── InfoPanel.vue
│   ├── Keymap.vue
│   └── Letter.vue (repeated for each character)
├── Menu.vue (settings)
├── BurgerMenu.vue (mobile menu)
└── ToggleButton.vue
```

### State Management (Pinia Store)

```typescript
// app.ts - Global state for:
- currentPos              // Cursor position
- errorCount             // Typing errors
- sentencePos            // Current sentence
- selectedFont           // Font selection
- fontSize               // Font size
- wordsPerSentence       // Configurable length
- showCapitalLetters     // Capitalization mode
- disableTyping          // Typing state
- menuOpen               // Menu visibility
```

### Data Flow

1. **User Input** → TextRenderer component captures keystrokes
2. **Validation** → Compare input with expected text
3. **State Update** → Store updates error count, position, etc.
4. **Render** → Components re-render with new state
5. **Display** → Letter components show success/error classes

### Key Components

- **TextRenderer.vue**: Main typing interface with event handling
- **InfoPanel.vue**: Displays current stats (errors, position)
- **Keymap.vue**: Visual keyboard guide showing next key
- **Menu.vue**: Settings for fonts, size, words per sentence
- **Letter.vue**: Individual character display with styling

## ✅ Code Quality

### Testing

Run all tests:
```bash
bun test
```

Run tests with UI:
```bash
bun run test:ui
```

Run tests with coverage:
```bash
bun run test:coverage
```

Run single test file:
```bash
bun test -- src/__tests__/helpers.test.ts
```

### Test Coverage

- **8 test files** with comprehensive coverage
- **79 passing tests** covering all major components
- **Components tested**:
  - BurgerMenu.vue (9 tests)
  - InfoPanel.vue (11 tests)
  - Keymap.vue (16 tests)
  - Letter.vue (12 tests)
  - Menu.vue (17 tests)
  - ToggleButton.vue (8 tests)
  - TextRenderer.vue (3 tests)
  - Helper functions (4 tests)

### Linting

Run ESLint checks:
```bash
bun run lint
```

### TypeScript

- Strict mode enabled
- No `any` types allowed
- Full type safety throughout
- Proper interfaces for complex objects

## 🔧 Contributing

### Getting Started

1. Clone the repository
2. Install BUN
3. Run `bun install`
4. Run `bun run dev` to start development

### Development Workflow

1. Create a feature branch
2. Make changes following code style guidelines
3. Run tests: `bun test`
4. Run linter: `bun run lint`
5. Build: `bun run build`
6. Commit with clear message
7. Push and create pull request

### Issue Management

Tools are available in `tools/` directory:

```bash
# Create an issue with Scrum template
./tools/create-issue.sh --title "Feature name" --priority HIGH \
  --template scrum --story-points 8 --labels "feature"

# Get issue details
./tools/get-issue-by-id.sh 26

# List all open issues
./tools/get-all-issues.sh --state open

# Update issue
./tools/update-issue-by-id.sh 26 --labels "in-progress"

# Close issue
./tools/close-issue-by-id.sh 26 --reason "Completed"
```

See `tools/README.md` for full documentation.

## 🎯 Tools & Commands

### BUN Commands

| Command | Purpose |
|---------|---------|
| `bun install` | Install dependencies |
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run lint` | Run ESLint |
| `bun test` | Run all tests |
| `bun run test:ui` | Run tests with UI |
| `bun run test:coverage` | Generate coverage report |

### GitHub Tools

| Tool | Purpose | Usage |
|------|---------|-------|
| `create-issue.sh` | Create GitHub issue | `./create-issue.sh -t "Title" -p HIGH --template scrum` |
| `get-issue-by-id.sh` | Get issue details | `./get-issue-by-id.sh 26` |
| `get-all-issues.sh` | List issues | `./get-all-issues.sh --state open` |
| `update-issue-by-id.sh` | Update issue | `./update-issue-by-id.sh 26 --labels "done"` |
| `close-issue-by-id.sh` | Close issue | `./close-issue-by-id.sh 26` |

See `tools/README.md` for complete documentation.

## ⚡ Performance

### Build Performance

- **Installation**: ~6.7s with BUN (vs 30s+ with NPM)
- **Build time**: ~700ms
- **HMR**: Instant with Vite

### Runtime Performance

- **Bundle size**: 11.14 KB JS + 1.46 KB CSS (gzipped)
- **Code splitting**: Optimized vendor chunks
- **Tree-shaking**: Unused code removed
- **Lazy loading**: Ready for code-splitting

### Optimizations

- BUN package manager (10x faster)
- Vite build optimization
- Vue 3 Composition API efficiency
- TypeScript compilation
- CSS/SCSS optimization
- Asset minification

## 🐛 Troubleshooting

### Issue: "BUN is not installed"
```bash
# Install BUN
curl -fsSL https://bun.sh/install | bash

# Verify
bun --version
```

### Issue: "Port 5173 already in use"
```bash
# Development server will try next available port
# Or specify custom port:
bun run dev -- --port 3000
```

### Issue: "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules bun.lock
bun install
```

### Issue: "Tests failing"
```bash
# Clear test cache and re-run
bun test --no-cache

# Run with verbose output
bun test -- --reporter=verbose
```

### Issue: "TypeScript errors"
```bash
# Check TypeScript configuration
bun run build

# View specific errors
bun run lint
```

## 📚 Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [BUN Documentation](https://bun.sh/docs)
- [Vitest Documentation](https://vitest.dev/)

## 📋 Development Guidelines

See the `docs/` directory for detailed guidelines:
- `typescript-guidelines.md` - TypeScript best practices
- `vue-patterns.md` - Vue 3 and Composition API patterns
- `api-standards.md` - REST API design standards
- `testing-guidelines.md` - Testing strategies
- `general-guidelines.md` - General development guidelines

## 📞 Support

For issues or questions:
1. Check this README
2. See `tools/README.md` for tool documentation
3. Review `docs/` for development guidelines
4. Create an issue using `./tools/create-issue.sh`

## 📄 License

[License information]

## 🙏 Acknowledgments

- Built with Vue 3, TypeScript, and Vite
- Powered by BUN for fast development
- Tested with Vitest and Testing Library

---

**Status**: ✅ Production Ready  
**Last Updated**: November 25, 2025  
**Version**: 0.1.0
