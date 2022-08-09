import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Image } from '@edx/paragon';

import messages from './messages';

export const GreetingBanner = () => {
  let greetMessage;
  const hour = new Date().getHours();

  if (hour > 16) {
    greetMessage = messages.goodEvening;
  } else if (hour > 11) {
    greetMessage = messages.goodAfternoon;
  } else {
    greetMessage = messages.goodMorning;
  }
  console.log({ config: getConfig() });

  return (
    <div className="d-flex p-5 align-items-center justify-content-center">
      <Image
        style={{ width: '148px' }}
        className="d-block"
        src={getConfig().LOGO_WHITE_URL}
        alt={getConfig().SITE_NAME}
      />
      <div className="greetings-slash-container bg-brand-500" />
      <h1 className="text-center text-accent-b">
        <FormattedMessage {...greetMessage} />
      </h1>
    </div>
  );
};

export default GreetingBanner;
