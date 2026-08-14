import ActionButton from "containers/DashboardCard/ActionButton";
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from "../../messages";

export const ResumeButton = () => {
  const { formatMessage } = useIntl();
  return (
    <ActionButton
      as="a"
      href="#"
      /* istanbul ignore if */
      onClick={() => { /** TODO */ }}
    >
      {formatMessage(messages.resume)}
    </ActionButton>
  );
};