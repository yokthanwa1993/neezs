import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Share,
  Pencil,
  User,
  Briefcase,
  Star
} from 'lucide-react';
import BottomNavigation from '../../components/shared/BottomNavigation';
import { useAuth } from '../../contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import ProfileAboutTab from '@/components/applicant/ProfileAboutTab';
import ProfileExperienceTab from '@/components/applicant/ProfileExperienceTab';
import ProfileReviewsTab from '@/components/applicant/ProfileReviewsTab';

const TabButton = ({ icon: Icon, isActive, onClick }: { icon: React.ElementType, isActive: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`py-4 flex-1 flex justify-center items-center transition-all duration-200 border-b-2 ${isActive ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:bg-gray-100'}`}>
    <Icon className={`h-6 w-6`} />
  </button>
);

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');

  const profileData = {
    username: 'tanwa_p',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    jobsApplied: 15,
    rating: 4.8,
    savedJobs: 5,
    bio: 'นักศึกษาจบใหม่ มีความสนใจในงานบริการและงานขาย มีความกระตือรือร้นและพร้อมเรียนรู้งาน',
  };

  const handleShare = async () => {
    const shareData = {
      title: `โปรไฟล์ของ ${user?.name}`,
      text: `ดูโปรไฟล์ของ ${user?.name} บนแอปของเราสิ!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support navigator.share
        await navigator.clipboard.writeText(window.location.href);
        alert('คัดลอกลิงก์โปรไฟล์แล้ว!');
      }
    } catch (error) {
      console.error('Error sharing profile:', error);
      alert('ไม่สามารถแชร์โปรไฟล์ได้');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-4 pt-10">
          <div className="w-10"></div> {/* Spacer */}
          <h1 className="text-gray-800 font-bold text-lg">@{profileData.username}</h1>
          <div className="flex items-center space-x-1">
            <Button onClick={handleShare} variant="ghost" size="icon" className="rounded-full">
              <Share className="h-5 w-5 text-gray-700" />
            </Button>
            <Button onClick={() => navigate('/settings')} variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5 text-gray-700" />
            </Button>
          </div>
        </div>
        
        <div className="px-4">
          {/* Profile Summary */}
          <div className="flex items-center space-x-5 mb-4">
            <Avatar className="w-24 h-24 border-2 border-white shadow-sm">
              <AvatarImage src={user?.picture || profileData.profileImage} alt={user?.name} />
              <AvatarFallback className="text-primary font-bold text-3xl bg-primary/10">
                {user?.name?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center space-x-6 text-center">
              <div><p className="font-bold text-lg">{profileData.jobsApplied}</p><p className="text-sm text-gray-500">สมัครงาน</p></div>
              <div><p className="font-bold text-lg">{profileData.rating} ★</p><p className="text-sm text-gray-500">คะแนน</p></div>
              <div><p className="font-bold text-lg">{profileData.savedJobs}</p><p className="text-sm text-gray-500">บันทึก</p></div>
            </div>
          </div>

          {/* Name and Bio */}
          <div className="mb-4">
            <h2 className="text-gray-900 font-bold text-xl">{user?.name || 'Username'}</h2>
            <div className="flex items-start text-gray-600 mt-1 cursor-pointer group" onClick={() => navigate('/profile/edit')}>
              <p className="text-sm">{profileData.bio || 'เพิ่มคำอธิบายตัวตนของคุณ...'}</p>
              <Pencil className="h-3 w-3 ml-2 mt-1 flex-shrink-0 text-gray-400 group-hover:text-primary" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mb-6">
            <Button variant="outline" className="flex-1 font-semibold bg-gray-100 border-gray-200" onClick={() => navigate('/profile/edit')}>แก้ไขโปรไฟล์</Button>
            <Button variant="outline" className="flex-1 font-semibold bg-gray-100 border-gray-200" onClick={handleShare}>แชร์โปรไฟล์</Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-y border-gray-200">
          <div className="flex justify-around">
            <TabButton icon={User} isActive={activeTab === 'about'} onClick={() => setActiveTab('about')} />
            <TabButton icon={Briefcase} isActive={activeTab === 'experience'} onClick={() => setActiveTab('experience')} />
            <TabButton icon={Star} isActive={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} />
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'about' && <ProfileAboutTab />}
          {activeTab === 'experience' && <ProfileExperienceTab />}
          {activeTab === 'reviews' && <ProfileReviewsTab />}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;