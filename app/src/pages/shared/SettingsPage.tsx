import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Shield, User, LogOut, Moon, Sun, HelpCircle, Mail, Lock } from 'lucide-react';

const SettingsPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?')) {
      navigate('/');
      // In a real app, this would clear authentication tokens
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      
      <div className="p-4">
        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-sm mb-4">
          <h2 className="font-bold text-lg p-4 border-b border-gray-200">บัญชี</h2>
          <div className="divide-y divide-gray-200">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <User className="text-gray-500 mr-3" size={20} />
                <span>ข้อมูลส่วนตัว</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Lock className="text-gray-500 mr-3" size={20} />
                <span>ความปลอดภัย</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>

        {/* App Settings */}
        <div className="bg-white rounded-xl shadow-sm mb-4">
          <h2 className="font-bold text-lg p-4 border-b border-gray-200">แอปพลิเคชัน</h2>
          <div className="divide-y divide-gray-200">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Bell className="text-gray-500 mr-3" size={20} />
                <span>การแจ้งเตือน</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Sun className="text-gray-500 mr-3" size={20} />
                <span>โหมดกลางวัน</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white rounded-xl shadow-sm mb-4">
          <h2 className="font-bold text-lg p-4 border-b border-gray-200">ความช่วยเหลือ</h2>
          <div className="divide-y divide-gray-200">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <HelpCircle className="text-gray-500 mr-3" size={20} />
                <span>คำถามที่พบบ่อย</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Mail className="text-gray-500 mr-3" size={20} />
                <span>ติดต่อเรา</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center bg-red-50 text-red-600 rounded-xl py-4 font-bold hover:bg-red-100 transition-colors"
        >
          <LogOut className="mr-2" size={20} />
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;