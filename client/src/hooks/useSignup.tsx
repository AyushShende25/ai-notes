/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { authApi } from '@/api/authApi';
import { SignupInput } from '@/pages/Signup';

function useSignup() {
  const navigate = useNavigate();
  const {
    mutate: signupMutation,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: SignupInput) => authApi.signup(data),

    onSuccess: () => {
      toast.success('user registered successfully');
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
  return { signupMutation, isError, isPending, error };
}
export default useSignup;
