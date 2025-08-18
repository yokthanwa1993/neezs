import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

declare global {
  interface Window {
    liff: any;
  }
}

const LineCallback: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      // Load LIFF SDK if not already loaded
      if (!window.liff) {
        await loadLiffSdk();
      }

      const liffId = import.meta.env.VITE_LINE_LIFF_ID || '2007840854-rKv5DGlD';
      console.log('🆔 Using LIFF ID:', liffId);

      // Initialize LIFF
      await window.liff.init({ liffId });

      // Check if user is logged in
      if (!window.liff.isLoggedIn()) {
        console.log('❌ User not logged in, redirecting to home');
        navigate('/');
        return;
      }

      // Get LINE ID Token
      const idToken = window.liff.getIDToken();
      if (!idToken) {
        throw new Error('ไม่สามารถรับ ID Token จาก LINE ได้');
      }

      console.log('✅ Got ID Token from LIFF');

      // Store LIFF token immediately
      localStorage.setItem('liff_id_token', idToken);
      localStorage.setItem('liff_token_timestamp', new Date().toISOString());

      // Get user profile from LIFF
      try {
        const profile = await window.liff.getProfile();
        console.log('👤 LIFF Profile:', profile);
        
        // Store LIFF user data
        localStorage.setItem('liff_user_id', profile.userId);
        localStorage.setItem('liff_display_name', profile.displayName);
        localStorage.setItem('liff_picture_url', profile.pictureUrl);
        localStorage.setItem('liff_status_message', profile.statusMessage || '');
        
        console.log('💾 Stored LIFF user data in localStorage');
      } catch (profileError) {
        console.warn('⚠️ Could not get LIFF profile:', profileError);
      }

      // Send ID Token to backend (same-origin endpoint works in dev/prod)
      const endpoint = '/api/auth/line';
      console.log('🌐 Authenticating with backend via', endpoint);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Backend error:', errorData);
        throw new Error(errorData.message || 'เกิดข้อผิดพลาดในการยืนยันตัวตน');
      }

      const { customToken, user: userData } = await response.json();
      console.log('✅ Got custom token from backend');

      // Store Firebase custom token
      localStorage.setItem('firebase_custom_token', customToken);
      localStorage.setItem('firebase_user_data', JSON.stringify(userData));

      // Sign in to Firebase with Custom Token
      await signInWithCustomToken(auth, customToken);
      console.log('✅ Signed in to Firebase');

      // Set user data in context immediately
      const userObj = {
        id: userData.uid,
        name: userData.displayName || 'ผู้ใช้ LINE',
        email: userData.email || '',
        picture: userData.pictureUrl || undefined
      };
      
      console.log('👤 Setting user object in context:', userObj);
      setUser(userObj);
      console.log('✅ User data set in context immediately');

      // Also save to localStorage for persistence
      localStorage.setItem('auth_user', JSON.stringify(userObj));
      console.log('💾 User data saved to localStorage');

      // Store authentication completion timestamp
      localStorage.setItem('auth_completed_at', new Date().toISOString());

      console.log('🎉 Authentication completed successfully!');
      console.log('🔄 Redirecting to home page...');

      // Redirect to home page
      navigate('/home', { replace: true });

    } catch (error: any) {
      console.error('LINE callback error:', error);
      setError(error.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังเข้าสู่ระบบ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-red-600">{error}</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            กลับหน้าแรก
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default LineCallback;