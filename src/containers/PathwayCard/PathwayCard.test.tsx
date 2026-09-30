import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';

import { ItemBadge } from '@src/components/ItemBadge';
import { PathwayData } from '@src/hooks/usePathwayData';
import { PathwayCard } from '.';

jest.mock('@src/components/ItemBadge', () => ({
  ItemBadge: jest.fn(() => <div>ItemBadge</div>),
}));

const defaultPathway: PathwayData = {
  pathway: {
    id: 'pathway-1',
    content: { displayName: 'Test Pathway' },
    courseCount: 6,
    category: 'tutorial',
    categoryLabel: 'Tutorial',
    categoryBackgroundColor: '#FCE4F3',
    categoryTextColor: '#9B1766',
  },
  progress: {
    completedCourseCount: 2,
  },
  provider: {
    name: 'Test Provider',
  },
};

const renderComponent = (pathway: PathwayData = defaultPathway) => render(
  <IntlProvider locale="en"><PathwayCard pathway={pathway} /></IntlProvider>,
);

describe('PathwayCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pathway title and provider name', () => {
    renderComponent();
    expect(screen.getByText('Test Pathway')).toBeInTheDocument();
    expect(screen.getByText('Test Provider')).toBeInTheDocument();
  });

  it('renders progress with completed and total course count', () => {
    renderComponent();
    expect(screen.getByText('2/6 complete')).toBeInTheDocument();
  });

  it('defaults completed count to 0 when there is no progress', () => {
    renderComponent({ ...defaultPathway, progress: undefined });
    expect(screen.getByText('0/6 complete')).toBeInTheDocument();
  });

  it('does not render provider name when there is no provider', () => {
    renderComponent({ ...defaultPathway, provider: undefined });
    expect(screen.getByText('Test Pathway')).toBeInTheDocument();
    expect(screen.queryByText('Test Provider')).not.toBeInTheDocument();
  });

  it('renders ItemBadge with category props when categoryLabel is set', () => {
    renderComponent();
    expect(screen.getByText('ItemBadge')).toBeInTheDocument();
    expect(ItemBadge).toHaveBeenCalledWith(
      {
        categoryLabel: 'Tutorial',
        categoryBackgroundColor: '#FCE4F3',
        categoryTextColor: '#9B1766',
      },
      expect.anything(),
    );
  });

  it('does not render ItemBadge when there is no categoryLabel', () => {
    renderComponent({
      ...defaultPathway,
      pathway: { ...defaultPathway.pathway, categoryLabel: undefined },
    });
    expect(screen.queryByText('ItemBadge')).not.toBeInTheDocument();
    expect(ItemBadge).not.toHaveBeenCalled();
  });
});
