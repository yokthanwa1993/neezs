import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiff } from '@/contexts/LiffContext';
import { useAuth } from '@/contexts/AuthContext';

interface LineLoginProps {
  onLoginSuccess?: () => void;
}

const LineLogin: React.FC<LineLoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const { isLiffReady, isLiffLoading, liff } = useLiff();
  const { user } = useAuth();

  useEffect(() => {
    // If authentication completes and we get a user object, proceed.
    if (user) {
      console.log('✅ Auth user found, proceeding to login success...');
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        navigate('/home');
      }
    }
  }, [user, onLoginSuccess]);


  const handleLogin = async () => {
    if (!isLiffReady || !liff) {
      alert('LIFF is not ready yet. Please try again in a moment.');
      return;
    }

    try {
      if (liff.isLoggedIn()) {
        console.log('User is already logged in to LIFF, but auth context is missing. Re-authenticating.');
        // This case can happen if something went wrong in LiffProvider's auto-login
        // We can trigger the redirect flow to be safe.
      }
      
      const redirectUri = new URL('/callback', window.location.origin).toString();
      console.log('🚀 Starting LINE login with redirect:', redirectUri);

      // Start LINE login
      liff.login({ redirectUri });

    } catch (error: any) {
      console.error('❌ LINE login error:', error);
      alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ: ' + error.message);
    }
  };

  if (isLiffLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังเชื่อมต่อกับ LINE...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">เข้าสู่ระบบ</h1>
            <p className="text-gray-600">เข้าสู่ระบบด้วย LINE เพื่อใช้งานแอป</p>
          </div>

          <button
            onClick={handleLogin}
            disabled={!isLiffReady}
            className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors mb-4 disabled:bg-gray-400"
          >
            เข้าสู่ระบบด้วย LINE
          </button>

          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              ← กลับหน้าแรก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineLogin;