import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { auth } from '@/lib/firebase';
import { signInWithCustomToken } from 'firebase/auth';

declare global {
  interface Window {
    liff: any;
  }
}

interface LiffContextType {
  isLiffReady: boolean;
  isLiffLoading: boolean;
  liff: any;
}

const LiffContext = createContext<LiffContextType | undefined>(undefined);

export const useLiff = () => {
  const context = useContext(LiffContext);
  if (context === undefined) {
    throw new Error('useLiff must be used within a LiffProvider');
  }
  return context;
};

interface LiffProviderProps {
  children: ReactNode;
}

// Global state to prevent re-initialization
let liffInitialized = false;
let liffInitializing = false;

// Function to reset LIFF state
export const resetLiffState = () => {
  liffInitialized = false;
  liffInitializing = false;
  console.log('🔄 LIFF state reset');
};

export const LiffProvider: React.FC<LiffProviderProps> = ({ children }) => {
  const [isLiffReady, setIsLiffReady] = useState(() => {
    // Check if LIFF is already ready
    return window.liff && liffInitialized;
  });
  const [isLiffLoading, setIsLiffLoading] = useState(() => {
    // Check if we have user data already
    const existingUser = localStorage.getItem('auth_user');
    const authCompleted = localStorage.getItem('auth_completed_at');
    
    // If we have user data, don't show loading
    if (existingUser && authCompleted) {
      console.log('✅ User data exists, skipping LIFF loading');
      return false;
    }
    
    // Only show loading if LIFF is not ready and not already initializing
    return !liffInitialized;
  });
  const { setUser, user } = useAuth();

  useEffect(() => {
    // Check if user data already exists in localStorage first
    const existingUser = localStorage.getItem('auth_user');
    const authCompletedAt = localStorage.getItem('auth_completed_at');
    
    // Force re-authentication for testing
    const forceReauth = localStorage.getItem('force_reauth');
    if (forceReauth === 'true') {
      console.log('🔄 Force re-authentication requested, clearing cache');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_completed_at');
      localStorage.removeItem('firebase_custom_token');
      localStorage.removeItem('firebase_user_data');
      localStorage.removeItem('force_reauth');
    }
    
    if (existingUser && authCompletedAt && !forceReauth) {
      console.log('✅ User data already cached, skipping LIFF initialization');
      try {
        const userData = JSON.parse(existingUser);
        if (!user) {
          setUser(userData);
          console.log('👤 Restored user from cache:', userData);
        }
        setIsLiffReady(true);
        setIsLiffLoading(false);
        liffInitialized = true;
        return;
      } catch (error) {
        console.warn('⚠️ Error parsing cached user data:', error);
        // Clear corrupted data
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_completed_at');
      }
    }
    
    // Skip initialization if already done or in progress
    if (liffInitialized) {
      console.log('✅ LIFF already initialized, skipping');
      setIsLiffReady(true);
      setIsLiffLoading(false);
      return;
    }
    
    if (liffInitializing) {
      console.log('⏳ LIFF initialization already in progress');
      return;
    }
    
    // Only initialize LIFF if we don't have user data
    console.log('🚀 No cached user data found, initializing LIFF...');
    initializeLiff();
  }, []);

  const initializeLiff = async () => {
    if (liffInitializing) {
      console.log('⏳ LIFF initialization already in progress');
      return;
    }
    
    liffInitializing = true;
    setIsLiffLoading(true);
    
    try {
      console.log('🚀 Initializing LIFF...');
      
      // Load LIFF SDK if not already loaded
      if (!window.liff) {
        await loadLiffSdk();
      }

      const liffId = import.meta.env.VITE_LINE_LIFF_ID || '2007840854-rKv5DGlD';
      console.log('🆔 Using LIFF ID:', liffId);

      // Initialize LIFF
      await window.liff.init({ liffId });
      
      setIsLiffReady(true);
      liffInitialized = true;

      // Check if user is already logged in
      const loggedIn = window.liff.isLoggedIn();
      console.log('🔍 LIFF login status:', loggedIn);

      if (loggedIn) {
        console.log('✅ User already logged in to LIFF');
        await handleLoggedInUser();
      } else {
        console.log('ℹ️ User not logged in to LIFF');
        // Store initial access timestamp
        localStorage.setItem('liff_first_access', new Date().toISOString());
      }

    } catch (error) {
      console.error('❌ LIFF initialization error:', error);
      liffInitialized = false;
    } finally {
      setIsLiffLoading(false);
      liffInitializing = false;
    }
  };

  const handleLoggedInUser = async () => {
    try {
      // Get ID Token
      const idToken = window.liff.getIDToken();
      if (!idToken) {
        console.warn('⚠️ No ID Token available');
        return;
      }

      console.log('🎫 Got ID Token from LIFF');
      localStorage.setItem('liff_id_token', idToken);

      // Get user profile
      const profile = await window.liff.getProfile();
      console.log('👤 LIFF Profile:', profile);
      console.log('📋 Profile details:', {
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
        statusMessage: profile.statusMessage
      });
      
      // Store LIFF user data
      localStorage.setItem('liff_user_id', profile.userId);
      localStorage.setItem('liff_display_name', profile.displayName);
      localStorage.setItem('liff_picture_url', profile.pictureUrl);
      localStorage.setItem('liff_status_message', profile.statusMessage || '');

      // Check if we already have Firebase authentication
      const existingCustomToken = localStorage.getItem('firebase_custom_token');
      const existingUserData = localStorage.getItem('firebase_user_data');

      if (existingCustomToken && existingUserData) {
        console.log('✅ Firebase auth data already exists, using cached data');
        const userData = JSON.parse(existingUserData);
        const userObj = {
          id: userData.uid,
          name: userData.displayName || profile.displayName || 'ผู้ใช้ LINE',
          email: userData.email || '',
          picture: userData.pictureUrl || profile.pictureUrl || undefined
        };
        
        setUser(userObj);
        localStorage.setItem('auth_user', JSON.stringify(userObj));
        console.log('👤 User data set from cached Firebase data');
        return;
      }

      // If no Firebase auth, authenticate with backend
      await authenticateWithBackend(idToken, profile);

    } catch (error) {
      console.error('❌ Error handling logged in user:', error);
    }
  };

  const authenticateWithBackend = async (idToken: string, profile: any) => {
    try {
      // Use same-origin endpoint so it works in both dev (Vite proxy) and prod (Hosting rewrites)
      const endpoint = '/api/auth/line';
      console.log('🌐 Authenticating with backend via', endpoint);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken, profile }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Backend authentication error:', errorData);
        return;
      }

      const { customToken, user: userData } = await response.json();
      console.log('✅ Got custom token from backend');

      // Store Firebase custom token
      localStorage.setItem('firebase_custom_token', customToken);
      localStorage.setItem('firebase_user_data', JSON.stringify(userData));

      // Set user data in context
      const userObj = {
        id: userData.uid,
        name: userData.displayName || profile.displayName || 'ผู้ใช้ LINE',
        email: userData.email || '',
        picture: userData.pictureUrl || profile.pictureUrl || undefined
      };
      
      console.log('👤 Setting user object in context:', userObj);
      setUser(userObj);
      localStorage.setItem('auth_user', JSON.stringify(userObj));
      localStorage.setItem('auth_completed_at', new Date().toISOString());

      // Silently sign in to Firebase using the custom token to avoid double login prompts
      try {
        await signInWithCustomToken(auth, customToken);
        console.log('🔐 Firebase sign-in with custom token completed');
      } catch (e) {
        console.warn('⚠️ Firebase sign-in with custom token failed:', e);
      }

      console.log('🎉 Authentication completed successfully!');

    } catch (error) {
      console.error('❌ Backend authentication error:', error);
    }
  };

  const loadLiffSdk = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      if (document.querySelector('script[src*="liff"]')) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://static.line-scdn.net/liff/edge/2/sdk.js';
      script.async = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('ไม่สามารถโหลด LINE SDK ได้'));
      
      document.head.appendChild(script);
    });
  };

  const value = {
    isLiffReady,
    isLiffLoading,
    liff: window.liff
  };

  return (
    <LiffContext.Provider value={value}>
      {children}
    </LiffContext.Provider>
  );
};