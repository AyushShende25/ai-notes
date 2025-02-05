import { authApi } from '@/api/authApi';
import { useQuery } from '@tanstack/react-query';

function useMe() {
  const {
    data: user,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['user'],
    queryFn: authApi.getCurrentUser,
    retry: false,
  });
  return { user, error, isError, isPending };
}
export default useMe;
