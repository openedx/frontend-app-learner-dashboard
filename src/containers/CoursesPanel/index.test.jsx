import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { useInitializeLearnerHome } from 'data/hooks';
import { useFilters } from 'data/context';
import * as dataTransformers from 'utils/dataTransformers';
import messagesNoCourses from 'containers/CoursesPanel/NoCoursesView/messages';
import CoursesPanel from '.';
import messages from './messages';

jest.mock('data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(() => ({
    data: {
      courses: [{ id: 1 }, { id: 2 }],
    },
  })),
}));

jest.mock('data/context', () => ({
  useFilters: jest.fn(() => ({
    filters: [],
    sortBy: 'enrolled',
    pageNumber: 1,
    setPageNumber: jest.fn(),
  })),
}));

jest.mock('containers/CourseCard', () => jest.fn(() => <div>CourseCard</div>));
jest.mock('containers/CourseFilterControls', () => ({
  ActiveCourseFilters: jest.fn(() => <div>ActiveCourseFilters</div>),
  CourseFilterControls: jest.fn(() => <div>CourseFilterControls</div>),
}));

jest.mock('@openedx/frontend-plugin-framework', () => ({
  PluginSlot: 'PluginSlot',
}));

describe('CoursesPanel', () => {
  const createWrapper = (courseListData) => {
    useInitializeLearnerHome.mockReturnValue({ data: { courses: courseListData?.visibleList || [] } });
    return render(<IntlProvider locale="en"><CoursesPanel /></IntlProvider>);
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
      jest.spyOn(dataTransformers, 'getTransformedCourseDataList');
      jest.spyOn(dataTransformers, 'getVisibleList');
    });

    it('clamps page number to 1 when current page exceeds total pages', () => {
      useFilters.mockReturnValue({
        filters: [],
        sortBy: 'enrolled',
        pageNumber: 5, // User is on page 5
        setPageNumber: mockSetPageNumber,
      });

      dataTransformers.getTransformedCourseDataList.mockReturnValue([{ id: 1 }, { id: 2 }]);
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

      dataTransformers.getTransformedCourseDataList.mockReturnValue([{ id: 1 }, { id: 2 }]);
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

      dataTransformers.getTransformedCourseDataList.mockReturnValue([]);
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

      dataTransformers.getTransformedCourseDataList.mockReturnValue([{ id: 1 }, { id: 2 }]);
      dataTransformers.getVisibleList.mockReturnValue({
        visibleList: [{ id: 1 }],
        numPages: 2,
      });

      createWrapper({ visibleList: [{ id: 1 }] });

      expect(mockSetPageNumber).not.toHaveBeenCalled();
    });
  });
});
