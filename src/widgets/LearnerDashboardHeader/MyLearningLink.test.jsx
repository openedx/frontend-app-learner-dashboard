import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';

import MyLearningLink from './MyLearningLink';
import messages from './messages';

describe('MyLearningLink', () => {
  it('renders the My Learning label', () => {
    render(
      <IntlProvider locale="en">
        <MyLearningLink />
      </IntlProvider>,
    );

    expect(screen.getByText(messages.myLearning.defaultMessage)).toBeInTheDocument();
  });
});
