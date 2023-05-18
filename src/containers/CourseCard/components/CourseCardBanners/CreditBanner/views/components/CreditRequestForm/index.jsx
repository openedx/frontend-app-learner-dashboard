import React from 'react';
import PropTypes from 'prop-types';

import { Button, Form, FormControl } from '@edx/paragon';

import useCreditRequestFormData from './hooks';

export const CreditRequestForm = ({ requestData }) => {
  const { ref } = useCreditRequestFormData(requestData);
  if (requestData === null) {
    return null;
  }
  const { parameters, url } = requestData;
  return (
    <Form
      accept-method="UTF-8"
      action={url}
      className="hidden"
      method="POST"
    >
      {Object.keys(parameters).map((key) => (
        <FormControl
          as="textarea"
          key={key}
          name={key}
          value={parameters[key]}
        />
      ))}
      <Button type="submit" ref={ref} />
    </Form>
  );
};
CreditRequestForm.defaultProps = {
  requestData: null,
};
CreditRequestForm.propTypes = {
  requestData: PropTypes.shape({
    parameters: PropTypes.objectOf(PropTypes.string),
    url: PropTypes.string,
  }),
};

export default CreditRequestForm;
