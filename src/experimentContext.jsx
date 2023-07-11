import React from 'react';
import PropTypes from 'prop-types';
import { useWindowSize, breakpoints } from '@edx/paragon';
import { StrictDict } from 'utils';
import api from 'widgets/ProductRecommendations/api';
import * as module from './ExperimentContext';

export const state = StrictDict({
  experiment: (val) => React.useState(val), // eslint-disable-line
  countryCode: (val) => React.useState(val), // eslint-disable-line
});

export const useCountryCode = (setCountryCode) => {
  React.useEffect(() => {
    api
      .fetchRecommendationsContext()
      .then((response) => {
        setCountryCode(response.data.countryCode);
      })
      .catch(() => {
        setCountryCode('');
      });
    /* eslint-disable */
  }, []);
};

export const ExperimentContext = React.createContext();

export const ExperimentProvider = ({ children }) => {
  const [countryCode, setCountryCode] = module.state.countryCode(null);
  const [experiment, setExperiment] = module.state.experiment({
    isExperimentActive: false,
    inRecommendationsVariant: true,
  });

  module.useCountryCode(setCountryCode);
  const { width } = useWindowSize();
  const isMobile = width < breakpoints.small.minWidth;

  const contextValue = React.useMemo(
    () => ({
      experiment,
      countryCode,
      setExperiment,
      setCountryCode,
      isMobile,
    }),
    [experiment, countryCode, setExperiment, setCountryCode, isMobile]
  );

  return (
    <ExperimentContext.Provider value={contextValue}>
      {children}
    </ExperimentContext.Provider>
  );
};

export const useExperimentContext = () => React.useContext(ExperimentContext);

ExperimentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default { useCountryCode, useExperimentContext };
