import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';

import messages from '../messages';
import { CourseHeaderActions } from './CourseHeaderActions';

jest.mock('./CourseCardMenu', () => jest.fn(() => <div>CourseCardMenu</div>));

const renderComponent = () => render(
  <IntlProvider locale="en"><CourseHeaderActions cardId="test-card-id" /></IntlProvider>,
);

describe('CourseHeaderActions', () => {
  it('renders the course badge and the course card menu', () => {
    renderComponent();
    expect(screen.getByText(messages.courseBadge.defaultMessage)).toBeInTheDocument();
    expect(screen.getByText('CourseCardMenu')).toBeInTheDocument();
  });
});
