import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useIsMasquerading } from 'hooks';
import { usePathwayData } from 'hooks/usePathwayData';
import { TransformedPathwayData } from 'utils/dataTransformers';
import { PathwayCardMenu } from './PathwayCardMenu';
import messages from '../messages';

jest.mock('hooks', () => ({
  useIsMasquerading: jest.fn(),
}));
jest.mock('hooks/usePathwayData', () => ({
  usePathwayData: jest.fn(),
}));

const mockUseIsMasquerading = useIsMasquerading as jest.MockedFunction<typeof useIsMasquerading>;
const mockUsePathwayData = usePathwayData as jest.MockedFunction<typeof usePathwayData>;

const renderComponent = () => render(
  <IntlProvider locale="en"><PathwayCardMenu cardId="test-card-id" /></IntlProvider>,
);

describe('PathwayCardMenu', () => {
  beforeEach(() => {
    mockUseIsMasquerading.mockReturnValue(false);
    mockUsePathwayData.mockReturnValue({ enrollment: { isEmailEnabled: false } } as unknown as TransformedPathwayData);
  });

  it('renders the dropdown toggle with the unenroll option', async () => {
    renderComponent();
    const user = userEvent.setup();
    const dropdown = screen.getByRole('button', { name: messages.dropdownAlt.defaultMessage });
    expect(dropdown).toBeInTheDocument();
    await user.click(dropdown);
    expect(screen.getByRole('button', { name: messages.unenroll.defaultMessage })).toBeInTheDocument();
  });

  it('does not render the email settings option when email is disabled', async () => {
    renderComponent();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: messages.dropdownAlt.defaultMessage }));
    expect(screen.queryByRole('button', { name: messages.emailSettings.defaultMessage })).toBeNull();
  });

  it('renders the email settings option when email is enabled', async () => {
    mockUsePathwayData.mockReturnValue({ enrollment: { isEmailEnabled: true } } as unknown as TransformedPathwayData);
    renderComponent();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: messages.dropdownAlt.defaultMessage }));
    expect(screen.getByRole('button', { name: messages.emailSettings.defaultMessage })).toBeInTheDocument();
  });

  it('disables the unenroll option while masquerading', async () => {
    mockUseIsMasquerading.mockReturnValue(true);
    renderComponent();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: messages.dropdownAlt.defaultMessage }));
    expect(screen.getByRole('button', { name: messages.unenroll.defaultMessage })).toHaveAttribute('aria-disabled', 'true');
  });
});
