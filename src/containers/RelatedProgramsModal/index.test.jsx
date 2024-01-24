import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import { reduxHooks } from 'hooks';
import RelatedProgramsModal from '.';

jest.mock('./components/ProgramCard', () => 'ProgramCard');
jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseData: jest.fn(),
    useCardRelatedProgramsData: jest.fn(),
  },
}));

const cardId = 'test-course-number';
const courseData = {
  courseTitle: 'hookProps.courseTitle',
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
    shallow(<RelatedProgramsModal {...props} />);
    expect(reduxHooks.useCardCourseData).toHaveBeenCalledWith(cardId);
    expect(reduxHooks.useCardRelatedProgramsData).toHaveBeenCalledWith(cardId);
  });
  test('snapshot: open', () => {
    expect(shallow(<RelatedProgramsModal {...props} />).snapshot).toMatchSnapshot();
  });
  test('snapshot: closed', () => {
    expect(
      shallow(<RelatedProgramsModal {...props} isOpen={false} />).snapshot,
    ).toMatchSnapshot();
  });
});
