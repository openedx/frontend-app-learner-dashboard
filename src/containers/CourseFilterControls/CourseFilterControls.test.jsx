import { render, screen } from '@testing-library/react';
import { formatMessage } from 'testUtils';
import { breakpoints, useWindowSize } from '@openedx/paragon';
import { reduxHooks } from 'hooks';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { FilterKeys, SortKeys } from 'data/constants/app';

import messages from './messages';
import CourseFilterControls from './CourseFilterControls';
import useCourseFilterControlsData from './hooks';

jest.mock('hooks', () => ({
  reduxHooks: { useHasCourses: jest.fn() },
}));

jest.mock('./hooks', () => jest.fn());

jest.mock('@openedx/paragon', () => ({
  ...jest.requireActual('@openedx/paragon'),
  useWindowSize: jest.fn(),
}));

const filters = Object.values(FilterKeys);

const mockControlsData = {
  isOpen: false,
  open: jest.fn().mockName('open'),
  close: jest.fn().mockName('close'),
  target: 'target-test',
  setTarget: jest.fn(),
  handleFilterChange: jest.fn().mockName('handleFilterChange'),
  handleSortChange: jest.fn().mockName('handleSortChange'),
};

describe('CourseFilterControls', () => {
  const props = {
    sortBy: SortKeys.enrolled,
    setSortBy: jest.fn().mockName('setSortBy'),
    filters,
  };

  describe('mobile and open', () => {
    it('should render sheet', () => {
      reduxHooks.useHasCourses.mockReturnValue(true);
      useCourseFilterControlsData.mockReturnValue({ ...mockControlsData, isOpen: true });
      useWindowSize.mockReturnValueOnce({ width: breakpoints.small.minWidth - 1 });
      render(<IntlProvider locale="en"><CourseFilterControls {...props} /></IntlProvider>);
      const sheet = screen.getByRole('presentation', { hidden: true });
      expect(sheet).toBeInTheDocument();
      expect(sheet.parentElement).toHaveClass('sheet-container');
    });
  });
  describe('is not mobile', () => {
    it('should have button disabled', () => {
      reduxHooks.useHasCourses.mockReturnValue(true);
      useCourseFilterControlsData.mockReturnValue({ ...mockControlsData, isOpen: true });
      useWindowSize.mockReturnValueOnce({ width: breakpoints.small.minWidth });
      render(<IntlProvider locale="en"><CourseFilterControls {...props} /></IntlProvider>);
      const filterForm = screen.getByText(messages.courseStatus.defaultMessage);
      const modal = filterForm.closest('div.pgn__modal-popup__tooltip');
      expect(modal).toBeInTheDocument();
    });
  });
  describe('no courses', () => {
    it('should have button disabled', () => {
      reduxHooks.useHasCourses.mockReturnValue(false);
      useCourseFilterControlsData.mockReturnValue(mockControlsData);
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth });
      render(<IntlProvider locale="en"><CourseFilterControls {...props} /></IntlProvider>);
      const button = screen.getByRole('button', { name: formatMessage(messages.refine) });
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });
});
