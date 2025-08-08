import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import EmployerBottomNavigation from '@/components/employer/EmployerBottomNavigation';
import { AddJobDialogProvider } from '@/contexts/AddJobDialogContext';

const EmployerLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <AddJobDialogProvider>
      <div className="min-h-screen bg-gray-50">
        {children ?? <Outlet />}
        <EmployerBottomNavigation />
      </div>
    </AddJobDialogProvider>
  );
};

export default EmployerLayout;