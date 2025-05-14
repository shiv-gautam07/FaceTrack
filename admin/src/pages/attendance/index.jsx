import { Download } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AttendanceLists from './list';
import { Button } from '@/components/ui/Button';

const queryClient = new QueryClient();

const AttendanceLogs = () => {
  // Function to convert JSON to CSV

  return (
    <div>
      <div className="p-2 flex w-full items-center justify-between">
        <h2 className="text-xl font-semibold">Attendance Logs</h2>
      </div>
      <QueryClientProvider client={queryClient}>
        <AttendanceLists />
      </QueryClientProvider>
    </div>
  );
};

export default AttendanceLogs;
