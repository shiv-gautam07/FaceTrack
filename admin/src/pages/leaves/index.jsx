import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LeaveRequestsList from './list';

const queryClient = new QueryClient();

const Leaves = () => {
  return (
    <main className="flex-1 p-6 overflow-y-auto mt-12 md:mt-0 w-full">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold w-288">Leave Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-6">
        <div className="bg-white py-6 px-6 shadow-lg rounded-xl flex flex-col justify-center">
          <h2 className="text-2xl font-semibold">Pending Requests</h2>
          <p className="text-3xl px-2 mt-4 font-bold text-gray-700">5</p>
          <p className="text-gray-500 text-m ">Awaiting approval</p>
        </div>
        <div className="bg-white py-6 px-6 shadow-lg rounded-xl flex flex-col justify-center">
          <h2 className="text-2xl font-semibold">Approved Leaves</h2>
          <p className="text-3xl px-2 mt-4 font-bold text-gray-700">12</p>
          <p className="text-gray-500 text-m ">This month</p>
        </div>
        <div className="bg-white py-6 px-6 shadow-lg rounded-xl flex flex-col justify-center">
          <h2 className="text-2xl font-semibold">Leave Balance</h2>
          <p className="text-3xl px-2 mt-4 font-bold text-gray-700">75%</p>
          <p className="text-gray-500 text-m ">Average across employees</p>
        </div>
      </div>
      <QueryClientProvider client={queryClient}>
        <LeaveRequestsList />
      </QueryClientProvider>
    </main>
  );
};

export default Leaves;
