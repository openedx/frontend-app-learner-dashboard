import React from 'react';

import { getConfig } from '@edx/frontend-platform';

import Zendesk from 'react-zendesk';

// Take contact form as an example
// Let's customise our contact form appearance, launcher and add prefill content
const setting = {
  cookies: true,
  webWidget: {
    contactOptions: {
      enabled: false,
    },
    chat: {
      suppress: false,
    },
    contactForm: {
      ticketForms: [
        {
          id: 360003368814,
          subject: false,
          fields: [{ id: 'description', prefill: { '*': '' } }],
        },
      ],
      selectTicketForm: {
        '*': 'Please choose your request type:',
      },
      attachments: true,
    },
    helpCenter: {
      originalArticleButton: true,
    },
    answerBot: {
      suppress: false,
      contactOnlyAfterQuery: true,
      title: { '*': 'edX Support' },
      avatar: {
        url: 'https://edx-cdn.org/v3/prod/favicon.ico',
        name: { '*': 'edX Support' },
      },
    },
  },
};

const ZendeskFab = () => (
  <Zendesk defer zendeskKey={getConfig().ZENDESK_KEY} {...setting} />
);

export default ZendeskFab;
