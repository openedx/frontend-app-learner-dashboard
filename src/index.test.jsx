import { render } from 'react-dom';

import {
  APP_INIT_ERROR,
  APP_READY,
  initialize,
  mergeConfig,
  subscribe,
} from '@edx/frontend-platform';

import { configuration } from './config';
import * as app from '.';

jest.mock('react-dom', () => ({
  render: jest.fn(),
}));

jest.mock('@edx/frontend-platform', () => ({
  mergeConfig: jest.fn(),
  ensureConfig: jest.fn(),
  APP_READY: 'app-is-ready-key',
  APP_INIT_ERROR: 'app-init-error',
  initialize: jest.fn(),
  subscribe: jest.fn(),
}));

jest.mock('data/store', () => ({ redux: 'store' }));
jest.mock('./App', () => 'App');
jest.mock('components/NoticesWrapper', () => 'NoticesWrapper');

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
  test('initialize is called with requireAuthenticatedUser', () => {
    expect(initialize).toHaveBeenCalledTimes(1);
    const initializeArg = initialize.mock.calls[0][0];
    expect(initializeArg.requireAuthenticatedUser).toEqual(true);
  });
  test('initialize config', () => {
    const initializeArg = initialize.mock.calls[0][0];
    initializeArg.handlers.config();
    expect(mergeConfig).toHaveBeenCalledWith(configuration, app.appName);
  });
});
