import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  MapPin, 
  Bookmark,
  ArrowLeft,
  Search,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLiff } from '@/contexts/LiffContext';
import BottomNavigation from '../../components/shared/BottomNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SearchView from '../../components/shared/SearchView';
import { apiClient } from '@neeiz/api-client';

type JobDoc = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  salary: number;
  jobType: string;
  status: string;
  employerId: string;
};

const HomeSeeker = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { isLiffLoading } = useLiff();
  const [location] = useState<string>('กรุงเทพมหานคร');
  const [isSearching, setIsSearching] = useState(false);
  const fetchJobs = async () => {
    // Fetch only 10 jobs for the homepage for better performance
    const res = await apiClient.get('/api/jobs?limit=10');
    return res.data.items || [];
  };

  const { data: jobs = [], isLoading: isLoadingJobs } = useQuery<JobDoc[]>({
    queryKey: ['jobs', 'featured'],
    queryFn: fetchJobs,
  });

  const handleLogoClick = () => {
    window.location.reload();
  };

  // legacy mock removed

  // Show loading only while auth/LIFF is initializing; do not block on empty jobs
  if (isLoading || isLiffLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-3"></div>
          <div className="text-gray-600">กำลังเตรียมข้อมูล...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col h-screen">
      {/* Premium Header */}
      <header className="bg-white px-4 pt-4 pb-3 shadow-sm z-30 sticky top-0">
        <div className="flex items-center gap-4">
          <span 
            className="text-base font-extrabold text-gray-900 flex-shrink-0 cursor-pointer hover:text-primary transition-colors"
            onClick={handleLogoClick}
          >
            NEEZS
          </span>
          <div 
              className="flex-grow flex items-center p-3 bg-gray-100 rounded-full cursor-pointer"
              onClick={() => setIsSearching(true)}
          >
              <Search className="w-5 h-5 mr-3 text-gray-400" />
              <span className="text-gray-400 text-sm">ค้นหา...</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-gray-100 flex-shrink-0 group hover:bg-primary/20"
            onClick={() => navigate('/map-view')}
          >
            <MapPin className="w-5 h-5 text-gray-600 group-hover:text-primary" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pb-[76px] flex flex-col bg-white">
        {/* Featured Jobs List (from Firestore) */}
        <section className="pt-6 pb-6 px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">งานล่าสุดใน{location}</h2>
            <button onClick={() => navigate('/jobs')} className="text-sm text-primary font-semibold">
              ดูเพิ่มเติม
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {isLoadingJobs ? (
              <p className="text-gray-500">กำลังโหลดงานล่าสุด...</p>
            ) : (
              jobs.map((job) => (
              <Card 
                key={job.id}
                className="overflow-hidden rounded-2xl shadow-lg border-none group w-full cursor-pointer"
                onClick={() => navigate(`/job/${job.id}`)}
              >
                <div className="relative">
                  <img src={(job as any).images?.[0] || '/placeholder.svg'} alt={job.title} className="w-full h-48 object-cover" />
                  <div 
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full cursor-pointer z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Bookmark className="w-6 h-6 text-gray-600 group-hover:fill-primary group-hover:text-primary" />
                  </div>
                </div>
                <CardContent className="p-4 bg-white">
                  <h3 className="font-bold text-lg text-gray-800 truncate">{job.title}</h3>
                  <p className="text-base text-gray-500 mb-3">{job.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[#DA291C]">฿{(job as any).salary?.toLocaleString?.() || 0}</span>
                    <button 
                      className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-base font-semibold"
                      onClick={(e) => { e.stopPropagation(); navigate(`/job/${job.id}`); }}
                    >
                      สมัคร
                    </button>
                  </div>
                </CardContent>
              </Card>
            )))}
          </div>
        </section>
      </main>

      <BottomNavigation />

      {isSearching && <SearchView onClose={() => setIsSearching(false)} />}
    </div>
  );
};

export default HomeSeeker;