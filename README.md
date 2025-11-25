#  ⌨️ Typee
This project aims to be a tool for practising touch typing.

## ⚙️ Features
* Errors count
* Words typed counter

## 🚀 Demo
Live demo [isaaceliape.github.io/typee](https://isaaceliape.github.io/typee)

![Example](https://raw.githubusercontent.com/isaaceliape/typing_tool/master/src/assets/example.png)

## Prerequisites

This project requires **BUN** as the package manager. BUN is a modern JavaScript runtime and package manager that's significantly faster than NPM.

### Install BUN
- Visit [bun.sh](https://bun.sh) to install BUN for your system
- Verify installation: `bun --version`

## Project Setup

### Install Dependencies
```bash
bun install
```

### Development

Start the Vite development server with hot module replacement:
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

### Code Quality

Run ESLint checks:
```bash
bun run lint
```

Run unit tests:
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

## Performance

This project uses BUN instead of NPM for:
- **~10x faster** dependency installation
- **Unified tooling** for package management and script execution
- **Native TypeScript support** out of the box
- **Improved build times** and development experience

