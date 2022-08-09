import React from 'react';
import PropTypes from 'prop-types';

import { FilterKeys } from 'data/constants/app';

import { Form } from '@edx/paragon';

import Checkbox from './Checkbox';

export const FilterForm = ({
  filters,
  handleFilterChange,
}) => (
  <Form.Group>
    <div className="filter-form-heading mb-1">Course Status</div>
    <Form.CheckboxSet
      name="course-status-filters"
      onChange={handleFilterChange}
      values={filters}
    >
      <Checkbox {...{ filterKey: FilterKeys.inProgress }} />
      <Checkbox {...{ filterKey: FilterKeys.notStarted }} />
      <Checkbox {...{ filterKey: FilterKeys.done }} />
      <Checkbox {...{ filterKey: FilterKeys.notEnrolled }} />
      <Checkbox {...{ filterKey: FilterKeys.upgraded }} />
    </Form.CheckboxSet>
  </Form.Group>
);
FilterForm.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default FilterForm;
