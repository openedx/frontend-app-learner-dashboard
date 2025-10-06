/**
 * Hook to fetch and manage Toyo Bucks rewards for a course
 */

import { useState, useEffect } from 'react';
import { getCourseRewards, getMyClaims } from '../../../../data/services/toyoBucks/api';
import { calculateClaimedForCourse } from '../../../../data/services/toyoBucks/utils';

export function useToyoBucksRewards(courseKey) {
  const [data, setData] = useState({
    totalRewards: 0,
    unitCount: 0,
    claimedAmount: 0,
    remainingRewards: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchRewards() {
      if (!courseKey) {
        setData(prev => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        // Fetch course rewards and user's claims in parallel
        const [rewardsData, claimsData] = await Promise.all([
          getCourseRewards(courseKey),
          getMyClaims(),
        ]);

        if (isMounted) {
          const totalRewards = parseFloat(rewardsData.total_possible_rewards || 0);
          const unitCount = rewardsData.unit_rewards?.length || 0;
          const claimedAmount = calculateClaimedForCourse(claimsData, courseKey);
          const remainingRewards = Math.max(0, totalRewards - claimedAmount);

          setData({
            totalRewards,
            unitCount,
            claimedAmount,
            remainingRewards,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching Toyo Bucks rewards:', error);
          setData(prev => ({
            ...prev,
            isLoading: false,
            error: error.message || 'Failed to load rewards',
          }));
        }
      }
    }

    fetchRewards();

    return () => {
      isMounted = false;
    };
  }, [courseKey]);

  return data;
}

export default useToyoBucksRewards;
