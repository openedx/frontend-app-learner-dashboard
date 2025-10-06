/**
 * Hook to fetch and manage user's Toyo Bucks account
 */

import { useState, useEffect } from 'react';
import { getToyoBucksAccount } from '../../../../data/services/toyoBucks/api';

export function useToyoBucksAccount() {
  const [account, setAccount] = useState({
    balance: '0.00',
    totalEarned: 0,
    totalSpent: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchAccount() {
      try {
        const data = await getToyoBucksAccount();

        if (isMounted) {
          setAccount({
            balance: data.balance || '0.00',
            totalEarned: data.total_earned || 0,
            totalSpent: data.total_spent || 0,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching Toyo Bucks account:', error);
          setAccount(prev => ({
            ...prev,
            isLoading: false,
            error: error.message || 'Failed to load account',
          }));
        }
      }
    }

    fetchAccount();

    return () => {
      isMounted = false;
    };
  }, []);

  return account;
}

export default useToyoBucksAccount;
