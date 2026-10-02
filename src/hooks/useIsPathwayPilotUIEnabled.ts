import { useAppConfig } from '@openedx/frontend-base';

const useIsPathwayPilotUIEnabled = () => useAppConfig().ENABLE_PATHWAY_PILOT_UI === true;

export default useIsPathwayPilotUIEnabled;
