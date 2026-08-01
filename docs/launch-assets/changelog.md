# Changelog - Smart Calculator & Unit Converter

All notable changes to this project are documented in this file.

---

## [1.0.1] - 2026-08-01 (Patch & User Feedback Release)

### 🌟 Added
- **Multi-Language Support (i18n):** Client-side automatic browser language detection (`en` default / `id`) with manual header globe switcher `EN | ID`.
- **Settings & Interactive Guidebook Modal:** Replaced top-right sun/moon icon with a dedicated Settings gear (`⚙️`) button. Includes Guest Profile status, theme/language controls, and a 5-point collapsible User Guidebook with detailed breakdown of all 14 unit categories.
- **Clear All History Confirmation:** Confirmation modal dialog before wiping calculation history to prevent accidental data loss.

### 🎨 UI & UX Improvements
- **2nd Function Key Visual Highlight:** Amber/yellow tint on `2nd` button right from the start with glowing active indicator and dynamic function transformations (`sin⁻¹`, `cos⁻¹`, `tan⁻¹`, `10ˣ`, `eˣ`, `x²`).
- **History Panel Action Clarity:** Clarified action text to `Restore Formula` / `Muat Ulang Rumus` and `Append Result` / `Sisipkan Hasil` with clean single-icon action buttons.
- **Converter Layout & Selection:** Kept category grid open when selecting units without auto-collapse and increased vertical spacing above conversion inputs for a relaxed, breathable bottom layout.
- **Human-Friendly Error Toast:** Replaced robotic error boxes with sleek, single-layer human error hints.
- **Light Mode High-Contrast Background:** Updated Light Mode background to crisp off-white light slate (`#f8fafc` to `#f1f5f9`) for high contrast readability.
- **Fresh Session State:** Cleared initial placeholder expressions (`0` / clean input) for new user sessions.

### 🧪 Quality & Tests
- **Vitest Unit Tests:** All 84/84 tests passing 100%.

---

## [1.0.0] - 2026-08-01 (Initial Release)

### 🚀 Added
- **Scientific Calculator Engine:** Custom Shunting-Yard AST Parser with zero `eval()`. Supports basic arithmetic, trigonometry, logarithms, roots, and nested parentheses.
- **Dual Application Modes:** Default Mode (large touch-friendly arithmetic) & Complete Mode (4-column scientific hierarchy).
- **14+ Unit Categories:** Length, Weight, Temperature, Area, Volume, Time, Speed, Digital Data, Energy, Power, Pressure, Angle, Frequency, Fuel.
- **Local-First History & Memory:** Persistent browser `LocalStorage` for history and calculator memory (`MC`, `MR`, `Ans`).
- **Responsive Chassis:** iPhone & Android mobile chassis styling with glassmorphism effects.
