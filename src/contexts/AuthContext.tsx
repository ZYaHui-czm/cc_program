import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/db';
import type { User } from '@/types';
import { useLocale } from '@/hooks/useLocale';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, avatar: string, avatarColor: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<User, 'username' | 'avatar' | 'avatarColor' | 'language'>>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  updateProfile: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { language } = useLocale();

  useEffect(() => {
    db.users.toCollection().first().then(existing => {
      if (existing) {
        setUser(existing);
      }
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, []);

  const login = useCallback(async (username: string, avatar: string, avatarColor: string) => {
    const id = await db.users.add({
      username,
      avatar,
      avatarColor,
      language,
      createdAt: new Date(),
    });
    const newUser = await db.users.get(id);
    if (newUser) {
      setUser(newUser);
      navigate('/ideas', { replace: true });
    }
  }, [language, navigate]);

  const logout = useCallback(() => {
    setUser(null);
    navigate('/login', { replace: true });
  }, [navigate]);

  const updateProfile = useCallback(async (data: Partial<Pick<User, 'username' | 'avatar' | 'avatarColor' | 'language'>>) => {
    if (!user?.id) return;
    await db.users.update(user.id, data);
    setUser(prev => prev ? { ...prev, ...data } : null);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
