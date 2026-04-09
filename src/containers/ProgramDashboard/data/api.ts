
import { useQuery } from '@tanstack/react-query';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const fetchProgramsListData = async () => {
  const url = `${getConfig().LMS_BASE_URL}/api/dashboard/v0/programs/`;
  const { data } = await getAuthenticatedHttpClient().get(url);
  return data;
};

export const useProgramsListData = () => {
  return useQuery({
    queryKey: ['programsList'],
    queryFn: fetchProgramsListData,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
