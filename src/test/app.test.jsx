/* eslint-disable */
import React from 'react';
import * as redux from 'redux';
import { Provider } from 'react-redux';
import {
  act,
  render,
  waitFor,
  within,
  prettyDOM,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  initialize,
  mergeConfig,
} from '@edx/frontend-platform';

import { useIntl, IntlProvider } from '@edx/frontend-platform/i18n';

import { useFormatDate } from 'utils/hooks';

import api from 'data/services/lms/api';
import * as fakeData from 'data/services/lms/fakeData/courses';
import { RequestKeys, RequestStates } from 'data/constants/requests';
import reducers from 'data/redux';
import { selectors } from 'data/redux';
import { apiHooks } from 'hooks';
import { cardId as genCardId } from 'data/redux/app/reducer';

import messages from 'i18n';

import App from 'App';
import Inspector from './inspector';
import appMessages from './messages';

jest.unmock('@edx/paragon');
jest.unmock('@edx/paragon/icons');
jest.unmock('@edx/frontend-platform/i18n');
jest.unmock('@edx/frontend-component-footer');
jest.unmock('react');
jest.unmock('react-redux');
jest.unmock('reselect');
jest.unmock('hooks');

jest.mock('containers/WidgetContainers/LoadedSidebar', () => jest.fn(() => 'loaded-widget-sidebar'));
jest.mock('containers/WidgetContainers/NoCoursesSidebar', () => jest.fn(() => 'no-courses-widget-sidebar'));
jest.mock('containers/WidgetContainers/WidgetFooter', () => 'product-recommendations-footer');
jest.mock('components/NoticesWrapper', () => 'notices-wrapper');

jest.mock('@edx/frontend-platform', () => ({
  ...jest.requireActual('@edx/frontend-platform'),
  getConfig: () => jest.requireActual('../config').configuration,
}));

jest.mock('@edx/frontend-platform/analytics', () => ({
  sendTrackEvent: jest.fn(),
}));

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedHttpClient: jest.fn(),
  getLoginRedirectUrl: jest.fn(),
}));

jest.mock('ExperimentContext', () => ({
  ExperimentProvider: 'div'
}));

jest.mock('@edx/frontend-enterprise-hotjar', () => ({
  initializeHotjar: jest.fn(),
}));

jest.mock('@edx/frontend-platform/i18n', () => ({
  ...jest.requireActual('@edx/frontend-platform/i18n'),
  useIntl: () => ({
    formatMessage: jest.requireActual('testUtils').formatMessage,
    formatDate: (date) => `Date-${date}`,
  }),
}));

jest.mock('@edx/frontend-platform/logging', () => ({
  logError: jest.fn(),
}));

jest.mock('utils/hooks', () => {
  const formatDate = jest.fn(date => `Date-${date}`);
  return {
    formatDate,
    useFormatDate: () => formatDate,
  };
});


const configureStore = () => redux.createStore(
  reducers,
);

let el;
let store;
let state;
let retryLink;
let inspector;

/**
 * Simple wrapper for updating the top-level state variable, that also returns the new value
 * @return {obj} - current redux store state
 */
const getState = () => {
  state = store.getState();
  return state;
};

/**
 * Object to be filled with resolve/reject functions for all controlled network comm channels
 */
const resolveFns = {
};
/**
 * Mock the api with jest functions that can be tested against.
 */
const mockNetworkError = (reject) => () => reject(new Error({
  response: { status: ErrorStatuses.badRequest },
}));

const mockForbiddenError = (reject) => () => reject(new Error({
  response: { status: ErrorStatuses.forbidden },
}));


const allCourses = [
  ...fakeData.courseRunData,
  ...fakeData.entitlementData,
];

const { compileCourseRunData, compileEntitlementData } = fakeData;

const initCourses = jest.fn(() => []);

let initializeApp;

const mockApi = () => {
  api.initializeList = jest.fn(() => new Promise(
    (resolve, reject) => {
      resolveFns.init = {
        success: () => {
          const data = {
            courses: initCourses(),
            ...fakeData.globalData,
          };
          resolve({ data });
        },
      };
    }));
};

/**
 * load and configure the store, render the element, and populate the top-level state object
 */
const renderEl = async () => {
  store = configureStore();
  el = await render(
    <IntlProvider locale='en' messages={messages.en}>
      <Provider store={store}>
        <App />
      </Provider>
    </IntlProvider>,
  );
  getState();
};

const waitForEqual = async (valFn, expected, key) => waitFor(() => {
  expect(valFn(), `${key} is expected to equal ${expected}`).toEqual(expected);
});
const waitForRequestStatus = (key, status) => waitForEqual(
  () => getState().requests[key].status,
  status,
  key,
);

const loadApp = async (courses) => {
  initCourses.mockReturnValue(courses.map(compileCourseRunData));
  await renderEl();
  inspector = new Inspector(el);
  await waitForRequestStatus(RequestKeys.initialize, RequestStates.pending);
  resolveFns.init.success();
  await waitForRequestStatus(RequestKeys.initialize, RequestStates.completed);
}

const courseNames = [
  'course-name-1',
  'course-name-2',
  'course-name-3',
];

describe('ESG app integration tests', () => {
  beforeEach(() => {
    mockApi();
  });

  test('initialization', async () => {
    await loadApp([{ courseName: courseNames[0] }]);
  });

  describe('course cards', () => {
    const courseNames = [
      'course-name-0',
      'course-name-1',
      'course-name-2',
    ];
    const testCourse = async (index, tests) => {
      await getState();
      const cards = inspector.get.courseCards;
      const card = cards.at(index);
      const cardId = genCardId(index);
      const cardDetails = inspector.get.card.details(card);
      const courseData = selectors.app.courseCard.course(state, cardId);
      const { courseName } = selectors.app.courseCard.course(state, cardId);
      inspector.verifyText(inspector.get.card.header(card), courseName);
      if (tests.length > index) {
        tests[index]({ cardId, cardDetails });
      }
    }

    const loadCourse = async (course) => {
      await loadApp([course].map(compileCourseRunData));
      await waitForRequestStatus(RequestKeys.initialize, RequestStates.pending);
      resolveFns.init.success();
      await waitForRequestStatus(RequestKeys.initialize, RequestStates.completed);
    };

    describe('audit courses', () => {
      test('audit', async () => {
        const courses = [
          { courseName: courseNames[0] }, // audit, course run not started
          {
            courseName: courseNames[1],
            enrollment: {
              coursewareAccess: {
                isTooEarly: true,
                hasUnmetPrerequisites: false,
                isStaff: false,
              },
            },
          }, // audit, course run not started, is too early
          {
            courseName: courseNames[2],
            courseRun: {
              courseRun: { isStarted: true },
            },
            enrollment: {
              accessExpirationDate: fakeData.pastDate,
              canUpgrade: false,
              isAuditAccessExpired: true,
              hasStarted: true,
            },
          }, // audit, course run and learner started, access expired, cannot upgrade
        ];
        const formatDate = useFormatDate();
        await loadApp(courses);
        await testCourse(0, [
          ({ cardId, cardDetails }) => {
            const enrollment = selectors.app.courseCard.enrollment(state, cardId);
            const courseRun = selectors.app.courseCard.courseRun(state, cardId);
            const courseProvider = selectors.app.courseCard.courseProvider(state, cardId);
            const course = selectors.app.courseCard.course(state, cardId);
            expect(enrollment.isAudit).toEqual(true);
            expect(courseRun.isStarted).toEqual(false);
            expect(enrollment.canUpgrade).toEqual(true);
            [
              courseProvider.name,
              course.courseNumber,
              appMessages.withValues.CourseCardDetails.courseStarts({
                startDate: formatDate(new Date(courseRun.startDate)),
              }),
            ].forEach(value => inspector.verifyTextIncludes(cardDetails, value));
          },
        ]);
        await testCourse(1, [
          ({ cardId, cardDetails }) => {
            const enrollment = selectors.app.courseCard.enrollment(state, cardId);
            const courseRun = selectors.app.courseCard.courseRun(state, cardId);
            expect(enrollment.isAudit).toEqual(true);
            expect(courseRun.isStarted).toEqual(false);
            expect(enrollment.coursewareAccess.isTooEarly).toEqual(true);
            expect(enrollment.hasAccess).toEqual(false);
          },
        ]);
      });
    });
  });
});
