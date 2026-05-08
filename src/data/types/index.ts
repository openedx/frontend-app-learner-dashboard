import { ProgramData } from '../../containers/ProgramDashboard/data/types';

export interface ProgramsListData {
  data: ProgramData[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}
