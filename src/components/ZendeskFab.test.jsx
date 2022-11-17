import { shallow } from 'enzyme';

import ZendeskFab from './ZendeskFab';

jest.mock('react-zendesk', () => 'Zendesk');

describe('ZendeskFab', () => {
  test('snapshot', () => {
    const wrapper = shallow(<ZendeskFab />);
    expect(wrapper).toMatchSnapshot();
  });
});
