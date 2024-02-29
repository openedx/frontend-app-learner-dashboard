import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  unenroll: {
    id: 'learner-dash.courseCardMenu.unenroll',
    description: 'Course unenroll menu button',
    defaultMessage: 'Unenroll',
  },
  dropdownAlt: {
    id: 'learner-dash.courseCardMenu.dropdownAlt',
    description: 'Course action menu alt-text',
    defaultMessage: 'Course actions dropdown',
  },
  emailSettings: {
    id: 'learner-dash.courseCardMenu.emailSettings',
    description: 'Course email settings menu button',
    defaultMessage: 'Email settings',
  },
  shareToFacebook: {
    id: 'learner-dash.courseCardMenu.shareToFacebook',
    description: 'Course Facebook Sharing button',
    defaultMessage: 'Share to Facebook',
  },
  shareToTwitter: {
    id: 'learner-dash.courseCardMenu.shareToTwitter',
    description: 'Course Twitter Sharing button',
    defaultMessage: 'Share to Twitter',
  },
  shareQuote: {
    id: 'learner-dash.courseCardMenu.shareQuote',
    description: 'Social sharing quote',
    defaultMessage: 'I\'m taking {courseName} online with {socialBrand}.  Check it out!',
  },
});

export default messages;
