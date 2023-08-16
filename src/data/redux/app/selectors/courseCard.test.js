import { keyStore } from 'utils';
import { baseAppUrl } from 'data/services/lms/urls';
import { EXECUTIVE_EDUCATION_COURSE_MODES } from 'data/constants/course';

import simpleSelectors from './simpleSelectors';
import * as module from './courseCard';

jest.mock('data/services/lms/urls', () => ({
  baseAppUrl: url => ({ baseAppUrl: url }),
}));

jest.mock('./simpleSelectors', () => ({
  mkCardSelector: (simpleSelector, selector) => ({
    mkCardSelector: { selector, simpleSelector },
  }),
  cardSimpleSelectors: jest.requireActual('./simpleSelectors').cardSimpleSelectors,
}));

const { courseCard } = module;
const { cardSimpleSelectors } = simpleSelectors;

const moduleKeys = keyStore(module);

let testData;
let selector;
let simpleSelector;
let selected;

const dates = {
  today: new Date(),
  tomorrow: new Date(),
  nextYear: new Date(),
  yesterday: new Date(),
};
dates.tomorrow.setDate(dates.tomorrow.getDate() + 1);
dates.nextYear.setDate(dates.nextYear.getDate() + 365);
dates.yesterday.setDate(dates.yesterday.getDate() - 1);

/*
 * Takes a selector as input and fetches the referenced selector and simpleSelector for
 * the selector to be tested, to be stored in global variables.
 * Also sets `selected` global variable is loaded with the passed data, which is stored
 * as `testData`.
 */
const loadSelector = (sel, data) => {
  ({ simpleSelector, selector } = sel.mkCardSelector);
  testData = data;
  selected = selector(data);
};

describe('courseCard selectors module', () => {
  describe('loadDateVal helper function', () => {
    it('returns passed date value converted to Date', () => {
      const testDate = '2000-10-10';
      expect(module.loadDateVal(testDate)).toEqual(new Date(testDate));
    });
    it('returns null if no value is passed', () => {
      expect(module.loadDateVal()).toEqual(null);
    });
  });
  describe('courseCard selectors', () => {
    let dateSpy;
    beforeEach(() => {
      dateSpy = jest.spyOn(module, moduleKeys.loadDateVal);
      dateSpy.mockImplementation(v => new Date(v));
    });
    afterEach(() => {
      dateSpy.mockRestore();
    });
    describe('certificate selector', () => {
      beforeEach(() => {
        loadSelector(courseCard.certificate, {
          certPreviewUrl: 'test-cert-preview-url',
          isDownloadable: 'test-is-downloadable',
          isRestricted: 'test-is-restricted',
          isEarned: false,
          availableDate: '2020-10-10',
        });
      });
      it('returns a card selector based on certificate cardSimpleSelector', () => {
        expect(simpleSelector).toEqual(cardSimpleSelectors.certificate);
      });
      it('returns {} object if null certificate received', () => {
        expect(selector(null)).toEqual({});
      });
      it('passes availableDate, converted to a date', () => {
        expect(selected.availableDate).toMatchObject(new Date(testData.availableDate));
      });
      it('passes [isDownloadable, isRestricted]', () => {
        expect(selected.isDownloadable).toEqual(testData.isDownloadable);
        expect(selected.isRestricted).toEqual(testData.isRestricted);
      });
      it('passes certPreviewUrl as app url', () => {
        expect(selected.certPreviewUrl).toEqual(baseAppUrl(testData.certPreviewUrl));
      });
      describe('isEarnedButUnavailable', () => {
        it('passes true iff certificate is earned but availableDate is in the future', () => {
          const testSelector = (data, expected) => {
            expect(selector({ ...testData, ...data }).isEarnedButUnavailable).toEqual(expected);
          };
          testSelector({ isEarned: true, availableDate: dates.today }, false);
          testSelector({ isEarned: true, availableDate: dates.yesterday }, false);
          testSelector({ isEarned: true, availableDate: dates.tomorrow }, true);
          testSelector({ isEarned: false, availableDate: dates.tomorrow }, false);
        });
      });
    });
    describe('course selector', () => {
      beforeEach(() => {
        loadSelector(courseCard.course, {
          bannerImgSrc: 'test-banner-img-src',
          courseNumber: 'test-course-number',
          courseName: 'test-course-name',
          socialShareUrl: 'test-social-share-url',
        });
      });
      it('returns a card selector based on course cardSimpleSelector', () => {
        expect(simpleSelector).toEqual(cardSimpleSelectors.course);
      });
      it('passes bannerImgSrc, converted to a baseAppUrl', () => {
        expect(selected.bannerImgSrc).toEqual(baseAppUrl(testData.bannerImgSrc));
      });
      it('passes [courseNumber, courseName, socialShareUrl]', () => {
        expect(selected.courseNumber).toEqual(testData.courseNumber);
        expect(selected.courseName).toEqual(testData.courseName);
        expect(selected.socialShareUrl).toEqual(testData.socialShareUrl);
      });
    });
    describe('courseProvider selector', () => {
      beforeEach(() => {
        loadSelector(courseCard.courseProvider, { name: 'test-provider-name' });
      });
      it('returns a card selector based on courseProvider cardSimpleSelector', () => {
        expect(simpleSelector).toEqual(cardSimpleSelectors.courseProvider);
      });
      describe('name', () => {
        it('passes the provider name if provider is known', () => {
          expect(selected.name).toEqual(testData.name);
        });
        it('passes undefined if provider is not known', () => {
          expect(selector().name).toEqual(undefined);
        });
      });
    });
    describe('courseRun selector', () => {
      beforeEach(() => {
        loadSelector(courseCard.courseRun, {
          endDate: '3000-10-20',
          startDate: '2000-10-20',

          courseId: 'test-course-id',
          isArchived: 'test-is-archived',
          isStarted: 'test-is-started',

          minPassingGrade: 0.9354,

          homeUrl: 'test-home-url',
          marketingUrl: 'test-marketing-url',
          upgradeUrl: 'test-upgrade-url',

          progressUrl: 'test-progress-url',
          resumeUrl: 'test-resume-url',
          unenrollUrl: 'test-unenroll-url',
        });
      });
      it('returns a card selector based on courseRun cardSimpleSelector', () => {
        expect(simpleSelector).toEqual(cardSimpleSelectors.courseRun);
      });
      it('returns {} object if null courseRun received', () => {
        expect(selector(null)).toEqual({});
      });
      it('passes [endDate, startDate], converted to dates', () => {
        expect(selected.endDate).toEqual(new Date(testData.endDate));
        expect(selected.startDate).toEqual(new Date(testData.startDate));
      });
      it('passes [courseId, isArchived, isStarted]', () => {
        expect(selected.courseId).toEqual(testData.courseId);
        expect(selected.isArchived).toEqual(testData.isArchived);
        expect(selected.isStarted).toEqual(testData.isStarted);
      });
      it('passes minPassingGrade floored from float to a percentage value', () => {
        expect(selected.minPassingGrade).toEqual(93);
      });
      it('passes [homeUrl, marketingUrl, upgradeUrl]', () => {
        expect(selected.homeUrl).toEqual(testData.homeUrl);
        expect(selected.marketingUrl).toEqual(testData.marketingUrl);
        expect(selected.upgradeUrl).toEqual(testData.upgradeUrl);
      });
      it('passes [progressUrl, unenrollUrl, resumeUrl], converted to baseAppUrl', () => {
        expect(selected.progressUrl).toEqual(baseAppUrl(testData.progressUrl));
        expect(selected.resumeUrl).toEqual(baseAppUrl(testData.resumeUrl));
        expect(selected.unenrollUrl).toEqual(baseAppUrl(testData.unenrollUrl));
      });
    });
    describe('credit selector', () => {
      const credit = {
        providerStatusUrl: 'test-provider-status-url',
        providerName: 'test-provider-name',
        providerId: 'test-provider-id',
        error: 'test-provider-id',
        purchased: 'test-purchased',
        requestStatus: 'test-request-status',
      };
      it('returns a card selector based on credit cardSimpleSelector', () => {
        loadSelector(courseCard.credit, {});
        expect(simpleSelector).toEqual(cardSimpleSelectors.credit);
      });
      it('returns { isEligible: false } if empty object received for credit', () => {
        loadSelector(courseCard.credit, {});
        expect(selected).toEqual({ isEligible: false });
      });
      describe('credit fields when credit object is passed', () => {
        beforeEach(() => {
          loadSelector(courseCard.credit, credit);
        });
        it('returns isEligible: true', () => {
          expect(selected.isEligible).toEqual(true);
        });
        it('returns provider status url, name, and id', () => {
          expect(selected.providerStatusUrl).toEqual(credit.providerStatusUrl);
          expect(selected.providerName).toEqual(credit.providerName);
          expect(selected.providerId).toEqual(credit.providerId);
        });
        it('returns error, purchased and requestStatus fields', () => {
          expect(selected.error).toEqual(credit.error);
          expect(selected.purchased).toEqual(credit.purchased);
          expect(selected.requestStatus).toEqual(credit.requestStatus);
        });
      });
    });
    describe('enrollment selector', () => {
      const defaultData = {
        coursewareAccess: {
          isStaff: false,
          hasUnmetPrereqs: false,
          isTooEarly: false,
        },
        isEnrolled: 'test-is-enrolled',
        lastEnrolled: 'test-last-enrolled',
        hasStarted: 'test-has-started',
        accessExpirationDate: '3000-10-20',
        canUpgrade: 'test-can-upgrade',
        isAudit: 'test-is-audit',
        isAuditAccessExpired: 'test-is-audit-access-expired',
        isVerified: 'test-is-verified',
        isEmailEnabled: 'test-is-email-enabled',
        mode: 'default',
      };
      beforeEach(() => {
        loadSelector(courseCard.enrollment, defaultData);
      });
      it('returns a card selector based on enrollment cardSimpleSelector', () => {
        expect(simpleSelector).toEqual(cardSimpleSelectors.enrollment);
      });
      it('returns { isEnrolled: false } object if null enrollment received', () => {
        expect(selector(null)).toEqual({ isEnrolled: false });
      });
      it('passes [coursewareAccess, hasStarted, isEnrolled, lastEnrolled]', () => {
        expect(selected.coursewareAccess).toEqual(testData.coursewareAccess);
        expect(selected.hasStarted).toEqual(testData.hasStarted);
        expect(selected.isEnrolled).toEqual(testData.isEnrolled);
        expect(selected.lastEnrolled).toEqual(testData.lastEnrolled);
      });
      it('passes hasAccess if staff or neither has umet prereqs nor is too early', () => {
        const testAccess = (access, expected) => {
          expect(selector({ ...testData, coursewareAccess: access }).hasAccess).toEqual(expected);
        };
        testAccess({ isStaff: false, hasUnmetPrereqs: false, isTooEarly: false }, true);
        testAccess({ isStaff: false, hasUnmetPrereqs: false, isTooEarly: true }, false);
        testAccess({ isStaff: false, hasUnmetPrereqs: true, isTooEarly: false }, false);
        testAccess({ isStaff: false, hasUnmetPrereqs: true, isTooEarly: true }, false);
        testAccess({ isStaff: true, hasUnmetPrereqs: true, isTooEarly: true }, true);
      });
      it('passes accessExpirationDate, converted to date', () => {
        expect(selected.accessExpirationDate).toEqual(new Date(testData.accessExpirationDate));
      });
      it('passes [canUpgrade, isAudit, isAuditAccessExpired, isVerified]', () => {
        expect(selected.canUpgrade).toEqual(testData.canUpgrade);
        expect(selected.isAudit).toEqual(testData.isAudit);
        expect(selected.isAuditAccessExpired).toEqual(testData.isAuditAccessExpired);
        expect(selected.isVerified).toEqual(testData.isVerified);
      });
      it('passes isEmailEnabled', () => {
        expect(selected.isEmailEnabled).toEqual(testData.isEmailEnabled);
      });
      it('returns isExecEd2UCourse: false if mode is not in EXECUTIVE_EDUCATION_COURSE_MODES', () => {
        expect(selected.isExecEd2UCourse).toEqual(false);
      });
      it('returns isExecEd2UCourse: true if mode is in EXECUTIVE_EDUCATION_COURSE_MODES', () => {
        loadSelector(courseCard.enrollment, { ...defaultData, mode: EXECUTIVE_EDUCATION_COURSE_MODES[0] });
        expect(selected.isExecEd2UCourse).toEqual(true);
      });
    });
    describe('entitlement selector', () => {
      beforeEach(() => {
        loadSelector(courseCard.entitlement, {
          availableSessions: ['test', 'sessions'],
          changeDeadline: '2000-10-20',
          isExpired: 'test-is-expired',
          isFulfilled: 'test-is-fulfilled',
          uuid: 'test-uuid',
        });
      });
      it('returns a card selector based on entilement cardSimpleSelector', () => {
        expect(simpleSelector).toEqual(cardSimpleSelectors.entitlement);
      });
      it('returns { isEntilement: false } if entitlement object is missing or empty', () => {
        expect(selector({})).toEqual({ isEntitlement: false });
        expect(selector()).toEqual({ isEntitlement: false });
      });
      it('passes isEntitlement: true for entilement data', () => {
        expect(selected.isEntitlement).toEqual(true);
      });
      it('passes [availableSessions, isExpired, isFulfilled, uuid]', () => {
        expect(selected.availableSessions).toEqual(testData.availableSessions);
        expect(selected.isExpired).toEqual(testData.isExpired);
        expect(selected.isFulfilled).toEqual(testData.isFulfilled);
        expect(selected.uuid).toEqual(testData.uuid);
      });
      it('passess changeDeadline as changeDeadline, converted to a date', () => {
        expect(selected.changeDeadline).toEqual(new Date(testData.changeDeadline));
      });
      it('passes hasSessions if availableSessions is provided and has a length > 0', () => {
        expect(selected.hasSessions).toEqual(true);
        expect(selector({ ...testData, availableSessions: [] }).hasSessions).toEqual(false);
      });
      it('passes canChange if the deadline is not before current date', () => {
        expect(selector({ ...testData, changeDeadline: dates.yesterday }).canChange).toEqual(false);
        expect(selector({ ...testData, changeDeadline: dates.tomorrow }).canChange).toEqual(true);
      });
      it('passes showExpirationWarning if the deadline is 0-6 months in the future and not fulfilled', () => {
        const testSelector = ({ isFulfilled, changeDeadline }, expected) => {
          expect(
            selector({ ...testData, isFulfilled, changeDeadline }).showExpirationWarning,
          ).toEqual(expected);
        };
        testSelector({ isFulfilled: false, changeDeadline: dates.yesterday }, false);
        testSelector({ isFulfilled: false, changeDeadline: dates.tomorrow }, true);
        testSelector({ isFulfilled: false, changeDeadline: dates.nextYear }, false);
        testSelector({ isFulfilled: true, changeDeadline: dates.nextYear }, false);
      });
    });
    describe('gradeData selector', () => {
      beforeEach(() => {
        loadSelector(courseCard.gradeData, { isPassing: 'test-is-passing' });
      });
      it('returns a card selector based on gradeData cardSimpleSelector', () => {
        expect(simpleSelector).toEqual(cardSimpleSelectors.gradeData);
      });
      it('passes isPassing', () => {
        expect(selected.isPassing).toEqual(testData.isPassing);
      });
    });
    describe('relatedPrograms selector', () => {
      beforeEach(() => {
        const programData = (index) => ({
          bannerImgSrc: `test-banner-img-src-${index}`,
          logoImgSrc: `test-logo-img-src-${index}`,
          numberOfCourses: `test-number-of-courses-${index}`,
          programType: `test-program-type-${index}`,
          programUrl: `test-program-url-${index}`,
          provider: `test-provider-${index}`,
          title: `test-title-${index}`,
        });
        loadSelector(courseCard.relatedPrograms, [
          programData(0),
          programData(1),
          programData(2),
          programData(3),
          programData(4),
        ]);
      });
      it('returns a card selector based on relatedPrograms cardSimpleSelector', () => {
        expect(simpleSelector).toEqual(cardSimpleSelectors.relatedPrograms);
      });
      it('passes [bannerImgSrc, logoImgSrc] for each program', () => {
        selected.list.forEach((row, i) => {
          expect(row.bannerImgSrc).toEqual(testData[i].bannerImgSrc);
          expect(row.logoImgSrc).toEqual(testData[i].logoImgSrc);
        });
      });
      it('passes [numberOfCourses, programType, programUrl, provider, title] for each', () => {
        selected.list.forEach((row, i) => {
          expect(row.numberOfCourses).toEqual(testData[i].numberOfCourses);
          expect(row.programType).toEqual(testData[i].programType);
          expect(row.programUrl).toEqual(testData[i].programUrl);
          expect(row.provider).toEqual(testData[i].provider);
          expect(row.title).toEqual(testData[i].title);
        });
      });
      it('passes number of programs a length', () => {
        expect(selected.length).toEqual(testData.length);
      });
    });
  });
});
