import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Calendar, User, Phone, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '../shared/BottomNavigation';
import { apiClient } from '@neeiz/api-client';
import { useQuery } from '@tanstack/react-query';

const fetchJobDetail = async (jobId: string) => {
  const { data } = await apiClient.get(`/api/jobs/${jobId}`);
  return data;
};

const JobDetailSkeleton = () => (
  <div className="min-h-screen bg-gray-50 pb-20 animate-pulse">
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-sm p-0 mb-6 overflow-hidden">
        <div className="w-full h-56 bg-gray-300"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  </div>
);

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isApplied, setIsApplied] = useState(false);

  const { data: job, isLoading, isError } = useQuery({
    queryKey: ['job', id],
    queryFn: () => fetchJobDetail(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) {
      navigate(-1);
    }
  }, [isError, navigate]);

  const handleApply = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setIsApplied(true);
    // In a real app, this would call an API to submit the application
    alert('สมัครงานเรียบร้อยแล้ว!');
  };

  // no swipe-back gesture; navigation ผ่านปุ่มเท่านั้น

  if (isLoading) {
    return <JobDetailSkeleton />;
  }

  return (
    <div 
      className="min-h-screen bg-gray-50 pb-20"
    >
      {/* Job Details */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm p-0 mb-6 overflow-hidden">
          <img
            src={job?.images?.[0] || '/placeholder.svg'}
            alt={job?.title || 'Job image'}
            className="w-full h-56 object-cover"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (target.src.endsWith('/placeholder.svg')) return;
              target.src = '/placeholder.svg';
            }}
          />
          <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="font-bold text-lg mb-2">รายละเอียดงาน</h2>
              <p className="text-gray-700">{job?.description}</p>
            </div>
            <span className="text-primary font-bold text-lg">{job?.salary}</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin className="text-gray-500 mr-2" size={18} />
              <span>{job?.location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="text-gray-500 mr-2" size={18} />
              <span>{job?.time || '-'}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="text-gray-500 mr-2" size={18} />
              <span>{job?.date || '-'}</span>
            </div>
          </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h2 className="font-bold text-lg mb-3">คุณสมบัติที่ต้องการ</h2>
          <ul className="space-y-2">
            {(job?.requirements || []).map((req: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h2 className="font-bold text-lg mb-3">สวัสดิการ</h2>
          <ul className="space-y-2">
            {(job?.benefits || []).map((benefit: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h2 className="font-bold text-lg mb-3">ข้อมูลผู้จ้างงาน</h2>
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-3">
              <User className="text-gray-600" size={24} />
            </div>
            <div>
              <p className="font-medium">คุณสมชาย รุ่งเรือง</p>
              <p className="text-gray-600 text-sm">ผู้จัดการร้านอาหารสยาม</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Phone className="text-gray-500 mr-2" size={16} />
              <span>081-234-5678</span>
            </div>
            <div className="flex items-center">
              <Mail className="text-gray-500 mr-2" size={16} />
              <span>somchai@siamrestaurant.com</span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleApply}
          disabled={isApplied}
          className={`w-full rounded-full py-3 font-bold text-primary-foreground ${
            isApplied 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-primary hover:bg-primary/90'
          }`}
        >
          {isApplied ? 'สมัครงานแล้ว' : 'สมัครงาน'}
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default JobDetail;