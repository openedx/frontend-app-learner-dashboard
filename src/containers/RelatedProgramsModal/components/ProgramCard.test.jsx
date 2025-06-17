import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import ProgramCard from './ProgramCard';

const props = {
  data: {
    numberOfCourses: 2,
    bannerImgSrc: 'test bannerImgSrc',
    logoImgSrc: 'test logoImgSrc',
    title: 'test title',
    provider: 'test provider',
    programType: 'test programType',
    programUrl: 'test programUrl',
    programTypeUrl: 'test programTypeUrl',
  },
};

describe('RelatedProgramsModal ProgramCard', () => {
  describe('renders', () => {
    beforeEach(() => render(<IntlProvider locale="en"><ProgramCard {...props} /></IntlProvider>));
    it('bannerImg and logo', () => {
      const logo = screen.getByRole('img', { name: `${props.data.provider} logo` });
      const bannerImg = screen.getByRole('img', { name: /bannerAlt/i });
      expect(logo).toBeInTheDocument();
      expect(bannerImg).toBeInTheDocument();
    });
    it('title and subtitle', () => {
      const title = screen.getByText(props.data.title);
      const subtitle = screen.getByText(props.data.provider);
      expect(title).toBeInTheDocument();
      expect(subtitle).toBeInTheDocument();
    });
    it('badge', () => {
      const badge = screen.getByText(props.data.programType);
      expect(badge).toBeInTheDocument();
    });
    it('courses number', () => {
      const coursesNumber = screen.getByText(`${props.data.numberOfCourses} Courses`);
      expect(coursesNumber).toBeInTheDocument();
    });
  });
});
