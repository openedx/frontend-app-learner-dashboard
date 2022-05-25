import { render } from 'react-dom';

import {
  APP_INIT_ERROR,
  APP_READY,
  initialize,
  mergeConfig,
  subscribe,
} from '@edx/frontend-platform';

import { messages as footerMessages } from '@edx/frontend-component-footer';
import { messages as headerMesssages } from '@edx/frontend-component-header';

import appMessages from './i18n';
import * as app from '.';

jest.mock('react-dom', () => ({
  render: jest.fn(),
}));

jest.mock('@edx/frontend-component-footer', () => ({
  messages: 'frotnend-footer-messages',
}));
jest.mock('@edx/frontend-component-header', () => ({
  messages: 'frotnend-header-messages',
}));

jest.mock('@edx/frontend-platform', () => ({
  mergeConfig: jest.fn(),
  APP_READY: 'app-is-ready-key',
  APP_INIT_ERROR: 'app-init-error',
  initialize: jest.fn(),
  subscribe: jest.fn(),
}));
jest.mock('@edx/frontend-component-footer', () => ({
  messages: ['some', 'messages'],
}));
jest.mock('./App', () => 'App');

const testValue = 'my-test-value';
describe('app registry', () => {
  let getElement;

  beforeEach(() => {
    render.mockClear();
    getElement = window.document.getElementById;
    window.document.getElementById = jest.fn(id => ({ id }));
  });
  afterAll(() => {
    window.document.getElementById = getElement;
  });

  test('subscribe: APP_READY.  links App to root element', () => {
    const callArgs = subscribe.mock.calls[0];
    expect(callArgs[0]).toEqual(APP_READY);
    callArgs[1]();
    const [rendered, target] = render.mock.calls[0];
    expect(rendered).toMatchSnapshot();
    expect(target).toEqual(document.getElementById('root'));
  });
  test('subscribe: APP_INIT_ERROR.  snapshot: displays an ErrorPage to root element', () => {
    const callArgs = subscribe.mock.calls[1];
    expect(callArgs[0]).toEqual(APP_INIT_ERROR);
    const error = { message: 'test-error-message' };
    callArgs[1](error);
    const [rendered, target] = render.mock.calls[0];
    expect(rendered).toMatchSnapshot();
    expect(target).toEqual(document.getElementById('root'));
  });
  test('initialize is called with footerMessages and requireAuthenticatedUser', () => {
    expect(initialize).toHaveBeenCalledTimes(1);
    const initializeArg = initialize.mock.calls[0][0];
    expect(initializeArg.messages).toEqual([appMessages, headerMesssages, footerMessages]);
    expect(initializeArg.requireAuthenticatedUser).toEqual(true);
  });
  test('initialize config loads support url if available', () => {
    const oldEnv = process.env;
    const initializeArg = initialize.mock.calls[0][0];
    delete process.env.SUPPORT_URL;
    initializeArg.handlers.config();
    expect(mergeConfig).toHaveBeenCalledWith({ SUPPORT_URL: null }, app.appName);
    process.env.SUPPORT_URL = testValue;
    initializeArg.handlers.config();
    expect(mergeConfig).toHaveBeenCalledWith({ SUPPORT_URL: testValue }, app.appName);
    process.env = oldEnv;
  });
});
