/**
 * Format a date string to MM/DD/YYYY format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

/**
 * Convert ISO date string to MM/DD/YYYY format for form inputs
 */
export const formatDateForInput = (isoDateString: string): string => {
  if (!isoDateString) return ''

  const date = new Date(isoDateString)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

/**
 * Validate if a date string is in a valid format
 */
export const validateDate = (dateStr: string): boolean => {
  if (!dateStr.trim()) return true // Empty string is valid

  // Check if it matches MM/DD/YYYY or YYYY-MM-DD format
  const formats = [
    /^\d{2}\/\d{2}\/\d{4}$/, // MM/DD/YYYY
    /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
  ]

  const matchesFormat = formats.some(format => format.test(dateStr))
  if (!matchesFormat) return false

  // Try to parse the date
  const date = new Date(dateStr)
  return !isNaN(date.getTime()) && date.getFullYear() > 1900
}
