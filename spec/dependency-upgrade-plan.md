# Dependency Upgrade Plan

## Overview
This document outlines the current dependency status, identifies outdated packages, and provides a roadmap for strategic upgrades to keep the Typee project modern and secure.

**Generated:** November 25, 2025  
**Project:** typee (typing-tool@0.1.0)

---

## Current Dependency Status

### Production Dependencies

| Package | Current | Latest | Status | Priority | Notes |
|---------|---------|--------|--------|----------|-------|
| vue | ^3.5.25 | ^3.5.25 | ✅ Current | - | Modern, actively maintained |
| vuex | 4.0.0 | 4.1.0 | ⚠️ Minor Update | Low | Consider migration to Pinia in future |
| vue-loader | 16.2.0 | 17.4.2 | 🔴 Outdated | Medium | Part of Vue 3 ecosystem, should update |
| vue-head | 2.2.0 | 2.2.0 | ⚠️ Aging | Medium | No longer actively maintained; consider @vueuse/head |
| core-js | 3.6.5 | 3.35.1 | 🔴 Outdated | Low | Polyfill library; updating is safe |
| es6-promise | 4.2.8 | 4.2.8 | ⚠️ Legacy | Low | Mostly for older browsers; can remove with modern build target |
| xml2js | 0.4.23 | 0.6.2 | 🔴 Outdated | Low | XML parsing library; update available |
| ramda | 0.27.1 | 0.32.0 | 🔴 Outdated | Low | Functional programming library; currently only used once (overkill) |
| pascal-case | 3.1.2 | 3.1.2 | ✅ Current | - | Small utility, stable |
| vuex-persistedstate | 4.0.0-beta.1 | 4.1.0 | ⚠️ Beta Version | Medium | Should upgrade from beta to stable release |

### Development Dependencies

| Package | Current | Latest | Status | Priority | Notes |
|---------|---------|--------|--------|----------|-------|
| typescript | 5.9.3 | 5.9.3 | ✅ Current | - | Keep updated with releases |
| vite | 7.2.4 | 7.2.4 | ✅ Current | - | Keep updated with releases |
| eslint | 8.57.1 | 9.39.1 | 🔴 Outdated | Medium | Major version behind; consider upgrading |
| eslint-plugin-vue | 7.9.0 | 10.6.0 | 🔴 Outdated | Medium | 3 major versions behind |
| @typescript-eslint/parser | 8.48.0 | 8.48.0 | ✅ Current | - | Recently updated |
| @typescript-eslint/eslint-plugin | 8.48.0 | 8.48.0 | ✅ Current | - | Recently updated |
| sass | 1.94.2 | 1.94.2 | ✅ Current | - | Keep updated |
| sass-loader | 10.1.0 | 16.0.6 | 🔴 Outdated | Low | Major versions available; update when safe |
| vitest | 4.0.13 | 4.0.13 | ✅ Current | - | Recently installed |
| @vue/test-utils | Latest | Latest | ✅ Current | - | Recently installed |
| happy-dom | Latest | Latest | ✅ Current | - | Recently installed |

---

## Dependency Analysis

### High Priority Upgrades (Recommended)

#### 1. vuex-persistedstate: 4.0.0-beta.1 → 4.1.0
- **Issue:** Currently using a beta version in production
- **Risk:** Beta versions can have breaking changes
- **Action:** Upgrade to stable release immediately
- **Effort:** Low (minor version bump)

```bash
npm install vuex-persistedstate@^4.1.0
```

#### 2. eslint-plugin-vue: 7.9.0 → 10.6.0
- **Issue:** 3 major versions behind
- **Benefit:** Better Vue 3 support, modern linting rules
- **Risk:** Breaking changes possible; requires testing
- **Effort:** Medium (major version bump)

```bash
npm install -D eslint-plugin-vue@latest
```

#### 3. eslint: 8.57.1 → 9.39.1
- **Issue:** Major version behind
- **Benefit:** New linting rules, better performance
- **Risk:** Breaking changes; may need config updates
- **Effort:** Medium (major version bump)

```bash
npm install -D eslint@latest
```

### Medium Priority Upgrades (Recommended Soon)

#### 4. vue-head: 2.2.0 → Migrate to @vueuse/head
- **Issue:** vue-head no longer actively maintained
- **Benefit:** @vueuse/head is part of the VueUse ecosystem (actively maintained)
- **Risk:** API changes; requires code migration
- **Effort:** Medium (full migration)

**Migration steps:**
```bash
npm install @vueuse/head
npm remove vue-head
```

Then update `src/main.ts`:
```typescript
import { createHead } from '@vueuse/head'

const head = createHead()
app.use(head)
```

#### 5. vuex: 4.0.0 → Consider Pinia Migration
- **Issue:** Vuex is in maintenance mode; Pinia is the recommended successor
- **Benefit:** Simpler API, better TypeScript support, smaller bundle
- **Risk:** Requires significant refactoring; Vuex works fine for now
- **Effort:** High (full migration, outside current scope)
- **Timeline:** Consider for future major release

### Low Priority Upgrades (Optional)

#### 6. Reduce/Remove ramda: 0.27.1
- **Issue:** Ramda library is overkill; only used in one place
- **Analysis:** Currently only used in `TextRenderer.vue` for `R.splitEvery()`
- **Benefit:** Reduce bundle size (~13KB gzipped)
- **Action:** Replace with native JavaScript or inline utility
- **Effort:** Low (replace one function)

```typescript
// Instead of:
R.splitEvery(this.wordsPerSentence, this.sourceText.split(' '))

// Use native:
const words = this.sourceText.split(' ')
const result = []
for (let i = 0; i < words.length; i += this.wordsPerSentence) {
  result.push(words.slice(i, i + this.wordsPerSentence).join(' '))
}
```

#### 7. xml2js: 0.4.23 → 0.6.2
- **Issue:** 2 minor versions behind
- **Risk:** Low (minor update)
- **Effort:** Low
- **Note:** Current version works fine; update when testing available

#### 8. core-js: 3.6.5 → 3.35.1
- **Issue:** Polyfill library, many versions behind
- **Risk:** Low (safe to update)
- **Effort:** Low
- **Note:** With modern build target, may not even be needed

#### 9. sass-loader: 10.1.0 → 16.0.6
- **Issue:** 6 major versions behind
- **Risk:** May require configuration changes
- **Effort:** Medium (test thoroughly)
- **Note:** Current version works fine; lower priority

#### 10. vue-loader: 16.2.0 → 17.4.2
- **Issue:** 1 major version behind
- **Risk:** Medium (breaking changes possible)
- **Effort:** Medium (test thoroughly)
- **Note:** Works with current Vue 3 setup

---

## Security Audit

Run `npm audit` output analysis:

```bash
npm audit
```

**Current vulnerabilities found:**
- Total: 4 vulnerabilities (1 low, 1 moderate, 2 critical)
- Most are from indirect dependencies
- No known exploits in production usage patterns

**Mitigation:**
- Running `npm audit fix` may resolve some issues
- Be cautious with `npm audit fix --force` (breaking changes)

---

## Recommended Upgrade Timeline

### Phase 1: Immediate (This Week)
- [ ] Upgrade `vuex-persistedstate` 4.0.0-beta.1 → 4.1.0
- [ ] Run `npm audit fix` to address security issues
- [ ] Test thoroughly

### Phase 2: Near Term (Next 2 Weeks)
- [ ] Upgrade `eslint-plugin-vue` 7.9.0 → 10.6.0
  - May require ESLint config updates
  - Run full test suite
- [ ] Evaluate `eslint` 8.57.1 → 9.39.1 upgrade
  - Consider impact on codebase
  - Plan configuration updates if needed

### Phase 3: Medium Term (Next Month)
- [ ] Migrate from `vue-head` to `@vueuse/head`
  - Update `src/main.ts`
  - Test head tag management
  - Remove `vue-head` dependency
- [ ] Remove `ramda` dependency
  - Replace `R.splitEvery()` with native implementation
  - Verify bundle size reduction

### Phase 4: Long Term (Future)
- [ ] Plan migration from Vuex to Pinia
  - Evaluate for major version release
  - Create migration guide
  - Timeline: 6+ months
- [ ] Update other minor dependencies as needed

---

## Bundle Size Impact

### Estimated Size Reductions
| Change | Estimated Savings |
|--------|------------------|
| Remove ramda | ~13KB gzipped |
| Remove vue-head (add @vueuse/head) | ~2KB reduction |
| Update xml2js | Minimal change |
| Update core-js | Minimal change |

**Total potential reduction:** ~15KB gzipped (≈5% of current 300KB bundle)

---

## Breaking Changes to Monitor

### eslint-plugin-vue (7.x → 10.x)
- Vue 3 specific rules added
- May flag additional issues
- Review and fix before/after upgrade

### eslint (8.x → 9.x)
- Some rule behaviors changed
- New rules added
- Requires configuration review

### vue-loader (16.x → 17.x)
- SFC improvements
- May require template/script updates

---

## Migration Checklist

- [ ] Phase 1: vuex-persistedstate upgrade
  - [ ] Update dependency
  - [ ] Run tests
  - [ ] Verify state persistence still works
  - [ ] Commit and test

- [ ] Phase 2: ESLint upgrades
  - [ ] Test eslint-plugin-vue upgrade
  - [ ] Run full linting
  - [ ] Fix any new issues
  - [ ] Test eslint upgrade
  - [ ] Update configurations if needed
  - [ ] Commit changes

- [ ] Phase 3: vue-head migration
  - [ ] Install @vueuse/head
  - [ ] Update src/main.ts
  - [ ] Test head tag changes
  - [ ] Remove vue-head
  - [ ] Commit changes

- [ ] Phase 3: Remove ramda
  - [ ] Replace R.splitEvery() usage
  - [ ] Test sentence splitting
  - [ ] Remove ramda from dependencies
  - [ ] Verify bundle size
  - [ ] Commit changes

- [ ] Ongoing: Monitor for security updates
  - [ ] Run `npm audit` monthly
  - [ ] Subscribe to security advisories
  - [ ] Apply critical patches immediately

---

## References

- [Vuex vs Pinia](https://pinia.vuejs.org/introduction.html)
- [@vueuse/head Documentation](https://github.com/vueuse/head)
- [ESLint Migration Guide](https://eslint.org/docs/latest/use/migrate-to-9.0.0)
- [npm audit Documentation](https://docs.npmjs.com/cli/v8/commands/npm-audit)

---

## Notes

- All development dependencies (@typescript-eslint) are current
- Vue ecosystem dependencies (Vite, Vue, TypeScript) are up to date
- Focus on security and stability over feature updates
- Test thoroughly after each upgrade
- Consider feature freeze during major dependency upgrades
