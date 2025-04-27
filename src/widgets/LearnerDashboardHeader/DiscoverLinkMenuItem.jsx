import { useContext } from 'react';
import { LinkMenuItem, useIntl } from '@openedx/frontend-base';

import GlobalDataContext from '../../data/contexts/GlobalDataContext';
import urls from '../../data/services/lms/urls';
import messages from './messages';

function DiscoverLink() {
  const { formatMessage } = useIntl();

  return (
    <div className="d-flex">
      <span>{formatMessage(messages.discoverNew)}</span>
    </div>
  );
}

export default function DiscoverLinkMenuItem({ variant = 'hyperlink' }) {
  const { platformSettings } = useContext(GlobalDataContext);
  const { courseSearchUrl } = platformSettings;
  const url = urls.baseAppUrl(courseSearchUrl);

  return (
    <LinkMenuItem
      label={<DiscoverLink />}
      url={url}
      variant={variant}
    />
  );
}
