import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (context === undefined) {
    throw new Error('useDevMode must be used within a DevModeProvider');
  }
  return context;
};

interface DevModeProviderProps {
  children: ReactNode;
}

export const DevModeProvider: React.FC<DevModeProviderProps> = ({ children }) => {
  const [isDevMode, setIsDevMode] = useState<boolean>(() => {
    try {
      const savedDevMode = localStorage.getItem('dev_mode');
      return savedDevMode ? JSON.parse(savedDevMode) : false;
    } catch (error) {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('dev_mode', JSON.stringify(isDevMode));
  }, [isDevMode]);

  const toggleDevMode = () => {
    setIsDevMode(prev => !prev);
  };

  const value = {
    isDevMode,
    toggleDevMode,
  };

  return (
    <DevModeContext.Provider value={value}>
      {children}
    </DevModeContext.Provider>
  );
};