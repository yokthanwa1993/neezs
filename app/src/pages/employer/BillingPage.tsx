import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BillingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-gray-800">การชำระเงินและแพ็กเกจ</h1>
      </header>
      <main className="p-4 space-y-6">
        <Card className="border-primary border-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>แพ็กเกจปัจจุบันของคุณ</CardTitle>
              <Badge className="bg-primary/20 text-primary">ฟรี</Badge>
            </div>
            <CardDescription>คุณกำลังใช้แพ็กเกจฟรี</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />ลงประกาศงานได้ 1 ตำแหน่ง/เดือน</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />เข้าถึงผู้สมัครได้จำกัด</li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-2xl font-bold">อัปเกรดเพื่อเข้าถึงฟีเจอร์เพิ่มเติม</h2>
          <p className="text-gray-500">เลือกแพ็กเกจที่เหมาะกับธุรกิจของคุณ</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>สำหรับธุรกิจที่กำลังเติบโต</CardDescription>
              <p className="text-3xl font-bold pt-2">฿999<span className="text-lg font-normal">/เดือน</span></p>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-primary" />ลงประกาศงานได้ 10 ตำแหน่ง/เดือน</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-primary" />เข้าถึงผู้สมัครได้ไม่จำกัด</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-primary" />โปรโมทประกาศงาน</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-primary" />เครื่องมือจัดการผู้สมัคร</li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0">
              <Button className="w-full">เลือกแพ็กเกจ Pro</Button>
            </div>
          </Card>
          <Card className="border-primary border-2 relative flex flex-col">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground"><Star className="w-3 h-3 mr-1"/> ยอดนิยม</Badge>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>สำหรับองค์กรขนาดใหญ่</CardDescription>
              <p className="text-3xl font-bold pt-2">ติดต่อเรา</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-primary" />ทุกอย่างใน Pro</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-primary" />ลงประกาศงานไม่จำกัด</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-primary" />สร้างแบรนด์บริษัท</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-primary" />การสนับสนุนระดับพรีเมียม</li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0">
              <Button variant="outline" className="w-full">ติดต่อฝ่ายขาย</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BillingPage;