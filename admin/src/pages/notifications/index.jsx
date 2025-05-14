import { useState } from 'react';
import {
  ChevronDown,
  Send,
  Home,
  Menu,
  Users,
  Bell,
  Clock,
  Video,
  Settings,
  Calendar,
  FileText,
  MapPin,
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { Button } from '@/components/ui/Button';
const Dashboard = () => {
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
  const [isreciopen, setisreciopen] = useState(false);

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
    <div>
      <div className="fixed inset-0 backdrop-opacity-5 backdrop-invert bg-white/30 flex justify-center items-end">
        <div className="bg-orange-500 rounded p-1">
          Showing Dummy Data (API not integrated for this page)
        </div>
      </div>
      <main className="flex-1 p-6 overflow-y-auto mt-12 md:mt-0 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold w-200">
            Notification Management
          </h2>
          <Button onClick={() => openEditPopup()}>
            <Send />
            Create New Notification
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white py-6 px-6 shadow-lg rounded-xl flex flex-col justify-center">
            <h2 className="text-2xl font-semibold">Total Notification</h2>
            <p className="text-3xl px-2 mt-4 font-bold text-gray-700">50</p>
            <p className="text-gray-500 text-m ">This month</p>
          </div>
          <div className="bg-white py-6 px-6 shadow-lg rounded-xl flex flex-col justify-center">
            <h2 className="text-2xl font-semibold">Pending Notifications</h2>
            <p className="text-3xl px-2 mt-4 font-bold text-gray-700">2</p>
            <p className="text-gray-500 text-m ">Scheduled or draft</p>
          </div>
          <div className="bg-white py-6 px-6 shadow-lg rounded-xl flex flex-col justify-center">
            <h2 className="text-2xl font-semibold">Read Rate</h2>
            <p className="text-3xl px-2 mt-4 font-bold text-gray-700">85%</p>
            <p className="text-gray-500 text-m ">Average read rate</p>
          </div>
        </div>
        <table className="w-full mt-6">
          <thead>
            <tr className="text-gray-600 text-sm">
              <th className="p-3 text-left">Location Name</th>
              <th className="p-3 text-left">Adress</th>
              <th className="p-3 text-left">Employees</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 px-8 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {[
              {
                name: 'System maintainance',
                Message: 'Scheduled maintenance on March 1st',
                Employees: 'All Users',
                status: 'scheduled',
              },
              {
                name: 'New Policy Update',
                Message: 'Please review the updated company policies',
                Employees: 'Employees	',
                status: 'sent',
              },
              {
                name: 'Holiday Reminder',
                Message: 'Office will be closed on April 1st',
                Employees: 'All Users',
                status: 'draft',
              },
            ].map((user, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.Message}</td>
                <td className="p-3">{user.Employees}</td>
                <td className="p-3">{user.status}</td>
                <td className="p-3 ">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      {isEditPopupOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-90">
            <h2 className="text-xl font-semibold mb-4">
              Create new notifications
            </h2>
            <input
              type="text"
              className="w-full p-2 border border-gray-400 rounded mb-2"
              placeholder="Title"
            />
            <textarea
              className="w-full p-2 border border-gray-400 rounded mb-2"
              placeholder="Notification"
            />
            <button
              onClick={() => setisreciopen(!isreciopen)}
              className="flex items-center !p-2 !ml-0 !h-11 !mt-0 w-full !border !border-gray-400 rounded  !text-gray-500 "
            >
              {' '}
              Recipient
              <ChevronDown className="ml-2 w-4 h-4 text-gray-500" />
            </button>
            {isreciopen && (
              <div className="relative">
                <div className="absolute left-0 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 z-20">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-500">
                      All Users
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-500">
                      Employees
                    </li>
                  </ul>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsopen(!isOpen)}
              className="flex items-center !p-2 !ml-0 !h-11 !mt-2 w-full !border !border-gray-400 rounded  !text-gray-500 "
            >
              {' '}
              Status
              <ChevronDown className="ml-2 w-4 h-4 text-gray-500" />
            </button>
            {isOpen && (
              <div className="absolute left-38 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-500">
                    Active
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-500">
                    Inactive
                  </li>
                </ul>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={closeEditPopup}
              >
                Cancel
              </button>
              <button className="bg-cyan-700 text-white px-4 py-2 rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
