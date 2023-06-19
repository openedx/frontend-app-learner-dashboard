import { shallow } from 'enzyme';

import { reduxHooks } from 'hooks';
import { htmlProps } from 'data/constants/htmlKeys';
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
    expect(wrapper).toMatchSnapshot();
    wrapper = shallow(<SelectSessionButton {...props} />);
    expect(wrapper.prop(htmlProps.disabled)).toEqual(false);
    expect(wrapper.prop(htmlProps.onClick).getMockName()).toEqual(
      reduxHooks.useUpdateSelectSessionModalCallback().getMockName(),
    );
  });
  test('disabled states', () => {
    useActionDisabledState.mockReturnValueOnce({ disableSelectSession: true });
    expect(wrapper).toMatchSnapshot();
    wrapper = shallow(<SelectSessionButton {...props} />);
    expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
  });
});
