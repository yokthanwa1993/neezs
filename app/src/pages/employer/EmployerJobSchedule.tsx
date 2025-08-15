import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, X, ArrowLeft } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EmployerJobSchedule: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { aiPrompt, locationMode, locationDetails } = location.state || {};

    const [wage, setWage] = useState('');
    const [wageType, setWageType] = useState('per_hour');

    const handleNext = () => {
        navigate('/employer/job-publish', { 
            state: { 
                ...location.state,
                wage,
                wageType,
            } 
        });
    };

    if (!aiPrompt) {
        React.useEffect(() => {
            navigate('/employer/add-job');
        }, [navigate]);
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
            <main className="flex-1 w-full max-w-lg mx-auto p-4 flex flex-col justify-center">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold">กำหนดค่าจ้าง</CardTitle>
                        <CardDescription>ระบุค่าตอบแทนสำหรับงานนี้</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 p-8">
                        <div>
                            <label htmlFor="wage" className="block text-lg font-medium text-gray-700 mb-2">
                                ค่าจ้าง (บาท)
                            </label>
                            <div className="flex items-end gap-4">
                                <div className="flex-1 relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                                    <Input
                                        id="wage"
                                        type="number"
                                        placeholder="เช่น 500"
                                        value={wage}
                                        onChange={(e) => setWage(e.target.value)}
                                        className="pl-12 h-14 text-2xl"
                                    />
                                </div>
                                <div className="w-48">
                                    <Select value={wageType} onValueChange={setWageType}>
                                        <SelectTrigger className="h-14 text-lg">
                                            <SelectValue placeholder="ประเภท" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="per_hour" className="text-lg">ต่อชั่วโมง</SelectItem>
                                            <SelectItem value="per_day" className="text-lg">ต่อวัน</SelectItem>
                                            <SelectItem value="lump_sum" className="text-lg">เหมาจ่าย</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
            <footer className="sticky bottom-0 w-full bg-white border-t p-4">
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
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/employer/home')}
                        className="h-12 w-12 rounded-full bg-black text-white hover:bg-gray-800"
                    >
                        <X className="h-6 w-6" />
                    </Button>
                    <Button
                        onClick={handleNext}
                        className="w-full h-12 text-lg font-bold flex-1 bg-yellow-400 text-black hover:bg-yellow-500 rounded-lg"
                        disabled={!wage}
                    >
                        ถัดไป
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default EmployerJobSchedule;
