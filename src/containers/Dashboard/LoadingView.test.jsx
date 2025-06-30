import { render, screen } from '@testing-library/react';

import hooks from './hooks';
import LoadingView from './LoadingView';

jest.mock('./hooks', () => ({
  useDashboardMessages: jest.fn(),
}));

const spinnerScreenReaderText = 'test-sr-text';
describe('LoadingView', () => {
  it('renders spinner component with associated screen reader text', () => {
    hooks.useDashboardMessages.mockReturnValueOnce({ spinnerScreenReaderText });
    render(<LoadingView />);
    const loader = screen.getByRole('status');
    expect(loader.children[0].innerHTML).toBe(spinnerScreenReaderText);
  });
});
