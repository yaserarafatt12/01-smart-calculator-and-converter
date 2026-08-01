# System Architecture Specification

**Project Name:** Smart Calculator & Unit Converter  
**Repository:** `01-smart-calculator-and-converter`  
**Architecture Status:** Approved  
**Portfolio Level:** Level 1 (Month 1)  

---

## 1. High-Level Architecture Overview

This application adopts a **Local-First Single Page Application (SPA)** architecture built on Next.js 14 App Router and TypeScript. All mathematical parsing and unit conversion logic are executed 100% client-side within the user's browser. This guarantees instant execution speeds (< 1ms per operation) and absolute data privacy without external backend dependencies.

```mermaid
graph TD
    subgraph Client Layer (Web Browser)
        User[Web / Mobile User] --> UI[React / Next.js UI Components]
        
        subgraph Core Calculation Engines
            Tokenizer[Expression Tokenizer] --> Parser[Shunting-Yard Parser]
            Parser --> Evaluator[Safe AST Math Evaluator]
            UnitEngine[Unit Conversion Engine]
        end
        
        subgraph Local State & Storage
            State[React State Management]
            Storage[(Browser LocalStorage)]
        end
    end

    UI <--> State
    UI --> Tokenizer
    UI --> UnitEngine
    Evaluator --> UI
    State <--> Storage
```

---

## 2. Main Data Flow

### 2.1 Mathematical Expression Evaluation Flow
1. **User Input:** The user taps keypads or types formulas via keyboard (e.g., `sin(30) + 15 * 2`).
2. **Tokenization:** `lib/calculator/math-parser.ts` breaks the input string into structured tokens (Numbers, Operators, Functions, Parentheses).
3. **Parsing:** The parser converts infix tokens into Reverse Polish Notation (RPN) / Abstract Syntax Tree (AST) via Dijkstra's Shunting-Yard algorithm.
4. **Safe Evaluation:** The evaluator executes operations mathematically without JavaScript `eval()`.
5. **State & Display Update:** Results update `React State`, render on display, and write to `LocalStorage`.

### 2.2 Unit Conversion Flow
1. User selects a category (Length, Weight, Temperature, Area, Volume, Time, Speed, Digital Data, etc.).
2. User enters a source value, selecting source and target units.
3. `lib/converter/unit-conversion.ts` converts source value to a standardized base unit (e.g., meters for length) and computes the target unit value.
4. Converted values update in real-time as inputs change.

---

## 3. Directory Structure & Modularity

```
01-smart-calculator-and-converter/
├── app/                  # Next.js App Router Pages & Layouts
│   ├── layout.tsx        # Global Layout (PWA Manifest, Viewport)
│   ├── page.tsx          # Main Application Entry Page
│   └── globals.css       # Tailwind CSS & Design System
├── components/           # UI Components (Atomic Pattern)
│   ├── ui/               # Reusable primitives & PWA Prompts
│   ├── calculator/       # Keypad, Display, Mode Toggles
│   ├── converter/        # Unit converter category selector & inputs
│   ├── settings/         # Settings & Interactive Guidebook Modal
│   └── history/          # History drawer & memory display
├── lib/                  # Core Math Logic & Utilities
│   ├── calculator/       # Tokenizer, Shunting-Yard Parser, Error Messages
│   ├── converter/        # Unit conversion formulas & categories
│   ├── i18n/             # Translations & Browser Auto-Detection
│   └── storage/          # LocalStorage wrappers & history manager
├── tests/                # Automated Test Suites
│   └── unit/             # 84 Vitest unit test suites
├── docs/                 # Professional Documentation (PRD, Architecture, Privacy)
└── public/               # Static assets & PWA Manifest
```

---

## 4. Architecture Security

- **Zero `eval()`:** All math expressions are parsed via a custom Shunting-Yard AST Parser to prevent code injection vulnerabilities.
- **Input Sanitization:** Input strings are validated against non-mathematical syntax before parsing.
- **Environment Isolation:** Zero external secret credentials needed for client-side local-first operations.

---

## 5. Scalability & Performance

- **Zero Network Latency:** Calculation execution is 100% local and instantaneous.
- **Code Splitting & Lazy Loading:** Modal overlays and converter views load dynamically to maintain small bundle sizes (< 130KB initial JS).
- **Memoization:** Mathematical calculation routines are memoized using `useCallback` to prevent unnecessary UI re-renders.
