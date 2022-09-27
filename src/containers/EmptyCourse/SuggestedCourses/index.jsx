import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { ActionRow, Card, Button, Container } from '@edx/paragon';
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
          <Card key={course.courseName} className="m-3">
            <Card.ImageCap
              src={course.bannerImgSrc}
              srcAlt={formatMessage(messages.courseImageAlt)}
            />
            <Card.Header title={course.courseName} className="mb-2" />
            <Card.Body className="h-100" />
            <Card.Footer>
              <ActionRow>
                <Button as="a">{formatMessage(messages.viewCourseButton)}</Button>
              </ActionRow>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default SuggestedCourses;
