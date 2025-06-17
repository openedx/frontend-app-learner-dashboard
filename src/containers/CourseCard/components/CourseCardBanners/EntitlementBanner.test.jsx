import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { formatMessage } from 'testUtils';

import { reduxHooks } from 'hooks';
import EntitlementBanner from './EntitlementBanner';
import messages from './messages';

jest.mock('hooks', () => ({
  utilHooks: {
    useFormatDate: () => date => date,
  },
  reduxHooks: {
    usePlatformSettingsData: jest.fn(),
    useCardEntitlementData: jest.fn(),
    useUpdateSelectSessionModalCallback: jest.fn(
      (cardId) => jest.fn().mockName(`updateSelectSessionModalCallback(${cardId})`),
    ),
  },
}));

const cardId = 'test-card-id';

const entitlementData = {
  isEntitlement: true,
  hasSessions: true,
  isFulfilled: false,
  changeDeadline: '11/11/2022',
  showExpirationWarning: false,
};
const platformData = { supportEmail: 'test-support-email' };

const renderComponent = (overrides = {}) => {
  const { entitlement = {} } = overrides;
  reduxHooks.useCardEntitlementData.mockReturnValueOnce({ ...entitlementData, ...entitlement });
  reduxHooks.usePlatformSettingsData.mockReturnValueOnce(platformData);
  return render(<IntlProvider locale="en"><EntitlementBanner cardId={cardId} /></IntlProvider>);
};

describe('EntitlementBanner', () => {
  it('initializes data with course number from entitlement', () => {
    renderComponent();
    expect(reduxHooks.useCardEntitlementData).toHaveBeenCalledWith(cardId);
    expect(reduxHooks.useUpdateSelectSessionModalCallback).toHaveBeenCalledWith(cardId);
  });
  it('no display if not an entitlement', () => {
    renderComponent({ entitlement: { isEntitlement: false } });
    const banner = screen.queryByRole('alert');
    expect(banner).toBeNull();
  });
  it('renders when no sessions available', () => {
    renderComponent({ entitlement: { isFulfilled: false, hasSessions: false } });
    const banner = screen.getByRole('alert');
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveClass('alert-warning');
    expect(banner.innerHTML).toContain(platformData.supportEmail);
  });
  it('renders when expiration warning', () => {
    renderComponent({ entitlement: { showExpirationWarning: true } });
    const banner = screen.getByRole('alert');
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveClass('alert-info');
    const button = screen.getByRole('button', { name: formatMessage(messages.selectSession) });
    expect(button).toBeInTheDocument();
  });
  it('renders expired banner', () => {
    renderComponent({ entitlement: { isExpired: true } });
    const banner = screen.getByRole('alert');
    expect(banner).toBeInTheDocument();
    expect(banner.innerHTML).toContain(formatMessage(messages.entitlementExpired));
  });
});
