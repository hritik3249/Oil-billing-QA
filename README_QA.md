# Oil Billing System - QA Test Suite

> **Professional QA test artifacts created for interview portfolio**

[![Tests](https://img.shields.io/badge/tests-45%20manual%20%2B%2030%2B%20API%20%2B%207%20E2E-green)](qa/)
[![API Tests](https://img.shields.io/badge/API-Postman%20%2F%20Newman-orange)](qa/postman/)
[![E2E Tests](https://img.shields.io/badge/E2E-Playwright-red)](e2e/)

A comprehensive QA testing portfolio demonstrating manual test case design, API testing with Postman, and end-to-end automation with Playwright.

## 🎯 Project Overview

This repository contains **real, executable test artifacts** for a Next.js 14 + Supabase billing application. Created as part of a QA Intern role application, it demonstrates:

- ✅ Test case design and execution
- ✅ API testing with automated assertions
- ✅ End-to-end test automation
- ✅ Bug documentation and reporting
- ✅ CI/CD-ready test execution

## 📂 Repository Structure

```
├── qa/                          # QA Test Artifacts
│   ├── test-cases.csv          # 45 manual test cases
│   ├── bug-reports.md          # Bug documentation template
│   ├── postman/                # API test collection (30+ tests)
│   ├── *.bat, *.sh             # Test execution scripts
│   └── README.md               # Complete QA documentation
├── e2e/                        # E2E Test Automation
│   └── billing.spec.ts         # 7 Playwright test scenarios
├── playwright.config.ts        # Test configuration
└── [application files]         # Next.js billing application
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.x
- Supabase account (for test database)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hritik3249/oil-billing.git
   cd oil-billing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   npm install -D @playwright/test
   npx playwright install chromium
   ```

3. **Set up test database:**
   - Create a Supabase project
   - Run SQL scripts: `supabase-setup.sql`, `migration-*.sql`
   - Copy `.env.local.example` to `.env.test.local`
   - Add your test database credentials

4. **Run all tests:**
   ```bash
   # Terminal 1: Start dev server
   npm run dev
   
   # Terminal 2: Run tests
   qa\run-all-tests.bat  # Windows
   # or
   bash qa/run-all-tests.sh  # Linux/Mac
   ```

5. **View reports:**
   ```bash
   npx playwright show-report qa/results/playwright-report
   # Open qa/results/newman-report.html in browser
   ```

## 📊 Test Coverage

### Manual Test Cases (45)
- Authentication (7 cases)
- Customer Management (6 cases)
- Invoice Numbering (3 cases)
- Bills & Payments (12 cases)
- Stock Tracking (4 cases)
- Financial Reports (3 cases)
- Security & Mobile (4 cases)

### API Tests (30+)
- RESTful API endpoints
- CRUD operations validation
- Business logic verification
- Error handling & edge cases
- 100+ automated assertions

### E2E Tests (7)
- Complete user workflows
- Desktop + Mobile viewports
- Screenshot & video on failure
- Automated reporting

## 🛠️ Technologies Used

- **API Testing:** Postman, Newman
- **E2E Automation:** Playwright, TypeScript
- **Database:** Supabase (PostgreSQL)
- **Framework:** Next.js 14, React
- **Reporting:** HTML, JSON, Excel

## 📖 Documentation

- **[QA Documentation](qa/README.md)** - Complete testing guide
- **[Execution Guide](qa/EXECUTION_GUIDE.md)** - How to run tests
- **[CV Template](qa/CV_BULLETS_TEMPLATE.md)** - Resume bullets with metrics

## 🐛 Bug Reporting

All bugs are documented in [`qa/bug-reports.md`](qa/bug-reports.md) with:
- Severity classification
- Reproduction steps
- Expected vs Actual results
- Evidence (screenshots, logs)
- Suggested fixes

## 🎓 Learning Outcomes

This project demonstrates:
- Professional QA workflows
- Test automation best practices
- API testing with assertions
- Cross-browser/device testing
- Bug documentation standards
- CI/CD integration readiness

## 📝 Notes

- **Environment files (`.env.test.local`) are NOT committed** - Contains sensitive credentials
- **Test results are NOT committed** - Generated dynamically
- All tests run against a separate TEST database
- The application code is the original project; QA artifacts are in `qa/` and `e2e/`

## 🤝 About

Created as part of a QA Intern role application to demonstrate:
- Real-world testing experience
- Technical QA skills
- Attention to detail
- Professional documentation

**Original Application:** [hritik3249/oil-billing](https://github.com/hritik3249/oil-billing)  
**QA Artifacts:** Added in this fork

## 📄 License

The QA test artifacts are created for portfolio/interview purposes. The Oil Billing System application has its own licensing.

---

**⭐ If you find these QA artifacts helpful, please star this repo!**
