import { render, screen } from '@testing-library/react';

import { PathwayData } from '@src/hooks/usePathwayData';
import { PathwaysPanel } from '.';

jest.mock('./PathwaysList', () => ({
  PathwaysList: jest.fn(({ categoryLabelPlural }) => <div>PathwaysList {categoryLabelPlural}</div>),
}));

const createPathway = (id: string, categoryLabelPlural: string): PathwayData => ({
  pathway: {
    id,
    content: { displayName: `Pathway ${id}` },
    itemCount: 4,
    category: categoryLabelPlural.toLowerCase(),
    categoryLabel: categoryLabelPlural.slice(0, -1),
    categoryBackgroundColor: '#FCE4F3',
    categoryTextColor: '#9B1766',
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
});
