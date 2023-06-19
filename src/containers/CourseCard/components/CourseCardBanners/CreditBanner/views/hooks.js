import React from 'react';

import { StrictDict } from 'utils';
import { apiHooks } from 'hooks';

import * as module from './hooks';

export const state = StrictDict({
  creditRequestData: (val) => React.useState(val), // eslint-disable-line
});

export const useCreditRequestData = (cardId) => {
  const [requestData, setRequestData] = module.state.creditRequestData(null);
  const createCreditApiRequest = apiHooks.useCreateCreditRequest(cardId);
  const createCreditRequest = (e) => {
    e.preventDefault();
    createCreditApiRequest()
      .then((request) => {
        setRequestData(request.data);
      });
  };
  return { requestData, createCreditRequest };
};

export default {
  useCreditRequestData,
};
