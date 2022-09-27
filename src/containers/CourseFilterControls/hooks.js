import React from 'react';
import { useToggle } from '@edx/paragon';

import { StrictDict } from 'utils';

import * as module from './hooks';

export const state = StrictDict({
  target: (val) => React.useState(val), // eslint-disable-line
});

export const useCourseFilterControlsData = ({
  setFilters,
  setSortBy,
}) => {
  const [isOpen, open, close] = useToggle(false);
  const [target, setTarget] = module.state.target(null);
  const handleFilterChange = ({ target: { checked, value } }) => {
    const update = checked ? setFilters.add : setFilters.remove;
    update(value);
  };
  const handleSortChange = ({ target: { value } }) => {
    setSortBy(value);
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
