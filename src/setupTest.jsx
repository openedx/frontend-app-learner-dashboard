/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';

jest.mock('reselect', () => ({
  createSelector: jest.fn((preSelectors, cb) => ({ preSelectors, cb })),
}));

// Mock react-redux hooks
// unmock for integration tests
jest.mock('react-redux', () => {
  const dispatch = jest.fn((...args) => ({ dispatch: args })).mockName('react-redux.dispatch');
  return {
    connect: (mapStateToProps, mapDispatchToProps) => (component) => ({
      mapStateToProps,
      mapDispatchToProps,
      component,
    }),
    useDispatch: jest.fn(() => dispatch),
    useSelector: jest.fn((selector) => ({ useSelector: selector })),
  };
});
