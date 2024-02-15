import { shallow } from '@edx/react-unit-test-utils';
import { Spinner } from '@openedx/paragon';

import hooks from './hooks';
import LoadingView from './LoadingView';

jest.mock('./hooks', () => ({
  useDashboardMessages: jest.fn(),
}));

const spinnerScreenReaderText = 'test-sr-text';
describe('LoadingView', () => {
  beforeEach(() => {
    hooks.useDashboardMessages.mockReturnValueOnce({ spinnerScreenReaderText });
  });
  test('snapshot', () => {
    expect(shallow(<LoadingView />).snapshot).toMatchSnapshot();
  });
  it('renders spinner component with associated screen reader text', () => {
    const wrapper = shallow(<LoadingView />);
    expect(wrapper.instance.findByType(Spinner)[0].props.screenReaderText).toEqual(spinnerScreenReaderText);
  });
});
