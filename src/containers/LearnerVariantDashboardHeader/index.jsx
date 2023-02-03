import React from 'react';

import MasqueradeBar from 'containers/MasqueradeBar';
import ConfirmEmailBanner from 'containers/LearnerDashboardHeader/ConfirmEmailBanner';

import CollapsedHeader from './CollapsedHeader';
import ExpandedHeader from './ExpandedHeader';

import './index.scss';

export const LearnerVariantDashboardHeader = () => (
  <>
    <ConfirmEmailBanner />
    <CollapsedHeader />
    <ExpandedHeader />
    <MasqueradeBar />
  </>
);

LearnerVariantDashboardHeader.propTypes = {};

export default LearnerVariantDashboardHeader;
