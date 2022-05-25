import { initialState, reducer, actions } from './reducer';

describe('app reducer', () => {
  describe('initialState', () => {
    test('populated, but empty course metadata', () => {
      const data = initialState.courseMetadata;
      expect(data.name).toEqual('');
      expect(data.number).toEqual('');
      expect(data.org).toEqual('');
      expect(data.courseId).toEqual('');
    });
    test('disabled (waffle flag)', () => {
      expect(initialState.isEnabled).toEqual(false);
    });
    test('not grading', () => {
      expect(initialState.isGrading).toEqual(false);
    });
    test('populated, but empty ora metadata', () => {
      const data = initialState.oraMetadata;
      expect(data.prompt).toEqual('');
      expect(data.name).toEqual('');
      expect(data.type).toEqual('');
      expect(data.rubricConfig).toEqual(null);
    });
    test('not showing review', () => {
      expect(initialState.showReview).toEqual(false);
    });
    test('not showing rubric', () => {
      expect(initialState.showRubric).toEqual(false);
    });
  });
  describe('reducers', () => {
    it('returns initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
    const testState = {
      ...initialState,
      showRubric: true,
      showReview: true,
      arbitrary: 'state',
    };
    const testValue = 'my-test-value';
    const testAction = (action, expected) => {
      expect(reducer(testState, action)).toEqual({
        ...testState,
        ...expected,
      });
    };
    describe('action handlers', () => {
      test('loadIsEnabled loads isEnabled from payload', () => {
        testAction(actions.loadIsEnabled(testValue), { isEnabled: testValue });
      });
      test('loadCourseMetadata loads courseMetadata from payload', () => {
        testAction(actions.loadCourseMetadata(testValue), { courseMetadata: testValue });
      });
      test('loadOraMetadata loads oraMetadata from payload', () => {
        testAction(actions.loadOraMetadata(testValue), { oraMetadata: testValue });
      });
      describe('setShowReview', () => {
        it('loads showReview, sets showRubric to false if set to false', () => {
          testAction(actions.setShowReview(true), { showReview: true });
          testAction(actions.setShowReview(false), { showReview: false, showRubric: false });
        });
      });
      test('setShowRubric loads showRubric from payload', () => {
        testAction(actions.setShowRubric(testValue), { showRubric: testValue });
      });
      test('toggleShowRubric toggles showRubric value', () => {
        testAction(actions.toggleShowRubric(), { showRubric: !testState.showRubric });
      });
    });
  });
});
