import React from 'react';
import { shallow } from 'enzyme';

import CourseCardDetails from '.';

import hooks from './hooks';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const cardId = 'test-card-id';

describe('CourseCard Details component', () => {
  const defaultHooks = {
    providerName: 'provider-name',
    accessMessage: 'access-message',
    openSessionModal: jest.fn().mockName('useSelectSession.openSessionModal'),
    isEntitlement: true,
    isFulfilled: true,
    canChange: true,
    courseNumber: 'test-course-number',
    changeOrLeaveSessionMessage: 'change-or-leave-session-message',
  };
  const createWrapper = (hookOverrides = {}) => {
    hooks.mockReturnValueOnce({
      ...defaultHooks,
      ...hookOverrides,
    });
    return shallow(<CourseCardDetails cardId={cardId} />);
  };

  test('has change session button on entitlement course', () => {
    const wrapper = createWrapper();
    expect(wrapper).toMatchSnapshot();
    // it has 3 separator, 4 column
    expect(wrapper.text().match(/•/g)).toHaveLength(3);
  });

  test('has change session button on entitlement course but no access message', () => {
    const wrapper = createWrapper({ accessMessage: null });
    expect(wrapper).toMatchSnapshot();
    // it has 2 separator, 3 column
    expect(wrapper.text().match(/•/g)).toHaveLength(2);
  });

  test('does not have change session button on regular course', () => {
    const wrapper = createWrapper({ isEntitlement: false });
    expect(wrapper).toMatchSnapshot();
    // it has 2 separator, 3 column
    expect(wrapper.text().match(/•/g)).toHaveLength(2);
  });
});
