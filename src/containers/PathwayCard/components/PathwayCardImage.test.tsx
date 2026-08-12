import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { usePathwayData } from 'hooks/usePathwayData';
import { TransformedPathwayData } from 'utils/dataTransformers';
import { PathwayCardImage } from './PathwayCardImage';
import messages from '../messages';

jest.mock('hooks/usePathwayData', () => ({
  usePathwayData: jest.fn(),
}));

const mockUsePathwayData = usePathwayData as jest.MockedFunction<typeof usePathwayData>;

const renderComponent = () => render(
  <IntlProvider locale="en"><PathwayCardImage cardId="test-card-id" orientation="horizontal" /></IntlProvider>,
);

describe('PathwayCardImage', () => {
  it('renders the banner image and links to the pathway home url', () => {
    mockUsePathwayData.mockReturnValue({
      pathway: { imageUrl: '/image.png' },
      pathwayRun: { homeUrl: '/pathway-home' },
    } as unknown as TransformedPathwayData);
    renderComponent();
    const image = screen.getByRole('img', { name: messages.bannerAlt.defaultMessage });
    expect(image).toBeInTheDocument();
    expect(image.closest('a')).toHaveAttribute('href', '/pathway-home');
  });
});
