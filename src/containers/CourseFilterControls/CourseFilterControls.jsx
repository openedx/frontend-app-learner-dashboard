import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import {
  Form,
  Button,
  ModalPopup,
} from '@edx/paragon';
import { Tune } from '@edx/paragon/icons';

import FilterForm from './components/FilterForm';
import SortForm from './components/SortForm';
import useCourseFilterControlsData from './hooks';
import messages from './messages';

import './index.scss';

export const CourseFilterControls = ({
  sortBy,
  setSortBy,
  filters,
  setFilters,
}) => {
  const { formatMessage } = useIntl();
  const {
    isOpen,
    open,
    close,
    target,
    setTarget,
    handleFilterChange,
    handleSortChange,
  } = useCourseFilterControlsData({
    setFilters,
    setSortBy,
  });
  return (
    <div id="course-filter-controls">
      <Button
        ref={setTarget}
        variant="outline-primary"
        iconBefore={Tune}
        onClick={open}
      >
        {formatMessage(messages.refine)}
      </Button>
      <ModalPopup
        positionRef={target}
        isOpen={isOpen}
        onClose={close}
        placement="bottom-end"
      >
        <Form>
          <div
            id="course-filter-controls-card"
            className="bg-white p-3 rounded shadow d-flex flex-row"
          >
            <div className="filter-form-col">
              <FilterForm {...{ filters, handleFilterChange }} />
            </div>
            <hr className="h-100 bg-primary-200 m-1" />
            <div className="filter-form-col text-left m-1">
              <SortForm {...{ sortBy, handleSortChange }} />
            </div>
          </div>
        </Form>
      </ModalPopup>
    </div>
  );
};
CourseFilterControls.propTypes = {
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFilters: PropTypes.shape({
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }).isRequired,
};

export default CourseFilterControls;
