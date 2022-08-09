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
jest.mock('./components/Banners', () => ({
  CourseBanner: () => 'CourseBanner',
  CertificateBanner: () => 'CertificateBanner',
  EntitlementBanner: () => 'EntitlementBanner',
}));
jest.mock('./components/CourseCardActions', () => 'CourseCardActions');
jest.mock('./components/CourseCardDetails', () => 'CourseCardDetails');

const dataProps = {
  title: 'hooks.title',
  bannerUrl: 'hooks.bannerUrl',
  formatMessage: jest.fn(msg => ({ formatted: msg })),
  isEnrolled: true,
};

const cardId = 'test-card-id';

describe('CourseCard component', () => {
  test('snapshot', () => {
    hooks.mockReturnValueOnce(dataProps);
    expect(shallow(<CourseCard cardId={cardId} />)).toMatchSnapshot();
    expect(hooks).toHaveBeenCalledWith({ cardId });
  });
  test('snapshot: not enrolled (no certificate card)', () => {
    hooks.mockReturnValueOnce({ ...dataProps, isEnrolled: true });
  });
});
