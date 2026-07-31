import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import useProgressSummaryData from './hooks';
import ProgressSummaryWidget from '.';
import messages from './messages';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const renderWidget = () => render(
  <IntlProvider locale="en"><ProgressSummaryWidget /></IntlProvider>,
);

describe('ProgressSummaryWidget', () => {
  it('renders nothing when there are no courses', () => {
    useProgressSummaryData.mockReturnValue({
      total: 0, completed: 0, inProgress: 0, overallProgress: 0, totalTimeSpent: 0,
    });
    const { container } = renderWidget();
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the heading and stats when courses exist', () => {
    useProgressSummaryData.mockReturnValue({
      total: 5, completed: 3, inProgress: 2, overallProgress: 60, totalTimeSpent: 5400,
    });
    renderWidget();
    expect(screen.getByText(messages.title.defaultMessage)).toBeInTheDocument();
    expect(screen.getByTestId('overall-progress-value')).toHaveTextContent('60%');
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('1h 30m')).toBeInTheDocument();
    expect(screen.getByText(messages.inProgress.defaultMessage)).toBeInTheDocument();
    expect(screen.getByText(messages.completed.defaultMessage)).toBeInTheDocument();
    expect(screen.getByText(messages.totalTimeSpent.defaultMessage)).toBeInTheDocument();
  });
});
