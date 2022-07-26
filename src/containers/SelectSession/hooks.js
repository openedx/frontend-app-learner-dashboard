import { hooks as appHooks, actions } from 'data/redux';

import { useDispatch } from 'react-redux';

export const useSelectSession = ({ courseNumber }) => {
  const dispatch = useDispatch();
  const {
    showSessionModal,
    showLeaveSessionInSessionModal,
  } = appHooks.useSelectSessionsModalData();

  const { entitlementSessions } = appHooks.useCardEntitlementsData(courseNumber);

  const { title: courseTitle } = appHooks.useCardCourseData(courseNumber);

  const updateSessionModal = (showModal, showLeaveOption = false) => dispatch(
    actions.app.updateSelectSessionModal({
      showSessionModal: showModal,
      showLeaveSessionInSessionModal: showLeaveOption,
      courseNumber,
    }),
  );

  return {
    showSessionModal,
    closeSessionModal: () => updateSessionModal(false),
    openSessionModal: () => updateSessionModal(true),
    openSessionModalWithLeaveOption: () => updateSessionModal(true, true),
    showLeaveSessionInSessionModal,
    entitlementSessions,
    courseTitle,
  };
};

export default useSelectSession;
