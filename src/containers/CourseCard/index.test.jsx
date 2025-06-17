import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import CourseCard from '.';
import hooks from './hooks';

jest.mock('./hooks', () => ({
  useIsCollapsed: jest.fn(),
}));

const namesMockComponents = [
  'CourseCardBanners',
  'CourseCardImage',
  'CourseCardMenu',
  'CourseCardActions',
  'CourseCardDetails',
  'CourseCardTitle',
];

jest.mock('./components/CourseCardBanners', () => jest.fn(() => <div>CourseCardBanners</div>));
jest.mock('./components/CourseCardImage', () => jest.fn(() => <div>CourseCardImage</div>));
jest.mock('./components/CourseCardMenu', () => jest.fn(() => <div>CourseCardMenu</div>));
jest.mock('./components/CourseCardActions', () => jest.fn(() => <div>CourseCardActions</div>));
jest.mock('./components/CourseCardDetails', () => jest.fn(() => <div>CourseCardDetails</div>));
jest.mock('./components/CourseCardTitle', () => jest.fn(() => <div>CourseCardTitle</div>));

const cardId = 'test-card-id';

describe('CourseCard component', () => {
  it('collapsed', () => {
    hooks.useIsCollapsed.mockReturnValueOnce(true);
    render(<IntlProvider locale="en"><CourseCard cardId={cardId} /></IntlProvider>);
    const cardImage = screen.getByText('CourseCardImage');
    expect(cardImage.parentElement).not.toHaveClass('d-flex');
  });
  it('not collapsed', () => {
    hooks.useIsCollapsed.mockReturnValueOnce(false);
    render(<IntlProvider locale="en"><CourseCard cardId={cardId} /></IntlProvider>);
    const cardImage = screen.getByText('CourseCardImage');
    expect(cardImage.parentElement).toHaveClass('d-flex');
  });
  it('renders courseCard child components', () => {
    hooks.useIsCollapsed.mockReturnValueOnce(false);
    render(<IntlProvider locale="en"><CourseCard cardId={cardId} /></IntlProvider>);
    namesMockComponents.map((courseCardName) => {
      const courseCardComponent = screen.getByText(courseCardName);
      return expect(courseCardComponent).toBeInTheDocument();
    });
  });
});
