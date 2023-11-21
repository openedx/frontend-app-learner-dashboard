import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import {
  Button,
  Form,
  Icon,
  ModalPopup,
  Sheet,
  breakpoints,
  useWindowSize,
  ModalCloseButton,
} from '@edx/paragon';
import { Close, Tune } from '@edx/paragon/icons';

import { reduxHooks } from 'hooks';

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
  const hasCourses = reduxHooks.useHasCourses();
  const {
    isOpen,
    open,
    close,
    target,
    setTarget,
    handleFilterChange,
    handleSortChange,
  } = useCourseFilterControlsData({
    filters,
    setFilters,
    setSortBy,
  });
  const { width } = useWindowSize();
  const isMobile = width < breakpoints.small.minWidth;

  return (
    <div id="course-filter-controls">
      <Button
        ref={setTarget}
        variant="outline-primary"
        iconBefore={Tune}
        onClick={open}
        disabled={!hasCourses}
      >
        {formatMessage(messages.refine)}
      </Button>
      <Form>
        {isMobile
          ? (
            <Sheet
              className="w-75"
              position="left"
              show={isOpen}
              onClose={close}
            >
              <div className="p-1 mr-3">
                <b>{formatMessage(messages.refine)}</b>
              </div>
              <hr />
              <div className="filter-form-row">
                <FilterForm {...{ filters, handleFilterChange }} />
              </div>
              <div className="filter-form-row text-left m-1">
                <SortForm {...{ sortBy, handleSortChange }} />
              </div>
              <div className="pgn__modal-close-container">
                <ModalCloseButton variant="tertiary" onClick={close}>
                  <Icon src={Close} />
                </ModalCloseButton>
              </div>
            </Sheet>
          ) : (
            <ModalPopup
              positionRef={target}
              isOpen={isOpen}
              onClose={close}
              placement="bottom-end"
            >
              <div
                id="course-filter-controls-card"
                className="bg-white p-3 rounded shadow d-flex flex-row"
              >
                <div className="filter-form-col">
                  <FilterForm {...{ filters, handleFilterChange }} />
                </div>
                <hr className="h-100 bg-primary-200 mx-3 my-0" />
                <div className="filter-form-col text-left m-1">
                  <SortForm {...{ sortBy, handleSortChange }} />
                </div>
              </div>
            </ModalPopup>
          )}
      </Form>
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
