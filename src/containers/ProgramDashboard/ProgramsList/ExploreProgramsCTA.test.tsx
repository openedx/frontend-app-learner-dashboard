import { render, screen } from '@testing-library/react';
import { getConfig } from '@edx/frontend-platform';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import ExploreProgramsCTA from './ExploreProgramsCTA';
import messages from './messages';

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(() => ({
    LMS_BASE_URL: 'https://courses.example.com',
    EXPLORE_PROGRAMS_URL: null, // Default to null for testing fallbacks
  })),
}));

describe('ExploreProgramsCTA', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => render(
    <IntlProvider>
      <ExploreProgramsCTA />
    </IntlProvider>,
  );

  it('renders the expected CTA text using i18n', () => {
    renderComponent();

    expect(screen.getByText(messages.exploreCoursesCTAText.defaultMessage)).toBeInTheDocument();
  });

  it('renders the button with the expected text using i18n', () => {
    renderComponent();

    expect(screen.getByRole('link', { name: messages.exploreCoursesCTAButtonText.defaultMessage })).toBeInTheDocument();
  });

  it('uses EXPLORE_PROGRAMS_URL when it is defined', () => {
    const customUrl = 'https://custom.explore.url/programs';
    getConfig.mockReturnValueOnce({
      LMS_BASE_URL: 'https://courses.example.com',
      EXPLORE_PROGRAMS_URL: customUrl,
    });

    renderComponent();

    const button = screen.getByRole('link', { name: messages.exploreCoursesCTAButtonText.defaultMessage });
    expect(button).toHaveAttribute('href', customUrl);
  });

  it('falls back to LMS_BASE_URL/courses when EXPLORE_PROGRAMS_URL is not defined', () => {
    renderComponent();

    const button = screen.getByRole('link', { name: messages.exploreCoursesCTAButtonText.defaultMessage });
    const expectedFallbackUrl = `${getConfig().LMS_BASE_URL}/courses`;
    expect(button).toHaveAttribute('href', expectedFallbackUrl);
  });
});
