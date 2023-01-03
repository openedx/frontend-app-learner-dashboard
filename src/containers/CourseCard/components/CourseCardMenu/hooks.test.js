import { MockUseState } from 'testUtils';
import { reduxHooks } from 'hooks';
import track from 'tracking';

import * as hooks from './hooks';

jest.mock('hooks', () => ({
  reduxHooks: {
    useTrackCourseEvent: jest.fn(),
  },
}));

const trackCourseEvent = jest.fn();
reduxHooks.useTrackCourseEvent.mockReturnValue(trackCourseEvent);
const state = new MockUseState(hooks);

const cardId = 'test-card-id';
let out;

describe('CourseCardMenu hooks', () => {
  describe('state values', () => {
    state.testGetter(state.keys.isUnenrollConfirmVisible);
    state.testGetter(state.keys.isEmailSettingsVisible);
  });

  describe('useUnenrollData', () => {
    beforeEach(() => {
      state.mock();
      out = hooks.useUnenrollData();
    });
    afterEach(state.restore);

    test('default state', () => {
      expect(out.isVisible).toEqual(state.stateVals.isUnenrollConfirmVisible);
    });

    test('show', () => {
      out.show();
      state.expectSetStateCalledWith(state.keys.isUnenrollConfirmVisible, true);
    });

    test('hide', () => {
      out.hide();
      state.expectSetStateCalledWith(state.keys.isUnenrollConfirmVisible, false);
    });
  });

  describe('useEmailSettings', () => {
    let out;
    beforeEach(() => {
      state.mock();
      out = hooks.useEmailSettings();
    });
    afterEach(state.restore);

    test('default state', () => {
      expect(out.isVisible).toEqual(state.stateVals.isEmailSettingsVisible);
    });

    test('show', () => {
      out.show();
      state.expectSetStateCalledWith(state.keys.isEmailSettingsVisible, true);
    });

    test('hide', () => {
      out.hide();
      state.expectSetStateCalledWith(state.keys.isEmailSettingsVisible, false);
    });
  });

  describe('useHandleToggleDropdown', () => {
    beforeEach(() => {
      out = hooks.useHandleToggleDropdown(cardId);
    });
    describe('behavior', () => {
      it('initializes course event tracker with event name and card ID', () => {
        expect(reduxHooks.useTrackCourseEvent).toHaveBeenCalledWith(
          track.course.courseOptionsDropdownClicked,
          cardId,
        );
      });
    });
    describe('returned method', () => {
      it('calls trackCourseEvent iff true is passed', () => {
        out(false);
        expect(trackCourseEvent).not.toHaveBeenCalled();
        out(true);
        expect(trackCourseEvent).toHaveBeenCalled();
      });
    });
  });
});
