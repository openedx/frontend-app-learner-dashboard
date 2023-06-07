import PropTypes from 'prop-types';

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
  course: 'Course',
  'verified-audit': 'Course',
  verified: 'Course',
  audit: 'Course',
  'credit-verified-audit': 'Course',
  'spoc-verified-audit': 'Course',
  professional: 'Professional Certificate',
  'bootcamp-2u': 'Boot Camp',
  'executive-education-2u': 'Executive Education',
  'executive-education': 'Executive Education',
  masters: "Master's",
  'masters-verified-audit': "Master's",
};

export const wait = (time) => new Promise((resolve) => {
  setTimeout(resolve, time);
});
