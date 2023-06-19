import { shallow } from 'enzyme';
import { Spinner } from '@edx/paragon';

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
    expect(shallow(<LoadingView />)).toMatchSnapshot();
  });
  it('renders spinner component with associated screen reader text', () => {
    const wrapper = shallow(<LoadingView />);
    expect(wrapper.find(Spinner).props().screenReaderText).toEqual(spinnerScreenReaderText);
  });
});
