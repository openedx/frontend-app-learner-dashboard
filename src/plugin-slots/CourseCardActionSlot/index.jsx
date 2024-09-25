import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

import { reduxHooks } from 'hooks';
import UpgradeButton from '../../containers/CourseCard/components/CourseCardActions/UpgradeButton';

const CourseCardActionSlot = ({ cardId }) => {
  const { isEntitlement } = reduxHooks.useCardEntitlementData(cardId);
  const {
    isVerified,
    isExecEd2UCourse,
  } = reduxHooks.useCardEnrollmentData(cardId);

  return (
    <PluginSlot
      id="course_card_action_slot"
      pluginProps={{
        cardId,
      }}
    >
      {!(isEntitlement || isVerified || isExecEd2UCourse) && <UpgradeButton cardId={cardId} />}
    </PluginSlot>
  );
};

CourseCardActionSlot.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardActionSlot;
