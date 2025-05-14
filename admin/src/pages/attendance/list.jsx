import { useQuery } from '@tanstack/react-query';
import { Download, Edit, Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/Button';
import { debounce, get } from 'lodash';
import qs from 'querystring';
import Loader from '@/components/ui/Loader';
import Pagination from '@/components/ui/Pagination';
import { calculatePageSize } from '@/lib/utils';
import moment from 'moment';

async function getAttendance(searchPhrase, pagination) {
  const params = {};

  if (searchPhrase) {
    params.searchPhrase = searchPhrase;
  }
  params.limit = pagination.pageSize;
  if (pagination.pageIndex > 0) params.offset = pagination.pageIndex;

  const response = await axios.get(`/attendance?${qs.stringify(params)}`);

  const result = response.data;
  return response.status === 200 && result.success
    ? result.data
    : { count: 0, rows: [] };
}

export default function AttendanceLists({ handleEditRecord }) {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [pagination, setPagination] = useState({ pageSize: 20, pageIndex: 0 });

  const {
    isPending,
    error,
    data: logs,
  } = useQuery({
    queryKey: ['attendance-logs', searchPhrase, pagination],
    queryFn: () => getAttendance(searchPhrase, pagination),
  });

  const handleSearch = useMemo(
    () =>
      debounce(input => {
        setSearchPhrase(input);
      }, 500),
    [], // No dependencies, ensuring it's created only once
  );

  useEffect(() => {
    handleSearch(searchInput);

    // Cleanup debounce when component unmounts
    return () => handleSearch.cancel();
  }, [searchInput, handleSearch]);

  const handleGotoPage = useCallback(
    page => {
      setPagination({ ...pagination, pageIndex: page });
    },
    [pagination],
  );

  const handlePageSize = useCallback(
    pageSize => {
      setPagination({ ...pagination, pageSize });
    },
    [pagination],
  );

  const exportToCSV = () => {
    const headers = 'Name,Date,Check In,Check Out,Status\n';
    const rows = get(logs, 'rows', [])
      .map(
        log =>
          `${get(log, 'User.firstName', '')}${get(log, 'User.lastName', '')},${moment(log.checkInTime).format('DD-MM-YYYY')},${moment(log.checkInTime).format('h:mm a')},${moment(log.checkOutTime).format('h:mm a')},${log.status}`,
      )
      .join('\n');
    const csvData = headers + rows;

    // Create a Blob and a download link
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_logs-${+new Date()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      {/* <Loader loading={isPending} /> */}
      <div className="flex items-center justify-between gap-4">
        <div className="my-4 flex items-center border p-2 rounded-md bg-white w-full ">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search logs..."
            className="ml-2 flex-1 focus:outline-none"
            value={searchInput}
            onChange={evt => setSearchInput(evt.target.value)}
          />
        </div>

        {/* Export Report Button */}
        <Button type="button" onClick={exportToCSV}>
          <Download size={16} className="mr-2 mt-0.5" /> Export Report
        </Button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-white/50 text-sm text-gray-700">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Check In</th>
            <th className="p-2 text-left">Check Out</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm bg-white/70">
          {get(logs, 'count', 0) <= 0 && (
            <tr className="border-t border-background">
              <td className="text-left p-1" colSpan={5}>
                No records found!
              </td>
            </tr>
          )}
          {get(logs, 'rows', []).map((log, index) => (
            <tr key={index} className="border-t border-background">
              <td className="text-left p-1">{`${get(log, 'User.firstName', '')}, ${get(log, 'User.lastName', '')}`}</td>
              <td className="text-left p-1">
                {moment(log.checkInTime).format('DD-MM-YYYY')}
              </td>
              <td className="text-left p-1">
                {moment(log.checkInTime).format('h:mm a')}
              </td>
              <td className="text-left p-1">
                {moment(log.checkOutTime).format('h:mm a')}
              </td>
              <td className="text-left p-1">{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {get(logs, 'count', 0) > 0 && (
        <div className="mt-2">
          <Pagination
            page={pagination.pageIndex + 1}
            pageSize={pagination.pageSize}
            pageCount={calculatePageSize(
              get(logs, 'count', 0),
              pagination.pageSize,
            )}
            gotoPage={handleGotoPage}
            setPageSize={handlePageSize}
          />
        </div>
      )}
    </div>
  );
}
