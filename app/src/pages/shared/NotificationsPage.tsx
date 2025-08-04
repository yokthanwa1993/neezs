import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Home, Search, Calendar, Wallet, User, Check, Coins, Star } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState('received');

  const navItems = [
    { path: '/', label: 'หน้าแรก', icon: Home },
    { path: '/jobs', label: 'ค้นหางาน', icon: Search },
    { path: '/my-shifts', label: 'งานของฉัน', icon: Calendar },
    { path: '/wallet', label: 'กระเป๋าเงิน', icon: Wallet },
    { path: '/profile', label: 'โปรไฟล์', icon: User },
  ];

  const notifications = [
    {
      id: 1,
      title: 'พนักงานครัวร้านอาหารไทย',
      description: 'ร้านอาหารไทยแก่',
      rating: 4.8,
      price: '฿180/ชม.',
      date: '28 ม.ค. 2025 08:00 - 17:00',
      location: 'สยามพารากอน',
      message: 'เรายินดีที่จะให้บริการคุณ อยากให้มาทำงานกับเรา',
      status: 'received',
      actionButtons: [
        { text: 'ปฏิเสธ', color: 'red' },
        { text: 'รับงาน', color: 'yellow' },
      ],
    },
    // Add more notifications as needed
  ];

  // General notifications (from screenshot)
  const generalNotifications = [
    {
      id: 1,
      icon: <Check className="text-green-500 w-6 h-6" />,
      title: 'งานได้รับการยืนยันแล้ว',
      description: 'งานพนักงานร้านขายของ ได้รับการยืนยันแล้ว เริ่มงานวันพรุ่งนี้',
      daysAgo: 183,
      rightDot: <span className="w-3 h-3 rounded-full bg-blue-400 inline-block"></span>,
      cardClass: "border-l-4 border-blue-300"
    },
    {
      id: 2,
      icon: <Coins className="text-yellow-500 w-6 h-6" />,
      title: 'ได้รับเงินค่าจ้าง',
      description: 'ได้รับเงินค่าจ้าง ฿720 จากงานพนักงานร้านขายของ',
      daysAgo: 184,
      rightDot: <span className="w-3 h-3 rounded-full bg-blue-400 inline-block"></span>,
      cardClass: "border-l-4 border-blue-300"
    },
    {
      id: 3,
      icon: <Star className="text-yellow-400 w-6 h-6" />,
      title: 'ได้รับคะแนนจากนายจ้าง',
      description: 'คุณได้รับคะแนน 5 ดาว จากงานพนักงานห้องครัว',
      daysAgo: 184,
      rightDot: null,
      cardClass: "border-l-4 border-gray-200"
    }
  ];

  const filteredNotifications = notifications.filter(
    (notification) => notification.status === selectedTab
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      
      
      <div className="px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">แจ้งเตือน</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setSelectedTab('received')}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === 'received' ? 'bg-yellow-200' : 'bg-gray-200'
            }`}
          >
            งานที่ได้รับเลือก ({notifications.filter((n) => n.status === 'received').length})
          </button>
          <button
            onClick={() => setSelectedTab('general')}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === 'general' ? 'bg-yellow-200' : 'bg-gray-200'
            }`}
          >
            การแจ้งเตือน ({generalNotifications.length})
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {selectedTab === 'received' && filteredNotifications.map((notification) => (
            <div key={notification.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-bold">{notification.title}</h2>
                  <p className="text-gray-600">{notification.description}</p>
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐ {notification.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-yellow-600 font-bold">{notification.price}</p>
                </div>
              </div>
              <div className="flex space-x-4 mb-4">
                <div>
                  <p className="text-gray-600">
                    <span className="font-bold">วันที่:</span> {notification.date}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-bold">สถานที่:</span> {notification.location}
                  </p>
                </div>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <p className="text-gray-600">{notification.message}</p>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                {notification.actionButtons.map((button) => (
                  <button
                    key={button.text}
                    className={`px-4 py-2 rounded-lg bg-${button.color}-200 text-${button.color}-800`}
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {selectedTab === 'general' && generalNotifications.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl shadow-sm p-4 flex items-start gap-3 relative ${item.cardClass}`}
              style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
            >
              <div className="flex-shrink-0 mt-1">{item.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-gray-900">{item.title}</h2>
                  {item.rightDot}
                </div>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                <div className="text-xs text-gray-400 mt-2">{item.daysAgo} วัน</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation - แสดงเฉพาะในหน้านี้ */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-5 py-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <div 
                key={item.path}
                className={`flex flex-col items-center py-2 transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? "text-[#f5c518] transform scale-105" 
                    : "text-gray-400 hover:text-[#f5c518]"
                }`}
                onClick={() => navigate(item.path)}
              >
                <IconComponent 
                  size={20} 
                  className={`mb-1 transition-transform duration-200 ${
                    isActive 
                      ? 'fill-current scale-110' 
                      : 'hover:scale-105'
                  }`} 
                />
                <span className={`text-xs transition-all duration-200 ${
                  isActive ? 'font-semibold scale-105' : ''
                }`}>
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

export default NotificationsPage;