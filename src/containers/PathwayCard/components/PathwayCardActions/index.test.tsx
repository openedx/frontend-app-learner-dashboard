import { render, screen } from '@testing-library/react';

import { usePathwayData } from 'hooks/usePathwayData';
import { TransformedPathwayData } from 'utils/dataTransformers';
import { PathwayCardActions } from '.';

jest.mock('hooks/usePathwayData', () => ({
  usePathwayData: jest.fn(),
}));
jest.mock('./ViewPathwayButton', () => ({ ViewPathwayButton: jest.fn(() => <div>ViewPathwayButton</div>) }));
jest.mock('./ResumeButton', () => ({ ResumeButton: jest.fn(() => <div>ResumeButton</div>) }));
jest.mock('./BeginPathwayButton', () => ({ BeginPathwayButton: jest.fn(() => <div>BeginPathwayButton</div>) }));

const mockUsePathwayData = usePathwayData as jest.MockedFunction<typeof usePathwayData>;

const buildPathwayData = (pathwayRun: { isArchived: boolean; hasStarted: boolean }) => ({
  pathwayRun: { homeUrl: '', ...pathwayRun },
} as unknown as TransformedPathwayData);

const renderComponent = () => render(<PathwayCardActions cardId="test-card-id" />);

describe('PathwayCardActions', () => {
  it('renders ViewPathwayButton when the pathway is archived', () => {
    mockUsePathwayData.mockReturnValue(buildPathwayData({ isArchived: true, hasStarted: true }));
    renderComponent();
    expect(screen.getByText('ViewPathwayButton')).toBeInTheDocument();
    expect(screen.queryByText('ResumeButton')).toBeNull();
    expect(screen.queryByText('BeginPathwayButton')).toBeNull();
  });

  it('renders ResumeButton when the pathway has started and is not archived', () => {
    mockUsePathwayData.mockReturnValue(buildPathwayData({ isArchived: false, hasStarted: true }));
    renderComponent();
    expect(screen.getByText('ResumeButton')).toBeInTheDocument();
    expect(screen.queryByText('ViewPathwayButton')).toBeNull();
    expect(screen.queryByText('BeginPathwayButton')).toBeNull();
  });

  it('renders BeginPathwayButton when the pathway has not started and is not archived', () => {
    mockUsePathwayData.mockReturnValue(buildPathwayData({ isArchived: false, hasStarted: false }));
    renderComponent();
    expect(screen.getByText('BeginPathwayButton')).toBeInTheDocument();
    expect(screen.queryByText('ViewPathwayButton')).toBeNull();
    expect(screen.queryByText('ResumeButton')).toBeNull();
  });
});
