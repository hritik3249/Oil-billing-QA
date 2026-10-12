@echo off
REM QA Test Execution Script for Windows
REM Run this after starting the dev server (npm run dev in another terminal)

echo =========================================
echo Oil Billing System - QA Test Execution
echo =========================================
echo.

REM Check if server is running
echo Step 1: Checking if dev server is running...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Server is running on http://localhost:3000
) else (
    echo [ERROR] Server is not running!
    echo Please start the dev server in another terminal: npm run dev
    pause
    exit /b 1
)

echo.
echo Step 2: Creating Excel test case file...
python qa\create-excel.py
if %errorlevel% equ 0 (
    echo [OK] Excel file created: qa\test-cases.xlsx
) else (
    echo [WARN] Failed to create Excel file. You can convert CSV manually in Excel.
)

echo.
echo Step 3: Installing Playwright if needed...
call npx playwright --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Playwright...
    call npm install -D @playwright/test
    call npx playwright install chromium
) else (
    echo [OK] Playwright already installed
)

echo.
echo Step 4: Running Playwright E2E tests...
echo This may take 2-5 minutes...
call npm run test:e2e

echo.
echo Step 5: Installing Newman if needed...
call newman --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Newman globally...
    call npm install -g newman
) else (
    echo [OK] Newman already installed
)

echo.
echo Step 6: Running Postman collection with Newman...
echo This may take 30-60 seconds...
call newman run qa\postman\billing-api.postman_collection.json -e qa\postman\oil-billing-test.postman_environment.json --reporters cli,json,html --reporter-json-export qa\results\newman-results.json --reporter-html-export qa\results\newman-report.html --color on

echo.
echo =========================================
echo Test Execution Complete!
echo =========================================
echo.
echo Results saved to:
echo   - qa\results\playwright-report\ (HTML report)
echo   - qa\results\test-results.json (Playwright JSON)
echo   - qa\results\newman-results.json (Newman JSON)
echo   - qa\results\newman-report.html (Newman HTML)
echo.
echo To view Playwright report:
echo   npx playwright show-report qa\results\playwright-report
echo.
echo To view Newman report:
echo   Open qa\results\newman-report.html in your browser
echo.
pause
