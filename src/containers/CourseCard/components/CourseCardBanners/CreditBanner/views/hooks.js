import React from 'react';
import { useAuthenticatedUser } from '@openedx/frontend-base';
import { StrictDict } from '@src/utils';
import { useCourseData } from '@src/hooks';
import { useCreateCreditRequest } from '@src/data/hooks';

import * as module from './hooks';

export const state = StrictDict({
  creditRequestData: (val) => React.useState(val), // eslint-disable-line
});

export const useCreditRequestData = (cardId) => {
  const [requestData, setRequestData] = module.state.creditRequestData(null);
  const courseData = useCourseData(cardId);
  const providerId = courseData?.credit?.providerId;
  const { username } = useAuthenticatedUser();
  const courseId = courseData?.courseRun?.courseId;
  const { mutate: createCreditMutation } = useCreateCreditRequest();

  const createCreditRequest = (e) => {
    e.preventDefault();
    createCreditMutation({ providerId, courseId, username }, {
      onSuccess: (response) => {
        setRequestData(response.data);
      },
    });
  };
  return { requestData, createCreditRequest };
};

export default {
  useCreditRequestData,
};
