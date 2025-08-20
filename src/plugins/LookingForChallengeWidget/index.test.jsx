import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import LookingForChallengeWidget from '.';
import messages from './messages';

const courseSearchUrl = 'http://localhost:18000/course-search-url';

jest.mock('hooks', () => ({
  reduxHooks: {
    usePlatformSettingsData: () => ({
      courseSearchUrl,
    }),
  },
}));

jest.mock('./track', () => ({
  findCoursesWidgetClicked: (href) => jest.fn().mockName(`track.findCoursesWidgetClicked('${href}')`),
}));

describe('LookingForChallengeWidget', () => {
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
      const link = screen.getByRole('link', { href: courseSearchUrl });
      expect(link).toBeInTheDocument();
    });
  });
});
