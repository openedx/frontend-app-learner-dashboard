// TODO: write tests
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import ProgressCategoryBubbles from './ProgressCategoryBubbles';

describe('ProgressCategoryBubbles', () => {
  it('renders the correct values for each category', () => {
    render(
      <IntlProvider>
        <ProgressCategoryBubbles inProgress={1} notStarted={2} completed={0} />
      </IntlProvider>,
    );

    expect(screen.getByTestId('completed-count')).toHaveTextContent('0');
    expect(screen.getByTestId('in-progress-count')).toHaveTextContent('1');
    expect(screen.getByTestId('remaining-count')).toHaveTextContent('2');
  });
});
