import { handleEvent } from 'data/services/segment/utils';
import { eventNames } from 'data/services/segment/constants';

export const useTrackUpgradeData = () => {
  const trackUpgradeClick = () => {
    handleEvent(eventNames.upgradeCourse, {
      pageName: 'learner_home',
      linkType: 'button',
      linkCategory: 'green_upgrade',
    });
  };

  return {
    trackUpgradeClick,
  };
};

export default useTrackUpgradeData;
