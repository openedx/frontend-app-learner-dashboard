import { render, screen } from '@testing-library/react';
import ActionButton from '.';

import useIsCollapsed from './hooks';

jest.mock('./hooks', () => jest.fn());

jest.unmock('@openedx/paragon');

describe('ActionButton', () => {
  const props = {
    className: 'custom-class',
    children: 'Test',
  };

  it('is collapsed', async () => {
    useIsCollapsed.mockReturnValue(true);
    render(<ActionButton {...props} />);
    const button = screen.getByRole('button', { name: 'Test' });
    expect(button).toHaveClass('btn-sm', 'custom-class');
  });

  it('is not collapsed', () => {
    useIsCollapsed.mockReturnValue(false);
    render(<ActionButton {...props} />);
    const button = screen.getByRole('button', { name: 'Test' });
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass('size', 'sm');
  });
});
