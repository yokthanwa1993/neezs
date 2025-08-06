import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JobsMap } from '@/components/shared/JobsMap';

const mockJobs = [
  { id: 1, title: 'พนักงานเสิร์ฟ', company: 'ร้านอาหารสยาม', location: { lat: 13.7469, lng: 100.5341 }, salary: '฿180/ชม.' },
  { id: 2, title: 'บาริสต้า', company: 'คาเฟ่ทองหล่อ', location: { lat: 13.7309, lng: 100.5805 }, salary: '฿175/ชม.' },
  { id: 3, title: 'พนักงานทำความสะอาด', company: 'โรงแรมสุขุมวิท', location: { lat: 13.7404, lng: 100.5613 }, salary: '฿160/ชม.' },
  { id: 4, title: 'พนักงานต้อนรับ', company: 'โรงแรมแกรนด์', location: { lat: 13.7522, lng: 100.5132 }, salary: '฿190/ชม.' },
  { id: 5, title: 'ผู้ช่วยครัว', company: 'ครัวเอ็กซ์เพรส', location: { lat: 13.7219, lng: 100.5271 }, salary: '฿170/ชม.' },
  { id: 6, title: 'พนักงานขาย', company: 'ห้างเซ็นทรัลเวิลด์', location: { lat: 13.7466, lng: 100.5392 }, salary: '฿200/ชม.' },
  { id: 7, title: 'เจ้าหน้าที่คลังสินค้า', company: 'คลังสินค้าบางนา', location: { lat: 13.6683, lng: 100.6347 }, salary: '฿185/ชม.' },
  { id: 8, title: 'พนักงานส่งของ', company: 'เดลิเวอรี่ด่วน', location: { lat: 13.7943, lng: 100.5694 }, salary: '฿210/ชม.' },
  { id: 9, title: 'ช่างซ่อมบำรุง', company: 'ศูนย์บริการลาดพร้าว', location: { lat: 13.8191, lng: 100.5761 }, salary: '฿220/ชม.' },
  { id: 10, title: 'เจ้าหน้าที่รักษาความปลอดภัย', company: 'อาคารออฟฟิศสีลม', location: { lat: 13.7291, lng: 100.5291 }, salary: '฿180/ชม.' },
];

type Job = typeof mockJobs[0];

const MapView = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white p-4 shadow-sm sticky top-0 z-20 flex items-center flex-shrink-0">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-gray-800">หางานบนแผนที่</h1>
      </header>

      <div className="flex-grow relative">
        {/* Map View */}
        <div className="absolute inset-0">
          <JobsMap jobs={mockJobs} selectedJob={selectedJob} onSelectJob={setSelectedJob} />
        </div>
      </div>
    </div>
  );
};

export default MapView;