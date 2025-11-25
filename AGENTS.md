# AGENTS.md

## External File Loading

CRITICAL: When you encounter a file reference (e.g., @rules/general.md), use your Read tool to load it on a need-to-know basis. They're relevant to the SPECIFIC task at hand.

Instructions:

- Do NOT preemptively load all references - use lazy loading based on actual need
- When loaded, treat content as mandatory instructions that override defaults
- Follow references recursively when needed

## Development Guidelines

For TypeScript code style and best practices: @docs/typescript-guidelines.md
For Vue 3 component architecture and Composition API patterns: @docs/vue-patterns.md
For REST API design and error handling: @docs/api-standards.md
For testing strategies and coverage requirements: @test/testing-guidelines.md

## General Guidelines

Read the following file immediately as it's relevant to all workflows: @rules/general-guidelines.md

## Kanban Board
The **Typee Kanban board** is the single source of truth for project status, priorities, and task assignments. Always:
- Check the Kanban board before starting work to understand current priorities
- Refer to the board to understand task context, dependencies, and acceptance criteria
- Use the board to coordinate with other team members and avoid duplicate work
- Update task status on the board as work progresses

To view the Kanban board, use: `sh tools/list-kanban-board.sh` or `sh tools/project-status-dashboard.sh`

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

## Documentation
Always update **README.md** after implementing new features to:
- Document the new feature and its purpose
- Include usage examples or instructions
- Update any affected sections (e.g., features list, API documentation)
- Keep the README current and accurate for users and developers

## Code Style Guidelines
- **Imports**: Use ES6 imports; group by type (Vuex, helpers, components)
- **Naming**: camelCase for variables/functions, PascalCase for components/mutations
- **Formatting**: 2-space indentation; no semicolons; single quotes
- **Types**: Add TypeScript types after migration; use interfaces for complex objects
- **Error Handling**: Use try/catch for async operations; log errors to console
- **Vue Components**: Use Options API; computed for derived state; methods for actions
- **Store**: camelCase state properties; getters prefixed with 'get'; mutations as 'setProperty' or 'toggleProperty'
- **Styling**: SCSS in components; avoid global styles; use BEM-like class naming