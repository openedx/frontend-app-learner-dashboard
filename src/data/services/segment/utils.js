/* eslint-disable import/prefer-default-export */
import { trackEvent } from '@redux-beacon/segment';
import { trackingCategory as category } from './constants';

export const handleEvent = (name, options = {}) => trackEvent(
  (event = {}) => {
    const { payload } = event;
    const { propsFn, extrasFn } = options;
    return {
      name,
      ...(extrasFn && extrasFn(payload)),
      properties: {
        category,
        ...(propsFn && propsFn(payload)),
      },
    };
  },
);
