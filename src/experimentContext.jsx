import React from 'react';
import PropTypes from 'prop-types';
import { useWindowSize, breakpoints } from '@edx/paragon';
import { StrictDict } from 'utils';
import api from 'widgets/ProductRecommendations/api';
import * as module from './experimentContext';

export const state = StrictDict({
  experiment: (val) => React.useState(val), // eslint-disable-line
  countryCode: (val) => React.useState(val), // eslint-disable-line
});

export const useCountryCode = () => {
  const { setCountryCode } = module.useExperimentContext();

  React.useEffect(() => {
    let isMounted = true;

    api
      .fetchRecommendationsContext()
      .then((response) => {
        if (isMounted) {
          setCountryCode(response.data.countryCode);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCountryCode('');
        }
      });

    return () => {
      isMounted = false;
    };
    /* eslint-disable */
}, []);
};

export const ExperimentContext = React.createContext();

export const ExperimentProvider = ({ children }) => {
  const { width } = useWindowSize();
  const isMobile = width < breakpoints.small.minWidth;

  const [countryCode, setCountryCode] = module.state.countryCode(null);
  const [experiment, setExperiment] = module.state.experiment({
    isExperimentActive: false,
    inRecommendationsVariant: true,
  });

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
