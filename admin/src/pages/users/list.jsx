import { useQuery } from '@tanstack/react-query';
import { Edit, Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/Button';
import { debounce, get } from 'lodash';
import qs from 'querystring';
import Loader from '@/components/ui/Loader';
import Pagination from '@/components/ui/Pagination';
import { calculatePageSize } from '@/lib/utils';

async function getUsers(searchPhrase, pagination) {
  const params = {};

  if (searchPhrase) {
    params.searchPhrase = searchPhrase;
  }
  params.limit = pagination.pageSize;
  if (pagination.pageIndex > 0) params.offset = pagination.pageIndex;

  const response = await axios.get(`/users?${qs.stringify(params)}`);

  const result = response.data;
  return response.status === 200 && result.success
    ? result.data
    : { count: 0, rows: [] };
}

export default function UserLists({ showEditUser }) {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [pagination, setPagination] = useState({ pageSize: 20, pageIndex: 0 });

  const {
    isPending,
    error,
    data: users,
  } = useQuery({
    queryKey: ['users', searchPhrase, pagination],
    queryFn: () => getUsers(searchPhrase, pagination),
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
      {/* <Loader loading={isPending} /> */}
      <div className="my-4 flex items-center border p-2 rounded-md bg-white">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search users..."
          className="ml-2 flex-1 focus:outline-none"
          value={searchInput}
          onChange={evt => setSearchInput(evt.target.value)}
        />
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-white/50 text-sm text-gray-700">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Department</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm bg-white/70">
          {get(users, 'count', 0) <= 0 && (
            <tr className="border-t border-background">
              <td className="text-left p-1" colSpan={5}>
                No records found!
              </td>
            </tr>
          )}
          {get(users, 'rows', []).map((user, index) => (
            <tr key={index} className="border-t border-background">
              <td className="text-left p-1">{`${user.firstName}, ${user.lastName}`}</td>
              <td className="text-left p-1">{user.email}</td>
              <td className="text-left p-1">{user.department}</td>
              <td className="text-left p-1">{user.status}</td>
              <td className="text-left p-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showEditUser(user)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {get(users, 'count', 0) > 0 && (
        <div className="mt-2">
          <Pagination
            page={pagination.pageIndex + 1}
            pageSize={pagination.pageSize}
            pageCount={calculatePageSize(
              get(users, 'count', 0),
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
