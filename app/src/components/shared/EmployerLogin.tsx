import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

interface EmployerLoginProps {
  onLoginSuccess: () => void;
}

const EmployerLogin: React.FC<EmployerLoginProps> = ({ onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // This part is different from CustomLogin, we are not using signInWithEmailAndPassword directly
      // We will call our custom backend endpoint
      const response = await fetch('/api/auth/employer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginData.email }), // Assuming password verification is handled by Firebase on client/some other way if needed
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login');
      }

      const { customToken, uid, role } = await response.json();

      const userCredential = await signInWithCustomToken(auth, customToken);
      const user = userCredential.user;

      setUser({
        id: uid,
        name: user.displayName || 'Employer',
        email: user.email || '',
        picture: user.photoURL || undefined,
        role: role,
      });

      onLoginSuccess();
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'ไม่พบผู้ใช้นี้ในระบบ';
      case 'auth/wrong-password':
        return 'รหัสผ่านไม่ถูกต้อง';
      case 'auth/invalid-email':
        return 'รูปแบบอีเมลไม่ถูกต้อง';
      case 'auth/too-many-requests':
        return 'มีการพยายามเข้าสู่ระบบมากเกินไป กรุณาลองใหม่ภายหลัง';
      case 'Forbidden: Access is denied':
        return 'คุณไม่มีสิทธิ์เข้าสู่ระบบในส่วนนี้';
      default:
        return 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Gig Marketplace (สำหรับ Employer)
          </CardTitle>
          <CardDescription>
            เข้าสู่ระบบสำหรับ Employer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">อีเมล</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="กรอกอีเมลของคุณ"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">รหัสผ่าน</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="กรอกรหัสผ่าน"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerLogin;
