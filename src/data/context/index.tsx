import { BackedDataProvider, useBackedData } from './BackedDataProvider';
import { MasqueradeProvider, useMasquerade } from './MasqueradeProvider';
import { FiltersProvider, useFilters } from './FiltersProvider';
import { SelectSessionModalProvider, useSelectSessionModal } from './SelectSessionProvider';

type ContextProvidersProps = {
  children: React.ReactNode;
};

const ContextProviders = ({ children }: ContextProvidersProps) => (
  <BackedDataProvider>
    <MasqueradeProvider>
      <FiltersProvider>
        <SelectSessionModalProvider>
          {children}
        </SelectSessionModalProvider>
      </FiltersProvider>
    </MasqueradeProvider>
  </BackedDataProvider>
);

export {
  useBackedData, useMasquerade, useFilters, useSelectSessionModal,
};
export default ContextProviders;
