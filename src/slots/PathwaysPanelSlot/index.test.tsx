import { render, screen } from '@testing-library/react';

import { PathwaysPanel } from '@src/containers/PathwaysPanel';
import { pathwaysByCategory } from '@src/data/services/lms/__mocks__/pathways';
import PathwaysPanelSlot from '.';

jest.mock('@src/containers/PathwaysPanel', () => ({
  PathwaysPanel: jest.fn(() => <div>PathwaysPanel</div>),
}));

describe('PathwaysPanelSlot', () => {
  it('renders the pathways panel with the pathways as its default content', () => {
    render(<PathwaysPanelSlot pathwaysByCategory={pathwaysByCategory} />);
    expect(screen.getByText('PathwaysPanel')).toBeInTheDocument();
    expect(PathwaysPanel).toHaveBeenCalledWith({ pathwaysByCategory }, expect.anything());
  });
});
