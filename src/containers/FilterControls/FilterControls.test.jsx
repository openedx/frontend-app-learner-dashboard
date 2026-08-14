import { render, screen, waitFor } from '@testing-library/react';
import { formatMessage } from 'testUtils';
import { breakpoints, useWindowSize } from '@openedx/paragon';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import { FilterKeys, SortKeys } from 'data/constants/app';
import { useInitializeLearnerHome } from 'data/hooks';
import { useFilters } from 'data/context';

import userEvent from '@testing-library/user-event';
import messages from './messages';
import FilterControls from './FilterControls';

jest.mock('data/hooks', () => ({
  useInitializeLearnerHome: jest.fn().mockReturnValue({ data: { courses: [1, 2, 3] } }),
}));

jest.mock('@edx/frontend-platform', () => ({
  ...jest.requireActual('@edx/frontend-platform'),
  getConfig: jest.fn(() => ({ ENABLE_PATHWAY_PILOT_UI: false })),
}));

jest.mock('@openedx/paragon', () => ({
  ...jest.requireActual('@openedx/paragon'),
  useWindowSize: jest.fn(),
}));

jest.mock('tracking', () => ({
  filter: {
    filterClicked: jest.fn().mockName('segment.filterClicked'),
    filterOptionSelected: jest.fn().mockName('segment.filterOptionSelected'),
  },
}));

const filters = Object.values(FilterKeys);
const filterTypes = [{ id: 'course', text: 'Course' }, { id: 'pathway', text: 'Pathway' }];

jest.mock('data/context', () => ({
  useFilters: jest.fn(),
}));

const setSortByMock = jest.fn().mockName('setSortBy');
useFilters.mockReturnValue({
  filters,
  types: [],
  removeFilter: jest.fn().mockName('removeFilter'),
  clearFilters: jest.fn().mockName('clearFilters'),
  setSortBy: setSortByMock,
  addFilter: jest.fn().mockName('addFilter'),
  addType: jest.fn().mockName('addType'),
  removeType: jest.fn().mockName('removeType'),
});

describe('FilterControls', () => {
  beforeEach(() => {
    getConfig.mockReturnValue({ ENABLE_PATHWAY_PILOT_UI: false });
  });

  describe('mobile and open', () => {
    it('should render sheet', async () => {
      const user = userEvent.setup();
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth - 1 });
      render(<IntlProvider locale="en"><FilterControls filterTypes={filterTypes} /></IntlProvider>);
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
      render(<IntlProvider locale="en"><FilterControls filterTypes={filterTypes} /></IntlProvider>);
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
      render(<IntlProvider locale="en"><FilterControls filterTypes={filterTypes} /></IntlProvider>);
      const button = screen.getByRole('button', { name: formatMessage(messages.refine) });
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
    it('should have button disabled when pathways exist but pathway pilot UI is disabled', () => {
      getConfig.mockReturnValue({ ENABLE_PATHWAY_PILOT_UI: false });
      useInitializeLearnerHome.mockReturnValue({ data: { courses: [], pathway: [1, 2, 3] } });
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth });
      render(<IntlProvider locale="en"><FilterControls filterTypes={filterTypes} /></IntlProvider>);
      const button = screen.getByRole('button', { name: formatMessage(messages.refine) });
      expect(button).toBeDisabled();
    });
    it('should have button disabled when pathway pilot UI is enabled but there are no pathways', () => {
      getConfig.mockReturnValue({ ENABLE_PATHWAY_PILOT_UI: true });
      useInitializeLearnerHome.mockReturnValue({ data: { courses: [], pathway: [] } });
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth });
      render(<IntlProvider locale="en"><FilterControls filterTypes={filterTypes} /></IntlProvider>);
      const button = screen.getByRole('button', { name: formatMessage(messages.refine) });
      expect(button).toBeDisabled();
    });
    it('should have button enabled when there are no courses but pathways exist and pathway pilot UI is enabled', () => {
      getConfig.mockReturnValue({ ENABLE_PATHWAY_PILOT_UI: true });
      useInitializeLearnerHome.mockReturnValue({ data: { courses: [], pathway: [1, 2, 3] } });
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth });
      render(<IntlProvider locale="en"><FilterControls filterTypes={filterTypes} /></IntlProvider>);
      const button = screen.getByRole('button', { name: formatMessage(messages.refine) });
      expect(button).toBeEnabled();
    });
  });
  describe('with courses', () => {
    it('should have button enabled', () => {
      useInitializeLearnerHome.mockReturnValue({ data: { courses: [1, 2, 3] } });
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth });
      render(<IntlProvider locale="en"><FilterControls filterTypes={filterTypes} /></IntlProvider>);
      const button = screen.getByRole('button', { name: formatMessage(messages.refine) });
      expect(button).toBeInTheDocument();
      expect(button).toBeEnabled();
    });
    it('should call setSortBy on sort change', async () => {
      const user = userEvent.setup();
      useInitializeLearnerHome.mockReturnValue({ data: { courses: [1, 2, 3] } });
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth });
      render(<IntlProvider locale="en"><FilterControls filterTypes={filterTypes} /></IntlProvider>);
      const filtersButton = screen.getByRole('button', { name: 'Refine' });
      await user.click(filtersButton);
      await waitFor(async () => {
        const sortRadio = screen.getByRole('radio', { name: formatMessage(messages.sortTitle) });
        await user.click(sortRadio);
        expect(setSortByMock).toHaveBeenCalledWith(SortKeys.title);
      });
    });
    it('should call addFilter on filter check', async () => {
      const user = userEvent.setup();
      const addFilterMock = jest.fn().mockName('addFilter');
      const removeFilterMock = jest.fn().mockName('removeFilter');
      useFilters.mockReturnValue({
        filters: [],
        types: [],
        removeFilter: removeFilterMock,
        clearFilters: jest.fn().mockName('clearFilters'),
        setSortBy: jest.fn().mockName('setSortBy'),
        addFilter: addFilterMock,
        addType: jest.fn().mockName('addType'),
        removeType: jest.fn().mockName('removeType'),
      });
      useInitializeLearnerHome.mockReturnValue({ data: { courses: [1, 2, 3] } });
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth });
      render(<IntlProvider locale="en"><FilterControls filterTypes={filterTypes} /></IntlProvider>);
      const filtersButton = screen.getByRole('button', { name: 'Refine' });
      await user.click(filtersButton);
      await waitFor(async () => {
        const filterCheckbox = screen.getByText('In-Progress');
        await user.click(filterCheckbox);
        expect(addFilterMock).toHaveBeenCalledWith(FilterKeys.inProgress);
      });
    });
    it('should call removeFilter on filter uncheck', async () => {
      const user = userEvent.setup();
      const addFilterMock = jest.fn().mockName('addFilter');
      const removeFilterMock = jest.fn().mockName('removeFilter');
      useFilters.mockReturnValue({
        filters: [FilterKeys.inProgress],
        types: [],
        removeFilter: removeFilterMock,
        clearFilters: jest.fn().mockName('clearFilters'),
        setSortBy: jest.fn().mockName('setSortBy'),
        addFilter: addFilterMock,
        addType: jest.fn().mockName('addType'),
        removeType: jest.fn().mockName('removeType'),
      });
      useInitializeLearnerHome.mockReturnValue({ data: { courses: [1, 2, 3] } });
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth });
      render(<IntlProvider locale="en"><FilterControls filterTypes={filterTypes} /></IntlProvider>);
      const filtersButton = screen.getByRole('button', { name: 'Refine' });
      await user.click(filtersButton);
      await waitFor(async () => {
        const filterCheckbox = screen.getByText('In-Progress');
        await user.click(filterCheckbox);
        expect(removeFilterMock).toHaveBeenCalledWith(FilterKeys.inProgress);
      });
    });
    it('should call addType on type check', async () => {
      getConfig.mockReturnValue({ ENABLE_PATHWAY_PILOT_UI: true });
      const user = userEvent.setup();
      const addTypeMock = jest.fn().mockName('addType');
      const removeTypeMock = jest.fn().mockName('removeType');
      useFilters.mockReturnValue({
        filters: [],
        types: [],
        removeFilter: jest.fn().mockName('removeFilter'),
        clearFilters: jest.fn().mockName('clearFilters'),
        setSortBy: jest.fn().mockName('setSortBy'),
        addFilter: jest.fn().mockName('addFilter'),
        addType: addTypeMock,
        removeType: removeTypeMock,
      });
      useInitializeLearnerHome.mockReturnValue({ data: { courses: [1, 2, 3] } });
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth });
      render(<IntlProvider locale="en"><FilterControls filterTypes={filterTypes} /></IntlProvider>);
      const filtersButton = screen.getByRole('button', { name: 'Refine' });
      await user.click(filtersButton);
      await waitFor(async () => {
        const typeCheckbox = screen.getByText(filterTypes[0].text);
        await user.click(typeCheckbox);
        expect(addTypeMock).toHaveBeenCalledWith(filterTypes[0]);
        expect(removeTypeMock).not.toHaveBeenCalled();
      });
    });
    it('should call removeType on type uncheck', async () => {
      getConfig.mockReturnValue({ ENABLE_PATHWAY_PILOT_UI: true });
      const user = userEvent.setup();
      const addTypeMock = jest.fn().mockName('addType');
      const removeTypeMock = jest.fn().mockName('removeType');
      useFilters.mockReturnValue({
        filters: [],
        types: [filterTypes[0]],
        removeFilter: jest.fn().mockName('removeFilter'),
        clearFilters: jest.fn().mockName('clearFilters'),
        setSortBy: jest.fn().mockName('setSortBy'),
        addFilter: jest.fn().mockName('addFilter'),
        addType: addTypeMock,
        removeType: removeTypeMock,
      });
      useInitializeLearnerHome.mockReturnValue({ data: { courses: [1, 2, 3] } });
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth });
      render(<IntlProvider locale="en"><FilterControls filterTypes={filterTypes} /></IntlProvider>);
      const filtersButton = screen.getByRole('button', { name: 'Refine' });
      await user.click(filtersButton);
      await waitFor(async () => {
        const typeCheckbox = screen.getByText(filterTypes[0].text);
        await user.click(typeCheckbox);
        expect(removeTypeMock).toHaveBeenCalledWith(filterTypes[0].id);
        expect(addTypeMock).not.toHaveBeenCalled();
      });
    });
    it('should not render type filters when the pathway pilot UI is disabled', async () => {
      getConfig.mockReturnValue({ ENABLE_PATHWAY_PILOT_UI: false });
      const user = userEvent.setup();
      useInitializeLearnerHome.mockReturnValue({ data: { courses: [1, 2, 3] } });
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth });
      render(<IntlProvider locale="en"><FilterControls filterTypes={filterTypes} /></IntlProvider>);
      const filtersButton = screen.getByRole('button', { name: 'Refine' });
      await user.click(filtersButton);
      await waitFor(() => {
        const filterForm = screen.getByText(messages.courseStatus.defaultMessage);
        expect(filterForm).toBeInTheDocument();
      });
      expect(screen.queryByText(filterTypes[0].text)).not.toBeInTheDocument();
    });
  });
});
