import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronRight, User, MoreHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import EmployerBottomNavigation from '@/components/employer/EmployerBottomNavigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import AddJobForm from '@/components/employer/AddJobForm';


const categories = [
  { name: 'บัญชีและการเงิน', emoji: '📊' },
  { name: 'ดูแลสัตว์', emoji: '🐶' },
  { name: 'ศิลปะและการออกแบบ', emoji: '🎨' },
  { name: 'ดูแลเด็ก', emoji: '👶' },
  { name: 'ความงามและสุขภาพ', emoji: '💅' },
  { name: 'ทำความสะอาด', emoji: '🧹' },
];

const HomeEmployer: React.FC = () => {
  const navigate = useNavigate();
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="bg-white p-4 pb-4 shadow-sm">
        <div className="relative mb-3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="ค้นหา"
            className="w-full rounded-lg border-gray-200 bg-gray-100 pl-12 h-12 focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center text-primary font-semibold cursor-pointer">
          <MapPin className="w-5 h-5 mr-2" />
          <span>สมุทรปราการ</span>
        </div>
      </div>

      <main className="p-4 space-y-6">
        {/* Categories Section */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-gray-800">หมวดหมู่</h2>
            <button className="flex items-center text-sm text-primary font-semibold">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.name}
                className="flex-shrink-0 flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg">{category.emoji}</span>
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Are you hiring? Card */}
        <section>
          <Card className="bg-white rounded-2xl shadow-lg border-none overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <button>
                  <MoreHorizontal className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">คุณกำลังมองหาคนอยู่ใช่ไหม?</h2>
              <p className="text-gray-600 mt-1 mb-6">
                ดึงดูดผู้สมัครที่มีคุณภาพด้วยการลงประกาศงานฟรี
              </p>
              <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-lg rounded-xl"
                  >
                    ลงประกาศงาน
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full h-full max-w-none max-h-none p-0 flex flex-col border-none rounded-none">
                  <DialogHeader className="p-4 pb-3 flex flex-row items-center justify-between sticky top-0 bg-white z-10 shadow-sm">
                    <DialogTitle className="text-lg font-bold">ลงประกาศงานใหม่</DialogTitle>
                    <DialogClose asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <X className="h-5 w-5" />
                      </Button>
                    </DialogClose>
                  </DialogHeader>
                  <AddJobForm onFinished={() => setIsAddJobOpen(false)} />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </section>
      </main>

      <EmployerBottomNavigation />
    </div>
  );
};

export default HomeEmployer;