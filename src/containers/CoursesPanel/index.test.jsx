import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { MemoryRouter } from 'react-router-dom';
import { FilterKeys } from '@src/data/constants/app';
import { reduxHooks } from '@src/hooks';

import messagesNoCourses from '@src/containers/CoursesPanel/NoCoursesView/messages';
import { useCourseListData } from './hooks';
import CoursesPanel from '.';
import messages from './messages';

const courseSearchUrl = '/course-search-url';

jest.mock('@src/hooks', () => ({
  reduxHooks: {
    useHasCourses: jest.fn(),
    usePlatformSettingsData: jest.fn(() => ({
      courseSearchUrl,
    })),
  },
}));

jest.mock('./hooks', () => ({
  useCourseListData: jest.fn(),
}));

jest.mock('@src/containers/CourseCard', () => jest.fn(() => <div>CourseCard</div>));
jest.mock('@src/containers/CourseFilterControls', () => ({
  ActiveCourseFilters: jest.fn(() => <div>ActiveCourseFilters</div>),
  CourseFilterControls: jest.fn(() => <div>CourseFilterControls</div>),
}));

const filters = Object.values(FilterKeys);

reduxHooks.useHasCourses.mockReturnValue(true);

describe('CoursesPanel', () => {
  const defaultCourseListData = {
    filterOptions: { filters, handleRemoveFilter: jest.fn() },
    numPages: 1,
    setPageNumber: jest.fn().mockName('setPageNumber'),
    showFilters: false,
    visibleList: [],
  };

  const createWrapper = (courseListData) => {
    useCourseListData.mockReturnValue({
      ...defaultCourseListData,
      ...courseListData,
    });
    return render(
      <MemoryRouter>
        <IntlProvider locale="en">
          <CoursesPanel />
        </IntlProvider>
      </MemoryRouter>
    );
  };

  describe('no courses', () => {
    it('should render no courses view slot', () => {
      reduxHooks.useHasCourses.mockReturnValue(false);
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
      reduxHooks.useHasCourses.mockReturnValue(true);
      createWrapper({ visibleList });
      const courseCards = screen.getAllByText('CourseCard');
      expect(courseCards.length).toEqual(visibleList.length);
    });
    it('displays course filter controls', () => {
      reduxHooks.useHasCourses.mockReturnValue(true);
      createWrapper();
      expect(screen.getByText('CourseFilterControls')).toBeInTheDocument();
    });

    it('displays course list slot when courses exist', () => {
      reduxHooks.useHasCourses.mockReturnValue(true);
      const visibleList = [{ cardId: 'foo' }, { cardId: 'bar' }, { cardId: 'baz' }];
      createWrapper({ visibleList });
      const heading = screen.getByText(messages.myCourses.defaultMessage);
      expect(heading).toBeInTheDocument();
    });
  });
});
