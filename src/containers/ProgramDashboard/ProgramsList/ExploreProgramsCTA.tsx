import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Card, Button } from '@openedx/paragon';
import { Search } from '@openedx/paragon/icons';
import messages from './messages';

const ExploreProgramsCTA: React.FC = () => {
  const { formatMessage } = useIntl();

  const href = getConfig().EXPLORE_PROGRAMS_URL || `${getConfig().LMS_BASE_URL}/courses`;
  return (
    <Card>
      <Card.Section>
        {formatMessage(messages.exploreCoursesCTAText)}
      </Card.Section>
      <Card.Footer className="justify-content-center">
        <Button
          as="a"
          href={href}
          iconBefore={Search}
        >
          {formatMessage(messages.exploreCoursesCTAButtonText)}
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ExploreProgramsCTA;
