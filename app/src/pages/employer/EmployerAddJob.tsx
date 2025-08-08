import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

const TOTAL_STEPS = 4;

const AddJob: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    category: '',
    location: '',
    salary: '',
    jobType: '',
  });

  const handleNext = async () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      return;
    }

    // Final submission: save to Firestore
    try {
      const salaryNumber = formData.salary ? Number(formData.salary) : 0;
      await addDoc(collection(db, 'jobs'), {
        title: formData.jobTitle,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        salary: salaryNumber,
        jobType: formData.jobType || 'full-time',
        status: 'active',
        employerId: user?.uid || 'unknown',
        createdAt: serverTimestamp(),
      });
      navigate('/employer/home');
    } catch (error) {
      console.error('Failed to post job:', error);
      alert('เกิดข้อผิดพลาดในการลงประกาศงาน กรุณาลองใหม่');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1); // Go back to the previous page (HomeEmployer)
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white p-4 flex items-center border-b sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex flex-col ml-4">
            <h1 className="text-lg font-semibold">Post a Job</h1>
            <p className="text-sm text-gray-500">Step {step} of {TOTAL_STEPS}</p>
        </div>
      </header>
      
      <div className="px-4 pt-2">
        <Progress value={progress} className="w-full h-2" />
      </div>

      <main className="flex-grow p-4">
        <div className="w-full max-w-md mx-auto">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">First, let's get the basics down.</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="jobTitle" className="font-semibold">Job Title</Label>
                    <Input id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="e.g. Barista, Graphic Designer" className="mt-1"/>
                  </div>
                  <div>
                    <Label htmlFor="description" className="font-semibold">Job Description</Label>
                    <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Describe the role, responsibilities, and requirements." className="mt-1" rows={6}/>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Next, categorize the job.</h2>
                <div className="space-y-4">
                  <div>
                    <Label className="font-semibold">Category</Label>
                     <Select name="category" onValueChange={handleSelectChange('category')} value={formData.category}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="accounting">Accounting & Finance</SelectItem>
                            <SelectItem value="animal-care">Animal Care</SelectItem>
                            <SelectItem value="arts-design">Arts & Design</SelectItem>
                            <SelectItem value="babysitting">Babysitting</SelectItem>
                            <SelectItem value="beauty-wellness">Beauty & Wellness</SelectItem>
                            <SelectItem value="cleaning">Cleaning</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location" className="font-semibold">Location</Label>
                    <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Bangkok, Samut Prakan" className="mt-1"/>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Let's talk about compensation.</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="salary" className="font-semibold">Salary (THB per month)</Label>
                    <Input id="salary" name="salary" type="number" value={formData.salary} onChange={handleChange} placeholder="e.g. 25000" className="mt-1"/>
                  </div>
                  <div>
                    <Label className="font-semibold">Job Type</Label>
                    <Select name="jobType" onValueChange={handleSelectChange('jobType')} value={formData.jobType}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Ready to post?</h2>
                <p>Review the details below before posting your job.</p>
                <Card className="bg-white">
                    <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Title</span>
                            <span className="font-semibold text-right">{formData.jobTitle || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Category</span>
                            <span className="font-semibold text-right">{formData.category || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Location</span>
                            <span className="font-semibold text-right">{formData.location || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Salary</span>
                            <span className="font-semibold text-right">{formData.salary ? `${formData.salary} THB` : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Job Type</span>
                            <span className="font-semibold text-right">{formData.jobType || '-'}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Description</span>
                            <p className="mt-1 text-sm font-semibold whitespace-pre-wrap">{formData.description || '-'}</p>
                        </div>
                    </CardContent>
                </Card>
              </div>
            )}
        </div>
      </main>

      <footer className="p-4 bg-white border-t sticky bottom-0">
        <Button onClick={handleNext} className="w-full max-w-md mx-auto flex py-6 text-lg">
          {step === TOTAL_STEPS ? 'Confirm and Post Job' : 'Next Step'}
        </Button>
      </footer>
    </div>
  );
};

export default AddJob;