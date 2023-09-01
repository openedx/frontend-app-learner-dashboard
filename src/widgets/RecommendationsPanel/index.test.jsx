import React from 'react';
import { shallow } from 'enzyme';

import LookingForChallengeWidget from 'widgets/LookingForChallengeWidget';
import hooks from './hooks';
import mockData from './mockData';
import LoadedView from './LoadedView';
import LoadingView from './LoadingView';
import RecommendationsPanel from '.';
import { usePaintedDoorExperimentContext } from '../RecommendationsPaintedDoorBtn/PaintedDoorExperimentContext';
import RecommendationsPaintedDoorBtn from '../RecommendationsPaintedDoorBtn';

jest.mock('./hooks', () => ({
  useRecommendationPanelData: jest.fn(),
}));
jest.mock('widgets/LookingForChallengeWidget', () => 'LookingForChallengeWidget');
jest.mock('./LoadingView', () => 'LoadingView');
jest.mock('./LoadedView', () => 'LoadedView');
jest.mock('widgets/RecommendationsPaintedDoorBtn/PaintedDoorExperimentContext', () => ({
  usePaintedDoorExperimentContext: jest.fn(),
}));

const { courses } = mockData;

describe('RecommendationsPanel snapshot', () => {
  const defaultLoadedViewProps = {
    courses: [],
    isControl: false,
  };
  const defaultValues = {
    isFailed: false,
    isLoaded: false,
    isLoading: false,
    ...defaultLoadedViewProps,
  };
  describe('RecommendationsPanel recommendations tests', () => {
    beforeEach(() => {
      usePaintedDoorExperimentContext.mockReturnValueOnce({
        experimentVariation: '',
        isPaintedDoorWidgetBtnVariation: false,
        experimentLoading: false,
      });
    });
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
        shallow(<LoadedView {...defaultLoadedViewProps} courses={courses} />),
      );
    });
    it('displays LookingForChallengeWidget if request is failed', () => {
      hooks.useRecommendationPanelData.mockReturnValueOnce({
        ...defaultValues,
        isFailed: true,
      });
      expect(shallow(<RecommendationsPanel />)).toMatchObject(
        shallow(<LookingForChallengeWidget />),
      );
    });
    it('defaults to LookingForChallengeWidget if no flags are true', () => {
      hooks.useRecommendationPanelData.mockReturnValueOnce({
        ...defaultValues,
      });
      expect(shallow(<RecommendationsPanel />)).toMatchObject(
        shallow(<LookingForChallengeWidget />),
      );
    });
  });

  describe('RecommendationsPanel painted door exp tests', () => {
    it('displays painted door btn if user is in variation and request is failed', () => {
      hooks.useRecommendationPanelData.mockReturnValueOnce({
        ...defaultValues,
        isFailed: true,
      });
      usePaintedDoorExperimentContext.mockReturnValueOnce({
        experimentVariation: '',
        isPaintedDoorWidgetBtnVariation: true,
        experimentLoading: false,
      });

      const wrapper = shallow(<RecommendationsPanel />);
      expect(wrapper.find(RecommendationsPaintedDoorBtn).exists()).toBe(true);
    });
    it('displays painted door btn if user is in variation and no flags are set (defaults)', () => {
      hooks.useRecommendationPanelData.mockReturnValueOnce({
        ...defaultValues,
        isFailed: true,
      });
      usePaintedDoorExperimentContext.mockReturnValueOnce({
        experimentVariation: '',
        isPaintedDoorWidgetBtnVariation: true,
        experimentLoading: false,
      });

      const wrapper = shallow(<RecommendationsPanel />);
      expect(wrapper.find(RecommendationsPaintedDoorBtn).exists()).toBe(true);
    });
    it('renders only LookingForChallengeWidget if user is not in variation', () => {
      hooks.useRecommendationPanelData.mockReturnValueOnce({
        ...defaultValues,
        isFailed: true,
      });
      usePaintedDoorExperimentContext.mockReturnValueOnce({
        experimentVariation: '',
        isPaintedDoorWidgetBtnVariation: false,
        experimentLoading: false,
      });

      expect(shallow(<RecommendationsPanel />)).toMatchObject(
        shallow(<LookingForChallengeWidget />),
      );
    });
    it('renders only LookingForChallengeWidget if experiment is loading', () => {
      hooks.useRecommendationPanelData.mockReturnValueOnce({
        ...defaultValues,
        isFailed: true,
      });
      usePaintedDoorExperimentContext.mockReturnValueOnce({
        experimentVariation: '',
        isPaintedDoorWidgetBtnVariation: false,
        experimentLoading: true,
      });

      expect(shallow(<RecommendationsPanel />)).toMatchObject(
        shallow(<LookingForChallengeWidget />),
      );
    });
  });
});
