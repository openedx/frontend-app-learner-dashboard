import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { courseShape, courseTypeToProductTypeMap } from '../utils';
import { course } from '../constants';
import ProductCard from './ProductCard';
import ProductCardHeader from './ProductCardHeader';

const ProductCardContainer = ({ finalProductList, courseTypes }) => (
  <div className="product-card-container d-flex">
    {finalProductList
      && courseTypes.map((type) => (
        <div key={type}>
          <ProductCardHeader courseType={type} />
          <div
            className={classNames('d-flex', {
              'course-subcontainer': type === course,
            })}
          >
            {finalProductList
              .filter((courseObj) => courseTypeToProductTypeMap[courseObj.courseType] === type)
              .map((item) => (
                <ProductCard
                  key={item.title}
                  url={item.marketingUrl}
                  title={item.title}
                  subtitle={item.owners[0].name}
                  headerImage={item.image.src}
                  courseRunKey={item.courseRunKey}
                  schoolLogo={item.owners[0].logoImageUrl}
                  courseType={type}
                />
              ))}
          </div>
        </div>
      ))}
  </div>
);

ProductCardContainer.propTypes = {
  finalProductList: PropTypes.arrayOf(
    PropTypes.shape(courseShape),
  ).isRequired,
  courseTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductCardContainer;
