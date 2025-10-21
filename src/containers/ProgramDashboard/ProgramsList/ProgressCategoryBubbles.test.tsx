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

    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText(0)).toBeInTheDocument();
  });
});
