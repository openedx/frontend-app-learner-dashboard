import { React, useState } from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, Calendar, Card } from '@edx/paragon';

import interviewWidgetImg from 'assets/interview-widget.png';

import messages from './messages';
import './index.scss';
import { getCookie, setCookie } from '../../utils/cookies';
import { configuration } from '../../config';

export const InterviewWidget = () => {
  const dismissCookieName = configuration.INTERVIEW_WIDGET_DISMISS_COOKIE_NAME;
  const [isDismised, setIsDismissed] = useState(!!getCookie(dismissCookieName));
  const { formatMessage } = useIntl();

  const handleDismiss = () => {
    setIsDismissed(true);
    setCookie(dismissCookieName, true, 365);
  }

  if (isDismised || !configuration.INTERVIEW_WIDGET_SIGNUP_URL) {
    return null;
  }
  return (
    <Card id="interview-widget">
      <Card.ImageCap
        src={interviewWidgetImg}
        srcAlt="course side widget"
      />
      <Card.Header
        title={formatMessage(messages.interviewTitle)}
      />
      <Card.Section>
        {formatMessage(messages.interviewPrompt)}
      </Card.Section>
      <Card.Footer>
        <Button variant="tertiary" onClick={handleDismiss}>{formatMessage(messages.dismissButton)}</Button>
        <Button
          variant="outline-primary"
          iconBefore={Calendar}
          href={configuration.INTERVIEW_WIDGET_SIGNUP_URL}
        >
          {formatMessage(messages.signUpButton)}
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default InterviewWidget;
