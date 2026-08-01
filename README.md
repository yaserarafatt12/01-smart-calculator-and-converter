# Smart Calculator & Unit Converter v1.0.0

> A high-precision, Local-First scientific calculator & 14+ unit converter web application built with Next.js 14, TypeScript, Tailwind CSS, and a custom Shunting-Yard AST parser (Zero `eval()`).

---

## 📌 Project Status: `v1.0.0 (Release Frozen)`

- 🌐 **Live Application:** [https://smart-calculator-and-converter.vercel.app](https://smart-calculator-and-converter.vercel.app)
- 💻 **GitHub Repository:** [https://github.com/yaserarafatt12/01-smart-calculator-and-converter](https://github.com/yaserarafatt12/01-smart-calculator-and-converter)
- ✅ **Core Implementation:** 100% Complete & Stable
- ✅ **Unit Test Coverage:** 84/84 Vitest Unit Tests Passing (100%)
- ✅ **Responsiveness & Accessibility:** Verified on 320px, 360px, 390px, and 768px+ screens
- ✅ **Security & Privacy:** 100% Local-First (In-Browser Storage), Zero `eval()`, Zero Ad Trackers

---

## 💡 The Problem

Standard web calculators and online unit converters suffer from critical flaws:
1. **Ad-Riddled & Slow:** Free commercial unit conversion websites are cluttered with heavy third-party display ads, tracking scripts, and pop-ups that degrade productivity.
2. **OS Calculator Limitations:** Desktop and mobile OS calculators lack multi-category unit converters or interactive calculation histories that allow restoring formulas.
3. **Security Vulnerabilities (`eval()` Usage):** Basic calculator web apps frequently rely on JavaScript's dangerous `eval()` function, exposing vulnerability risks (XSS / Code Injection) and failing ungracefully on syntax errors or division by zero.
4. **Network Dependence:** Many converter tools require active internet connections even for basic static unit conversions (e.g., meters to feet).

---

## ⚡ The Solution

**Smart Calculator & Unit Converter** delivers a modern, lightweight, fast, and 100% secure calculation suite:
- **Custom Math Evaluation Engine:** Built with a standalone Lexer, Tokenizer, and Dijkstra's Shunting-Yard AST Parser. Zero `eval()`, zero security risks.
- **Dual-Mode Keypad Architecture:**
  - **Default Mode:** Clean, large touch-friendly buttons for everyday arithmetic.
  - **Complete Mode:** A 4-column 9-row scientific keypad following professional scientific calculator hierarchy (AC, C, ⌫ at Row 1) with an active `2nd` mode (`sin` $\rightarrow$ `sin⁻¹`, `log` $\rightarrow$ `10ˣ`, `ln` $\rightarrow$ `eˣ`, `√x` $\rightarrow$ `x²`).
- **14+ Unit Converter Categories:** Real-time conversion across Length, Weight & Mass, Temperature, Area, Volume, Time, Speed, Digital Data, Energy, Power, Pressure, Angle, Frequency, and Fuel.
- **Interactive Calculation History:** Saved locally in browser `LocalStorage` with explicit **"↗ Restore Formula"** and **"+ Append Result"** actions.
- **Auto-Detect i18n:** Automatically detects browser language (English / Indonesian) with a manual `EN | ID` header toggle.

---

## 🚀 Key Features

- [x] **High-Precision Scientific Engine:** Arithmetic (`+`, `-`, `×`, `÷`), trigonometry (`sin`, `cos`, `tan`, `sin⁻¹`, `cos⁻¹`, `tan⁻¹`), logarithms (`log`, `ln`, `10ˣ`, `eˣ`), exponents (`^`), roots (`√x`), squaring (`x²`), and nested parentheses.
- [x] **Visual 2nd Function Key:** Amber glow active state with dynamic function label transformations.
- [x] **14+ Conversion Categories:** Length, Weight, Temperature, Area, Volume, Time, Speed, Digital Data, Energy, Power, Pressure, Angle, Frequency, Fuel.
- [x] **Real-Time Unit Search:** Instantly query units across all categories via the search bar.
- [x] **All Results Drawer:** View side-by-side conversions for all units within a category simultaneously.
- [x] **Memory & History Management:** `MC`, `MR`, `Ans` keys and an interactive history bottom sheet with modal confirmation before clearing all entries.
- [x] **Safe AST Parser:** Zero `eval()` execution with division-by-zero protection and inline syntax error highlights.
- [x] **Responsive & Accessible Design:** Dark/Light mode support, fluid layout adaptivity from 320px mobile screens to desktop.
- [x] **Multi-Language (i18n):** Client-side browser auto-detection (English / Indonesian) with manual `EN | ID` toggle.

---

## 🧪 Testing & Code Quality

This project is backed by comprehensive automated unit tests using **Vitest**:

```bash
# Run 84 Vitest Unit Tests
npm test
```

### Unit Test Summary:
- `tests/unit/math-parser.test.ts`: **26/26 Passed**
- `tests/unit/scientific-calculator.test.ts`: **15/15 Passed**
- `tests/unit/unit-conversion.test.ts`: **29/29 Passed**
- `tests/unit/advanced-converter.test.ts`: **10/10 Passed**
- `tests/unit/history-storage.test.ts`: **4/4 Passed**
- **Total: 84/84 Passed (100%)**

---

## 🔒 Security & Privacy Audit

1. **Zero `eval()` execution:** All math string expressions are tokenized and parsed into RPN AST trees, making code injection or XSS attacks impossible.
2. **Zero Credentials in Git:** `.env.local` and sensitive credentials are excluded via `.gitignore`.
3. **Local-First Privacy:** Calculation history and memory reside exclusively within the user's browser `LocalStorage`. No external databases or user tracking servers.
4. **Vercel Security Headers:** Equipped with `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `X-XSS-Protection: 1; mode=block`.

---

## 💻 Local Installation

```bash
# 1. Clone repository
git clone https://github.com/yaserarafatt12/01-smart-calculator-and-converter.git
cd 01-smart-calculator-and-converter

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 License

Distributed under the [MIT License](LICENSE).
