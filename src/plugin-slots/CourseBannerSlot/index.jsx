import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import CourseBanner from 'containers/CourseCard/components/CourseCardBanners/CourseBanner';

const CourseBannerSlot = ({ cardId }) => (
  <PluginSlot
    id="course_banner_slot"
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
