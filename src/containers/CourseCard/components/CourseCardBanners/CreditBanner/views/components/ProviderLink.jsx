/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

import { useCourseData } from 'hooks';
import { Hyperlink } from '@openedx/paragon';

export const ProviderLink = ({ cardId }) => {
  const courseData = useCourseData(cardId);
  const credit = courseData?.credit || {};
  return (
    <Hyperlink
      href={credit.providerStatusUrl}
      rel="noopener"
      target="_blank"
    >
      {credit.providerName}
    </Hyperlink>
  );
};
ProviderLink.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default ProviderLink;
