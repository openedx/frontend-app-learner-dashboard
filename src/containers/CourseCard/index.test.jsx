import React from 'react';
import { shallow } from 'enzyme';

import CourseCard from '.';
import hooks from './hooks';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('./components/RelatedProgramsBadge', () => 'RelatedProgramsBadge');
jest.mock('./components/CourseCardMenu', () => 'CourseCardMenu');
jest.mock('./components/banners', () => ({
  CourseBanner: () => 'CourseBanner',
  CertificateBanner: () => 'CertificateBanner',
  EntitlementBanner: () => 'EntitlementBanner',
}));
jest.mock('./components/CourseCardActions', () => 'CourseCardActions');

const dataProps = {
  title: 'hooks.title',
  bannerUrl: 'hooks.bannerUrl',
  providerName: 'hooks.providerName',
  accessMessagE: 'hooks.accessMessage',
  formatMessage: jest.fn(msg => ({ formatted: msg })),
};

const courseNumber = 'test-course-number';

describe('CourseCard component', () => {
  test('snapshot', () => {
    hooks.mockReturnValueOnce(dataProps);
    expect(shallow(<CourseCard courseNumber={courseNumber} />)).toMatchSnapshot();
    expect(hooks).toHaveBeenCalledWith({ courseNumber });
  });
});
