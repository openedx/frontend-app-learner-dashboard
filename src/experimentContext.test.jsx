import React from 'react';
import { mount } from 'enzyme';
import { waitFor } from '@testing-library/react';
import { useWindowSize } from '@edx/paragon';

import api from 'widgets/ProductRecommendations/api';
import { wait } from 'widgets/ProductRecommendations/utils';
import { MockUseState } from 'testUtils';

import * as experiment from 'experimentContext';

const state = new MockUseState(experiment);

jest.unmock('react');
jest.spyOn(React, 'useEffect').mockImplementation((cb, prereqs) => ({ useEffect: { cb, prereqs } }));

jest.mock('widgets/ProductRecommendations/api', () => ({
  fetchRecommendationsContext: jest.fn(),
}));

describe('experiments context', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('useCountryCode', () => {
    describe('behaviour', () => {
      describe('useEffect call', () => {
        let calls;
        let cb;
        const setCountryCode = jest.fn();
        const successfulFetch = { data: { countryCode: 'ZA' } };

        beforeEach(() => {
          jest.spyOn(experiment, 'useExperimentContext').mockImplementationOnce(() => ({ setCountryCode }));
          experiment.useCountryCode();

          ({ calls } = React.useEffect.mock);
          [[cb]] = calls;
        });

        it('calls useEffect once', () => {
          expect(calls.length).toEqual(1);
        });
        describe('successfull fetch while mounted', () => {
          it('sets the country code', async () => {
            let resolveFn;
            api.fetchRecommendationsContext.mockReturnValueOnce(
              new Promise((resolve) => {
                resolveFn = resolve;
              }),
            );

            cb();
            expect(api.fetchRecommendationsContext).toHaveBeenCalled();
            expect(setCountryCode).not.toHaveBeenCalled();
            resolveFn(successfulFetch);
            await waitFor(() => {
              expect(setCountryCode).toHaveBeenCalledWith(successfulFetch.data.countryCode);
            });
          });
        });
        describe('successfull fetch while unmounted', () => {
          it('does not set the country code', async () => {
            let resolveFn;
            api.fetchRecommendationsContext.mockReturnValueOnce(
              new Promise((resolve) => {
                resolveFn = resolve;
              }),
            );
            const unmount = cb();
            expect(api.fetchRecommendationsContext).toHaveBeenCalled();
            expect(setCountryCode).not.toHaveBeenCalled();
            unmount();
            resolveFn(successfulFetch);
            await wait(10);
            expect(setCountryCode).not.toHaveBeenCalled();
          });
        });
        describe('unsuccessfull fetch while mounted', () => {
          it('sets the country code to an empty string', async () => {
            let rejectFn;
            api.fetchRecommendationsContext.mockReturnValueOnce(
              new Promise((resolve, reject) => {
                rejectFn = reject;
              }),
            );
            cb();
            expect(api.fetchRecommendationsContext).toHaveBeenCalled();
            expect(setCountryCode).not.toHaveBeenCalled();
            rejectFn();
            await waitFor(() => {
              expect(setCountryCode).toHaveBeenCalledWith('');
            });
          });
        });
        describe('unsuccessfull fetch while unmounted', () => {
          it('does not set the country code', async () => {
            let rejectFn;
            api.fetchRecommendationsContext.mockReturnValueOnce(
              new Promise((resolve, reject) => {
                rejectFn = reject;
              }),
            );
            const unmount = cb();
            expect(api.fetchRecommendationsContext).toHaveBeenCalled();
            expect(setCountryCode).not.toHaveBeenCalled();
            unmount();
            rejectFn();
            await wait(10);
            expect(setCountryCode).not.toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe('ExperimentProvider', () => {
    const { ExperimentProvider } = experiment;

    const TestComponent = () => {
      const {
        experiment: exp,
        setExperiment,
        countryCode,
        setCountryCode,
        isMobile,
      } = experiment.useExperimentContext();

      expect(exp.isExperimentActive).toBeFalsy();
      expect(exp.inRecommendationsVariant).toBeTruthy();
      expect(setExperiment).toBeDefined();
      expect(countryCode).toBeNull();
      expect(setCountryCode).toBeDefined();
      expect(isMobile).toBe(false);

      return (
        <div />
      );
    };

    const setUp = () => {
      state.mock();
      useWindowSize.mockImplementationOnce(() => ({ width: 577, height: 943 }));
    };

    it('allows access to child components with the context stateful values', () => {
      experiment.useExperimentContext.mockRestore();

      setUp();
      mount(
        <ExperimentProvider>
          <TestComponent />
        </ExperimentProvider>,
      );

      state.expectInitializedWith(state.keys.countryCode, null);
      state.expectInitializedWith(state.keys.experiment, { isExperimentActive: false, inRecommendationsVariant: true });
    });
  });
});
