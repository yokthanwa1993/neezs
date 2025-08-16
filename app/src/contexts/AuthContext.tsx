import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '@/lib/firebase';
import { signOut, onAuthStateChanged, User as FirebaseUser, signInWithCustomToken } from 'firebase/auth';
import { resetLiffState } from './LiffContext';
import { useDevMode } from './DevModeContext';

interface User {
  id: string;
  name: string;
  picture?: string;
  email?: string;
}

const devUser: User = {
  id: 'dev-user-007',
  name: 'นักพัฒนา ทดสอบ',
  email: 'dev@example.com',
  picture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face',
};

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  hardRefresh: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isDevMode } = useDevMode();
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      return null;
    }
  });
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        const userData: User = {
          id: fbUser.uid,
          name: fbUser.displayName || 'ผู้ใช้',
          email: fbUser.email || '',
          picture: fbUser.photoURL || undefined,
        };
        setUser(userData);
        localStorage.setItem('auth_user', JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem('auth_user');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
      // Clear all web caches and local storage to ensure fresh UI next load
      try {
        localStorage.clear();
      } catch {}
      try {
        if ('caches' in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
        }
      } catch {}
      try {
        if (navigator.serviceWorker) {
          const regs = await navigator.serviceWorker.getRegistrations();
          await Promise.all(regs.map((r) => r.unregister()));
        }
      } catch {}
      resetLiffState();
      if (window.liff) {
        window.liff.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const hardRefresh = async () => {
    try {
      try { if ('caches' in window) { const keys = await caches.keys(); await Promise.all(keys.map((k)=>caches.delete(k))); } } catch {}
      try { if (navigator.serviceWorker) { const regs = await navigator.serviceWorker.getRegistrations(); await Promise.all(regs.map((r)=>r.unregister())); } } catch {}
      // keep auth tokens, just reload ignoring cache
      window.location.replace('/');
    } catch (e) {
      window.location.reload();
    }
  };

  // ใน production (Firebase Hosting) ปิด dev user เสมอ
  const isHosted = typeof window !== 'undefined' && (window.location.hostname.endsWith('.web.app') || window.location.hostname.endsWith('.firebaseapp.com'));
  const exposedUser = (!isHosted && isDevMode && !firebaseUser) ? devUser : user;

  const value = {
    user: exposedUser,
    firebaseUser,
    setUser: (newUser: User | null) => {
      setUser(newUser);
      if (newUser) {
        localStorage.setItem('auth_user', JSON.stringify(newUser));
      } else {
        localStorage.removeItem('auth_user');
      }
    },
    logout,
    hardRefresh,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};