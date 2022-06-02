import React from 'react';

import shapes from 'data/services/lms/shapes';

import CourseBanner from './components/CourseBanner';
import CertificateBanner from './components/CertificateBanner';
import EntitlementBanner from './components/EntitlementBanner';

export const CourseCardBanners = ({ cardData }) => (
  <>
    <CourseBanner cardData={cardData} />
    <CertificateBanner cardData={cardData} />
    <EntitlementBanner cardData={cardData} />
  </>
);
CourseCardBanners.propTypes = {
  cardData: shapes.courseRunCardData.isRequired,
};

export default CourseCardBanners;
