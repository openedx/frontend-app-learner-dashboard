import { useIntl } from '@openedx/frontend-base';

import messages from './messages';

export default function MyLearningLink() {
  const { formatMessage } = useIntl();

  return (
    <div className="d-flex">
      <span>{formatMessage(messages.myLearning)}</span>
    </div>
  );
}

