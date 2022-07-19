import React from 'react';
import { shallow } from 'enzyme';
import { Hyperlink } from '@edx/paragon';

import { formatMessage } from 'testUtils';
import { CourseBanner } from './CourseBanner';

import * as hooks from './hooks';
import messages from './messages';

jest.mock('components/Banner', () => 'Banner');

jest.mock('./hooks', () => ({
  useCourseBannerData: jest.fn(),
}));

const courseNumber = 'my-test-course-number';

const courseData = {
  isVerified: false,
  isCourseRunActive: false,
  canUpgrade: false,
  isAuditAccessExpired: false,
  courseWebsite: 'test-course-website',
};

let el;

const render = (overrides) => {
  hooks.useCourseBannerData.mockReturnValueOnce({
    courseData: {
      ...courseData,
      ...overrides,
    },
    formatMessage,
  });
  el = shallow(<CourseBanner courseNumber={courseNumber} />);
};

describe('CourseBanner', () => {
  test('no display if learner is verified', () => {
    render({ isVerified: true });
    expect(el.isEmptyRender()).toEqual(true);
  });
  describe('audit access expired, can upgrade', () => {
    beforeEach(() => {
      render({ isAuditAccessExpired: true, canUpgrade: true });
    });
    test('snapshot: (auditAccessExpired, upgradeToAccess)', () => {
      expect(el).toMatchSnapshot();
    });
    test('messages: (auditAccessExpired, upgradeToAccess)', () => {
      expect(el.text()).toContain(messages.auditAccessExpired.defaultMessage);
      expect(el.text()).toContain(messages.upgradeToAccess.defaultMessage);
    });
  });
  describe('audit access expired, cannot upgrade', () => {
    beforeEach(() => {
      render({ isAuditAccessExpired: true });
    });
    test('snapshot: (auditAccessExpired, findAnotherCourse hyperlink)', () => {
      expect(el).toMatchSnapshot();
    });
    test('messages: (auditAccessExpired, upgradeToAccess)', () => {
      expect(el.text()).toContain(messages.auditAccessExpired.defaultMessage);
      expect(el.find(Hyperlink).text()).toEqual(messages.findAnotherCourse.defaultMessage);
    });
  });
  describe('course run active and cannot upgrade', () => {
    beforeEach(() => {
      render({ isCourseRunActive: true });
    });
    test('snapshot: (upgradseDeadlinePassed, exploreCourseDetails hyperlink)', () => {
      expect(el).toMatchSnapshot();
    });
    test('messages: (upgradseDeadlinePassed, exploreCourseDetails hyperlink)', () => {
      expect(el.text()).toContain(messages.upgradeDeadlinePassed.defaultMessage);
      const link = el.find(Hyperlink);
      expect(link.text()).toEqual(messages.exploreCourseDetails.defaultMessage);
      expect(link.props().destination).toEqual(courseData.courseWebsite);
    });
  });
  test('no display if audit access not expired and (course is not active or can upgrade)', () => {
    render();
    expect(el.isEmptyRender()).toEqual(true);
    render({ isCourseRunActive: true, canUpgrade: true });
    expect(el.isEmptyRender()).toEqual(true);
  });
});
