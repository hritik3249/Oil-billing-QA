import { test, expect, Page } from '@playwright/test';

test.describe('Oil Billing System - End to End Flow', () => {
  let page: Page;
  let customerName: string;
  let billNumber: string;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    // Generate unique customer name for this test run
    customerName = `E2E Customer ${Date.now()}`;
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('1. Login with valid credentials', async () => {
    await page.goto('/login');

    // Wait for page to load
    await expect(page.locator('h1, h2')).toContainText(/login|sign in/i, { timeout: 10000 });

    // Fill login form - using flexible selectors
    const usernameInput = page.locator('input[type="text"], input[name*="user"], input[placeholder*="user"]').first();
    const passwordInput = page.locator('input[type="password"]').first();

    await usernameInput.fill('admin');
    await passwordInput.fill('oilbiz2024');

    // Click login button
    const loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign in")').first();
    await loginButton.click();

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/(dashboard)?$/, { timeout: 10000 });

    // Verify auth cookie is set
    const cookies = await page.context().cookies();
    const authCookie = cookies.find(c => c.name === 'oil_admin_auth');
    expect(authCookie).toBeDefined();
    expect(authCookie?.value).toBeTruthy();
  });

  test('2. Navigate to customers page and create a customer', async () => {
    // Navigate to customers - try multiple possible selectors
    const customersLink = page.locator('a:has-text("Customer"), a[href*="customer"]').first();
    await customersLink.click();

    await expect(page).toHaveURL(/customer/, { timeout: 5000 });

    // Click "Add Customer" or similar button
    const addButton = page.locator('button:has-text("Add"), button:has-text("New"), button:has-text("Create")').first();
    await addButton.click();

    // Fill customer form
    await page.locator('input[name="name"], input[placeholder*="name"]').first().fill(customerName);
    await page.locator('input[name="area"], input[placeholder*="area"]').first().fill('E2E Test Area');
    await page.locator('input[name="phone"], input[placeholder*="phone"]').first().fill('9999888877');
    await page.locator('input[name="vehicle_number"], input[placeholder*="vehicle"]').first().fill('KA01E2E123');

    // Submit form
    const saveButton = page.locator('button[type="submit"], button:has-text("Save"), button:has-text("Create")').first();
    await saveButton.click();

    // Verify customer appears in the list
    await expect(page.locator(`text=${customerName}`)).toBeVisible({ timeout: 5000 });
  });

  test('3. Create a bill for the customer', async () => {
    // Navigate to bills/invoice page
    const billsLink = page.locator('a:has-text("Bill"), a:has-text("Invoice"), a[href*="bill"]').first();
    await billsLink.click();

    await expect(page).toHaveURL(/bill|invoice/, { timeout: 5000 });

    // Click "Add Bill" or "New Bill"
    const addBillButton = page.locator('button:has-text("Add"), button:has-text("New"), button:has-text("Create")').first();
    await addBillButton.click();

    // Wait for form to appear
    await page.waitForTimeout(1000);

    // Select customer - try different approaches
    const customerSelect = page.locator('select[name*="customer"], input[name*="customer"]').first();
    if (await customerSelect.isVisible()) {
      // If it's a select dropdown
      await customerSelect.click();
      await page.locator(`option:has-text("${customerName}"), [role="option"]:has-text("${customerName}")`).first().click();
    } else {
      // If it's an input with autocomplete
      await customerSelect.fill(customerName);
      await page.waitForTimeout(500);
      await page.locator(`text=${customerName}`).first().click();
    }

    // Fill bill details
    // Invoice number should auto-populate, but verify it's there
    const invoiceInput = page.locator('input[name*="bill"], input[name*="invoice"]').first();
    billNumber = await invoiceInput.inputValue();
    expect(billNumber).toMatch(/ET-\d{2}-\d+/);

    // Add item to bill
    const oilSelect = page.locator('select[name*="oil"], input[name*="product"]').first();
    await oilSelect.click();
    await page.locator('option, [role="option"]').first().click();

    // Enter quantity
    await page.locator('input[name*="quantity"]').first().fill('5');

    // Rate should auto-populate, verify it
    const rateInput = page.locator('input[name*="rate"], input[name*="price"]').first();
    const rate = await rateInput.inputValue();
    expect(parseFloat(rate)).toBeGreaterThan(0);

    // Enter initial payment
    await page.locator('input[name*="paid"], input[name*="payment"]').first().fill('250');

    // Submit bill
    const saveBillButton = page.locator('button[type="submit"]:has-text("Save"), button:has-text("Create Bill")').first();
    await saveBillButton.click();

    // Verify bill appears in list
    await expect(page.locator(`text=${billNumber}`)).toBeVisible({ timeout: 5000 });
  });

  test('4. Verify bill appears in bills list', async () => {
    // Should already be on bills page
    await expect(page).toHaveURL(/bill|invoice/);

    // Search for the bill number
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill(billNumber);
      await page.waitForTimeout(500);
    }

    // Verify bill is visible with correct customer
    const billRow = page.locator(`text=${billNumber}`).first();
    await expect(billRow).toBeVisible();

    // Verify customer name appears near the bill
    await expect(page.locator(`text=${customerName}`).first()).toBeVisible();
  });

  test('5. Check dues page shows the bill', async () => {
    // Navigate to dues page
    const duesLink = page.locator('a:has-text("Due"), a[href*="due"]').first();
    await duesLink.click();

    await expect(page).toHaveURL(/due/, { timeout: 5000 });

    // The bill should appear here since we only paid partial amount
    await expect(page.locator(`text=${customerName}`).first()).toBeVisible({ timeout: 5000 });

    // Verify due amount is shown
    await expect(page.locator('text=/₹|Rs/')).toBeVisible();
  });

  test('6. Verify dashboard shows updated stats', async () => {
    // Navigate to dashboard
    const dashboardLink = page.locator('a:has-text("Dashboard"), a:has-text("Home"), a[href="/"]').first();
    await dashboardLink.click();

    await expect(page).toHaveURL(/\/(dashboard)?$/, { timeout: 5000 });

    // Verify key stats are visible
    await expect(page.locator('text=/Total Sales|Revenue/')).toBeVisible();
    await expect(page.locator('text=/Pending Dues|Outstanding/')).toBeVisible();

    // Verify the recent bill appears
    await expect(page.locator(`text=${billNumber}`).first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Mobile Viewport Tests', () => {
  test.use({ ...devices['iPhone 12'] });

  test('Mobile - Login and view dashboard', async ({ page }) => {
    await page.goto('/login');

    // Fill login
    await page.locator('input[type="text"], input[name*="user"]').first().fill('admin');
    await page.locator('input[type="password"]').first().fill('oilbiz2024');
    await page.locator('button[type="submit"]').first().click();

    // Should reach dashboard
    await expect(page).toHaveURL(/\/(dashboard)?$/, { timeout: 10000 });

    // Verify mobile viewport renders content
    await expect(page.locator('text=/Total Sales|Revenue/')).toBeVisible();

    // Check that navigation is accessible (might be a hamburger menu)
    const nav = page.locator('nav, [role="navigation"], button[aria-label*="menu"]').first();
    await expect(nav).toBeVisible();
  });
});

// Import devices for mobile test
import { devices } from '@playwright/test';
