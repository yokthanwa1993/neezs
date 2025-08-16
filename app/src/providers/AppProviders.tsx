import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { LiffProvider } from '@/contexts/LiffContext';
import { DevModeProvider } from '@/contexts/DevModeContext';
import { RoleProvider } from '@/contexts/RoleContext';
import { AddJobDialogProvider } from '@/contexts/AddJobDialogContext';

type Props = { children: ReactNode };

export function AppProviders({ children }: Props) {
  return (
    <AddJobDialogProvider>
      <DevModeProvider>
        <AuthProvider>
          <RoleProvider>
            <LiffProvider>
              {children}
            </LiffProvider>
          </RoleProvider>
        </AuthProvider>
      </DevModeProvider>
    </AddJobDialogProvider>
  );
}