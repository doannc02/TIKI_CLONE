export const formatAmount = (amount: number, locales = 'en-US', currency = 'USD', maximumFractionDigits = 2) => {
    return new Intl.NumberFormat(locales, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: maximumFractionDigits
    }).format(amount)
  }