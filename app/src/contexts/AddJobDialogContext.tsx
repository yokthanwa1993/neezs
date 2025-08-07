import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import AddJobForm from '@/components/employer/AddJobForm';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AddJobDialogContextType {
  openAddJobDialog: () => void;
}

const AddJobDialogContext = createContext<AddJobDialogContextType | undefined>(undefined);

export const useAddJobDialog = () => {
  const context = useContext(AddJobDialogContext);
  if (!context) {
    throw new Error('useAddJobDialog must be used within an AddJobDialogProvider');
  }
  return context;
};

export const AddJobDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openAddJobDialog = () => setIsOpen(true);
  const closeAddJobDialog = () => setIsOpen(false);

  return (
    <AddJobDialogContext.Provider value={{ openAddJobDialog }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full h-full max-w-none max-h-none p-0 flex flex-col border-none rounded-none sm:rounded-lg sm:max-w-lg sm:h-auto sm:max-h-[95vh]">
          <DialogHeader className="p-4 pb-3 flex flex-row items-center justify-between sticky top-0 bg-white z-10 shadow-sm">
            <DialogTitle className="text-lg font-bold">ลงประกาศงานใหม่</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </DialogClose>
          </DialogHeader>
          <AddJobForm onFinished={closeAddJobDialog} />
        </DialogContent>
      </Dialog>
    </AddJobDialogContext.Provider>
  );
};