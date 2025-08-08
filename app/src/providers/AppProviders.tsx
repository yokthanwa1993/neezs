import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { LiffProvider } from '@/contexts/LiffContext';
import { DevModeProvider } from '@/contexts/DevModeContext';
import { RoleProvider } from '@/contexts/RoleContext';

type Props = { children: ReactNode };

export function AppProviders({ children }: Props) {
  return (
    <DevModeProvider>
      <AuthProvider>
        <RoleProvider>
          <LiffProvider>
            {children}
          </LiffProvider>
        </RoleProvider>
      </AuthProvider>
    </DevModeProvider>
  );
}


