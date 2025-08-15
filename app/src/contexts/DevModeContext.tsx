import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const DevModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDevMode, setIsDevMode] = useState(() => {
    try {
      const isHosted = typeof window !== 'undefined' && (window.location.hostname.endsWith('.web.app') || window.location.hostname.endsWith('.firebaseapp.com'));
      if (isHosted) {
        // ใน production ปิด dev mode เสมอ (ห้าม bypass)
        return false;
      }
      const item = window.localStorage.getItem('devMode');
      return item ? JSON.parse(item) : true;
    } catch (error) {
      console.error("Error reading devMode from localStorage", error);
      return true;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('devMode', JSON.stringify(isDevMode));
    } catch (error) {
      console.error("Error saving devMode to localStorage", error);
    }
  }, [isDevMode]);

  const toggleDevMode = () => {
    const isHosted = typeof window !== 'undefined' && (window.location.hostname.endsWith('.web.app') || window.location.hostname.endsWith('.firebaseapp.com'));
    if (isHosted) {
      // ใน production ไม่อนุญาตให้เปิด dev mode
      setIsDevMode(false);
      return;
    }
    setIsDevMode(prevMode => !prevMode);
  };

  return (
    <DevModeContext.Provider value={{ isDevMode, toggleDevMode }}>
      {children}
    </DevModeContext.Provider>
  );
};

export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (context === undefined) {
    throw new Error('useDevMode must be used within a DevModeProvider');
  }
  return context;
};