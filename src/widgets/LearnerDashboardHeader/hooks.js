import React from 'react';
import { useIntl } from '@openedx/frontend-base';
import { StrictDict } from 'utils';

import getLearnerHeaderMenu from './LearnerDashboardMenu';

export const state = StrictDict({
  isOpen: (val) => React.useState(val), // eslint-disable-line
});

export const useLearnerDashboardHeaderMenu = ({
  courseSearchUrl, authenticatedUser,
}) => {
  const { formatMessage } = useIntl();
  return getLearnerHeaderMenu(formatMessage, courseSearchUrl, authenticatedUser);
};

export default {
  useLearnerDashboardHeaderMenu,
};
