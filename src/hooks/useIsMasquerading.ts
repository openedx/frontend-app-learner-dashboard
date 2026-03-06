import { useMasquerade } from '@src/data/context';
import { useInitializeLearnerHome } from '@src/data/hooks';

const useIsMasquerading = () => {
  const { masqueradeUser } = useMasquerade();
  const { isError } = useInitializeLearnerHome();
  return !!masqueradeUser && !isError;
};

export default useIsMasquerading;
