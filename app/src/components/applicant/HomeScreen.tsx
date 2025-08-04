import React, { useState, useEffect } from 'react';
import { Search, Calendar, Wallet, User, Briefcase, ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '../shared/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [location, setLocation] = useState<string>('กำลังค้นหาตำแหน่ง...');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            const address = data.address;
            const displayLocation = address.city || address.town || address.suburb || address.county || 'ไม่สามารถระบุตำแหน่งได้';
            setLocation(displayLocation);
          } catch (error) {
            console.error("Error fetching location name:", error);
            setLocation("ไม่สามารถระบุตำแหน่งได้");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          if (error.code === error.PERMISSION_DENIED) {
            setLocation("ไม่อนุญาตให้เข้าถึงตำแหน่ง");
          } else {
            setLocation("ไม่สามารถรับตำแหน่งได้");
          }
        }
      );
    } else {
      setLocation("เบราว์เซอร์ไม่รองรับ Geolocation");
    }
  }, []);

  const quickAccessTiles = user ? [
    { title: 'งานของฉัน', icon: Calendar, path: '/my-shifts' },
    { title: 'กระเป๋าเงิน', icon: Wallet, path: '/wallet' },
    { title: 'ค้นหางาน', icon: Search, path: '/jobs' },
    { title: 'โปรไฟล์', icon: User, path: '/profile' },
  ] : [
    { title: 'ค้นหางาน', icon: Search, path: '/jobs' },
    { title: 'งานประจำ', icon: Briefcase, path: '/full-time-jobs' },
    { title: 'เข้าสู่ระบบ', icon: User, path: '/login' },
    { title: 'สมัครสมาชิก', icon: User, path: '/register' },
  ];

  const featuredJobs = [
    { id: 1, title: 'โปรโมชั่นพิเศษ', description: 'รับโบนัสเพิ่ม 500 บาท', image: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=400&h=200&fit=crop&crop=center' },
    { id: 2, title: 'งานใหม่ล่าสุด', description: 'มีงานใหม่ 12 ตำแหน่ง', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=200&fit=crop&crop=center' },
    { id: 3, title: 'แนะนำเพื่อน', description: 'รับเงินรางวัล 200 บาท', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=200&fit=crop&crop=center' },
  ];
  
  const banners = [
    { id: 1, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=300&fit=crop&crop=center', alt: 'Modern Office Space', title: 'ค้นหางานในฝัน', subtitle: 'เริ่มต้นอาชีพใหม่วันนี้' },
    { id: 2, image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=300&fit=crop&crop=center', alt: 'Team Collaboration', title: 'ร่วมงานกับทีมมืออาชีพ', subtitle: 'พัฒนาทักษะไปด้วยกัน' },
  ];

  const renderWelcomeSection = () => {
    if (user) {
      return (
        <Card className="bg-gradient-to-br from-primary to-amber-500 text-white border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 border-4 border-white/50">
                <AvatarImage src={user.picture} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription className="text-white/80 flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1.5" />
                  {location}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center bg-white/20 p-4 rounded-lg">
              <div>
                <p className="text-sm text-white/80">ยอดเงินคงเหลือ</p>
                <p className="text-2xl font-bold">฿1,250.00</p>
              </div>
              <Button variant="secondary" onClick={() => navigate('/wallet')}>
                ดูรายละเอียด <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle>ยินดีต้อนรับสู่ Neeiz</CardTitle>
          <CardDescription>แพลตฟอร์มหางานสำหรับคุณ</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">เข้าสู่ระบบเพื่อดูโปรไฟล์และจัดการงานของคุณ</p>
          <Button onClick={() => navigate('/login')}>เข้าสู่ระบบ</Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      
      <main className="p-4 space-y-6">
        <section>
          {renderWelcomeSection()}
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">เข้าถึงด่วน</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickAccessTiles.map((tile) => {
              const Icon = tile.icon;
              return (
                <Card 
                  key={tile.title} 
                  className="flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(tile.path)}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">{tile.title}</p>
                </Card>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">สำหรับคุณโดยเฉพาะ</h2>
          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {featuredJobs.map((job) => (
                <CarouselItem key={job.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden">
                    <img src={job.image} alt={job.title} className="w-full h-32 object-cover"/>
                    <CardHeader>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription>{job.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">ประกาศล่าสุด</h2>
           <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <Card className="relative overflow-hidden aspect-video">
                    <img src={banner.image} alt={banner.alt} className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                      <h3 className="text-white text-xl font-bold">{banner.title}</h3>
                      <p className="text-white/90">{banner.subtitle}</p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default HomeScreen;
