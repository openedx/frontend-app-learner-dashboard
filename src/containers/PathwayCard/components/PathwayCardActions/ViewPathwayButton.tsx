import { useIntl } from '@edx/frontend-platform/i18n';
import ActionButton from 'containers/DashboardCard/ActionButton';
import { usePathwayData } from 'hooks/usePathwayData';

import messages from '../../messages';

export const ViewPathwayButton = ({ cardId }: {cardId: string }) => {
  const { formatMessage } = useIntl();
  const pathwayData = usePathwayData(cardId);
  const homeUrl = pathwayData.pathwayRun.homeUrl;

  return (
    <ActionButton
      as="a"
      href={homeUrl}
    >
      {formatMessage(messages.viewPathway)}
    </ActionButton>
  );
};
