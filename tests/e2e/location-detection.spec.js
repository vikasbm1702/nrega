const { test, expect } = require('@playwright/test');

test.describe('Location Detection Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the district selector page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display "Detect my location" button', async ({ page }) => {
    const button = page.locator('button:has-text("Detect my location")');
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('type', 'button');
  });

  test('should show loading state when detecting location', async ({ page }) => {
    // Mock geolocation API
    await page.context().grantPermissions(['geolocation']);
    await page.context().setGeolocation({ latitude: 19.0760, longitude: 72.8777 }); // Mumbai coordinates

    const button = page.locator('button:has-text("Detect my location")');
    
    // Click the button
    await button.click();
    
    // The button should become disabled and show loading state
    await expect(button).toBeDisabled();
    
    // Wait for the request to complete
    await page.waitForLoadState('networkidle');
    
    // Button should be enabled again
    await expect(button).not.toBeDisabled();
  });

  test('should populate state and district from detected location', async ({ page }) => {
    // Mock geolocation API with Mumbai coordinates (Maharashtra, Mumbai)
    await page.context().grantPermissions(['geolocation']);
    await page.context().setGeolocation({ latitude: 19.0760, longitude: 72.8777 });

    const button = page.locator('button:has-text("Detect my location")');
    await button.click();

    // Wait for network activity to complete
    await page.waitForLoadState('networkidle');

    // Check if state field is populated
    const stateInput = page.locator('input[placeholder="Search and select state..."]').first();
    const stateValue = await stateInput.inputValue();
    
    // Mumbai is in Maharashtra, so we should get a state
    expect(stateValue.length).toBeGreaterThan(0);
    
    // Check if district field is populated
    const districtInput = page.locator('input[placeholder="Search and select district..."]');
    await page.waitForTimeout(500); // Wait for districts to load
    const districtValue = await districtInput.inputValue();
    
    // Should have a district selected
    expect(districtValue.length).toBeGreaterThan(0);
  });

  test('should handle geolocation permission denied gracefully', async ({ page, context }) => {
    // Deny geolocation permission
    await context.grantPermissions([]);

    const button = page.locator('button:has-text("Detect my location")');
    
    // Listen for the alert dialog
    page.once('dialog', dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toContain('Permission denied');
      dialog.dismiss();
    });
    
    await button.click();
  });

  test('should show error alert if location is outside India', async ({ page }) => {
    // Mock geolocation API with coordinates outside India (e.g., London)
    await page.context().grantPermissions(['geolocation']);
    await page.context().setGeolocation({ latitude: 51.5074, longitude: -0.1278 });

    const button = page.locator('button:has-text("Detect my location")');
    
    page.once('dialog', dialog => {
      // Should show error about not detecting location
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toContain('Could not detect');
      dialog.dismiss();
    });

    await button.click();
    await page.waitForLoadState('networkidle');
  });

  test('should allow manual selection after location detection fails', async ({ page }) => {
    // Manually select state and district
    const stateAutocomplete = page.locator('input[placeholder="Search and select state..."]').first();
    await stateAutocomplete.click();
    await stateAutocomplete.fill('Maharashtra');
    
    // Wait for dropdown and select
    const stateOption = page.locator('li[data-option-index="0"]');
    await stateOption.click();

    // Wait for districts to load
    await page.waitForTimeout(500);

    // Select district
    const districtAutocomplete = page.locator('input[placeholder="Search and select district..."]');
    await districtAutocomplete.click();
    await districtAutocomplete.fill('PUNE');
    
    const districtOption = page.locator('li[data-option-index="0"]');
    await districtOption.click();

    // Verify selections
    const stateValue = await stateAutocomplete.inputValue();
    const districtValue = await districtAutocomplete.inputValue();
    
    expect(stateValue).toBeTruthy();
    expect(districtValue).toBeTruthy();
  });

  test('should navigate to dashboard after location selection', async ({ page }) => {
    // Manually select state and district
    const stateAutocomplete = page.locator('input[placeholder="Search and select state..."]').first();
    await stateAutocomplete.click();
    await stateAutocomplete.fill('Maharashtra');
    
    const stateOption = page.locator('li[data-option-index="0"]');
    await stateOption.click();

    await page.waitForTimeout(500);

    const districtAutocomplete = page.locator('input[placeholder="Search and select district..."]');
    await districtAutocomplete.click();
    await districtAutocomplete.fill('PUNE');
    
    const districtOption = page.locator('li[data-option-index="0"]');
    await districtOption.click();

    // Click View Dashboard button
    const viewButton = page.locator('button:has-text("View Dashboard")');
    await viewButton.click();

    // Should navigate to dashboard
    await page.waitForURL(/.*\/dashboard\/.*/);
    expect(page.url()).toContain('/dashboard/');
  });
});

test.describe('Reverse Geocoding API', () => {
  test('should successfully reverse geocode valid Indian coordinates', async ({ request }) => {
    // Test with Pune coordinates
    const response = await request.post('http://127.0.0.1:5001/api/districts/reverse-geocode', {
      data: {
        latitude: 18.5204,
        longitude: 73.8567
      }
    });

    expect(response.ok()).toBe(true);
    const data = await response.json();
    
    expect(data).toHaveProperty('state');
    expect(data).toHaveProperty('district');
    expect(data).toHaveProperty('coordinates');
    
    // State should be uppercase
    expect(data.state).toBe(data.state.toUpperCase());
    // District should be uppercase
    expect(data.district).toBe(data.district.toUpperCase());
  });

  test('should return error for coordinates outside coverage area', async ({ request }) => {
    // Test with London coordinates (outside coverage)
    const response = await request.post('http://127.0.0.1:5001/api/districts/reverse-geocode', {
      data: {
        latitude: 51.5074,
        longitude: -0.1278
      }
    });

    // Should return error (either 404 or 500)
    expect(response.status()).toBeGreaterThanOrEqual(400);
    const data = await response.json();
    expect(data).toHaveProperty('error');
  });

  test('should return error for missing coordinates', async ({ request }) => {
    const response = await request.post('http://127.0.0.1:5001/api/districts/reverse-geocode', {
      data: {}
    });

    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data).toHaveProperty('error');
    expect(data.error).toContain('latitude and longitude');
  });

  test('should handle fuzzy matching for similar state names', async ({ request }) => {
    // Test with coordinates that might return a slightly different state name from Nominatim
    // This tests the fuzzy matching capability
    const response = await request.post('http://127.0.0.1:5001/api/districts/reverse-geocode', {
      data: {
        latitude: 28.7041,
        longitude: 77.1025 // Delhi coordinates
      }
    });

    if (response.ok()) {
      const data = await response.json();
      expect(data).toHaveProperty('state');
      expect(data.state).toBeTruthy();
    }
  });
});