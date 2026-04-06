import { render, screen } from '@testing-library/react';
import ContextProviders from './index';
import { useBackedData } from './BackedDataProvider';
import { useMasquerade } from './MasqueradeProvider';
import { useFilters } from './FiltersProvider';
import { useSelectSessionModal } from './SelectSessionProvider';

const TestComponent = () => {
  const backedData = useBackedData();
  const masquerade = useMasquerade();
  const filters = useFilters();
  const selectSessionModal = useSelectSessionModal();

  return (
    <div>
      <div>{backedData ? 'BackedData Available' : 'BackedData Not Available'}</div>
      <div>{masquerade ? 'Masquerade Available' : 'Masquerade Not Available'}</div>
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

    expect(screen.getByText('BackedData Available')).toBeInTheDocument();
    expect(screen.getByText('Masquerade Available')).toBeInTheDocument();
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
