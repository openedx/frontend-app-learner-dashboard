import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useBackedData, useMasquerade } from 'data/context';
import {
  initializeList,
} from 'data/services/lms/api';
import { learnerDashboardQueryKeys } from './queryKeys';

const useInitializeLearnerHome = () => {
  const { masqueradeUser } = useMasquerade();
  const { backUpData, setBackUpData } = useBackedData();

  const query = useQuery({
    queryKey: learnerDashboardQueryKeys.initialize(masqueradeUser),
    queryFn: async () => initializeList(masqueradeUser),
    retry: false,
    retryOnMount: !masqueradeUser,
    refetchOnMount: !masqueradeUser,
  });

  useEffect(() => {
    if (!masqueradeUser && query.data) {
      setBackUpData(query.data);
    }
  }, [masqueradeUser, query.data, setBackUpData]);

  // When masquerading fails, show the original user's dashboard rather than an error
  const data = masqueradeUser && !query.isError ? query.data : backUpData;

  return { ...query, data };
};

export {
  useInitializeLearnerHome,
};
