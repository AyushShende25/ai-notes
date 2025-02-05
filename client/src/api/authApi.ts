import { LoginInput } from "@/pages/Login";
import { api } from "./axiosInstance";
import { SignupInput } from "@/pages/Signup";


export const authApi = {
  login: async (credentials: LoginInput) => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  signup: async (credentials: SignupInput) => {
    const { data } = await api.post('/auth/signup', credentials);
    return data;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },

  getCurrentUser: async () => {
    const { data } = await api.get('/users/me');
    return data;
  },
};