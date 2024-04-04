import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import ProgramCard from './ProgramCard';

const props = {
  data: {
    numberOfCourses: 2,
    bannerImgSrc: 'props.data.bannerImgSrc',
    logoImgSrc: 'props.data.logoImgSrc',
    title: 'props.data.title',
    provider: 'props.data.provider',
    programType: 'props.data.programType',
    programUrl: 'props.data.programUrl',
    programTypeUrl: 'props.data.programTypeUrl',
  },
};

describe('RelatedProgramsModal ProgramCard', () => {
  test('snapshot', () => {
    expect(shallow(<ProgramCard {...props} />).snapshot).toMatchSnapshot();
  });
});
