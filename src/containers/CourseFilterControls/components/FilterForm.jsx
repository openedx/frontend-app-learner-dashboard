import React from 'react';
import PropTypes from 'prop-types';

import { FilterKeys } from 'data/constants/app';

import { Form } from '@edx/paragon';

import Checkbox from './Checkbox';

export const filterOrder = [
  FilterKeys.inProgress,
  FilterKeys.notStarted,
  FilterKeys.done,
  FilterKeys.notEnrolled,
  FilterKeys.upgraded,
];

export const FilterForm = ({
  filters,
  handleFilterChange,
}) => (
  <Form.Group>
    <div className="filter-form-heading mb-1">Course Status</div>
    <Form.CheckboxSet
      name="course-status-filters"
      onChange={handleFilterChange}
      value={filters}
    >
      {filterOrder.map(filterKey => (
        <Checkbox filterKey={filterKey} key={filterKey} />
      ))}
    </Form.CheckboxSet>
  </Form.Group>
);
FilterForm.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default FilterForm;
