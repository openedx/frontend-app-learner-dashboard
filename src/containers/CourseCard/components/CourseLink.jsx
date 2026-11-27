import React from 'react';
import PropTypes from 'prop-types';
import { getLinkProps } from '@openedx/frontend-base';

// An anchor to a course page: a react-router link when `href` is a path in this site, so the
// navigation stays in the client, and a plain anchor otherwise.
export const CourseLink = ({ href, ...props }) => {
  const { as: Component = 'a', ...linkProps } = href ? getLinkProps(href) : { href };
  return <Component {...linkProps} {...props} />;
};

CourseLink.propTypes = {
  href: PropTypes.string,
};

CourseLink.defaultProps = {
  href: undefined,
};

export default CourseLink;
