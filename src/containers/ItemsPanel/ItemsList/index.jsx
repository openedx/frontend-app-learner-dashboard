import React from 'react';
import PropTypes from 'prop-types';

import { Pagination } from '@openedx/paragon';
import {
  ActiveCourseFilters,
} from 'containers/FilterControls';
import CourseCard from 'containers/CourseCard';

import { PathwayCard } from 'containers/PathwayCard';
import { useIsCollapsed } from './hooks';

export const ItemsList = ({ itemsListData }) => {
  const {
    setPageNumber, numPages, visibleList, showFilters,
  } = itemsListData;

  const isCollapsed = useIsCollapsed();
  return (
    <>
      {showFilters && (
        <div id="course-list-active-filters-container">
          <ActiveCourseFilters />
        </div>
      )}
      <div className="d-flex flex-column flex-grow-1">
        {visibleList.map(({ cardId, itemType }) => (itemType === 'pathway'
          ? <PathwayCard key={cardId} cardId={cardId} />
          : <CourseCard key={cardId} cardId={cardId} />
        ))}
        {numPages > 1 && (
          <Pagination
            variant={isCollapsed ? 'reduced' : 'secondary'}
            paginationLabel="Course List"
            className="mx-auto mb-2"
            pageCount={numPages}
            onPageSelect={setPageNumber}
          />
        )}
      </div>
    </>
  );
};

export const itemsListDataShape = PropTypes.shape({
  showFilters: PropTypes.bool.isRequired,
  visibleList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  numPages: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
});

ItemsList.propTypes = {
  itemsListData: itemsListDataShape,
};

export default ItemsList;
