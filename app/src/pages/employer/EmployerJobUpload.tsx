import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, X, Loader2, ArrowLeft } from 'lucide-react';
import { useJobs } from '@/contexts/JobContext';
import { Input } from '@/components/ui/input';
import { apiClient } from '@neeiz/api-client';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

const EmployerJobUpload: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addJob } = useJobs();
    const { aiPrompt, locationMode, locationDetails, wage, wageType, date, time } = location.state || {};

    const [images, setImages] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    
    const uploadFile = async (file: File) => {
        const fd = new FormData();
        fd.append('file', file);
        const res = await apiClient.post('/api/jobs/upload', fd);
        return res.data.url as string;
    };

    const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        setIsUploading(true);
        try {
            const uploadedUrls = await Promise.all(files.map(uploadFile));
            setImages(prev => [...prev, ...uploadedUrls]);
        } catch (err) {
            console.error('Upload error:', err);
            alert('อัปโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่');
        } finally {
            setIsUploading(false);
            if (e.currentTarget) e.currentTarget.value = '';
        }
    };

    const removeImageAt = (idx: number) => {
        setImages(prev => prev.filter((_, i) => i !== idx));
    };

    const handleNext = () => {
        navigate('/employer/job-summary', {
            state: {
                aiPrompt,
                locationMode: location.state.locationMode,
                locationDetails: location.state.locationDetails,
                wage: location.state.wage,
                wageType: location.state.wageType,
                date: location.state.date,
                time: location.state.time,
                images: images,
            },
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
                        <CardTitle className="text-3xl font-bold">อัปโหลดรูปภาพ</CardTitle>
                        <CardDescription>เพิ่มรูปภาพเพื่อดึงดูดผู้สมัคร (ไม่บังคับ)</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <label htmlFor="image-upload" className="cursor-pointer block border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary hover:bg-primary/5 transition-colors">
                            <Upload className="mx-auto h-16 w-16 text-gray-400" />
                            <p className="mt-4 text-lg text-gray-600">คลิกเพื่ออัปโหลด</p>
                            <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF</p>
                        </label>
                        <Input id="image-upload" type="file" className="hidden" multiple accept="image/*" onChange={handleImagesChange} disabled={isUploading} />
                        
                        {isUploading && (
                            <div className="mt-6 flex items-center justify-center text-lg text-gray-600">
                                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                                กำลังอัปโหลด...
                            </div>
                        )}
                        {images.length > 0 && (
                            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {images.map((url, idx) => (
                                    <div key={idx} className="relative group aspect-square">
                                        <img src={url} alt={`upload-preview-${idx}`} className="w-full h-full object-cover rounded-md shadow-md" />
                                        <button
                                            onClick={() => removeImageAt(idx)}
                                            className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                            aria-label="Remove image"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
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
                    >
                        ถัดไป
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default EmployerJobUpload;
