import React from 'react';
import { render } from '@testing-library/react';

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
    return render(<CourseCardDetails cardId={cardId} />);
  };

  const fetchSeparators = (wrapper) => {
    const elements = wrapper.container.querySelectorAll('*');
    let separatorsCount = 0;

    elements.forEach((element) => {
      // Use a regular expression to find all occurrences of '•' in the text content
      const separatorMatches = element.textContent.match(/•/g);

      // If matches are found, add the count to the total
      if (separatorMatches) {
        separatorsCount += separatorMatches.length;
      }
    });

    return separatorsCount;
  };

  test('has change session button on entitlement course', () => {
    const wrapper = createWrapper();
    expect(wrapper.container).toMatchSnapshot();
    // it has 3 separator, 4 column
    expect(fetchSeparators(wrapper)).toBe(3);
  });

  test('has change session button on entitlement course but no access message', () => {
    const wrapper = createWrapper({ accessMessage: null });
    expect(wrapper.container).toMatchSnapshot();
    // it has 2 separator, 3 column
    expect(fetchSeparators(wrapper)).toBe(2);
  });

  test('does not have change session button on regular course', () => {
    const wrapper = createWrapper({ isEntitlement: false });
    expect(wrapper.container).toMatchSnapshot();
    // it has 2 separator, 3 column
    expect(fetchSeparators(wrapper)).toBe(2);
  });
});
