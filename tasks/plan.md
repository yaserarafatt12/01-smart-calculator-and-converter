# Implementation Plan: Smart Calculator & Unit Converter

## Overview

Build the **Smart Calculator & Unit Converter** web application using Next.js 14, React 18, TypeScript, and Tailwind CSS. The app features a high-precision scientific calculator with a custom safe math parser (zero `eval()`), a 14+ category unit converter, persistent local calculation history (`LocalStorage`), and a responsive Dark/Light theme UI.

## Architecture Decisions

- **ADR-001:** Use a pure TypeScript Tokenizer & Dijkstra's Shunting-Yard Parser (AST Evaluator) without `eval()` for safe expression evaluation.
- **ADR-002:** Local-First architecture utilizing browser `LocalStorage` to persist calculation history and calculator memory without backend server dependencies.
- **ADR-003:** Next.js 14 App Router + Tailwind CSS + Lucide Icons for a fast, modern, accessible interface.

---

## Task List

### Phase 1: Foundation & Core Setup
- [x] Task 1: Project Initialization & Build Configuration (`package.json`, `tsconfig.json`, `tailwind`, `vitest`, `playwright`).
- [x] Task 2: UI Design System & Theme Provider setup (Dark/Light mode switch & primitives).

### Checkpoint: Foundation
- [x] TypeScript & linter configurations error-free.
- [x] Development server `npm run dev` starts cleanly.

### Phase 2: Logic Engines & Components
- [x] Task 3: Implement Math Evaluation Engine (Tokenizer, Parser, Evaluator) & Unit Tests.
- [x] Task 4: Implement Unit Conversion Engine (Length, Weight, Temp, Data, Area, Volume, etc.) & Unit Tests.
- [x] Task 5: Display & Scientific Keypad Components.
- [x] Task 6: Unit Converter Interface & Selector Components.

### Checkpoint: Core Features
- [x] Vitest unit tests pass 100%.
- [x] Core arithmetic & scientific functions fully testable in UI.

### Phase 3: Local Storage, History & Polish
- [x] Task 7: Integrate LocalStorage History Manager & Memory Functions (`MC`, `MR`, `Ans`).
- [x] Task 8: Progressive Web App (PWA) Offline Support & Auto Install Prompts.
- [x] Task 9: Complete 17+ Section Documentation & Production Deployment.

### Checkpoint: Complete
- [x] All Vitest tests pass 100%.
- [x] Documentation complete with zero secret credentials exposed.
- [x] Deployed and live on Vercel & GitHub Releases.
