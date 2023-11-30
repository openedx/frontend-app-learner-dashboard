import React from 'react';
import PropTypes from 'prop-types';
import { StrictDict } from 'utils';
import * as module from './PaintedDoorExperimentContext';
import {
  useEmailConfirmationData,
  useHasAvailableDashboards,
  useRequestIsPending,
} from '../../data/redux/hooks';
import { RequestKeys } from '../../data/constants/requests';
import { trackPaintedDoorVariationGroup } from './track';

export const state = StrictDict({
  enterpriseUser: (val) => React.useState(val), // eslint-disable-line
  experimentData: (val) => React.useState(val), // eslint-disable-line
});

const PAINTED_DOOR_RECOMMENDATIONS_EXP_ID = 25116810832;
const PAINTED_DOOR_RECOMMENDATIONS_PAGE = 'url_targeting_for_van1604_recommendations_painted_door_exp';
const PAINTED_DOOR_RECS_EXP_NAVBAR_BTN_VARIATION = 'btn_navbar';
const PAINTED_DOOR_RECS_EXP_WIDGET_BTN_VARIATION = 'btn_widget';
const PAINTED_DOOR_RECS_EXP_CONTROL_VARIATION = 'control';

export function getPaintedDoorRecommendationsExperimentVariation() {
  try {
    if (window.optimizely && window.optimizely.get('data').experiments[PAINTED_DOOR_RECOMMENDATIONS_EXP_ID]) {
      const selectedVariant = window.optimizely.get('state').getVariationMap()[PAINTED_DOOR_RECOMMENDATIONS_EXP_ID];
      return selectedVariant?.name;
    }
  } catch (e) { /* empty */ }
  return '';
}

export function activatePaintedDoorRecommendationsExperiment() {
  window.optimizely = window.optimizely || [];
  window.optimizely.push({
    type: 'page',
    pageName: PAINTED_DOOR_RECOMMENDATIONS_PAGE,
  });
}

export const useIsEnterpriseUser = () => {
  const [enterpriseUser, setEnterpriseUser] = module.state.enterpriseUser({
    isEnterpriseUser: false,
    isLoading: true,
  });

  const initIsPending = useRequestIsPending(RequestKeys.initialize);
  const hasAvailableDashboards = useHasAvailableDashboards();
  const confirmationData = useEmailConfirmationData();

  React.useEffect(() => {
    if (!initIsPending && Object.keys(confirmationData).length && hasAvailableDashboards) {
      setEnterpriseUser(prev => ({
        ...prev,
        isEnterpriseUser: true,
        isLoading: false,
      }));
    } else if (!initIsPending && Object.keys(confirmationData).length && !hasAvailableDashboards) {
      setEnterpriseUser(prev => ({
        ...prev,
        isEnterpriseUser: false,
        isLoading: false,
      }));
    }
  }, [initIsPending]); // eslint-disable-line react-hooks/exhaustive-deps

  return enterpriseUser;
};

export const PaintedDoorExperimentContext = React.createContext({
  experimentVariation: null,
  isPaintedDoorNavbarBtnVariation: null,
  isPaintedDoorWidgetBtnVariation: null,
  isPaintedDoorControlVariation: null,
  experimentLoading: null,
});

export const PaintedDoorExperimentProvider = ({ children }) => {
  const [experimentData, setExperimentData] = module.state.experimentData({
    experimentVariation: '',
    isPaintedDoorNavbarBtnVariation: false,
    isPaintedDoorWidgetBtnVariation: false,
    isPaintedDoorControlVariation: false,
    experimentLoading: true,
  });
  const enterpriseUser = useIsEnterpriseUser();

  const contextValue = React.useMemo(
    () => ({
      ...experimentData,
    }),
    [experimentData],
  );

  React.useEffect(() => {
    let timer = null;
    if (!enterpriseUser.isLoading && !enterpriseUser.isEnterpriseUser) {
      activatePaintedDoorRecommendationsExperiment();
      timer = setTimeout(() => {
        const variation = getPaintedDoorRecommendationsExperimentVariation();
        setExperimentData(prev => ({
          ...prev,
          experimentVariation: variation,
          isPaintedDoorNavbarBtnVariation: variation === PAINTED_DOOR_RECS_EXP_NAVBAR_BTN_VARIATION,
          isPaintedDoorWidgetBtnVariation: variation === PAINTED_DOOR_RECS_EXP_WIDGET_BTN_VARIATION,
          isPaintedDoorControlVariation: variation === PAINTED_DOOR_RECS_EXP_CONTROL_VARIATION,
          experimentLoading: false,
        }));
        trackPaintedDoorVariationGroup(variation);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [enterpriseUser]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PaintedDoorExperimentContext.Provider value={contextValue}>
      {children}
    </PaintedDoorExperimentContext.Provider>
  );
};

export const usePaintedDoorExperimentContext = () => React.useContext(PaintedDoorExperimentContext);

PaintedDoorExperimentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PaintedDoorExperimentProvider;
