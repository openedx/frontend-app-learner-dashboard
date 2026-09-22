import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  IntlProvider, getSiteConfig, sendTrackEvent, setSiteConfig,
} from '@openedx/frontend-base';
import { coursesRole } from '@src/constants';
import { LocationDisplay, provideRoute } from '@src/testUtils';
import { eventNames } from '@src/tracking/constants';
import LookingForChallengeWidget from '.';
import messages from './messages';
import { linkNames } from './track';

const courseSearchUrl = 'http://localhost:18000/course-search-url';

jest.mock('@src/data/hooks', () => ({
  useInitializeLearnerHome: () => ({
    data: {
      platformSettings: {
        courseSearchUrl,
      },
    },
  }),
}));

jest.mock('@openedx/frontend-base', () => ({
  ...jest.requireActual('@openedx/frontend-base'),
  sendTrackEvent: jest.fn(),
}));

describe('LookingForChallengeWidget', () => {
  const siteConfig = getSiteConfig();

  afterEach(() => {
    setSiteConfig(siteConfig);
    sendTrackEvent.mockClear();
  });

  describe('render', () => {
    it('card image', () => {
      render(<IntlProvider locale="en"><LookingForChallengeWidget /></IntlProvider>);
      const image = screen.getByRole('img', { alt: 'course side widget' });
      expect(image).toBeInTheDocument();
    });
    it('prompt', () => {
      render(<IntlProvider locale="en"><LookingForChallengeWidget /></IntlProvider>);
      const prompt = screen.getByText(messages.lookingForChallengePrompt.defaultMessage);
      expect(prompt).toBeInTheDocument();
    });
    it('hyperlink', () => {
      render(<IntlProvider locale="en"><LookingForChallengeWidget /></IntlProvider>);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', courseSearchUrl);
    });
    it('tracks the click and navigates to the courses route in the client when an app provides it', () => {
      provideRoute(coursesRole, 'courses');
      render(
        <IntlProvider locale="en">
          <MemoryRouter initialEntries={['/dashboard']}>
            <LookingForChallengeWidget />
            <LocationDisplay />
          </MemoryRouter>
        </IntlProvider>,
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/courses');

      fireEvent.click(link);
      expect(sendTrackEvent).toHaveBeenCalledWith(
        eventNames.findCoursesClicked,
        expect.objectContaining({ linkName: linkNames.findCoursesWidget }),
      );
      expect(screen.getByTestId('location')).toHaveTextContent('/courses');
    });
  });
});
