import React from 'react';
import { Link } from 'react-router-dom';
import {
  LogIn,
  Users,
  ClipboardList,
  Settings,
  Home,
  Search,
  Briefcase,
  FileText,
  Calendar,
  Wallet as WalletIcon,
  MessageSquare,
  Send,
  Bell,
  UserCircle,
  Building2,
  PlusSquare,
  UserCog,
  Shield,
} from 'lucide-react';
import { useDevMode } from '@/contexts/DevModeContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type MenuItem = {
  title: string;
  path: string;
  icon: React.ElementType;
  color: string;
};

const sharedPages: MenuItem[] = [
  { title: 'Shared: Login', path: '/login', icon: LogIn, color: 'bg-green-500' },
  { title: 'Shared: Role Selection', path: '/role-selection', icon: Users, color: 'bg-blue-500' },
  { title: 'Shared: Onboarding', path: '/onboarding', icon: ClipboardList, color: 'bg-yellow-500' },
  { title: 'Shared: Settings', path: '/settings', icon: Settings, color: 'bg-gray-500' },
];

const applicantPages: MenuItem[] = [
  { title: 'Seeker: Home', path: '/home', icon: Home, color: 'bg-sky-500' },
  { title: 'Seeker: Job Feed', path: '/jobs', icon: Search, color: 'bg-indigo-500' },
  { title: 'Seeker: Full-Time Jobs', path: '/full-time-jobs', icon: Briefcase, color: 'bg-violet-500' },
  { title: 'Seeker: Job Detail (Sample)', path: '/job/1', icon: FileText, color: 'bg-purple-500' },
  { title: 'Seeker: My Shifts', path: '/my-shifts', icon: Calendar, color: 'bg-fuchsia-500' },
  { title: 'Seeker: Wallet', path: '/wallet', icon: WalletIcon, color: 'bg-pink-500' },
  { title: 'Seeker: Chat History', path: '/chat', icon: MessageSquare, color: 'bg-rose-500' },
  { title: 'Seeker: Chat (Sample)', path: '/chat/1', icon: Send, color: 'bg-red-500' },
  { title: 'Seeker: Notifications', path: '/notifications', icon: Bell, color: 'bg-orange-500' },
  { title: 'Seeker: Profile', path: '/profile', icon: UserCircle, color: 'bg-amber-500' },
];

const employerPages: MenuItem[] = [
  { title: 'Employer: Home', path: '/employer/home', icon: Building2, color: 'bg-lime-500' },
  { title: 'Employer: Add Job', path: '/employer/add-job', icon: PlusSquare, color: 'bg-emerald-500' },
  { title: 'Employer: My Jobs', path: '/employer/my-jobs', icon: Briefcase, color: 'bg-teal-500' },
  { title: 'Employer: Chats', path: '/employer/chats', icon: MessageSquare, color: 'bg-cyan-500' },
  { title: 'Employer: Chat (Sample)', path: '/employer/chat/1', icon: Send, color: 'bg-sky-600' },
  { title: 'Employer: Notifications', path: '/employer/notifications', icon: Bell, color: 'bg-blue-600' },
  { title: 'Employer: Profile', path: '/employer/profile', icon: UserCog, color: 'bg-indigo-600' },
];

const MenuCard = ({ item }: { item: MenuItem }) => (
  <Link to={item.path} className="text-center group flex flex-col items-center">
    <div className={`w-full aspect-square rounded-2xl flex items-center justify-center ${item.color} shadow-lg group-hover:scale-105 transition-transform duration-200`}>
      <item.icon className="w-1/2 h-1/2 text-white" strokeWidth={1.5} />
    </div>
    <p className="mt-2 text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate w-full">{item.title}</p>
  </Link>
);

const DevPage: React.FC = () => {
  const { isDevMode, toggleDevMode } = useDevMode();

  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 sm:p-6">
      <div className="w-full">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Developer Menu</h1>
          <div className="flex items-center space-x-3 bg-slate-100 p-2 rounded-lg">
            <Shield className="w-5 h-5 text-primary" />
            <Label htmlFor="dev-mode-switch" className="text-slate-700 font-medium">
              Bypass Login
            </Label>
            <Switch
              id="dev-mode-switch"
              checked={isDevMode}
              onCheckedChange={toggleDevMode}
            />
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4 border-b border-slate-200 pb-2">Shared Pages</h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-x-4 gap-y-6">
            {sharedPages.map(item => <MenuCard key={item.path} item={item} />)}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4 border-b border-slate-200 pb-2">Applicant Pages</h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-x-4 gap-y-6">
            {applicantPages.map(item => <MenuCard key={item.path} item={item} />)}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4 border-b border-slate-200 pb-2">Employer Pages</h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-x-4 gap-y-6">
            {employerPages.map(item => <MenuCard key={item.path} item={item} />)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DevPage;