import { render, screen } from '@testing-library/react';

import { usePathwayData } from 'hooks/usePathwayData';
import { TransformedPathwayData } from 'utils/dataTransformers';
import { PathwayCardTitle } from './PathwayCardTitle';

jest.mock('hooks/usePathwayData', () => ({
  usePathwayData: jest.fn(),
}));

const mockUsePathwayData = usePathwayData as jest.MockedFunction<typeof usePathwayData>;

describe('PathwayCardTitle', () => {
  it('renders the pathway name linking to its home url', () => {
    mockUsePathwayData.mockReturnValue({
      pathway: { content: { displayName: 'Test Pathway' } },
      pathwayRun: { homeUrl: '/pathway-home' },
    } as unknown as TransformedPathwayData);
    render(<PathwayCardTitle cardId="test-card-id" />);
    const title = screen.getByTestId('PathwayCardTitle');
    expect(title).toHaveTextContent('Test Pathway');
    expect(title).toHaveAttribute('href', '/pathway-home');
  });
});
