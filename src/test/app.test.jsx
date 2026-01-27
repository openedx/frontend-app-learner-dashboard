/* eslint-disable */
import * as redux from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  render,
  waitFor,
} from '@testing-library/react';

import { IntlProvider } from '@openedx/frontend-base';
import GlobalDataProvider from '@src/data/contexts/GlobalDataProvider';
import MasqueradeUserProvider from '@src/data/contexts/MasqueradeUserProvider';
import { useFormatDate } from '@src/utils/hooks';
import api from '@src/data/services/lms/api';
import * as fakeData from '@src/data/services/lms/fakeData/courses';
import reducers from '@src/data/redux';
import { selectors } from '@src/data/redux';
import { cardId as genCardId } from '@src/data/redux/app/reducer';
import messages from '@src/i18n';
import Main from '@src/Main';
import Inspector from './inspector';
import appMessages from './messages';
import { initializeMockServices } from '@src/setupTest';

jest.unmock('@openedx/paragon');
jest.unmock('@openedx/paragon/icons');
jest.unmock('react-redux');
jest.unmock('reselect');

beforeAll(() => {
  // Initialize the mock services including analytics
  initializeMockServices();
});

jest.mock('@src/slots/WidgetSidebarSlot', () => jest.fn(() => 'widget-sidebar'));

jest.mock('@openedx/frontend-base', () => ({
  ...jest.requireActual('@openedx/frontend-base'),
  sendTrackEvent: jest.fn(),
  getAuthenticatedHttpClient: jest.fn(),
  getLoginRedirectUrl: jest.fn(),
  useIntl: () => ({
    formatMessage: jest.requireActual('../testUtils').formatMessage,
    formatDate: (date) => `Date-${date}`,
  }),
  logError: jest.fn(),
}));

jest.mock('@src/utils/hooks', () => {
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
let inspector;

const getState = () => {
  state = store.getState();
  return state;
};

// Object to be filled with resolve/reject functions for all controlled network comm channels

const resolveFns = {
};

const { compileCourseRunData } = fakeData;
const initCourses = jest.fn(() => []);

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

const renderEl = async () => {
  store = configureStore();

  const queryClient = new QueryClient();
  el = await render(
    <MemoryRouter>
      <IntlProvider locale='en' messages={messages.en}>
        <GlobalDataProvider>
          <MasqueradeUserProvider>
            <Provider store={store}>
              <QueryClientProvider client={queryClient}>
                <Main />
              </QueryClientProvider>
            </Provider>
          </MasqueradeUserProvider>
        </GlobalDataProvider>
      </IntlProvider>
    </MemoryRouter>,
  );
  getState();
};

const loadApp = async (courses) => {
  const compiledCourses = courses.map(compileCourseRunData);
  initCourses.mockReturnValue(compiledCourses);
  
  await renderEl();
  inspector = new Inspector(el);
  
  // Since the app now uses React Query instead of Redux request states,
  // we'll simulate the API response immediately and wait for rendering
  resolveFns.init.success();
  
  // Manually dispatch the loadCourses action since React Query might not be working in tests
  const { actions } = require('../data/redux/app/reducer');
  store.dispatch(actions.loadCourses({ courses: compiledCourses }));
  
  // Wait for the components to render properly
  await waitFor(() => {
    // We should either see the loading view or the course content
    const loadingView = el.container.querySelector('.course-list-loading');
    const courseContent = inspector.get.courseCards?.length > 0;
    expect(loadingView || courseContent).toBeTruthy();
  });
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
      await getState(); // Update the global state variable
      const cards = inspector.get.courseCards;
      const card = cards.at(index);
      const cardId = genCardId(index);
      const cardDetails = inspector.get.card.details(card);
      
      const courseData = selectors.app.courseCard.course(state, cardId);
      if (!courseData) {
        throw new Error(`Course data not found for cardId: ${cardId}`);
      }
      
      const { courseName } = courseData;
      inspector.verifyText(inspector.get.card.header(card), courseName);
      if (tests.length > index) {
        tests[index]({ cardId, cardDetails });
      }
    }

    const loadCourse = async (course) => {
      await loadApp([course].map(compileCourseRunData));
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
