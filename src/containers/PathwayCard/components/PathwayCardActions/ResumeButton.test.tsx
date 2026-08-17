import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { ResumeButton } from './ResumeButton';
import messages from '../../messages';

jest.mock('containers/DashboardCard/ActionButton/hooks', () => jest.fn(() => false));

describe('ResumeButton', () => {
  it('renders the resume button', () => {
    render(<IntlProvider locale="en"><ResumeButton /></IntlProvider>);
    expect(screen.getByRole('button', { name: messages.resume.defaultMessage })).toBeInTheDocument();
  });
});
