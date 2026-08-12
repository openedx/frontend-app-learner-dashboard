import { render, screen } from '@testing-library/react';

import { useIsCollapsed } from './hooks';
import ItemsList from '.';

jest.mock('./hooks', () => ({
  useIsCollapsed: jest.fn(),
}));

jest.mock('containers/CourseCard', () => jest.fn(({ cardId }) => <div>CourseCard-{cardId}</div>));
jest.mock('containers/PathwayCard', () => ({
  PathwayCard: jest.fn(({ cardId }) => <div>PathwayCard-{cardId}</div>),
}));
jest.mock('containers/FilterControls', () => ({
  ActiveCourseFilters: jest.fn(() => <div>ActiveCourseFilters</div>),
}));

describe('ItemsList', () => {
  const defaultItemsListData = {
    filterOptions: {},
    numPages: 1,
    setPageNumber: jest.fn().mockName('setPageNumber'),
    showFilters: false,
    visibleList: [],
  };
  useIsCollapsed.mockReturnValue(false);

  const renderList = (itemsListData = defaultItemsListData) => (
    render(<ItemsList itemsListData={itemsListData} />)
  );

  describe('no courses or filters', () => {
    it('should not render related components', () => {
      renderList();
      const filterControls = screen.queryByText('ActiveCourseFilters');
      const courseCard = screen.queryByText(/^CourseCard-/);
      const prevButton = screen.queryByRole('button', { name: 'Previous' });
      expect(filterControls).toBeNull();
      expect(courseCard).toBeNull();
      expect(prevButton).toBeNull();
    });
  });
  describe('with filters', () => {
    it('should render filter component', () => {
      renderList({
        ...defaultItemsListData,
        showFilters: true,
      });
      const filterControls = screen.getByText('ActiveCourseFilters');
      expect(filterControls).toBeInTheDocument();
    });
  });
  describe('with multiple courses and pages', () => {
    it('render Course Cards and pagination', () => {
      const visibleList = [{ cardId: 'foo' }, { cardId: 'bar' }, { cardId: 'baz' }];
      const numPages = 3;
      renderList({
        ...defaultItemsListData,
        visibleList,
        numPages,
      });
      const courseCards = screen.getAllByText(/^CourseCard-/);
      expect(courseCards.length).toEqual(visibleList.length);
      const pageButtons = screen.getAllByRole('button', { name: /^Page/i });
      expect(pageButtons.length).toBe(numPages);
    });
  });
  describe('with pathways', () => {
    it('renders PathwayCard for items with itemType "pathway"', () => {
      const visibleList = [
        { cardId: 'foo', itemType: 'pathway' },
        { cardId: 'bar', itemType: 'pathway' },
      ];
      renderList({
        ...defaultItemsListData,
        visibleList,
      });
      const pathwayCards = screen.getAllByText(/^PathwayCard-/);
      expect(pathwayCards.length).toEqual(visibleList.length);
      const courseCards = screen.queryAllByText(/^CourseCard-/);
      expect(courseCards).toHaveLength(0);
    });
  });
  describe('with mixed courses and pathways', () => {
    it('renders the correct card component for each item, in order', () => {
      const visibleList = [
        { cardId: 'course-foo', itemType: 'course' },
        { cardId: 'pathway-bar', itemType: 'pathway' },
        { cardId: 'course-baz' },
      ];
      renderList({
        ...defaultItemsListData,
        visibleList,
      });
      expect(screen.getByText('CourseCard-course-foo')).toBeInTheDocument();
      expect(screen.getByText('PathwayCard-pathway-bar')).toBeInTheDocument();
      expect(screen.getByText('CourseCard-course-baz')).toBeInTheDocument();

      const listContainer = screen.getByText('CourseCard-course-foo').parentElement;
      const renderedCardIds = Array.from(listContainer.children).map(child => child.textContent);
      expect(renderedCardIds).toEqual([
        'CourseCard-course-foo',
        'PathwayCard-pathway-bar',
        'CourseCard-course-baz',
      ]);
    });
  });
  describe('collapsed with multiple courses and pages', () => {
    it('should render correct components', () => {
      const visibleList = [{ cardId: 'foo' }, { cardId: 'bar' }, { cardId: 'baz' }];
      useIsCollapsed.mockReturnValueOnce(true);
      renderList({
        ...defaultItemsListData,
        visibleList,
        numPages: 3,
        showFilters: true,
      });
      const courseCards = screen.getAllByText(/^CourseCard-/);
      expect(courseCards.length).toEqual(visibleList.length);
      const reducedPagination = screen.getByRole('button', { name: '1 of 3' });
      expect(reducedPagination).toBeInTheDocument();
    });
  });
});
