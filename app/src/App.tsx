import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useDevMode } from './contexts/DevModeContext';
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
import NotFound from './pages/shared/NotFound';
import SeekerLayout from './pages/seeker/SeekerLayout';
import AppLayout from './components/shared/AppLayout';
import ChangeEmailPage from './pages/ChangeEmailPage';
import RoleLayoutWrapper from './components/shared/RoleLayoutWrapper';
import EmployerJobApplicants from './pages/employer/EmployerJobApplicants';
import EmployerApplicantProfilePage from './pages/employer/EmployerApplicantProfilePage';
import { JobProvider } from './contexts/JobContext';
import EmployerJobSchedule from './pages/employer/EmployerJobSchedule';
import EmployerJobPublish from './pages/employer/EmployerJobPublish';
import EmployerJobUpload from './pages/employer/EmployerJobUpload';

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
    <Routes>
      {/* Root and Shared Routes */}
      <Route path="/" element={<AppLayout><DevPage /></AppLayout>} />
      <Route path="/login" element={<AppLayout><LineLogin onLoginSuccess={() => navigate('/role-selection')} /></AppLayout>} />
      <Route path="/callback" element={<AppLayout><LineCallback /></AppLayout>} />
      
      {/* Protected routes with specific layouts */}
      <Route path="/role-selection" element={protectedRoute(<AppLayout><RoleSelection /></AppLayout>)} />
      <Route path="/onboarding" element={protectedRoute(<AppLayout><Onboarding /></AppLayout>)} />
      
      {/* These shared pages now get the correct role-based navbar */}
      <Route path="/settings" element={protectedRoute(<RoleLayoutWrapper><SettingsPage /></RoleLayoutWrapper>)} />
      <Route path="/support" element={protectedRoute(<RoleLayoutWrapper><SupportPage /></RoleLayoutWrapper>)} />
      <Route path="/change-email" element={protectedRoute(<RoleLayoutWrapper><ChangeEmailPage /></RoleLayoutWrapper>)} />
      
      <Route path="/map-view" element={<AppLayout><MapView /></AppLayout>} />
      
      {/* Seeker Routes wrapped in SeekerLayout */}
      <Route path="/home" element={<SeekerLayout><SeekerHome /></SeekerLayout>} />
      <Route path="/profile" element={<SeekerLayout><SeekerProfilePage /></SeekerLayout>} />
      <Route path="/wallet" element={protectedRoute(<SeekerLayout><SeekerWallet /></SeekerLayout>)} />
      <Route path="/my-shifts" element={protectedRoute(<SeekerLayout><SeekerMyShifts /></SeekerLayout>)} />
      <Route path="/job/:id" element={<SeekerLayout><SeekerJobDetail /></SeekerLayout>} />
      <Route path="/jobs" element={<SeekerLayout><SeekerJobFeed /></SeekerLayout>} />
      <Route path="/full-time-jobs" element={<SeekerLayout><SeekerFullTimeJobs /></SeekerLayout>} />
      <Route path="/chat" element={<SeekerLayout><SeekerChatHistoryPage /></SeekerLayout>} />
      <Route path="/chat/:id" element={<SeekerLayout><SeekerChatPage /></SeekerLayout>} />
      <Route path="/notifications" element={<SeekerLayout><NotificationsPage /></SeekerLayout>} />
      
      {/* Employer Routes (wrapped with layout, except add-job) */}
      <Route path="/employer/add-job" element={<EmployerAddJob />} />
      <Route path="/employer/home" element={<EmployerLayout><EmployerHome /></EmployerLayout>} />
      <Route path="/employer/job/:jobId/applicants" element={<EmployerLayout><EmployerJobApplicants /></EmployerLayout>} />
      <Route path="/employer/applicant/:applicantId" element={<EmployerLayout><EmployerApplicantProfilePage /></EmployerLayout>} />
      <Route path="/employer/my-jobs" element={<EmployerLayout><EmployerMyJobsPage /></EmployerLayout>} />
      <Route path="/employer/chat" element={<EmployerLayout><EmployerChatHistoryPage /></EmployerLayout>} />
      <Route path="/employer/chat/:id" element={<EmployerLayout><EmployerChatPage /></EmployerLayout>} />
      <Route path="/employer/notifications" element={<EmployerLayout><EmployerNotificationsPage /></EmployerLayout>} />
      <Route path="/employer/profile" element={<EmployerLayout><EmployerProfile /></EmployerLayout>} />
      <Route path="/employer/edit-profile" element={<EmployerLayout><EmployerEditProfilePage /></EmployerLayout>} />
      <Route path="/employer/team" element={<EmployerLayout><EmployerTeamManagementPage /></EmployerLayout>} />
      <Route path="/employer/billing" element={<EmployerLayout><EmployerBillingPage /></EmployerLayout>} />
      <Route path="/employer/security" element={<EmployerLayout><EmployerSecurityPage /></EmployerLayout>} />
      <Route path="/employer/job-schedule" element={<EmployerJobSchedule />} />
      <Route path="/employer/job-publish" element={<EmployerJobPublish />} />
      <Route path="/employer/job-upload" element={<EmployerJobUpload />} />
      <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
    </Routes>
  );
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppProviders>
        <JobProvider>
          <AppContent />
        </JobProvider>
      </AppProviders>
    </Router>
  );
}

export default App;