import { render, screen } from '@testing-library/react';
import Banner from './Banner';

describe('Banner component', () => {
  it('renders children content', () => {
    render(<Banner>Test content</Banner>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('uses default props correctly', () => {
    render(<Banner>Test content</Banner>);
    const banner = screen.getByRole('alert');
    expect(banner).toHaveClass('mb-0');
  });

  it('accepts custom variant prop', () => {
    render(<Banner variant="success">Test content</Banner>);
    const banner = screen.getByRole('alert');
    expect(banner).toHaveClass('alert-success');
  });

  it('accepts custom className prop', () => {
    render(<Banner className="custom-class">Test content</Banner>);
    const banner = screen.getByRole('alert');
    expect(banner).toHaveClass('custom-class');
  });
});
