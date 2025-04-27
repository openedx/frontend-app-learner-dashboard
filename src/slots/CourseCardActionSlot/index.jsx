import PropTypes from 'prop-types';
import { Slot } from '@openedx/frontend-base';

const CourseCardActionSlot = ({ cardId }) => (
  <Slot
    id="org.openedx.frontend.slot.learnerDashboard.courseCardAction.v1"
    cardId={cardId}
  />
);

CourseCardActionSlot.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardActionSlot;
