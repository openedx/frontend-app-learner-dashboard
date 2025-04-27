import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  approved: {
    id: 'learner-dash.courseCard.banners.credit.approved',
    description: 'Message shown when credit request has been approved',
    defaultMessage: '{congratulations} {providerName} has approved your request for course credit. To see your course credit, visit the {linkToProviderSite} website.',
  },
  congratulations: {
    id: 'learner-dash.courseCard.banners.credit.congratulations',
    description: 'Congratulatory message for credit approval',
    defaultMessage: 'Congratulations!',
  },
  eligible: {
    id: 'learner-dash.courseCard.banners.credit.eligible',
    description: 'Message shown when user is eligible to purchase course credit',
    defaultMessage: 'You have completed this course and are eligible to purchase course credit.  Select {getCredit} to get started.',
  },
  eligibleFromProvider: {
    id: 'learner-dash.courseCard.banners.credit.eligibleFromProvider',
    description: 'Message shown when user is eligible for credit from a specific provider',
    defaultMessage: 'You are now eligible for credit from {providerName}. Congratulations!',
  },
  getCredit: {
    id: 'learner-dash.courseCard.banners.credit.getCredit',
    description: 'Button text for initiating the credit process',
    defaultMessage: 'Get Credit',
  },
  mustRequest: {
    id: 'learner-dash.courseCard.banners.credit.mustRequest',
    description: 'Message shown after payment to instruct user to request credit',
    defaultMessage: 'Thank you for your payment.  To receive course credit, you must request credit at the {linkToProviderSite} website.  Select {requestCredit} to get started',
  },
  received: {
    id: 'learner-dash.courseCard.banners.credit.received',
    description: 'Message shown when credit request has been received',
    defaultMessage: '{providerName} has received your course credit request.  We will update you when credit processing is complete.',
  },
  rejected: {
    id: 'learner-dash.courseCard.banners.credit.rejected',
    description: 'Message shown when credit request has been rejected',
    defaultMessage: '{providerName} did not approve your request for course credit.  For more information, contact {linkToProviderSite} directly.',
  },
  requestCredit: {
    id: 'learner-dash.courseCard.banners.credit.requestCredit',
    description: 'Button text for requesting credit',
    defaultMessage: 'Request Credit',
  },
  viewCredit: {
    id: 'learner-dash.courseCard.banners.credit.viewCredit',
    description: 'Button text for viewing credit details',
    defaultMessage: 'View Credit',
  },
  viewDetails: {
    id: 'learner-dash.courseCard.banners.credit.viewDetails',
    description: 'Button text for viewing credit request details',
    defaultMessage: 'View Details',
  },
});

export default messages;
