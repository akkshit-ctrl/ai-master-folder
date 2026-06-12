---
name: browser-testing
description: "Playwright E2E testing with Page Object Model, fixtures, and CI integration. Use when writing or fixing end-to-end/browser tests, automating UI flows, or setting up Playwright."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "testing"
  tags:
    - e2e
    - playwright
    - browser
    - testing
allowed-tools: bash read edit glob grep
---

# Browser Testing

End-to-end browser testing with Playwright.

## Setup

```bash
npm init playwright@latest
# or: yarn create playwright
```

## Page Object Model

Structure tests using Page Objects:

```typescript
// pages/login.page.ts
export class LoginPage {
  constructor(private page: Page) {}

  async goto() { await this.page.goto('/login'); }
  async login(email: string, password: string) {
    await this.page.fill('[data-testid="email"]', email);
    await this.page.fill('[data-testid="password"]', password);
    await this.page.click('[data-testid="submit"]');
  }
}

// tests/login.spec.ts
test('successful login', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('user@example.com', 'password123');
  await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
});
```

## Test Coverage Areas
- **Happy path**: Complete user flows end-to-end
- **Error states**: Validation errors, API failures, network offline
- **Edge cases**: Empty states, slow responses, file uploads
- **Responsive**: Mobile and desktop viewport testing
- **Accessibility**: Basic a11y checks via `@axe-core/playwright`

## CI Integration
```yaml
- name: Run E2E tests
  run: npx playwright test
- name: Upload report
  uses: actions/upload-artifact@v4
  if: failure()
  with:
    name: playwright-report
    path: playwright-report/
```

## Best Practices
- Use `data-testid` attributes over CSS selectors
- Avoid `page.waitFor(timeout)` — use locator-based waits
- Run tests in parallel with multiple workers
- Record videos on failure for debugging
- Use fixtures for shared setup/teardown

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "Unit tests are enough" | E2E tests catch integration bugs that unit tests miss entirely. |
| "Browser tests are too flaky" | Good locators and retry strategies solve flakiness. |
| "Playwright setup takes too long" | Setup is once. The bugs it catches are forever. |
