import React, { useEffect, useState } from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Card, Hyperlink } from '@openedx/paragon';

import { useInitializeLearnerHome, useCourseCompletion } from 'data/hooks';
import { getTransformedCourseDataList } from 'utils/dataTransformers';
import { parseDateOnly } from 'utils/dateFormatter';

import messages from './messages';
import './index.scss';

const PAGE_SIZE = 3;

// Stroke uses currentColor; parent sets OpenLMS PRIMARY_COLOR (#003366).
const CalendarDueDatesIcon = () => (
  <svg
    className="course-completion-icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g clipPath="url(#clip0_calendar_due_dates)">
      <path d="M4 7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V7Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 3V7" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 3V7" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 11H20" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16C13 15.7348 12.8946 15.4804 12.7071 15.2929C12.5196 15.1054 12.2652 15 12 15C11.7348 15 11.4804 15.1054 11.2929 15.2929C11.1054 15.4804 11 15.7348 11 16Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_calendar_due_dates">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const CourseCompletionWidget = () => {
  const { formatMessage, formatDate } = useIntl();
  const { data: learnerData } = useInitializeLearnerHome();
  const { data: completionData, isLoading, isError } = useCourseCompletion();
  const [page, setPage] = useState(1);

  const total = completionData?.length ?? 0;
  const pageCount = Math.ceil(total / PAGE_SIZE);

  useEffect(() => {
    if (page > pageCount && pageCount > 0) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  if (isLoading || isError || !total) {
    return null;
  }

  const enrolledCourses = learnerData?.courses?.length
    ? getTransformedCourseDataList(learnerData.courses)
    : [];
  const homeUrlByCourseId = enrolledCourses.reduce((acc, { courseRun }) => {
    if (courseRun?.courseId) {
      acc[courseRun.courseId] = courseRun.homeUrl;
    }
    return acc;
  }, {});

  const start = (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, total);
  const visibleItems = completionData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Card id="course-completion-widget" className="my-lg">
      <Card.Header
        title={(
          <span className="d-flex align-items-center course-completion-header text-sm font-medium text-slate-900">
            <CalendarDueDatesIcon />
            {formatMessage(messages.widgetTitle)}
          </span>
        )}
      />
      <Card.Section>
        <ul className="course-completion-list list-unstyled d-flex flex-column m-0 p-0 pl-2.5">
          {visibleItems.map(({
            courseId, title, completion, dueDate,
          }) => (
            <li key={courseId} className="course-completion-item">
              <span className="course-completion-bullet rounded-full" aria-hidden="true" />
              <Hyperlink
                variant="brand"
                destination={homeUrlByCourseId[courseId] || ''}
                className="course-completion-title text-xs font-normal lh-regular"
              >
                {title}
              </Hyperlink>
              <div className="course-completion-meta d-flex align-items-center">
                <span className="course-completion-percent text-regular font-regular lh-regular text-slate-900">
                  {formatMessage(messages.percentCompleted, { percent: completion })}
                </span>
                {dueDate && (
                  <span className="course-completion-due text-regular font-regular lh-regular text-slate-500">
                    {formatMessage(messages.dueDate, {
                      // Parsed as a calendar day (not a UTC instant) so it always matches the
                      // same due date shown on the course card, regardless of the viewer's
                      // timezone — see utils/dateFormatter's parseDateOnly.
                      date: formatDate(
                        parseDateOnly(dueDate),
                        { month: 'short', day: 'numeric', year: 'numeric' },
                      ),
                    })}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="course-completion-footer d-flex align-items-center justify-content-between">
          <span className="course-completion-range text-xs font-regular lh-regular text-slate-600">
            {formatMessage(messages.itemsRange, { start, end, total })}
          </span>
          {pageCount > 1 && (
            <nav
              className="course-completion-pagination d-flex align-items-center p-xs rounded-md"
              aria-label={formatMessage(messages.paginationLabel)}
            >
              {Array.from({ length: pageCount }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === page;

                return (
                  <button
                    key={pageNumber}
                    type="button"
                    className={[
                      'course-completion-page-btn',
                      'd-inline-flex',
                      'align-items-center',
                      'justify-content-center',
                      'text-xs',
                      'font-regular',
                      'lh-regular',
                      'rounded-md',
                      'px-sm',
                      'py-sm',
                      'text-slate-900',
                      isActive ? 'is-active font-bold' : '',
                    ].filter(Boolean).join(' ')}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </Card.Section>
    </Card>
  );
};

CourseCompletionWidget.propTypes = {};

export default CourseCompletionWidget;
