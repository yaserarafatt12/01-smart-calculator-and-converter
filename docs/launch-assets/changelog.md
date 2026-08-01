# Changelog - Smart Calculator & Unit Converter

All notable changes to this project are documented in this file.

---

## [1.0.1] - 2026-08-01 (Patch & Enhancement Release)

### 🌟 Added
- **Progressive Web App (PWA) Offline Support:** Added web app manifest, offline standalone mode, and an automatic non-intrusive install prompt for mobile devices (iOS Safari & Android Chrome).
- **Multi-Language Support (i18n):** Client-side automatic browser language detection (`en` default / `id`) with a manual `EN | ID` header toggle.
- **Settings & Interactive Guidebook Modal:** Replaced sun/moon icon with a dedicated Settings gear (`⚙️`) button. Features Guest Profile status, theme/language controls, and a 5-point collapsible User Guidebook with a detailed 14-category breakdown.
- **Clear All History Confirmation:** Confirmation modal dialog before wiping calculation history to prevent accidental data loss.

### 🎨 UI & UX Polish
- **Visual 2nd Function Key Highlight:** Amber/yellow tint on `2nd` button with active glowing indicator and dynamic function transformations (`sin⁻¹`, `cos⁻¹`, `tan⁻¹`, `10ˣ`, `eˣ`, `x²`).
- **Eye-Comfort Light Mode Theme:** Soft matte slate color palette (`#cbd5e1` to `#64748b`) designed for eye comfort without bright glare.
- **Mobile Top-Aligned Settings Sheet:** Optimized Settings modal positioning on iPhone screens (`pt-4`, `max-h-[92vh]`).
- **History Panel Action Clarity:** Action buttons updated to `Restore Formula` and `Append Result` with clean single-icon layouts.
- **Human-Friendly Error Toast:** Replaced rigid error boxes with sleek, single-layer human error hints.
- **Fresh Session State:** Initialized clean expression input (`''`) for new user sessions.

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
