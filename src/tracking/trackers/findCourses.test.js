import { createLinkTracker, createEventTracker } from 'data/services/segment/utils';
import { findCoursesClicked } from './findCourses';
import { categories, eventNames } from '../constants';

jest.mock('data/services/segment/utils', () => ({
  createEventTracker: jest.fn((args) => ({ createEventTracker: args })),
  createLinkTracker: jest.fn((args) => ({ createLinkTracker: args })),
}));

describe('find courses trackers', () => {
  const url = 'http://example.com';
  const defaultProps = {
    pageName: 'learner_home',
    linkType: 'button',
    linkCategory: categories.searchButton,
  };
  beforeEach(() => {
    createEventTracker.mockClear();
    createLinkTracker.mockClear();
  });
  test('no args', () => {
    findCoursesClicked(url);
    expect(createEventTracker).toHaveBeenCalledWith(eventNames.findCoursesClicked, defaultProps);
    expect(createLinkTracker).toHaveBeenCalledWith(
      createEventTracker(eventNames.findCoursesClicked, defaultProps),
      url,
    );
  });

  test('with args', () => {
    const args = { linkName: 'foo' };
    findCoursesClicked(url, args);
    expect(createEventTracker).toHaveBeenCalledWith(eventNames.findCoursesClicked, {
      ...defaultProps,
      ...args,
    });
    expect(createLinkTracker).toHaveBeenCalledWith(
      createEventTracker(eventNames.findCoursesClicked, {
        ...defaultProps,
        ...args,
      }),
      url,
    );
  });
});
