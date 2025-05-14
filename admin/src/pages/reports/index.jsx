import { useState } from 'react';
import {
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
  SignalIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const Reports = () => {
  return (
    <div>
      <div className="fixed inset-0 backdrop-opacity-5 backdrop-invert bg-white/30 flex justify-center items-end">
        <div className="bg-orange-500 rounded p-1">
          Showing Dummy Data (API not integrated for this page)
        </div>
      </div>

      <main className="flex-1 p-6 overflow-y-auto mt-12 md:mt-0 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold w-230">Reports</h2>
          <Button>
            <Download className="mr-2" />
            Generate New Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-6">
          <div className="bg-white py-6 px-6 shadow-lg rounded-xl flex flex-col justify-center">
            <h2 className="text-2xl font-semibold">Total Reports</h2>
            <p className="text-3xl px-2 mt-4 font-bold text-gray-700">25</p>
            <p className="text-gray-500 text-m ">Generated this month</p>
          </div>
          <div className="bg-white py-6 px-6 shadow-lg rounded-xl flex flex-col justify-center">
            <h2 className="text-2xl font-semibold">Most Downloaded</h2>
            <p className="text-3xl px-2 mt-4 font-bold text-gray-700">
              Attendance Summary
            </p>
            <p className="text-gray-500 text-m ">50 downloads</p>
          </div>
          <div className="bg-white py-6 px-6 shadow-lg rounded-xl flex flex-col justify-center">
            <h2 className="text-2xl font-semibold">Latest Report</h2>
            <p className="text-3xl px-2 mt-4 font-bold text-gray-700">
              Monthly Attendance Summary
            </p>
            <p className="text-gray-500 text-m ">Generated on 2024-02-26</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold w-386">Recent reports</h2>
          <Button>
            <SignalIcon className="mr-2" />
            View Analytics
          </Button>
        </div>
        <table className="w-full mt-6">
          <thead>
            <tr className="text-gray-600 text-sm">
              <th className="p-3 text-left">Report Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Generated Date</th>
              <th className="p-3 text-left">Downloads</th>
              <th className="p-3 px-8 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {[
              {
                name: 'Monthly Attendance Summary',
                type: 'Attendance',
                date: '2024-02-26',
                downloads: 15,
              },
              {
                name: 'Leave Balance Report',
                type: 'Leave',
                date: '2024-02-25',
                downloads: 5,
              },
              {
                name: 'Employee Performance Summary',
                type: 'Performance',
                date: '2024-02-15',
                downloads: 25,
              },
              ,
            ].map((user, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.type}</td>
                <td className="p-3">{user.date}</td>
                <td className="p-3">{user.downloads}</td>

                <td className="p-3 flex items-center">
                  <Button variant="outline" size="sm">
                    <CircleCheck size={17} className="text-gray-700 mr-1" />
                    Approved
                  </Button>
                  <Button variant="outline" size="sm">
                    <CircleX size={17} className="text-gray-700 mr-1" />
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Reports;
