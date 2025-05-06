// import { StrictDict } from '@src/utils';
import {
  ErrorStatuses,
  // RequestKeys,
} from '@src/data/constants/requests';
import { actions } from '@src/data/redux';

export const errorData = (status, data = '') => ({
  response: {
    status,
    data,
  },
});

export const networkErrorData = errorData(ErrorStatuses.badRequest);

export const genTestUtils = ({
  dispatch,
}) => {
  /*
  const mockStart = (requestKey) => () => {
    dispatch(actions.requests.startRequest(requestKey));
  };
  */

  const mockError = (requestKey, status, data) => () => {
    dispatch(actions.requests.failRequest({
      requestKey,
      error: errorData(status, data),
    }));
  };
  const mockNetworkError = (requestKey) => (
    mockError(requestKey, ErrorStatuses.badRequest)
  );
  return {
    mockNetworkError,
  };
};

export default genTestUtils;
