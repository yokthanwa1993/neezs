import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Users, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import EmployerBottomNavigation from '@/components/employer/EmployerBottomNavigation';

const mockJobs = {
  active: [
    { id: 1, title: 'พนักงานเสิร์ฟ Full-time', applicants: 12, status: 'Active', location: 'สยามพารากอน' },
    { id: 2, title: 'พนักงานทำความสะอาด', applicants: 5, status: 'Active', location: 'เซ็นทรัลเวิลด์' },
  ],
  drafts: [
    { id: 3, title: 'บาริสต้า', applicants: 0, status: 'Draft', location: 'เอ็มควอเทียร์' },
  ],
  closed: [
    { id: 4, title: 'พนักงานต้อนรับ', applicants: 25, status: 'Closed', location: 'โรงแรมแมนดาริน' },
  ],
};

const JobCard = ({ job }: { job: any }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant="default" className="bg-green-500 text-white hover:bg-green-600">Active</Badge>;
      case 'Draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'Closed':
        return <Badge variant="destructive">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card className="mb-4 shadow-sm border border-gray-100">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-800">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.location}</p>
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{job.applicants} Applicants</span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {getStatusBadge(job.status)}
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex space-x-2 mt-4">
          <Button variant="outline" size="sm" className="flex-1">
            <Edit className="w-4 h-4 mr-2" /> Edit
          </Button>
          <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
            View Applicants
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const EmployerMyJobsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative">
      <div className="p-4 pt-8">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-lg">
            <TabsTrigger value="active">Active ({mockJobs.active.length})</TabsTrigger>
            <TabsTrigger value="drafts">Drafts ({mockJobs.drafts.length})</TabsTrigger>
            <TabsTrigger value="closed">Closed ({mockJobs.closed.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-4">
            {mockJobs.active.length > 0 ? (
              mockJobs.active.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <p className="text-center text-gray-500 mt-8">No active jobs.</p>
            )}
          </TabsContent>
          <TabsContent value="drafts" className="mt-4">
            {mockJobs.drafts.length > 0 ? (
              mockJobs.drafts.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <p className="text-center text-gray-500 mt-8">No jobs in drafts.</p>
            )}
          </TabsContent>
          <TabsContent value="closed" className="mt-4">
            {mockJobs.closed.length > 0 ? (
              mockJobs.closed.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <p className="text-center text-gray-500 mt-8">No closed jobs.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Button 
        onClick={() => navigate('/employer/add-job')} 
        className="absolute bottom-24 right-4 rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/90 flex items-center justify-center"
      >
        <Plus size={32} className="text-primary-foreground" />
      </Button>

      <EmployerBottomNavigation />
    </div>
  );
};

export default EmployerMyJobsPage;