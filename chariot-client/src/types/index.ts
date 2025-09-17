// Global TypeScript type definitions

export interface User {
  id: string
  name: string
  email: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  code?: string | number
}
