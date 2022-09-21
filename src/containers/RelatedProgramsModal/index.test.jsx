import React from 'react';
import { shallow } from 'enzyme';

import { hooks } from 'data/redux';
import RelatedProgramsModal from '.';

jest.mock('./components/ProgramCard', () => 'ProgramCard');
jest.mock('data/redux', () => ({
  hooks: {
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
    hooks.useCardCourseData.mockReturnValueOnce(courseData);
    hooks.useCardRelatedProgramsData.mockReturnValueOnce(programData);
  });
  it('initializes hooks with cardId', () => {
    shallow(<RelatedProgramsModal {...props} />);
    expect(hooks.useCardCourseData).toHaveBeenCalledWith(cardId);
    expect(hooks.useCardRelatedProgramsData).toHaveBeenCalledWith(cardId);
  });
  test('snapshot: open', () => {
    expect(shallow(<RelatedProgramsModal {...props} />)).toMatchSnapshot();
  });
  test('snapshot: closed', () => {
    expect(
      shallow(<RelatedProgramsModal {...props} isOpen={false} />),
    ).toMatchSnapshot();
  });
});
