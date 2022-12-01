import { StrictDict } from 'utils';
import { createLinkTracker, createEventTracker } from 'data/services/segment/utils';

export const eventNames = StrictDict({
  findCoursesClicked: 'edx.bi.dashboard.find_courses_button.clicked',
  recommendedCourseClicked: 'edx.bi.user.recommended.course.click',
});

export const findCoursesClicked = (href) => createLinkTracker(
  createEventTracker(eventNames.findCoursesClicked, {
    pageName: 'learner_home',
    linkType: 'button',
    linkCategory: 'search_button',
  }),
  href,
);

export const recommendedCourseClicked = (courseKey, isPersonalized, href) => createLinkTracker(
  createEventTracker(eventNames.recommendedCourseClicked, {
    course_key: courseKey,
    is_personalized_recommendation: isPersonalized,
  }),
  href,
);

export default {
  findCoursesClicked,
  recommendedCourseClicked,
};
