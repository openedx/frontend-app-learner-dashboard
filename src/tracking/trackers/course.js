import api from 'data/services/lms/api';
import { createEventTracker, createLinkTracker } from 'data/services/segment/utils';
import { categories, eventNames } from '../constants';
import * as module from './course';

export const upsellOptions = {
  linkName: 'course_dashboard_green',
  linkType: 'button',
  pageName: 'course_dashboard',
  linkCategory: 'green_update',
};

// Utils/Helpers
/**
 * Generate a segement event tracker for a given course event.
 * @param {string} eventName - segment event name
 * @param {string} courseId - course run identifier
 * @param {[object]} options - optional event data
 */
export const courseEventTracker = (eventName, courseId, options = {}) => createEventTracker(
  eventName,
  { category: categories.dashboard, label: courseId, ...options },
);
/**
 * Generate a hook to allow components to provide a courseId and link href and provide
 * a link tracker with defined event name and options, over a set of default optiosn.
 * @param {string} eventName - event name for the click event
 * @return {callback} - component hook returning a link tracking event callback
 */
export const courseLinkTracker = (eventName) => (courseId, href) => (
  createLinkTracker(module.courseEventTracker(eventName, courseId), href)
);

// Upgrade Events
/**
 * There are currently multiple tracked api events for the upgrade event, with different targets.
 * Goal here is to split out the tracked events for easier testing.
 */
export const upgradeButtonClicked = (courseId) => createEventTracker(
  eventNames.upgradeButtonClicked,
  { category: categories.upgrade, label: courseId },
);
export const upgradeButtonClickedUpsell = (courseId) => createEventTracker(
  eventNames.upgradeButtonClickedUpsell,
  { ...upsellOptions, courseId },
);

// Non-Link events
export const courseOptionsDropdownClicked = (courseId) => (
  module.courseEventTracker(eventNames.courseOptionsDropdownClicked, courseId)
);

// Link events (track and then change page location)
export const courseImageClicked = (...args) => (
  module.courseLinkTracker(eventNames.courseImageClicked)(...args));
export const courseTitleClicked = (...args) => (
  module.courseLinkTracker(eventNames.courseTitleClicked)(...args));
export const enterCourseClicked = (...args) => (
  module.courseLinkTracker(eventNames.enterCourseClicked)(...args));
export const upgradeClicked = (courseId, href) => createLinkTracker(
  () => {
    module.upgradeButtonClicked(courseId)();
    module.upgradeButtonClickedUpsell(courseId)();
    api.logUpgrade({ courseId });
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
