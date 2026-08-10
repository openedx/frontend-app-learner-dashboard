import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  bannerAlt: {
    id: 'learner-dash.pathwayCard.bannerAlt',
    description: 'Pathway card banner alt-text',
    defaultMessage: 'Pathway thumbnail',
  },
  verifiedBanner: {
    id: 'learner-dash.pathwayCard.verifiedBanner',
    description: 'Pathway card verified banner',
    defaultMessage: 'Verified',
  },
  verifiedHoverDescription: {
    id: 'learner-dash.pathwayCard.verifiedHoverDescription',
    description: 'Pathway card verified hover description',
    defaultMessage: 'You\'re enrolled as a verified student',
  },
  verifiedBannerRibbonAlt: {
    id: 'learner-dash.pathwayCard.verifiedBannerRibbonAlt',
    description: 'Pathway card verified banner ribbon alt-text',
    defaultMessage: 'ID Verified Ribbon/Badge',
  },
  dropdownAlt: {
    id: 'learner-dash.pathwayCardMenu.dropdownAlt',
    description: 'Pathway action menu alt-text',
    defaultMessage: 'Pathway actions dropdown',
  },
  unenroll: {
    id: 'learner-dash.pathwayCardMenu.unenroll',
    description: 'Pathway unenroll menu button',
    defaultMessage: 'Unenroll',
  },
  emailSettings: {
    id: 'learner-dash.pathwayCardMenu.emailSettings',
    description: 'Pathway email settings menu button',
    defaultMessage: 'Email settings',
  },
  unknownProviderName: {
    id: 'learner-dash.pathwayCard.PathwayCardDetails.unknownProviderName',
    description: 'Provider name display when name is unknown',
    defaultMessage: 'Unknown',
  },
  coursesCount: {
    id: 'learner-dash.pathwayCard.PathwayCardDetails.coursesCount',
    description: 'Label with the number of courses of a pathway',
    defaultMessage: '{count, plural, one {# course} other {# courses}}',
  },
  viewPathway: {
    id: 'learner-dash.pathwayCard.actions.viewPathway',
    description: 'Pathway card view-course button text',
    defaultMessage: 'View Pathway',
  },
  resume: {
    id: 'learner-dash.pathwayCard.actions.resume',
    description: 'Pathway card resume button text',
    defaultMessage: 'Resume',
  },
  beginPathway: {
    id: 'learner-dash.courseCard.actions.beginPathway',
    description: 'Pathway card begin-pathway button text',
    defaultMessage: 'Begin Pathway',
  },
});

export default messages;
