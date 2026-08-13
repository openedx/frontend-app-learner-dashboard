import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import { useInitializeLearnerHome } from 'data/hooks';
import { useFilters } from 'data/context';
import { FilterControls } from 'containers/FilterControls';
import * as dataTransformers from 'utils/dataTransformers';
import messagesNoCourses from 'containers/ItemsPanel/NoCoursesView/messages';
import ItemsPanel from '.';
import messages from './messages';

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(() => ({ ENABLE_PATHWAY_PILOT_UI: false })),
}));

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
    types: [],
    sortBy: 'enrolled',
    pageNumber: 1,
    setPageNumber: jest.fn(),
  })),
}));

jest.mock('containers/CourseCard', () => jest.fn(() => <div>CourseCard</div>));
jest.mock('containers/PathwayCard', () => ({ PathwayCard: jest.fn(() => <div>PathwayCard</div>) }));
jest.mock('containers/FilterControls', () => ({
  ActiveCourseFilters: jest.fn(() => <div>ActiveCourseFilters</div>),
  FilterControls: jest.fn(() => <div>FilterControls</div>),
}));

jest.mock('@openedx/frontend-plugin-framework', () => ({
  PluginSlot: 'PluginSlot',
}));

describe('ItemsPanel', () => {
  const createWrapper = (courseListData) => {
    useInitializeLearnerHome.mockReturnValue({ data: { courses: courseListData?.visibleList || [] } });
    return render(<IntlProvider locale="en"><ItemsPanel /></IntlProvider>);
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
      const visibleList = [
        { cardId: 'foo', course: { courseName: 'Foo' } },
        { cardId: 'bar', course: { courseName: 'Bar' } },
        { cardId: 'baz', course: { courseName: 'Baz' } },
      ];
      createWrapper({ visibleList });
      const courseCards = screen.getAllByText('CourseCard');
      expect(courseCards.length).toEqual(visibleList.length);
    });
    it('displays course filter controls', () => {
      createWrapper();
      expect(screen.getByText('FilterControls')).toBeInTheDocument();
    });

    it('displays course list slot when courses exist', () => {
      const visibleList = [
        { cardId: 'foo', course: { courseName: 'Foo' } },
        { cardId: 'bar', course: { courseName: 'Bar' } },
        { cardId: 'baz', course: { courseName: 'Baz' } },
      ];
      createWrapper({ visibleList });
      const heading = screen.getByText(messages.myCourses.defaultMessage);
      expect(heading).toBeInTheDocument();
    });
  });

  describe('with pathways', () => {
    afterEach(() => {
      getConfig.mockReturnValue({ ENABLE_PATHWAY_PILOT_UI: false });
      jest.restoreAllMocks();
    });

    it('renders pathway cards when the pilot UI is enabled and pathways exist', () => {
      getConfig.mockReturnValue({ ENABLE_PATHWAY_PILOT_UI: true });
      const transformedPathways = [{
        cardId: 'pathway-1',
        enrollment: { lastEnrolled: '2024-01-01' },
        pathway: { content: { displayName: 'Pathway 1' }, type: 'masters', typeText: 'Masters' },
      }];
      jest.spyOn(dataTransformers, 'getTransformedPathwayDataList').mockReturnValue(transformedPathways);
      jest.spyOn(dataTransformers, 'getVisiblePathways').mockReturnValue(transformedPathways);

      useInitializeLearnerHome.mockReturnValue({
        data: { courses: [], pathway: [{ pathway: { type: 'masters', typeText: 'Masters' } }] },
      });

      render(<IntlProvider locale="en"><ItemsPanel /></IntlProvider>);

      expect(screen.getByText('PathwayCard')).toBeInTheDocument();
      expect(dataTransformers.getTransformedPathwayDataList).toHaveBeenCalledWith(
        [{ pathway: { type: 'masters', typeText: 'Masters' } }],
      );
      expect(dataTransformers.getVisiblePathways).toHaveBeenCalled();
    });

    it('does not render pathway cards when the pilot UI is disabled', () => {
      getConfig.mockReturnValue({ ENABLE_PATHWAY_PILOT_UI: false });
      jest.spyOn(dataTransformers, 'getTransformedPathwayDataList');

      useInitializeLearnerHome.mockReturnValue({
        data: { courses: [], pathway: [{ pathway: { type: 'masters', typeText: 'Masters' } }] },
      });

      render(<IntlProvider locale="en"><ItemsPanel /></IntlProvider>);

      expect(screen.queryByText('PathwayCard')).toBeNull();
      expect(dataTransformers.getTransformedPathwayDataList).not.toHaveBeenCalled();
    });

    it('derives unique filter types from the raw pathway list', () => {
      FilterControls.mockClear();

      useInitializeLearnerHome.mockReturnValue({
        data: {
          courses: [{
            course: { courseName: 'Foo' },
            enrollment: { isEnrolled: true, hasStarted: true, lastEnrolled: '2024-01-01' },
          }],
          pathway: [
            { pathway: { type: 'masters', typeText: 'Masters' } },
            { pathway: { type: 'masters', typeText: 'Masters' } },
            { pathway: { type: 'xseries', typeText: 'XSeries' } },
          ],
        },
      });

      render(<IntlProvider locale="en"><ItemsPanel /></IntlProvider>);

      const { filterTypes } = FilterControls.mock.calls[0][0];
      expect(filterTypes).toEqual([
        { id: 'Course', text: messages.courseType.defaultMessage },
        { id: 'masters', text: 'Masters' },
        { id: 'xseries', text: 'XSeries' },
      ]);
    });
  });

  describe('page number clamping', () => {
    const mockSetPageNumber = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      jest.spyOn(dataTransformers, 'getTransformedCourseDataList');
      jest.spyOn(dataTransformers, 'getVisibleCourses');
      jest.spyOn(dataTransformers, 'getVisibleItems');
    });

    it('clamps page number to 1 when current page exceeds total pages', () => {
      useFilters.mockReturnValue({
        filters: [],
        types: [],
        sortBy: 'enrolled',
        pageNumber: 5, // User is on page 5
        setPageNumber: mockSetPageNumber,
      });

      dataTransformers.getTransformedCourseDataList.mockReturnValue([{ id: 1 }, { id: 2 }]);
      dataTransformers.getVisibleCourses.mockReturnValue([
        { cardId: 'foo', course: { courseName: 'Foo' } },
      ]);
      dataTransformers.getVisibleItems.mockReturnValue({
        visibleList: [{ cardId: 'foo' }],
        numPages: 2,
      });

      createWrapper({ visibleList: [{ id: 1 }] });

      expect(mockSetPageNumber).toHaveBeenCalledWith(1);
    });

    it('does not clamp page number when current page is valid', () => {
      useFilters.mockReturnValue({
        filters: [],
        types: [],
        sortBy: 'enrolled',
        pageNumber: 2,
        setPageNumber: mockSetPageNumber,
      });

      dataTransformers.getTransformedCourseDataList.mockReturnValue([{ id: 1 }, { id: 2 }]);
      dataTransformers.getVisibleCourses.mockReturnValue([
        { cardId: 'foo', course: { courseName: 'Foo' } },
      ]);
      dataTransformers.getVisibleItems.mockReturnValue({
        visibleList: [{ cardId: 'foo' }],
        numPages: 3,
      });

      createWrapper({ visibleList: [{ id: 1 }] });

      expect(mockSetPageNumber).not.toHaveBeenCalled();
    });

    it('does not clamp when numPages is 0', () => {
      useFilters.mockReturnValue({
        filters: [],
        types: [],
        sortBy: 'enrolled',
        pageNumber: 2,
        setPageNumber: mockSetPageNumber,
      });

      dataTransformers.getTransformedCourseDataList.mockReturnValue([]);
      dataTransformers.getVisibleCourses.mockReturnValue([]);
      dataTransformers.getVisibleItems.mockReturnValue({
        visibleList: [],
        numPages: 0,
      });

      createWrapper({ visibleList: [] });

      expect(mockSetPageNumber).not.toHaveBeenCalled();
    });

    it('handles edge case when pageNumber equals numPages', () => {
      useFilters.mockReturnValue({
        filters: [],
        types: [],
        sortBy: 'enrolled',
        pageNumber: 2,
        setPageNumber: mockSetPageNumber,
      });

      dataTransformers.getTransformedCourseDataList.mockReturnValue([{ id: 1 }, { id: 2 }]);
      dataTransformers.getVisibleCourses.mockReturnValue([
        { cardId: 'foo', course: { courseName: 'Foo' } },
      ]);
      dataTransformers.getVisibleItems.mockReturnValue({
        visibleList: [{ cardId: 'foo' }],
        numPages: 2,
      });

      createWrapper({ visibleList: [{ id: 1 }] });

      expect(mockSetPageNumber).not.toHaveBeenCalled();
    });
  });
});
