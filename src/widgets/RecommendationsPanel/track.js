import { StrictDict } from 'utils';
import { createLinkTracker, createEventTracker } from 'data/services/segment/utils';
import track from 'tracking';

export const eventNames = StrictDict({
  recommendedCourseClicked: 'edx.bi.user.recommended.course.click',
});

export const findCoursesWidgetClicked = (href) => track.findCourses.findCoursesClicked(href, {
  linkName: 'learner_home_widget_explore',
});

export const recommendedCourseClicked = (courseKey, isPersonalized, href) => createLinkTracker(
  createEventTracker(eventNames.recommendedCourseClicked, {
    course_key: courseKey,
    is_personalized_recommendation: isPersonalized,
  }),
  href,
);

export default {
  findCoursesWidgetClicked,
  recommendedCourseClicked,
};
