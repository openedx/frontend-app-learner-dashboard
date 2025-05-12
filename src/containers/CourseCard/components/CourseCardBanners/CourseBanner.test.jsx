import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';
import { Hyperlink } from '@openedx/paragon';

import { reduxHooks } from 'hooks';
import { formatMessage } from 'testUtils';
import { CourseBanner } from './CourseBanner';

import messages from './messages';

jest.mock('components/Banner', () => 'Banner');
jest.mock('hooks', () => ({
  utilHooks: {
    useFormatDate: () => date => date,
  },
  reduxHooks: {
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
  },
}));

const cardId = 'my-test-course-number';

let el;

const enrollmentData = {
  isVerified: false,
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
  marketingUrl: 'marketing-url',
};

const render = (overrides = {}) => {
  const {
    courseRun = {},
    enrollment = {},
  } = overrides;
  reduxHooks.useCardCourseRunData.mockReturnValueOnce({
    ...courseRunData,
    ...courseRun,
  });
  reduxHooks.useCardEnrollmentData.mockReturnValueOnce({
    ...enrollmentData,
    ...enrollment,
  });
  el = shallow(<CourseBanner cardId={cardId} />);
};

describe('CourseBanner', () => {
  test('initializes data with course number from enrollment, course and course run data', () => {
    render();
    expect(reduxHooks.useCardCourseRunData).toHaveBeenCalledWith(cardId);
    expect(reduxHooks.useCardEnrollmentData).toHaveBeenCalledWith(cardId);
  });
  test('no display if learner is verified', () => {
    render({ enrollment: { isVerified: true } });
    expect(el.isEmptyRender()).toEqual(true);
  });
  describe('audit access expired', () => {
    beforeEach(() => {
      render({ enrollment: { isAuditAccessExpired: true } });
    });
    test('snapshot: (auditAccessExpired, findAnotherCourse hyperlink)', () => {
      expect(el.snapshot).toMatchSnapshot();
    });
    test('messages: auditAccessExpired', () => {
      expect(el.instance.children[0].children[0].el).toContain(messages.auditAccessExpired.defaultMessage);
      expect(el.instance.findByType(Hyperlink)[0].children[0].el).toEqual(messages.findAnotherCourse.defaultMessage);
    });
  });
  describe('unmet prerequisites', () => {
    beforeEach(() => {
      render({ enrollment: { coursewareAccess: { hasUnmetPrerequisites: true } } });
    });
    test('snapshot: unmetPrerequisites', () => {
      expect(el.snapshot).toMatchSnapshot();
    });
    test('messages: prerequisitesNotMet', () => {
      expect(el.instance.children[0].children[0].el).toContain(messages.prerequisitesNotMet.defaultMessage);
    });
  });
  describe('too early', () => {
    describe('no start date', () => {
      beforeEach(() => {
        render({ enrollment: { coursewareAccess: { isTooEarly: true } }, courseRun: { startDate: null } });
      });
      test('snapshot', () => expect(el.snapshot).toMatchSnapshot());
      test('messages', () => expect(el.instance.children).toEqual([]));
    });
    describe('has start date', () => {
      beforeEach(() => {
        render({ enrollment: { coursewareAccess: { isTooEarly: true } } });
      });
      test('snapshot', () => expect(el.snapshot).toMatchSnapshot());

      test('messages: courseHasNotStarted', () => {
        expect(el.instance.children[0].children[0].el).toContain(
          formatMessage(messages.courseHasNotStarted, { startDate: courseRunData.startDate }),
        );
      });
    });
  });
  describe('staff', () => {
    beforeEach(() => {
      render({ enrollment: { coursewareAccess: { isStaff: true } } });
    });
    test('snapshot: isStaff', () => {
      expect(el.snapshot).toMatchSnapshot();
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
    expect(el.snapshot).toMatchSnapshot();
  });
});
