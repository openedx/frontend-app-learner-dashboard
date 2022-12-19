import React from 'react';
import { StrictDict } from 'utils';
import { AppContext } from '@edx/frontend-platform/react';
import { hooks as appHooks } from 'data/redux';
import api from 'data/services/lms/api';

import * as module from './hooks';

export const state = StrictDict({
  creditRequestData: (val) => React.useState(val), // eslint-disable-line
});

export const useCreditRequestData = (cardId) => {
  const [requestData, setRequestData] = module.state.creditRequestData(null);
  const { courseId } = appHooks.useCardCourseRunData(cardId);
  const { providerId } = appHooks.useCardCreditData(cardId);
  const { authenticatedUser } = React.useContext(AppContext);
  const { username } = authenticatedUser;

  const createCreditRequest = (e) => {
    e.preventDefault();
    api.createCreditRequest({ providerId, courseId, username })
      .then(setRequestData);
  };

  return { requestData, createCreditRequest };
};

export default {
  useCreditRequestData,
};
