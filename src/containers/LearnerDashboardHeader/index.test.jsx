import { shallow } from '@edx/react-unit-test-utils';
import Header from '@edx/frontend-component-header';

import LearnerDashboardHeader from '.';

jest.mock('containers/MasqueradeBar', () => 'MasqueradeBar');
jest.mock('./ConfirmEmailBanner', () => 'ConfirmEmailBanner');
jest.mock('@edx/frontend-component-header', () => 'Header');

describe('LearnerDashboardHeader', () => {
  test('render', () => {
    const wrapper = shallow(<LearnerDashboardHeader />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('ConfirmEmailBanner')).toHaveLength(1);
    expect(wrapper.instance.findByType('MasqueradeBar')).toHaveLength(1);
    expect(wrapper.instance.findByType(Header)).toHaveLength(1);
  });
});
