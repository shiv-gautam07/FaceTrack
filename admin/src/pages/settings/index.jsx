import { useState } from 'react';
import {
  Save,
  Delete,
  CircleCheck,
  CircleX,
  ChevronDown,
  Download,
  RefreshCcw,
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
  Plus,
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { Button } from '@/components/ui/Button';
const SettingsList = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [leaveTypes, setLeaveTypes] = useState([
    'Sick Leave',
    'Casual Leave',
    'Paid Leave',
  ]);
  const [NewLeaveType, setNewLeaveType] = useState('');
  const [isOpen, SetIsOpen] = useState(false);
  const [halfDayEnabled, setHalfDayEnabled] = useState(false);
  const [autoDeductEnabled, setAutoDeductEnabled] = useState(false);
  const [annualQuota, setAnnualQuota] = useState(0);
  const [absentafter, setabsentafter] = useState(0);
  const [graceperiod, setgraceperiod] = useState(0);
  const [threshold, setthreshold] = useState(0);
  const [autoabsenceEnabled, setAutosbsenceEnabled] = useState(false);
  const [adminabsent, setadminabsent] = useState(0);
  const addLeaveType = () => {
    if (NewLeaveType.trim() !== '') {
      setLeaveTypes([...leaveTypes, NewLeaveType]);
      setNewLeaveType('');
      SetIsOpen(false);
    }
  };
  const removeLeaveType = index => {
    const updatedTypes = leaveTypes.filter((_, i) => i !== index);
    setLeaveTypes(updatedTypes);
  };
  return (
    <div>
      <div className="fixed inset-0 backdrop-opacity-5 backdrop-invert bg-white/30 flex justify-center items-end">
        <div className="bg-orange-500 rounded p-1">
          Showing Dummy Data (API not integrated for this page)
        </div>
      </div>
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto mt-12 md:mt-0 w-full">
        <h2 className="font-semibold text-2xl p-2 mt-3">
          Settings and Configurations
        </h2>
        <div className="gap-6 mt-6">
          <div className="bg-white py-6 px-6 shadow-lg rounded-xl flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-3">
              Leave Management Settings
            </h2>

            {/* <button className="text-sm !w-8 !h-8 mt-0"><Plus className="bg-black rounded-sm "/></button> */}
            <h2 className="font-semibold ">Leave Types </h2>
            {/* <button className="text-sm !w-8 !h-8 "><Plus className="bg-black rounded-sm "/></button>    */}
            <ul className="flex flex-col md:flex-row gap-3 mt-2 ">
              {leaveTypes.map((type, index) => (
                <li
                  key={index}
                  className=" flex justify-between items-center gap-2"
                >
                  <span>{type}</span>
                  <Delete
                    className="!text-black "
                    //   className="text-red-500 text-sm ml-4 hover:underline"
                    onClick={() => removeLeaveType(index)}
                  />
                </li>
              ))}
            </ul>
            <div className="flex space-x-2">
              <Button onClick={() => SetIsOpen(true)}>Add New Type</Button>
              {isOpen && (
                <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">
                      Add New Leave Type
                    </h2>
                    <input
                      type="text"
                      value={NewLeaveType}
                      onChange={e => setNewLeaveType(e.target.value)}
                      placeholder="Enter new leave type"
                      className="w-full p-2 border rounded mb-4"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                        onClick={() => SetIsOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                        onClick={addLeaveType}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5"></div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">
                Annual Leave Quota (days)
              </h2>
              <input
                value={annualQuota}
                onChange={e => setAnnualQuota(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <span>Enable Half Day Leave</span>
                <div
                  className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${halfDayEnabled ? 'bg-green-400' : ''}`}
                  onClick={() => setHalfDayEnabled(!halfDayEnabled)}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${halfDayEnabled ? 'translate-x-6' : ''}`}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Auto Deduct Leave for Unapproved Absence</span>
                <div
                  className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${autoDeductEnabled ? 'bg-green-400' : ''}`}
                  onClick={() => setAutoDeductEnabled(!autoDeductEnabled)}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${autoDeductEnabled ? 'translate-x-6' : ''}`}
                  ></div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">
                Mark Absent After(days)
              </h2>
              <input
                value={absentafter}
                onChange={e => setabsentafter(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="bg-white mt-10 py-6 px-6 shadow-lg rounded-xl flex flex-col justify-center ">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Attendance Rules</h2>
              <div className="flex gap-30">
                <div className="flex flex-col ">
                  <h2 className="text-lg font-semibold mb-2">
                    Grace Period(minutes)
                  </h2>
                  <input
                    value={graceperiod}
                    onChange={e => setgraceperiod(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold mb-2">
                    Late Threshold(minutes)
                  </h2>
                  <input
                    value={threshold}
                    onChange={e => setthreshold(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white mt-10 py-6 px-6 shadow-lg rounded-xl flex flex-col justify-center ">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                Absence Alert Settings
              </h2>
              <div className="flex items-center justify-between">
                <span>Enable Absence Alerts</span>
                <div
                  className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${autoabsenceEnabled ? 'bg-green-400' : ''}`}
                  onClick={() => setAutosbsenceEnabled(!autoabsenceEnabled)}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${autoabsenceEnabled ? 'translate-x-6' : ''}`}
                  ></div>
                </div>
              </div>

              <h2 className="mt-2 text-md font-semibold mb-2">
                Notify Admin when absent for(consecutive days)
              </h2>
              <input
                value={adminabsent}
                onChange={e => setadminabsent(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <div className="flex mt-6">
          <Button onClick={() => alert('Settings saved!')}>
            <Save size={20} className="ml-2" />
            Save Settings
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SettingsList;
