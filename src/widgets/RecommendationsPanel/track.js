import { StrictDict } from 'utils';
import { createLinkTracker, createEventTracker } from 'data/services/segment/utils';
import track from 'tracking';

export const eventNames = StrictDict({
  recommendedCourseClicked: 'edx.bi.user.recommended.course.click',
});

export const linkNames = StrictDict({
  findCoursesWidget: 'learner_home_widget_explore',
});

export const findCoursesWidgetClicked = (href) => track.findCourses.findCoursesClicked(href, {
  linkName: linkNames.findCoursesWidget,
});

export const recommendedCourseClicked = (courseKey, isControl, href) => createLinkTracker(
  createEventTracker(eventNames.recommendedCourseClicked, {
    course_key: courseKey,
    is_control: isControl,
    page: 'dashboard',
  }),
  href,
);

export default {
  findCoursesWidgetClicked,
  recommendedCourseClicked,
};
