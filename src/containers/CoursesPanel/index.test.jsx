import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { MemoryRouter } from 'react-router';
import { useInitializeLearnerHome } from '@src/data/hooks';
import { useFilters } from '@src/data/context';
import * as dataTransformers from '@src/utils/dataTransformers';
import messagesNoCourses from '@src/containers/CoursesPanel/NoCoursesView/messages';
import CoursesPanel from '.';
import messages from './messages';

jest.mock('@src/data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(() => ({
    data: {
      courses: [{ id: 1 }, { id: 2 }],
      coursesByCardId: { 'card-0': { id: 1, cardId: 'card-0' }, 'card-1': { id: 2, cardId: 'card-1' } },
    },
  })),
}));

jest.mock('@src/data/context', () => ({
  useFilters: jest.fn(() => ({
    filters: [],
    sortBy: 'enrolled',
    pageNumber: 1,
    setPageNumber: jest.fn(),
  })),
}));

jest.mock('@src/containers/CourseCard', () => jest.fn(() => <div>CourseCard</div>));
jest.mock('@src/containers/CourseFilterControls', () => ({
  ActiveCourseFilters: jest.fn(() => <div>ActiveCourseFilters</div>),
  CourseFilterControls: jest.fn(() => <div>CourseFilterControls</div>),
}));


describe('CoursesPanel', () => {
  const createWrapper = (courseListData) => {
    const visibleList = courseListData?.visibleList || [];
    const coursesByCardId = Object.fromEntries(visibleList.map((c, i) => [`card-${i}`, { ...c, cardId: c.cardId || `card-${i}` }]));
    useInitializeLearnerHome.mockReturnValue({ data: { courses: visibleList, coursesByCardId } });
    return render(<MemoryRouter><IntlProvider locale="en"><CoursesPanel /></IntlProvider></MemoryRouter>);
  };

  describe('no courses', () => {
    it('should render no courses view slot', () => {
      createWrapper();
      const imgNoCourses = screen.getByRole('img', { name: messagesNoCourses.bannerAlt.defaultMessage });
      expect(imgNoCourses).toBeInTheDocument();
      const courseCard = screen.queryByText('CourseCard');
      expect(courseCard).toBeNull();
    });
  });
  describe('with courses', () => {
    it('should render courselist', () => {
      const visibleList = [{ cardId: 'foo' }, { cardId: 'bar' }, { cardId: 'baz' }];
      createWrapper({ visibleList });
      const courseCards = screen.getAllByText('CourseCard');
      expect(courseCards.length).toEqual(visibleList.length);
    });
    it('displays course filter controls', () => {
      createWrapper();
      expect(screen.getByText('CourseFilterControls')).toBeInTheDocument();
    });

    it('displays course list slot when courses exist', () => {
      const visibleList = [{ cardId: 'foo' }, { cardId: 'bar' }, { cardId: 'baz' }];
      createWrapper({ visibleList });
      const heading = screen.getByText(messages.myCourses.defaultMessage);
      expect(heading).toBeInTheDocument();
    });
  });

  describe('page number clamping', () => {
    const mockSetPageNumber = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      jest.spyOn(dataTransformers, 'getVisibleList');
    });

    it('clamps page number to 1 when current page exceeds total pages', () => {
      useFilters.mockReturnValue({
        filters: [],
        sortBy: 'enrolled',
        pageNumber: 5, // User is on page 5
        setPageNumber: mockSetPageNumber,
      });

      dataTransformers.getVisibleList.mockReturnValue({
        visibleList: [{ id: 1 }],
        numPages: 2,
      });

      createWrapper({ visibleList: [{ id: 1 }] });

      expect(mockSetPageNumber).toHaveBeenCalledWith(1);
    });

    it('does not clamp page number when current page is valid', () => {
      useFilters.mockReturnValue({
        filters: [],
        sortBy: 'enrolled',
        pageNumber: 2,
        setPageNumber: mockSetPageNumber,
      });

      dataTransformers.getVisibleList.mockReturnValue({
        visibleList: [{ id: 1 }],
        numPages: 3,
      });

      createWrapper({ visibleList: [{ id: 1 }] });

      expect(mockSetPageNumber).not.toHaveBeenCalled();
    });

    it('does not clamp when numPages is 0', () => {
      useFilters.mockReturnValue({
        filters: [],
        sortBy: 'enrolled',
        pageNumber: 2,
        setPageNumber: mockSetPageNumber,
      });

      dataTransformers.getVisibleList.mockReturnValue({
        visibleList: [],
        numPages: 0,
      });

      createWrapper({ visibleList: [] });

      expect(mockSetPageNumber).not.toHaveBeenCalled();
    });

    it('handles edge case when pageNumber equals numPages', () => {
      useFilters.mockReturnValue({
        filters: [],
        sortBy: 'enrolled',
        pageNumber: 2,
        setPageNumber: mockSetPageNumber,
      });

      dataTransformers.getVisibleList.mockReturnValue({
        visibleList: [{ id: 1 }],
        numPages: 2,
      });

      createWrapper({ visibleList: [{ id: 1 }] });

      expect(mockSetPageNumber).not.toHaveBeenCalled();
    });
  });
});
