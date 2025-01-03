import { keyStore } from 'utils';
import { createEventTracker, createLinkTracker } from 'data/services/segment/utils';
import { categories, eventNames } from '../constants';
import * as trackers from './course';

jest.mock('data/services/segment/utils', () => ({
  createEventTracker: jest.fn(args => ({ createEventTracker: args })),
  createLinkTracker: jest.fn((cb, href) => ({ createLinkTracker: { cb, href } })),
}));

const testEventName = 'test-event-name';
const courseId = 'test-course-id';
const options = { test: 'options' };
const href = 'test-href';
const moduleKeys = keyStore(trackers);

describe('course trackers', () => {
  describe('Utilities and helpers', () => {
    describe('courseEventTracker', () => {
      it('calls createEventTracker w/ label, category and passed options', () => {
        expect(trackers.courseEventTracker(testEventName, courseId, options)).toEqual(
          createEventTracker(
            testEventName,
            { category: categories.dashboard, label: courseId, test: options.test },
          ),
        );
      });
      it('defaults to passing an empty object for options if not provided', () => {
        expect(trackers.courseEventTracker(testEventName, courseId)).toEqual(
          createEventTracker(testEventName, { category: categories.dashboard, label: courseId }),
        );
      });
    });
    describe('courseLinkTracker', () => {
      it('returns link tracker creation method', () => {
        expect(trackers.courseLinkTracker(testEventName)(courseId, href)).toEqual(
          createLinkTracker(trackers.courseEventTracker(testEventName, courseId), href),
        );
      });
    });
  });
  describe('Non-link events', () => {
    describe('courseOptionsDropdownClicked', () => {
      it('creates course event tracker for courseOptionsDropdownClicked event', () => {
        expect(trackers.courseOptionsDropdownClicked(courseId)).toEqual(
          trackers.courseEventTracker(eventNames.courseOptionsDropdownClicked, courseId),
        );
      });
    });
  });
  describe('Link events', () => {
    const courseLinkTracker = (eventName) => (...args) => ({
      courseLinkTracker: { eventName, ...args },
    });
    beforeEach(() => {
      jest.spyOn(trackers, moduleKeys.courseLinkTracker).mockImplementationOnce(courseLinkTracker);
    });
    describe('courseImageClicked', () => {
      it('creates courseLinkTracker for courseImageClicked event', () => {
        expect(trackers.courseImageClicked(courseId, href)).toEqual(
          courseLinkTracker(eventNames.courseImageClicked)(courseId, href),
        );
      });
    });
    describe('courseTitleClicked', () => {
      it('creates courseLinkTracker for courseTitleClicked event', () => {
        expect(trackers.courseTitleClicked(courseId, href)).toEqual(
          courseLinkTracker(eventNames.courseTitleClicked)(courseId, href),
        );
      });
    });
    describe('enterCourseClicked', () => {
      it('creates courseLinkTracker for enterCourseClicked event', () => {
        expect(trackers.enterCourseClicked(courseId, href)).toEqual(
          courseLinkTracker(eventNames.enterCourseClicked)(courseId, href),
        );
      });
    });
  });
});
