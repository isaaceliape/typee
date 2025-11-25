# Vite Migration Plan for Typing Tool Project

## Overview
This plan outlines the steps to migrate the Vue 3 + TypeScript project from Vue CLI (webpack) to Vite as the build tool. Vite provides faster development server startup, faster HMR (Hot Module Replacement), and optimized production builds using Rollup.

## Prerequisites
- Node.js 20.19+ or 22.12+
- Project must already be on Vue 3 and TypeScript (already completed)
- Current Vue CLI version 5.x installed

## Step 1: Install Vite and Dependencies
Install Vite and required plugins:
```bash
npm install -D vite @vitejs/plugin-vue @vitejs/plugin-vue-jsx
npm install -D vite-plugin-vue-setup-extend vite-plugin-inspect
```

Install peer dependencies if not already present:
```bash
npm install -D @types/node
npm install -D typescript
```

## Step 2: Create Vite Configuration File
Create `vite.config.ts` in the project root:
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

## Step 3: Update HTML Entry Point
Move `public/index.html` to project root as `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Typing Tool</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

## Step 4: Update package.json Scripts
Replace Vue CLI scripts with Vite commands:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx"
  }
}
```

## Step 5: Update Build Output Configuration
Update `package.json` if using custom build output:
- Current: Builds to `dist/`, then rsync to root
- Vite: Change to build directly to root or adjust as needed

Create post-build script if needed:
```json
{
  "scripts": {
    "build": "vite build && npm run copy-assets"
  }
}
```

## Step 6: Update Environment Variable Handling
Update `.env` file handling:
- Vite uses `VITE_` prefix for environment variables (vs `VUE_APP_` in Vue CLI)
- Import from `import.meta.env` instead of `process.env`

Example:
```typescript
// Old (Vue CLI)
const apiUrl = process.env.VUE_APP_API_URL

// New (Vite)
const apiUrl = import.meta.env.VITE_API_URL
```

## Step 7: Update Static Assets Path
Move static assets from `public/` to proper locations:
- Keep global static files in `public/` (favicon, manifest, etc.)
- Import images/fonts directly in components or styles:
  ```typescript
  import logo from '@/assets/logo.png'
  ```

## Step 8: Update ESLint Configuration
Update `.eslintrc` for Vite projects:
```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended"
  ]
}
```

Ensure ESLint doesn't target `vue-cli-service` artifacts.

## Step 9: Update TypeScript Configuration
Update `tsconfig.json` for Vite compatibility:
```json
{
  "compilerOptions": {
    "types": ["vite/client"],
    "moduleResolution": "bundler"
  }
}
```

## Step 10: Handle Vue CLI Specific Features
Remove or replace Vue CLI specific features:
- Remove `vue.config.js` (no longer needed)
- Update any `@vue/cli-*` imports
- Check for any `process.env.NODE_ENV` usage (Vite handles this)

## Step 11: Update Build Output Handling
Vite configuration for the `www.typee.tools` deployment:
```typescript
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vuex', 'vue-head'],
        }
      }
    }
  }
})
```

## Step 12: Handle CSS/SCSS Processing
Vite has built-in support for CSS/SCSS:
```typescript
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // SCSS options if needed
      }
    }
  }
})
```

## Step 13: Update Import Statements
Ensure all imports are compatible:
- Remove `.js` extensions from imports (Vite resolves automatically)
- Use ES6 module syntax throughout
- Check for CommonJS imports and convert to ES modules

## Step 14: Testing and Validation
Test the migration:
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check for linting errors
```

Verify:
- Development server starts correctly on `http://localhost:5173`
- HMR works (modify a component and see instant updates)
- Production build creates optimized assets
- All components load and function correctly

## Step 15: Clean Up
Remove Vue CLI dependencies and files:
```bash
npm uninstall @vue/cli-service @vue/cli-plugin-* vue-cli-service
rm -f vue.config.js babel.config.js
rm -rf node_modules/.cache
```

## Step 16: Update Documentation
Update project README with:
- New dev/build commands
- Vite-specific configuration notes
- Any new environment variable names (VITE_ prefix)
- Updated contribution guidelines

## Common Issues & Solutions

### Issue: Import paths not resolving
**Solution:** Ensure `@` alias is configured in `vite.config.ts`

### Issue: CSS modules not working
**Solution:** Update CSS imports to use proper Vite CSS module syntax

### Issue: Environment variables not loading
**Solution:** Check for `VITE_` prefix and use `import.meta.env` instead of `process.env`

### Issue: HMR not working
**Solution:** Check `vite.config.ts` server configuration and browser network settings

### Issue: Build output size larger than expected
**Solution:** Configure code splitting and lazy loading in Rollup options

## Deployment Changes
- Vite output is in `dist/` by default (update CI/CD pipelines)
- Update server configuration to serve `dist/index.html` for SPA routing
- Consider enabling gzip/brotli compression for optimal delivery

## Benefits After Migration
- **Faster development**: Vite starts dev server in milliseconds
- **Instant HMR**: Changes reflect immediately without page reload
- **Optimized builds**: Rollup provides better tree-shaking and code splitting
- **Better error messages**: More descriptive compilation errors
- **Native ESM support**: Serves modules natively in development
- **Reduced build time**: Production builds are significantly faster

## Rollback Plan
If issues arise, revert to Vue CLI:
1. Keep `vue.config.js` and webpack config files
2. Reinstall Vue CLI: `npm install -D @vue/cli-service`
3. Change npm scripts back to `vue-cli-service serve/build`
4. Clear Vite configuration and dependencies

## Resources
- [Vite Official Guide](https://vitejs.dev/guide/)
- [Vite Vue Plugin](https://github.com/vitejs/vite-plugin-vue)
- [Vite Config Reference](https://vitejs.dev/config/)
- [Migrating from Vue CLI](https://vitejs.dev/guide/)
- [Vite Features](https://vitejs.dev/guide/features.html)
