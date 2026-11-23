import { render, screen } from '@testing-library/react';

import { CategoryBadge } from './CategoryBadge';

describe('CategoryBadge', () => {
  it('renders the category label with the category colors', () => {
    render(
      <CategoryBadge
        categoryLabel="Tutorial"
        categoryBackgroundColor="#FCE4F3"
        categoryTextColor="#9B1766"
      />,
    );
    const badge = screen.getByText('Tutorial');
    expect(badge).toHaveClass('p-1.5');
    expect(badge).toHaveStyle({ backgroundColor: '#FCE4F3', color: '#9B1766' });
  });
});
