import { createEventTracker } from 'data/services/segment/utils';
import { eventNames, categories } from '../constants';
import * as trackers from './filter';

jest.mock('data/services/segment/utils', () => ({
  createEventTracker: jest.fn(() => () => {}),
}));

const filters = ['test-filter-2', 'test-filter-1'];

describe('filter trackers', () => {
  afterEach(() => createEventTracker.mockClear());
  test('filter clicked event', () => {
    trackers.filterClicked();
    expect(createEventTracker).toHaveBeenCalledWith(eventNames.filterClicked, {
      category: categories.filter,
    });
  });

  describe('filter option selected event', () => {
    test('with filter', () => {
      trackers.filterOptionSelected(filters);
      expect(createEventTracker).toHaveBeenCalledWith(
        eventNames.filterOptionSelected,
        {
          category: categories.filter,
          filters: [filters[1], filters[0]],
        },
      );
      // make sure filter isn't using the original array
      expect(createEventTracker.mock.calls[0][1].filters).not.toBe(filters);
    });

    test('without filter', () => {
      trackers.filterOptionSelected();
      expect(createEventTracker).toHaveBeenCalledWith(
        eventNames.filterOptionSelected,
        {
          category: categories.filter,
          filters: [],
        },
      );
    });
  });
});
