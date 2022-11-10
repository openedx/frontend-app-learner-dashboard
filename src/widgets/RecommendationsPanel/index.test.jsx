import React from 'react';
import { shallow } from 'enzyme';

import LookingForChallengeWidget from 'widgets/LookingForChallengeWidget';
import hooks from './hooks';
import mockData from './mockData';
import LoadedView from './LoadedView';
import LoadingView from './LoadingView';
import RecommendationsPanel from '.';

jest.mock('./hooks', () => ({
  useRecommendationPanelData: jest.fn(),
}));
jest.mock('widgets/LookingForChallengeWidget', () => 'LookingForChallengeWidget');
jest.mock('./LoadingView', () => 'LoadingView');
jest.mock('./LoadedView', () => 'LoadedView');

const { courses } = mockData;

describe('RecommendationsPanel snapshot', () => {
  const defaultProps = {
    courseSearchClickTracker: jest.fn().mockName('courseSearchClickTracker'),
  };
  const defaultValues = {
    isFailed: false,
    isLoaded: false,
    isLoading: false,
    courses: [],
    ...defaultProps,
  };
  it('displays LoadingView if request is loading', () => {
    hooks.useRecommendationPanelData.mockReturnValueOnce({
      ...defaultValues,
      isLoading: true,
    });
    expect(shallow(<RecommendationsPanel />)).toMatchObject(shallow(<LoadingView />));
  });
  it('displays LoadedView with courses if request is loaded', () => {
    hooks.useRecommendationPanelData.mockReturnValueOnce({
      ...defaultValues,
      courses,
      isLoaded: true,
    });
    expect(shallow(<RecommendationsPanel />)).toMatchObject(
      shallow(<LoadedView courses={courses} {...defaultProps} />),
    );
  });
  it('displays LookingForChallengeWidget if request is failed', () => {
    hooks.useRecommendationPanelData.mockReturnValueOnce({
      ...defaultValues,
      isFailed: true,
    });
    expect(shallow(<RecommendationsPanel />)).toMatchObject(
      shallow(<LookingForChallengeWidget {...defaultProps} />),
    );
  });
  it('defaults to LookingForChallengeWidget if no flags are true', () => {
    hooks.useRecommendationPanelData.mockReturnValueOnce({
      ...defaultValues,
    });
    expect(shallow(<RecommendationsPanel />)).toMatchObject(
      shallow(<LookingForChallengeWidget {...defaultProps} />),
    );
  });
});
