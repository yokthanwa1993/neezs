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
    { 
      title: 'พนักงานเสิร์ฟ', 
      company: 'Siam Restaurant', 
      images: [
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', 
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop', 
        'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=400&h=300&fit=crop'
      ] 
    },
    { 
      title: 'บาริสต้า', 
      company: 'Coffee Corner', 
      images: [
        'https://images.unsplash.com/photo-1511920183353-3c7c95a5742c?w=400&h=300&fit=crop', 
        'https://images.unsplash.com/photo-1525803377221-4213da3d3512?w=400&h=300&fit=crop', 
        'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop'
      ] 
    },
    { 
      title: 'พนักงานทำความสะอาด', 
      company: 'Clean Co.', 
      images: [
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop', 
        'https://images.unsplash.com/photo-1603712725038-92c104815203?w=400&h=300&fit=crop', 
        'https://images.unsplash.com/photo-1562886838-633576457a2a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1541123437800-1a7302143b49?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1628177242233-a859805936a8?w=400&h=300&fit=crop'
      ] 
    },
    { 
      title: 'พนักงานต้อนรับ', 
      company: 'Grand Hotel', 
      images: [
        'https://images.unsplash.com/photo-1563906267088-b029e7101114?w=400&h=300&fit=crop', 
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop', 
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop'
      ] 
    },
    { 
      title: 'ผู้ช่วยครัว', 
      company: 'Kitchen Express', 
      images: [
        'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop', 
        'https://images.unsplash.com/photo-1604332436015-a83854a4a753?w=400&h=300&fit=crop', 
        'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1495195129352-aeb3c5e281e5?w=400&h=300&fit=crop'
      ] 
    },
    {
      title: 'พนักงานขาย',
      company: 'Fashion Outlet',
      images: [
        'https://images.unsplash.com/photo-1556742111-a3297a0d56d6?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1560250056-07ba64664864?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1579548122204-e7812a1b4a2a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1586429209134-1b65b05b625b?w=400&h=300&fit=crop'
      ]
    },
    {
      title: 'พนักงานแคชเชียร์',
      company: 'SuperMart',
      images: [
        'https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1583324132598-3383a45555b6?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1609950564924-1fb11d78321b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1599425137027-a855d444a170?w=400&h=300&fit=crop'
      ]
    },
    {
      title: 'พนักงานรักษาความปลอดภัย',
      company: 'Secure Corp',
      images: [
        'https://images.unsplash.com/photo-1571942674907-213a0201816f?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1616594199393-a11a94d4dc9b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559532293-1d19c4e3de38?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1621992130821-b150f62141e5?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1519756301029-33fefb07cdba?w=400&h=300&fit=crop'
      ]
    },
    {
      title: 'พนักงานส่งของ',
      company: 'Express Delivery',
      images: [
        'https://images.unsplash.com/photo-1591700541393-95e4205663a6?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1617978241112-898785df45b5?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1586455122341-927f2dec0691?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1599255095433-e2513a123d81?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1620327467561-1e9161666c62?w=400&h=300&fit=crop'
      ]
    },
    {
      title: 'พนักงานทั่วไป',
      company: 'Warehouse Hub',
      images: [
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1517995103993-73e4e3a31f19?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1621905251918-48416d8574a8?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1540479859555-1ac74b49a241?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1534275339504-913cda30e04d?w=400&h=300&fit=crop'
      ]
    }
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
      <header className="bg-white px-4 pt-4 pb-3 shadow-sm z-30 sticky top-0">
        <div className="flex items-center gap-4">
          <span className="text-base font-extrabold text-gray-900 flex-shrink-0">NEEZS</span>
          <div 
              className="flex-grow flex items-center p-3 bg-gray-100 rounded-full cursor-pointer"
              onClick={() => setIsSearching(true)}
          >
              <Search className="w-5 h-5 mr-3 text-gray-400" />
              <span className="text-gray-400 text-sm">Search...</span>
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
                  <Carousel className="w-full" opts={{ loop: true, duration: 0 }}>
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