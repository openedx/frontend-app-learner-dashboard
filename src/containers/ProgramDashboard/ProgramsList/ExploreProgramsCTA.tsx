import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Card, Button } from '@openedx/paragon';
import { Search } from '@openedx/paragon/icons';
import { ExploreProgramsCTAProps } from '../data/types';
import messages from './messages';

const ExploreProgramsCTA: React.FC<ExploreProgramsCTAProps> = ({
  hasEnrollments = true,
}) => {
  const { formatMessage } = useIntl();

  const href = getConfig().EXPLORE_PROGRAMS_URL || `${getConfig().LMS_BASE_URL}/courses`;
  return (
    <Card data-testid="explore-programs-cta">
      <Card.Section>
        {hasEnrollments ? (
          formatMessage(messages.exploreProgramsCTAText)
        ) : (
          <h2 className="text-center">
            {formatMessage(messages.hasNoEnrollmentsText)}
          </h2>
        )}
      </Card.Section>
      <Card.Footer className="justify-content-center">
        <Button
          as="a"
          href={href}
          iconBefore={Search}
        >
          {formatMessage(messages.exploreProgramsCTAButtonText)}
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ExploreProgramsCTA;
