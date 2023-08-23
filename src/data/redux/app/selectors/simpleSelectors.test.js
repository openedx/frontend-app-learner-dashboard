import { keyStore } from 'utils';
import * as module from './simpleSelectors';

const {
  appSelector,
  simpleSelectors,
  cardSimpleSelectors,
  mkCardSelector,
} = module;

let keys;
let testData;

let testState;
const testString = 'test-STRING';
const testCardId = 'testCARD-id';

describe('app simple selectors', () => {
  describe('base app selector', () => {
  });
  describe('simple selectors', () => {
    keys = keyStore(simpleSelectors);
    test.each([
      keys.courseData,
      keys.platformSettings,
      keys.suggestedCourses,
      keys.emailConfirmation,
      keys.enterpriseDashboard,
      keys.selectSessionModal,
      keys.pageNumber,
      keys.socialShareSettings,
    ])('%s app simple selector forwards corresponding data from app store', (key) => {
      testState = { app: { [key]: testString, otherField: 'fake string' } };
      const { preSelectors, cb } = simpleSelectors[key];
      expect(preSelectors).toEqual([appSelector]);
      expect(cb(testState.app)).toEqual(testString);
    });
    test('enterpriseDashboard returns empty object if data returns null', () => {
      testState = { app: { enterpriseDashboard: null } };
      const { preSelectors, cb } = simpleSelectors.enterpriseDashboard;
      expect(preSelectors).toEqual([appSelector]);
      expect(cb(testState.app)).toEqual({});
    });
    describe('cardSimpleSelectors', () => {
      keys = keyStore(cardSimpleSelectors);
      test.each([
        keys.certificate,
        keys.course,
        keys.courseProvider,
        keys.courseRun,
        keys.credit,
        keys.enrollment,
        keys.entitlement,
        keys.gradeData,
      ])('%s card simple selector forwards corresponding data from passed object', (key) => {
        testState = { [key]: testString };
        expect(cardSimpleSelectors[key](testState)).toEqual(testString);
      });
      test('relatedPrograms simple selector forwards relatedPrograms from programs obj', () => {
        expect(
          cardSimpleSelectors.relatedPrograms({ programs: { relatedPrograms: testString } }),
        ).toEqual(testString);
      });
    });
    describe('mkCardSelector util', () => {
      it('takes [card simpleSelector, selector] and creates card selector from cardData', () => {
        const selector = (data) => ({ selector: data });
        const simpleSelector = (data) => ({ simpleSelector: data });
        testData = { some: 'test data' };
        const oldCourseData = simpleSelectors.courseData;
        simpleSelectors.courseData = jest.fn().mockReturnValueOnce({ [testCardId]: testData });
        expect(mkCardSelector(simpleSelector, selector)(testState, testCardId)).toEqual(
          selector(simpleSelector(testData)),
        );
        expect(simpleSelectors.courseData).toHaveBeenCalledWith(testState);
        simpleSelectors.courseData = oldCourseData;
      });
    });
  });
});
