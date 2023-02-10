import { shallow } from 'enzyme';
import LearnerDashboardHeaderVariant from '.';

jest.mock('containers/LearnerDashboardHeader/ConfirmEmailBanner', () => 'ConfirmEmailBanner');
jest.mock('containers/MasqueradeBar', () => 'MasqueradeBar');
jest.mock('./CollapsedHeader', () => 'CollapsedHeader');
jest.mock('./ExpandedHeader', () => 'ExpandedHeader');

describe('LearnerDashboardHeaderVariant', () => {
  test('render', () => {
    const wrapper = shallow(<LearnerDashboardHeaderVariant />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('ConfirmEmailBanner')).toHaveLength(1);
    expect(wrapper.find('MasqueradeBar')).toHaveLength(1);
    expect(wrapper.find('CollapsedHeader')).toHaveLength(1);
    expect(wrapper.find('ExpandedHeader')).toHaveLength(1);
  });
});
