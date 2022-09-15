import React from 'react';
import { shallow } from 'enzyme';
import { Hyperlink } from '@edx/paragon';

import { hooks as appHooks } from 'data/redux';
import { formatMessage } from 'testUtils';
import { CourseBanner } from './CourseBanner';

import messages from './messages';

jest.mock('components/Banner', () => 'Banner');
jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseData: jest.fn(),
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
  },
}));

const cardId = 'my-test-course-number';

let el;

const enrollmentData = {
  isVerified: false,
  canUpgrade: false,
  isAuditAccessExpired: false,
  coursewareAccess: {
    hasUnmetPrerequisites: false,
    isStaff: false,
    isTooEarly: false,
  },
};
const courseRunData = {
  isActive: false,
  startDate: '11/11/3030',
};
const courseData = {
  website: 'test-course-website',
};

const render = (overrides = {}) => {
  const {
    course = {},
    courseRun = {},
    enrollment = {},
  } = overrides;
  appHooks.useCardCourseData.mockReturnValueOnce({
    ...courseData,
    ...course,
  });
  appHooks.useCardCourseRunData.mockReturnValueOnce({
    ...courseRunData,
    ...courseRun,
  });
  appHooks.useCardEnrollmentData.mockReturnValueOnce({
    ...enrollmentData,
    ...enrollment,
  });
  el = shallow(<CourseBanner cardId={cardId} />);
};

describe('CourseBanner', () => {
  it('initializes data with course number from enrollment, course and course run data', () => {
    render();
    expect(appHooks.useCardCourseData).toHaveBeenCalledWith(cardId);
    expect(appHooks.useCardCourseRunData).toHaveBeenCalledWith(cardId);
    expect(appHooks.useCardEnrollmentData).toHaveBeenCalledWith(cardId);
  });
  test('no display if learner is verified', () => {
    render({ enrollment: { isVerified: true } });
    expect(el.isEmptyRender()).toEqual(true);
  });
  describe('audit access expired, can upgrade', () => {
    beforeEach(() => {
      render({ enrollment: { isAuditAccessExpired: true, canUpgrade: true } });
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
      render({ enrollment: { isAuditAccessExpired: true } });
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
      render({ courseRun: { isActive: true } });
    });
    test('snapshot: (upgradseDeadlinePassed, exploreCourseDetails hyperlink)', () => {
      expect(el).toMatchSnapshot();
    });
    test('messages: (upgradseDeadlinePassed, exploreCourseDetails hyperlink)', () => {
      expect(el.text()).toContain(messages.upgradeDeadlinePassed.defaultMessage);
      const link = el.find(Hyperlink);
      expect(link.text()).toEqual(messages.exploreCourseDetails.defaultMessage);
      expect(link.props().destination).toEqual(courseData.website);
    });
  });
  test('no display if audit access not expired and (course is not active or can upgrade)', () => {
    render();
    // isEmptyRender() isn't true because the minimal is <Fragment />
    expect(el.html()).toEqual('');
    render({ enrollment: { canUpgrade: true }, courseRun: { isActive: true } });
    expect(el.html()).toEqual('');
  });
  describe('unmet prerequisites', () => {
    beforeEach(() => {
      render({ enrollment: { coursewareAccess: { hasUnmetPrerequisites: true } } });
    });
    test('snapshot: unmetPrerequisites', () => {
      expect(el).toMatchSnapshot();
    });
    test('messages: prerequisitesNotMet', () => {
      expect(el.text()).toContain(messages.prerequisitesNotMet.defaultMessage);
    });
  });
  describe('too early', () => {
    beforeEach(() => {
      render({ enrollment: { coursewareAccess: { isTooEarly: true } } });
    });
    test('snapshot: tooEarly', () => {
      expect(el).toMatchSnapshot();
    });
    test('messages: courseHasNotStarted', () => {
      expect(el.text()).toContain(formatMessage(messages.courseHasNotStarted, { startDate: courseRunData.startDate }));
    });
  });
  describe('staff', () => {
    beforeEach(() => {
      render({ enrollment: { coursewareAccess: { isStaff: true } } });
    });
    test('snapshot: isStaff', () => {
      expect(el).toMatchSnapshot();
    });
    test('messages: staffAccessOnly', () => {
      expect(el.text()).toContain(messages.staffAccessOnly.defaultMessage);
    });
  });
  test('snapshot: stacking banners', () => {
    render({
      enrollment: {
        coursewareAccess: {
          isStaff: true,
          isTooEarly: true,
          hasUnmetPrerequisites: true,
        },
      },
    });
    expect(el).toMatchSnapshot();
  });
});
