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

import thunk from 'redux-thunk';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import urls from 'data/services/lms/urls';
import { ErrorStatuses, RequestKeys, RequestStates } from 'data/constants/requests';
import { gradeStatuses, lockStatuses } from 'data/services/lms/constants';
import fakeData from 'data/services/lms/fakeData';
import api from 'data/services/lms/api';
import reducers from 'data/redux';
import messages from 'i18n';
import { selectors } from 'data/redux';

import App from 'App';
import Inspector from './inspector';
import appMessages from './messages';

jest.unmock('@edx/paragon');
jest.unmock('@edx/paragon/icons');
jest.unmock('@edx/frontend-platform/i18n');
jest.unmock('react');
jest.unmock('react-redux');

jest.unmock('hooks');

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedHttpClient: jest.fn(),
  getLoginRedirectUrl: jest.fn(),
}));

jest.mock('react-pdf', () => ({
  Document: () => <div>Document</div>,
  Image: () => <div>Image</div>,
  Page: () => <div>Page</div>,
  PDFViewer: jest.fn(() => null),
  StyleSheet: { create: () => {} },
  Text: () => <div>Text</div>,
  View: () => <div>View</div>,
  pdfjs: { GlobalWorkerOptions: {} },
}));
/*
jest.mock('react-pdf/node_modules/pdfjs-dist/build/pdf.worker.entry', () => (
  jest.requireActual('react-pdf/dist/umd/entry.jest')
));
*/
const configureStore = () => redux.createStore(
  reducers,
  redux.compose(redux.applyMiddleware(thunk)),
);

let el;
let store;
let state;
let retryLink;
let inspector;

const { rubricConfig } = fakeData.oraMetadata;

/**
 * Simple wrapper for updating the top-level state variable, that also returns the new value
 * @return {obj} - current redux store state
 */
const getState = () => {
  state = store.getState();
  return state;
};

/** Fake Data for quick access */
const submissionUUIDs = [
  fakeData.ids.submissionUUID(0),
  fakeData.ids.submissionUUID(1),
  fakeData.ids.submissionUUID(2),
  fakeData.ids.submissionUUID(3),
  fakeData.ids.submissionUUID(4),
];
const submissions = submissionUUIDs.map(id => fakeData.mockSubmission(id));

/**
 * Object to be filled with resolve/reject functions for all controlled network comm channels
 */
const resolveFns = {};
/**
 * Mock the api with jest functions that can be tested against.
 */
const mockNetworkError = (reject) => () => reject(new Error({
  response: { status: ErrorStatuses.badRequest },
}));

const mockForbiddenError = (reject) => () => reject(new Error({
  response: { status: ErrorStatuses.forbidden },
}));

const mockApi = () => {
  api.initializeApp = jest.fn(() => new Promise(
    (resolve, reject) => {
      resolveFns.init = {
        success: () => resolve({
          isEnabled: true,
          oraMetadata: fakeData.oraMetadata,
          courseMetadata: fakeData.courseMetadata,
          submissions: fakeData.submissions,
        }),
        networkError: mockNetworkError(reject),
      };
    },
  ));
  api.fetchSubmission = jest.fn((submissionUUID) => new Promise(
    (resolve, reject) => {
      resolveFns.fetch = {
        success: () => resolve(fakeData.mockSubmission(submissionUUID)),
        networkError: mockNetworkError(reject),
      };
    },
  ));
  api.fetchSubmissionStatus = jest.fn((submissionUUID) => Promise.resolve(
    fakeData.mockSubmissionStatus(submissionUUID)
  ));
  api.lockSubmission = jest.fn(() => new Promise(
    (resolve, reject) => {
      resolveFns.lock = {
        success: () => resolve({ lockStatus: lockStatuses.inProgress }),
        networkError: mockForbiddenError(reject),
      };
    },
  ));
  api.unlockSubmission = jest.fn(() => new Promise(
    (resolve, reject) => {
      resolveFns.unlock = {
        success: () => resolve({ lockStatus: lockStatuses.unlocked }),
        networkError: mockNetworkError(reject),
      };
    },
  ));
  api.updateGrade = jest.fn((uuid, gradeData) => new Promise(
    (resolve, reject) => {
      resolveFns.updateGrade = {
        success: () => resolve({
          gradeData,
          gradeStatus: gradeStatuses.graded,
          lockStatus: lockStatuses.unlocked,
        }),
        networkError: mockNetworkError(reject),
      };
    },
  ));
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

/**
 * resolve the initalization promise, and update state object
 */
const initialize = async () => {
  resolveFns.init.success();
  await inspector.find.listView.viewAllResponsesBtn();
  getState();
};

/**
 * Select the first 5 entries in the table and click the 'View Selected Responses' button
 * Wait for the review page to show and update the top-level state object.
 */
const makeTableSelections = async () => {
  [0, 1, 2, 3, 4].forEach(index => userEvent.click(inspector.listView.listCheckbox(index)));
  userEvent.click(inspector.listView.selectedBtn(5));
  // wait for navigation, which will show while request is pending
  try {
    await inspector.find.review.prevNav();
  } catch (e) {
    throw(e);
  }
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

describe('ESG app integration tests', () => {
  beforeEach(async () => {
    mockApi();
    await renderEl();
    inspector = new Inspector(el);
  });

  test('initialization', async (done) => {
    const verifyInitialState = async () => {
      await waitForRequestStatus(RequestKeys.initialize, RequestStates.pending);
      const testInitialState = (key) => expect(
        state[key],
        `${key} store should have its configured initial state`,
      ).toEqual(
        jest.requireActual(`data/redux/${key}/reducer`).initialState,
      );
      testInitialState('app');
      testInitialState('submissions');
      testInitialState('grading');
      expect(
        inspector.listView.loadingResponses(),
        'Loading Responses pending state text should be displayed in the ListView',
      ).toBeVisible();
    }
    await verifyInitialState();

    // initialization network error
    const forceAndVerifyInitNetworkError = async () => {
      resolveFns.init.networkError();
      await waitForRequestStatus(RequestKeys.initialize, RequestStates.failed);
      expect(
        await inspector.find.listView.loadErrorHeading(),
        'List Error should be available (by heading component)',
      ).toBeVisible();
      const backLink = inspector.listView.backLink();
      expect(
        backLink.href,
        'Back to responses button href should link to urls.openResponse(courseId)',
      ).toEqual(urls.openResponse(getState().app.courseMetadata.courseId));
    };
    await forceAndVerifyInitNetworkError();

    // initialization retry/pending
    retryLink = inspector.listView.reloadBtn();
    await userEvent.click(retryLink);
    await waitForRequestStatus(RequestKeys.initialize, RequestStates.pending);

    // initialization success
    const forceAndVerifyInitSuccess = async () => {
      await initialize();
      await waitForRequestStatus(RequestKeys.initialize, RequestStates.completed);
      expect(
        state.app.courseMetadata,
        'Course metadata in redux should be populated with fake data',
      ).toEqual(fakeData.courseMetadata);
      expect(
        state.app.oraMetadata,
        'ORA metadata in redux should be populated with fake data',
      ).toEqual(fakeData.oraMetadata);
      expect(
        state.submissions.allSubmissions,
        'submissions data in redux should be populated with fake data',
      ).toEqual(fakeData.submissions);
    };
    await forceAndVerifyInitSuccess();

    await makeTableSelections();
    await waitForRequestStatus(RequestKeys.fetchSubmission, RequestStates.pending);
    done();
  });

  describe('initialized', () => {
    beforeEach(async () => {
      await initialize();
      await waitForRequestStatus(RequestKeys.initialize, RequestStates.completed);
      await makeTableSelections();
      await waitForRequestStatus(RequestKeys.fetchSubmission, RequestStates.pending);
    });

    test('initial review state', async (done) => {
      // Make table selection and load Review pane
      expect(
        state.grading.selection,
        'submission IDs should be loaded',
      ).toEqual(submissionUUIDs);
      expect(state.app.showReview, 'app store should have showReview: true').toEqual(true);
      expect(inspector.review.username(0), 'username should be visible').toBeVisible();
      const nextNav = inspector.review.nextNav();
      const prevNav = inspector.review.prevNav();
      expect(nextNav, 'next nav should be displayed').toBeVisible();
      expect(nextNav, 'next nav should be disabled').toHaveAttribute('disabled');
      expect(prevNav, 'prev nav should be displayed').toBeVisible();
      expect(prevNav, 'prev nav should be disabled').toHaveAttribute('disabled');
      expect(
        inspector.review.loadingResponse(),
        'Loading Responses pending state text should be displayed in the ReviewModal',
      ).toBeVisible();
      done();
    });

    test('fetch network error and retry', async (done) => {
      await resolveFns.fetch.networkError();
      await waitForRequestStatus(RequestKeys.fetchSubmission, RequestStates.failed);
      expect(
        await inspector.find.review.loadErrorHeading(),
        'Load Submission error should be displayed in ReviewModal',
      ).toBeVisible();
      // fetch: retry and succeed
      await userEvent.click(inspector.review.retryFetchLink());
      await waitForRequestStatus(RequestKeys.fetchSubmission, RequestStates.pending);
      done()
    });

    test('fetch success and nav chain', async (done) => {
      let showRubric = false;
      // fetch: success with chained navigation
      const verifyFetchSuccess = async (submissionIndex) => {
        const submissionString = `for submission ${submissionIndex}`;
        const submission = submissions[submissionIndex];
        const forceAndVerifyFetchSuccess = async () => {
          await resolveFns.fetch.success();
          await waitForRequestStatus(RequestKeys.fetchSubmission, RequestStates.completed);
          expect(
            inspector.review.gradingStatus(submission),
            `Should display current submission grading status ${submissionString}`,
          ).toBeVisible();
        };
        await forceAndVerifyFetchSuccess();

        showRubric = showRubric || selectors.grading.selected.isGrading(getState());

        const verifyRubricVisibility = async () => {
          getState();
          expect(
            state.app.showRubric,
            `${showRubric ? 'Should' : 'Should not'} show rubric ${submissionString}`,
          ).toEqual(showRubric);
          if (showRubric) {
            expect(
              inspector.review.hideRubricBtn(),
              `Hide Rubric button should be visible when rubric is shown ${submissionString}`,
            ).toBeVisible();

          } else {
            expect(
              inspector.review.showRubricBtn(),
              `Show Rubric button should be visible when rubric is hidden ${submissionString}`,
            ).toBeVisible();
          }
        }
        await verifyRubricVisibility();

        // loads current submission
        const testSubmissionGradingState = () => {
          expect(
            state.grading.current,
            `Redux current grading state should load the current submission ${submissionString}`,
          ).toEqual({
            submissionUUID: submissionUUIDs[submissionIndex],
            ...submissions[submissionIndex],
          });
        };
        testSubmissionGradingState();

        const testNavState = () => {
          const expectDisabled = (getNav, name) => (
             expect(getNav(), `${name} should be disabled`).toHaveAttribute('disabled')
          );
          const expectEnabled = (getNav, name) => (
             expect(getNav(), `${name} should be enabled`).not.toHaveAttribute('disabled')
          );
          (submissionIndex > 0 ? expectEnabled : expectDisabled)(
            inspector.review.prevNav,
            'Prev nav',
          );
          const hasNext = submissionIndex < submissions.length - 1;
          (hasNext ? expectEnabled : expectDisabled)(inspector.review.nextNav, 'Next nav');
        };
        testNavState();
      };
      await verifyFetchSuccess(0);
      for (let i = 1; i < 5; i++) {
        await userEvent.click(inspector.review.nextNav());
        await verifyFetchSuccess(i);
      }
      for (let i = 3; i >= 0; i--) {
        await userEvent.click(inspector.review.prevNav());
        await verifyFetchSuccess(i);
      }
      done();
    });

    describe('grading (basic)', () => {
      beforeEach(async () => {
        await resolveFns.fetch.success();
        await waitForRequestStatus(RequestKeys.fetchSubmission, RequestStates.completed);
        await userEvent.click(await inspector.find.review.startGradingBtn());
      });

      describe('active grading', () => {
        beforeEach(async () => {
          await resolveFns.lock.success();
        });

        const selectedOptions = [1, 2];
        const feedback = ['feedback 0', 'feedback 1'];
        const overallFeedback = 'some overall feedback';

        // Set basic grade and feedback
        const setGrade = async (done) => {
          const {
            criterionOption,
            criterionFeedback,
            feedbackInput,
          } = inspector.review.rubric;
          const options = [
            criterionOption(0, selectedOptions[0]),
            criterionOption(1, selectedOptions[1]),
          ];
          await userEvent.click(options[0]);
          await userEvent.type(criterionFeedback(0), feedback[0]);
          await userEvent.click(options[1]);
          await userEvent.type(criterionFeedback(1), feedback[1]);
          await userEvent.type(inspector.review.rubric.feedbackInput(), overallFeedback);
          return;
        };

        // Verify active-grading state
        const checkGradingState = (submissionUUID=submissionUUIDs[0]) => {
          const entry = getState().grading.gradingData[submissionUUID];
          const checkCriteria = (index) => {
            const criterion = entry.criteria[index];
            const selected = rubricConfig.criteria[index].options[selectedOptions[index]].name;
            expect(criterion.selectedOption).toEqual(selected);
            expect(criterion.feedback).toEqual(feedback[index]);
          }
          [0, 1].forEach(checkCriteria);
          expect(entry.overallFeedback).toEqual(overallFeedback);
        }

        // Verify after-submission-success grade state
        const checkGradeSuccess = () => {
          const { gradeData, current } = getState().grading;
          const entry = gradeData[submissionUUIDs[0]];
          const checkCriteria = (index) => {
            const criterion = entry.criteria[index];
            const rubricOptions = rubricConfig.criteria[index].options;
            expect(criterion.selectedOption).toEqual(rubricOptions[selectedOptions[index]].name);
            expect(criterion.feedback).toEqual(feedback[index]);
          }
          [0, 1].forEach(checkCriteria);
          expect(entry.overallFeedback).toEqual(overallFeedback);
          expect(current.gradeStatus).toEqual(gradeStatuses.graded);
          expect(current.lockStatus).toEqual(lockStatuses.unlocked);
        }
        
        const loadNext = async () => {
          await userEvent.click(inspector.review.nextNav());
          await resolveFns.fetch.success();
        };

        const loadPrev = async () => {
          await userEvent.click(inspector.review.prevNav());
          await resolveFns.fetch.success();
        }

        const startGrading = async () => {
          await waitForRequestStatus(RequestKeys.fetchSubmission, RequestStates.completed);
          await userEvent.click(await inspector.find.review.startGradingBtn());
          await resolveFns.lock.success();
        }
        /*
          test('submit pending', async (done) => {
            done();
          });
          test('submit failed', async (done) => {
            done();
          });
        */
        test('grade and submit',
          async (done) => {
            expect(await inspector.find.review.submitGradeBtn()).toBeVisible();
            await setGrade();
            checkGradingState();
            await userEvent.click(inspector.review.rubric.submitGradeBtn());
            await resolveFns.updateGrade.success();
            checkGradeSuccess();
            done();
          },
        );
        test('grade, navigate, and return, maintaining gradingState',
          async (done) => {
            expect(await inspector.find.review.submitGradeBtn()).toBeVisible();
            await setGrade();
            checkGradingState();
            await loadNext(); 
            await waitForEqual(() => getState().grading.activeIndex, 1, 'activeIndex');
            await loadPrev();
            await waitForEqual(() => getState().grading.activeIndex, 0, 'activeIndex');
            checkGradingState();
            done();
          },
        );
      });
    });
  });
});
