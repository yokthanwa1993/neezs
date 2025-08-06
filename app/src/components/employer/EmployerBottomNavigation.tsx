import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, MessageSquare, Briefcase, Bell, User } from 'lucide-react';

const EmployerBottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/employer/home', label: 'Home', icon: Home },
    { path: '/employer/chats', label: 'Chats', icon: MessageSquare },
    { path: '/employer/my-jobs', label: 'My Jobs', icon: Briefcase },
    { path: '/employer/notifications', label: 'Notifications', icon: Bell, badge: 2 },
    { path: '/employer/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 shadow-[0_-1px_4px_rgba(0,0,0,0.05)]">
      <div className="w-full max-w-sm mx-auto">
        <div className="grid grid-cols-5 h-[60px]">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <div 
                key={item.path}
                className="flex flex-col items-center justify-center h-full cursor-pointer select-none group"
                onClick={() => navigate(item.path)}
              >
                <div className="relative mb-0.5">
                  <IconComponent 
                    size={28} 
                    strokeWidth={isActive ? 2 : 1.5}
                    className={`transition-all duration-200 ${
                      isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                    fill={isActive ? 'hsl(var(--primary))' : 'none'}
                  />
                  {item.badge && (
                    <span className="absolute -top-1 -right-2 bg-primary text-primary-foreground text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-900 font-bold">
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

export default EmployerBottomNavigation;