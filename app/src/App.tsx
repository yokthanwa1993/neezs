import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LiffProvider } from './contexts/LiffContext';
import LineLogin from './components/shared/LineLogin';
import ProfilePage from './components/applicant/ProfilePage';
import Wallet from './components/applicant/Wallet';
import MyShifts from './components/applicant/MyShifts';
import Onboarding from './components/shared/Onboarding';
import JobDetail from './components/applicant/JobDetail';
import JobFeed from './components/applicant/JobFeed';
import HomeScreen from './components/applicant/HomeScreen';
import ChatPage from './components/applicant/ChatPage';
import SettingsPage from './pages/shared/SettingsPage';
import ChatHistoryPage from './pages/applicant/ChatHistoryPage';
import NotificationsPage from './pages/shared/NotificationsPage';
import FullTimeJobs from './pages/applicant/FullTimeJobs';
import LineCallback from './components/shared/LineCallback';

const AppContent = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const protectedRoute = (element: React.ReactElement) => {
    return user ? element : <Navigate to="/login" replace />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-sm mx-auto">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/callback" element={<LineCallback />} />
          <Route path="/login" element={<LineLogin onLoginSuccess={() => navigate('/')} />} />
          <Route path="/profile" element={protectedRoute(<ProfilePage />)} />
          <Route path="/wallet" element={protectedRoute(<Wallet />)} />
          <Route path="/my-shifts" element={protectedRoute(<MyShifts />)} />
          <Route path="/onboarding" element={protectedRoute(<Onboarding />)} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/jobs" element={<JobFeed />} />
          <Route path="/full-time-jobs" element={<FullTimeJobs />} />
          <Route path="/chat/:id" element={protectedRoute(<ChatPage />)} />
          <Route path="/settings" element={protectedRoute(<SettingsPage />)} />
          <Route path="/chat-history" element={protectedRoute(<ChatHistoryPage />)} />
          <Route path="/notifications" element={protectedRoute(<NotificationsPage />)} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <LiffProvider>
        <Router>
          <AppContent />
        </Router>
      </LiffProvider>
    </AuthProvider>
  );
}

export default App;// Triggering deployment
// Triggering deployment again
// Final trigger attempt
