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

jest.mock('@edx/frontend-platform/react', () => ({
  ...jest.requireActual('@edx/frontend-platform/react'),
  ErrorPage: () => 'ErrorPage',
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((cb, prereqs) => ({ useEffect: { cb, prereqs } })),
  useContext: jest.fn(context => context),
  useRef: jest.fn((val) => ({ current: val, useRef: true })),
  useCallback: jest.fn((cb, prereqs) => ({ useCallback: { cb, prereqs } })),
}));

jest.mock('@edx/frontend-platform/i18n', () => {
  const { formatMessage: fn } = jest.requireActual('testUtils');
  return {
    ...jest.requireActual('@edx/frontend-platform/i18n'),
    useIntl: () => ({
      formatMessage: fn,
    }),
  };
});

jest.mock('@openedx/paragon', () => ({
  ...jest.requireActual('@openedx/paragon'),
  useWindowSize: jest.fn(),
  breakpoints: {
    extraSmall: {
      minWidth: 0,
      maxWidth: 575,
    },
    small: {
      minWidth: 576,
      maxWidth: 767,
    },
    medium: {
      minWidth: 768,
      maxWidth: 991,
    },
    large: {
      minWidth: 992,
      maxWidth: 1199,
    },
    extraLarge: {
      minWidth: 1200,
      maxWidth: 100000,
    },
  },
  useToggle: jest.fn().mockImplementation((val) => [
    val,
    jest.fn().mockName('useToggle.setTrue'),
    jest.fn().mockName('useToggle.setFalse'),
  ]),
}));