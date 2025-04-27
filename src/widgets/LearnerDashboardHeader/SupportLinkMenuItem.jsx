import { LinkMenuItem, getAppConfig, useIntl } from '@openedx/frontend-base';

import { appId } from '../../constants';
import messages from './messages';

function SupportLink() {
  const { formatMessage } = useIntl();

  return (
    <div className="d-flex">
      <span>{formatMessage(messages.help)}</span>
    </div>
  );
}

export default function SupportLinkMenuItem({ variant = 'hyperlink' }) {
  const { SUPPORT_URL: url } = getAppConfig(appId);

  if (!url)
    return null;

  return (
    <LinkMenuItem
      label={<SupportLink />}
      url={url}
      variant={variant}
    />
  );
}
