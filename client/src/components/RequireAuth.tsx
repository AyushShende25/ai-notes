import useMe from '@/hooks/useMe';
import Loader from './Loader';
import { Navigate, Outlet } from 'react-router';

function RequireAuth() {
  const { user, isPending } = useMe();

  if (isPending) {
    return <Loader />;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
}
export default RequireAuth;
