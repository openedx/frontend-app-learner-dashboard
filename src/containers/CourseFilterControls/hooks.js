import React from 'react';
import { useToggle } from '@openedx/paragon';

import { StrictDict } from 'utils';
import track from 'tracking';
import { reduxHooks } from 'hooks';

import * as module from './hooks';

export const state = StrictDict({
  target: (val) => React.useState(val), // eslint-disable-line
});

export const useCourseFilterControlsData = ({
  filters,
  setFilters,
  setSortBy,
}) => {
  const [isOpen, toggleOpen, toggleClose] = useToggle(false);
  const [target, setTarget] = module.state.target(null);

  const addFilter = reduxHooks.useAddFilter();
  const removeFilter = reduxHooks.useRemoveFilter();

  // TODO: refactor: make sure this still works with the new setFilters function
  const handleFilterChange = ({ target: { checked, value } }) => {
    const update = checked ? addFilter : removeFilter;
    update(value);
  };
  const handleSortChange = ({ target: { value } }) => {
    setSortBy(value);
  };

  const open = () => {
    track.filter.filterClicked();
    toggleOpen();
  };

  const close = () => {
    track.filter.filterOptionSelected(filters);
    toggleClose();
  };

  return {
    isOpen,
    open,
    close,
    target,
    setTarget,
    handleFilterChange,
    handleSortChange,
  };
};

export default useCourseFilterControlsData;
