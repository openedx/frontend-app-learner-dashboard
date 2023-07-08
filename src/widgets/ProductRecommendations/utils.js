import PropTypes from 'prop-types';
import { executiveEducation, course, bootCamp } from './constants';

export const courseShape = {
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
};

export const courseTypeToProductTypeMap = {
  course,
  'verified-audit': course,
  verified: course,
  audit: course,
  'credit-verified-audit': course,
  'spoc-verified-audit': course,
  professional: 'Professional Certificate',
  'bootcamp-2u': bootCamp,
  'executive-education-2u': executiveEducation,
  'executive-education': executiveEducation,
  masters: "Master's",
  'masters-verified-audit': "Master's",
};

export const courseTypeToProductLineMap = {
  [executiveEducation]: 'executive-education',
  [bootCamp]: 'boot-camps',
  [course]: 'open-courses',
};

export const convertCourseRunKeyToCourseKey = (courseRunKey) => {
  const newKeyFormat = courseRunKey.includes('+');
  if (newKeyFormat) {
    const splitCourseRunKey = courseRunKey.split(':').slice(-1)[0];
    const splitCourseKey = splitCourseRunKey.split('+').slice(0, 2);
    return `${splitCourseKey[0]}+${splitCourseKey[1]}`;
  }
  const splitCourseKey = courseRunKey.split('/').slice(0, 2);
  return `${splitCourseKey[0]}+${splitCourseKey[1]}`;
};

export const wait = (time) => new Promise((resolve) => {
  setTimeout(resolve, time);
});
