import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import CourseBanner from 'containers/CourseCard/components/CourseCardBanners/CourseBanner';

const CourseBannerSlot = ({ cardId }) => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.course_card_banner.v1"
    pluginProps={{
      cardId,
    }}
  >
    <CourseBanner
      cardId={cardId}
    />
  </PluginSlot>
);

CourseBannerSlot.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseBannerSlot;
