import create from 'zustand';
import { UserType } from './types';

interface UserStoreType {
  user: UserType & { isAuthenticated: boolean };
  setUser: (user: UserType) => void;
  logout: () => void;
}

export const useUserStore = create<UserStoreType>((set) => ({
  user: {
    id: '',
    name: '',
    email: '',
    created_at: '',
    photoURL: '',
    isAuthenticated: false,
  },
  setUser: (user) =>
    set((state) => ({
      ...state,
      user: { ...user, isAuthenticated: true },
    })),
  logout: () =>
    set((state) => ({
      ...state,
      user: {
        id: '',
        name: '',
        email: '',
        created_at: '',
        photoURL: '',
        isAuthenticated: false,
      },
    })),
}));
