import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LineLoginProps {
  onLoginSuccess?: () => void;
}

const LineLogin: React.FC<LineLoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    initializeLiff();
  }, []);

  const initializeLiff = async () => {
    try {
      // Load LIFF SDK if not already loaded
      if (!window.liff) {
        await loadLiffSdk();
      }

      const liffId = import.meta.env.VITE_LINE_LIFF_ID || '2007840854-rKv5DGlD';
      console.log('🆔 Using LIFF ID:', liffId);

      // Initialize LIFF
      await window.liff.init({ liffId });

      // Check if user is already logged in
      const loggedIn = window.liff.isLoggedIn();
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        console.log('✅ User already logged in to LIFF');
        // Store token immediately if user is logged in
        const idToken = window.liff.getIDToken();
        if (idToken) {
          console.log('🎫 Storing LIFF token for logged in user');
          localStorage.setItem('liff_id_token', idToken);
          
          // Get user profile and store it
          try {
            const profile = await window.liff.getProfile();
            localStorage.setItem('liff_user_id', profile.userId);
            localStorage.setItem('liff_display_name', profile.displayName);
            localStorage.setItem('liff_picture_url', profile.pictureUrl);
            console.log('👤 Stored LIFF user profile:', profile);
          } catch (profileError) {
            console.warn('⚠️ Could not get LIFF profile:', profileError);
          }
        }
      } else {
        console.log('ℹ️ User not logged in to LIFF');
        // Store initial access timestamp
        localStorage.setItem('liff_first_access', new Date().toISOString());
      }

    } catch (error) {
      console.error('❌ LIFF initialization error:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleLogin = async () => {
    try {
      if (!window.liff) {
        throw new Error('LIFF SDK not loaded');
      }

      const redirectUri = new URL('/callback', window.location.origin).toString();
      
      if (!redirectUri) {
        throw new Error('VITE_LINE_REDIRECT_URI environment variable is not set');
      }
      
      console.log('🚀 Starting LINE login with redirect:', redirectUri);

      // Store login attempt timestamp
      localStorage.setItem('liff_login_attempt', new Date().toISOString());

      // Start LINE login
      window.liff.login({ redirectUri });

    } catch (error: any) {
      console.error('❌ LINE login error:', error);
      alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ: ' + error.message);
    }
  };

  const loadLiffSdk = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://static.line-scdn.net/liff/edge/2/sdk.js';
      script.async = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('ไม่สามารถโหลด LINE SDK ได้'));
      
      document.head.appendChild(script);
    });
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
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
            className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors mb-4"
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

          {isLoggedIn && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">
                ✅ คุณได้เข้าสู่ระบบ LIFF แล้ว
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LineLogin;