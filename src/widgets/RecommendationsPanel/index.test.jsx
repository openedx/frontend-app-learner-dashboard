import React from 'react';
import { shallow } from 'enzyme';

import LookingForChallengeWidget from 'widgets/LookingForChallengeWidget';
import hooks from './hooks';
import mockData from './mockData';
import LoadedView from './LoadedView';
import LoadingView from './LoadingView';
import RecommendationsPanel from '.';
import { useRecommendationsModal } from '../../components/ModalView/hooks';

jest.mock('./hooks', () => ({
  useRecommendationPanelData: jest.fn(),
}));
jest.mock('../../components/ModalView/hooks', () => ({
  useRecommendationsModal: jest.fn(),
}));
jest.mock('widgets/LookingForChallengeWidget', () => 'LookingForChallengeWidget');
jest.mock('./LoadingView', () => 'LoadingView');
jest.mock('./LoadedView', () => 'LoadedView');

const { courses } = mockData;

describe('RecommendationsPanel snapshot', () => {
  const defaultLoadedViewProps = {
    courses: [],
    isControl: false,
    setIsRecommendationsModalOpen: jest.fn(),
    isRecommendationsModalOpen: false,
  };
  const defaultValues = {
    isFailed: false,
    isLoaded: false,
    isLoading: false,
    ...defaultLoadedViewProps,
  };
  it('displays LoadingView if request is loading', () => {
    useRecommendationsModal.mockReturnValueOnce({
      isRecommendationsModalOpen: false,
      toggleRecommendationsModal: jest.fn(),
    });
    hooks.useRecommendationPanelData.mockReturnValueOnce({
      ...defaultValues,
      isLoading: true,
    });
    expect(shallow(<RecommendationsPanel />)).toMatchObject(shallow(<LoadingView />));
  });
  it('displays LoadedView with courses if request is loaded', () => {
    useRecommendationsModal.mockReturnValueOnce({
      isRecommendationsModalOpen: false,
      toggleRecommendationsModal: jest.fn(),
    });
    hooks.useRecommendationPanelData.mockReturnValueOnce({
      ...defaultValues,
      courses,
      isLoaded: true,
    });
    expect(JSON.stringify(shallow(<RecommendationsPanel />)))
      .toEqual(JSON.stringify(shallow(<LoadedView {...defaultLoadedViewProps} courses={courses} />)));
  });
  it('displays LookingForChallengeWidget if request is failed', () => {
    useRecommendationsModal.mockReturnValueOnce({
      isRecommendationsModalOpen: false,
      toggleRecommendationsModal: jest.fn(),
    });
    hooks.useRecommendationPanelData.mockReturnValueOnce({
      ...defaultValues,
      isFailed: true,
    });
    expect(shallow(<RecommendationsPanel />)).toMatchObject(
      shallow(<LookingForChallengeWidget />),
    );
  });
  it('defaults to LookingForChallengeWidget if no flags are true', () => {
    useRecommendationsModal.mockReturnValueOnce({
      isRecommendationsModalOpen: false,
      toggleRecommendationsModal: jest.fn(),
    });
    hooks.useRecommendationPanelData.mockReturnValueOnce({
      ...defaultValues,
    });
    expect(shallow(<RecommendationsPanel />)).toMatchObject(
      shallow(<LookingForChallengeWidget />),
    );
  });
});
