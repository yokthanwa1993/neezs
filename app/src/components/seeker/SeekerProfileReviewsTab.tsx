import React from 'react';
import { Star } from 'lucide-react';

const ProfileReviewsTab = () => {
  return (
    <div className="text-center py-12 text-gray-500 animate-fade-in">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
        <Star className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">ยังไม่มีรีวิว</h3>
      <p className="mt-1 text-sm">รีวิวจากผู้จ้างงานจะปรากฏที่นี่หลังคุณทำงานเสร็จ</p>
    </div>
  );
};

export default ProfileReviewsTab;