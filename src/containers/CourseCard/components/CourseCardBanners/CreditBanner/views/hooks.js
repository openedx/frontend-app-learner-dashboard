import React from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { StrictDict } from 'utils';
import { useCourseData } from 'hooks';
import { useCreateCreditRequest } from 'data/hooks';

import * as module from './hooks';

export const state = StrictDict({
  creditRequestData: (val) => React.useState(val), // eslint-disable-line
});

export const useCreditRequestData = (cardId) => {
  const [requestData, setRequestData] = module.state.creditRequestData(null);
  const courseData = useCourseData(cardId);
  const providerId = courseData?.credit?.providerId;
  const { authenticatedUser: { username } } = React.useContext(AppContext);
  const courseId = courseData?.courseRun?.courseId;
  const { mutate: createCreditMutation } = useCreateCreditRequest();

  const createCreditRequest = (e) => {
    e.preventDefault();
    createCreditMutation({ providerId, courseId, username }, {
      onSuccess: (data) => {
        setRequestData(data);
      },
    });
  };
  return { requestData, createCreditRequest };
};

export default {
  useCreditRequestData,
};
