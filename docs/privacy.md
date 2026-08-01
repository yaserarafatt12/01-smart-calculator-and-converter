# Privacy Specification & Data Protection Policy

**Project Name:** Smart Calculator & Unit Converter  
**Repository:** `01-smart-calculator-and-converter`  
**Effective Date:** 2026-08-01  

---

## 1. Privacy First Commitment

Smart Calculator & Unit Converter is built around a **100% Local-First & Zero Telemetry** privacy design. User calculation history, theme preferences, and unit conversion states remain exclusively stored on the user's local web browser device.

---

## 2. Data Collection & Processing

### 2.1 Data Collection
- **Zero Remote Telemetry:** No analytics scripts, Google Analytics, tracking pixels, or third-party trackers are included in the application.
- **Zero Server Storage:** The app operates without a backend database or remote cloud server for storing calculation data.

### 2.2 Local Storage Usage
The application utilizes the browser's `LocalStorage` API strictly for functional client-side features:
1. `smart_calc_history`: Stores up to 20 recent calculation transactions (expression, result, timestamp).
2. `smart_calc_app_mode`: Stores user UI layout preference (`default` or `complete`).
3. `smart_calc_lang`: Stores user language preference (`en` or `id`).
4. `smart_calc_pwa_dismissed`: Stores PWA prompt dismissal state.

---

## 3. Data Control & Deletion

Users maintain 100% ownership and control over their local data:
- **Clear History:** Users can delete individual history items or wipe all calculation history at any time using the "Clear All History" button.
- **Browser Clear Data:** Clearing browser cache or site data completely resets all stored preferences.
