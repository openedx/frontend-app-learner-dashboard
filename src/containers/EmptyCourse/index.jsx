import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import {
  Button,
  Container,
  Col,
  Image,
  Row,
} from '@edx/paragon';
import { Search } from '@edx/paragon/icons';

import emptyCourseSVG from 'assets/empty-course.svg';

import { hooks as appHooks } from 'data/redux';
import { RequestKeys } from 'data/constants/requests';
import hooks from 'containers/Dashboard/hooks';
import RecommendationsPanel, { LoadingView as RecommendationsLoadingView } from 'containers/RecommendationsPanel';
import SuggestedCourses from './SuggestedCourses';
import messages from './messages';

import './index.scss';

const columnConfig = {
  sidebar: { md: 12, xl: 4 },
};

export const EmptyCourse = () => {
  const isCollapsed = hooks.useIsDashboardCollapsed();
  const recommendedCourses = appHooks.useRecommendedCoursesData();
  const isRecommendationsPending = appHooks.useRequestIsPending(RequestKeys.recommendedCourses);
  const { courseSearchUrl } = appHooks.usePlatformSettingsData();
  const hasRecommendedCourses = recommendedCourses.courses.length > 0;

  return (
    <div className="p-3">
      <Container>
        <Row>
          <Col
            className={classNames(
              'p-0 px-4',
              { 'mb-4.5': isCollapsed && ((!isRecommendationsPending && hasRecommendedCourses) || isRecommendationsPending) },
            )}
          >
            <div
              className={classNames(
                'd-flex align-items-center justify-content-center empty-course-hero',
                { 'empty-course-border': (!isRecommendationsPending && hasRecommendedCourses) || isRecommendationsPending },
              )}
            >
              <Image src={emptyCourseSVG} alt="empty course banner" />
              <h1>
                <FormattedMessage {...messages.lookingForChallengePrompt} />
              </h1>
              <p>
                <FormattedMessage {...messages.exploreCoursesPrompt} />
              </p>
              <Button
                variant="brand"
                as="a"
                href={courseSearchUrl}
                iconBefore={Search}
              >
                <FormattedMessage {...messages.exploreCoursesButton} />
              </Button>
            </div>
            <SuggestedCourses />
          </Col>
          {isRecommendationsPending && (
            <Col
              {...columnConfig.sidebar}
              className="p-0 pr-4 pl-4"
            >
              <RecommendationsLoadingView />
            </Col>
          )}
          {!isRecommendationsPending && hasRecommendedCourses && (
            <Col
              {...columnConfig.sidebar}
              className="p-0 pr-4 pl-4"
            >
              <RecommendationsPanel courses={recommendedCourses.courses} />
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default EmptyCourse;
