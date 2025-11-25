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

## GitHub Issues

The **GitHub Issues** is the single source of truth for project status, priorities, and task assignments. Always:
- Check GitHub Issues before starting work to understand current priorities
- Refer to issues to understand task context, dependencies, and acceptance criteria
- Use issues to coordinate with other team members and avoid duplicate work
- Update issue status and labels as work progresses

To manage issues, use the tools in `tools/` directory:
- `./tools/create-issue.sh -t <TITLE> -p <PRIORITY> [options]` - Create new issue with priority prefix
- `./tools/get-issue-by-id.sh <number>` - View specific issue details
- `./tools/get-all-issues.sh [options]` - List and filter issues
- `./tools/update-issue-by-id.sh <number> [options]` - Modify issue properties
- `./tools/close-issue-by-id.sh <number> [options]` - Close issues

See `tools/README.md` for full documentation and examples.

## Commands
- **Dev**: `npm run dev` - Start Vite development server (http://localhost:5173/)
- **Build**: `npm run build` - Build for production using Vite
- **Preview**: `npm run preview` - Preview production build locally (http://localhost:4173/)
- **Lint**: `npm run lint` - Run ESLint checks
- **Test**: `npm test` - Run Vitest tests. Run single test: `npm test -- <test-file>`

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
- **Imports**: Use ES6 imports; group by type (Pinia, helpers, components)
- **Naming**: camelCase for variables/functions, PascalCase for components/store actions
- **Formatting**: 2-space indentation; no semicolons; single quotes
- **Types**: Use TypeScript types; use interfaces for complex objects
- **Error Handling**: Use try/catch for async operations; log errors to console
- **Vue Components**: Use Composition API with `<script setup>`; computed for derived state; functions for actions
- **Store (Pinia)**: camelCase state properties; getters as computed properties; actions for mutations
- **Styling**: SCSS in components; avoid global styles; use BEM-like class naming