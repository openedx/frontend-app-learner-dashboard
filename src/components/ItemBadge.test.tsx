import { render, screen } from '@testing-library/react';

import { useIsPathwayPilotUIEnabled } from '@src/hooks';
import { ItemBadge, ItemBadgeProps } from './ItemBadge';

jest.mock('@src/hooks', () => ({
  useIsPathwayPilotUIEnabled: jest.fn(),
}));

const mockUseIsPathwayPilotUIEnabled = useIsPathwayPilotUIEnabled as jest.MockedFunction<
  typeof useIsPathwayPilotUIEnabled
>;

const renderComponent = (props: Partial<ItemBadgeProps> = {}) => render(
  <ItemBadge categoryLabel="Tutorial" {...props} />,
);

describe('ItemBadge', () => {
  beforeEach(() => {
    mockUseIsPathwayPilotUIEnabled.mockReturnValue(true);
  });

  it('renders nothing when the pathway pilot UI is disabled', () => {
    mockUseIsPathwayPilotUIEnabled.mockReturnValue(false);
    const { container } = renderComponent();
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the category label with the default colors', () => {
    renderComponent();
    const badge = screen.getByText('Tutorial');
    expect(badge).toHaveClass('p-1.5', 'bg-info-200', 'text-info-800');
    expect(badge).not.toHaveAttribute('style');
  });

  it('renders the custom colors instead of the default ones', () => {
    renderComponent({ categoryBackgroundColor: '#FCE4F3', categoryTextColor: '#9B1766' });
    const badge = screen.getByText('Tutorial');
    expect(badge).toHaveStyle({ backgroundColor: '#FCE4F3', color: '#9B1766' });
    expect(badge).not.toHaveClass('bg-info-200');
    expect(badge).not.toHaveClass('text-info-800');
  });

  it.each([
    ['the text color is missing', { categoryBackgroundColor: '#FCE4F3' }],
    ['the background color is missing', { categoryTextColor: '#9B1766' }],
    ['a color is not valid', { categoryBackgroundColor: 'not-a-color', categoryTextColor: '#9B1766' }],
  ])('uses the default colors when %s', (_description, colors) => {
    renderComponent(colors);
    const badge = screen.getByText('Tutorial');
    expect(badge).toHaveClass('bg-info-200', 'text-info-800');
    expect(badge).not.toHaveAttribute('style');
  });

  it('uses the given class instead of the default colors', () => {
    renderComponent({ className: 'course-badge' });
    const badge = screen.getByText('Tutorial');
    expect(badge).toHaveClass('p-1.5', 'course-badge');
    expect(badge).not.toHaveClass('bg-info-200');
    expect(badge).not.toHaveClass('text-info-800');
  });
});
