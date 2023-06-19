import React from 'react';
import PropTypes from 'prop-types';

import ProductRecommendations from 'widgets/ProductRecommendations';
import hooks from 'widgets/ProductRecommendations/hooks';

export const WidgetFooter = ({ courseListColumn }) => {
  const { shouldShowFooter, shouldLoadFooter } = hooks.useShowRecommendationsFooter();
  const stetchCourseList = (column) => {
    if (column.current) {
      column.current.classList.replace('col-xl-8', 'col-xl-12');
    }
  };

  if (shouldShowFooter && shouldLoadFooter) {
    stetchCourseList(courseListColumn);

    return (
      <div className="widget-footer">
        <ProductRecommendations />
      </div>
    );
  }

  return null;
};

WidgetFooter.propTypes = {
  courseListColumn: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default WidgetFooter;
