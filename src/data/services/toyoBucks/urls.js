/**
 * Toyo Bucks API URLs
 */

const BASE_URL = '/api/toyo-bucks/v1';

export const getToyoBucksAccountUrl = () => `${BASE_URL}/accounts/my_account/`;

export const getToyoBucksTransactionsUrl = (limit = 50) => `${BASE_URL}/transactions/my_transactions/?limit=${limit}`;

export const getCourseRewardsUrl = (courseKey) => `${BASE_URL}/rewards/by_course/?course_key=${encodeURIComponent(courseKey)}`;

export const getMyClaimsUrl = () => `${BASE_URL}/claims/my_claims/`;

export const getUnitRewardUrl = (unitKey) => `${BASE_URL}/rewards/by_unit/?unit_key=${encodeURIComponent(unitKey)}`;

export const claimRewardUrl = () => `${BASE_URL}/claims/claim/`;
