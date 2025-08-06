import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Camera, 
  Mail, 
  Phone, 
  MessageSquare,
} from 'lucide-react';
import BottomNavigation from '../../components/shared/BottomNavigation';
import { useAuth } from '../../contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data, can be replaced with real data later
  const profileData = {
    title: 'พนักงานบริการ',
    rating: 4.8,
    reviews: 128,
    joinDate: 'ม.ค. 2020',
    phone: '081-234-5678',
    jobsCompleted: 42,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  };

  const stats = [
    { label: 'งานที่ทำสำเร็จ', value: profileData.jobsCompleted },
    { label: 'คะแนนรีวิว', value: `${profileData.rating} ★` },
    { label: 'เข้าร่วมเมื่อ', value: profileData.joinDate },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="pb-24"> {/* Padding for bottom nav */}
        {/* Header */}
        <div className="bg-white p-4 pt-12 pb-6 rounded-b-3xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-gray-800 font-bold text-2xl">โปรไฟล์</h1>
            <button onClick={() => navigate('/settings')} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          {/* Profile Info */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-3 relative">
              <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                <AvatarImage src={user?.picture || profileData.profileImage} alt={user?.name} />
                <AvatarFallback className="text-primary font-bold text-3xl bg-primary/20">
                  {user?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 border-4 border-white hover:bg-primary/90 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <h2 className="text-gray-900 font-bold text-xl">{user?.name || 'Username'}</h2>
            <p className="text-gray-500 text-sm">{profileData.title}</p>
          </div>
        </div>
        
        <div className="p-4">
          {/* Account Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {stats.map(stat => (
              <div key={stat.label} className="bg-white rounded-xl p-3 flex flex-col items-center shadow-sm border border-gray-100">
                <p className="text-gray-500 text-xs mb-1">{stat.label}</p>
                <p className="text-gray-800 font-bold text-sm sm:text-base">{stat.value}</p>
              </div>
            ))}
          </div>
          
          {/* Account Details */}
          <div className="mb-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2 px-2">ข้อมูลบัญชี</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="flex items-center p-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Mail className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">อีเมล</p>
                  <p className="text-gray-800 font-medium">{user?.email || 'ไม่ระบุ'}</p>
                </div>
              </div>
              <div className="flex items-center p-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <Phone className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">เบอร์โทรศัพท์</p>
                  <p className="text-gray-800 font-medium">{profileData.phone}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Linked Accounts */}
          <div className="mb-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2 px-2">บัญชีที่เชื่อมต่อ</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-4">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium">LINE</span>
                </div>
                <span className="bg-green-100 text-green-700 text-xs py-1 px-2 rounded-full font-semibold">เชื่อมต่อแล้ว</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mr-4">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.19,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.19,22C17.6,22 21.54,18.33 21.54,12.81C21.54,11.76 21.35,11.1 21.35,11.1Z" />
                    </svg>
                  </div>
                  <span className="text-gray-800 font-medium">Google</span>
                </div>
                <button className="bg-gray-200 text-gray-700 text-xs py-1 px-3 rounded-full hover:bg-gray-300 font-semibold">เชื่อมต่อ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;