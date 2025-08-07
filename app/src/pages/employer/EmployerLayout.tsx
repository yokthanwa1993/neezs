import React from 'react';
import { Outlet } from 'react-router-dom';
import EmployerBottomNavigation from '@/components/employer/EmployerBottomNavigation';
import { AddJobDialogProvider } from '@/contexts/AddJobDialogContext';

const EmployerLayout = () => {
  return (
    <AddJobDialogProvider>
      <div className="min-h-screen bg-gray-50">
        <Outlet />
        <EmployerBottomNavigation />
      </div>
    </AddJobDialogProvider>
  );
};

export default EmployerLayout;