import React from 'react';
import { shallow } from 'enzyme';
import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks as appHooks } from 'data/redux';
import EntitlementBanner from './EntitlementBanner';

jest.mock('@edx/frontend-platform/i18n', () => ({
  useIntl: jest.fn(),
}));
jest.mock('components/Banner', () => 'Banner');
jest.mock('data/redux', () => ({
  hooks: {
    usePlatformSettingsData: jest.fn(),
    useCardEntitlementsData: jest.fn(),
  },
}));

const courseNumber = 'my-test-course-number';

let el;

const entitlementsData = {
  isEntitlement: true,
  hasSessions: true,
  isFulfilled: false,
  changeDeadline: 'test-deadline',
  showExpirationWarning: false,
};
const platformData = { supportEmail: 'test-support-email' };

const render = (overrides = {}) => {
  const { entitlements = {} } = overrides;
  appHooks.useCardEntitlementsData.mockReturnValueOnce({ ...entitlementsData, ...entitlements });
  appHooks.usePlatformSettingsData.mockReturnValueOnce(platformData);
  el = shallow(<EntitlementBanner courseNumber={courseNumber} />);
};

describe('EntitlementBanner', () => {
  beforeEach(() => {
    useIntl.mockReturnValue({
      formatDate: (date) => date,
      formatMessage: (message, values) => <div {...{ message, values }} />,
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('initializes data with course number from entitlements', () => {
    render();
    expect(appHooks.useCardEntitlementsData).toHaveBeenCalledWith(courseNumber);
  });
  test('no display if not an entitlement', () => {
    render({ entitlements: { isEntitlement: false } });
    expect(el.isEmptyRender()).toEqual(true);
  });
  test('snapshot: no sessions available', () => {
    render({ entitlements: { isFulfilled: false, hasSessions: false } });
    expect(el).toMatchSnapshot();
  });
  test('snapshot: expiration warning', () => {
    render({ entitlements: { showExpirationWarning: true } });
    expect(el).toMatchSnapshot();
  });
  test('no display if sessions available and not displaying warning', () => {
    render();
    expect(el.isEmptyRender()).toEqual(true);
  });
});
