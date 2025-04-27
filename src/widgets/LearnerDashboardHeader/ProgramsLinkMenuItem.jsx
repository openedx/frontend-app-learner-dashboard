import { LinkMenuItem, useIntl } from '@openedx/frontend-base';

import urls from '../../data/services/lms/urls';
import messages from './messages';

function ProgramsLink() {
  const { formatMessage } = useIntl();

  return (
    <div className="d-flex">
      <span>{formatMessage(messages.program)}</span>
    </div>
  );
}

export default function ProgramsLinkMenuItem({ variant = 'hyperlink' }) {
  const url = urls.programsUrl();

  return (
    <LinkMenuItem
      label={<ProgramsLink />}
      url={url}
      variant={variant}
    />
  );
}
