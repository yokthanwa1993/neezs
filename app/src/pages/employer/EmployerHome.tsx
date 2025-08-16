import React from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useJobs, Job } from '@/contexts/JobContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type JobType = Job;

const JobVerticalCard = ({
  job,
  onClick,
}: {
  job: JobType;
  onClick: () => void;
}) => (
  <div
    className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-lg"
    onClick={onClick}
  >
    <div className="relative">
      <div className="flex overflow-x-auto no-scrollbar">
        {job.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={job.title}
            className="w-full h-56 object-cover flex-shrink-0"
            style={{ minWidth: '100%' }}
          />
        ))}
      </div>
      <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
        <Bookmark className="text-yellow-400" fill="#fde047" size={28} />
      </div>
    </div>
    <div className="p-6 pb-5">
      <h3 className="font-bold text-2xl text-gray-900 mb-1">{job.title}</h3>
      <div className="text-gray-500 text-lg mb-4">{job.location}</div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-red-600 font-bold text-2xl">{job.price}</span>
        <Button
          className="bg-yellow-400 text-gray-900 font-bold rounded-xl px-8 py-2 text-lg hover:bg-yellow-300 transition"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          ดูรายละเอียด
        </Button>
      </div>
    </div>
  </div>
);

const EmployerHome = () => {
  const navigate = useNavigate();
  const { jobs, completedJobs } = useJobs();

  const handleCardClick = (job: JobType) => {
    navigate(`/employer/job/${job.id}/applicants`);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
      <div className="w-full flex-1 pb-24">
        <div className="px-4 pt-6">
          <Tabs defaultValue="online" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-200 rounded-full h-12 p-1">
              <TabsTrigger value="online" className="rounded-full data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-base font-bold">งานที่ออนไลน์</TabsTrigger>
              <TabsTrigger value="completed" className="rounded-full data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-base font-bold">งานที่จบแล้ว</TabsTrigger>
              <TabsTrigger value="expired" className="rounded-full data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-base font-bold">งานที่หมดเวลา</TabsTrigger>
            </TabsList>
            <TabsContent value="online">
              <div className="space-y-4 mt-4">
                {jobs.map((job) => (
                  <JobVerticalCard
                    key={job.id}
                    job={job}
                    onClick={() => handleCardClick(job)}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="space-y-4 mt-4">
                {completedJobs.map((job) => (
                  <JobVerticalCard
                    key={job.id}
                    job={job}
                    onClick={() => handleCardClick(job)}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="expired">
              <div className="space-y-4 mt-4">
                {/* Placeholder for expired jobs */}
                <p className="text-center text-gray-500 py-8">ไม่มีงานที่หมดเวลา</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EmployerHome;