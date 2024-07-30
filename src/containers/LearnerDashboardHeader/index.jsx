import React from 'react';

import MasqueradeBar from 'containers/MasqueradeBar';
import ConfirmEmailBanner from './ConfirmEmailBanner';

import CollapsedHeader from './CollapsedHeader';
import ExpandedHeader from './ExpandedHeader';

// import './index.scss';

export const LearnerDashboardHeader = () => (
  <>
    <ConfirmEmailBanner />
    <CollapsedHeader />
    <ExpandedHeader />
    <MasqueradeBar />
  </>
);

LearnerDashboardHeader.propTypes = {};

export default LearnerDashboardHeader;
