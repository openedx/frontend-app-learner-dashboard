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
// import fakeData from 'data/services/lms/fakeData/courses';
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

const configureStore = () => redux.createStore(
  reducers,
  redux.compose(redux.applyMiddleware(thunk)),
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
  api.initializeList = jest.fn(() => new Promise());
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

describe('Learner Dashbpard app integration tests', () => {
  beforeEach(async () => {
    mockApi();
    await renderEl();
    // inspector = new Inspector(el);
  });

  test('initialization', async (done) => {
    done();
  });

  describe('initialized', () => {
  });
});
