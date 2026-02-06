import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useBackedData, useMasquerade } from 'data/context';
import {
  initializeList,
} from 'data/services/lms/api';
import { lernerDashboardQueryKeys } from './queryKeys';

const useInitializeLearnerHome = () => {
  const { masqueradeUser } = useMasquerade();
  const { backUpData, setBackUpData } = useBackedData();

  const query = useQuery({
    queryKey: lernerDashboardQueryKeys.initialize(masqueradeUser),
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

  const data = masqueradeUser && !query.isError ? query.data : backUpData;

  return { ...query, data };
};

export {
  useInitializeLearnerHome,
};
