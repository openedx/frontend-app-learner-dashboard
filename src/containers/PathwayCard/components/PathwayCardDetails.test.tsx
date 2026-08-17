import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { usePathwayData } from 'hooks/usePathwayData';
import { TransformedPathwayData } from 'utils/dataTransformers';
import { PathwayCardDetails } from './PathwayCardDetails';
import messages from '../messages';

jest.mock('hooks/usePathwayData', () => ({
  usePathwayData: jest.fn(),
}));

const mockUsePathwayData = usePathwayData as jest.MockedFunction<typeof usePathwayData>;

const renderComponent = () => render(
  <IntlProvider locale="en"><PathwayCardDetails cardId="test-card-id" /></IntlProvider>,
);

describe('PathwayCardDetails', () => {
  it('renders provider name and course count', () => {
    mockUsePathwayData.mockReturnValue({
      provider: { name: 'edX' },
      pathway: { courseCount: 3 },
    } as unknown as TransformedPathwayData);
    renderComponent();
    expect(screen.getByText(/edX/)).toBeInTheDocument();
    expect(screen.getByText(/3 courses/)).toBeInTheDocument();
  });

  it('renders the unknown provider fallback when provider name is missing', () => {
    mockUsePathwayData.mockReturnValue({
      provider: undefined,
      pathway: { courseCount: 1 },
    } as unknown as TransformedPathwayData);
    renderComponent();
    expect(screen.getByText(new RegExp(messages.unknownProviderName.defaultMessage))).toBeInTheDocument();
    expect(screen.getByText(/1 course\b/)).toBeInTheDocument();
  });
});
