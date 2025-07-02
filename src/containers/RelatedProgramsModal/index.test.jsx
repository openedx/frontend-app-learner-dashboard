import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import RelatedProgramsModal from '.';
import messages from './messages';

jest.mock('./components/ProgramCard', () => jest.fn(() => <div>ProgramCard</div>));
jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseData: jest.fn(),
    useCardRelatedProgramsData: jest.fn(),
  },
}));

const cardId = 'test-card-id';
const courseData = {
  courseName: 'test course',
};
const programData = {
  list: [
    {
      programUrl: 'program-1-url',
      programData: { dataFor: 'program1' },
    },
    {
      programUrl: 'program-2-url',
      programData: { dataFor: 'program2' },
    },
    {
      programUrl: 'program-3-url',
      programData: { dataFor: 'program3' },
    },
  ],
};

const props = {
  isOpen: true,
  closeModal: jest.fn().mockName('props.closeModal'),
  cardId,
};

describe('RelatedProgramsModal', () => {
  beforeEach(() => {
    reduxHooks.useCardCourseData.mockReturnValueOnce(courseData);
    reduxHooks.useCardRelatedProgramsData.mockReturnValueOnce(programData);
  });
  it('initializes hooks with cardId', () => {
    render(<IntlProvider locale="en"><RelatedProgramsModal {...props} /></IntlProvider>);
    expect(reduxHooks.useCardCourseData).toHaveBeenCalledWith(cardId);
    expect(reduxHooks.useCardRelatedProgramsData).toHaveBeenCalledWith(cardId);
  });
  describe('renders', () => {
    beforeEach(() => render(<IntlProvider locale="en"><RelatedProgramsModal {...props} /></IntlProvider>));
    it('display header', () => {
      const header = screen.getByRole('heading', { name: messages.header.defaultMessage });
      expect(header).toBeInTheDocument();
    });
    it('displays course name', () => {
      const courseName = screen.getByText(courseData.courseName);
      expect(courseName).toBeInTheDocument();
    });
    it('displays description', () => {
      const description = screen.getByText((text) => text.includes('Are you looking to expand your knowledge?'));
      expect(description).toBeInTheDocument();
    });
    it('displays program cards', () => {
      const programCards = screen.getAllByText('ProgramCard');
      expect(programCards.length).toEqual(programData.list.length);
    });
  });
});
