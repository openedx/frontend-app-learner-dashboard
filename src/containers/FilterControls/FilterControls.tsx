import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
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

// @ts-ignore
import './index.scss';
import { TypeForm } from './components/TypeForm';
import { FilterType } from 'data/context/FiltersProvider';

export const FilterControls = ({ filterTypes }: { filterTypes: FilterType[] }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [targetRef, setTargetRef] = React.useState(null);
  const { formatMessage } = useIntl();
  const { data } = useInitializeLearnerHome();
  const hasCourses = React.useMemo(() => data?.courses?.length > 0, [data]);
  const hasPathways = React.useMemo(() => data?.pathway?.length > 0, [data]);
  const hasData = hasCourses || (getConfig().ENABLE_PATHWAY_PILOT_UI && hasPathways);
  const {
    filters,
    sortBy,
    types,
    setSortBy,
    addFilter,
    removeFilter,
    addType,
    removeType,
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

  const handleTypeChange = ({ target: { checked, value } }) => {
    const type = filterTypes.find(filterType => filterType.id === value);
    if (type) {
      if (checked) {
        addType(type);
      } else {
        removeType(type.id);
      }
    }
  };

  const handleFilterChange = ({ target: { checked, value } }) => {
    const update = checked ? addFilter : removeFilter;
    update(value);
  };
  const { width } = useWindowSize();
  // @ts-ignore
  const isMobile = width < breakpoints.small.minWidth;

  return (
    <div id="filter-controls">
      <Button
        // @ts-ignore
        ref={setTargetRef}
        variant="outline-primary"
        iconBefore={Tune}
        onClick={openFiltersOptions}
        disabled={!hasData}
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
              {getConfig().ENABLE_PATHWAY_PILOT_UI && (
                <div className="filter-form-row">
                  <TypeForm
                    types={filterTypes}
                    selectedTypes={types}
                    handleTypeChange={handleTypeChange}
                  />
                </div>
              )}
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
                id="filter-controls-card"
                className="bg-white p-3 rounded shadow d-flex flex-row"
              >
                {getConfig().ENABLE_PATHWAY_PILOT_UI && (
                  <>
                    <div className="filter-form-col">
                      <TypeForm
                        types={filterTypes}
                        selectedTypes={types}
                        handleTypeChange={handleTypeChange}
                      />
                    </div>
                    <hr className="h-100 bg-primary-200 mx-3 my-0" />
                  </>
                )}
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

export default FilterControls;
