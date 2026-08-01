# Architectural Decision Records (ADR)

**Project Name:** Smart Calculator & Unit Converter  
**Repository:** `01-smart-calculator-and-converter`  

---

## ADR-001: Adoption of Custom Shunting-Yard AST Parser vs `eval()`

### Status
Accepted

### Context
Evaluating mathematical expressions in JavaScript requires a parsing mechanism. The naive approach uses `eval()` or `Function()`, which introduces severe security vulnerabilities (XSS, arbitrary code execution) and fails ungracefully on syntax errors.

### Decision
We designed a custom two-stage mathematical engine in TypeScript (`lib/calculator/math-parser.ts`):
1. **Lexer/Tokenizer:** Scans string input into typed tokens (Number, Operator, Function, Parentheses).
2. **Shunting-Yard Parser:** Transforms infix notation into Reverse Polish Notation (RPN) and evaluates expressions safely.

### Consequences
- **Positive:** 100% immune to XSS / code injection attacks, detailed syntax error indexing, division-by-zero detection.
- **Negative:** Requires initial effort to write unit tests for operator precedence (resolved via 26 Vitest test cases).

---

## ADR-002: Dual-Mode Keypad Architecture (Default vs Complete)

### Status
Accepted

### Context
Users fall into two main groups: casual users wanting simple large-button arithmetic, and students/engineers requiring scientific functions. Packing all scientific keys into a single screen causes layout clutter.

### Decision
We created two distinct UI modes accessible via a header toggle pill:
1. **Default Mode:** Large, comfortable arithmetic keypads.
2. **Complete Mode:** A 4-column 9-row scientific layout with an active `2nd` key toggle.

### Consequences
- **Positive:** Maximum ergonomics for both casual arithmetic and complex scientific tasks.

---

## ADR-003: Local-First Browser Storage Strategy

### Status
Accepted

### Context
Users expect calculation history to persist between browser sessions without requiring account creation or cloud database infrastructure.

### Decision
Utilize browser `LocalStorage` API wrappers with fallbacks for memory and calculation history management up to 20 items.

### Consequences
- **Positive:** Zero server cost, 100% user privacy, instant offline availability.
