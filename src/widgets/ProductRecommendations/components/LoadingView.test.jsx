import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import LoadingView from './LoadingView';

describe('ProductRecommendations LoadingView', () => {
  it('matches snapshot', () => {
    expect(shallow(<LoadingView />).snapshot).toMatchSnapshot();
  });
});
