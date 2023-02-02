/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

export const iconMap = {
  XSeries: 'xseries-icon',
  MicroMasters: 'micromasters-icon',
  MicroBachelors: 'microbachelors-icon',
};

export const ProgramsList = ({ programs, isCollapse }) => programs.map((program) => (
  <span key={program.programUrl} className={isCollapse ? 'd-inline' : 'row'}>
    <span className="col text-ellipsis w-0 px-1">
      <span
        className={`pgn__icon pgn__icon__inline d-inline-block mr-2 ${
          iconMap[program.programType] || ''
        }`}
      />
      <a href={program.programUrl}>{program.title}</a>
      {isCollapse && <span className="ml-2">•</span>}
    </span>
  </span>
));

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
    }).isRequired,
  ),
  isCollapse: PropTypes.bool,
};

export default ProgramsList;
