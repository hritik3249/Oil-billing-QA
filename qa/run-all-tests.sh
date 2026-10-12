#!/bin/bash
# QA Test Execution Script
# Run this after starting the dev server (npm run dev)

echo "========================================="
echo "Oil Billing System - QA Test Execution"
echo "========================================="
echo ""

# Check if server is running
echo "Step 1: Checking if dev server is running..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✓ Server is running on http://localhost:3000"
else
    echo "✗ Server is not running!"
    echo "Please start the dev server in another terminal: npm run dev"
    exit 1
fi

echo ""
echo "Step 2: Creating Excel test case file..."
python qa/create-excel.py
if [ $? -eq 0 ]; then
    echo "✓ Excel file created: qa/test-cases.xlsx"
else
    echo "✗ Failed to create Excel file. Check if openpyxl is installed."
fi

echo ""
echo "Step 3: Installing Playwright (if needed)..."
if ! npx playwright --version > /dev/null 2>&1; then
    echo "Installing Playwright..."
    npm install -D @playwright/test
    npx playwright install chromium
else
    echo "✓ Playwright already installed"
fi

echo ""
echo "Step 4: Running Playwright E2E tests..."
npm run test:e2e

echo ""
echo "Step 5: Installing Newman (if needed)..."
if ! command -v newman &> /dev/null; then
    echo "Installing Newman globally..."
    npm install -g newman
else
    echo "✓ Newman already installed"
fi

echo ""
echo "Step 6: Running Postman collection with Newman..."
newman run qa/postman/billing-api.postman_collection.json \
  -e qa/postman/oil-billing-test.postman_environment.json \
  --reporters cli,json,html \
  --reporter-json-export qa/results/newman-results.json \
  --reporter-html-export qa/results/newman-report.html \
  --color on

echo ""
echo "========================================="
echo "Test Execution Complete!"
echo "========================================="
echo ""
echo "Results saved to:"
echo "  - qa/results/playwright-report/ (HTML report)"
echo "  - qa/results/test-results.json (Playwright JSON)"
echo "  - qa/results/newman-results.json (Newman JSON)"
echo "  - qa/results/newman-report.html (Newman HTML)"
echo ""
echo "To view Playwright report:"
echo "  npx playwright show-report qa/results/playwright-report"
echo ""
echo "To view Newman report:"
echo "  Open qa/results/newman-report.html in your browser"
echo ""
