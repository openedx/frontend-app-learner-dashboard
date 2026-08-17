/* istanbul ignore file */
import ActionButton from "containers/DashboardCard/ActionButton";
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from "../../messages";

export const BeginPathwayButton = () => {
  const { formatMessage } = useIntl();
  return (
    <ActionButton
      as="a"
      href="#"
      onClick={() => { /** TODO */ }}
    >
      {formatMessage(messages.beginPathway)}
    </ActionButton>
  );
};
