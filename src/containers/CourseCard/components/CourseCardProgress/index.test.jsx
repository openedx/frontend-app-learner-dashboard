import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import CourseCardProgress from './index';
import useCardProgressData from './hooks';

jest.mock('./hooks');

const cardId = 'test-card-id';

const defaultProps = {
  cardId,
};

const mockProgressData = {
  shouldRender: true,
  progress: 75,
  loading: false,
  variant: 'success',
  progressLabel: 'Course Progress',
  loadingLabel: 'loading...',
};

const CourseCardProgressWrapper = (props) => (
  <IntlProvider locale="en">
    <CourseCardProgress {...props} />
  </IntlProvider>
);

describe('CourseCardProgress', () => {
  beforeEach(() => {
    useCardProgressData.mockReturnValue(mockProgressData);
  });

  it('renders progress bar when shouldRender is true', () => {
    render(<CourseCardProgressWrapper {...defaultProps} />);

    expect(screen.getByTestId('CourseCardProgress')).toBeInTheDocument();
    expect(screen.getByText('Course Progress')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('does not render when shouldRender is false', () => {
    useCardProgressData.mockReturnValue({
      ...mockProgressData,
      shouldRender: false,
    });

    render(<CourseCardProgressWrapper {...defaultProps} />);

    expect(screen.queryByTestId('CourseCardProgress')).not.toBeInTheDocument();
  });

  it('shows loading indicator when loading', () => {
    useCardProgressData.mockReturnValue({
      ...mockProgressData,
      loading: true,
    });

    render(<CourseCardProgressWrapper {...defaultProps} />);

    expect(screen.getByText('(loading...)')).toBeInTheDocument();
  });

  it('calls useCardProgressData with correct cardId', () => {
    render(<CourseCardProgressWrapper {...defaultProps} />);

    expect(useCardProgressData).toHaveBeenCalledWith({ cardId });
  });
});