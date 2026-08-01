# Changelog — Smart Calculator & Unit Converter

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-08-01

### Added
- **Core Math Engine:** Custom Shunting-Yard AST parser with zero `eval()` dependency.
- **Dual Mode System:** Default Mode (large touch-friendly arithmetic layout) & Complete Mode (4-column scientific bento grid).
- **2nd Function Transformation:** Active mode transformation for `sin⁻¹`, `cos⁻¹`, `tan⁻¹`, `10ˣ`, `eˣ`, `x²` with amber glow indicator.
- **14+ Unit Categories:** Length, Weight/Mass, Temperature, Area, Volume, Time, Speed, Digital Data, Energy, Power, Pressure, Angle, Frequency, and Fuel.
- **Unit Search Bar:** Real-time unit search across all categories.
- **All Results Drawer:** Instant side-by-side conversion for all units within a selected category.
- **Calculation History:** LocalStorage persistence with bottom-sheet UI, modal confirmation before clearing all, and explicit action buttons (`↗ Restore Formula`, `+ Append Result`).
- **Display Formatting:** Thousands separators & 6-decimal UI formatting with full unrounded precision copy support.
- **Internationalization (i18n):** Automatic browser language detection (English / Indonesian) with `EN | ID` header toggle.
- **Vercel Deployment Config:** `vercel.json` for zero-config production deployments.

### Changed
- Reordered scientific keypad hierarchy to place `AC`, `C`, and `⌫` at Row 1 directly below the HASIL card.
- Made expanded converter categories scrollable (`max-h-60`) to prevent pushing the form off-screen.
- Preserved open category selection state without auto-collapsing.

### Fixed
- Fixed floating-point representation anomalies in result displays.
- Resolved next.js Webpack dev chunk cache conflicts during builds.

---

## [1.0.1] - Planned Maintenance Release
- Minor bug fixes gathered from user feedback after initial deployment.
