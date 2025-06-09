import { render } from '@testing-library/react';
import Banner from './Banner';

jest.unmock('@openedx/paragon');
jest.unmock('react');

describe('Banner component', () => {
  it('renders children content', () => {
    const { getByText } = render(<Banner>Test content</Banner>);
    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('uses default props correctly', () => {
    const { container } = render(<Banner>Test content</Banner>);
    expect(container.firstElementChild).toHaveClass('mb-0');
  });

  it('accepts custom variant prop', () => {
    const { getByRole } = render(<Banner variant="success">Test content</Banner>);
    const alert = getByRole('alert');
    expect(alert).toHaveClass('alert-success');
  });

  it('accepts custom className prop', () => {
    const { getByRole } = render(<Banner className="custom-class">Test content</Banner>);
    const alert = getByRole('alert');
    expect(alert).toHaveClass('custom-class');
  });
});
