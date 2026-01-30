import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { formatMessage } from 'testUtils';

import { useCourseData } from 'hooks';
import EntitlementBanner from './EntitlementBanner';
import messages from './messages';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useMemo: (fn) => fn(),
}));

jest.mock('data/react-query/apiHooks', () => ({
  useInitializeLearnerHome: jest.fn().mockReturnValue({
    data: {
      platformSettings: {
        supportEmail: 'test-support-email',
      },
    },
  }),
}));

jest.mock('data/context/SelectSessionProvider', () => ({
  useSelectSessionModal: () => ({
    updateSelectSessionModal: jest.fn().mockName('updateSelectSessionModal'),
  }),
}));

jest.mock('hooks', () => ({
  useCourseData: jest.fn(),
  utilHooks: {
    useFormatDate: () => date => date?.toDateString(),
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
  useCourseData.mockReturnValue({
    entitlement: { ...entitlementData, ...entitlement },
    platformSettings: platformData,
  });
  return render(<IntlProvider locale="en"><EntitlementBanner cardId={cardId} /></IntlProvider>);
};

describe('EntitlementBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('initializes data with course number from entitlement', () => {
    renderComponent();
    expect(useCourseData).toHaveBeenCalledWith(cardId);
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
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 4);
    const deadlineStr = `${deadline.getMonth() + 1}/${deadline.getDate()}/${deadline.getFullYear()}`;
    renderComponent({ entitlement: { changeDeadline: deadlineStr, isFulfilled: false, availableSessions: [1, 2, 3] } });
    const banner = screen.getByRole('alert');
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveClass('alert-info');
    const button = screen.getByRole('button', { name: formatMessage(messages.selectSession) });
    expect(button).toBeInTheDocument();
  });
  it('renders expired banner', () => {
    renderComponent({ entitlement: { isExpired: true, availableSessions: [1, 2, 3] } });
    const banner = screen.getByRole('alert');
    expect(banner).toBeInTheDocument();
    expect(banner.innerHTML).toContain(formatMessage(messages.entitlementExpired));
  });
});
