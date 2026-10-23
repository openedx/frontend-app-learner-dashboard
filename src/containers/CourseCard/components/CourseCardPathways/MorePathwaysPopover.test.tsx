import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@openedx/frontend-base';

import { PathwayData } from '@src/hooks/usePathwayData';
import { MorePathwaysPopover } from './MorePathwaysPopover';

const customColorPathway: PathwayData = {
  pathway: {
    id: 'pathway-1',
    content: { displayName: 'Introduction to Machine Learning' },
    courseCount: 12,
    categoryTextColor: '#9B1766',
  },
};

const defaultColorPathway: PathwayData = {
  pathway: {
    id: 'pathway-2',
    content: { displayName: 'Data Engineering Fundamentals' },
    courseCount: 6,
  },
};

const renderComponent = (pathways: PathwayData[] = [customColorPathway, defaultColorPathway]) => render(
  <IntlProvider locale="en">
    <MorePathwaysPopover pathways={pathways} />
  </IntlProvider>,
);

describe('MorePathwaysPopover', () => {
  it('renders the trigger with the number of pathways and an accessible label', () => {
    renderComponent();
    const trigger = screen.getByRole('button', { name: 'Show 2 more pathways' });
    expect(trigger).toHaveTextContent('2');
  });

  it('uses the singular accessible label for a single pathway', () => {
    renderComponent([customColorPathway]);
    expect(screen.getByRole('button', { name: 'Show 1 more pathway' })).toBeInTheDocument();
  });

  it('does not show the pathways until the trigger is clicked', () => {
    renderComponent();
    expect(screen.queryByText('Introduction to Machine Learning')).not.toBeInTheDocument();
  });

  it('shows the pathways when the trigger is clicked', async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByRole('button', { name: 'Show 2 more pathways' }));
    expect(screen.getByText('Introduction to Machine Learning')).toBeInTheDocument();
    expect(screen.getByText('Data Engineering Fundamentals')).toBeInTheDocument();
  });

  it('colors each pathway with its category text color, or the default color', async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByRole('button', { name: 'Show 2 more pathways' }));

    const customColorItem = screen.getByText('Introduction to Machine Learning');
    expect(customColorItem).toHaveStyle({ color: '#9B1766' });
    expect(customColorItem).not.toHaveClass('text-info-800');

    expect(screen.getByText('Data Engineering Fundamentals')).toHaveClass('text-info-800');
  });

  it('closes the pathways list on Escape', async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByRole('button', { name: 'Show 2 more pathways' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByText('Introduction to Machine Learning')).not.toBeInTheDocument();
  });
});
