import React from 'react';
import { shallow } from 'enzyme';

import LoadingView from './LoadingView';

describe('TwoUWidget LoadingView', () => {
  test('snapshot', () => {
    expect(shallow(<LoadingView />)).toMatchSnapshot();
  });
});
