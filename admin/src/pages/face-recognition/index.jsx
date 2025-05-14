import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FaceDetectLists from './list';

const queryClient = new QueryClient();
const FaceDetectLogs = () => {
  const handleRefreshLogs = () => {
    queryClient.invalidateQueries({ queryKey: ['face-detect-logs'] });
  };
  return (
    <main className="flex-1 p-6 overflow-y-auto mt-12 md:mt-0 w-full">
      <h2 className="text-2xl font-semibold">Face Recognition</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white py-6 px-6 shadow-lg rounded-xl flex flex-col justify-center">
          <h2 className="text-2xl font-semibold">System Status</h2>
          <div className="flex items-center py-2">
            <p className="text-3xl text-green-400">●</p>
            <p className="text-green-400 ml-2 mt-1"> System Online</p>
          </div>
          <p className="text-gray-500 text-sm py-2">
            Last system check: 2024-02-28 08:00 AM
          </p>
        </div>
        <div className="bg-white px-6 py-6 shadow-lg rounded-xl flex flex-col justify-center">
          <h2 className="font-semibold text-2xl">Recognition Status</h2>
          <div className="flex justify-between mt-6 text-gray-500">
            <p>Total Recognitions Today:</p>
            <p>1,234</p>
          </div>
          <div className="text-gray-500 flex justify-between mt-2">
            <p>Successful Recognitions:</p>
            <p>1,200 (97.2%)</p>
          </div>
          <div className="text-gray-500 flex justify-between mt-2">
            <p>Failed Recognitions:</p>
            <p>34 (2.8%)</p>
          </div>
        </div>
      </div>
      <QueryClientProvider client={queryClient}>
        <FaceDetectLists handleRefreshLogs={handleRefreshLogs} />
      </QueryClientProvider>
    </main>
  );
};

export default FaceDetectLogs;
