import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, 
  Edit, 
  Users, 
  CreditCard, 
  Shield, 
  HelpCircle, 
  LogOut,
  Briefcase,
  UserCheck
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EmployerProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const companyProfile = {
    name: 'Tech Solutions Co.',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=center',
    owner: user?.name || 'ผู้จัดการ',
    stats: {
      jobsPosted: 15,
      totalApplicants: 258,
    },
  };

  const handleLogout = async () => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?')) {
      await logout();
      navigate('/');
    }
  };

  const menuItems = [
    { icon: Edit, text: 'แก้ไขข้อมูลบริษัท', path: '/employer/edit-profile' },
    { icon: Users, text: 'จัดการทีม', path: '/employer/team' },
    { icon: CreditCard, text: 'การชำระเงินและแพ็กเกจ', path: '/employer/billing' },
    { icon: Shield, text: 'ความปลอดภัย', path: '/employer/security' },
    { icon: HelpCircle, text: 'ศูนย์ช่วยเหลือ', path: '/support' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4 pt-8">
        {/* Company Info Card */}
        <Card className="mb-6 shadow-md">
          <CardContent className="p-4 flex items-center space-x-4">
            <Avatar className="w-20 h-20 border-4 border-primary/20">
              <AvatarImage src={companyProfile.logo} alt={companyProfile.name} />
              <AvatarFallback>
                <Building className="w-8 h-8 text-gray-400" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{companyProfile.name}</h2>
              <p className="text-gray-600">บริหารโดย: {companyProfile.owner}</p>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary mb-2" />
              <p className="text-2xl font-bold">{companyProfile.stats.jobsPosted}</p>
              <p className="text-sm text-gray-500">งานที่ประกาศ</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-500 mb-2" />
              <p className="text-2xl font-bold">{companyProfile.stats.totalApplicants}</p>
              <p className="text-sm text-gray-500">ผู้สมัครทั้งหมด</p>
            </CardContent>
          </Card>
        </div>

        {/* Menu */}
        <Card className="shadow-sm">
          <CardContent className="p-2">
            <div className="divide-y divide-gray-100">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={() => navigate(item.path)}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-primary/10 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 text-gray-500 mr-4 group-hover:text-primary" />
                      <span className="text-gray-700 font-medium group-hover:text-primary">{item.text}</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full mt-6 bg-red-50 text-red-600 hover:bg-red-100"
        >
          <LogOut className="w-4 h-4 mr-2" />
          ออกจากระบบ
        </Button>
      </div>
    </div>
  );
};

export default EmployerProfile;