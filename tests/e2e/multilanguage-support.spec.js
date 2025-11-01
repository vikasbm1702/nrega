import { test, expect } from '@playwright/test';

// Define language configurations
const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
];

test.describe('Multilanguage Support', () => {
  
  test.beforeEach(async ({ page, context }) => {
    // Navigate to home page
    await page.goto('/');
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');
  });

  test('should render language selector menu with all 12 languages', async ({ page }) => {
    // Click the language icon
    const languageIcon = page.getByRole('button', { name: /language/i }).first();
    await languageIcon.click();

    // Verify menu items exist for all languages
    for (const lang of languages) {
      const menuItem = page.getByRole('menuitem').filter({ hasText: lang.nativeName });
      await expect(menuItem).toBeVisible();
    }
  });

});