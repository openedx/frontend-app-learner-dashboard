import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  approved: {
    id: 'learner-dash.courseCard.banners.credit.approved',
    description: '',
    defaultMessage: '{congratulations} {providerName} has approved your request for course credit. To see your course credit, visit the {linkToProviderSite} website.',
  },
  congratulations: {
    id: 'learner-dash.courseCard.banners.credit.congratulations',
    description: '',
    defaultMessage: 'Congratulations!',
  },
  eligible: {
    id: 'learner-dash.courseCard.banners.credit.eligible',
    description: '',
    defaultMessage: 'You have completed this course and are eligible to purchase course credit.  Select {getCredit} to get started.',
  },
  eligibleFromProvider: {
    id: 'learner-dash.courseCard.banners.credit.eligibleFromProvider',
    description: '',
    defaultMessage: 'You are now eligible for credit from {providerName}. Congratulations!',
  },
  getCredit: {
    id: 'learner-dash.courseCard.banners.credit.getCredit',
    description: '',
    defaultMessage: 'Get Credit',
  },
  mustRequest: {
    id: 'learner-dash.courseCard.banners.credit.mustRequest',
    description: '',
    defaultMessage: 'Thank you for your payment.  To receive course credit, you must request credit at the {linkToProviderSite} website.  Select {requestCredit} to get started',
  },
  received: {
    id: 'learner-dash.courseCard.banners.credit.received',
    description: '',
    defaultMessage: '{providerName} has received your course credit request.  We will update you when credit processing is complete.',
  },
  rejected: {
    id: 'learner-dash.courseCard.banners.credit.rejected',
    description: '',
    defaultMessage: '{providerName} did not approve your request for course credit.  For more information, contact {linkToProviderSite} directly.',
  },
  requestCredit: {
    id: 'learner-dash.courseCard.banners.credit.requestCredit',
    description: '',
    defaultMessage: 'Request Credit',
  },
  viewCredit: {
    id: 'learner-dash.courseCard.banners.credit.viewCredit',
    description: '',
    defaultMessage: 'View Credit',
  },
  viewDetails: {
    id: 'learner-dash.courseCard.banners.credit.viewDetails',
    description: '',
    defaultMessage: 'View Details',
  },
});

export default messages;
