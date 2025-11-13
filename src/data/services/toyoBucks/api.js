/**
 * Toyo Bucks API Client
 */

import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import * as urls from './urls';

/**
 * Get the current user's Toyo Bucks account information
 */
export async function getToyoBucksAccount() {
  const url = `${getConfig().LMS_BASE_URL}${urls.getToyoBucksAccountUrl()}`;

  try {
    const { data } = await getAuthenticatedHttpClient().get(url);
    return data;
  } catch (error) {
    // If account doesn't exist yet, return default structure
    if (error.response?.status === 404) {
      return {
        balance: '0.00',
        total_earned: 0,
        total_spent: 0,
      };
    }
    throw error;
  }
}

/**
 * Get rewards for a specific course
 */
export async function getCourseRewards(courseKey) {
  const url = `${getConfig().LMS_BASE_URL}${urls.getCourseRewardsUrl(courseKey)}`;

  try {
    const { data } = await getAuthenticatedHttpClient().get(url);
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      return {
        course_key: courseKey,
        total_possible_rewards: 0,
        unit_rewards: [],
      };
    }
    throw error;
  }
}

/**
 * Get the current user's claimed rewards
 */
export async function getMyClaims() {
  const url = `${getConfig().LMS_BASE_URL}${urls.getMyClaimsUrl()}`;

  try {
    const { data } = await getAuthenticatedHttpClient().get(url);
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}

/**
 * Get recent transactions
 */
export async function getRecentTransactions(limit = 5) {
  const url = `${getConfig().LMS_BASE_URL}${urls.getToyoBucksTransactionsUrl(limit)}`;

  try {
    const { data } = await getAuthenticatedHttpClient().get(url);
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}

/**
 * Get reward information for a specific unit
 */
export async function getUnitReward(unitKey) {
  const url = `${getConfig().LMS_BASE_URL}${urls.getUnitRewardUrl(unitKey)}`;

  try {
    const { data } = await getAuthenticatedHttpClient().get(url);
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * Claim a reward for a unit
 */
export async function claimReward(unitKey) {
  const url = `${getConfig().LMS_BASE_URL}${urls.claimRewardUrl()}`;

  const { data } = await getAuthenticatedHttpClient().post(url, {
    unit_key: unitKey,
  });

  return data;
}
