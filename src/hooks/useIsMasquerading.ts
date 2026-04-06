import { useMasquerade } from 'data/context';
import { useInitializeLearnerHome } from 'data/hooks';

const useIsMasquerading = () => {
  const { masqueradeUser } = useMasquerade();
  const { isError } = useInitializeLearnerHome();
  return !!masqueradeUser && !isError;
};

export default useIsMasquerading;
