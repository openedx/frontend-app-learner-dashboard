import { useBackedData } from './BackedDataProvider';
import { MasqueradeProvider, useMasquerade } from './MasqueradeProvider';
import { FiltersProvider, useFilters } from './FiltersProvider';
import { SelectSessionModalProvider, useSelectSessionModal } from './SelectSessionProvider';

interface ContextProvidersProps {
  children: React.ReactNode,
}

const ContextProviders = ({ children }: ContextProvidersProps) => (
  <FiltersProvider>
    <SelectSessionModalProvider>
      {children}
    </SelectSessionModalProvider>
  </FiltersProvider>
);

export {
  MasqueradeProvider, useBackedData, useMasquerade, useFilters, useSelectSessionModal,
};
export default ContextProviders;
