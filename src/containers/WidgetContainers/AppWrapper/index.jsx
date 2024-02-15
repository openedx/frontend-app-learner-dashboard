import PropTypes from 'prop-types';

export const AppWrapper = ({
  children,
}) => children;
AppWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default AppWrapper;
