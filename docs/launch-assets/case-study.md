# Case Study: Building a High-Precision Scientific Calculator & Unit Converter

> **Project:** Smart Calculator & Unit Converter v1.0.0  
> **Role:** Lead Software Engineer & UX Designer (Solo Project)  
> **Target Audience:** Students, STEM Professionals, & Everyday Web Users  
> **Deliverable:** Live Web Application, Open-Source Repository, and Technical Documentation  

---

## 1. Background & Vision

Standard web-based calculators often fail at balancing simplicity and technical power. Built-in OS calculators provide basic functions, while dedicated online unit converters are burdened with invasive third-party ads and trackers. 

My goal was to design and engineer a **Local-First, Zero-Ad, High-Precision Web Calculator & Unit Converter** that delivers an Apple-grade fluid user experience on both mobile devices and desktop computers.

---

## 2. Key Challenges & Architectural Solutions

### Challenge A: Evaluating Mathematical Expressions Securely (No `eval()`)
- **Problem:** Using JavaScript’s `eval()` function introduces critical Security Vulnerabilities (XSS / Code Injection) and fails ungracefully on syntax errors.
- **Solution:** Implemented a custom compiler pipeline featuring:
  1. **Lexer & Tokenizer (`tokenizer.ts`):** Converts raw expression strings into strongly typed mathematical tokens (numbers, operators, functions, parentheses).
  2. **Shunting-Yard Parser (`parser.ts`):** Converts Infix notation to Reverse Polish Notation (RPN) using Dijkstra's algorithm while respecting operator precedence.
  3. **AST Evaluator (`math-parser.ts`):** Evaluates RPN stacks safely and traps division-by-zero or domain errors with explicit error objects (`{ success: false, error: 'SYNTAX_ERROR' }`).

### Challenge B: Floating-Point Arithmetic Precision
- **Problem:** Native JavaScript IEEE-754 arithmetic yields precision anomalies such as `0.1 + 0.2 = 0.30000000000000004`.
- **Solution:** Designed a dual-representation state model:
  - **Internal Raw Precision State:** Retains exact floating-point / Decimal representations.
  - **Display Formatting Layer (`Display.tsx`):** Formats numbers with localized thousands separators and controlled decimal places (e.g. `125.568,357852`) while the **"Salin / Copy"** action copies the exact raw unrounded value (`125568.35785198557`).

### Challenge C: Ergonomic Keypad Hierarchy & Responsive Adaptation
- **Problem:** Fitting 20 scientific keys alongside numbers on 320px mobile screens without button clipping or visual clutter.
- **Solution:**
  - Designed **Mode Default** for large touch targets (`h-14 sm:h-16`).
  - Designed **Mode Lengkap** as a unified 4-column bento grid following physical scientific calculator standards (placing `AC`, `C`, and `⌫` at Row 1 directly below the result card).
  - Added an active `2nd` mode with visual amber glows that transforms function keys (`sin` $\rightarrow$ `sin⁻¹`, `log` $\rightarrow$ `10ˣ`, `ln` $\rightarrow$ `eˣ`, `√x` $\rightarrow$ `x²`).

---

## 3. User Testing & Iterative Feedback Loops

During the initial soft-launch phase with early testers, key UX insights led to vital improvements:

1. **Feedback 1 (Converter Layout Push):** Expanding all categories pushed the conversion form off-screen.
   - *Fix:* Wrapped categories in a scrollable `max-h-60` container and retained open category highlighting without disruptive auto-collapsing.
2. **Feedback 2 (History Action Clarity):** Users were unsure what clicking history items did.
   - *Fix:* Replaced ambiguous icons with explicit action buttons: **`↗ Muat Ulang Rumus`** (*Restore Formula*) and **`+ Sisipkan Hasil`** (*Append Result*).
3. **Feedback 3 (Accidental History Clearing):** Users accidentally cleared history with one click.
   - *Fix:* Added an explicit modal confirmation dialog before clearing all history.

---

## 4. Key Takeaways & Future Roadmap

### Technical Lessons Learned:
- **Parser Design:** Building an AST parser from scratch provides deep insights into formal grammars, tokenization, and algorithm complexity ($O(N)$ RPN evaluation).
- **Internationalization (i18n):** Building client-side browser language detection (`navigator.language`) ensures immediate usability for global users.
- **Test-Driven Rigor:** Writing 84 Vitest unit tests ensured 0 regressions when refactoring layout hierarchies.

### Future Roadmap (Version 2.0 Considerations):
- Financial compound interest calculators
- Currency converter with daily offline-cached API fallback
- Graphing mode for 2D function plotting
