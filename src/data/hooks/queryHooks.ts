import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useBackedData, useMasquerade } from '@src/data/context';
import GlobalDataContext from '@src/data/contexts/GlobalDataContext';
import {
  initializeList,
} from '@src/data/services/lms/api';
import { getTransformedCourseDataObject } from '@src/utils/dataTransformers';
import { learnerDashboardQueryKeys } from './queryKeys';

const useInitializeLearnerHome = () => {
  const { masqueradeUser } = useMasquerade();
  const { backUpData, setBackUpData } = useBackedData();
  const { setEmailConfirmation, setPlatformSettings } = useContext(GlobalDataContext);

  const query = useQuery({
    queryKey: learnerDashboardQueryKeys.initialize(masqueradeUser),
    queryFn: async () => {
      const data = await initializeList(masqueradeUser);
      return {
        ...data,
        coursesByCardId: getTransformedCourseDataObject(data?.courses || []),
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes — dashboard data rarely changes while viewing
    retry: false,
    retryOnMount: !masqueradeUser,
    refetchOnMount: !masqueradeUser,
  });

  useEffect(() => {
    if (!masqueradeUser && query.data) {
      setBackUpData(query.data);
    }
  }, [masqueradeUser, query.data, setBackUpData]);

  // Populate shell-level GlobalDataProvider so header widgets can access this data
  useEffect(() => {
    if (query.data && !masqueradeUser) {
      if (query.data.emailConfirmation && setEmailConfirmation) {
        setEmailConfirmation(query.data.emailConfirmation);
      }
      if (query.data.platformSettings && setPlatformSettings) {
        setPlatformSettings(query.data.platformSettings);
      }
    }
  }, [masqueradeUser, query.data, setEmailConfirmation, setPlatformSettings]);

  // When masquerading fails, show the original user's dashboard rather than an error
  let { data } = query;
  if (masqueradeUser && query.isError) {
    data = backUpData;
  }

  return { ...query, data };
};

export {
  useInitializeLearnerHome,
};
