import { Navigate, Outlet } from 'react-router';
import useMe from '@/hooks/useMe';
import Loader from './Loader';

function AuthLayout() {
  const { user, isPending } = useMe();

  if (isPending) {
    return <Loader />;
  }

  return user ? <Navigate to="/" /> : <Outlet />;
}

export default AuthLayout;
