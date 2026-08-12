import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { usePathwayData } from 'hooks/usePathwayData';
import { TransformedPathwayData } from 'utils/dataTransformers';
import { ViewPathwayButton } from './ViewPathwayButton';
import messages from '../../messages';

jest.mock('hooks/usePathwayData', () => ({
  usePathwayData: jest.fn(),
}));
jest.mock('containers/DashboardCard/ActionButton/hooks', () => jest.fn(() => false));

const mockUsePathwayData = usePathwayData as jest.MockedFunction<typeof usePathwayData>;

describe('ViewPathwayButton', () => {
  it('renders a link to the pathway home url', () => {
    mockUsePathwayData.mockReturnValue({ pathwayRun: { homeUrl: '/pathway-home' } } as unknown as TransformedPathwayData);
    render(<IntlProvider locale="en"><ViewPathwayButton cardId="test-card-id" /></IntlProvider>);
    const button = screen.getByRole('button', { name: messages.viewPathway.defaultMessage });
    expect(button).toHaveAttribute('href', '/pathway-home');
  });
});
