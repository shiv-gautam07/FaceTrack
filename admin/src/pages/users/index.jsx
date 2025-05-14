import { useState } from 'react';
import { ChevronDown, Search, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import UserLists from './list';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AddUpdateModal } from './addUpdateModal';

const queryClient = new QueryClient();

const UserManagement = () => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openEditPopup = user => {
    setSelectedUser(user);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setSelectedUser(null);
  };
  const handleSave = () => {
    // console.log('User details saved:', editedUser);
    closeEditPopup();
  };

  return (
    <div>
      <div className="p-2 flex w-full items-center justify-between">
        <h2 className="text-xl font-semibold">User Management</h2>
        <Button onClick={() => openEditPopup()}>
          <UserPlus size={16} className="mr-2 mt-0.5" />
          Add New User
        </Button>
      </div>
      <QueryClientProvider client={queryClient}>
        <UserLists showEditUser={openEditPopup} />
      </QueryClientProvider>
      <AddUpdateModal
        isOpen={isEditPopupOpen}
        toggleModal={setIsEditPopupOpen}
        user={selectedUser}
      />
    </div>
  );
};

export default UserManagement;
