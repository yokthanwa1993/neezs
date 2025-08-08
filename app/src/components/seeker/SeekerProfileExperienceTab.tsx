import React from 'react';
import { Briefcase } from 'lucide-react';
import { Button } from '../ui/button';

const ProfileExperienceTab = () => {
  return (
    <div className="text-center py-12 text-gray-500 animate-fade-in">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
        <Briefcase className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">ยังไม่มีประสบการณ์ทำงาน</h3>
      <p className="mt-1 text-sm max-w-xs mx-auto">เพิ่มประสบการณ์ทำงานของคุณเพื่อเพิ่มโอกาสในการได้งาน</p>
      <Button className="mt-4">เพิ่มประสบการณ์</Button>
    </div>
  );
};

export default ProfileExperienceTab;