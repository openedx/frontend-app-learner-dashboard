import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from '../messages';
import { courseShape, courseTypeToProductTypeMap } from '../utils';
import ProductCardContainer from './ProductCardContainer';

const LoadedView = ({ crossProductCourses, openCourses }) => {
  const { formatMessage } = useIntl();
  const includesCrossProductTypes = crossProductCourses.length === 2;

  const finalProductList = useMemo(() => {
    if (includesCrossProductTypes) {
      const openCourseList = openCourses.slice(0, 2);
      return crossProductCourses.concat(openCourseList);
    }
    return openCourses;
  }, [crossProductCourses, openCourses, includesCrossProductTypes]);

  const courseTypes = [...new Set(finalProductList.map((item) => courseTypeToProductTypeMap[item.courseType]))];

  return (
    <Container
      size="lg"
      className="recommendations-container pt-sm-5 pt-4.5 pb-2 pb-sm-4.5"
    >
      <h2>
        {formatMessage(messages.recommendationsHeading)}
      </h2>
      <ProductCardContainer finalProductList={finalProductList} courseTypes={courseTypes} />
    </Container>
  );
};

LoadedView.propTypes = {
  crossProductCourses: PropTypes.arrayOf(
    PropTypes.shape(courseShape),
  ).isRequired,
  openCourses: PropTypes.arrayOf(
    PropTypes.shape(courseShape),
  ).isRequired,
};

export default LoadedView;
