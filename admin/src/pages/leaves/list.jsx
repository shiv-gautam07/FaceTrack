import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/Button';
import { debounce, get } from 'lodash';
import qs from 'querystring';
import Loader from '@/components/ui/Loader';
import Pagination from '@/components/ui/Pagination';
import { calculatePageSize } from '@/lib/utils';
import moment from 'moment';
import { Calendar, CircleCheck, CircleX, RefreshCcw } from 'lucide-react';

async function getLeaveRequests(searchPhrase, pagination) {
  const params = {};

  if (searchPhrase) {
    params.searchPhrase = searchPhrase;
  }
  params.limit = pagination.pageSize;
  if (pagination.pageIndex > 0) params.offset = pagination.pageIndex;

  const response = await axios.get(`/leave?${qs.stringify(params)}`);

  const result = response.data;
  return response.status === 200 && result.success
    ? result.data
    : { count: 0, rows: [] };
}

export default function LeaveRequestsList({ handleEditRecord }) {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [pagination, setPagination] = useState({ pageSize: 20, pageIndex: 0 });

  const {
    isPending,
    error,
    data: leaves,
  } = useQuery({
    queryKey: ['leave-requests', searchPhrase, pagination],
    queryFn: () => getLeaveRequests(searchPhrase, pagination),
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

  return (
    <div>
      <div className="flex py-7 items-center justify-between w-full">
        <h2 className="font-semibold text-2xl w-400">Recent Leave Requests</h2>
        <Button>
          <Calendar className="mr-1" />
          View Calendar
        </Button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-white/50 text-sm text-gray-700">
            <th className="p-2 text-left">Employee</th>
            <th className="p-2 text-left">Leave Type</th>
            <th className="p-2 text-left">duration</th>
            <th className="p-2 text-left">From</th>
            <th className="p-2 text-left">To</th>
            <th className="p-2 text-left">Reason</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm bg-white/70">
          {get(leaves, 'count', 0) <= 0 && (
            <tr className="border-t border-background">
              <td className="text-left p-1" colSpan={8}>
                No records found!
              </td>
            </tr>
          )}
          {get(leaves, 'rows', []).map((leave, index) => (
            <tr key={index} className="border-t border-background">
              <td className="text-left p-1">{`${get(leave, 'User.firstName', '')}, ${get(leave, 'User.lastName', '')}`}</td>
              <td className="text-left p-1">{leave.leaveType}</td>
              <td className="text-left p-1">{leave.duration}</td>
              <td className="text-left p-1">
                {moment(leave.from).format('DD-MM-YYYY')}
              </td>
              <td className="text-left p-1">
                {moment(leave.to).format('DD-MM-YYYY')}
              </td>
              <td className="text-left p-1">{leave.reason}</td>
              <td className="text-left p-1">{leave.status}</td>
              <td className="p-2 flex items-center gap-2">
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
      {get(leaves, 'count', 0) > 0 && (
        <div className="mt-2">
          <Pagination
            page={pagination.pageIndex + 1}
            pageSize={pagination.pageSize}
            pageCount={calculatePageSize(
              get(leaves, 'count', 0),
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
