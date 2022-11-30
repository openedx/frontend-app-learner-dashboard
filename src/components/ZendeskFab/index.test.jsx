import { shallow } from 'enzyme';

import ZendeskFab from '.';

jest.mock('react-zendesk', () => 'Zendesk');

describe('ZendeskFab', () => {
  test('snapshot', () => {
    const wrapper = shallow(<ZendeskFab />);
    expect(wrapper).toMatchSnapshot();
  });
});
