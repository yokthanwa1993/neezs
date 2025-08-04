import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Calendar, Wallet, User, Home, Briefcase } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  // ไม่แสดง bottom navigation ในหน้า notifications
  if (location.pathname === '/notifications') {
    return null;
  }

  const navItems = [
    { path: '/', label: 'หน้าแรก', icon: Home },
    { path: '/jobs', label: 'ค้นหางาน', icon: Search },
    { path: '/full-time-jobs', label: 'งานประจำ', icon: Briefcase },
    { path: '/my-shifts', label: 'งานของฉัน', icon: Calendar },
    { path: '/wallet', label: 'กระเป๋าเงิน', icon: Wallet },
    { path: '/profile', label: 'โปรไฟล์', icon: User },
  ];



  useEffect(() => {
    if (pendingPath && location.pathname === pendingPath) {
      setPendingPath(null);
    }
    // Reset animation after it has played
    if (clickedItem) {
      const timer = setTimeout(() => {
        setClickedItem(null);
      }, 400); // Duration of the animation
      return () => clearTimeout(timer);
    }
  }, [location.pathname, clickedItem]);

  const handleItemClick = (path: string) => {
    // Set pending path immediately to change color
    setPendingPath(path);

    // Trigger animation after a short delay
    setTimeout(() => {
      setClickedItem(path);
    }, 50);

    // Navigate after a longer delay
    if (location.pathname !== path) {
      setTimeout(() => {
        navigate(path);
      }, 150);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[9999] shadow-lg">
      <div className="w-full max-w-sm mx-auto">
        <div className="grid grid-cols-6 py-2 px-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path || pendingPath === item.path;
            const isClicked = clickedItem === item.path;

            return (
              <div
                key={item.path}
                className={`flex flex-col items-center py-2 transition-all duration-300 cursor-pointer select-none ${
                  isActive
                    ? "text-yellow-500"
                    : "text-gray-600 hover:text-yellow-400"
                } ${isClicked ? 'nav-bounce' : ''}`}
                onClick={() => handleItemClick(item.path)}
              >
                <div 
                  className={`relative transition-all duration-200 ${
                    isActive
                      ? 'transform scale-110'
                      : 'hover:scale-105'
                  } ${isClicked ? 'nav-wiggle' : ''}`}
                >
                  <IconComponent
                    size={24}
                    className={`mb-1 transition-all duration-200 ${
                      isActive
                        ? 'icon-active drop-shadow-sm'
                        : 'text-gray-600'
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                <span 
                  className={`text-[11px] leading-tight transition-all duration-200 ${
                    isActive
                      ? 'nav-text-active'
                      : 'text-gray-600 font-medium'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;