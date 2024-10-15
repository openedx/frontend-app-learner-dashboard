import { StrictDict } from 'utils';
import track from 'tracking';

export const linkNames = StrictDict({
  findCoursesWidget: 'learner_home_widget_explore',
});

export const findCoursesWidgetClicked = (href) => track.findCourses.findCoursesClicked(href, {
  linkName: linkNames.findCoursesWidget,
});

export default {
  linkNames,
  findCoursesWidgetClicked,
};
