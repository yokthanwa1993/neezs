import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const SeekerEkycFace: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [progress, setProgress] = useState(13);
    const [status, setStatus] = useState('กำลังเตรียมการ...');
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        // Simulate verification process
        setStatus('กำลังวิเคราะห์ใบหน้า...');
        const timer = setTimeout(() => setProgress(66), 500);
        const timer2 = setTimeout(() => {
            setProgress(100);
            setStatus('การยืนยันสำเร็จ!');
            setIsVerified(true);
        }, 1500);

        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
        };
    }, []);

    const handleFinish = () => {
        // Here you would typically submit the eKYC data to your backend
        console.log('eKYC data:', location.state);
        // Navigate to the next step or home page
        navigate('/home', { replace: true });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-1 w-full max-w-lg mx-auto p-4 pt-12 pb-24 flex flex-col items-center justify-center text-center">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">ยืนยันตัวตน (e-KYC)</h1>
                    <p className="text-muted-foreground mt-2">ขั้นตอนที่ 2: ยืนยันใบหน้า</p>
                </div>

                <div className="relative w-72 h-72 rounded-full overflow-hidden border-8 border-white shadow-2xl mb-8">
                    {/* Placeholder for camera feed - using a static image for simulation */}
                    <img src="https://via.placeholder.com/300" alt="Face Scan" className="w-full h-full object-cover" />
                    
                    {/* Animated scanning border */}
                    <div className={`absolute inset-0 rounded-full border-4 ${isVerified ? 'border-green-400' : 'border-yellow-400'} animate-pulse`}></div>
                </div>

                {isVerified ? (
                    <div className="flex flex-col items-center text-green-600">
                        <CheckCircle className="w-16 h-16 mb-4" />
                        <p className="text-2xl font-bold">{status}</p>
                    </div>
                ) : (
                    <div className="w-full px-8">
                        <Progress value={progress} className="w-full mb-4 h-3" />
                        <p className="text-lg font-semibold text-gray-700">{status}</p>
                        <p className="text-sm text-gray-500 mt-2">กรุณามองตรงและตรวจสอบให้แน่ใจว่ามีแสงสว่างเพียงพอ</p>
                    </div>
                )}
            </main>
            <footer className="sticky bottom-0 w-full bg-white/80 backdrop-blur-sm border-t p-4">
                <div className="max-w-md mx-auto">
                    {isVerified ? (
                        <Button
                            onClick={handleFinish}
                            className="w-full h-12 text-lg font-bold bg-yellow-400 text-black hover:bg-yellow-500 rounded-lg shadow-md hover:shadow-lg"
                        >
                            เสร็จสิ้นและสมัครงาน
                        </Button>
                    ) : (
                        <div className="h-12 flex items-center justify-center">
                            <p className="text-sm text-gray-500">กำลังดำเนินการ...</p>
                        </div>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default SeekerEkycFace;


