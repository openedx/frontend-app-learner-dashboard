import { render, screen } from '@testing-library/react';
import { getConfig, ConfigDocument } from '@edx/frontend-platform';

import { usePathwayData } from 'hooks/usePathwayData';
import { TransformedPathwayData } from 'utils/dataTransformers';
import { PathwayHeaderActions } from './PathwayHeaderActions';

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(),
}));
jest.mock('hooks/usePathwayData', () => ({
  usePathwayData: jest.fn(),
}));
jest.mock('./PathwayCardMenu', () => ({ PathwayCardMenu: jest.fn(() => <div>PathwayCardMenu</div>) }));

const mockGetConfig = getConfig as jest.MockedFunction<typeof getConfig>;
const mockUsePathwayData = usePathwayData as jest.MockedFunction<typeof usePathwayData>;

const renderComponent = () => render(<PathwayHeaderActions cardId="test-card-id" />);

describe('PathwayHeaderActions', () => {
  it('always renders the PathwayCardMenu', () => {
    mockGetConfig.mockReturnValue({ ENABLE_PATHWAY_PILOT_UI: false } as unknown as ConfigDocument);
    mockUsePathwayData.mockReturnValue({ pathway: {} } as unknown as TransformedPathwayData);
    renderComponent();
    expect(screen.getByText('PathwayCardMenu')).toBeInTheDocument();
  });

  it('does not render the type badge when the pilot UI is disabled', () => {
    mockGetConfig.mockReturnValue({ ENABLE_PATHWAY_PILOT_UI: false } as unknown as ConfigDocument);
    mockUsePathwayData.mockReturnValue({ pathway: { categoryLabel: 'Program' } } as unknown as TransformedPathwayData);
    renderComponent();
    expect(screen.queryByText('Program')).toBeNull();
  });

  it('renders the type badge when the pilot UI is enabled and a type is set', () => {
    mockGetConfig.mockReturnValue({ ENABLE_PATHWAY_PILOT_UI: true } as unknown as ConfigDocument);
    mockUsePathwayData.mockReturnValue({ pathway: { categoryLabel: 'Program' } } as unknown as TransformedPathwayData);
    renderComponent();
    expect(screen.getByText('Program')).toBeInTheDocument();
  });

  it('does not render the badge when categoryLabel is blank', () => {
    mockGetConfig.mockReturnValue({ ENABLE_PATHWAY_PILOT_UI: true } as unknown as ConfigDocument);
    mockUsePathwayData.mockReturnValue({ pathway: { categoryLabel: '  ' } } as unknown as TransformedPathwayData);
    renderComponent();
    expect(screen.queryByText('  ')).toBeNull();
  });
});
