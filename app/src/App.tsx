import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LiffProvider } from './contexts/LiffContext';
import { DevModeProvider, useDevMode } from './contexts/DevModeContext';
import { RoleProvider, useRole } from './contexts/RoleContext';
import LineLogin from './components/shared/LineLogin';
import ProfilePage from './pages/applicant/ProfilePage';
import Wallet from './components/applicant/Wallet';
import MyShifts from './components/applicant/MyShifts';
import Onboarding from './components/shared/Onboarding';
import JobDetail from './components/applicant/JobDetail';
import JobFeed from './components/applicant/JobFeed';
import HomeSeeker from './pages/applicant/HomeSeeker';
import ChatPage from './components/applicant/ChatPage';
import SettingsPage from './pages/shared/SettingsPage';
import ChatHistoryPage from './pages/applicant/ChatHistoryPage';
import NotificationsPage from './pages/shared/NotificationsPage';
import FullTimeJobs from './pages/applicant/FullTimeJobs';
import LineCallback from './components/shared/LineCallback';
import DevPage from './pages/shared/DevPage';
import EmployerAddJobPage from './pages/employer/EmployerAddJobPage';
import HomeEmployer from './pages/employer/HomeEmployer';
import EmployerChatHistoryPage from './pages/employer/EmployerChatHistoryPage';
import EmployerChatPage from './pages/employer/EmployerChatPage';
import EmployerMyJobsPage from './pages/employer/EmployerMyJobsPage';
import EmployerNotificationsPage from './pages/employer/EmployerNotificationsPage';
import EmployerProfile from './pages/employer/EmployerProfile';
import RoleSelection from './pages/shared/RoleSelection';
import MapView from './pages/shared/MapView';
import EditProfilePage from './pages/employer/EditProfilePage';
import TeamManagementPage from './pages/employer/TeamManagementPage';
import BillingPage from './pages/employer/BillingPage';
import SecurityPage from './pages/employer/SecurityPage';
import SupportPage from './pages/shared/SupportPage';

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
          <Route path="/home" element={<HomeSeeker />} />
          <Route path="/profile" element={protectedRoute(<ProfilePage />)} />
          <Route path="/wallet" element={protectedRoute(<Wallet />)} />
          <Route path="/my-shifts" element={protectedRoute(<MyShifts />)} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/jobs" element={<JobFeed />} />
          <Route path="/full-time-jobs" element={<FullTimeJobs />} />
          <Route path="/chat" element={protectedRoute(<ChatHistoryPage />)} />
          <Route path="/chat/:id" element={protectedRoute(<ChatPage />)} />
          <Route path="/notifications" element={protectedRoute(<NotificationsPage />)} />
          
          {/* Employer Routes */}
          <Route path="/employer/home" element={protectedRoute(<HomeEmployer />)} />
          <Route path="/employer/add-job" element={protectedRoute(<EmployerAddJobPage />)} />
          <Route path="/employer/chats" element={protectedRoute(<EmployerChatHistoryPage />)} />
          <Route path="/employer/chat/:id" element={protectedRoute(<EmployerChatPage />)} />
          <Route path="/employer/my-jobs" element={protectedRoute(<EmployerMyJobsPage />)} />
          <Route path="/employer/notifications" element={protectedRoute(<EmployerNotificationsPage />)} />
          <Route path="/employer/profile" element={protectedRoute(<EmployerProfile />)} />
          <Route path="/employer/edit-profile" element={protectedRoute(<EditProfilePage />)} />
          <Route path="/employer/team" element={protectedRoute(<TeamManagementPage />)} />
          <Route path="/employer/billing" element={protectedRoute(<BillingPage />)} />
          <Route path="/employer/security" element={protectedRoute(<SecurityPage />)} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <DevModeProvider>
        <AuthProvider>
          <RoleProvider>
            <LiffProvider>
              <AppContent />
            </LiffProvider>
          </RoleProvider>
        </AuthProvider>
      </DevModeProvider>
    </Router>
  );
}

export default App;