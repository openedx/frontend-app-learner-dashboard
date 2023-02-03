/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

export const iconMap = {
  XSeries: 'xseries-icon',
  MicroMasters: 'micromasters-icon',
  MicroBachelors: 'microbachelors-icon',
};

export const ProgramsList = ({ programs }) => (
  <ul className="related-programs-list-container">
    {programs.map((program) => (
      <li key={program.programUrl} className="d-flex">
        <span className="pr-2 border-right">
          <span
            className={`pgn__icon pgn__icon__inline d-inline-block mr-2 ${
              iconMap[program.programType] || ''
            }`}
          />
          <a href={program.programUrl}>{program.title}</a>
        </span>
        <span className="flex-grow-1" />
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
      programType: PropTypes.string,
      programUrl: PropTypes.string,
      // provider: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
};

export default ProgramsList;
