import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Camera } from 'lucide-react';

const SeekerEkycId: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [idCardImage, setIdCardImage] = useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIdCardImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNext = () => {
        navigate('/seeker/apply/ekyc-face', { state: { ...location.state, idCardImage } });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-1 w-full max-w-lg mx-auto p-4 pt-12 pb-24 flex flex-col">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">ยืนยันตัวตน (e-KYC)</h1>
                    <p className="text-muted-foreground mt-2">ขั้นตอนที่ 1: กรุณาถ่ายรูปบัตรประชาชน</p>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div 
                        className="w-full h-52 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {idCardImage ? (
                            <img src={idCardImage} alt="ID Card Preview" className="w-full h-full object-contain rounded-lg p-2" />
                        ) : (
                            <>
                                <Camera className="w-16 h-16 text-gray-400 mb-4" />
                                <p className="font-semibold text-gray-600">แตะเพื่อถ่ายรูป / อัปโหลด</p>
                                <p className="text-sm text-gray-400 mt-1">วางบัตรบนพื้นหลังสีเรียบ</p>
                            </>
                        )}
                    </div>
                    <input 
                        type="file" 
                        accept="image/*" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <ul className="text-left text-gray-500 text-sm mt-6 list-disc list-inside space-y-2 w-full">
                        <li>ตรวจสอบให้แน่ใจว่ารูปภาพคมชัดและเห็นข้อมูลครบถ้วน</li>
                        <li>ไม่มีแสงสะท้อนบนบัตร</li>
                        <li>บัตรยังไม่หมดอายุ</li>
                    </ul>
                </div>
            </main>
            <footer className="sticky bottom-0 w-full bg-white/80 backdrop-blur-sm border-t p-4">
                <div className="max-w-md mx-auto flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(-1)}
                        className="h-12 w-12 rounded-full bg-gray-200 text-black hover:bg-gray-300"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        onClick={handleNext}
                        className="w-full h-12 text-lg font-bold flex-1 bg-yellow-400 text-black hover:bg-yellow-500 rounded-lg shadow-md hover:shadow-lg"
                        disabled={!idCardImage}
                    >
                        ถัดไป
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default SeekerEkycId;


