import React from 'react';
import { shallow } from 'enzyme';

import { modalData } from './hooks';
import RelatedProgramsModal from '.';

jest.mock('./components/ProgramCard', () => 'ProgramCard');
jest.mock('./hooks', () => ({
  modalData: jest.fn(),
}));

const courseNumber = 'test-course-number';
const hookProps = {
  courseTitle: 'hookProps.courseTitle',
  relatedPrograms: [
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
  courseNumber,
};

describe('RelatedProgramsModal', () => {
  beforeEach(() => {
    modalData.mockReturnValueOnce(hookProps);
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
