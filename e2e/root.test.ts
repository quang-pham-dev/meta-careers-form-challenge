import { test, expect } from '@playwright/test'

const baseUrl = process.env.NEXT_PUBLIC_URL

test('RootPage', async ({ page }) => {
  await page.goto(baseUrl as string)
  await expect(page).toHaveTitle('Meta career form challenge')
  const heading = page.getByRole('heading', {
    name: 'Sign up for Career Profile',
  })
  await expect(heading).toBeVisible()
})
