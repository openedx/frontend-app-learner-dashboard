import { render, screen, waitFor } from '@testing-library/react';
import { formatMessage } from 'testUtils';
import { breakpoints, useWindowSize } from '@openedx/paragon';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { FilterKeys, SortKeys } from 'data/constants/app';
import { useInitializeLearnerHome } from 'data/react-query/apiHooks';
import { useFilters } from 'data/context/FiltersProvider';

import userEvent from '@testing-library/user-event';
import messages from './messages';
import CourseFilterControls from './CourseFilterControls';

jest.mock('data/react-query/apiHooks', () => ({
  useInitializeLearnerHome: jest.fn().mockReturnValue({ data: { courses: [1, 2, 3] } }),
}));

jest.mock('hooks', () => ({
  reduxHooks: { useHasCourses: jest.fn() },
}));

jest.mock('./hooks', () => jest.fn());

jest.mock('@openedx/paragon', () => ({
  ...jest.requireActual('@openedx/paragon'),
  useWindowSize: jest.fn(),
}));

const filters = Object.values(FilterKeys);

jest.mock('data/context/FiltersProvider', () => ({
  useFilters: jest.fn(),
}));

useFilters.mockReturnValue({
  filters,
  removeFilter: jest.fn().mockName('removeFilter'),
  clearFilters: jest.fn().mockName('clearFilters'),
});

describe('CourseFilterControls', () => {
  const props = {
    sortBy: SortKeys.enrolled,
    setSortBy: jest.fn().mockName('setSortBy'),
    filters,
  };

  describe('mobile and open', () => {
    it('should render sheet', async () => {
      const user = userEvent.setup();
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth - 1 });
      render(<IntlProvider locale="en"><CourseFilterControls {...props} /></IntlProvider>);
      const filtersButton = screen.getByRole('button', { name: 'Refine' });
      await user.click(filtersButton);
      await waitFor(() => {
        const sheet = screen.getByRole('presentation', { hidden: true });
        expect(sheet).toBeInTheDocument();
        expect(sheet.parentElement).toHaveClass('sheet-container');
      });
    });
  });
  describe('is not mobile', () => {
    it('should have button disabled', async () => {
      const user = userEvent.setup();
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth });
      render(<IntlProvider locale="en"><CourseFilterControls {...props} /></IntlProvider>);
      const filtersButton = screen.getByRole('button', { name: 'Refine' });
      await user.click(filtersButton);
      await waitFor(() => {
        const filterForm = screen.getByText(messages.courseStatus.defaultMessage);
        const modal = filterForm.closest('div.pgn__modal-popup__tooltip');
        expect(modal).toBeInTheDocument();
      });
    });
  });
  describe('no courses', () => {
    it('should have button disabled', () => {
      useInitializeLearnerHome.mockReturnValue({ data: { courses: [] } });
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth });
      render(<IntlProvider locale="en"><CourseFilterControls {...props} /></IntlProvider>);
      const button = screen.getByRole('button', { name: formatMessage(messages.refine) });
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });
});
