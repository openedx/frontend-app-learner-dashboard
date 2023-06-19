import { useSelector, useDispatch } from 'react-redux';

import * as redux from 'data/redux';
import * as module from './requests';

const selectors = redux.selectors.requests;
const actions = redux.actions.requests;

export const useMasqueradeData = () => useSelector(selectors.masquerade);

export const statusSelector = selector => (requestName) => useSelector(selector(requestName));
export const useRequestIsPending = module.statusSelector(selectors.isPending);
export const useRequestIsFailed = module.statusSelector(selectors.isFailed);
export const useRequestIsCompleted = module.statusSelector(selectors.isCompleted);
export const useRequestIsInactive = module.statusSelector(selectors.isInactive);
export const useRequestError = module.statusSelector(selectors.error);
export const useRequestErrorCode = module.statusSelector(selectors.errorCode);
export const useRequestErrorStatus = module.statusSelector(selectors.errorStatus);
export const useRequestData = module.statusSelector(selectors.data);

export const useMakeNetworkRequest = () => {
  const dispatch = useDispatch();
  return ({
    requestKey,
    promise,
    onSuccess,
    onFailure,
  }) => {
    dispatch(actions.startRequest({ requestKey }));
    return promise.then((response) => {
      if (onSuccess) { onSuccess(response); }
      dispatch(actions.completeRequest({ requestKey, response }));
    }).catch((error) => {
      if (onFailure) { onFailure(error); }
      dispatch(actions.failRequest({ requestKey, error }));
    });
  };
};

export const useClearRequest = () => {
  const dispatch = useDispatch();
  return (requestKey) => {
    dispatch(actions.clearRequest({ requestKey }));
  };
};
