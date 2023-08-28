/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn((val) => ({ current: val, useRef: true })),
  useCallback: jest.fn((cb, prereqs) => ({ useCallback: { cb, prereqs } })),
  useEffect: jest.fn((cb, prereqs) => ({ useEffect: { cb, prereqs } })),
  useMemo: jest.fn((cb, prereqs) => cb(prereqs)),
  useContext: jest.fn(context => context),
  useState: jest.fn(),
}));

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

jest.mock('moment', () => ({
  __esModule: true,
  default: (date) => ({
    toDate: jest.fn().mockReturnValue(date),
  }),
}));

jest.mock('@edx/frontend-platform/react', () => ({
  ...jest.requireActual('@edx/frontend-platform/react'),
  ErrorPage: () => 'ErrorPage',
}));

jest.mock('@edx/frontend-platform/i18n', () => {
  const i18n = jest.requireActual('@edx/frontend-platform/i18n');
  const PropTypes = jest.requireActual('prop-types');
  const { formatMessage } = jest.requireActual('./testUtils');
  const formatDate = jest.fn(date => new Date(date).toLocaleDateString()).mockName('useIntl.formatDate');
  return {
    ...i18n,
    intlShape: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
    useIntl: () => ({
      formatMessage,
      formatDate,
    }),
    defineMessages: m => m,
    FormattedMessage: () => 'FormattedMessage',
  };
});

jest.mock('@edx/paragon', () => jest.requireActual('testUtils').mockNestedComponents({
  Alert: {
    Heading: 'Alert.Heading',
  },
  AlertModal: 'AlertModal',
  MarketingModal: 'MarketingModal',
  ActionRow: 'ActionRow',
  Badge: 'Badge',
  Button: 'Button',
  Card: {
    Body: 'Card.Body',
    Footer: 'Card.Footer',
    Header: 'Card.Header',
    ImageCap: 'Card.ImageCap',
    Section: 'Card.Section',
  },
  CardGrid: 'CardGrid',
  Chip: 'Chip',
  Col: 'Col',
  Collapsible: {
    Advanced: 'Collapsible.Advanced',
    Body: 'Collapsible.Body',
    Trigger: 'Collapsible.Trigger',
    Visible: 'Collapsible.Visible',
  },
  Container: 'Container',
  DataTable: {
    EmptyTable: 'DataTable.EmptyTable',
    Table: 'DataTable.Table',
    TableControlBar: 'DataTable.TableControlBar',
    TableController: 'DataTable.TableController',
    TableFooter: 'DataTable.TableFooter',
  },
  Dropdown: {
    Item: 'Dropdown.Item',
    Menu: 'Dropdown.Menu',
    Toggle: 'Dropdown.Toggle',
    Header: 'Dropdown.Header',
    Divider: 'Dropdown.Divider',
  },
  Form: {
    Checkbox: 'Form.Checkbox',
    CheckboxSet: 'Form.CheckboxSet',
    Control: {
      Feedback: 'Form.Control.Feedback',
    },
    Group: 'Form.Group',
    Label: 'Form.Label',
    Radio: 'Form.Radio',
    RadioSet: 'Form.RadioSet',
    Switch: 'Form.Switch',
  },
  FormControl: 'FormControl',
  FormControlFeedback: 'FormControlFeedback',
  FormGroup: 'FormGroup',
  FormLabel: 'FormLabel',
  FullscreenModal: 'FullscreenModal',
  Hyperlink: 'Hyperlink',
  Icon: 'Icon',
  IconButton: 'IconButton',
  Image: 'Image',
  MailtoLink: 'MailtoLink',
  ModalDialog: {
    Header: 'ModalDialog.Header',
    Body: 'ModalDialog.Body',
    Hero: 'ModalDialog.Hero',
  },
  ModalPopup: 'ModalPopup',
  ModalCloseButton: 'ModalCloseButton',
  MultiSelectDropdownFilter: 'MultiSelectDropdownFilter',
  OverlayTrigger: 'OverlayTrigger',
  Popover: {
    Content: 'Popover.Content',
  },
  Row: 'Row',
  Sheet: 'Sheet',
  StatefulButton: 'StatefulButton',
  TextFilter: 'TextFilter',
  Truncate: 'Truncate',
  Skeleton: 'Skeleton',
  Spinner: 'Spinner',
  PageBanner: 'PageBanner',
  Pagination: 'Pagination',

  useWindowSize: () => jest.fn(),
  useToggle: () => jest.fn().mockImplementation((val) => [
    val,
    jest.fn().mockName('useToggle.setTrue'),
    jest.fn().mockName('useToggle.setFalse'),
  ]),
  useCheckboxSetValues: () => jest.fn().mockImplementation((values) => ([values, {
    add: jest.fn().mockName('useCheckboxSetValues.add'),
    remove: jest.fn().mockName('useCheckboxSetValues.remove'),
  }])),
  breakpoints: () => ({
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
  }),
}));

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: 'FontAwesomeIcon',
}));
jest.mock('@fortawesome/free-solid-svg-icons', () => ({
  faUserCircle: jest.fn().mockName('fa-user-circle-icon'),
}));

jest.mock('@edx/paragon/icons', () => ({
  ArrowBack: jest.fn().mockName('icons.ArrowBack'),
  ArrowDropDown: jest.fn().mockName('icons.ArrowDropDown'),
  ArrowDropUp: jest.fn().mockName('icons.ArrowDropUp'),
  Book: jest.fn().mockName('icons.Book'),
  Cancel: jest.fn().mockName('icons.Cancel'),
  Close: jest.fn().mockName('icons.Close'),
  CheckCircle: jest.fn().mockName('icons.CheckCircle'),
  ChevronLeft: jest.fn().mockName('icons.ChevronLeft'),
  ChevronRight: jest.fn().mockName('icons.ChevronRight'),
  Highlight: jest.fn().mockName('icons.Highlight'),
  Info: jest.fn().mockName('icons.Info'),
  InfoOutline: jest.fn().mockName('icons.InfoOutline'),
  Launch: jest.fn().mockName('icons.Launch'),
  Locked: jest.fn().mockName('icons.Locked'),
  MoreVert: jest.fn().mockName('icons.MoreVert'),
  Tune: jest.fn().mockName('icons.Tune'),
  PersonSearch: jest.fn().mockName('icons.PersonSearch'),
  Program: jest.fn().mockName('icons.Program'),
  Search: jest.fn().mockName('icons.Search'),
}));

jest.mock('data/constants/app', () => ({
  ...jest.requireActual('data/constants/app'),
  locationId: 'fake-location-id',
}));

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  nullMethod: jest.fn().mockName('utils.nullMethod'),
}));

jest.mock('utils/hooks', () => {
  const formatDate = jest.fn(date => new Date(date).toLocaleDateString())
    .mockName('utils.formatDate');
  return {
    formatDate,
    useFormatDate: () => formatDate,
  };
});
