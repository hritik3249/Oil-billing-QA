# STEP 5: Execute All Tests - INSTRUCTIONS

## Quick Start (Windows)

### 1. Open TWO command prompts/terminals

**Terminal 1 - Start Dev Server:**
```cmd
cd "F:\My projects\API testing proj\oil-billing"
npm run dev
```
Leave this running. Wait until you see "Ready on http://localhost:3000"

**Terminal 2 - Run All Tests:**
```cmd
cd "F:\My projects\API testing proj\oil-billing"
qa\run-all-tests.bat
```

The script will:
- ✓ Check if server is running
- ✓ Create Excel test cases file
- ✓ Install Playwright (first time only)
- ✓ Run 7 Playwright E2E tests (~2-5 min)
- ✓ Install Newman (first time only)
- ✓ Run 30+ Postman API tests (~30-60 sec)
- ✓ Generate HTML and JSON reports

---

## Manual Step-by-Step (If Script Fails)

### 1. Create Excel File
```cmd
python qa\create-excel.py
```

### 2. Install Playwright
```cmd
npm install -D @playwright/test
npx playwright install chromium
```

### 3. Install Newman
```cmd
npm install -g newman
```

### 4. Run Playwright Tests
```cmd
npm run test:e2e
```

### 5. Run Newman Tests
```cmd
newman run qa\postman\billing-api.postman_collection.json ^
  -e qa\postman\oil-billing-test.postman_environment.json ^
  --reporters cli,json,html ^
  --reporter-json-export qa\results\newman-results.json ^
  --reporter-html-export qa\results\newman-report.html
```

---

## View Results

### Playwright Report
```cmd
npx playwright show-report qa\results\playwright-report
```

### Newman Report
Open `qa\results\newman-report.html` in your browser

### Test Results Files
- `qa\results\test-results.json` - Playwright results (JSON)
- `qa\results\newman-results.json` - API test results (JSON)
- `qa\test-cases.xlsx` - Manual test case sheet

---

## What to Share With Me After Running

After the tests complete, please share:

1. **Did the script run successfully?** (Yes/No)
2. **Playwright summary** - How many tests passed/failed?
3. **Newman summary** - How many requests passed/failed?
4. **Any errors or failures** - Copy the error messages

Then I'll:
- Analyze the results
- Create bug reports (Step 6)
- Generate your CV summary (Step 7)

---

## Troubleshooting

### "Server not running" error
- Make sure Terminal 1 is still running `npm run dev`
- Check http://localhost:3000 opens in your browser

### Python errors
- Install Python if not installed: https://www.python.org/downloads/
- Or manually open `qa\test-cases.csv` in Excel and save as `.xlsx`

### Playwright errors about "selectors not found"
- This is EXPECTED if UI elements don't match selectors
- The test will take screenshots in `qa\results\playwright-report`
- We'll document this in the bug report

### Newman errors about cookies
- This might happen if the auth flow has issues
- We'll document the actual behavior in Step 6

---

## Ready to Run?

1. ✅ Open Terminal 1 → `npm run dev` → Wait for "Ready"
2. ✅ Open Terminal 2 → `qa\run-all-tests.bat`
3. ✅ Wait 3-6 minutes for all tests to complete
4. ✅ Share the summary with me

**Let me know when you've run the tests and I'll proceed with analyzing the results!**
