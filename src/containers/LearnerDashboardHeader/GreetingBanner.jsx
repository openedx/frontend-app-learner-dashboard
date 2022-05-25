import React from 'react';
import { getConfig } from '@edx/frontend-platform';

import { FormattedMessage } from '@edx/frontend-platform/i18n';
import messages from './messages';

export const GreetingBanner = () => {
  let greetMessage;
  let hour = new Date().getHours();

  if ( hour > 16 ) {
    greetMessage = messages.goodEvening;
  }
  else if ( hour > 11 ) {
    greetMessage = messages.goodAfternoon;
  }
  else {
    greetMessage = messages.goodMorning;
  }
  
  return (
    <div className='d-flex p-5 align-items-center justify-content-center'>
      <img
        className='d-block'
        src={getConfig().LOGO_URL}
        alt={getConfig().SITE_NAME}
      />
      <h1 className='text-center text-white'>
        <FormattedMessage {...greetMessage} />
      </h1>
    </div>
  );
};
