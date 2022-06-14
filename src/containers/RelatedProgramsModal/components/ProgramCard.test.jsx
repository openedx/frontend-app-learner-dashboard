import React from 'react';
import { shallow } from 'enzyme';

import ProgramCard from './ProgramCard';

const props = {
  data: {
    estimatedNumberOfWeeks: 1,
    numberOfCourses: 2,
    bannerUrl: 'props.data.bannerUrl',
    logoUrl: 'props.data.logoUrl',
    title: 'props.data.title',
    provider: 'props.data.provider',
    programType: 'props.data.programType',
    programUrl: 'props.data.programUrl',
    programTypeUrl: 'props.data.programTypeUrl',
  },
};

describe('RelatedProgramsModal ProgramCard', () => {
  test('snapshot', () => {
    expect(shallow(<ProgramCard {...props} />)).toMatchSnapshot();
  });
});
