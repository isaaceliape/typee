#  ⌨️ Typee

[![Lint](https://github.com/isaaceliape/typee/actions/workflows/lint.yml/badge.svg?branch=master)](https://github.com/isaaceliape/typee/actions/workflows/lint.yml)

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
- [CI/CD Pipeline](#-cicd-pipeline)
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

The development server includes:
- **Hot Module Replacement (HMR)** - Changes reflect instantly without page reload
- **Source Maps** - Full debugging support with TypeScript source mapping
- **Fast Refresh** - Only modified components re-render

### Production Build

Build for production:
```bash
bun run build
```

The build command:
1. Runs all tests (`bun test`)
2. Compiles TypeScript to JavaScript
3. Minifies and optimizes assets
4. Outputs to `dist/` directory

Preview production build locally:
```bash
bun run preview
```
Preview server runs on [http://localhost:4173](http://localhost:4173)

### Deploying to GitHub Pages

The project is configured for automatic deployment to GitHub Pages via GitHub Actions. Push to the main branch to trigger deployment.

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
├── bun.lock                 # Dependency lock file (BUN)
└── docs/                    # Development guidelines
```

### Project Overview

**Typee** is a typing practice application designed to help users improve their typing speed and accuracy. The application provides real-time feedback on typing performance with visual keyboard guidance and customizable difficulty settings.

#### Key Features in Detail

**Typing Engine:**
- Real-time character-by-character validation
- Error detection and tracking with visual feedback
- Automatic sentence progression when current sentence is completed
- Support for custom text sources (words, pangrams, external APIs)

**User Interface:**
- Customizable fonts (multiple font families available)
- Adjustable font sizes for comfortable viewing
- Light/Dark theme toggle
- Responsive design for desktop and tablet
- Visual keyboard overlay showing next character to type

**Customization:**
- Configurable words per sentence (adjust difficulty)
- Font selection from available families
- Font size adjustment
- Text source selection (English words, pangrams)

**Statistics & Feedback:**
- Real-time error count display
- Words typed counter
- Current position indicator
- Sentence completion progress

### Component Deep Dive

#### TextRenderer.vue (Main Component)
The core component that handles typing input and manages the typing session. It:
- Listens for keyboard events
- Validates user input against expected text
- Dispatches state updates to the Pinia store
- Renders the text with proper styling for correct/incorrect characters
- Manages Tab key for reset functionality

#### Pinia Store (app.ts)
Centralized state management handling:
- `currentPos` - Current character position in the sentence
- `errorCount` - Total errors in current session
- `sentencePos` - Current sentence index
- `selectedFont` - Active font selection
- `fontSize` - Current font size
- `wordsPerSentence` - Difficulty setting
- `showCapitalLetters` - Capitalization mode toggle
- `disableTyping` - Pause/resume state
- `menuOpen` - Menu visibility toggle
- `darkMode` - Theme preference

#### Letter.vue (Character Display)
Individual character component that:
- Displays single character with appropriate styling
- Highlights based on state (correct, incorrect, current, pending)
- Updates reactively as user types

#### InfoPanel.vue (Statistics Display)
Shows real-time statistics:
- Error count
- Current position
- Words typed in current sentence
- Sentence progress indicator

#### Keymap.vue (Keyboard Guide)
Visual keyboard overlay displaying:
- Next character to type (highlighted)
- Keyboard layout reference
- Key highlighting during typing

#### Menu.vue (Settings)
Customization interface for:
- Font family selection
- Font size adjustment
- Words per sentence configuration
- Text source selection
- Theme toggle (Light/Dark mode)

#### BurgerMenu.vue (Mobile Navigation)
Mobile-optimized menu with collapsible interface for smaller screens

#### ToggleButton.vue (UI Components)
Reusable button component for toggling features and settings

### Data Flow

```
User Input
    ↓
TextRenderer captures keystroke
    ↓
Validates against expected character
    ↓
Updates Pinia store (errors, position, etc.)
    ↓
Store notifies all subscribed components
    ↓
Letter components re-render with new styles
    ↓
InfoPanel updates statistics
    ↓
Keymap updates next character guide
    ↓
Visual feedback displayed to user
```

### State Management with Pinia

The application uses Pinia for predictable state management. All state modifications go through store actions, ensuring consistency and testability.

Example state update flow:
```typescript
// Component detects typing error
TextRenderer.vue → store.incrementError() → 
Letter.vue re-renders with error class →
InfoPanel.vue displays updated count
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

### Common Development Tasks

**Adding a new component:**
1. Create component file in `src/components/` with PascalCase name
2. Define props and emits with TypeScript types
3. Use Composition API with `<script setup>`
4. Add corresponding test file in `src/__tests__/`
5. Import and use in parent component

**Modifying store state:**
1. Update state property definition in `src/store/app.ts`
2. Create action method for state mutation
3. Update all components that use this state
4. Add/update tests for the state change

**Adding styling:**
1. Use SCSS within component `<style>` blocks
2. Prefix classes with component name (BEM convention)
3. Use CSS variables for theming consistency
4. Ensure dark mode compatibility

## 🏗️ Architecture

### Component Hierarchy

```
App.vue (Root)
├── TextRenderer.vue (Main typing interface)
│   ├── InfoPanel.vue (Statistics display)
│   ├── Keymap.vue (Keyboard guide)
│   └── Letter.vue (Repeated for each character)
├── Menu.vue (Settings and customization)
├── BurgerMenu.vue (Mobile menu)
└── ToggleButton.vue (UI controls)
```

### State Management (Pinia Store)

The store maintains application state with the following key properties:

```typescript
// src/store/app.ts - Global state
interface AppState {
  currentPos: number              // Current character position in sentence
  errorCount: number              // Total errors in session
  sentencePos: number             // Current sentence index
  selectedFont: string            // Selected font family
  fontSize: number                // Font size in pixels
  wordsPerSentence: number        // Words per sentence (difficulty)
  showCapitalLetters: boolean     // Capitalization mode
  disableTyping: boolean          // Typing enabled/disabled
  menuOpen: boolean               // Menu visibility
  darkMode: boolean               // Theme preference
  sentences: string[]             // Array of text sentences
  currentSentence: string         // Current sentence being typed
}
```

### State Actions

Key store actions for state management:

```typescript
// Character input handling
updateCharacter(char: string)     // Process typed character

// Statistics
incrementError()                  // Increment error count
resetErrors()                     // Clear error count
incrementPosition()               // Move to next character

// Navigation
advanceSentence()                // Move to next sentence
goToPreviousSentence()           // Move to previous sentence
resetToStart()                   // Reset entire typing session

// Settings
updateFont(font: string)         // Change font
updateFontSize(size: number)     // Adjust font size
updateWordsPerSentence(words)    // Change difficulty
toggleCapitalLetters()           // Toggle uppercase mode
toggleDarkMode()                 // Toggle theme

// UI Control
toggleMenu()                     // Show/hide menu
toggleTyping()                   // Pause/resume typing
```

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     User Input (Keyboard)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
              ┌──────────────────────┐
              │  TextRenderer.vue    │
              │  - Capture keystroke │
              │  - Validate input    │
              └──────────┬───────────┘
                         │
                         ↓
              ┌──────────────────────┐
              │   Pinia Store        │
              │  - Update state      │
              │  - Validate logic    │
              └──────────┬───────────┘
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
   ┌────────────┐  ┌──────────┐  ┌──────────────┐
   │ Letter.vue │  │InfoPanel │  │  Keymap.vue  │
   │  Re-render │  │ Update   │  │ Update next  │
   │  with new  │  │ stats    │  │ character    │
   │  styles    │  │ display  │  │ highlight    │
   └────────────┘  └──────────┘  └──────────────┘
        │                │                │
        └────────────────┴────────────────┘
                         │
                         ↓
              Visual Feedback to User
```

### Component Communication

The application uses two patterns for component communication:

1. **Store (Pinia)** - For global state and cross-component communication
2. **Props/Emits** - For direct parent-child component communication

Example - Adding a character:
```
User types 'a' →
TextRenderer captures keystroke →
Validates against expected character →
Calls store.updateCharacter('a') →
Store updates currentPos and errorCount →
Letter.vue reacts to position change →
InfoPanel.vue reacts to error count change →
UI updates with visual feedback
```

### Error Handling Flow

```
User Types Incorrect Character
        │
        ↓
TextRenderer validates input
        │
  ┌─────┴─────┐
  ↓           ↓
Correct     Incorrect
  │           │
  │    store.incrementError()
  │    Letter shows error state
  │    InfoPanel updates count
  ↓
UI reflects error state
```

### State Update Flow

```
Action triggered (e.g., user types)
        │
        ↓
Store action executes
        │
        ↓
State property updated
        │
        ↓
Vue reactivity triggers re-render
        │
        ├─→ Computed properties recalculate
        ├─→ Watchers execute
        └─→ Components with changed props re-render
        │
        ↓
DOM updates (virtual DOM reconciliation)
        │
        ↓
Browser re-paints affected elements
        │
        ↓
Visual feedback shown to user
```

## ✅ Code Quality

### Testing Strategy

The project uses Vitest with Vue Test Utils for comprehensive component testing. Our testing approach includes:

- **Unit Tests** - Test individual functions and components
- **Component Tests** - Test Vue components in isolation
- **Integration Tests** - Test component interactions through Pinia store
- **Snapshot Tests** - Verify component output stability

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
  - BurgerMenu.vue (9 tests) - Mobile menu functionality
  - InfoPanel.vue (11 tests) - Statistics display and updates
  - Keymap.vue (16 tests) - Keyboard guide rendering
  - Letter.vue (12 tests) - Character display and styling
  - Menu.vue (17 tests) - Settings and customization
  - ToggleButton.vue (8 tests) - Button functionality
  - TextRenderer.vue (3 tests) - Main typing interface
  - Helper functions (4 tests) - Utility function testing

### Testing Best Practices

When adding new features, ensure:
1. Create corresponding test file: `ComponentName.spec.ts`
2. Test component props, emits, and user interactions
3. Mock Pinia store for component isolation
4. Test edge cases and error scenarios
5. Maintain or improve code coverage
6. Run `bun test` before committing

Example test structure:
```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly', () => {
    const wrapper = mount(MyComponent)
    expect(wrapper.exists()).toBe(true)
  })

  it('handles user interaction', async () => {
    const wrapper = mount(MyComponent)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
```

### Linting

Run ESLint checks:
```bash
bun run lint
```

The project enforces:
- Vue 3 essential rules
- TypeScript best practices
- No unused variables (with `_` prefix exception)
- No explicit `any` types (strict type checking)
- Proper import ordering

### TypeScript

- **Strict mode enabled** - Catches more errors at compile time
- **No `any` types allowed** - Full type coverage required
- **Full type safety** throughout the codebase
- **Proper interfaces** for complex objects
- **Generic types** for reusable components

TypeScript configuration (`tsconfig.json`):
- Target: ES2020
- Module: ESNext
- Strict mode enabled
- Source maps enabled for debugging
- Lib includes DOM and ES2020

### Performance Considerations

The project includes built-in performance optimizations:
- Vue 3's efficient reactivity system (Proxy-based)
- Pinia's minimal store overhead
- Vite's optimal code splitting
- CSS optimization and minification
- Asset lazy loading support

Monitor performance with:
- Browser DevTools Performance tab
- Lighthouse audits
- Network tab for asset sizes

## 🔧 Contributing

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/isaaceliape/typee.git
cd typee
```

2. Install BUN (if not already installed):
```bash
curl -fsSL https://bun.sh/install | bash
```

3. Install dependencies:
```bash
bun install
```

4. Start development server:
```bash
bun run dev
```

5. Open browser to [http://localhost:5173](http://localhost:5173)

### Development Workflow

Following conventional commit standards and atomic commits:

```bash
# 1. Create a feature branch
git checkout -b feature/new-feature-name

# 2. Make changes following code style guidelines
# Edit files in src/

# 3. Run tests to ensure quality
bun test

# 4. Run linter to check code style
bun run lint

# 5. Build to verify production build
bun run build

# 6. Commit with descriptive message
git commit -m "feat(typing): add new feature description"

# 7. Push to remote
git push -u origin feature/new-feature-name

# 8. Create pull request on GitHub
```

### Conventional Commit Format

Follow the format: `<type>(<scope>): <subject>`

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation update
- `style` - Code style change (no logic change)
- `refactor` - Code refactoring
- `test` - Test addition/modification
- `chore` - Build process, dependencies, etc.

**Example commits:**
```
feat(store): add undo/redo functionality
fix(typing): correct error counting logic
docs(readme): update installation instructions
test(letter): add edge case test for special characters
```

### Code Review Checklist

Before submitting a pull request, ensure:

- [ ] All tests pass: `bun test`
- [ ] No linting errors: `bun run lint`
- [ ] Build succeeds: `bun run build`
- [ ] Code follows style guidelines
- [ ] TypeScript has no errors
- [ ] New features include tests
- [ ] README updated if applicable
- [ ] Commit messages follow conventional format
- [ ] No sensitive data committed

### Issue Management

Use GitHub Issues to track work. Tools are available in `tools/` directory:

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

### Pull Request Guidelines

1. **Keep PRs focused** - One feature or fix per PR
2. **Provide clear description** - Explain what and why
3. **Reference issues** - Link to related GitHub issues with `Closes #123`
4. **Request review** - Get feedback from team members
5. **Address comments** - Make requested changes and push updates
6. **Squash commits** - Keep history clean before merge

### Debugging Tips

**Vue DevTools:**
- Install Vue DevTools browser extension
- Inspect component tree and state
- Monitor Pinia store mutations

**Console Logging:**
```typescript
// Use appropriate console methods
console.log('General information')
console.warn('Warning messages')
console.error('Error messages')
console.debug('Debug-only information')
```

**Network Debugging:**
- Open browser DevTools Network tab
- Monitor API calls in `api.ts`
- Check response status and payload

**TypeScript Checking:**
```bash
# Check for TypeScript errors without building
bun exec tsc --noEmit
```

**Performance Profiling:**
- Use browser DevTools Performance tab
- Record typing session
- Analyze frame rate and rendering bottlenecks

### Common Issues & Solutions

**Tests failing after changes:**
```bash
# Clear test cache
bun test --no-cache

# Run with verbose output
bun test -- --reporter=verbose
```

**Component not updating:**
- Check if state is being updated in store
- Verify component is subscribed to store
- Use Vue DevTools to inspect reactive state

**Styling issues:**
- Ensure SCSS is properly scoped to component
- Check for conflicting global styles
- Use CSS variables for theme consistency

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

## 🔄 CI/CD Pipeline

### Automated Linting with GitHub Actions

This project uses GitHub Actions to automatically run ESLint checks on all pull requests and pushes to the master branch.

**Workflow Overview:**
- **Trigger**: Pull requests to `master` branch and pushes to `master`
- **Runtime**: Ubuntu Latest
- **Timeout**: 10 minutes
- **Status Check**: `ESLint Code Quality Check`

**Workflow Steps:**
1. Checkout code with full history
2. Setup BUN package manager (latest)
3. Setup Node.js 20.x
4. Cache BUN modules for faster builds
5. Cache node_modules for faster builds
6. Install dependencies with frozen lockfile
7. Run ESLint linting check
8. Report status and upload results

**Performance:**
- Average execution time: < 2 minutes
- Caching strategy minimizes reinstalls
- Deterministic builds with frozen lockfile

### Branch Protection Rules

The `master` branch is protected with the following rules:

- ✅ **Require status checks to pass before merging**
  - ESLint Code Quality Check must pass
- ✅ **Require pull request reviews before merging**
  - At least 1 approval required
  - Stale reviews are dismissed
- ✅ **Enforce for administrators**
  - Rules apply to all users including maintainers
- ✅ **Block force pushes and deletions**
  - Prevents accidental branch removal

### Pull Request Workflow

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit: `git commit -m "feat: description"`
3. Push to remote: `git push -u origin feature/my-feature`
4. Create pull request on GitHub
5. ESLint workflow automatically runs
6. Fix any linting errors if needed
7. Request code review
8. After approval, merge to master (only if ESLint passes)

### Workflow Status Badge

The workflow status is displayed in the README header with a badge:
- 🟢 **Green** - Latest commit passed linting
- 🔴 **Red** - Latest commit failed linting
- 🟡 **Yellow** - Workflow currently running

Click the badge to view detailed workflow runs and logs.

### Viewing Workflow Results

**On GitHub:**
1. Go to [Actions tab](https://github.com/isaaceliape/typee/actions)
2. Select "Lint" workflow
3. Click the run you want to inspect
4. View step-by-step execution and logs

**Locally:**
Run linting before pushing to catch issues early:
```bash
bun run lint
```

### Troubleshooting CI/CD Issues

**Workflow fails with "Module not found":**
```bash
# Clear cache and reinstall
rm -rf node_modules bun.lock
bun install
bun run lint
```

**Linting check failing on PR:**
1. Pull latest master: `git pull origin master`
2. Run linting locally: `bun run lint`
3. Fix issues: `bun run lint -- --fix`
4. Commit and push: `git commit -am "fix: lint errors" && git push`

**Can't merge PR due to failed checks:**
1. Wait for workflow to complete (check Actions tab)
2. Fix any linting errors locally
3. Push fixes to PR branch
4. Workflow re-runs automatically
5. Once passing and approved, merge PR

**Manual Workflow Trigger:**
```bash
gh workflow run lint.yml -r master
```

## ⚡ Performance

### Build Performance

- **Installation**: ~6.7s with BUN (vs 30s+ with NPM)
- **Build time**: ~700ms for production build
- **HMR**: Instant updates during development with Vite

### Runtime Performance

- **Bundle size**: 11.14 KB JS + 1.46 KB CSS (gzipped)
- **Code splitting**: Optimized vendor chunks for faster loading
- **Tree-shaking**: Unused code automatically removed
- **Lazy loading**: Components ready for code-splitting

### Performance Optimizations

#### Build-Time Optimizations
- **BUN package manager** - 10x faster than NPM
- **Vite build optimization** - Rollup-based production builds
- **Vue 3 Composition API** - More efficient than Options API
- **TypeScript compilation** - Cached and optimized
- **CSS/SCSS optimization** - Minification and extraction
- **Asset minification** - Automatic compression

#### Runtime Optimizations
- **Vue 3 Reactivity** - Proxy-based, highly efficient
- **Virtual DOM** - Smart diffing algorithm
- **Component lazy loading** - Load on demand
- **Caching strategies** - Browser caching of assets
- **Debounced events** - Prevent excessive updates
- **Computed properties** - Lazy evaluation

#### Pinia Store Optimizations
- **Minimal overhead** - Lightweight compared to Vuex
- **Selective subscriptions** - Only update on relevant changes
- **Typed actions** - Compile-time type checking

### Performance Monitoring

Monitor and maintain performance:
```bash
# Check bundle size
bun run build

# Analyze build output
# Check dist/ folder for generated files

# Browser DevTools
# - Performance tab: Record and analyze
# - Lighthouse: Run audit
# - Network tab: Monitor asset loading
```

### Best Practices for Performance

1. **Use computed properties** instead of methods in templates
2. **Lazy load components** for routes
3. **Debounce frequent events** (e.g., input, scroll)
4. **Avoid unnecessary re-renders** with proper reactivity
5. **Keep components focused** - Single responsibility
6. **Use keys in v-for** loops for efficient updates
7. **Cache expensive computations** in store

## 🐛 Troubleshooting

### Issue: "BUN is not installed"
```bash
# Install BUN
curl -fsSL https://bun.sh/install | bash

# Verify installation
bun --version
```

### Issue: "Port 5173 already in use"
```bash
# Development server will try next available port
# Or specify custom port:
bun run dev -- --port 3000

# Find and kill process using port (macOS/Linux)
lsof -ti:5173 | xargs kill -9

# Or specify different port in vite.config.ts
```

### Issue: "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules bun.lock
bun install

# Clear Vite cache
rm -rf .vite

# Clear build cache
rm -rf dist
```

### Issue: "Tests failing after changes"
```bash
# Clear test cache
bun test --no-cache

# Run with verbose output for debugging
bun test -- --reporter=verbose

# Run single test file
bun test -- src/__tests__/filename.spec.ts
```

### Issue: "TypeScript errors"
```bash
# Check TypeScript configuration
bun exec tsc --noEmit

# See build errors
bun run build

# Fix linting issues
bun run lint
```

### Issue: "Component not updating after state change"
**Causes & Solutions:**
1. Check if store mutation was called
   - Use Vue DevTools to inspect Pinia store
   - Add console.log in store action

2. Verify component subscribed to state
   - Use `computed()` for reactive properties
   - Check component receives updated props

3. Check if state is truly reactive
   - Don't directly mutate array/object without store action
   - Use store actions for all state changes

4. Verify component is not unmounted
   - Check component is rendered
   - Inspect in Vue DevTools component tree

### Issue: "Build succeeds locally but fails in production"
**Solutions:**
1. Test production build locally:
```bash
bun run build
bun run preview
```

2. Check environment variables
   - Verify `.env` and `.env.production` files
   - Ensure API endpoints are correct

3. Clear build artifacts:
```bash
rm -rf dist bun.lock
bun install
bun run build
```

### Issue: "Slow development server"
**Solutions:**
1. Check file count in `src/`:
   - Large number of files can slow HMR
   - Consider organizing into subdirectories

2. Disable unused DevTools:
   - Close Vue DevTools while developing
   - Disable browser extensions

3. Increase Node memory:
```bash
NODE_OPTIONS=--max-old-space-size=4096 bun run dev
```

### Issue: "ESLint errors not caught"
```bash
# Run linter manually
bun run lint

# Fix auto-fixable issues
bun run lint -- --fix

# Check specific file
bun run lint -- src/components/MyComponent.vue
```

### Issue: "Styles not applying (SCSS/CSS)"
**Check:**
1. Verify SCSS syntax is correct
2. Check CSS specificity issues
3. Ensure dark mode classes are properly defined
4. Inspect with browser DevTools
5. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Debug Mode Tips

**Enable verbose logging:**
```typescript
// In store action
console.debug('Store action called', { action, state })
console.warn('Potential issue:', data)
console.error('Error occurred:', error)
```

**Use debugger:**
```typescript
// Add breakpoint in code
debugger // Pauses execution when DevTools open

// Or set conditional breakpoint
if (errorCount > 10) debugger
```

**Vue DevTools Inspection:**
1. Open Vue DevTools in browser
2. Select component in component tree
3. Inspect props, computed, and state
4. Modify state to test behavior
5. View event emitting in Events tab

**Network Debugging:**
1. Open DevTools Network tab
2. Filter by API calls in `api.ts`
3. Check request/response payloads
4. Monitor for 4xx/5xx errors
5. Check response headers for CORS issues

### Getting Help

1. **Check documentation** - Review `docs/` files
2. **Search issues** - Look for similar problems in GitHub Issues
3. **Check example code** - Review test files for usage examples
4. **Enable verbose logging** - Add `console.log` to track execution
5. **Create GitHub issue** - Include reproduction steps and error logs

## 📚 Resources

### Official Documentation
- [Vue 3 Documentation](https://vuejs.org/) - Framework documentation
- [TypeScript Documentation](https://www.typescriptlang.org/) - Type system reference
- [Vite Documentation](https://vitejs.dev/) - Build tool guide
- [Pinia Documentation](https://pinia.vuejs.org/) - State management
- [BUN Documentation](https://bun.sh/docs) - Package manager & runtime
- [Vitest Documentation](https://vitest.dev/) - Testing framework

### Related Technologies
- [Vue Test Utils](https://test-utils.vuejs.org/) - Vue component testing
- [SCSS/SASS](https://sass-lang.com/) - CSS preprocessing
- [ESLint](https://eslint.org/) - Code quality
- [Happy DOM](https://github.com/capricorn86/happy-dom) - DOM implementation for testing

### Community & Support
- [Vue Community Discord](https://discord.com/invite/Vue-Land)
- [Vue Forum](https://forum.vuejs.org/)
- [TypeScript Community](https://www.typescriptlang.org/community/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/vue.js)

### Learning Resources
- [Vue 3 Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Web Performance Best Practices](https://web.dev/)
- [Frontend Performance](https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint)

## 📋 Development Guidelines

See the `docs/` directory for detailed guidelines on development practices:

- **`typescript-guidelines.md`** - TypeScript best practices and type patterns
- **`vue-patterns.md`** - Vue 3 and Composition API patterns and conventions
- **`api-standards.md`** - REST API design standards and error handling
- **`testing-guidelines.md`** - Testing strategies and coverage requirements
- **`general-guidelines.md`** - General development guidelines and standards

### Quick Reference

**Type Safety:**
- Use strict mode
- Avoid `any` types
- Define proper interfaces
- Use generics for reusable code

**Vue Components:**
- Use Composition API with `<script setup>`
- Keep components focused and reusable
- Use proper TypeScript types for props
- Implement proper error boundaries

**State Management:**
- Centralize state in Pinia store
- Use actions for all mutations
- Keep getters for derived state
- Subscribe to relevant state only

**Testing:**
- Write tests for new features
- Maintain high coverage
- Test user interactions
- Mock external dependencies

## 📞 Support

For issues or questions:

1. **Check the README** - Most common questions are answered here
2. **Read development guidelines** - See `docs/` for best practices
3. **Review tool documentation** - See `tools/README.md` for GitHub tools
4. **Search existing issues** - Your question might already be answered
5. **Create a GitHub issue** - Use `./tools/create-issue.sh` for bug reports or features

When creating an issue, include:
- Clear description of the problem
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Environment information (BUN version, Node version, OS)
- Error messages or logs
- Screenshots (if applicable)

## 📄 License

This project is licensed under [MIT License](LICENSE) - feel free to use it in your own projects.

## 🙏 Acknowledgments

- **Vue 3** - Progressive JavaScript framework with excellent developer experience
- **TypeScript** - Brings type safety and better IDE support to JavaScript
- **Vite** - Next-generation build tool with incredible speed and DX
- **BUN** - Fast JavaScript runtime and package manager
- **Pinia** - Elegant and lightweight state management
- **Vitest** - Fast unit testing framework
- **Testing Library** - Simple and effective component testing utilities
- **ESLint** - Keeps code quality consistent
- **GitHub Pages** - Free hosting for the live demo

Special thanks to all contributors and the open-source community for making this project possible!

---

**Status**: ✅ Production Ready  
**Last Updated**: November 25, 2025  
**Version**: 0.1.0  
**Maintained by**: [isaaceliape](https://github.com/isaaceliape)
