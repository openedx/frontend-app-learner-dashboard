import { React } from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, Card } from '@edx/paragon';
import { Calendar } from '@edx/paragon/icons';

import interviewWidgetImg from 'assets/interview-widget.png';

import { configuration } from '../../config';

import './index.scss';
import messages from './messages';
import { useDismissPanel } from './hooks';

export const InterviewWidget = () => {
  const {
    hideWidget,
    handleDismiss,
  } = useDismissPanel();
  const { formatMessage } = useIntl();

  if (hideWidget) {
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
