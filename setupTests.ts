import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { beforeEach, afterEach, vi } from 'vitest'

beforeEach(() => {
  vi.resetAllMocks()

  vi.mock('next/font/local', () => ({
    __esModule: true,
    default: () => ({
      style: { fontFamily: 'mocked' },
    }),
  }))
})

afterEach(() => {
  cleanup()
})
