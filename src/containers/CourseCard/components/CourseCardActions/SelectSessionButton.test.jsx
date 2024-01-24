import { shallow } from '@edx/react-unit-test-utils';

import { reduxHooks } from 'hooks';
import useActionDisabledState from '../hooks';

import SelectSessionButton from './SelectSessionButton';

jest.mock('hooks', () => ({
  reduxHooks: {
    useUpdateSelectSessionModalCallback: () => jest.fn().mockName('mockOpenSessionModal'),
  },
}));
jest.mock('../hooks', () => jest.fn(() => ({ disableSelectSession: false })));
jest.mock('./ActionButton', () => 'ActionButton');

let wrapper;

describe('SelectSessionButton', () => {
  const props = { cardId: 'cardId' };
  it('default render', () => {
    wrapper = shallow(<SelectSessionButton {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.props.disabled).toEqual(false);
    expect(wrapper.instance.props.onClick.getMockName()).toEqual(
      reduxHooks.useUpdateSelectSessionModalCallback().getMockName(),
    );
  });
  test('disabled states', () => {
    useActionDisabledState.mockReturnValueOnce({ disableSelectSession: true });
    wrapper = shallow(<SelectSessionButton {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.props.disabled).toEqual(true);
  });
});
