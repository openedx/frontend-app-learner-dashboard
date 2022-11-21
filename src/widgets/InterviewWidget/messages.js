import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  interviewTitle: {
    id: 'InterviewSidebar.interviewTitle',
    defaultMessage: 'Help shape the future of edX',
    description: 'Interview card heading',
  },
  interviewPrompt: {
    id: 'InterviewSidebar.interviewPrompt',
    defaultMessage: 'Sign up for a 30-minute Q&A session with an edX research expert!',
    description: 'Prompt user to sign up',
  },
  signUpButton: {
    id: 'InterviewSidebar.signUpButton',
    defaultMessage: 'Sign up',
    description: 'Button sign up',
  },
  dismissButton: {
    id: 'InterviewSidebar.dismissButton',
    defaultMessage: 'No thanks',
    description: 'decline prompt to sign up',
  },
});

export default messages;
