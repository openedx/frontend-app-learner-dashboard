import React from 'react';

import { useToggle } from '@edx/paragon';

export const useCourseFilterControlsData = ({
  setFilters,
  setSortBy,
}) => {
  const [isOpen, open, close] = useToggle(false);
  const [target, setTarget] = React.useState(null);
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
