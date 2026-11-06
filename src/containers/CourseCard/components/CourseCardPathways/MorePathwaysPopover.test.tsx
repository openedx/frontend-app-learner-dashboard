import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@openedx/frontend-base';

import { PathwayData } from '@src/hooks/usePathwayData';
import { MorePathwaysPopover } from './MorePathwaysPopover';

const customColorPathway: PathwayData = {
  pathway: {
    id: 'pathway-1',
    content: { displayName: 'Introduction to Machine Learning' },
    itemCount: 12,
    categoryTextColor: '#9B1766',
  },
};

const defaultColorPathway: PathwayData = {
  pathway: {
    id: 'pathway-2',
    content: { displayName: 'Data Engineering Fundamentals' },
    itemCount: 6,
  },
};

const renderComponent = () => render(
  <IntlProvider locale="en">
    <MorePathwaysPopover pathways={[customColorPathway, defaultColorPathway]} />
  </IntlProvider>,
);

describe('MorePathwaysPopover', () => {
  it('renders the trigger with the number of pathways and an accessible label', () => {
    renderComponent();
    const trigger = screen.getByRole('button', { name: 'Show 2 more pathways' });
    expect(trigger).toHaveTextContent('2');
  });

  it('shows the pathways only when the trigger is clicked', async () => {
    const user = userEvent.setup();
    renderComponent();
    expect(screen.queryByText('Introduction to Machine Learning')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Show 2 more pathways' }));
    expect(screen.getByText('Introduction to Machine Learning')).toBeInTheDocument();
    expect(screen.getByText('Data Engineering Fundamentals')).toBeInTheDocument();
  });
});
