import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useDevMode } from './contexts/DevModeContext';
import { useRole } from './contexts/RoleContext';
import { AppProviders } from '@/providers/AppProviders';
import LineLogin from './components/shared/LineLogin';
import SeekerProfilePage from './pages/seeker/SeekerProfilePage';
import SeekerWallet from './components/seeker/SeekerWallet';
import SeekerMyShifts from './components/seeker/SeekerMyShifts';
import Onboarding from './components/shared/Onboarding';
import SeekerJobDetail from './components/seeker/SeekerJobDetail';
import SeekerJobFeed from './components/seeker/SeekerJobFeed';
import SeekerHome from './pages/seeker/SeekerHome';
import SeekerChatPage from './components/seeker/SeekerChatPage';
import SettingsPage from './pages/shared/SettingsPage';
import SeekerChatHistoryPage from './pages/seeker/SeekerChatHistoryPage';
import NotificationsPage from './pages/shared/NotificationsPage';
import SeekerFullTimeJobs from './pages/seeker/SeekerFullTimeJobs';
import LineCallback from './components/shared/LineCallback';
import DevPage from './pages/shared/DevPage';
import EmployerHome from './pages/employer/EmployerHome';
import EmployerChatHistoryPage from './pages/employer/EmployerChatHistoryPage';
import EmployerChatPage from './pages/employer/EmployerChatPage';
import EmployerMyJobsPage from './pages/employer/EmployerMyJobsPage';
import EmployerNotificationsPage from './pages/employer/EmployerNotificationsPage';
import EmployerProfile from './pages/employer/EmployerProfile';
import RoleSelection from './pages/shared/RoleSelection';
import MapView from './pages/shared/MapView';
import EmployerEditProfilePage from './pages/employer/EmployerEditProfilePage';
import EmployerTeamManagementPage from './pages/employer/EmployerTeamManagementPage';
import EmployerBillingPage from './pages/employer/EmployerBillingPage';
import EmployerSecurityPage from './pages/employer/EmployerSecurityPage';
import SupportPage from './pages/shared/SupportPage';
import EmployerLayout from './pages/employer/EmployerLayout';
import EmployerAddJob from './pages/employer/EmployerAddJob';

const AppContent = () => {
  const { user, isLoading } = useAuth();
  const { isDevMode } = useDevMode();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const protectedRoute = (element: React.ReactElement) => {
    if (isDevMode) return element;
    return user ? element : <Navigate to="/login" replace />;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full">
        <Routes>
          {/* Root and Shared Routes */}
          <Route path="/" element={<DevPage />} />
          <Route path="/login" element={<LineLogin onLoginSuccess={() => navigate('/role-selection')} />} />
          <Route path="/callback" element={<LineCallback />} />
          <Route path="/role-selection" element={protectedRoute(<RoleSelection />)} />
          <Route path="/onboarding" element={protectedRoute(<Onboarding />)} />
          <Route path="/settings" element={protectedRoute(<SettingsPage />)} />
          <Route path="/map-view" element={<MapView />} />
          <Route path="/support" element={protectedRoute(<SupportPage />)} />
          
          {/* Seeker Routes (no /seeker prefix) */}
          <Route path="/home" element={<SeekerHome />} />
          <Route path="/profile" element={protectedRoute(<SeekerProfilePage />)} />
          <Route path="/wallet" element={protectedRoute(<SeekerWallet />)} />
          <Route path="/my-shifts" element={protectedRoute(<SeekerMyShifts />)} />
          <Route path="/job/:id" element={<SeekerJobDetail />} />
          <Route path="/jobs" element={<SeekerJobFeed />} />
          <Route path="/full-time-jobs" element={<SeekerFullTimeJobs />} />
          <Route path="/chat" element={protectedRoute(<SeekerChatHistoryPage />)} />
          <Route path="/chat/:id" element={protectedRoute(<SeekerChatPage />)} />
          <Route path="/notifications" element={protectedRoute(<NotificationsPage />)} />
          
          {/* Employer Routes (absolute only, wrapped with layout) */}

          {/* Absolute aliases for employer routes (helps dev switcher that lists child paths relatively) */}
          <Route path="/employer/home" element={protectedRoute(<EmployerLayout><EmployerHome /></EmployerLayout>)} />
          <Route path="/employer/my-jobs" element={protectedRoute(<EmployerLayout><EmployerMyJobsPage /></EmployerLayout>)} />
          <Route path="/employer/chats" element={protectedRoute(<EmployerLayout><EmployerChatHistoryPage /></EmployerLayout>)} />
          <Route path="/employer/chat/:id" element={protectedRoute(<EmployerLayout><EmployerChatPage /></EmployerLayout>)} />
          <Route path="/employer/add-job" element={protectedRoute(<EmployerLayout><EmployerAddJob /></EmployerLayout>)} />
          <Route path="/employer/notifications" element={protectedRoute(<EmployerLayout><EmployerNotificationsPage /></EmployerLayout>)} />
          <Route path="/employer/profile" element={protectedRoute(<EmployerLayout><EmployerProfile /></EmployerLayout>)} />
          <Route path="/employer/edit-profile" element={protectedRoute(<EmployerLayout><EmployerEditProfilePage /></EmployerLayout>)} />
          <Route path="/employer/team" element={protectedRoute(<EmployerLayout><EmployerTeamManagementPage /></EmployerLayout>)} />
          <Route path="/employer/billing" element={protectedRoute(<EmployerLayout><EmployerBillingPage /></EmployerLayout>)} />
          <Route path="/employer/security" element={protectedRoute(<EmployerLayout><EmployerSecurityPage /></EmployerLayout>)} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppProviders>
        <AppContent />
      </AppProviders>
    </Router>
  );
}

export default App;