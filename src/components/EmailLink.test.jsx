import { shallow } from 'enzyme';

import EmailLink from './EmailLink';

describe('EmailLink', () => {
  it('renders null when no address is provided', () => {
    const wrapper = shallow(<EmailLink />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.isEmptyRender()).toEqual(true);
  });
  it('renders a MailtoLink when an address is provided', () => {
    const wrapper = shallow(<EmailLink address="test@email.com" />);
    expect(wrapper.find('MailtoLink').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
});
