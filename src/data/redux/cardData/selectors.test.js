import app from 'data/redux/app/selectors';
import * as selectors from './selectors';

jest.mock('data/redux/app/selectors', () => ({
  courseCardData: jest.fn(),
}));

const {
  default: exported,
  programs,
  fieldKeys,
} = selectors;

const courseNumber = 'test-course-number';
const testState = { test: 'state' };
const testValue = 'my-test-value';

/**
 * Test a field selector, both in basic definition and exported/connected card field
 * @param {string} key - field keys to test
 * @param {string} basicMessage - basic usage test message
 * @param {obj} basicTest - { data, expected } - passed data and expected output.
 *   expected defaults to testValue as defined in this file.
 * @param {object[]} [conditionTests] - (optional) extra tests for special conditions
 *   condition: <str> explanation of the condition
 *   data: <obj> data to be passed to the transform
 *   expected: <any> expected output
 *   message: <str> test message
 */
const testFieldSelector = (key, basicMessage, basicTest, conditionTests = []) => {
  describe(`fieldSelector: ${key}`, () => {
    describe('basic usage', () => {
      const { data, expected = testValue } = basicTest;
      test(basicMessage, () => {
        expect(selectors.fieldSelectors[key](data)).toEqual(expected);
      });
      it('exports a card selector for the given key, binding to course card data', () => {
        app.courseCardData.mockReturnValueOnce(data);
        expect(exported[key](testState, courseNumber)).toEqual(expected);
        expect(app.courseCardData).toHaveBeenCalledWith(testState, courseNumber);
      });
    });
    conditionTests.forEach((conditionTest) => {
      const { data, expected } = conditionTest;
      describe(conditionTest.condition, () => {
        test(conditionTest.message, () => {
          expect(selectors.fieldSelectors[key](data)).toEqual(expected);
        });
        it('exports a card selector for the given key, binding to course card data', () => {
          app.courseCardData.mockReturnValueOnce(data);
          expect(exported[key](testState, courseNumber)).toEqual(expected);
          expect(app.courseCardData).toHaveBeenCalledWith(testState, courseNumber);
        });
      });
    });
  });
};

describe('cardData selectors', () => {
  describe('fieldSelectors', () => {
    testFieldSelector(fieldKeys.canChangeEntitlementSession,
      'returns the entitlements canChangeEntitlementsSession value',
      { data: { entitlements: { canChange: testValue } } });

    testFieldSelector(fieldKeys.canUpgrade,
      'returns the enrollment canUpgrade value',
      { data: { enrollment: { canUpgrade: testValue } } });

    testFieldSelector(fieldKeys.certAvailableDate,
      'returns the certificates availableDate value',
      { data: { certificates: { availableDate: testValue } } });

    testFieldSelector(fieldKeys.certDownloadUrl,
      'returns the certificates download url value',
      { data: { certificates: { downloadUrls: { download: testValue } } } },
      [{
        condition: 'if no download urls are provided for certificates',
        data: { certificates: {} },
        expected: undefined,
        message: 'returns undefined',
      }]);

    testFieldSelector(fieldKeys.certPreviewUrl,
      'returns the certificates preview url value',
      { data: { certificates: { downloadUrls: { preview: testValue } } } },
      [{
        condition: 'if no downloadUrls are provided for certificates',
        data: { certificates: {} },
        expected: undefined,
        message: 'returns undefined',
      }]);

    testFieldSelector(fieldKeys.courseBannerUrl,
      'returns the course banner url value',
      { data: { course: { bannerUrl: testValue } } });

    testFieldSelector(fieldKeys.courseRunAccessExpirationDate,
      'returns the course run access expiration date value',
      { data: { courseRun: { accessExpirationDate: testValue } } });

    testFieldSelector(fieldKeys.courseRunEndDate,
      'returns the course banner url value',
      { data: { courseRun: { endDate: testValue } } },
      [{
        condition: 'if course run is not defined',
        data: {},
        expected: undefined,
        message: 'returns undefined if there is no course run data',
      }]);

    testFieldSelector(fieldKeys.courseTitle,
      'returns the course title value',
      { data: { course: { title: testValue } } });

    testFieldSelector(fieldKeys.courseWebsite,
      'returns the course website value',
      { data: { course: { website: testValue } } });

    testFieldSelector(fieldKeys.entitlementSessions,
      'returns available entitlement sessions value',
      { data: { entitlements: { availableSessions: testValue } } });

    testFieldSelector(fieldKeys.isAudit,
      'returns enrollment isAudit value',
      { data: { enrollment: { isAudit: testValue } } });

    testFieldSelector(fieldKeys.isAuditAccessExpired,
      'returns enrollment isAudiAccessExpired value',
      { data: { enrollment: { isAuditAccessExpired: testValue } } });

    testFieldSelector(fieldKeys.isCertDownloadable,
      'returns certificates isDownloadable value',
      { data: { certificates: { isDownloadable: testValue } } });

    testFieldSelector(fieldKeys.isCertEarnedButUnavailable,
      'returns true if is certificate is earned but not available',
      {
        data: { certificates: { isEarned: true, isAvailable: false } },
        expected: true,
      },
      [
        {
          condition: 'certificate is not earned',
          data: { certificates: { isEarned: false, isAvailable: false } },
          expected: false,
          message: 'returns false',
        },
        {
          condition: 'certificate is available',
          data: { certificates: { isEarned: true, isAvailable: true } },
          expected: false,
          message: 'returns false',
        },
      ]);

    testFieldSelector(fieldKeys.isCourseRunPending,
      'returns courseRun isPending value',
      { data: { courseRun: { isPending: testValue } } });

    testFieldSelector(fieldKeys.isCourseRunStarted,
      'returns courseRun isStarted value',
      { data: { courseRun: { isStarted: testValue } } });

    testFieldSelector(fieldKeys.isCourseRunFinished,
      'returns courseRun isFinished value',
      { data: { courseRun: { isFinished: testValue } } });

    testFieldSelector(fieldKeys.isEmailEnabled,
      'returns enrollment isEmailEnabled value',
      { data: { enrollment: { isEmailEnabled: testValue } } });

    testFieldSelector(fieldKeys.isEntitlement,
      'returns entitlements isEntitlement value',
      { data: { entitlements: { isEntitlement: testValue } } });

    testFieldSelector(fieldKeys.isEntitlementExpired,
      'returns entitlements isExpired value',
      { data: { entitlements: { isExpired: testValue } } });

    testFieldSelector(fieldKeys.isEntitlementFulfilled,
      'returns entitlements isFulfilled value',
      { data: { entitlements: { isFulfilled: testValue } } });

    testFieldSelector(fieldKeys.isVerified,
      'returns enrollments isVerified value',
      { data: { enrollment: { isVerified: testValue } } });

    testFieldSelector(fieldKeys.isRestricted,
      'returns certificates isRestricted value',
      { data: { certificates: { isRestricted: testValue } } });

    testFieldSelector(fieldKeys.isPassing,
      'returns grades isPassing value',
      { data: { grades: { isPassing: testValue } } });

    testFieldSelector(fieldKeys.minPassingGrade,
      'returns course run minPassingGrade value',
      { data: { courseRun: { minPassingGrade: testValue } } });

    testFieldSelector(fieldKeys.providerName,
      'returns provider name value',
      { data: { provider: { name: testValue } } },
      [{
        condition: 'provider is not known',
        data: {},
        expected: undefined,
        message: 'returns undefined',
      }]);

    testFieldSelector(fieldKeys.relatedPrograms,
      'returns relatedPrograms value',
      { data: { relatedPrograms: testValue } });

    testFieldSelector(fieldKeys.isCourseRunActive,
      'returns true if course run is started but not finished',
      {
        data: { courseRun: { isStarted: true, isFinished: false } },
        expected: true,
      },
      [
        {
          condition: 'is not started',
          data: { courseRun: { isStarted: false, isFinished: false } },
          expected: false,
          message: 'returns false',
        }, {
          condition: 'is finished',
          data: { courseRun: { isStarted: true, isFinished: true } },
          expected: false,
          message: 'returns false',
        }]);
  });
  describe('programs', () => {
    test('estimatedNumberOfWeeks returns value from passed program data', () => {
      expect(
        programs.estimatedNumberOfWeeks({ estimatedNumberOfWeeks: testValue }),
      ).toEqual(testValue);
    });
    test('numberOfCourses returns value from passed program data', () => {
      expect(programs.numberOfCourses({ numberOfCourses: testValue })).toEqual(testValue);
    });
    test('programType returns value from passed program data', () => {
      expect(programs.programType({ programType: testValue })).toEqual(testValue);
    });
    test('programTypeUrl returns value from passed program data', () => {
      expect(programs.programTypeUrl({ programTypeUrl: testValue })).toEqual(testValue);
    });
    test('provider returns value from passed program data', () => {
      expect(programs.provider({ provider: testValue })).toEqual(testValue);
    });
    test('title returns value from passed program data', () => {
      expect(programs.title({ title: testValue })).toEqual(testValue);
    });
  });
});
