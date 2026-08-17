import { render } from '@testing-library/react';
import { PathwayCardBanners } from './PathwayCardBanners';

describe('PathwayCardBanners', () => {
  it('renders nothing', () => {
    const { container } = render(<PathwayCardBanners />);
    expect(container).toBeEmptyDOMElement();
  });
});
