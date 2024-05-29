import { shallow } from '@edx/react-unit-test-utils';
import LearnerDashboardHeader from '.';

jest.mock('containers/MasqueradeBar', () => 'MasqueradeBar');
jest.mock('./ConfirmEmailBanner', () => 'ConfirmEmailBanner');

describe('LearnerDashboardHeader', () => {
  test('render', () => {
    const wrapper = shallow(<LearnerDashboardHeader />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('ConfirmEmailBanner')).toHaveLength(1);
    expect(wrapper.instance.findByType('MasqueradeBar')).toHaveLength(1);
  });
});
