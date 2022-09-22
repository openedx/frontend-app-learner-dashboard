import { shallow } from 'enzyme';

import CourseCardMenu from '.';
import useCourseCardMenuData from './hooks';

jest.mock('./hooks', () => jest.fn());

describe('CourseCardMenu', () => {
  const props = {
    cardId: 'test-card-id',
  };
  const defaultEmailSettingsModal = {
    isVisible: false,
    show: jest.fn().mockName('emailSettingShow'),
    hide: jest.fn().mockName('emailSettingHide'),
  };
  const defaultUnenrollModal = {
    isVisible: false,
    show: jest.fn().mockName('unenrollShow'),
    hide: jest.fn().mockName('unenrollHide'),
  };
  
  it('snapshot', () => {
    useCourseCardMenuData.mockReturnValue({
      emailSettingsModal: defaultEmailSettingsModal,
      unenrollModal: defaultUnenrollModal,
    });
    const wrapper = shallow(<CourseCardMenu {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});