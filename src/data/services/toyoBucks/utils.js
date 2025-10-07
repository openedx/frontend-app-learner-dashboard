/**
 * Toyo Bucks utility functions
 */

/**
 * Format Toyo Bucks amount for display
 * @param {number|string} amount - The amount to format
 * @param {boolean} showSymbol - Whether to show the TB symbol
 * @returns {string} Formatted amount
 */
export function formatToyoBucks(amount, showSymbol = true) {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  const formatted = numAmount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return showSymbol ? `${formatted} Toyo Bucks` : formatted;
}

/**
 * Calculate total claimed Toyo Bucks for a specific course
 * @param {Array} claims - Array of claim objects
 * @param {string} courseKey - Course key to filter by
 * @returns {number} Total claimed amount
 */
export function calculateClaimedForCourse(claims, courseKey) {
  if (!claims || !Array.isArray(claims)) {
    return 0;
  }

  // Extract org, course, run from courseKey (e.g., "course-v1:Toyo+test+1")
  // and match against unit_key (e.g., "block-v1:Toyo+test+1+type@problem+block@...")
  const courseIdPattern = courseKey.replace('course-v1:', '');

  return claims
    .filter(claim => claim.unit_key && claim.unit_key.includes(courseIdPattern))
    .reduce((total, claim) => total + parseFloat(claim.reward_amount || 0), 0);
}

/**
 * Calculate progress percentage
 * @param {number} earned - Amount earned
 * @param {number} total - Total possible
 * @returns {number} Percentage (0-100)
 */
export function calculateProgress(earned, total) {
  if (!total || total === 0) {
    return 0;
  }

  return Math.min(Math.round((earned / total) * 100), 100);
}

/**
 * Get icon for transaction type
 * @param {string} transactionType - Type of transaction
 * @returns {string} Icon class or emoji
 */
export function getTransactionIcon(transactionType) {
  const icons = {
    unit_completion: '✅',
    manual_adjustment: '⚙️',
    store_purchase: '🛒',
    bonus: '🎁',
    refund: '↩️',
  };

  return icons[transactionType] || '💰';
}
