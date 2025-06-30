import { screen, render } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import hooks from './hooks';
import { CreditBanner } from '.';

jest.mock('./hooks', () => ({
  useCreditBannerData: jest.fn(),
}));

describe('CreditBanner', () => {
  const mockCardId = 'test-card-id';
  const mockContentComponent = () => <div data-testid="mock-content">Test Content</div>;
  const mockSupportEmail = 'support@test.com';

  const renderCreditBanner = () => render(
    <IntlProvider locale="en">
      <CreditBanner cardId={mockCardId} />
    </IntlProvider>,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return null if hook returns null', () => {
    hooks.useCreditBannerData.mockReturnValue(null);
    renderCreditBanner();
    const banner = screen.queryByRole('alert');
    expect(banner).toBeNull();
  });

  it('should render content component without error', () => {
    hooks.useCreditBannerData.mockReturnValue({
      ContentComponent: mockContentComponent,
      error: false,
    });
    renderCreditBanner();

    expect(screen.getByTestId('mock-content')).toBeInTheDocument();
    expect(screen.queryByTestId('credit-error-msg')).not.toBeInTheDocument();
  });

  it('should render error message with support email', () => {
    hooks.useCreditBannerData.mockReturnValue({
      ContentComponent: mockContentComponent,
      error: true,
      supportEmail: mockSupportEmail,
    });
    renderCreditBanner();

    expect(screen.getByTestId('credit-error-msg')).toBeInTheDocument();
    expect(screen.getByText(mockSupportEmail)).toBeInTheDocument();
  });

  it('should render error message without support email', () => {
    hooks.useCreditBannerData.mockReturnValue({
      ContentComponent: mockContentComponent,
      error: true,
    });
    renderCreditBanner();

    expect(screen.getByTestId('credit-error-msg')).toBeInTheDocument();
    expect(screen.queryByText(mockSupportEmail)).not.toBeInTheDocument();
  });
});
