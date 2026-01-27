import * as constants from './app';

jest.unmock('./app');

describe('app constants', () => {
  test('locationId returns trimmed pathname', () => {
    const old = window.location;
    window.location = { pathName: '/somePath.jpg' };
    expect(constants.locationId).toEqual(window.location.pathname.slice(1));
    window.location = old;
  });
});
