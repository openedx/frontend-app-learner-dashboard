import { render, screen } from '@testing-library/react';

import { PathwayData } from '@src/hooks/usePathwayData';
import { PathwaysPanel } from '.';

jest.mock('./PathwaysList', () => ({
  PathwaysList: jest.fn(({ categoryLabelPlural }) => <div>PathwaysList {categoryLabelPlural}</div>),
}));

const createPathway = (id: string, categoryLabelPlural?: string): PathwayData => ({
  pathway: {
    id,
    content: { displayName: `Pathway ${id}` },
    courseCount: 4,
    categoryLabelPlural,
  },
});

describe('PathwaysPanel', () => {
  it('renders a PathwaysList for each category with pathways', () => {
    render(
      <PathwaysPanel
        pathwaysByCategory={[
          { pathways: [createPathway('pathway-1', 'Bootcamps')] },
          { pathways: [createPathway('pathway-2', 'Tutorials')] },
        ]}
      />,
    );
    expect(screen.getByText('PathwaysList Bootcamps')).toBeInTheDocument();
    expect(screen.getByText('PathwaysList Tutorials')).toBeInTheDocument();
  });

  it('does not render categories without pathways', () => {
    render(
      <PathwaysPanel
        pathwaysByCategory={[
          { pathways: [createPathway('pathway-1', 'Bootcamps')] },
          { pathways: [] },
        ]}
      />,
    );
    expect(screen.getByText('PathwaysList Bootcamps')).toBeInTheDocument();
    expect(screen.getAllByText(/^PathwaysList/)).toHaveLength(1);
  });

  it('does not render categories without label', () => {
    render(
      <PathwaysPanel
        pathwaysByCategory={[{ pathways: [createPathway('pathway-1')] }]}
      />,
    );
    expect(screen.queryByText(/^PathwaysList/)).not.toBeInTheDocument();
  });
});
