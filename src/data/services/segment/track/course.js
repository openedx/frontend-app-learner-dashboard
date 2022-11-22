import { categories, eventNames } from '../constants';
import { createEventTracker, createLinkTracker } from '../utils';

/** Course Link events **/
const courseEventTracker = (eventName, courseId, options = {}) => createEventTracker(
  eventName,
  { category: categories.dashboard, label: courseId, ...options },
);
/**
 * Generate a hook to allow components to provide a courseId and link href and provide
 * a link tracker with defined event name and options, over a set of default optiosn.
 * @param {string} eventName - event name for the click event
 * @param {[object]} options - (optional) event options
 * @return {callback} - component hook returning a link tracking event callback
 */
const courseLinkTracker = (eventName, options = {}) => (courseId, href) => createLinkTracker(
  courseEventTracker(eventName, options, courseId),
  href,
);

const upgradeButtonClicked = (courseId) => createEventTracker(
  eventNames.upgradeButtonClicked,
  { category: categories.upgrade, label: courseId },
);
const upgradeButtonClickedEnrollment = () => createEventTracker(
  eventNames.upgradeButtonClickedEnrollment,
  { location: 'learner_dashboard' },
);
const upgradeButtonClickedUpsell = () => createEventTracker(
  eventNames.upgradeButtonClickedUpsell,
  {
    linkName: 'course_dashboard_green',
    linkType: 'button',
    pageName: 'course_dashboard',
    linkCategory: 'green_update',
  },
);

export const courseImageClicked = courseLinkTracker(eventNames.courseImageClicked);
export const courseOptionsDropdownClicked = (courseId) => courseEventTracker(
  eventNames.courseOptionsDropdownClicked,
  courseId,
);
export const courseTitleClicked = courseLinkTracker(eventNames.courseTitleClicked);
export const enterCourseClicked = courseLinkTracker(eventNames.enterCourseClicked);
export const upgradeClicked = (courseId, href) => createLinkTracker(
  () => {
    upgradeButtonClicked(courseId);
    upgradeButtonClickedEnrollment();
    upgradeButtonClickedUpsell();
  },
  href,
);

export default {
  courseImageClicked,
  courseOptionsDropdownClicked,
  courseTitleClicked,
  enterCourseClicked,
  upgradeClicked,
};
