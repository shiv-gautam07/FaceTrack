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
import { RefreshCcw } from 'lucide-react';

async function getFaceDetectLogs(searchPhrase, pagination) {
  const params = {};

  if (searchPhrase) {
    params.searchPhrase = searchPhrase;
  }
  params.limit = pagination.pageSize;
  if (pagination.pageIndex > 0) params.offset = pagination.pageIndex;

  const response = await axios.get(`/face-detect-logs?${qs.stringify(params)}`);

  const result = response.data;
  return response.status === 200 && result.success
    ? result.data
    : { count: 0, rows: [] };
}

export default function FaceDetectLists({
  handleEditRecord,
  handleRefreshLogs,
}) {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [pagination, setPagination] = useState({ pageSize: 20, pageIndex: 0 });

  const {
    isPending,
    error,
    data: logs,
  } = useQuery({
    queryKey: ['face-detect-logs', searchPhrase, pagination],
    queryFn: () => getFaceDetectLogs(searchPhrase, pagination),
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
        <h2 className="font-semibold text-2xl w-400">
          Recent Recognition Logs
        </h2>
        <Button onClick={handleRefreshLogs}>
          <RefreshCcw className="mr-1" />
          Refresh Logs
        </Button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-white/50 text-sm text-gray-700">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Timestamp</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Confidence</th>
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
                {moment(log.updatedAt).format('DD-MM-YYYY')}
              </td>
              <td className="text-left p-1">
                {log.faceMatchPercentage > 60 ? 'Recognized' : 'Not Recognized'}
              </td>
              <td className="text-left p-1">{log.faceMatchPercentage}%</td>
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
