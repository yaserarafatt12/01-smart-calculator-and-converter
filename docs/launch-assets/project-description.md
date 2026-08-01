# Smart Calculator & Unit Converter v1.0.0 — Project Overview

> A high-precision, Local-First scientific calculator & 14+ unit converter web application built with Next.js 14, TypeScript, Tailwind CSS, and a custom Shunting-Yard AST parser (Zero `eval()`).

---

## 📌 Executive Summary

- **Project Name:** Smart Calculator & Unit Converter
- **Version:** `v1.0.0 (Release Frozen)`
- **Developer:** Yaser Arafat
- **License:** MIT
- **Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide React, Vitest
- **Architecture:** Local-First Single Page Application (Client-Side State & Storage)
- **Test Coverage:** 84/84 Vitest Unit Tests Passing (100%)

---

## 💡 The Problem

Standard web calculators and online unit converters suffer from critical usability flaws:
1. **Ad-Riddled & Slow:** Commercial unit conversion websites are cluttered with intrusive display ads and tracking scripts, causing latency and poor user experience.
2. **OS Calculator Limitations:** Built-in desktop/mobile calculators lack comprehensive multi-category unit converters or interactive calculation history that can be restored into formulas.
3. **Security Risks (`eval()` Usage):** Basic web calculators use JavaScript's dangerous `eval()` function, exposing vulnerabilities to code injection and failing silently on syntax errors or division by zero.
4. **Network Dependency:** Most converter apps require an active internet connection even for basic static unit conversions (e.g., meters to kilometers).

---

## ⚡ The Solution

**Smart Calculator & Unit Converter** is designed with a **Privacy-First, Offline-First** philosophy:
- **Custom Math Evaluation Engine:** Built with a standalone Lexer, Tokenizer, and Dijkstra's Shunting-Yard AST Parser. Zero `eval()`, zero security risks.
- **Dual Mode Interface:**
  - **Default Mode:** Clean, large touch-friendly buttons for everyday arithmetic.
  - **Complete Mode:** A 4-column 9-row scientific keypad following professional scientific calculator hierarchy (AC/C/Backspace at Row 1) with an active `2nd` mode (trig inverse, exponents, logarithms).
- **14+ Unit Converter Categories:** Real-time conversion across Length, Weight, Temperature, Area, Volume, Time, Speed, Digital Data, Energy, Power, Pressure, Angle, Frequency, and Fuel.
- **Interactive Calculation History:** Saved locally in browser `LocalStorage` with explicit **"↗ Restore Formula"** and **"+ Append Result"** actions.
- **Auto-Detect i18n:** Automatically detects browser language (English / Indonesian) with a manual `EN | ID` header toggle.

---

## 🛠 Tech Stack & Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       React 18 / Next.js 14                     │
├─────────────────────────────────────────────────────────────────┤
│  [Header (Tab / Lang / Theme)]  │  [Display / Result Card]      │
│  [Scientific Keypad (9 Rows)]   │  [Complete Converter (14+)]   │
├─────────────────────────────────────────────────────────────────┤
│  [Tokenizer] ──> [Shunting-Yard Parser] ──> [AST Evaluator]    │
├─────────────────────────────────────────────────────────────────┤
│  [Unit Conversion Engine]      │  [LocalStorage Persistence]    │
└─────────────────────────────────────────────────────────────────┘
```

- **Frontend Framework:** Next.js 14 (App Router, Server Components + Client Hooks)
- **Styling & Motion:** Tailwind CSS, Glassmorphism, CSS Custom Properties, Bezier Transitions
- **Parser Engine:** Custom Shunting-Yard Algorithm ($O(N)$ Infix to RPN Conversion)
- **Unit Testing:** Vitest (84 unit tests covering math evaluation, scientific functions, and unit conversions)
- **Deployment:** Vercel Global Edge Network

---

## 📊 Technical Achievements

1. **Floating Point Precision Handling:** Resolved standard JavaScript floating-point errors (e.g. `0.1 + 0.2 = 0.30000000000000004`) using precision formatting while retaining raw unrounded numbers for copy actions.
2. **Responsive Engineering:** Fluid layout adaptivity across 320px (iPhone SE), 360px, 390px, and 768px+ displays with zero button clipping.
3. **Responsive State Isolation:** Smooth 500ms cross-fade slide transitions between Calculator and Converter modes without destroying state.
