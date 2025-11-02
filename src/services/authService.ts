import api from './api';
import type { LoginRequest, LoginResponse, User } from '../types';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  signup: async (userData: User): Promise<User> => {
    const response = await api.post<User>('/auth/signup', userData);
    return response.data;
  },

  // Fetch current authenticated user's profile (includes roles)
  me: async (): Promise<User> => {
    const response = await api.get<User>('/v1/hars/user/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  setToken: (token: string) => {
    localStorage.setItem('token', token);
  },

  getUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  setUser: (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};

