import React, { useState } from 'react';
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

type Job = {
  id: number;
  title: string;
  company: string;
  images: string[];
  salary: string;
  location: string;
  description: string;
  qualifications: string[];
};

const HomeSeeker = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [location] = useState<string>('กรุงเทพมหานคร');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const jobTemplates = [
    { title: 'พนักงานเสิร์ฟ', company: 'Siam Restaurant', images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=400&h=300&fit=crop'] },
    { title: 'บาริสต้า', company: 'Coffee Corner', images: ['https://images.unsplash.com/photo-1511920183353-3c7c95a5742c?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1525803377221-4213da3d3512?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&h=300&fit=crop'] },
    { title: 'พนักงานทำความสะอาด', company: 'Clean Co.', images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1603712725038-92c104815203?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1562886838-633576457a2a?w=400&h=300&fit=crop'] },
    { title: 'พนักงานต้อนรับ', company: 'Grand Hotel', images: ['https://images.unsplash.com/photo-1563906267088-b029e7101114?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop'] },
    { title: 'ผู้ช่วยครัว', company: 'Kitchen Express', images: ['https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1604332436015-a83854a4a753?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop'] },
  ];

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
      <header className="bg-white px-4 pt-6 pb-4 rounded-b-3xl shadow-sm z-30 sticky top-0">
        <div 
            className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-xl cursor-pointer mb-4"
            onClick={() => setIsSearching(true)}
        >
            <div className="flex items-center text-gray-500 text-sm">
                <Search className="w-5 h-5 mr-3" />
                <span>ค้นหางาน, ตำแหน่ง...</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 font-medium">
                <MapPin className="w-5 h-5 mr-1.5 text-gray-400" />
                <span>{location}</span>
            </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14 border-2 border-primary/50">
              <AvatarImage src={user?.picture} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-gray-500">ยินดีต้อนรับกลับมา,</p>
              <h1 className="text-xl font-bold text-gray-800">{user?.name || 'Guest'}</h1>
            </div>
          </div>
        </div>

        {/* Find Jobs on Map Section */}
        <div className="mt-5">
          <div 
            className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => navigate('/map-view')}
          >
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-gray-900">ดูตำแหน่งงานบนแผนที่</h3>
                <p className="text-sm text-gray-500">ค้นหางานใกล้ตัวคุณได้ง่ายๆ</p>
              </div>
            </div>
            <div className="w-16 h-16 rounded-lg overflow-hidden ml-4 flex-shrink-0">
              <img 
                src="/assets/images/map-preview.jpeg" 
                alt="Map preview" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pb-[76px] flex flex-col bg-white">
        {/* Featured Jobs List */}
        <section className="pt-6 pb-6 px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">งานใน{location}ใกล้คุณ</h2>
            <button onClick={() => navigate('/jobs')} className="text-sm text-primary font-semibold">
              ดูเพิ่มเติม
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {featuredJobs.map((job) => (
              <Card 
                key={job.id} 
                className="overflow-hidden rounded-2xl shadow-lg border-none group w-full cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="relative">
                  <Carousel className="w-full" opts={{ loop: true }}>
                    <CarouselContent>
                      {job.images.map((img, index) => (
                        <CarouselItem key={index}>
                          <img src={img} alt={`${job.title} ${index + 1}`} className="w-full h-48 object-cover" />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                  <div 
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full cursor-pointer z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Bookmark className="w-6 h-6 text-gray-600 group-hover:fill-primary group-hover:text-primary" />
                  </div>
                </div>
                <CardContent className="p-4 bg-white">
                  <h3 className="font-bold text-lg text-gray-800 truncate">{job.title}</h3>
                  <p className="text-base text-gray-500 mb-3">{job.company}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[#DA291C]">{job.salary}</span>
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
                  <Carousel className="w-full" opts={{ loop: true }}>
                    <CarouselContent>
                      {selectedJob.images.map((img, index) => (
                        <CarouselItem key={index}>
                          <img src={img.replace('w=400&h=300', 'w=800&h=600')} alt={`${selectedJob.title} ${index + 1}`} className="w-full h-64 object-cover" />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
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