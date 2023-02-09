import React from 'react';
import PropTypes from 'prop-types';

export const ProgramsList = ({ programs }) => (
  <ul className="related-programs-list-container">
    {programs.map((program) => (
      <li key={program.programUrl} className="my-2">
        <a href={program.programUrl}>{program.title}</a>
      </li>
    ))}
  </ul>
);

ProgramsList.propTypes = {
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      // bannerImgSrc: PropTypes.string,
      // logoImgSrc: PropTypes.string,
      // numberOfCourses: PropTypes.number,
      // programType: PropTypes.string,
      programUrl: PropTypes.string,
      // provider: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
};

export default ProgramsList;
