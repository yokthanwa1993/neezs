import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { apiClient } from '@neeiz/api-client';
import { useAuth } from '@/contexts/AuthContext';

const TOTAL_STEPS = 4;

interface AddJobFormProps {
  onFinished: () => void;
}

const AddJobForm: React.FC<AddJobFormProps> = ({ onFinished }) => {
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    category: '',
    location: '',
    salary: '',
    jobType: '',
    images: '',
  });

  const handleNext = async () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      return;
    }

    // Final submission -> call API
    try {
      const salaryNumber = formData.salary ? Number(formData.salary) : 0;
      await apiClient.post('/api/jobs', {
        title: formData.jobTitle,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        salary: salaryNumber,
        jobType: formData.jobType || 'full-time',
        status: 'active',
        employerId: user?.id || 'unknown',
        images: formData.images
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      });
      alert('ลงประกาศงานเรียบร้อยแล้ว!');
      onFinished();
    } catch (error) {
      console.error('Failed to post job:', error);
      alert('เกิดข้อผิดพลาดในการลงประกาศงาน กรุณาลองใหม่');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-2">
        <Progress value={progress} className="w-full h-2" />
        <p className="text-sm text-gray-500 text-center mt-2">ขั้นตอนที่ {step} จาก {TOTAL_STEPS}</p>
      </div>

      <main className="flex-grow p-6 overflow-y-auto">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">เริ่มต้นด้วยข้อมูลพื้นฐาน</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="jobTitle" className="font-semibold">ชื่อตำแหน่งงาน</Label>
                <Input id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="เช่น บาริสต้า, พนักงานเสิร์ฟ" className="mt-1"/>
              </div>
              <div>
                <Label htmlFor="description" className="font-semibold">รายละเอียดงาน</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="อธิบายลักษณะงาน, ความรับผิดชอบ, และคุณสมบัติ" className="mt-1" rows={5}/>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">ถัดไป, เลือกประเภทของงาน</h3>
            <div className="space-y-4">
              <div>
                <Label className="font-semibold">หมวดหมู่</Label>
                 <Select name="category" onValueChange={handleSelectChange('category')} value={formData.category}>
                    <SelectTrigger className="mt-1">
                        <SelectValue placeholder="เลือกหมวดหมู่" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="accounting">บัญชีและการเงิน</SelectItem>
                        <SelectItem value="animal-care">ดูแลสัตว์</SelectItem>
                        <SelectItem value="arts-design">ศิลปะและการออกแบบ</SelectItem>
                        <SelectItem value="babysitting">ดูแลเด็ก</SelectItem>
                        <SelectItem value="beauty-wellness">ความงามและสุขภาพ</SelectItem>
                        <SelectItem value="cleaning">ทำความสะอาด</SelectItem>
                        <SelectItem value="other">อื่นๆ</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location" className="font-semibold">สถานที่</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="เช่น กรุงเทพ, สมุทรปราการ" className="mt-1"/>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">มาคุยเรื่องค่าตอบแทนกัน</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="salary" className="font-semibold">เงินเดือน (บาทต่อเดือน)</Label>
                <Input id="salary" name="salary" type="number" value={formData.salary} onChange={handleChange} placeholder="เช่น 25000" className="mt-1"/>
              </div>
              <div>
                <Label className="font-semibold">ประเภทการจ้างงาน</Label>
                <Select name="jobType" onValueChange={handleSelectChange('jobType')} value={formData.jobType}>
                    <SelectTrigger className="mt-1">
                        <SelectValue placeholder="เลือกประเภทการจ้างงาน" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="full-time">งานประจำ</SelectItem>
                        <SelectItem value="part-time">พาร์ทไทม์</SelectItem>
                        <SelectItem value="contract">สัญญาจ้าง</SelectItem>
                        <SelectItem value="internship">ฝึกงาน</SelectItem>
                        <SelectItem value="freelance">ฟรีแลนซ์</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="images" className="font-semibold">รูปภาพ (URL ทีละบรรทัด)</Label>
                <Textarea id="images" name="images" value={formData.images} onChange={handleChange} placeholder="https://...\nhttps://..." className="mt-1" rows={4}/>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">พร้อมที่จะประกาศงานหรือยัง?</h3>
            <p className="text-sm text-gray-600">ตรวจสอบรายละเอียดด้านล่างก่อนลงประกาศงานของคุณ</p>
            <Card className="bg-gray-50">
                <CardContent className="p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">ตำแหน่ง:</span>
                        <span className="font-semibold text-right">{formData.jobTitle || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">หมวดหมู่:</span>
                        <span className="font-semibold text-right">{formData.category || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">สถานที่:</span>
                        <span className="font-semibold text-right">{formData.location || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">เงินเดือน:</span>
                        <span className="font-semibold text-right">{formData.salary ? `${formData.salary} บาท` : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">ประเภทงาน:</span>
                        <span className="font-semibold text-right">{formData.jobType || '-'}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">รูปภาพ (URL, ใส่ทีละบรรทัด)</span>
                        <p className="mt-1 font-mono whitespace-pre-wrap">{formData.images || '-'}</p>
                    </div>
                </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="p-4 bg-white border-t flex gap-2">
        {step > 1 && (
          <Button variant="outline" onClick={handleBack} className="w-1/3">
            ย้อนกลับ
          </Button>
        )}
        <Button onClick={handleNext} className="flex-grow">
          {step === TOTAL_STEPS ? 'ยืนยันและประกาศงาน' : 'ขั้นตอนถัดไป'}
        </Button>
      </footer>
    </div>
  );
};

export default AddJobForm;