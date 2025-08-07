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
import EmployerLayout from './pages/employer/EmployerLayout';

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
          <Route path="/employer" element={protectedRoute(<EmployerLayout />)}>
            <Route path="home" element={<HomeEmployer />} />
            <Route path="my-jobs" element={<EmployerMyJobsPage />} />
            <Route path="chats" element={<EmployerChatHistoryPage />} />
            <Route path="chat/:id" element={<EmployerChatPage />} />
            <Route path="notifications" element={<EmployerNotificationsPage />} />
            <Route path="profile" element={<EmployerProfile />} />
            <Route path="edit-profile" element={<EditProfilePage />} />
            <Route path="team" element={<TeamManagementPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="security" element={<SecurityPage />} />
          </Route>
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