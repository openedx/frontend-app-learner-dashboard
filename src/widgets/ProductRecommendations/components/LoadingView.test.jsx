import React from 'react';
import { shallow } from 'enzyme';

import LoadingView from './LoadingView';

describe('ProductRecommendations LoadingView', () => {
  it('matches snapshot', () => {
    expect(shallow(<LoadingView />)).toMatchSnapshot();
  });
});
