import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    role: 'buyer' | 'supplier';
}

interface UserStore {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}

const removeCookie = (name: string) => {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            // We start with null to test redirection logic
            user: null,

            setUser: (user) => {
                removeCookie('auth-token');
                removeCookie('auth-role');
                set({ user });
            },

            logout: () => {
                removeCookie('auth-token');
                removeCookie('auth-role');
                set({ user: null });
            },
        }),
        {
            name: 'user-auth-storage',
        }
    )
)
