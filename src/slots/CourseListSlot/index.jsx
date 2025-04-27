import { Slot } from '@openedx/frontend-base';
import { CourseList, courseListDataShape } from '../../containers/CoursesPanel/CourseList';

export const CourseListSlot = ({ courseListData }) => (
  <Slot
    id="org.openedx.frontend.slot.learnerDashboard.courseList.v1"
    courseListData={courseListData}
  >
    <CourseList courseListData={courseListData} />
  </Slot>
);

CourseListSlot.propTypes = {
  courseListData: courseListDataShape,
};

export default CourseListSlot;
