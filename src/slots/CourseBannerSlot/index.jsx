import PropTypes from 'prop-types';
import { Slot } from '@openedx/frontend-base';
import CourseBanner from '../../containers/CourseCard/components/CourseCardBanners/CourseBanner';

const CourseBannerSlot = ({ cardId }) => (
  <Slot
    id="org.openedx.frontend.slot.learnerDashboard.courseCardBanner.v1"
    cardId={cardId}
  >
    <CourseBanner cardId={cardId} />
  </Slot>
);

CourseBannerSlot.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseBannerSlot;
