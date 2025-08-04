import React from 'react';
import { useDevMode } from '@/contexts/DevModeContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DevPage: React.FC = () => {
  const { isDevMode, toggleDevMode } = useDevMode();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-6 w-6 text-red-500" />
            Developer Mode
          </CardTitle>
          <CardDescription>
            สลับโหมดนักพัฒนาเพื่อทดสอบฟีเจอร์ต่างๆ ไม่ควรเปิดใช้งานในเวอร์ชันจริง
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="dev-mode-switch" className="text-base">
                ข้ามการล็อกอิน
              </Label>
              <p className="text-sm text-muted-foreground">
                เปิดเพื่อเข้าถึงหน้าที่มีการป้องกันโดยไม่ต้องล็อกอิน
              </p>
            </div>
            <Switch
              id="dev-mode-switch"
              checked={isDevMode}
              onCheckedChange={toggleDevMode}
              aria-label="Toggle developer mode"
            />
          </div>
          {isDevMode && (
            <div className="mt-4 rounded-md bg-yellow-50 p-4 text-sm text-yellow-800">
              <p><strong>คำเตือน:</strong> โหมดนักพัฒนาทำงานอยู่ การตรวจสอบการล็อกอินถูกปิดใช้งานชั่วคราว</p>
            </div>
          )}
           <Button onClick={() => navigate('/')} className="w-full mt-4">
            กลับหน้าแรก
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevPage;