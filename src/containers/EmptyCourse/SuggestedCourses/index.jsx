import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Card, Button, Container } from '@edx/paragon';
import { hooks as appHooks } from 'data/redux';

import messages from './messages';

export const SuggestedCourses = () => {
  const suggestedCourses = appHooks.useSuggestedCoursesData();
  const { formatMessage } = useIntl();
  if (!suggestedCourses.length) { return null; }
  return (
    <Container size="md">
      <h3 className="text-center">{formatMessage(messages.header)}</h3>
      <div className="d-flex">
        {suggestedCourses.map((course) => (
          <Card key={course.title} className="m-3">
            <Card.ImageCap
              src={course.bannerUrl}
              srcAlt={formatMessage(messages.courseImageAlt)}
              logoSrc={course.logoUrl}
              logoAlt={formatMessage(messages.institueLogoAlt)}
            />
            <Card.Header title={course.title} />
            <Card.Footer>
              <Button as="a">{formatMessage(messages.viewCourseButton)}</Button>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default SuggestedCourses;
