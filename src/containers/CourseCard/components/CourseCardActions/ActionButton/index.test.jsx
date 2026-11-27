import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { LocationDisplay } from '@src/testUtils';
import ActionButton from '.';

import useIsCollapsed from './hooks';

jest.mock('./hooks', () => jest.fn());

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

  describe('as a link', () => {
    const renderLink = (linkProps) => render(
      <MemoryRouter>
        <ActionButton {...props} as="a" {...linkProps} />
        <LocationDisplay />
      </MemoryRouter>,
    );

    beforeEach(() => {
      useIsCollapsed.mockReturnValue(false);
    });

    it('navigates in the client for a path in this site', async () => {
      const onClick = jest.fn();
      renderLink({ href: '/learning/course', onClick });
      await userEvent.click(screen.getByRole('link', { name: 'Test' }));
      expect(onClick).toHaveBeenCalled();
      expect(screen.getByTestId('location')).toHaveTextContent('/learning/course');
    });

    it('stays a plain anchor for any other url', () => {
      renderLink({ href: 'http://lms.example.com/course' });
      expect(screen.getByRole('link', { name: 'Test' })).toHaveAttribute('href', 'http://lms.example.com/course');
    });

    it('stays a plain, disabled anchor when disabled', async () => {
      renderLink({ href: '/learning/course', disabled: true });
      const link = screen.getByRole('link', { name: 'Test' });
      expect(link).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(link);
      expect(screen.getByTestId('location')).toHaveTextContent('/');
      expect(screen.getByTestId('location')).not.toHaveTextContent('/learning/course');
    });
  });
});
