import { render, screen } from '@testing-library/react';

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

  it('has change session button on entitlement course', () => {
    const wrapper = createWrapper();
    const sessionButton = screen.getByRole('button', { name: defaultHooks.changeOrLeaveSessionMessage });
    expect(sessionButton).toBeInTheDocument();

    const accessMessage = screen.getByText((text) => text.includes(defaultHooks.accessMessage));
    expect(accessMessage).toBeInTheDocument();
    // it has 3 separator, 4 column
    expect(fetchSeparators(wrapper)).toBe(3);
  });

  it('has change session button on entitlement course but no access message', () => {
    const wrapper = createWrapper({ accessMessage: null });
    const sessionButton = screen.getByRole('button', { name: defaultHooks.changeOrLeaveSessionMessage });
    expect(sessionButton).toBeInTheDocument();

    const accessMessage = screen.queryByText((text) => text.includes(defaultHooks.accessMessage));
    expect(accessMessage).toBeNull();

    // it has 2 separator, 3 column
    expect(fetchSeparators(wrapper)).toBe(2);
  });

  it('does not have change session button on regular course', () => {
    const wrapper = createWrapper({ isEntitlement: false });
    const sessionButton = screen.queryByRole('button', { name: defaultHooks.changeOrLeaveSessionMessage });
    expect(sessionButton).toBeNull();

    const accessMessage = screen.getByText((text) => text.includes(defaultHooks.accessMessage));
    expect(accessMessage).toBeInTheDocument();
    // it has 2 separator, 3 column
    expect(fetchSeparators(wrapper)).toBe(2);
  });
});
