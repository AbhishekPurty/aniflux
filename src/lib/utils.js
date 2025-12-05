// Utility functions

/**
 * Merge class names with conditional classes
 * @param {...string} classes - Class names to merge
 * @returns {string} Merged class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Generate slug from string
 * @param {string} text - Text to convert to slug
 * @returns {string} Slug string
 */
export function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export function truncate(text, length = 100) {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {object} options - Formatting options
 * @returns {string} Formatted date string
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return new Date(date).toLocaleDateString('en-US', {
    ...defaultOptions,
    ...options,
  });
}
