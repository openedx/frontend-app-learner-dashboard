import { createEventTracker } from 'data/services/segment/utils';
import { eventNames } from '../constants';
import * as trackers from './entitlements';

jest.mock('data/services/segment/utils', () => ({
  createEventTracker: jest.fn(args => ({ createEventTracker: args })),
}));

const fromCourseRun = 'test-from-course-run';
const toCourseRun = 'test-to-course-run';

describe('entitlements trackers', () => {
  describe('leaveSession', () => {
    it('creates event tracker for leaveSession event', () => {
      expect(trackers.leaveSession(fromCourseRun)).toEqual(
        createEventTracker(eventNames.leaveSession, { fromCourseRun, toCourseRun: null }),
      );
    });
  });
  describe('newSession', () => {
    it('creates event tracker for newSession event', () => {
      expect(trackers.newSession(toCourseRun)).toEqual(
        createEventTracker(eventNames.newSession, { fromCourseRun: null, toCourseRun }),
      );
    });
  });
  describe('switchSession', () => {
    it('creates event tracker for switchSession event', () => {
      expect(trackers.switchSession(fromCourseRun, toCourseRun)).toEqual(
        createEventTracker(eventNames.switchSession, { fromCourseRun, toCourseRun }),
      );
    });
  });
});
