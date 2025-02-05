/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { authApi } from '@/api/authApi';
import { LoginInput } from '@/pages/Login';

function useLogin() {
  const navigate = useNavigate();

  const {
    mutate: loginMutation,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: () => {
      toast.success('login success');
      navigate('/');
    },
    onError: (error: any) => {
      if (Array.isArray((error as any).response.data.errors)) {
        (error as any).response.data.errors.forEach((el: any) =>
          toast.error(el.message)
        );
      } else {
        toast.error((error as any).response.data.message);
      }
    },
  });
  return { loginMutation, isError, error, isPending };
}

export default useLogin;
