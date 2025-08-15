import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPin, MoreHorizontal, Search, Filter, Users, Star, Clock, ArrowLeft, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StarRating from '@/components/StarRating';

// Mock data for applicants
const mockApplicants = [
  {
    id: '1',
    name: 'น้องมายด์',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    rating: 4.8,
    distance: '1.2 km',
    appliedDate: '2 วันที่แล้ว',
    status: 'pending',
    experience: '3 ปี',
    skills: ['Video Editing', 'After Effects', 'Premiere Pro']
  },
  {
    id: '2',
    name: 'พี่เก่ง',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    rating: 4.5,
    distance: '3.5 km',
    appliedDate: '1 วันที่แล้ว',
    status: 'reviewed',
    experience: '5 ปี',
    skills: ['Video Production', 'Motion Graphics']
  },
  {
    id: '3',
    name: 'คุณสมศักดิ์',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    rating: 5.0,
    distance: '5.1 km',
    appliedDate: '3 ชั่วโมงที่แล้ว',
    status: 'pending',
    experience: '7 ปี',
    skills: ['Professional Editing', 'Color Grading', 'Sound Design']
  },
  {
    id: '4',
    name: 'น้องฝน',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704a',
    rating: 4.2,
    distance: '8.0 km',
    appliedDate: '5 วันที่แล้ว',
    status: 'pending',
    experience: '2 ปี',
    skills: ['Basic Editing', 'YouTube Content']
  },
  {
    id: '5',
    name: 'คุณวิชัย',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704b',
    rating: 4.9,
    distance: '0.8 km',
    appliedDate: '1 วันที่แล้ว',
    status: 'shortlisted',
    experience: '6 ปี',
    skills: ['Cinema 4D', 'Advanced Effects', 'Creative Direction']
  },
  {
    id: '6',
    name: 'น้องน้ำ',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704c',
    rating: 4.7,
    distance: '2.1 km',
    appliedDate: '4 ชั่วโมงที่แล้ว',
    status: 'pending',
    experience: '4 ปี',
    skills: ['Social Media Content', 'TikTok Editing']
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'reviewed': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'shortlisted': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending': return 'รอการตรวจสอบ';
    case 'reviewed': return 'ตรวจสอบแล้ว';
    case 'shortlisted': return 'คัดเลือกแล้ว';
    default: return 'ไม่ทราบสถานะ';
  }
};

const ApplicantCard = ({ applicant }: { applicant: typeof mockApplicants[0] }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 group"
    >
      <div
        className="cursor-pointer"
        onClick={() => navigate(`/employer/applicant/${applicant.id}`)}
      >
        <div className="flex items-start gap-5">
          <div className="relative">
            <div className="w-16 h-[114px] overflow-hidden rounded-2xl bg-gray-200">
              <img
                src={applicant.avatarUrl}
                alt={applicant.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              applicant.status === 'shortlisted' ? 'bg-green-500' : 
              applicant.status === 'reviewed' ? 'bg-blue-500' : 'bg-yellow-500'
            }`}></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-lg text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                  {applicant.name}
                </h3>
                <p className="text-sm text-gray-500 mb-1">ประสบการณ์ {applicant.experience}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(applicant.status)}`}>
                  {getStatusText(applicant.status)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-700">{applicant.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin size={14} />
                <span>{applicant.distance}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock size={14} />
                <span>สมัครเมื่อ {applicant.appliedDate}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {applicant.skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                  {skill}
                </span>
              ))}
              {applicant.skills.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                  +{applicant.skills.length - 3} เพิ่มเติม
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <X className="w-4 h-4" />
          <span>ปฏิเสธ</span>
        </Button>
        <Button 
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white"
        >
          <Check className="w-4 h-4" />
          <span>ยืนยัน</span>
        </Button>
      </div>
    </div>
  );
};

const EmployerJobApplicants = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const jobTitle = "ตัดต่อวีดีโอ";
  
  const filteredApplicants = mockApplicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || applicant.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: mockApplicants.length,
    pending: mockApplicants.filter(a => a.status === 'pending').length,
    reviewed: mockApplicants.filter(a => a.status === 'reviewed').length,
    shortlisted: mockApplicants.filter(a => a.status === 'shortlisted').length,
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">

      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {filteredApplicants.length > 0 ? (
          <div className="space-y-4">
            {filteredApplicants.map((applicant) => (
              <ApplicantCard key={applicant.id} applicant={applicant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">ไม่พบผู้สมัครงาน</h3>
            <p className="text-gray-500">ลองเปลี่ยนคำค้นหาหรือตัวกรองดู</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmployerJobApplicants;