import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import CourseCard from '.';

const namesMockComponents = [
  'CourseCardBanners',
  'CourseCardImage',
  'CourseCardMenu',
  'CourseCardActions',
  'CourseCardDetails',
  'CourseCardMeta',
  'CourseCardTitle',
];

jest.mock('./components/CourseCardBanners', () => jest.fn(() => <div>CourseCardBanners</div>));
jest.mock('./components/CourseCardImage', () => jest.fn(() => <div>CourseCardImage</div>));
jest.mock('./components/CourseCardMenu', () => jest.fn(() => <div>CourseCardMenu</div>));
jest.mock('./components/CourseCardActions', () => jest.fn(() => <div>CourseCardActions</div>));
jest.mock('./components/CourseCardDetails', () => jest.fn(() => <div>CourseCardDetails</div>));
jest.mock('./components/CourseCardMeta', () => jest.fn(() => <div>CourseCardMeta</div>));
jest.mock('./components/CourseCardTitle', () => jest.fn(() => <div>CourseCardTitle</div>));

const cardId = 'test-card-id';

describe('CourseCard component', () => {
  it('renders vertically, with card id on the wrapper', () => {
    render(<IntlProvider locale="en"><CourseCard cardId={cardId} /></IntlProvider>);
    expect(screen.getByTestId('CourseCard')).toHaveAttribute('id', cardId);
  });
  it('renders courseCard child components', () => {
    render(<IntlProvider locale="en"><CourseCard cardId={cardId} /></IntlProvider>);
    namesMockComponents.map((courseCardName) => {
      const courseCardComponent = screen.getByText(courseCardName);
      return expect(courseCardComponent).toBeInTheDocument();
    });
  });
});
