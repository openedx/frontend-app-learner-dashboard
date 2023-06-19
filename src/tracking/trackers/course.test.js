import { keyStore } from 'utils';
import api from 'data/services/lms/api';
import { createEventTracker, createLinkTracker } from 'data/services/segment/utils';
import { categories, eventNames } from '../constants';
import * as trackers from './course';

jest.mock('data/services/lms/api', () => ({
  logUpgrade: jest.fn(),
}));

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
  describe('Upgrade Events', () => {
    describe('upgradeButtonClicked', () => {
      it('creates an event tracker for upgradeButtonClicked event with category and label', () => {
        expect(trackers.upgradeButtonClicked(courseId)).toEqual(createEventTracker(
          eventNames.upgradeButtonClicked,
          { category: categories.upgrade, label: courseId },
        ));
      });
    });
    describe('upgradeButtonClickedUpsell', () => {
      it('creates an event tracker for upgradeButtonClickedUpsell eventwith upsellOptions', () => {
        expect(trackers.upgradeButtonClickedUpsell(courseId)).toEqual(
          createEventTracker(
            eventNames.upgradeButtonClickedUpsell,
            { ...trackers.upsellOptions, courseId },
          ),
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
    describe('upgradeClicked', () => {
      it('triggers upgrade actions and api.logUpgrade with courseId', () => {
        const upgradeButtonClicked = jest.fn();
        const upgradeButtonClickedUpsell = jest.fn();
        const trackUpgradeButtonClicked = jest.fn(() => upgradeButtonClicked);
        const trackUpgradeButtonClickedUpsell = jest.fn(() => upgradeButtonClickedUpsell);
        jest.spyOn(trackers, moduleKeys.upgradeButtonClicked)
          .mockImplementationOnce(trackUpgradeButtonClicked);
        jest.spyOn(trackers, moduleKeys.upgradeButtonClickedUpsell)
          .mockImplementationOnce(trackUpgradeButtonClickedUpsell);
        const out = trackers.upgradeClicked(courseId, href).createLinkTracker;
        expect(out.href).toEqual(href);
        out.cb();
        expect(trackUpgradeButtonClicked).toHaveBeenCalledWith(courseId);
        expect(trackUpgradeButtonClickedUpsell).toHaveBeenCalledWith(courseId);
        expect(upgradeButtonClicked).toHaveBeenCalledWith();
        expect(upgradeButtonClickedUpsell).toHaveBeenCalledWith();
        expect(api.logUpgrade).toHaveBeenCalledWith({ courseId });
      });
    });
  });
});
