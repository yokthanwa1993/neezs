import React from "react";
import { Briefcase, MessageCircle, Bell, User, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "JOBS",
    icon: <Briefcase className="w-7 h-7 mb-1" />,
    to: "/jobs",
  },
  {
    label: "แชท",
    icon: <MessageCircle className="w-7 h-7 mb-1" />,
    to: "/chat",
  },
  {
    label: "",
    icon: null,
    to: "/post-job",
    isCenter: true,
  },
  {
    label: "แจ้งเตือน",
    icon: <Bell className="w-7 h-7 mb-1" />,
    to: "/notifications",
    badge: 3,
  },
  {
    label: "โปรไฟล์",
    icon: <User className="w-7 h-7 mb-1" />,
    to: "/profile",
  },
];

const BottomNavbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 flex justify-between items-center px-2 h-20">
      {navItems.map((item, idx) =>
        item.isCenter ? (
          <div key={idx} className="relative flex-1 flex justify-center -mt-8 z-10">
            <Link
              to={item.to}
              className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-4 border-white"
              style={{ boxShadow: "0 4px 16px 0 rgba(0,0,0,0.10)" }}
            >
              <Plus className="w-10 h-10 text-black" />
            </Link>
          </div>
        ) : (
          <Link
            key={idx}
            to={item.to}
            className={`flex-1 flex flex-col items-center justify-center text-gray-500 font-medium relative`}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
            {item.badge && (
              <span className="absolute top-2 right-6 bg-yellow-400 text-xs font-bold rounded-full px-1.5 py-0.5 text-black border border-white">
                {item.badge}
              </span>
            )}
          </Link>
        )
      )}
    </nav>
  );
};

export default BottomNavbar;