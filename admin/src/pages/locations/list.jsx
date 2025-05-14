import { useQuery } from '@tanstack/react-query';
import { Download, Edit, MapIcon, MapPin, Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/Button';
import { debounce, get } from 'lodash';
import qs from 'querystring';
import Loader from '@/components/ui/Loader';
import Pagination from '@/components/ui/Pagination';
import { calculatePageSize } from '@/lib/utils';
import moment from 'moment';

async function getLocations(searchPhrase, pagination) {
  const params = {};

  if (searchPhrase) {
    params.searchPhrase = searchPhrase;
  }
  params.limit = pagination.pageSize;
  if (pagination.pageIndex > 0) params.offset = pagination.pageIndex;

  const response = await axios.get(`/location?${qs.stringify(params)}`);

  const result = response.data;
  return response.status === 200 && result.success
    ? result.data
    : { count: 0, rows: [] };
}

export default function LocationLists({ handleEditRecord }) {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [pagination, setPagination] = useState({ pageSize: 20, pageIndex: 0 });

  const {
    isPending,
    error,
    data: locations,
  } = useQuery({
    queryKey: ['locations', searchPhrase, pagination],
    queryFn: () => getLocations(searchPhrase, pagination),
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
      <table className="w-full">
        <thead>
          <tr className="bg-white/50 text-sm text-gray-700">
            <th className="p-2 text-left">Location Name</th>
            <th className="p-2 text-left">Address</th>
            <th className="p-2 text-left">Employees</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm bg-white/70">
          {get(locations, 'count', 0) <= 0 && (
            <tr className="border-t border-background">
              <td className="text-left p-1" colSpan={5}>
                No records found!
              </td>
            </tr>
          )}
          {get(locations, 'rows', []).map((location, index) => (
            <tr key={index} className="border-t border-background">
              <td className="text-left p-1">{location.locationName}</td>
              <td className="text-left p-1">{location.address || '-'}</td>
              <td className="text-left p-1">
                {get(location, 'Users', []).length}
              </td>
              <td className="text-left p-1">{location.status}</td>
              <td className="text-left p-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditRecord(location)}
                >
                  <MapPin className="w-4 h-4" />
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {get(locations, 'count', 0) > 0 && (
        <div className="mt-2">
          <Pagination
            page={pagination.pageIndex + 1}
            pageSize={pagination.pageSize}
            pageCount={calculatePageSize(
              get(locations, 'count', 0),
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
