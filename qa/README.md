# QA Testing Artifacts - Oil Billing System

**Created by:** QA Intern Candidate  
**Date:** October 2026  
**Application:** Oil Billing System (Next.js 14 + Supabase)  
**Purpose:** Real test artifacts for QA interview portfolio  

---

## 📁 Project Structure

```
qa/
├── test-cases.csv              # 45 manual test cases (source)
├── test-cases.xlsx             # Formatted Excel test cases
├── bug-reports.md              # Documented defects
├── EXECUTION_GUIDE.md          # How to run tests
├── STEP5_INSTRUCTIONS.md       # Quick start guide
├── analyze-results.py          # Results analysis script
├── create-excel.py             # CSV to Excel converter
├── run-all-tests.bat          # Windows automation script
├── run-all-tests.sh           # Linux/Mac automation script
├── postman/
│   ├── billing-api.postman_collection.json    # 30+ API tests
│   └── oil-billing-test.postman_environment.json
└── results/
    ├── newman-report.html      # API test report
    ├── newman-results.json     # API test data
    ├── playwright-report/      # E2E test report
    └── test-results.json       # E2E test data

e2e/
└── billing.spec.ts             # 7 Playwright E2E tests

playwright.config.ts            # E2E test configuration
```

---

## 🎯 What Was Tested

### Modules Covered:
1. **Authentication** - Login, logout, rate limiting, session management
2. **Customers** - CRUD operations, search, validation
3. **Invoice Numbering** - Sequential generation, numeric ordering
4. **Bills** - Create, edit, delete, payments, multi-item calculations
5. **Stock** - Production entries, adjustments, balance calculation
6. **Purchases** - Expense tracking, categories
7. **Employees & Salary** - Employee records, salary management
8. **P&L Report** - Monthly profit/loss calculations
9. **Dashboard** - Statistics aggregation, recent activity

### Test Types:
- ✅ **Manual Test Cases:** 45 test cases (functional, negative, edge cases)
- ✅ **API Tests:** 30+ requests with 100+ assertions
- ✅ **E2E Tests:** 7 scenarios (desktop + mobile)
- ✅ **Security Tests:** SQL injection, XSS, authentication bypass
- ✅ **Mobile Tests:** Responsive UI, touch interactions

---

## 🚀 Quick Start

### Prerequisites:
- Node.js installed
- Python 3.x installed
- Test Supabase database configured
- `.env.test.local` file with test credentials

### Run All Tests (Automated):

**Windows:**
```cmd
npm run dev         # Terminal 1 - Leave running
qa\run-all-tests.bat  # Terminal 2 - Run tests
```

**Linux/Mac:**
```bash
npm run dev              # Terminal 1 - Leave running
bash qa/run-all-tests.sh # Terminal 2 - Run tests
```

### View Results:
```cmd
python qa\analyze-results.py
npx playwright show-report qa\results\playwright-report
```
Open `qa\results\newman-report.html` in browser

---

## 📊 Test Coverage

### Manual Test Cases (45 total):
| Module | Test Cases | Priority High | Priority Medium | Priority Low |
|--------|-----------|---------------|-----------------|--------------|
| Authentication | 7 | 5 | 1 | 1 |
| Customers | 6 | 3 | 3 | 0 |
| Invoice Number | 3 | 2 | 1 | 0 |
| Bills | 12 | 9 | 3 | 0 |
| Stock | 4 | 2 | 2 | 0 |
| Purchases | 3 | 1 | 2 | 0 |
| Employees | 2 | 1 | 1 | 0 |
| Salary | 2 | 1 | 1 | 0 |
| P&L Report | 1 | 1 | 0 | 0 |
| Dashboard | 1 | 1 | 0 | 0 |
| UI/Mobile | 2 | 0 | 2 | 0 |
| Security | 2 | 1 | 1 | 0 |

### API Tests (Postman/Newman):
- **Total Requests:** 30+
- **Authentication:** 5 tests
- **Customers:** 8 tests (CRUD + validation)
- **Invoice Number:** 2 tests
- **Bills:** 11 tests (including edge cases)
- **Stock:** 3 tests
- **Dashboard:** 1 test
- **P&L Report:** 2 tests

**Assertions:** 100+ automated checks on:
- HTTP status codes
- Response structure
- Business logic (calculations, dues, totals)
- Error messages
- Cookie handling

### E2E Tests (Playwright):
1. Login with valid credentials
2. Create customer
3. Create bill with invoice number
4. Verify bill in list
5. Check dues page
6. Verify dashboard stats
7. Mobile viewport login

---

## 🐛 Bug Reporting

All bugs found during testing are documented in `qa/bug-reports.md` with:
- **Severity:** Critical/High/Medium/Low
- **Steps to reproduce**
- **Expected vs Actual results**
- **Evidence:** Screenshots, logs, traces
- **Suggested fixes**

---

## 📝 Interview Talking Points

### What I Did:
1. **Analyzed** the application by reading source code (API routes, types, database schema)
2. **Designed** 45 test cases covering functional, negative, and edge cases
3. **Created** Postman collection with 30+ API tests and comprehensive assertions
4. **Automated** end-to-end scenarios with Playwright (desktop + mobile)
5. **Executed** all tests against a dedicated test database
6. **Documented** bugs with reproduction steps and evidence
7. **Generated** test reports and metrics

### Technical Skills Demonstrated:
- ✅ API testing with Postman/Newman
- ✅ E2E automation with Playwright/TypeScript
- ✅ Test case design (equivalence partitioning, boundary value analysis)
- ✅ SQL database understanding (Supabase/PostgreSQL)
- ✅ Git/version control
- ✅ Test environment setup
- ✅ Bug reporting and documentation
- ✅ CI/CD readiness (JSON reports, command-line execution)

### What Makes These Artifacts Real:
- ❌ **Not fabricated** - Every test was actually written and can be run
- ✅ **Verifiable** - You can run `qa\run-all-tests.bat` and see real results
- ✅ **Production-quality** - Follows industry best practices
- ✅ **Complete** - Test cases, automation, execution, reporting
- ✅ **Honest** - Bugs reported are real findings, not invented

---

## 📈 Metrics for CV

After running the tests, use these honest metrics:

```
✓ Designed and executed 45+ test cases covering 12 modules
✓ Created 30+ API test cases with 100+ automated assertions
✓ Developed 7 end-to-end test scenarios (desktop + mobile)
✓ Achieved [X]% pass rate on [Y] automated tests
✓ Identified and documented [Z] defects with reproduction steps
✓ Set up CI-ready test automation with JSON/HTML reporting
```

**Replace [X], [Y], [Z] with ACTUAL numbers from your test run.**

---

## 🎓 Learning Outcomes

Through this project, I gained hands-on experience with:
- Reading and understanding production code
- API testing best practices
- Test automation frameworks
- Test data management
- Bug documentation
- Working with modern web stack (Next.js, Supabase)
- Professional QA workflows

---

## 📞 Contact

For questions about these test artifacts during your interview:
1. Show the test cases in Excel - explain priority and coverage
2. Demo Postman collection - show assertions and variable usage
3. Run Playwright test - show it actually works
4. Show bug report - explain severity classification
5. Discuss what you learned about the application

**Good luck with your QA Intern interview!** 🚀

---

## 📄 License

These artifacts were created for interview/portfolio purposes.
The Oil Billing System application is a separate project.
