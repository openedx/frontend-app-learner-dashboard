import * as base from '@openedx/frontend-base';
import * as constants from './app';

jest.unmock('./app');

jest.mock('@openedx/frontend-base', () => {
  const PUBLIC_PATH = 'test-public-path';
  return {
    getSiteConfig: () => ({ PUBLIC_PATH }),
    PUBLIC_PATH,
  };
});

describe('app constants', () => {
  test('route path draws from public path and adds courseId', () => {
    expect(constants.routePath).toEqual(`${base.PUBLIC_PATH}:courseId`);
  });
  test('locationId returns trimmed pathname', () => {
    const old = window.location;
    window.location = { pathName: '/somePath.jpg' };
    expect(constants.locationId).toEqual(window.location.pathname.slice(1));
    window.location = old;
  });
});
