import { BackedDataProvider } from './BackedData';
import { MasqueradeProvider } from './MasqueradeProvider';
import { FiltersProvider } from './FiltersProvider';
import { SelectSessionModalProvider } from './SelectSessionProvider';

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

export default ContextProviders;
