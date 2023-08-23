import React from 'react';
import { mount } from 'enzyme';
import { waitFor } from '@testing-library/react';
import { useWindowSize } from '@edx/paragon';

import api from 'widgets/ProductRecommendations/api';
import { MockUseState } from 'testUtils';

import * as experiment from 'ExperimentContext';

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
          experiment.useCountryCode(setCountryCode);

          ({ calls } = React.useEffect.mock);
          [[cb]] = calls;
        });

        it('calls useEffect once', () => {
          expect(calls.length).toEqual(1);
        });
        describe('successfull fetch', () => {
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
        describe('unsuccessfull fetch', () => {
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
      expect(countryCode).toBeNull();
      expect(isMobile).toBe(false);
      expect(setExperiment).toBeDefined();
      expect(setCountryCode).toBeDefined();

      return (
        <div />
      );
    };

    it('allows access to child components with the context stateful values', () => {
      const countryCodeSpy = jest.spyOn(experiment, 'useCountryCode').mockImplementationOnce(() => {});
      useWindowSize.mockImplementationOnce(() => ({ width: 577, height: 943 }));

      state.mock();

      mount(
        <ExperimentProvider>
          <TestComponent />
        </ExperimentProvider>,
      );

      expect(countryCodeSpy).toHaveBeenCalledWith(state.setState.countryCode);
      state.expectInitializedWith(state.keys.countryCode, null);
      state.expectInitializedWith(state.keys.experiment, { isExperimentActive: false, inRecommendationsVariant: true });
    });
  });
});
