import { LinkMenuItem, getAppConfig, useIntl } from '@openedx/frontend-base';

import { appId } from '../../constants';
import messages from './messages';

function OrderHistoryLink() {
  const { formatMessage } = useIntl();

  return (
    <div className="d-flex">
      <span>{formatMessage(messages.orderHistory)}</span>
    </div>
  );
}

export default function OrderHistoryLinkMenuItem({ variant = 'hyperlink' }) {
  const { ORDER_HISTORY_URL: url } = getAppConfig(appId);

  if (!url)
    return null;

  return (
    <LinkMenuItem
      label={<OrderHistoryLink />}
      url={url}
      variant={variant}
    />
  );
}
