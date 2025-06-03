import React from 'react';

import Header from '@edx/frontend-component-header';
import MasqueradeBar from 'containers/MasqueradeBar';
import ConfirmEmailBanner from './ConfirmEmailBanner';

export const LearnerDashboardHeader = () => (
  <>
    <ConfirmEmailBanner />
    <Header />
    <MasqueradeBar />
  </>
);

LearnerDashboardHeader.propTypes = {};

export default LearnerDashboardHeader;
