import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

const SeekerOtpVerification: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { jobId } = location.state || {};
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'phone' | 'otp'>('phone');

    const handleSendOtp = () => {
        // TODO: Implement actual OTP sending logic here
        console.log(`Sending OTP to ${phone} for job ${jobId}`);
        setStep('otp');
    };

    const handleVerifyOtp = () => {
        // TODO: Implement actual OTP verification logic here
        console.log(`Verifying OTP ${otp}`);
        navigate('/seeker/apply/select-category', { state: { jobId, phone } });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
            <main className="flex-1 w-full max-w-lg mx-auto p-4 flex flex-col justify-center">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold tracking-tight">ยินดีต้อนรับสู่ NEEZS!</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            เนื่องจากเป็นการสมัครงานครั้งแรก<br/>กรุณายืนยันเบอร์โทรศัพท์เพื่อสร้างโปรไฟล์ที่ปลอดภัยและน่าเชื่อถือ
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 p-8">
                        {step === 'phone' ? (
                            <div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pr-3 pointer-events-none">
                                        <span className="text-gray-500 text-lg">+66</span>
                                    </div>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="081 234 5678"
                                        value={phone}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            // Allow up to 10 digits for a full Thai mobile number
                                            if (value.length <= 10) {
                                                setPhone(value);
                                            }
                                        }}
                                        className="h-14 text-2xl pl-16"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label htmlFor="otp" className="block text-lg font-medium text-gray-700 mb-2">
                                    รหัส OTP (6 หลัก)
                                </label>
                                <div className="flex justify-center">
                                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                                        <InputOTPGroup className="gap-2">
                                            <InputOTPSlot index={0} className="h-14 w-14 rounded-full text-2xl" />
                                            <InputOTPSlot index={1} className="h-14 w-14 rounded-full text-2xl" />
                                            <InputOTPSlot index={2} className="h-14 w-14 rounded-full text-2xl" />
                                            <InputOTPSlot index={3} className="h-14 w-14 rounded-full text-2xl" />
                                            <InputOTPSlot index={4} className="h-14 w-14 rounded-full text-2xl" />
                                            <InputOTPSlot index={5} className="h-14 w-14 rounded-full text-2xl" />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
            <footer className="sticky bottom-0 w-full bg-white border-t p-4">
                <div className="max-w-md mx-auto flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => step === 'otp' ? setStep('phone') : navigate(-1)}
                        className="h-12 w-12 rounded-full bg-gray-200 text-black hover:bg-gray-300"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        onClick={step === 'phone' ? handleSendOtp : handleVerifyOtp}
                        className="w-full h-12 text-lg font-bold flex-1 bg-yellow-400 text-black hover:bg-yellow-500 rounded-lg"
                        disabled={(step === 'phone' && phone.length < 10) || (step === 'otp' && otp.length < 6)}
                    >
                        {step === 'phone' ? 'รับรหัส OTP' : 'ยืนยัน'}
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default SeekerOtpVerification;

