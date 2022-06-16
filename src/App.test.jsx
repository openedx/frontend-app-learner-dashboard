import React from 'react';
import { shallow } from 'enzyme';

import { BrowserRouter } from 'react-router-dom';

import Footer from '@edx/frontend-component-footer';

import Dashboard from 'containers/Dashboard';
import { App } from './App';

jest.mock('@edx/frontend-component-footer', () => 'Footer');

jest.mock('containers/Dashboard', () => 'Dashboard');
jest.mock('containers/LearnerDashboardHeader', () => 'LearnerDashboardHeader');

const logo = 'fakeLogo.png';
let el;
let router;

describe('App router component', () => {
  test('snapshot: enabled', () => {
    expect(shallow(<App />)).toMatchSnapshot();
  });
  describe('component', () => {
    beforeEach(() => {
      process.env.LOGO_POWERED_BY_OPEN_EDX_URL_SVG = logo;
      el = shallow(<App />);
      router = el.find(BrowserRouter);
    });
    describe('Router', () => {
      test('Routing - ListView is only route', () => {
        expect(router.find('main')).toEqual(shallow(
          <main><Dashboard /></main>,
        ));
      });
    });
    test('Footer logo drawn from env variable', () => {
      expect(router.find(Footer).props().logo).toEqual(logo);
    });
  });
});
