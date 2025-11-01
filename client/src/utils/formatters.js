export const formatCurrency = (amount) => {
  if (!amount) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (number) => {
  if (!number) return '0';
  return new Intl.NumberFormat('en-IN').format(number);
};

export const formatPercentage = (value) => {
  if (!value) return '0%';
  return `${(value * 100).toFixed(1)}%`;
};

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};