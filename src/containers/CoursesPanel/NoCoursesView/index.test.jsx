import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { formatMessage } from 'testUtils';
import { baseAppUrl } from 'data/services/lms/urls';

import EmptyCourse from '.';
import messages from './messages';

const courseSearchUrl = '/course-search-url';

jest.mock('hooks', () => ({
  reduxHooks: {
    usePlatformSettingsData: jest.fn(() => ({
      courseSearchUrl,
    })),
  },
}));

describe('NoCoursesView', () => {
  it('should display image, heading and button', () => {
    render(<IntlProvider locale="en"><EmptyCourse /></IntlProvider>);
    const image = screen.getByRole('img', { alt: formatMessage(messages.bannerAlt) });
    expect(image).toBeInTheDocument();
  });
  it('should display heading and prompt', () => {
    render(<IntlProvider locale="en"><EmptyCourse /></IntlProvider>);
    const heading = screen.getByText(formatMessage(messages.lookingForChallengePrompt));
    const prompt = screen.getByText(formatMessage(messages.exploreCoursesPrompt));
    expect(heading).toBeInTheDocument();
    expect(prompt).toBeInTheDocument();
  });
  it('should display button', () => {
    render(<IntlProvider locale="en"><EmptyCourse /></IntlProvider>);
    const button = screen.getByRole('link', { name: formatMessage(messages.exploreCoursesButton) });
    expect(button).toBeInTheDocument();
    expect(button.href).toBe(baseAppUrl(courseSearchUrl));
  });
});
