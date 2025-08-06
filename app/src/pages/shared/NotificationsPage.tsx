import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCircle, Coins, Star, Briefcase, ArrowLeft } from 'lucide-react';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('all'); // 'all', 'jobs', 'system'

  const notifications = [
    {
      id: 1,
      type: 'job_confirmed',
      title: 'งานได้รับการยืนยันแล้ว',
      description: 'งานพนักงานร้านขายของ ได้รับการยืนยันแล้ว เริ่มงานวันพรุ่งนี้',
      timestamp: '1 วันที่แล้ว',
      unread: true,
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    },
    {
      id: 2,
      type: 'payment',
      title: 'ได้รับเงินค่าจ้าง',
      description: 'ได้รับเงินค่าจ้าง ฿720 จากงานพนักงานร้านขายของ',
      timestamp: '2 วันที่แล้ว',
      unread: true,
      icon: <Coins className="w-6 h-6 text-primary" />,
    },
    {
      id: 3,
      type: 'rating',
      title: 'ได้รับคะแนนจากนายจ้าง',
      description: 'คุณได้รับคะแนน 5 ดาว จากงานพนักงานห้องครัว',
      timestamp: '2 วันที่แล้ว',
      unread: false,
      icon: <Star className="w-6 h-6 text-yellow-400" />,
    },
    {
      id: 4,
      type: 'job_offer',
      title: 'ข้อเสนองานใหม่',
      description: 'ร้านอาหารไทยแก่ ได้เสนองาน "พนักงานครัว" ให้คุณ',
      timestamp: '3 วันที่แล้ว',
      unread: false,
      icon: <Briefcase className="w-6 h-6 text-blue-500" />,
    },
  ];

  const filteredNotifications = notifications.filter(n => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'jobs') return ['job_confirmed', 'rating', 'job_offer'].includes(n.type);
    if (selectedTab === 'system') return ['payment'].includes(n.type);
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">การแจ้งเตือน</h1>
          <div className="w-10"></div> {/* Spacer */}
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white px-4 pt-2 pb-3">
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setSelectedTab('all')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
              selectedTab === 'all' ? 'bg-primary text-primary-foreground shadow' : 'text-gray-600'
            }`}
          >
            ทั้งหมด
          </button>
          <button
            onClick={() => setSelectedTab('jobs')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
              selectedTab === 'jobs' ? 'bg-primary text-primary-foreground shadow' : 'text-gray-600'
            }`}
          >
            เกี่ยวกับงาน
          </button>
          <button
            onClick={() => setSelectedTab('system')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
              selectedTab === 'system' ? 'bg-primary text-primary-foreground shadow' : 'text-gray-600'
            }`}
          >
            จากระบบ
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <main className="p-4">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-xl shadow-sm p-4 flex items-start gap-4 transition-all duration-300 ${
                  item.unread ? 'border-l-4 border-primary' : 'border-l-4 border-transparent'
                }`}
              >
                <div className="flex-shrink-0 mt-1 bg-primary/10 p-3 rounded-full">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-gray-800">{item.title}</h2>
                    {item.unread && (
                      <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                  <div className="text-xs text-gray-400 mt-2">{item.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-semibold text-gray-700">ไม่มีการแจ้งเตือน</h2>
            <p className="text-gray-500">การแจ้งเตือนของคุณจะปรากฏที่นี่</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default NotificationsPage;