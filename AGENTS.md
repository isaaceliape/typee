# AGENTS.md

## Commands
- **Dev**: `npm run dev` - Start Vite development server (http://localhost:5173/)
- **Build**: `npm run build` - Build for production using Vite
- **Preview**: `npm run preview` - Preview production build locally (http://localhost:4173/)
- **Lint**: `npm run lint` - Run ESLint checks
- **Test**: No tests configured yet; add Vitest for unit tests. Run single test: `npm test -- <test-file>`

## Build System
This project uses **Vite** for fast development and production builds (migrated from Vue CLI).
- TypeScript enabled with Vue 3 support
- SCSS compilation with source maps
- HMR (Hot Module Replacement) in development
- Asset optimization and code splitting in production

## Code Style Guidelines
- **Imports**: Use ES6 imports; group by type (Vuex, helpers, components)
- **Naming**: camelCase for variables/functions, PascalCase for components/mutations
- **Formatting**: 2-space indentation; no semicolons; single quotes
- **Types**: Add TypeScript types after migration; use interfaces for complex objects
- **Error Handling**: Use try/catch for async operations; log errors to console
- **Vue Components**: Use Options API; computed for derived state; methods for actions
- **Store**: camelCase state properties; getters prefixed with 'get'; mutations as 'setProperty' or 'toggleProperty'
- **Styling**: SCSS in components; avoid global styles; use BEM-like class naming