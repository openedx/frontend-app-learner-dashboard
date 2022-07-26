import React from 'react';
import { shallow } from 'enzyme';

import CourseCardDetails from '.';

import hooks from './hooks';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const courseNumber = 'test-course-number';

describe('CourseCard Details component', () => {
  it('has change session button on entitlement course', () => {
    const mockHook = (args) => () => ({
      providerName: 'provider-name',
      accessMessage: 'access-message',
      openSessionModal: jest.fn().mockName('useSelectSession.openSessionModal'),
      formatMessage: (message, values) => <div {...{ message, values }} />,
      isEntitlement: true,
      isFulfilled: true,
      canChange: true,
      ...args,
    });
    hooks.mockImplementationOnce(mockHook({ isEntitlement: true }));
    const el = shallow(<CourseCardDetails courseNumber={courseNumber} />);
    expect(el).toMatchSnapshot();
    // it has 3 separator, 4 column
    expect(el.text().match(/•/g)).toHaveLength(3);
  });

  it('does not have change session button on regular course', () => {
    const mockHook = (args) => () => ({
      providerName: 'provider-name',
      accessMessage: 'acess-message',
      openSessionModal: jest.fn().mockName('useSelectSession.openSessionModal'),
      formatMessage: (message, values) => <div {...{ message, values }} />,
      isEntitlement: true,
      isFulfilled: true,
      canChange: true,
      ...args,
    });
    hooks.mockImplementationOnce(mockHook({ isEntitlement: false }));
    const el = shallow(<CourseCardDetails courseNumber={courseNumber} />);
    expect(el).toMatchSnapshot();
    // it has 2 separator, 3 column
    expect(el.text().match(/•/g)).toHaveLength(2);
  });
});
