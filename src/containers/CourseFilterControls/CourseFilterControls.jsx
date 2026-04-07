import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import track from 'tracking';
import {
  Button,
  Form,
  Icon,
  ModalPopup,
  Sheet,
  breakpoints,
  useWindowSize,
  ModalCloseButton,
} from '@openedx/paragon';
import { Close, Tune } from '@openedx/paragon/icons';

import { useInitializeLearnerHome } from 'data/hooks';
import { useFilters } from 'data/context';
import FilterForm from './components/FilterForm';
import SortForm from './components/SortForm';
import messages from './messages';

import './index.scss';

export const CourseFilterControls = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [targetRef, setTargetRef] = React.useState(null);
  const { formatMessage } = useIntl();
  const { data } = useInitializeLearnerHome();
  const hasCourses = React.useMemo(() => data?.courses?.length > 0, [data]);
  const {
    filters, sortBy, setSortBy, addFilter, removeFilter,
  } = useFilters();

  const openFiltersOptions = () => {
    track.filter.filterClicked();
    setIsOpen(true);
  };
  const closeFiltersOptions = () => {
    track.filter.filterOptionSelected(filters);
    setIsOpen(false);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterChange = ({ target: { checked, value } }) => {
    const update = checked ? addFilter : removeFilter;
    update(value);
  };
  const { width } = useWindowSize();
  const isMobile = width < breakpoints.small.minWidth;

  return (
    <div id="course-filter-controls">
      <Button
        ref={setTargetRef}
        variant="outline-primary"
        iconBefore={Tune}
        onClick={openFiltersOptions}
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
              onClose={closeFiltersOptions}
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
                <ModalCloseButton variant="tertiary" onClick={closeFiltersOptions}>
                  <Icon src={Close} />
                </ModalCloseButton>
              </div>
            </Sheet>
          ) : (
            <ModalPopup
              positionRef={targetRef}
              isOpen={isOpen}
              onClose={closeFiltersOptions}
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

export default CourseFilterControls;
