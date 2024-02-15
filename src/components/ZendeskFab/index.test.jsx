import { shallow } from '@edx/react-unit-test-utils';

import ZendeskFab from '.';

jest.mock('react-zendesk', () => 'Zendesk');

describe('ZendeskFab', () => {
  test('snapshot', () => {
    const wrapper = shallow(<ZendeskFab />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
