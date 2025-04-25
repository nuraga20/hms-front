import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCampusApartments, getDormitoryRooms, getTownhouses } from '../../api/housing';
import BuildingsTable from '../../components/Tables/BuildingsTable';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface Building {
  id: string;
  name: string;
  type: 'dormitory' | 'apartment' | 'townhouse';
  address: string;
  total_rooms: number;
  available_rooms: number;
  created_at: string;
}

const Buildings: React.FC = () => {
  const navigate = useNavigate();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    name: '',
    type: ''
  });

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        setLoading(true);
        const [dormitories, apartments, townhouses] = await Promise.all([
          getDormitoryRooms(),
          getCampusApartments(),
          getTownhouses()
        ]);

        const allBuildings = [
          ...dormitories.data.map((b: any) => ({ ...b, type: 'dormitory' })),
          ...apartments.data.map((b: any) => ({ ...b, type: 'apartment' })),
          ...townhouses.data.map((b: any) => ({ ...b, type: 'townhouse' }))
        ];

        setBuildings(allBuildings);
        setError(null);
      } catch (err) {
        setError('Failed to fetch buildings data');
        console.error('Error fetching buildings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuildings();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Breadcrumb pageName="Buildings" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Building Filters
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Building Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  placeholder="Enter building name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Building Type
                </label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">All Types</option>
                  <option value="dormitory">Dormitory</option>
                  <option value="apartment">Apartment</option>
                  <option value="townhouse">Townhouse</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Buildings List
              </h3>
            </div>
            <div className="p-6.5">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-red-500">{error}</div>
                </div>
              ) : (
                <BuildingsTable
                  nameFilter={filters.name}
                  typeFilter={filters.type}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Buildings;