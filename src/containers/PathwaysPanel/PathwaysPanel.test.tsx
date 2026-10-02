import { render, screen } from '@testing-library/react';

import { PathwayData } from '@src/hooks/usePathwayData';
import { PathwaysPanel } from '.';

jest.mock('./PathwaysList', () => ({
  PathwaysList: jest.fn(({ categoryLabelPlural }) => <div>PathwaysList {categoryLabelPlural}</div>),
}));

const createPathway = (id: string): PathwayData => ({
  pathway: {
    id,
    content: { displayName: `Pathway ${id}` },
    courseCount: 4,
  },
});

describe('PathwaysPanel', () => {
  it('renders a PathwaysList for each category with pathways', () => {
    render(
      <PathwaysPanel
        pathwaysByCategory={[
          { categoryLabelPlural: 'Bootcamps', pathways: [createPathway('pathway-1')] },
          { categoryLabelPlural: 'Tutorials', pathways: [createPathway('pathway-2')] },
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
          { categoryLabelPlural: 'Bootcamps', pathways: [createPathway('pathway-1')] },
          { categoryLabelPlural: 'Tutorials', pathways: [] },
        ]}
      />,
    );
    expect(screen.getByText('PathwaysList Bootcamps')).toBeInTheDocument();
    expect(screen.queryByText('PathwaysList Tutorials')).not.toBeInTheDocument();
  });

  it('does not render categories without label', () => {
    render(
      <PathwaysPanel
        pathwaysByCategory={[{ categoryLabelPlural: '', pathways: [createPathway('pathway-1')] }]}
      />,
    );
    expect(screen.queryByText(/^PathwaysList/)).not.toBeInTheDocument();
  });
});
