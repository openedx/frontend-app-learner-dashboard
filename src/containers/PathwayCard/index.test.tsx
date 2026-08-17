import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useIsCollapsed } from 'containers/DashboardCard/hooks';
import { PathwayCard } from '.';

jest.mock('containers/DashboardCard/hooks', () => ({
  useIsCollapsed: jest.fn(),
}));

jest.mock('./components/PathwayCardImage', () => ({ PathwayCardImage: jest.fn(() => <div>PathwayCardImage</div>) }));
jest.mock('./components/PathwayCardTitle', () => ({ PathwayCardTitle: jest.fn(() => <div>PathwayCardTitle</div>) }));
jest.mock('./components/PathwayCardDetails', () => ({
  PathwayCardDetails: jest.fn(() => <div>PathwayCardDetails</div>),
}));
jest.mock('./components/PathwayCardBanners', () => ({
  PathwayCardBanners: jest.fn(() => <div>PathwayCardBanners</div>),
}));
jest.mock('./components/PathwayCardActions', () => ({
  PathwayCardActions: jest.fn(() => <div>PathwayCardActions</div>),
}));
jest.mock('./components/PathwayHeaderActions', () => ({
  PathwayHeaderActions: jest.fn(() => <div>PathwayHeaderActions</div>),
}));

const mockUseIsCollapsed = useIsCollapsed as jest.MockedFunction<typeof useIsCollapsed>;

const cardId = 'test-card-id';

describe('PathwayCard', () => {
  it('renders all child components', () => {
    mockUseIsCollapsed.mockReturnValue(false);
    render(<IntlProvider locale="en"><PathwayCard cardId={cardId} /></IntlProvider>);
    ['PathwayCardImage', 'PathwayCardTitle', 'PathwayCardDetails', 'PathwayCardBanners', 'PathwayCardActions', 'PathwayHeaderActions'].forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
    expect(screen.getByTestId('PathwayCard')).toHaveAttribute('id', cardId);
  });

  it('applies collapsed layout when useIsCollapsed is true', () => {
    mockUseIsCollapsed.mockReturnValue(true);
    render(<IntlProvider locale="en"><PathwayCard cardId={cardId} /></IntlProvider>);
    const cardImage = screen.getByText('PathwayCardImage');
    expect(cardImage.parentElement).not.toHaveClass('d-flex');
  });

  it('applies non-collapsed layout when useIsCollapsed is false', () => {
    mockUseIsCollapsed.mockReturnValue(false);
    render(<IntlProvider locale="en"><PathwayCard cardId={cardId} /></IntlProvider>);
    const cardImage = screen.getByText('PathwayCardImage');
    expect(cardImage.parentElement).toHaveClass('d-flex');
  });
});
