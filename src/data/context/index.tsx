import type { ReactNode } from 'react';
import { MasqueradeProvider, useMasquerade } from './MasqueradeProvider';
import { FiltersProvider, useFilters } from './FiltersProvider';
import { SelectSessionModalProvider, useSelectSessionModal } from './SelectSessionProvider';

interface ContextProvidersProps {
  children: ReactNode,
}

const ContextProviders = ({ children }: ContextProvidersProps) => (
  <FiltersProvider>
    <SelectSessionModalProvider>
      {children}
    </SelectSessionModalProvider>
  </FiltersProvider>
);

export {
  MasqueradeProvider, useMasquerade, useFilters, useSelectSessionModal,
};
export default ContextProviders;
