import { useMasquerade } from 'data/context/MasqueradeProvider';
import { useInitializeLearnerHome } from 'data/react-query/apiHooks';

const useIsMasquerading = () => {
  const { masqueradeUser } = useMasquerade();
  const { isError } = useInitializeLearnerHome();
  return !!masqueradeUser && !isError;
};

export { useIsMasquerading };
