import { test, expect } from '@playwright/test';

test.describe('Smart Calculator & Unit Converter E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Kalkulator: dapat melakukan perhitungan aritmatika dasar (12 + 5 = 17)', async ({ page }) => {
    // Click 1, 2, +, 5, =
    await page.click('button[data-testid="btn-1"]');
    await page.click('button[data-testid="btn-2"]');
    await page.click('button[data-testid="btn-add"]');
    await page.click('button[data-testid="btn-5"]');

    // Check expression before equals
    const expression = page.locator('[data-testid="calculator-expression"]');
    await expect(expression).toContainText('12+5');

    // Click equals
    await page.click('button[data-testid="btn-equals"]');

    // Check calculated result display
    const result = page.locator('[data-testid="calculator-result"]');
    await expect(result).toHaveText('17');
  });

  test('Kalkulator: dapat menangani kesalahan pembagian dengan nol dan menampilkan ErrorHint', async ({ page }) => {
    // Click 5, /, 0, =
    await page.click('button[data-testid="btn-5"]');
    await page.click('button[data-testid="btn-divide"]');
    await page.click('button[data-testid="btn-0"]');
    await page.click('button[data-testid="btn-equals"]');

    // Check error widget is visible with title "Pembagian dengan Nol"
    const errorWidget = page.locator('[data-testid="error-hint-widget"]');
    await expect(errorWidget).toBeVisible();
    await expect(errorWidget).toContainText('Pembagian dengan Nol');
    await expect(errorWidget).toContainText('Panduan Belajar:');
  });

  test('Riwayat: menyimpan transaksi perhitungan dan dapat menggunakan kembali item riwayat', async ({ page }) => {
    // Perform calculation 25 * 4 = 100
    await page.click('button[data-testid="btn-2"]');
    await page.click('button[data-testid="btn-5"]');
    await page.click('button[data-testid="btn-multiply"]');
    await page.click('button[data-testid="btn-4"]');
    await page.click('button[data-testid="btn-equals"]');

    // Check history item added
    const historyPanel = page.locator('[data-testid="history-panel"]');
    await expect(historyPanel).toBeVisible();
    const historyItem = page.locator('[data-testid="history-item"]').first();
    await expect(historyItem).toContainText('25*4');
    await expect(historyItem).toContainText('100');

    // Clear calculator expression
    await page.click('button[data-testid="btn-ac"]');
    const result = page.locator('[data-testid="calculator-result"]');
    await expect(result).toHaveText('= 0');

    // Click history item result (100) to populate calculator
    await historyItem.getByText('100', { exact: true }).click();

    // Verify calculator expression contains 100
    const expression = page.locator('[data-testid="calculator-expression"]');
    await expect(expression).toContainText('100');
  });

  test('Riwayat: tombol Hapus Semua menghapus seluruh daftar riwayat', async ({ page }) => {
    // Add a calculation
    await page.click('button[data-testid="btn-[8]"], button[data-testid="btn-8"]');
    await page.click('button[data-testid="btn-add"]');
    await page.click('button[data-testid="btn-[2]"], button[data-testid="btn-2"]');
    await page.click('button[data-testid="btn-equals"]');

    // Click Clear History button
    const clearBtn = page.locator('[data-testid="btn-clear-history"]');
    await expect(clearBtn).toBeVisible();
    await clearBtn.click();

    // Verify empty history message
    const historyPanel = page.locator('[data-testid="history-panel"]');
    await expect(historyPanel).toContainText('Belum ada riwayat perhitungan');
  });

  test('Konverter Satuan: berpindah tab dan mengonversi 1 km ke meter', async ({ page }) => {
    // Switch to Unit Converter tab
    await page.click('#tab-converter');

    const converterContainer = page.locator('[data-testid="unit-converter-container"]');
    await expect(converterContainer).toBeVisible();

    // Fill value 1
    const fromInput = page.locator('[data-testid="from-value-input"]');
    await fromInput.fill('1');

    // Select km -> m
    await page.selectOption('[data-testid="from-unit-select"]', 'km');
    await page.selectOption('[data-testid="to-unit-select"]', 'm');

    // Check converted output is 1000
    const toOutput = page.locator('[data-testid="to-value-output"]');
    await expect(toOutput).toHaveText('1000');

    // Test Swap units
    await page.click('[data-testid="btn-swap-units"]');
    await expect(page.locator('[data-testid="from-unit-select"]')).toHaveValue('m');
    await expect(page.locator('[data-testid="to-unit-select"]')).toHaveValue('km');
  });

  test('Konverter Satuan: berpindah kategori ke Berat (1 kg to g = 1000)', async ({ page }) => {
    await page.click('#tab-converter');

    // Click category Berat
    await page.click('#cat-weight');

    const fromInput = page.locator('[data-testid="from-value-input"]');
    await fromInput.fill('1');

    await page.selectOption('[data-testid="from-unit-select"]', 'kg');
    await page.selectOption('[data-testid="to-unit-select"]', 'g');

    const toOutput = page.locator('[data-testid="to-value-output"]');
    await expect(toOutput).toHaveText('1000');
  });

  test('Tema: pengubah tema terang/gelap mengubah class pada html', async ({ page }) => {
    const themeBtn = page.locator('button[aria-label*="Switch to"]');
    await expect(themeBtn).toBeVisible();

    // Toggle theme
    await themeBtn.click();
    const htmlElement = page.locator('html');
    
    // Check dark or light class
    const isDark = await htmlElement.evaluate((el) => el.classList.contains('dark'));
    
    // Toggle again
    await themeBtn.click();
    const isDarkAfter = await htmlElement.evaluate((el) => el.classList.contains('dark'));

    expect(isDark).not.toEqual(isDarkAfter);
  });
});
