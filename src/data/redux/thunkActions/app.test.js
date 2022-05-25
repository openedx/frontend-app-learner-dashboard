import { locationId } from 'data/constants/app';

import { selectors, actions } from 'data/redux';
import { keyStore } from 'utils';
import * as thunkActions from './app';

jest.mock('./requests', () => ({
  initializeApp: (args) => ({ initializeApp: args }),
  batchUnlock: (args) => ({ batchUnlock: args }),
}));

const dispatch = jest.fn((action) => ({ dispatch: action }));
const testState = { my: 'test state' };
const getState = () => testState;
const moduleKeys = keyStore(thunkActions);

describe('app thunkActions', () => {
  let dispatchedAction;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('initialize', () => {
    beforeEach(() => {
      thunkActions.initialize()(dispatch);
      [[dispatchedAction]] = dispatch.mock.calls;
    });
    it('dispatches initializeApp with locationId and onSuccess', () => {
      expect(dispatchedAction.initializeApp.locationId).toEqual(locationId);
      expect(typeof dispatchedAction.initializeApp.onSuccess).toEqual('function');
    });
    describe('on success', () => {
      test('loads isEnabled, oraMetadata, courseMetadata and list data', () => {
        const response = {
          courseMetadata: { some: 'course-metadata' },
          isEnabled: { is: 'enabled?' },
          oraMetadata: { some: 'ora-metadata' },
          submissions: { some: 'submissions' },
        };
        dispatch.mockClear();
        dispatchedAction.initializeApp.onSuccess(response);
        expect(dispatch.mock.calls).toEqual([
          [actions.app.loadIsEnabled(response.isEnabled)],
          [actions.app.loadOraMetadata(response.oraMetadata)],
          [actions.app.loadCourseMetadata(response.courseMetadata)],
          [actions.submissions.loadList(response.submissions)],
        ]);
      });
    });
  });
  describe('cancelReview', () => {
    const gradingSelection = (args) => ({ gradingSelection: args });
    const mockInitialize = (args) => ({ initialize: args });
    const gradingKeys = keyStore(selectors.grading);
    beforeEach(() => {
      jest.spyOn(thunkActions, moduleKeys.initialize)
        .mockImplementationOnce(mockInitialize);
      jest.spyOn(selectors.grading, gradingKeys.selection)
        .mockImplementationOnce(gradingSelection);
      thunkActions.cancelReview()(dispatch, getState);
      [[dispatchedAction]] = dispatch.mock.calls;
    });
    it('dispatches batchUnlock with submissionUUIDs and onSuccess', () => {
      expect(dispatchedAction.batchUnlock.submissionUUIDs)
        .toEqual(gradingSelection(testState));
      expect(typeof dispatchedAction.batchUnlock.onSuccess).toEqual('function');
    });
    it('clears show review state and calls dispatches initialize thunkAction on success', () => {
      dispatch.mockClear();
      dispatchedAction.batchUnlock.onSuccess();
      expect(dispatch.mock.calls).toEqual([
        [actions.app.setShowReview(false)],
        [mockInitialize()],
      ]);
    });
  });
});
