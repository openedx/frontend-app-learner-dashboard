import { shallow } from 'enzyme';
import LearnerDashboardHeader from '.';

jest.mock('containers/MasqueradeBar', () => 'MasqueradeBar');
jest.mock('./CollapsedHeader', () => 'CollapsedHeader');
jest.mock('./ConfirmEmailBanner', () => 'ConfirmEmailBanner');
jest.mock('./ExpandedHeader', () => 'ExpandedHeader');

describe('LearnerDashboardHeader', () => {
  test('render', () => {
    const wrapper = shallow(<LearnerDashboardHeader />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('ConfirmEmailBanner')).toHaveLength(1);
    expect(wrapper.find('MasqueradeBar')).toHaveLength(1);
    expect(wrapper.find('CollapsedHeader')).toHaveLength(1);
    expect(wrapper.find('ExpandedHeader')).toHaveLength(1);
  });
});
