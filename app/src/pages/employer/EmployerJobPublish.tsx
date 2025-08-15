import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, X, ArrowLeft } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useJobs } from '@/contexts/JobContext';
import { Input } from '@/components/ui/input';

const EmployerJobPublish: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addJob } = useJobs();
    const { aiPrompt, locationMode, locationDetails, wage, wageType } = location.state || {};

    const [date, setDate] = useState<Date | undefined>(undefined);
    const [time, setTime] = useState('');

    const handleNext = () => {
        navigate('/employer/job-upload', {
            state: {
                ...location.state,
                date,
                time,
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
                        <CardTitle className="text-3xl font-bold">เลือกวันและเวลา</CardTitle>
                        <CardDescription>ระบุวันและเวลาที่ต้องการให้เริ่มงาน</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="date" className="block text-lg font-medium text-gray-700 mb-2">
                                    วันที่
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal h-14 text-lg",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-6 w-6" />
                                            {date ? format(date, "PPP", { locale: th }) : <span>เลือกวันที่</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                            locale={th}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div>
                                <label htmlFor="time" className="block text-lg font-medium text-gray-700 mb-2">
                                    เวลา
                                </label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                                    <Input
                                        id="time"
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="pl-12 h-14 text-lg"
                                    />
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
                        disabled={!date || !time}
                    >
                        ถัดไป
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default EmployerJobPublish;
