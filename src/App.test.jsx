import React from 'react';
import { shallow } from 'enzyme';
import { Helmet } from 'react-helmet';
import { ErrorPage } from '@edx/frontend-platform/react';

import { BrowserRouter as Router } from 'react-router-dom';

import { Footer } from '@edx/frontend-component-footer';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Alert } from '@edx/paragon';

import { RequestKeys } from 'data/constants/requests';
import { hooks as appHooks } from 'data/redux';
import Dashboard from 'containers/Dashboard';
import LearnerDashboardHeader from 'containers/LearnerDashboardHeader';
import { App } from './App';
import messages from './messages';

jest.mock('@edx/frontend-component-footer', () => ({
  Footer: () => 'Footer',
}));

jest.mock('containers/Dashboard', () => 'Dashboard');
jest.mock('containers/LearnerDashboardHeader', () => 'LearnerDashboardHeader');
jest.mock('components/ZendeskFab', () => 'ZendeskFab');
jest.mock('data/redux', () => ({
  selectors: 'redux.selectors',
  actions: 'redux.actions',
  thunkActions: 'redux.thunkActions',
  hooks: {
    useRequestIsFailed: jest.fn(),
    usePlatformSettingsData: jest.fn(),
  },
}));
jest.mock('data/store', () => 'data/store');

const logo = 'fakeLogo.png';
let el;

const supportEmail = 'test-support-url';
appHooks.usePlatformSettingsData.mockReturnValue({ supportEmail });

describe('App router component', () => {
  process.env.LOGO_POWERED_BY_OPEN_EDX_URL_SVG = logo;
  const { formatMessage } = useIntl();
  describe('component', () => {
    const runBasicTests = () => {
      test('snapshot', () => { expect(el).toMatchSnapshot(); });
      it('displays title in helmet component', () => {
        expect(el.find(Helmet).find('title').text()).toEqual(useIntl().formatMessage(messages.pageTitle));
      });
      it('displays learner dashboard header', () => {
        expect(el.find(LearnerDashboardHeader).length).toEqual(1);
      });
      it('wraps the page in a browser router', () => {
        expect(el.find(Router)).toMatchObject(el);
      });
      test('Footer logo drawn from env variable', () => {
        expect(el.find(Footer).props().logo).toEqual(logo);
      });
    };
    describe('no network failure', () => {
      beforeAll(() => {
        appHooks.useRequestIsFailed.mockReturnValue(false);
        el = shallow(<App />);
      });
      runBasicTests();
      it('loads dashboard', () => {
        expect(el.find('main')).toMatchObject(shallow(
          <main><Dashboard /></main>,
        ));
      });
    });
    describe('initialize failure', () => {
      beforeAll(() => {
        appHooks.useRequestIsFailed.mockImplementation((key) => key === RequestKeys.initialize);
        el = shallow(<App />);
      });
      runBasicTests();
      it('loads error page', () => {
        expect(el.find('main')).toEqual(shallow(
          <main>
            <Alert variant="danger">
              <ErrorPage message={formatMessage(messages.errorMessage, { supportEmail })} />
            </Alert>
          </main>,
        ));
      });
    });
    describe('refresh failure', () => {
      beforeAll(() => {
        appHooks.useRequestIsFailed.mockImplementation((key) => key === RequestKeys.refreshList);
        el = shallow(<App />);
      });
      runBasicTests();
      it('loads error page', () => {
        expect(el.find('main')).toEqual(shallow(
          <main>
            <Alert variant="danger">
              <ErrorPage message={formatMessage(messages.errorMessage, { supportEmail })} />
            </Alert>
          </main>,
        ));
      });
    });
  });
});
