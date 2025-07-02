import { render, screen } from '@testing-library/react';

import { useIsCollapsed } from './hooks';
import CourseList from '.';

jest.mock('./hooks', () => ({
  useIsCollapsed: jest.fn(),
}));

jest.mock('containers/CourseCard', () => jest.fn(() => <div>CourseCard</div>));
jest.mock('containers/CourseFilterControls', () => ({
  ActiveCourseFilters: jest.fn(() => <div>ActiveCourseFilters</div>),
}));

describe('CourseList', () => {
  const defaultCourseListData = {
    filterOptions: {},
    numPages: 1,
    setPageNumber: jest.fn().mockName('setPageNumber'),
    showFilters: false,
    visibleList: [],
  };
  useIsCollapsed.mockReturnValue(false);

  const renderList = (courseListData = defaultCourseListData) => (
    render(<CourseList courseListData={courseListData} />)
  );

  describe('no courses or filters', () => {
    it('should not render related components', () => {
      renderList();
      const filterControls = screen.queryByText('ActiveCourseFilters');
      const courseCard = screen.queryByText('CourseCard');
      const prevButton = screen.queryByRole('button', { name: 'Previous' });
      expect(filterControls).toBeNull();
      expect(courseCard).toBeNull();
      expect(prevButton).toBeNull();
    });
  });
  describe('with filters', () => {
    it('should render filter component', () => {
      renderList({
        ...defaultCourseListData,
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
        ...defaultCourseListData,
        visibleList,
        numPages,
      });
      const courseCards = screen.getAllByText('CourseCard');
      expect(courseCards.length).toEqual(visibleList.length);
      const pageButtons = screen.getAllByRole('button', { name: /^Page/i });
      expect(pageButtons.length).toBe(numPages);
    });
  });
  describe('collapsed with multiple courses and pages', () => {
    it('should render correct components', () => {
      const visibleList = [{ cardId: 'foo' }, { cardId: 'bar' }, { cardId: 'baz' }];
      useIsCollapsed.mockReturnValueOnce(true);
      renderList({
        ...defaultCourseListData,
        visibleList,
        numPages: 3,
        showFilters: true,
      });
      const courseCards = screen.getAllByText('CourseCard');
      expect(courseCards.length).toEqual(visibleList.length);
      const reducedPagination = screen.getByRole('button', { name: '1 of 3' });
      expect(reducedPagination).toBeInTheDocument();
    });
  });
});
