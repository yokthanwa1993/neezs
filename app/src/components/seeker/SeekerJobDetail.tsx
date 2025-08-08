import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Calendar, User, Phone, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '../shared/BottomNavigation';
import { apiClient } from '@neeiz/api-client';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isApplied, setIsApplied] = useState(false);
  
  const [job, setJob] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const res = await apiClient.get(`/api/jobs/${id}`);
        setJob(res.data);
      } catch (e) {
        navigate(-1);
      }
    })();
  }, [id, navigate]);

  const handleApply = () => {
    if (!user) {
      // Show login prompt
      if (confirm('คุณต้องเข้าสู่ระบบก่อนสมัครงาน ต้องการเข้าสู่ระบบตอนนี้หรือไม่?')) {
        navigate('/');
      }
      return;
    }
    
    setIsApplied(true);
    // In a real app, this would call an API to submit the application
    alert('สมัครงานเรียบร้อยแล้ว!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      
      {/* Job Details */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm p-0 mb-6 overflow-hidden">
          {job?.images?.[0] && (
            <img src={job.images[0]} alt={job.title} className="w-full h-56 object-cover" />
          )}
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
          {isApplied 
            ? 'สมัครงานแล้ว' 
            : user 
              ? 'สมัครงานนี้' 
              : 'เข้าสู่ระบบเพื่อสมัครงาน'
          }
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default JobDetail;