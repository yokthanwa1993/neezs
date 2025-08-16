import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import EmployerBottomNavigation from '@/components/employer/EmployerBottomNavigation';
import AppLayout from '@/components/shared/AppLayout';

const EmployerLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <AppLayout footer={<EmployerBottomNavigation />}>
      {children ?? <Outlet />}
    </AppLayout>
  );
};

export default EmployerLayout;