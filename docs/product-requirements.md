# Product Requirements Document (PRD)

**Project Name:** Smart Calculator & Unit Converter  
**Version:** 1.0.1  
**Date:** 2026-08-01  
**Portfolio Level:** Level 1 — Core Programming Logic & UI State Management  

---

## 1. Product Summary

**Smart Calculator & Unit Converter** is an interactive web application that combines a high-precision scientific calculator with a versatile 14+ category unit conversion system. Built with a *Local-First* architecture, the application prioritizes safe mathematical evaluation without `eval()`, robust error handling, a responsive modern interface, and persistent local calculation history.

---

## 2. Problem Statement

Standard OS calculators and free online unit converters suffer from key limitations:
1. **Cluttered & Ad-Riddled UI:** Commercial conversion websites are loaded with heavy display ads, tracking scripts, and pop-ups that hinder user productivity.
2. **Limited History Capabilities:** Users lose previous calculation steps when switching modes or refreshing the page.
3. **Evaluation Security Risks:** Basic web calculators frequently use JavaScript's dangerous `eval()` function, posing code injection risks and failing ungracefully on syntax errors or division by zero.
4. **Network Dependency:** Most conversion tools require active internet connections even for static unit calculations (e.g., meters to feet).

---

## 3. Goals

- Build a custom math evaluation engine based on tokenization and Shunting-Yard AST parsing that is 100% safe without `eval()`.
- Provide a comprehensive unit conversion module covering Length, Weight, Temperature, Area, Volume, Time, Speed, Digital Data, Energy, Power, Pressure, Angle, Frequency, and Fuel.
- Offer persistent calculation history saved locally in browser `LocalStorage`.
- Ensure a responsive interface supporting Dark/Light mode and WCAG AA accessibility standards.
- Maintain 100% pass rate on 84 automated Vitest unit tests covering math evaluation and unit conversion.

---

## 4. Non-Goals

- 3D interactive graph plotting (deferred to future iterations).
- Cloud-based user authentication or centralized database history storage (app focuses on privacy-first local operation).

---

## 5. Target Persona & User Stories

### Target Audience
- **Students & Academics:** Require scientific calculators for physics, mathematics, and chemistry along with unit conversions.
- **Developers & Engineers:** Require instant digital data size conversions (Byte, KB, MB, GB, TB) and high-precision calculations.
- **General Users:** Require a fast, ad-free daily calculator accessible on mobile and desktop.

### User Stories
- **US-01:** As a student, I want to input nested mathematical expressions with parentheses so I can calculate complex equations accurately.
- **US-02:** As a user, I want to view my calculation history so I can restore previous formulas or append results without re-typing.
- **US-03:** As a developer, I want to convert file sizes across digital units instantly to calculate memory allocation.
- **US-04:** As a mobile user, I want a touch-friendly interface with Dark/Light theme support and PWA offline capabilities.

---

## 6. Functional Requirements

### 6.1 Scientific Calculator Engine
- Basic arithmetic (`+`, `-`, `×`, `÷`, `%`).
- Advanced functions (`sin`, `cos`, `tan`, `sin⁻¹`, `cos⁻¹`, `tan⁻¹`, `log`, `ln`, `10ˣ`, `eˣ`, `√x`, `x²`, `x^y`, `n!`).
- Memory keys (`MC`, `MR`, `M+`, `M-`, `Ans`).
- Angle modes (`DEG` / `RAD`).
- Custom Shunting-Yard parser returning explicit syntax error indices.

### 6.2 Unit Converter Module
- 14+ unit categories: Length, Weight, Temperature, Area, Volume, Time, Speed, Digital Data, Energy, Power, Pressure, Angle, Frequency, Fuel.
- Real-time unit search bar.
- "All Results" drawer view.

### 6.3 History & Local-First Storage
- Save up to 20 recent transactions locally in `LocalStorage`.
- Actions to "Restore Formula" into display or "Append Result" into ongoing calculation.

---

## 7. Non-Functional Requirements

- **Performance:** Page load under 1 second, calculation response time under 16ms (60 FPS).
- **Security:** Zero `eval()`, zero third-party trackers, zero external telemetry.
- **Offline:** 100% offline capability via Progressive Web App (PWA) manifest.
