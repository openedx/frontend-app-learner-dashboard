import React from 'react';
import { shallow } from 'enzyme';

import useRelatedProgramsBadge from './hooks';
import RelatedProgramsBadge from '.';

jest.mock('containers/RelatedProgramsModal', () => 'RelatedProgramsModal');
jest.mock('./hooks', () => jest.fn());

const hookProps = {
  isOpen: true,
  openModal: jest.fn().mockName('useRelatedProgramsBadge.openModal'),
  closeModal: jest.fn().mockName('useRelatedProgramsBadge.closeModal'),
  numPrograms: 3,
  programsMessage: 'useRelatedProgramsBadge.programsMessage',
};

const courseNumber = 'test-course-number';

describe('RelatedProgramsBadge component', () => {
  test('empty render: no programs', () => {
    useRelatedProgramsBadge.mockReturnValueOnce({ ...hookProps, numPrograms: 0 });
    const el = shallow(<RelatedProgramsBadge courseNumber={courseNumber} />);
    expect(el.isEmptyRender()).toEqual(true);
  });
  test('snapshot: 3 programs', () => {
    useRelatedProgramsBadge.mockReturnValueOnce(hookProps);
    expect(shallow(<RelatedProgramsBadge courseNumber={courseNumber} />)).toMatchSnapshot();
  });
});
