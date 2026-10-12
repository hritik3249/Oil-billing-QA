# QA Test Execution Guide

## Prerequisites

1. ✅ Test Supabase database configured
2. ✅ `.env.test.local` file created with test credentials
3. ✅ Dependencies installed

## Setup (Run Once)

### 1. Install Node dependencies (if not already done)
```bash
npm install
```

### 2. Install Playwright browsers
```bash
npm install -D @playwright/test
npx playwright install
```

This will download Chromium and WebKit browsers needed for testing.

## Running the Tests

### A. Manual Test Execution

1. **Start the dev server with test environment:**
```bash
cp .env.test.local .env.local
npm run dev
```

2. **Open the test cases spreadsheet:**
   - Open `qa/test-cases.csv` in Excel or Google Sheets
   - Execute each test case manually
   - Record the actual results in the "Actual Result" column
   - Mark status as "PASS", "FAIL", or "BLOCKED"

### B. Postman API Tests

1. **Import collection and environment into Postman:**
   - Open Postman
   - Click Import → Select `qa/postman/billing-api.postman_collection.json`
   - Click Import → Select `qa/postman/oil-billing-test.postman_environment.json`

2. **Select the environment:**
   - In Postman, top-right dropdown → Select "Oil Billing Test Environment"

3. **Run the collection:**
   - Click on "Oil Billing API - Test Suite" collection
   - Click "Run" button
   - Select all requests
   - Click "Run Oil Billing API..."

4. **Save results:**
   - After run completes, click "Export Results"
   - Save as `qa/results/postman-run-results.json`

5. **Run with Newman (CLI):**
```bash
npm install -g newman
newman run qa/postman/billing-api.postman_collection.json \
  -e qa/postman/oil-billing-test.postman_environment.json \
  --reporters cli,json \
  --reporter-json-export qa/results/newman-results.json
```

### C. Playwright E2E Tests

1. **Ensure test database is ready and server is running:**
```bash
# Make sure .env.local points to test database
cp .env.test.local .env.local
npm run dev
```

2. **Run E2E tests (headless):**
```bash
npm run test:e2e
```

3. **Run with UI mode (recommended for debugging):**
```bash
npm run test:e2e:ui
```

4. **Run with visible browser:**
```bash
npm run test:e2e:headed
```

5. **View HTML report:**
```bash
npx playwright show-report qa/results/playwright-report
```

## Expected Results

### Postman Tests
- **Total requests:** 30+
- **Expected pass rate:** 95%+ (some validation tests should fail as expected)
- **Duration:** ~30-60 seconds

### Playwright Tests
- **Total tests:** 7 (6 desktop + 1 mobile)
- **Expected pass rate:** 100% (if UI matches test selectors)
- **Duration:** ~2-5 minutes

## Troubleshooting

### Postman: "Unauthorized" errors
- Make sure you run the "Login - Valid Credentials" request first
- Check that cookies are enabled in Postman settings
- Verify `.env.test.local` credentials match the environment variables

### Playwright: "locator not found" errors
- The test uses flexible selectors but may need adjustment for your specific UI
- Run with `--headed` flag to see what's happening
- Check if the element has a `data-testid` attribute (recommended)
- Update selectors in `e2e/billing.spec.ts` if needed

### Dev server won't start
- Check if port 3000 is already in use
- Verify `.env.test.local` has valid Supabase credentials
- Check Supabase project is not paused

## IMPORTANT: Rate Limit

⚠️ The `/api/auth` endpoint rate-limits failed logins (5 attempts per IP per 15 minutes).

If you run failed-login tests multiple times:
- You may hit the rate limit
- Wait 15 minutes or restart the dev server (in-memory rate limit resets)
- Run failed-login tests LAST in your test sequence
