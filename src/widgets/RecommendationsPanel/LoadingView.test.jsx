import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import { useDashboardMessages } from 'containers/Dashboard/hooks';
import LoadingView from './LoadingView';

jest.mock('./components/CourseCard', () => 'CourseCard');
jest.mock('containers/Dashboard/hooks', () => ({
  useDashboardMessages: jest.fn(),
}));

const spinnerScreenReaderText = 'test-spinner-screen-reader-text';
useDashboardMessages.mockReturnValue(spinnerScreenReaderText);

describe('RecommendationsPanel LoadingView', () => {
  test('snapshot', () => {
    expect(shallow(<LoadingView />).snapshot).toMatchSnapshot();
  });
});
