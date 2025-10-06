import PropTypes from 'prop-types';
import { Card, Skeleton } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useToyoBucksRewards } from './hooks';
import { reduxHooks } from '../../../../hooks';
import messages from './messages';

import './index.scss';

export const ToyoBucksRewardInfo = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { courseId } = reduxHooks.useCardCourseRunData(cardId);
  const {
    totalRewards,
    claimedAmount,
    isLoading,
    error,
  } = useToyoBucksRewards(courseId);

  // Don't render if there's an error
  if (error) {
    return null;
  }

  if (isLoading) {
    return (
      <Card.Section className="pt-0 pb-2">
        <Skeleton height={20} width="60%" />
      </Card.Section>
    );
  }

  const progress = totalRewards > 0 ? Math.round((claimedAmount / totalRewards) * 100) : 0;
  const toyoBucksLabel = formatMessage(messages.toyoBucksClaimed, {
    claimed: Math.round(claimedAmount),
    total: Math.round(totalRewards),
  });

  return (
    <Card.Section className="pt-0 pb-2" data-testid="ToyoBucksRewardInfo">
      <div className="toyo-bucks-section">
        <div className="toyo-bucks-header">
          <div className="toyo-bucks-label">
            <span>{toyoBucksLabel}</span>
          </div>
        </div>
      </div>
    </Card.Section>
  );
};

ToyoBucksRewardInfo.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default ToyoBucksRewardInfo;
