/**
 * Format amount and currency for display
 */
export const formatAmount = (amount: string, currency: string): string => {
  const numericAmount = parseFloat(amount)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(numericAmount)
}
