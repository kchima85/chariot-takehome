// Example demonstrating how to use jest-mock-extended with vitest
// This file shows the approach but is commented out to avoid import conflicts
// To use jest-mock-extended, you may need additional vitest configuration

import { vi } from 'vitest'

/*
// Note: jest-mock-extended may require additional setup with vitest
// import { mock, mockFn } from 'jest-mock-extended'

interface ApiService {
  fetchUser(id: string): Promise<{ id: string; name: string }>
  updateUser(id: string, name: string): Promise<void>
}

describe('Mock Examples (for reference)', () => {
  it('shows how to mock with vitest built-in mocks', () => {
    // Using vitest's built-in mocking is more compatible
    const mockApiService = {
      fetchUser: vi.fn(),
      updateUser: vi.fn(),
    } satisfies ApiService

    mockApiService.fetchUser.mockResolvedValue({ id: '1', name: 'John' })

    expect(mockApiService.fetchUser).toBeDefined()
  })

  // Uncomment this when jest-mock-extended is properly configured
  // it('shows type-safe mocking with jest-mock-extended', () => {
  //   const mockApiService = mock<ApiService>()
  //   mockApiService.fetchUser.mockResolvedValue({ id: '1', name: 'John' })
  //   expect(mockApiService.fetchUser).toBeDefined()
  // })
})
*/

// For now, export a simple utility for type-safe mocking
export const createMockService = <T extends Record<string, unknown>>(
  keys: (keyof T)[]
): { [K in keyof T]: ReturnType<typeof vi.fn> } => {
  const mock = {} as { [K in keyof T]: ReturnType<typeof vi.fn> }
  keys.forEach(key => {
    mock[key] = vi.fn()
  })
  return mock
}
