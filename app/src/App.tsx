import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useDevMode } from './contexts/DevModeContext';
import { AppProviders } from '@/providers/AppProviders';
import LineLogin from './components/shared/LineLogin';
import SeekerProfilePage from './pages/seeker/SeekerProfilePage';
import SeekerProfileEditPage from './pages/seeker/SeekerProfileEditPage';
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
import EmployerJobDetail from './pages/employer/EmployerJobDetail';
import { JobProvider } from './contexts/JobContext';
import EmployerJobSchedule from './pages/employer/EmployerJobSchedule';
// import EmployerJobPublish from './pages/employer/EmployerJobPublish.tsx';
import EmployerJobUpload from './pages/employer/EmployerJobUpload.tsx';
import EmployerJobWage from './pages/employer/EmployerJobWage';
import EmployerJobSummary from './pages/employer/EmployerJobSummary';
import SeekerOtpVerification from './pages/seeker/apply/SeekerOtpVerification';
import SeekerCategorySelection from './pages/seeker/apply/SeekerCategorySelection';
import OnboardingFlow from './pages/shared/OnboardingFlow';
import SeekerEkycId from './pages/seeker/apply/SeekerEkycId';
import SeekerEkycFace from './pages/seeker/apply/SeekerEkycFace';
import EmployerSeekerSelection from './pages/employer/EmployerSeekerSelection';
import EmployerSeekerProfile from './pages/employer/EmployerSeekerProfile';
import EmployerLogin from './components/shared/EmployerLogin';

const AppContent = () => {
  const { user, isLoading } = useAuth();
  const { isDevMode } = useDevMode();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (!onboardingCompleted) {
      navigate('/welcome', { replace: true });
    }
  }, [navigate]);


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
      <Route path="/welcome" element={<OnboardingFlow />} />
      <Route path="/login" element={<AppLayout><LineLogin onLoginSuccess={() => navigate('/role-selection')} /></AppLayout>} />
      <Route path="/employer-login" element={<AppLayout><EmployerLogin onLoginSuccess={() => navigate('/employer/profile')} /></AppLayout>} />
      <Route path="/callback" element={<AppLayout><LineCallback /></AppLayout>} />
      
      {/* Protected routes with specific layouts */}
      <Route path="/role-selection" element={protectedRoute(<AppLayout><RoleSelection /></AppLayout>)} />
      <Route path="/onboarding" element={protectedRoute(<AppLayout><Onboarding /></AppLayout>)} />
      
      {/* These shared pages now get the correct role-based navbar */}
      <Route path="/settings" element={protectedRoute(<RoleLayoutWrapper><SettingsPage /></RoleLayoutWrapper>)} />
      <Route path="/support" element={protectedRoute(<RoleLayoutWrapper><SupportPage /></RoleLayoutWrapper>)} />
      <Route path="/change-email" element={protectedRoute(<RoleLayoutWrapper><ChangeEmailPage /></RoleLayoutWrapper>)} />
      
      <Route path="/map-view" element={<MapView />} />
      
      {/* Seeker Routes wrapped in SeekerLayout */}
      <Route path="/home" element={<SeekerLayout><SeekerHome /></SeekerLayout>} />
      <Route path="/profile" element={<SeekerLayout><SeekerProfilePage /></SeekerLayout>} />
      <Route path="/profile/edit" element={<SeekerLayout><SeekerProfileEditPage /></SeekerLayout>} />
      <Route path="/wallet" element={protectedRoute(<SeekerLayout><SeekerWallet /></SeekerLayout>)} />
      <Route path="/my-shifts" element={protectedRoute(<SeekerLayout><SeekerMyShifts /></SeekerLayout>)} />
      <Route path="/job/:id" element={<SeekerLayout><SeekerJobDetail /></SeekerLayout>} />
      <Route path="/jobs" element={<SeekerLayout><SeekerJobFeed /></SeekerLayout>} />
      <Route path="/full-time-jobs" element={<SeekerLayout><SeekerFullTimeJobs /></SeekerLayout>} />
      <Route path="/chat" element={<SeekerLayout><SeekerChatHistoryPage /></SeekerLayout>} />
      <Route path="/chat/:id" element={<SeekerLayout><SeekerChatPage /></SeekerLayout>} />
      <Route path="/notifications" element={<SeekerLayout><NotificationsPage /></SeekerLayout>} />
      
      {/* Seeker Application Flow */}
      <Route path="/seeker/apply/otp" element={<SeekerOtpVerification />} />
      <Route path="/seeker/apply/select-category" element={<SeekerCategorySelection />} />
      <Route path="/seeker/apply/ekyc-id" element={<SeekerEkycId />} />
      <Route path="/seeker/apply/ekyc-face" element={<SeekerEkycFace />} />
      
      {/* Employer Routes: home is the Add Job page, my-jobs is the job list */}
      <Route path="/employer/home" element={<EmployerLayout><EmployerAddJob /></EmployerLayout>} />
      <Route path="/employer/add-job" element={<Navigate to="/employer/home" replace />} />
      <Route path="/employer/my-jobs" element={<EmployerLayout><EmployerMyJobsPage /></EmployerLayout>} />
      <Route path="/employer/job/:jobId/seekers" element={<EmployerLayout><EmployerSeekerSelection /></EmployerLayout>} />
      <Route path="/employer/seeker/:seekerId/profile" element={<EmployerLayout><EmployerSeekerProfile /></EmployerLayout>} />
      <Route path="/employer/job/:jobId/detail" element={<EmployerLayout><EmployerJobDetail /></EmployerLayout>} />
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
      <Route path="/employer/job-schedule" element={<EmployerLayout><EmployerJobSchedule /></EmployerLayout>} />
      <Route path="/employer/job-wage" element={<EmployerLayout><EmployerJobWage /></EmployerLayout>} />
      {/* <Route path="/employer/job-publish" element={<EmployerJobPublish />} /> */}
      <Route path="/employer/job-upload" element={<EmployerJobUpload />} />
      <Route path="/employer/job-summary" element={<EmployerLayout><EmployerJobSummary /></EmployerLayout>} />
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