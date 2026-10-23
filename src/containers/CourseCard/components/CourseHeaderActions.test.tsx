import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';

import { useIsPathwayPilotUIEnabled } from '@src/hooks';
import messages from '../messages';
import { CourseHeaderActions } from './CourseHeaderActions';

jest.mock('@src/hooks', () => ({
  useIsPathwayPilotUIEnabled: jest.fn(),
}));

jest.mock('./CourseCardMenu', () => jest.fn(() => <div>CourseCardMenu</div>));

const mockUseIsPathwayPilotUIEnabled = useIsPathwayPilotUIEnabled as jest.MockedFunction<
  typeof useIsPathwayPilotUIEnabled
>;

const renderComponent = () => render(
  <IntlProvider locale="en"><CourseHeaderActions cardId="test-card-id" /></IntlProvider>,
);

describe('CourseHeaderActions', () => {
  it('renders the course badge when the pathway pilot UI is enabled', () => {
    mockUseIsPathwayPilotUIEnabled.mockReturnValue(true);
    renderComponent();
    expect(screen.getByText(messages.courseBadge.defaultMessage)).toBeInTheDocument();
    expect(screen.getByText('CourseCardMenu')).toBeInTheDocument();
  });

  it('does not render the course badge when the pathway pilot UI is disabled', () => {
    mockUseIsPathwayPilotUIEnabled.mockReturnValue(false);
    renderComponent();
    expect(screen.queryByText(messages.courseBadge.defaultMessage)).not.toBeInTheDocument();
    expect(screen.getByText('CourseCardMenu')).toBeInTheDocument();
  });
});
