import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ProductCard from './ProductCard';
import ProductCardHeader from './ProductCardHeader';

const ProductCardContainer = ({ courses }) => {
  const courseTypes = [...new Set(courses.map((item) => item.courseType))];

  return (
    <div className="product-card-container d-flex">
      {courses
        && courseTypes.map((type) => (
          <div key={type}>
            <ProductCardHeader courseType={type} />
            <div
              className={classNames({
                'course-subcontainer': type === 'course',
              })}
            >
              {courses
                .filter((course) => course.courseType === type)
                .map((item) => (
                  <ProductCard
                    key={item.uuid}
                    url={`https://www.edx.org/${item.prospectusPath}`}
                    title={item.title}
                    subtitle={item.owners[0].name}
                    headerImage={item.image.src}
                    schoolLogo={item.owners[0].logoImageUrl}
                    courseType={type}
                  />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

ProductCardContainer.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      uuid: PropTypes.string,
      title: PropTypes.string,
      image: PropTypes.shape({
        src: PropTypes.string,
      }),
      prospectusPath: PropTypes.string,
      owners: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          name: PropTypes.string,
          logoImageUrl: PropTypes.string,
        }),
      ),
      activeCourseRun: PropTypes.shape({
        key: PropTypes.string,
        marketingUrl: PropTypes.string,
      }),
      courseType: PropTypes.string,
    }),
  ).isRequired,
};

export default ProductCardContainer;
