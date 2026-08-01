# Contributing Guidelines

Thank you for contributing to **Smart Calculator & Unit Converter**! Please review the following guidelines before submitting a Pull Request (PR).

---

## 🚨 Security & Privacy Requirements

Per repository security standards, **IT IS STRICTLY FORBIDDEN** to commit or upload:

1. **Passwords or secret credentials**
2. **API Keys / Service tokens**
3. **User PII (Personally Identifiable Information)**
4. **Secret configuration files** (`.env.local`, credential files)
5. **Private conversation histories or personal logs**

> ⚠️ **Important**: Any PR violating these security rules will be closed immediately.

---

## 🛠️ Contribution Workflow

1. **Fork & Clone Repository**
   ```bash
   git clone https://github.com/yaserarafatt12/01-smart-calculator-and-converter.git
   cd 01-smart-calculator-and-converter
   ```

2. **Create a Feature Branch**
   Follow standard naming conventions:
   - `feat/feature-name`
   - `fix/bug-description`
   - `docs/documentation-update`

3. **Environment Setup**
   Copy `.env.example` to `.env.local` for local development. Never commit `.env.local`.

4. **Run Unit Tests**
   Ensure all 84 automated unit tests pass 100%:
   ```bash
   npm test
   ```

5. **Submit a Pull Request (PR)**
   Provide a clear PR summary detailing the changes.
