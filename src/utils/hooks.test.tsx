import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { useFormatDate } from './hooks';
import dateFormatter from './dateFormatter';

jest.mock('./dateFormatter');
const TestComponent = ({ date }: { date: Date | string }) => {
  const formatDate = useFormatDate();
  const formattedDate = formatDate(date);

  return <div>{formattedDate}</div>;
};

const renderWithIntl = (component: React.ReactNode) => render(
  <IntlProvider locale="en" messages={{}}>
    {component}
  </IntlProvider>,
);

describe('useFormatDate hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call dateFormatter with formatDate function and date', () => {
    const mockDate = new Date('2024-01-15');
    const mockFormattedDate = 'January 15, 2024';

    (dateFormatter as jest.Mock).mockReturnValue(mockFormattedDate);

    const { getByText } = renderWithIntl(<TestComponent date={mockDate} />);

    expect(dateFormatter).toHaveBeenCalledWith(
      expect.any(Function),
      mockDate,
    );
    expect(getByText(mockFormattedDate)).toBeInTheDocument();
  });

  it('should handle different date formats', () => {
    const stringDate = '2024-12-25';
    const mockFormattedDate = 'December 25, 2024';

    (dateFormatter as jest.Mock).mockReturnValue(mockFormattedDate);

    const { getByText } = renderWithIntl(<TestComponent date={stringDate} />);

    expect(dateFormatter).toHaveBeenCalledWith(
      expect.any(Function),
      stringDate,
    );
    expect(getByText(mockFormattedDate)).toBeInTheDocument();
  });
});
