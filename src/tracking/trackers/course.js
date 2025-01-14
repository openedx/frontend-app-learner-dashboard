import { createEventTracker, createLinkTracker } from 'data/services/segment/utils';
import { categories, eventNames } from '../constants';
import * as module from './course';

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

export default {
  courseImageClicked,
  courseOptionsDropdownClicked,
  courseTitleClicked,
  enterCourseClicked,
};
