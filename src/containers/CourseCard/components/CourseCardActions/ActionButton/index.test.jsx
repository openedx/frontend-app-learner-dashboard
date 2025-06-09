import { render } from '@testing-library/react';
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
    const { getByRole } = render(<ActionButton {...props} />);
    const button = getByRole('button', { name: 'Test' });
    expect(button).toHaveClass('btn-sm', 'custom-class');
  });

  it('is not collapsed', () => {
    useIsCollapsed.mockReturnValue(false);
    const { getByRole } = render(<ActionButton {...props} />);
    const button = getByRole('button', { name: 'Test' });
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass('size', 'sm');
  });
});
