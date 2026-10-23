import { render, screen } from '@testing-library/react';

import { PathwayCard } from '@src/containers/PathwayCard';
import { PathwayData } from '@src/hooks/usePathwayData';
import { PathwaysList } from './PathwaysList';

jest.mock('@src/containers/PathwayCard', () => ({
  PathwayCard: jest.fn(({ pathway }) => <div>PathwayCard {pathway.pathway.id}</div>),
}));

const createPathway = (id: string): PathwayData => ({
  pathway: {
    id,
    content: { displayName: `Pathway ${id}` },
    courseCount: 4,
  },
});

const pathways = [
  createPathway('pathway-1'),
  createPathway('pathway-2'),
  createPathway('pathway-3'),
];

describe('PathwaysList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the category label', () => {
    render(<PathwaysList categoryLabelPlural="Bootcamps" pathways={pathways} />);
    expect(screen.getByText('Bootcamps')).toBeInTheDocument();
  });

  it('renders a PathwayCard for each pathway', () => {
    render(<PathwaysList categoryLabelPlural="Bootcamps" pathways={pathways} />);
    expect(screen.getAllByText(/^PathwayCard/)).toHaveLength(pathways.length);
    pathways.forEach((pathway, index) => {
      expect(screen.getByText(`PathwayCard ${pathway.pathway.id}`)).toBeInTheDocument();
      expect(PathwayCard).toHaveBeenNthCalledWith(index + 1, { pathway }, expect.anything());
    });
  });
});
