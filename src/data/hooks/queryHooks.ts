import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useBackedData, useMasquerade } from 'data/context';
import {
  initializeList,
<<<<<<< Updated upstream
=======
  getCourseCompletion,
  getCourseAssignmentsCardInfo,
  getAnnouncements,
>>>>>>> Stashed changes
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
  let { data } = query;
  if (masqueradeUser && query.isError) {
    data = backUpData;
  }

  return { ...query, data };
};

<<<<<<< Updated upstream
export {
  useInitializeLearnerHome,
=======
const useCourseCompletion = () => useQuery({
  queryKey: learnerDashboardQueryKeys.courseCompletion(),
  queryFn: getCourseCompletion,
  retry: false,
});

const useCourseAssignmentsCardInfo = (courseIds: string[]) => useQuery({
  queryKey: learnerDashboardQueryKeys.courseAssignmentsCardInfo(courseIds),
  queryFn: () => getCourseAssignmentsCardInfo(courseIds),
  enabled: courseIds.length > 0,
  retry: false,
});

const useAnnouncements = () => useQuery({
  queryKey: learnerDashboardQueryKeys.announcements(),
  queryFn: getAnnouncements,
  retry: false,
});

export {
  useInitializeLearnerHome,
  useCourseCompletion,
  useCourseAssignmentsCardInfo,
  useAnnouncements,
>>>>>>> Stashed changes
};
