import React, { useEffect, useState } from 'react';
import { 
  MapPin, 
  Bookmark,
  ArrowLeft,
  Search,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '../../components/shared/BottomNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import SearchView from '../../components/shared/SearchView';
import { db } from '@/lib/firebase';
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';

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
  const { user } = useAuth();
  const [location] = useState<string>('กรุงเทพมหานคร');
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [jobs, setJobs] = useState<JobDoc[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'jobs'),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc'),
      limit(100)
    );
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      setJobs(items as any);
    });
    return () => unsub();
  }, []);

  const featuredJobs: Job[] = Array.from({ length: 100 }, (_, i) => {
    const template = jobTemplates[i % jobTemplates.length];
    return {
      id: i + 1,
      title: template.title,
      company: `${template.company} #${Math.floor(i / jobTemplates.length) + 1}`,
      images: template.images.map(img => `${img}&random=${i}`),
      salary: `฿${150 + (i % 10) * 5}/ชม.`,
      location: 'กรุงเทพมหานคร',
      description: `เรากำลังมองหา ${template.title} ที่มีความมุ่งมั่นและใจรักในบริการเพื่อร่วมเป็นส่วนหนึ่งของทีมของเราที่ ${template.company}. ผู้สมัครจะรับผิดชอบในการให้บริการลูกค้าอย่างยอดเยี่ยมและดูแลความเรียบร้อยในพื้นที่ทำงาน`,
      qualifications: ['มีประสบการณ์จะพิจารณาเป็นพิเศษ', 'สามารถทำงานเป็นกะได้', 'มีทัศนคติที่ดีและพร้อมเรียนรู้'],
    };
  });

  return (
    <div className="min-h-screen bg-white flex flex-col h-screen">
      {/* Premium Header */}
      <header className="bg-white px-4 pt-4 pb-3 shadow-sm z-30 sticky top-0">
        <div className="flex items-center gap-4">
          <span className="text-base font-extrabold text-gray-900 flex-shrink-0">NEEZS</span>
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
            {jobs.map((job) => (
              <Card 
                key={job.id}
                className="overflow-hidden rounded-2xl shadow-lg border-none group w-full cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="relative">
                  <img src={'/placeholder.svg'} alt={job.title} className="w-full h-48 object-cover" />
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
                      onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
                    >
                      สมัคร
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <BottomNavigation />

      <Dialog open={!!selectedJob} onOpenChange={(isOpen) => !isOpen && setSelectedJob(null)}>
        <DialogContent className="p-0 h-full w-full max-w-full flex flex-col bg-white rounded-none sm:rounded-2xl sm:max-w-lg sm:h-auto sm:max-h-[90vh]">
          {selectedJob && (
            <>
              <div className="flex-grow overflow-y-auto">
                <div className="relative flex-shrink-0">
                  <button 
                    onClick={() => setSelectedJob(null)} 
                    className="absolute top-4 left-4 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full sm:hidden"
                  >
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  <Carousel className="w-full" opts={{ loop: true, duration: 0 }}>
                    <CarouselContent>
                      {selectedJob.images.map((img, index) => (
                        <CarouselItem key={index}>
                          <img src={img.replace('w=400&h=300', 'w=800&h=600')} alt={`${selectedJob.title} ${index + 1}`} className="w-full h-64 object-cover" />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4" />
                    <CarouselNext className="absolute right-4" />
                  </Carousel>
                </div>
                <div className="p-6 bg-white">
                  <DialogHeader className="text-left">
                    <DialogTitle className="text-2xl font-bold text-gray-900">{selectedJob.title}</DialogTitle>
                    <p className="text-md text-gray-500 pt-1">{selectedJob.company}</p>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="font-bold text-[#DA291C] text-2xl">{selectedJob.salary}</div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2 text-lg">รายละเอียดงาน</h3>
                      <p className="text-base text-gray-600 leading-relaxed">{selectedJob.description}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2 text-lg">คุณสมบัติ</h3>
                      <ul className="list-disc list-inside text-base text-gray-600 space-y-1">
                        {selectedJob.qualifications?.map((q, i) => <li key={i}>{q}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="p-4 flex-shrink-0 border-t bg-white">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 h-12 rounded-xl text-lg font-bold">
                  สมัครงานนี้
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {isSearching && <SearchView onClose={() => setIsSearching(false)} />}
    </div>
  );
};

export default HomeSeeker;