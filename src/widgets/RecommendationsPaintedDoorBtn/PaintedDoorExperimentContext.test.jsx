import React from 'react';
import { mount } from 'enzyme';

import { MockUseState } from 'testUtils';

import * as experiment from './PaintedDoorExperimentContext';
import { useEmailConfirmationData, useHasAvailableDashboards, useRequestIsPending } from '../../data/redux/hooks';
import { trackPaintedDoorVariationGroup } from './track';
import { useIsEnterpriseUser } from './PaintedDoorExperimentContext';

const state = new MockUseState(experiment);
trackPaintedDoorVariationGroup();
jest.unmock('react');
jest.spyOn(React, 'useEffect').mockImplementation((cb, prereqs) => ({ useEffect: { cb, prereqs } }));

jest.mock('../../data/redux/hooks', () => ({
  useRequestIsPending: jest.fn(),
  useHasAvailableDashboards: jest.fn(),
  useEmailConfirmationData: jest.fn(),
}));
jest.mock('./track', () => ({
  trackPaintedDoorVariationGroup: jest.fn(),
}));

describe('useIsEnterpriseUser hook', () => {
  describe('state fields', () => {
    state.testGetter(state.keys.enterpriseUser);
  });
  describe('useIsEnterpriseUser', () => {
    beforeEach(() => {
      state.mock();
      useRequestIsPending.mockReturnValueOnce(false);
      useEmailConfirmationData.mockReturnValueOnce({ confirmed: true });
    });
    it('initializes enterpriseUser', () => {
      useIsEnterpriseUser();
      state.expectInitializedWith(state.keys.enterpriseUser, {
        isEnterpriseUser: false,
        isLoading: true,
      });
    });
    it('get isEnterpriseUser false if useHasAvailableDashboards return false', () => {
      useHasAvailableDashboards.mockReturnValueOnce(false);

      state.mockVal(state.keys.enterpriseUser, {
        isEnterpriseUser: false,
        isLoading: false,
      });

      const enterpriseUser = useIsEnterpriseUser();
      const [cb] = React.useEffect.mock.calls[0];
      cb();

      expect(enterpriseUser.isEnterpriseUser).toEqual(false);
      expect(enterpriseUser.isLoading).toEqual(false);
    });
    it('get isEnterpriseUser true if useHasAvailableDashboards return true', () => {
      useHasAvailableDashboards.mockReturnValueOnce(true);

      state.mockVal(state.keys.enterpriseUser, {
        isEnterpriseUser: true,
        isLoading: false,
      });

      const enterpriseUser = useIsEnterpriseUser();
      const [cb] = React.useEffect.mock.calls[0];
      cb();

      expect(enterpriseUser.isEnterpriseUser).toEqual(true);
      expect(enterpriseUser.isLoading).toEqual(false);
    });
  });
});

describe('Painted door experiments context', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('PaintedDoorExperimentProvider', () => {
    const { PaintedDoorExperimentProvider } = experiment;

    const TestComponent = () => {
      const {
        experimentVariation,
        isPaintedDoorNavbarBtnVariation,
        isPaintedDoorWidgetBtnVariation,
        isPaintedDoorControlVariation,
        experimentLoading,
      } = experiment.usePaintedDoorExperimentContext();

      expect(experimentVariation).toEqual('');
      expect(isPaintedDoorNavbarBtnVariation).toBe(false);
      expect(isPaintedDoorWidgetBtnVariation).toBe(false);
      expect(isPaintedDoorControlVariation).toBe(false);
      expect(experimentLoading).toBe(true);

      return (
        <div />
      );
    };

    it('test experiment gets activated for non enterprise users', () => {
      state.mock();
      jest.useFakeTimers();
      useRequestIsPending.mockReturnValueOnce(false);
      useHasAvailableDashboards.mockReturnValueOnce(false);
      useEmailConfirmationData.mockReturnValueOnce({ confirmed: true });

      state.mockVal(state.keys.enterpriseUser, {
        isEnterpriseUser: false,
        isLoading: false,
      });

      mount(
        <PaintedDoorExperimentProvider>
          <TestComponent />
        </PaintedDoorExperimentProvider>,
      );
      const [cb] = React.useEffect.mock.calls[1];
      cb();
      jest.advanceTimersByTime(500);

      expect(trackPaintedDoorVariationGroup).toHaveBeenCalledTimes(1);
    });

    it('test experiment does not get activated for enterprise users', () => {
      state.mock();
      jest.useFakeTimers();
      useRequestIsPending.mockReturnValueOnce(false);
      useHasAvailableDashboards.mockReturnValueOnce(true);
      useEmailConfirmationData.mockReturnValueOnce({ confirmed: true });

      state.mockVal(state.keys.enterpriseUser, {
        isEnterpriseUser: true,
        isLoading: false,
      });

      mount(
        <PaintedDoorExperimentProvider>
          <TestComponent />
        </PaintedDoorExperimentProvider>,
      );
      const [cb] = React.useEffect.mock.calls[1];
      cb();
      jest.advanceTimersByTime(500);

      expect(trackPaintedDoorVariationGroup).toHaveBeenCalledTimes(0);
    });
  });
});
