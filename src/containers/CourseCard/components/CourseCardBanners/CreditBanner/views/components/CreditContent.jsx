import React from 'react';
import PropTypes from 'prop-types';

import { ActionRow, Button } from '@openedx/paragon';
import CreditRequestForm from './CreditRequestForm';

export const CreditContent = ({ action, message, requestData }) => (
  <>
    <div className="message-copy credit-msg" data-testid="credit-msg">
      {message}
    </div>
    {action && (
      <ActionRow className="mt-4">
        <Button
          as="a"
          disabled={!!action.disabled}
          // make sure href is not undefined. Paragon won't disable the button if href is undefined.
          href={action.href || '#'}
          rel="noopener"
          target="_blank"
          variant="outline-primary"
          className="border-gray-400"
          onClick={action.onClick}
          data-testid="action-row-btn"
        >
          {action.message}
        </Button>
      </ActionRow>
    )}
    <CreditRequestForm requestData={requestData} />
  </>
);
CreditContent.defaultProps = {
  action: null,
  requestData: null,
};
CreditContent.propTypes = {
  action: PropTypes.shape({
    href: PropTypes.string,
    onClick: PropTypes.func,
    message: PropTypes.string,
    disabled: PropTypes.bool,
  }),
  message: PropTypes.node.isRequired,
  requestData: PropTypes.shape({
    url: PropTypes.string,
    parameters: PropTypes.objectOf(PropTypes.string),
  }),
};

export default CreditContent;
