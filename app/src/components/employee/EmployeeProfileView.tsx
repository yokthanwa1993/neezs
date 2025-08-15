import React from 'react';
import StarRating from '@/components/StarRating';
import { User, MapPin } from 'lucide-react';

export interface EmployeeProfile {
  name: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  bio: string;
  skills: string[];
  photos: string[];
  profileImageUrl?: string;
}

const EmployeeProfileView: React.FC<{ employee: EmployeeProfile }> = ({ employee }) => {
  if (!employee) return null;

  return (
    <div className="bg-white">
      <div className="p-6 pt-8 text-center">
        <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
            {employee.profileImageUrl ? (
                <img src={employee.profileImageUrl} alt={employee.name} className="w-full h-full object-cover" />
            ) : (
                <User className="w-16 h-16 text-gray-400" />
            )}
        </div>
        <h1 className="text-2xl font-bold mt-4">{employee.name}</h1>
        <p className="text-gray-600">{employee.title}</p>
        <div className="flex items-center justify-center text-gray-500 mt-1">
          <MapPin size={16} className="mr-1" />
          <span>{employee.location}</span>
        </div>
        <div className="mt-3 flex justify-center">
          <StarRating value={employee.rating} count={employee.reviews} />
        </div>
      </div>

      <div className="px-6 pb-6 space-y-6">
        <div className="border-t pt-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">เกี่ยวกับฉัน</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{employee.bio}</p>
        </div>
        <div className="border-t pt-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">ทักษะ</h2>
          <div className="flex flex-wrap gap-2">
            {employee.skills.map((skill) => (
              <div key={skill} className="bg-primary/10 text-primary font-medium text-sm px-3 py-1 rounded-full">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileView;