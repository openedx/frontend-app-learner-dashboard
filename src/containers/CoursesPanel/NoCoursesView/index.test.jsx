import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider, getSiteConfig, setSiteConfig } from '@openedx/frontend-base';
import { coursesRole } from '@src/constants';
import { LocationDisplay, formatMessage, provideRoute } from '@src/testUtils';
import { baseAppUrl } from '@src/data/services/lms/urls';

import EmptyCourse from '.';
import messages from './messages';

const courseSearchUrl = '/course-search-url';

jest.mock('@src/data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(() => ({
    data: {
      platformSettings: {
        courseSearchUrl,
      },
    },
  })),
}));

describe('NoCoursesView', () => {
  const siteConfig = getSiteConfig();

  afterEach(() => {
    setSiteConfig(siteConfig);
  });

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
  it('navigates to the courses route in the client when an app provides it', () => {
    provideRoute(coursesRole, 'courses');
    render(
      <IntlProvider locale="en">
        <MemoryRouter initialEntries={['/dashboard']}>
          <EmptyCourse />
          <LocationDisplay />
        </MemoryRouter>
      </IntlProvider>,
    );
    const button = screen.getByRole('link', { name: formatMessage(messages.exploreCoursesButton) });
    expect(button).toHaveAttribute('href', '/courses');

    fireEvent.click(button);
    expect(screen.getByTestId('location')).toHaveTextContent('/courses');
  });
});
