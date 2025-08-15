import { render, screen } from '@testing-library/react';
import { formatMessage } from 'testUtils';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { ReasonPane } from './ReasonPane';
import messages from './messages';

describe('UnenrollConfirmModal ReasonPane', () => {
  const props = {
    reason: {
      handleSkip: jest.fn().mockName('props.reason.handleSkip'),
      selectOption: jest.fn().mockName('props.reason.selectOption'),
      customOption: {
        value: 'props.reason.customOption.value',
        onChange: jest.fn().mockName('props.reason.customOption.onChange'),
      },
      selected: 'props.reason.selected',
      handleSubmit: jest.fn().mockName('props.reason.handleSubmit'),
      hasReason: true,
    },
  };
  it('render heading', () => {
    render(<IntlProvider locale="en"><ReasonPane {...props} /></IntlProvider>);
    const heading = screen.getByText(formatMessage(messages.reasonHeading));
    expect(heading).toBeInTheDocument();
  });
  it('render options', () => {
    render(<IntlProvider locale="en"><ReasonPane {...props} /></IntlProvider>);
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toBeDefined();
    expect(radioButtons.length).toBe(11);
  });
  it('render cancel button', () => {
    render(<IntlProvider locale="en"><ReasonPane {...props} hasReason={false} /></IntlProvider>);
    const skipButton = screen.getByRole('button', { name: formatMessage(messages.confirmCancel) });
    expect(skipButton).toBeInTheDocument();
  });
  it('render submit button', () => {
    render(<IntlProvider locale="en"><ReasonPane {...props} hasReason={false} /></IntlProvider>);
    const submitButton = screen.getByRole('button', { name: formatMessage(messages.reasonSubmit) });
    expect(submitButton).toBeInTheDocument();
  });
});
