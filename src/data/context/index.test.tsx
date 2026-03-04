import { render, screen } from '@testing-library/react';
import ContextProviders from './index';
import { useFilters } from './FiltersProvider';
import { useSelectSessionModal } from './SelectSessionProvider';

const TestComponent = () => {
  const filters = useFilters();
  const selectSessionModal = useSelectSessionModal();

  return (
    <div>
      <div>{filters ? 'Filters Available' : 'Filters Not Available'}</div>
      <div>{selectSessionModal ? 'SelectSession Available' : 'SelectSession Not Available'}</div>
    </div>
  );
};

describe('ContextProviders', () => {
  it('should render children', () => {
    render(
      <ContextProviders>
        <div>Test Child</div>
      </ContextProviders>,
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should provide all context providers to children', () => {
    render(
      <ContextProviders>
        <TestComponent />
      </ContextProviders>,
    );

    expect(screen.getByText('Filters Available')).toBeInTheDocument();
    expect(screen.getByText('SelectSession Available')).toBeInTheDocument();
  });

  it('should render multiple children', () => {
    render(
      <ContextProviders>
        <div>First Child</div>
        <div>Second Child</div>
        <div>Third Child</div>
      </ContextProviders>,
    );

    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
    expect(screen.getByText('Third Child')).toBeInTheDocument();
  });
});
