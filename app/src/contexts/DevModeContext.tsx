import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const DevModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDevMode, setIsDevMode] = useState(() => {
    try {
      const item = window.localStorage.getItem('devMode');
      // หากไม่มีค่าที่บันทึกไว้ ให้ใช้ค่าเริ่มต้นเป็น true (เปิด)
      return item ? JSON.parse(item) : true;
    } catch (error) {
      console.error("Error reading devMode from localStorage", error);
      // หากเกิดข้อผิดพลาด ให้ใช้ค่าเริ่มต้นเป็น true (เปิด)
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