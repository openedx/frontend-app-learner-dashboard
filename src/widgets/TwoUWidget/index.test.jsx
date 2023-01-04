import React from 'react';
import { shallow } from 'enzyme';

import hooks from './hooks';
import TwoUWidget from '.';
import LoadedView from './LoadedView';
import LoadingView from './LoadingView';

jest.mock('./hooks', () => ({
  useIsMediumScreen: jest.fn(() => false),
  useTwoUWidgetData: jest.fn(),
  useOptimizelyExperiment: jest.fn(() => ({ show2ULobs: false, isExperimentLoaded: false })),
}));
jest.mock('./LoadingView', () => 'LoadingView');
jest.mock('./LoadedView', () => 'LoadedView');

describe('TwoUWidget tests', () => {
  const twoUWidgetDefaultValues = {
    isLoaded: false,
    isLoading: false,
    countryCode: '',
  };
  it('TwoUWidget snapshot', () => {
    hooks.useTwoUWidgetData.mockReturnValueOnce({
      ...twoUWidgetDefaultValues,
      isLoaded: true,
    });
    expect(shallow(<TwoUWidget />)).toMatchSnapshot();
  });
  it('displays LoadingView if request is loading', () => {
    hooks.useTwoUWidgetData.mockReturnValueOnce({
      ...twoUWidgetDefaultValues,
      isLoading: true,
    });
    expect(shallow(<TwoUWidget />)).toMatchObject(shallow(<LoadingView />));
  });
  it('displays LoadedView if request is done', () => {
    hooks.useTwoUWidgetData.mockReturnValueOnce({
      ...twoUWidgetDefaultValues,
      isLoaded: true,
    });
    hooks.useOptimizelyExperiment.mockReturnValueOnce({
      show2ULobs: true,
      isExperimentLoaded: true,
    });
    expect(shallow(<TwoUWidget />)).toMatchObject(shallow(<LoadedView countryCode="" show2ULobs />));
  });
});
