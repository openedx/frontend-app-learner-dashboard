import { skipToken, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useMasquerade } from '@src/data/context';
import GlobalDataContext from '@src/data/contexts/GlobalDataContext';
import useIsPathwayPilotUIEnabled from '@src/hooks/useIsPathwayPilotUIEnabled';
import {
  getPathwaysByCategory,
  getPathwaysByCourse,
  initializeList,
} from '@src/data/services/lms/api';
import { getTransformedCourseDataObject } from '@src/utils/dataTransformers';
import { learnerDashboardQueryKeys } from './queryKeys';

const useInitializeLearnerHome = () => {
  const { masqueradeUser } = useMasquerade();
  const queryClient = useQueryClient();
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
    retry: (failureCount, error: any) => {
      // Don't retry client errors (4xx) — they won't resolve on retry
      if (error?.response?.status >= 400 && error?.response?.status < 500) return false;
      return failureCount < 3;
    },
    retryOnMount: !masqueradeUser,
    refetchOnMount: !masqueradeUser,
  });

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

  // When masquerading fails, fall back to the normal user's cached data
  let { data } = query;
  if (masqueradeUser && query.isError) {
    data = queryClient.getQueryData(learnerDashboardQueryKeys.initialize(undefined));
  }

  return { ...query, data };
};

// Pathways in which the learner is enrolled, for each of the given courses.
const usePathwaysByCourse = (courseIds: string[]) => {
  const { masqueradeUser } = useMasquerade();
  const isPathwayPilotUIEnabled = useIsPathwayPilotUIEnabled();
  return useQuery({
    queryKey: learnerDashboardQueryKeys.pathwaysByCourse(courseIds, masqueradeUser),
    queryFn: isPathwayPilotUIEnabled && courseIds.length
      ? () => getPathwaysByCourse(courseIds, masqueradeUser)
      : skipToken,
  });
};

// Pathways in which the learner is enrolled, grouped by category.
const usePathwaysByCategory = () => {
  const { masqueradeUser } = useMasquerade();
  const isPathwayPilotUIEnabled = useIsPathwayPilotUIEnabled();
  return useQuery({
    queryKey: learnerDashboardQueryKeys.pathwaysByCategory(masqueradeUser),
    queryFn: isPathwayPilotUIEnabled ? () => getPathwaysByCategory(masqueradeUser) : skipToken,
  });
};

export {
  useInitializeLearnerHome,
  usePathwaysByCourse,
  usePathwaysByCategory,
};
