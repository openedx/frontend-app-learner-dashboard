import { useIntl } from '@openedx/frontend-base';

import messages from './messages';

export default function CoursesLink() {
  const { formatMessage } = useIntl();

  return (
    <div className="d-flex">
      <span>{formatMessage(messages.course)}</span>
    </div>
  );
}

