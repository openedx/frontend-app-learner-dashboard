import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { CardImage } from './CardImage';

const messages = {
  bannerAlt: { id: 'test.bannerAlt', defaultMessage: 'Course banner' },
  verifiedHoverDescription: { id: 'test.verifiedHoverDescription', defaultMessage: 'Verified description' },
  verifiedBanner: { id: 'test.verifiedBanner', defaultMessage: 'Verified' },
  verifiedBannerRibbonAlt: { id: 'test.verifiedBannerRibbonAlt', defaultMessage: 'Verified ribbon' },
};

const renderCardImage = (props = {}) => render(
  <IntlProvider locale="en">
    <CardImage messages={messages} {...props} />
  </IntlProvider>,
);

describe('CardImage', () => {
  it('renders the banner image', () => {
    renderCardImage({ bannerImgSrc: '/image.png' });
    const image = screen.getByRole('img', { name: messages.bannerAlt.defaultMessage });
    expect(image).toBeInTheDocument();
  });

  it('does not render the verified ribbon by default', () => {
    renderCardImage();
    expect(screen.queryByText(messages.verifiedBanner.defaultMessage)).not.toBeInTheDocument();
  });

  it('renders the verified ribbon when isVerified is true', () => {
    renderCardImage({ isVerified: true });
    expect(screen.getByText(messages.verifiedBanner.defaultMessage)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: messages.verifiedBannerRibbonAlt.defaultMessage })).toBeInTheDocument();
  });
});
