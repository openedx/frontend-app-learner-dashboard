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
  it('displays LoadingView if request is loading', () => {
    hooks.useRecommendationPanelData.mockReturnValueOnce({
      courses: [],
      isFailed: false,
      isLoaded: false,
      isLoading: true,
    });
    expect(shallow(<RecommendationsPanel />)).toMatchObject(shallow(<LoadingView />));
  });
  it('displays LoadedView with courses if request is loaded', () => {
    hooks.useRecommendationPanelData.mockReturnValueOnce({
      courses,
      isFailed: false,
      isLoaded: true,
      isLoading: false,
    });
    expect(shallow(<RecommendationsPanel />)).toMatchObject(
      shallow(<LoadedView courses={courses} />),
    );
  });
  it('displays LookingForChallengeWidget if request is failed', () => {
    hooks.useRecommendationPanelData.mockReturnValueOnce({
      courses: [],
      isFailed: true,
      isLoaded: false,
      isLoading: false,
    });
    expect(shallow(<RecommendationsPanel />)).toMatchObject(
      shallow(<LookingForChallengeWidget />),
    );
  });
  it('defaults to LookingForChallengeWidget if no flags are true', () => {
    hooks.useRecommendationPanelData.mockReturnValueOnce({
      courses: [],
      isFailed: false,
      isLoaded: false,
      isLoading: false,
    });
    expect(shallow(<RecommendationsPanel />)).toMatchObject(
      shallow(<LookingForChallengeWidget />),
    );
  });
});
