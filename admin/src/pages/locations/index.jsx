import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import LocationLists from './list';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';

const queryClient = new QueryClient();

const Locations = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    name: '',
    Adress: '',
    Employees: '',
    status: '',
  });
  const [isOpen, setIsopen] = useState(false);

  const openEditPopup = user => {
    setSelectedUser(user);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setSelectedUser(null);
  };
  const handleSave = () => {
    console.log('User details saved:', editedUser);
    closeEditPopup();
  };
  return (
    <main className="flex-1 p-6 overflow-y-auto mt-12 md:mt-0 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold w-288">Location Management</h2>
        <Button onClick={() => openEditPopup()}>
          <PlusIcon />
          Add new Location
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-6">
        <div className="bg-white py-6 px-6 shadow-lg rounded-xl flex flex-col justify-center">
          <h2 className="text-2xl font-semibold">Total Locations</h2>
          <p className="text-3xl px-2 mt-4 font-bold text-gray-700">3</p>
          <p className="text-gray-500 text-m ">Across 2 countries</p>
        </div>
        <div className="bg-white py-6 px-6 shadow-lg rounded-xl flex flex-col justify-center">
          <h2 className="text-2xl font-semibold">Active Locations</h2>
          <p className="text-3xl px-2 mt-4 font-bold text-gray-700">2</p>
          <p className="text-gray-500 text-m ">1 inactive location</p>
        </div>
        <div className="bg-white py-6 px-6 shadow-lg rounded-xl flex flex-col justify-center">
          <h2 className="text-2xl font-semibold">Total Employees</h2>
          <p className="text-3xl px-2 mt-4 font-bold text-gray-700">650</p>
          <p className="text-gray-500 text-m ">Across all locations</p>
        </div>
      </div>
      <QueryClientProvider client={queryClient}>
        <LocationLists />
      </QueryClientProvider>
    </main>
  );
};

export default Locations;
